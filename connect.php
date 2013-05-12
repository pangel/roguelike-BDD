<? 
header('Content-type: application/json');
try {
  $conn = new PDO('mysql:host=localhost;dbname=ens_bdd', "ens_bdd", "ens_bdd");
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  $stmt = $conn->prepare('SELECT * FROM carte WHERE id = :id');
  $stmt_b = $conn->prepare('SELECT * FROM contenu_carte WHERE carte_id = :id');
  $data = array('id' => $_GET['id']);
  $stmt->execute($data);
  $stmt_b->execute($data);

  echo json_encode(array(map => $stmt->fetch(PDO::FETCH_ASSOC), content => $stmt_b->fetchAll(PDO::FETCH_ASSOC)), 
                   JSON_NUMERIC_CHECK | JSON_PRETTY_PRINT);

} catch(PDOException $e) {
  echo 'ERROR: ' . $e->getMessage();
}

?>
