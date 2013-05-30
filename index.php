<? 
require ('connect.php');
try {
?>

<!DOCTYPE html>

<html>
  <head>
    <meta charset="utf-8"></meta>
    <link rel="stylesheet" href="style.css"></link>
    </style>
  </head>
  <body class="index">
<? 

$games = get_games($player_id);
if (count($games)) { ?>
<h2>Reprendre une partie en cours</h2>
<? 
  foreach ($games as $game) {
    echo "<li><a href='game.php?game=$game[id]'>Partie $game[id]</a> sur $game[name]</li>";
  }
}

$maps = get_maps();
if (count($maps)) { ?>
<h2>Commencer une nouvelle partie</h2>
<? 
  foreach ($maps as $map) {
    echo "<li><a href='game.php?map=$map[id]'>$map[name]</a></li>";
  }
}

?>
  </body>
</html>
<?
  } catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
  }
?>
