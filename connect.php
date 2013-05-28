<? 

error_reporting(E_ALL);
ini_set('display_errors', True);

$conn;

function connect() {
  global $conn;
  if (isset($conn)) {
    return $conn;
  } else {
    $conn = new PDO('mysql:host=localhost;dbname=ens_bdd', "ens_bdd", "ens_bdd");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $conn;
  }
}

function add_player() {
  $conn = connect();
  $conn->query("INSERT INTO player (name) VALUES ('JoueurX')");
  return $conn->lastInsertId();
}

function add_map($name, $tiles, $initPosX, $initPosY,$mobs) {
  $conn = connect();
  $add_map = $conn->prepare("INSERT INTO map (name,tiles) VALUES (:name, :tiles)");
  $add_map->execute(array("name" => $name, "tiles" => $tiles));

  $get_map_id = $conn->prepare("SELECT map.id FROM map WHERE map.name = :name");
  $get_map_id->execute(array("name" => $name));
  $map_id = $get_map_id->fetch(PDO::FETCH_ASSOC);
  
//echo 'INSERT INTO map_content (map_id, type, startX, startY, attributes) VALUES ('.$map_id['id'].', player, '.$initPosX.', '.$initPosY.', {\"x\":'.$initPosX.',\"y\":'.$initPosY.'})';
  $conn->query('INSERT INTO map_content (map_id, type, startX, startY, attributes) VALUES ('.$map_id['id'].', "player", '.$initPosX.', '.$initPosY.', "{\"x\":'.$initPosX.',\"y\":'.$initPosY.'}")');


  $json = json_decode($mobs, true);
  var_dump($json[0]['attributes']);
  for ($i = 0; $i < count($json); $i++){
	//echo 'INSERT INTO map_content (map_id, type, attributes) VALUES ('.$map_id['id'].', "'.$json[$i]['type'].', "{\"x\":'.$json[$i]['attributes']['x'].',\"y\":'.$json[$i]['attributes']['x'].'}")';
	  $conn->query('INSERT INTO map_content (map_id, type, attributes) VALUES ('.$map_id['id'].', "'.$json[$i]['type'].'", "{\"x\":'.$json[$i]['attributes']['x'].',\"y\":'.$json[$i]['attributes']['y'].'}")');
  }

  return $conn->lastInsertId();
}

function add_game($player_id,$map_id) {
  $conn = connect();
  $add_game = $conn->prepare("INSERT INTO game (player_id,map_id) VALUES (:player_id, :map_id)");
  $add_game->execute(array("player_id" => $player_id, "map_id" => $map_id));
  return $conn->lastInsertId();
}

function get_games($player_id) {
  $conn = connect();
  $get_games = $conn->prepare("SELECT game.id,map.name FROM game,map WHERE game.player_id = :player_id AND map.id = game.map_id");
  $get_games->execute(array("player_id" => $player_id));

  return $get_games->fetchAll(PDO::FETCH_ASSOC);
}

function get_maps() {
  $conn = connect();
  $get_maps = $conn->query("SELECT * FROM map");

  return $get_maps->fetchAll(PDO::FETCH_ASSOC);
}

function get_map($id) {
  $conn = connect();
  $data = array('id' => $id);
  $get_map = $conn->prepare("SELECT * FROM map WHERE id = :id");
  $get_instances = $conn->prepare("SELECT * FROM map_content WHERE map_id = :id");
  $get_map->execute($data);
  $get_instances->execute($data);

  return array(
    "map" => $get_map->fetch(PDO::FETCH_ASSOC), 
    "instances" => $get_instances->fetchAll(PDO::FETCH_ASSOC)
  );
}

function get_game($game_id) {
  $conn = connect();
  $data = array('id' => $game_id);

  $get_map = $conn->prepare("SELECT map.tiles FROM game,map WHERE game.id = :id AND map.id = game.map_id");
  $get_map->execute($data);

  $sql_get_instances = "SELECT * FROM instance WHERE game_id = :id";
  $get_instances = $conn->prepare($sql_get_instances);
  $get_instances->execute($data);

  // FIXME Directly decode the json in the attributes field instead of sending it as text
  // (it is currently decoded by javascript using JSON.decode which is inconsistent)
  return array(
    "map" => $get_map->fetch(PDO::FETCH_ASSOC), 
    "instances" => $get_instances->fetchAll(PDO::FETCH_ASSOC)
  );
}

function update_game($game_id, $instances) {
  $conn = connect();
  $update_instance = $conn->prepare(<<<SQL
  INSERT INTO instance (game_id, instance_id, type, attributes) 
                VALUES (:game_id,:instance_id,:type,:attributes)
  ON DUPLICATE KEY UPDATE 
                  game_id=VALUES(game_id),
              instance_id=VALUES(instance_id), 
                     type=VALUES(type), 
               attributes=VALUES(attributes)
SQL
  );

  $remove_old_instances = $conn->prepare("DELETE FROM instance WHERE game_id = :game_id");
  $remove_old_instances->execute(array("game_id" => $game_id));

  foreach ($instances as $instance) {
    if (is_array($instance['attributes'])) {
      $attributes = json_encode($instance['attributes'], JSON_NUMERIC_CHECK);
    } else {
      $attributes = $instance['attributes'];
    }
    if (isset($instance['instance_id'])) {
      $instance_id = $instance['instance_id'];
    } else {
      $instance_id = uniqid();
    }
    //print_r($instance);
    $update_instance->execute(array(
      "instance_id" => $instance_id,
      "game_id" => $game_id,
      "type" => $instance['type'],
      "attributes" => $attributes));
  }
  return true;
}

function redirect($url, $statusCode = 303)
{
  header('Location: ' . $url, true, $statusCode);
  die();
}

if (!$_COOKIE['bdd_game']) {
  $player_id = add_player();
  setcookie('bdd_game',$player_id);
} else {
  $player_id = $_COOKIE['bdd_game'];
}

?>
