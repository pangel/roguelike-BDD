<?

error_reporting(E_ALL);
ini_set('display_errors', True);

require ('connect.php');

if (!$_POST['map_json']){
	echo "Pas de map.";
}
else{
	add_map($_POST['map_name'], $_POST['map_json'], intval($_POST['initposx_json']), intval($_POST['initposy_json']), $_POST['mobs_json']);
	redirect('index.php');
}
?>
