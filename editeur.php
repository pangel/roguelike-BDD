<?
require ('connect.php');
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8"></meta>
    <script src="jquery-1.9.1.min.js"></script>
    <script src="underscore-min.js"></script>
    
    <script src="js_editeur/core.js"></script>
    <script src="js_editeur/app.js"></script>
    <script src="js_editeur/app_map.js"></script>
    <script src="js_editeur/app_models.js"></script>
    <script src="js_editeur/app_control.js"></script>
    <script src="js_editeur/init.js"></script>

    <link rel="stylesheet" href="style_editeur.css"></link>
</style>
</head>
<body class="">
  <div id="map">
     <div id="initpos">
     </div>
  </div>
  <div id="rightpanel">
    <form id="addrowcolumn">
      Add row :<input type="text" id="addrow" value="0"><br>
      Add column :<input type="text" id="addcolumn" value="0"><br>
      <input type="button" value="Apply" id="apply">
    </form>
    <div id="tiles">
    </div><br>
    <div id="initpossel">
    </div>
    <div id="mobs">
	<div class="mob spider" id="spider">
	</div>
    </div>
    <form id="sendmap" action="add_map.php" method="post">
        <input type="hidden" name ="map_json" id="map_json">
        <input type="hidden" name ="initposy_json" id="initposy_json">
        <input type="hidden" name ="initposx_json" id="initposx_json">
        <input type="hidden" name ="mobs_json" id="mobs_json">
	Map name :<input type="text" name="map_name" id="map_name"><br>
	<input type="button" value="Send Map" id="map_send">
    </form>
  </div>
</body>
</html>
