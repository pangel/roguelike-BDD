App.currentTile = 'o';

App.control = {

    changeTile: function(x,y){
	console.log("bogo");
	var t = $('<div class="'+'t '+App.currentTile+'" id='+x+"_"+y+'></div>');
	t.css({top: y*App.map.tileShiftY, left: x*App.map.tileShiftX});
	$("#"+x+"_"+y).replaceWith(t);
	console.log("#"+x+"_"+y);
    },


  keymap: {
    left:  function() {  App.player.move(-1,0); App.step();},
    right: function() {  App.player.move(1,0); App.step();},
    up:    function() {  App.player.move(0,-1); App.step();},
    down:  function() {  App.player.move(0,1); App.step();},
    enter: function() {
	var x = App.player.x;
	var y = App.player.y;
	App.control.changeTile(x,y);
    },
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

    // Equivalent de la configuration des touches dans un jeu.
    // A chaque touche relachée on regarde si on a une action configurée
    // pour cette touche. Comme ça on peut changer la configuration des touches
    // au cours du jeu.

    // $(document) : sélectionne la racine du document HTML.
    // $(E).on(EVENT, FN). Exécute FN quand l'élément E reçoit l'événement EVENT.
    // FN prend généralement EVENT en argument.

      $(document).ready(function(){
	  $('body').on('click',"div.t",function(){
	      var tab = $(this).attr('id').match('([0-9]+)_([0-9]+)');
	      if(!tab[2]){alert("Error number 789");};
	      App.control.changeTile(tab[1],tab[2]);
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
		    $('body').append(t);
		};
	    };
	    var ln2 = App.map.map[0].length;
	    for (var j = ln2; j < ln2 + parseInt(addcolumn); j++){
		for (var i = 0; i < App.map.map.length; i++){
		    App.map.map[i][j] = 'e';
		    var t = $('<div class="t e" id='+j+"_"+i+'></div>');
		    t.css({top: i*App.map.tileShiftY, left: j*App.map.tileShiftX});
		    $('body').append(t);
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