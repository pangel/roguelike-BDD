App.map = {};

// Not used yet, but machinery is ready to accomodate
// per-sprite sophisticated background/position shifting.
App.sprites = {
  //w: { backgroundPositionY: 0, tdiff: -40 }
};


App.map.draw = function() {}

App.map.positionElement = function($el, x, y) {
  var defaults = { top: 40, left: 50, tdiff: -20, ldiff: 0 };
  var vals = _.extend({},defaults,App.sprites[$el.attr('sprite-type')]);

  $el.css({
    top: (y*vals.top)+vals.tdiff+"px",
    left: (x*vals.left)+vals.ldiff+"px",
    zIndex: y
  });

};

App.map.disappearElement = function($el) {
  $el.remove();
};

App.map.isWalkable = function(x,y) {
  return App.map.data[y] && App.map.data[y][x] && App.map.data[y][x] != "w" &&
         !_.find(App.instances, function(e) { return e.get('x') === x && e.get('y') === y && !e.isWalkable(); });
};

// No diagonals
App.map.getTouching = function(x,y) {
  return _.filter(App.instances, function(e) {
    return (e.get('x') === x && Math.abs(e.get('y') - y) === 1) ||
           (e.get('y') === y && Math.abs(e.get('x') - x) === 1);
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
        top: y*vals.top - 40 + vals.tdiff,
        left: x*vals.left + vals.ldiff,
        backgroundPositionY: vals.backgroundPositionY,
        zIndex: y + (tile == "w" ? 1 : 0)
      });

      if (tile == "o") {
        if (map[y-1] && map[y-1][x] == "w") {
          t.addClass('wup');
        }

        if (map[y-1] && map[y-1][x+1] == "w" && map[y][x+1] == "o" && map[y-1][x] == "o") {
          t.addClass('wrightup');
        }

        if (map[y][x+1] == "w") {
          t.addClass('wright');
        }

        if (map[y+1] && map[y+1][x+1] == "w" && map[y][x+1] == "o") {
          t.addClass('wrightdown');
        }

        if (map[y+1] && map[y+1][x] == "w") {
          t.addClass('wdown');
        }

        if (map[y+1] && map[y+1][x-1] == "w" && map[y][x-1] == "o") {
          t.addClass('wleftdown');
        }

        if (map[y][x-1] == "w") {
          t.addClass('wleft');
        }

        if (map[y-1] && map[y-1][x-1] == "w" && map[y][x-1] == "o" && map[y-1][x] == "o") {
          t.addClass('wleftup');
        }
      }

      // append ajoute un élément en dernier fils d'un noeud.
      $('#map').append(t);
    });
  });

  $("#map").height(map.length*defaults.top);
};

