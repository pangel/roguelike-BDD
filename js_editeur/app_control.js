App.currentTile = 'o';
App.tiles = ['o','w'];

App.control = {

    mouseDownX: 0,
    mouseDownY: 0,
    mouseDown: 0,
    mapbis: null,

    changeTile: function(x,y){
	var t = $('<div class="'+'t '+App.currentTile+'" id='+x+"_"+y+'></div>');
	t.css({top: y*App.map.tileShiftY, left: x*App.map.tileShiftX});
	$("#"+x+"_"+y).replaceWith(t);
	console.log("#"+x+"_"+y);
    },
    
    drawRec: function(a,b,x,y){
	console.log('1');
	App.control.mapbis = jQuery.extend(true, {}, App.map.map);
	for (var i = Math.min(a,x); i <= Math.max(a,x); i++){
	    for (var j = Math.min(b,y); j <= Math.max(b,y); j++){
		App.control.mapbis[j][i] = App.currentTile;
	    }
	}
	App.map.printMap(App.map.map);
	App.map.printMap(App.control.mapbis);
    },

    keymap: {
	w: function() {App.currentTile = 'w'},
	o: function() {App.currentTile = 'o'}
    },

    initialize: function() {
	var keycodes = {
	    37: 'left',
	    38: 'up',
	    39: 'right',
	    40: 'down',
	    13: 'enter',
	    87: 'w',
	    79: 'o'
	};

	$(document).ready(function(){
	    $('#map').on('mousedown',"div.t",function(){
		var tab = $(this).attr('id').match('([0-9]+)_([0-9]+)');
		if(!tab[2]){alert("Error number 789");};
		if(App.control.mouseDown == 0){
		    App.control.mouseDownX = tab[1];
		    App.control.mouseDownY = tab[2];
		    App.control.mouseDown = 1;
		}
		App.control.drawRec(App.control.mouseDownX,App.control.mouseDownY,tab[1],tab[2]);
	    });
	});

	$(document).ready(function(){
	    $('#map').on('mouseenter',"div.t",function(){
		var tab = $(this).attr('id').match('([0-9]+)_([0-9]+)');
		if(!tab[2]){alert("Error number 789");};
		if (App.control.mouseDown == 1){
		    App.control.drawRec(App.control.mouseDownX,App.control.mouseDownY,tab[1],tab[2]);
		}
	    });
	});

	$(document).ready(function(){
	    $('#map').on('mouseup',"div.t",function(){
		var tab = $(this).attr('id').match('([0-9]+)_([0-9]+)');
		if(!tab[2]){alert("Error number 789");};
		if (App.control.mouseDown == 1){
		    App.control.mouseDown = 0;
		    App.map.map = App.control.mapbis;
		}
	    });
	});


	//Ajout de colonne et de ligne à la map
	$(document).ready(function(){
	    $('body').on('click','#apply',function(){
		var addrow = $('#addrow').val().match('([0-9]+)');
		var addcolumn = $('#addcolumn').val().match('([0-9]+)');
		var ln = App.map.map.length;
		for (var i = ln; i < ln + parseInt(addrow); i++){
		    App.map.map[i] = new Array();
		    for (var j = 0; j < App.map.map[0].length; j++){
			App.map.map[i][j] = 'e';
			var t = $('<div class="t e" id='+j+"_"+i+'></div>');
			t.css({top: i*App.map.tileShiftY, left: j*App.map.tileShiftX});
			$('#map').append(t);
		    };
		};
		var ln2 = App.map.map[0].length;
		for (var j = ln2; j < ln2 + parseInt(addcolumn); j++){
		    for (var i = 0; i < App.map.map.length; i++){
			App.map.map[i][j] = 'e';
			var t = $('<div class="t e" id='+j+"_"+i+'></div>');
			t.css({top: i*App.map.tileShiftY, left: j*App.map.tileShiftX});
			$('#map').append(t);
		    };
		};
	    });
	});



	$(document).on('keyup', function(event) {
	    if (!event.shiftKey && !event.ctrlKey && App.control.keymap[keycodes[event.which]]) {

		// En javascript les événements sont déclenchés sur un noeud de l'arbre
		// du document puis remontent jusqu'à la racine. stopPropagation() bloque
		// leur remontée à partir du point courant.
		event.stopPropagation();
		App.control.keymap[keycodes[event.which]](event);
	    }
	});
    }
}