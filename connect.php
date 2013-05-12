<? 

header('Content-type: application/json');

$sql_update_instance = <<<SQL
INSERT INTO instance (instance_id, type, attributes) 
              VALUES (:instance_id,:type,:attributes)
ON DUPLICATE KEY UPDATE 
            instance_id=VALUES(instance_id), 
                   type=VALUES(type), 
             attributes=VALUES(attributes)
SQL;

$sql_get_map = <<<SQL
SELECT * FROM carte WHERE id = :id
SQL;

$sql_get_map_content = <<<SQL
SELECT * FROM contenu_carte WHERE carte_id = :id
SQL;

try {
  $conn = new PDO('mysql:host=localhost;dbname=ens_bdd', "ens_bdd", "ens_bdd");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  switch($_GET['method']) {
  case 'update':
    $instances = $_GET['instances'];

    $update_instance = $conn->prepare($sql_update_game);
    foreach ($instances as $instance) {
      $update_instance->execute(array(
        instance_id => $instance['instance_id'],
        type => $instance['type'],
        attributes => json_encode($instance['attributes'], JSON_NUMERIC_CHECK)));
    }

    echo json_encode(array(success => "true"));
    break;

  default:
    $data = array('id' => $_GET['id']);
    $get_map = $conn->prepare($sql_get_map);
    $get_content = $conn->prepare($sql_get_map_content);
    $get_map->execute($data);
    $get_content->execute($data);

    echo json_encode(array(map => $get_map->fetch(PDO::FETCH_ASSOC), 
                           content => $get_content->fetchAll(PDO::FETCH_ASSOC)), 
                     JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);
    break;
  }


} catch(PDOException $e) {
  echo 'ERROR: ' . $e->getMessage();
}

?>
