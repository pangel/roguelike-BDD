<?
  require('connect.php');
  header('Content-type: application/json');
  try {
    if (update_game($_GET['game'], $_GET['instances'])) {
      echo json_encode(array("success" => "true"));
    }
  } catch(PDOException $e) {
    echo 'ERROR: ' . $e->getMessage();
  }
?>
