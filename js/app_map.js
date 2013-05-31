App.map = {};
App.sprites = {};

App.map.draw = function() {
  var o = App.player.$el.offset();
  var dh = $(window).width() - o.left;
  var dv = $(window).height() - o.top;
  var property, sign;
  if (dv > 0 && dv < 80) {
    property = "top"; sign = "-";
  } else if (o.top < 80) {
    property = "top"; sign = "+";
  } else if (o.left < 80) {
    property = "left"; sign = "+";
  } else if (dh > 0 && dh < 80) {
    property = "left"; sign = "-";
  }
  if (property && sign) {
    $("#board").css('margin-'+property,''+sign+'=160px');
  }
  if (dv < 0) {
    $("#board").css('margin-top','-='+(-dv+80)+'px');
  }

  if (dh < 0) {
    $("#board").css('margin-left','-='+(-dh+80)+'px');
  }

}

App.map.positionElement = function($el, x, y) {
  var defaults = { top: 40, left: 50, tdiff: -40, ldiff: 0 };
  var vals = _.defaults({/* TODO */},defaults);

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
  this.data = map;
  var defaults = { top: 40, left: 50, tdiff: 0, ldiff: 0 };
  _.defer(function() { $('body').addClass('up'); });

  // Build the map
  _.each(map, function(line, y) {
    _.each(line, function(tile, x) {
      // $(H) où H représente un morceau de HTML renvoie un morceau
      // d'arbre représentant ce HTML.
      //
      var tile = tile || "newlin";
      var t = $('<div class="'+tile+'" ></div>');

      // On applique les proprietés top et left à la tile
      var vals = _.defaults({/* TODO */},defaults);

      t.css({
        backgroundPositionY: vals.backgroundPositionY,
        zIndex: y + (tile == "w" ? 1 : 0)
      });


      if (tile == "w") {
        t.css('transitionDuration', "" + (0.2 + Math.random() * 1) + "s");
        t.css('transitionDelay', "" + Math.random() * 0.1 + "s");
        t.css('transitionTimingFunction', (Math.random() < 0.5 ? "ease-in" : "ease-out"));
      }

      var more = {
        bright: y!=0 && !map[y][x+1],
        bleft: y!=0 && !map[y][x-1]
      };

      _.each(more, function(maybe, c) { t.toggleClass(c,maybe); });

      if (tile == "o") {
        var shadows = {
          wup:        map[y-1] && map[y-1][x] == "w",
          wrightup:   map[y-1] && map[y-1][x+1] == "w" && map[y][x+1] == "o" && map[y-1][x] == "o",
          wright:     map[y][x+1] == "w",
          wrightdown: map[y+1] && map[y+1][x+1] == "w" && map[y][x+1] == "o",
          wdown:      map[y+1] && map[y+1][x] == "w",
          wleftdown:  map[y+1] && map[y+1][x-1] == "w" && map[y][x-1] == "o",
          wleft:      map[y][x-1] == "w",
          wleftup:    map[y-1] && map[y-1][x-1] == "w" && map[y][x-1] == "o" && map[y-1][x] == "o"
        };

        var shadowClass = _.chain(shadows).map(function(maybe, c) { return maybe && c; }).compact().value().join('-')
        t.addClass(shadowClass);
      }

      // append ajoute un élément en dernier fils d'un noeud.
      $('#map').append(t);
    });
  });

  $("#map").height(map.length*defaults.top);
};

