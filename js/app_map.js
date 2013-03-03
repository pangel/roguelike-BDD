App.map = {
  tileShiftX: 50,
  tileShiftY: 40
};

App.map.positionElement = function($el, x, y) {
  $el.css({
    top: (y*this.tileShiftY)+13+"px",
    left: (x*this.tileShiftX)+13+"px"
  });
};

App.map.initialize = function(map) {

  // Save map properties
  this.width = map[0].length;
  this.height = map.length;

  var self = this;

  // Build the map
  _.each(map, function(line, y) {
    _.each(line, function(tile, x) {
      // $(H) où H représente un morceau de HTML renvoie un morceau
      // d'arbre représentant ce HTML.
      var t = $('<div class="'+tile+'" ></div>');
      // On applique les proprietés top et left à la tile
      t.css({top: y*self.tileShiftY, left: x*self.tileShiftX});

      // append ajoute un élément en dernier fils d'un noeud.
      $('body').append(t);
    });
  });
};

