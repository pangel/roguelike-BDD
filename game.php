<? 
require ('connect.php');
try {

  if (isset($_GET['map'])) {
    $map = get_map($_GET['map']);
    $game_id = add_game($player_id, $_GET['map']);
    update_game($game_id, $map['instances']);
    if (isset($_GET['debug'])) {
      header('Content-type: application/json');
      print_r($map);
      print_r($game_id);
      die();
    } else {
      redirect("game.php?game=$game_id");
    }
  } else if (isset($_GET['game'])) {
    $game = get_game($_GET['game']);
    if (isset($_GET['debug'])) {
      header('Content-type: application/json');
      print_r($game);
      die();
    }
  } else { die("Que faire? Pas de paramètres GET map, ni de paramètres GET game."); }
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"></meta>
    <!-- jQuery est une librairie qui simplifie la manipulation du DOM (= structure HTML)-->
    <!-- Un gros problème du Web c'est que les navigateurs font tous les choses un peu différemment.-->
    <!-- jQuery et d'autres librairies unifient les noms de fonctions et les comportements.-->
    <!-- jQuery ajoute l'objet global $ dans l'environnement. $ est aussi une fonction.-->
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <!-- underscore est une librairie qui ajoute des méthodes de programmation fonctionnelle courante-->
    <!-- (each, map, fold, etc.)-->
    <!-- underscore ajoute l'objet global _. _ est aussi une fonction.-->
    <script src="http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4/underscore-min.js"></script>

    <script src="js/core.js"></script>
    <script src="js/app.js"></script>
    <script src="js/app_ajax.js"></script>
    <script src="js/app_map.js"></script>
    <script src="js/app_models.js"></script>
    <script src="js/app_control.js"></script>
    <script src="js/init.js"></script>
    <script>
      Bootstrap = {};
      <?
      if (isset($game)) {
        $json_game = json_encode($game, JSON_NUMERIC_CHECK);
        echo "Bootstrap.game = $json_game;";
        echo "Bootstrap.game_id = $_GET[game];";
      }
      ?>
    </script>
    <link rel="stylesheet" href="style.css"></link>
    </style>
    
  </head>
  <body class="">
    <div id="map">
    </div>
    <div id="elements">
    </div>
    <div id="go-home"><a href="index.php">Retour au début</a></div>
    <div id="status">
    </div>
  </body>
</html>
<?
  } catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
  }
?>
