App.map = {
  tileShiftX: 50,
    tileShiftY: 40,
    map: [
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e'],
    ['e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e', 'e']
  ]
};

App.map.positionElement = function($el, x, y) {
  $el.css({
    top: (y*this.tileShiftY)+"px",
    left: (x*this.tileShiftX)+"px"
  });
};

App.map.initialize = function(map) {

    console.log('1');
  // Save map properties
  this.width = map[0].length;
  this.height = map.length;

  var self = this;

    
  // Build the map
  _.each(map, function(line, y) {
    _.each(line, function(tile, x) {
      // $(H) où H représente un morceau de HTML renvoie un morceau
      // d'arbre représentant ce HTML.
	var t = $('<div class="t '+tile+'" id='+x+"_"+y+'></div>');
      // On applique les proprietés top et left à la tile
	t.css({top: y*self.tileShiftY, left: x*self.tileShiftX});

      // append ajoute un élément en dernier fils d'un noeud.
	$('#map').append(t);
    });
  });
};


App.map.printMap = function(map) {

  this.width = map[0].length;
  this.height = map.length;

  var self = this;

  _.each(map, function(line, y) {
    _.each(line, function(tile, x) {
	var t = $('<div class="t '+tile+'" id='+x+"_"+y+'></div>');
	t.css({top: y*self.tileShiftY, left: x*self.tileShiftX});
	$("#"+x+"_"+y).replaceWith(t);
    });
  });
};
