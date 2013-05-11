App.map = {};

// Not used yet, but machinery is ready to accomodate
// per-sprite sophisticated background/position shifting.
App.sprites = {
  //w: { backgroundPositionY: 0, tdiff: -40 }
};


App.map.draw = function() {}

App.map.positionElement = function($el, x, y) {
  var defaults = { top: 40, left: 50, tdiff: 0, ldiff: 0 };
  var vals = _.extend({},defaults,App.sprites[$el.attr('sprite-type')]);

  $el.css({
    top: (y*vals.top)+vals.tdiff+"px",
    left: (x*vals.left)-vals.ldiff+"px",
  });

};

App.map.disappearElement = function($el) {
  $el.remove();
};

App.map.isWalkable = function(x,y) {
  return App.map.data[y] && App.map.data[y][x] && App.map.data[y][x] != "w" &&
         !_.find(App.instances, function(e) { return e.x === x && e.y === y && !e.isWalkable(); });
};

// No diagonals
App.map.getTouching = function(x,y) {
  return _.filter(App.instances, function(e) {
    return (e.x === x && Math.abs(e.y - y) === 1) ||
           (e.y === y && Math.abs(e.x - x) === 1);
  });
};

App.map.initialize = function(map) {

  // Save map properties
  this.width = map[0].length;
  this.height = map.length;
  this.data = map;
  this.elementData = new Array(this.height);
  for (var j = 0; j < this.height; j++) {
    this.elementData[j] = new Array(this.width);
    for (var i = 0; i < this.width; i++) {
      if (map[j][i] && map[j][i] != ' ' && map[j][i] != "w") {
        this.elementData[j][i] = [];
      }
    }
  }

  var self = this;
  var defaults = { top: 40, left: 50, tdiff: 0, ldiff: 0 };

  // Build the map
  _.each(map, function(line, y) {
    _.each(line, function(tile, x) {
      // $(H) où H représente un morceau de HTML renvoie un morceau
      // d'arbre représentant ce HTML.
      var t = $('<div class="'+tile+'" ></div>');

      // On applique les proprietés top et left à la tile
      var vals = _.extend({},defaults,App.sprites[tile]);

      t.css({
        top: y*vals.top + vals.tdiff,
        left: x*vals.left + vals.ldiff,
        backgroundPositionY: vals.backgroundPositionY
      });

      // append ajoute un élément en dernier fils d'un noeud.
      $('#map').append(t);
    });
  });

  $("#map").height(map.length*defaults.top);
};

