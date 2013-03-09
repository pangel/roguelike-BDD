<?
	$version = 0.1;
	$player_id = ;
	$json = json_decode($json_string);

	mysql_connect("176.31.251.209","roguelike","likerogue");
	mysql_select_db("roguelike");
	


	$nb = o;
	function comma()
	{
		$nb = $nb--;
		return if($nb > 0){"', "} else{"' "};
	}
	function comma_init($obj)
	{
		$nb = 0;
		if ($obj->{"hp"}){$nb++};
		if ($obj->{"x"}){$nb++};
		if ($obj->{"y"}){$nb++};
		if ($obj->{"behavior"}){$nb++};
	}


	//Modification du joueur
	$obj = $json->{"player"};
	comma_init($obj);
	$query = "UPDATE Player SET ";
	if ($obj->{"hp"}){ $query = $query."hp='".$obj->{"hp"}.comma();};
	if ($obj->{"x"}){ $query = $query."x='".$obj->{"x"}.comma();};
	if ($obj->{"y"}){ $query = $query."y='".$obj->{"y"}.comma();};
	$query = $query."instanceCounter='".$json->{"counter"}."' ";
	$query = $query."WHERE id='".$player_id."'";

	mysql_query($query);


	//Modification des instances
	for($i= 0; $i < count($json->{"instances"}); $i++){
		$obj = $json->{"instances"}[$i];
		comma_init($obj);
		$query = "UPDATE Instance SET ";
		if ($obj->{"hp"}){ $query = $query."hp='".$obj->{"hp"}.comma();};
		if ($obj->{"x"}){ $query = $query."x='".$obj->{"x"}.comma();};
		if ($obj->{"y"}){ $query = $query."y='".$obj->{"y"}.comma();};
		if ($obj->{"behavior"}){ $query = $query."behavior='".$obj->{"behavior"}.comma();};

		$query = $query."WHERE id='".$obj->{"id"}."'";
	
		mysql_query($query);

	}




	//Ajout d'instances
	for($i = 0; $i < count($json->{"add"}); $i++){
		$obj = $json->{"add"}[$i];
		$query = "";
		if ($obj->{"type"} == 0){
			$query = "INSERT INTO Instance (id,player,monster,hp,x,y,behavior) VALUES ("
			."'".$obj->{"id_instance"}."',"
			."'".$player_id."',"
			."'".$obj->{"id_model"}."',"
			."'".$obj->{"hp"}."',"
			."'".$obj->{"x"}."',"
			."'".$obj->{"y"}."',"
			."'".$obj->{"behavior"}."')"
		}
		else{
			$query = "INSERT INTO Instance (id,player,object,x,y) VALUES ("
			."'".$obj->{"id_instance"}."',"
			."'".$player_id."',"
			."'".$obj->{"id_model"}."',"
			."'".$obj->{"x"}."',"
			."'".$obj->{"y"}."')"
		}
		mysql_query($query);
	}


	//Suppression d'instances
	for($i = 0; $i < count($json->{"add"}); $i++){
		mysql_query("DELETE FROM Instance WHERE id='".$json->{"add"}[$i]."'");
	}