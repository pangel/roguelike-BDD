App.map = {
  tileShiftX: 50,
  tileShiftY: 40
};

App.map.positionElement = function($el, x, y) {
  $el.css({
    top: (y*this.tileShiftY)+"px",
    left: (x*this.tileShiftX)+"px"
  });
};

App.map.isWalkable = function(x,y) {
  return App.map.data[y] && App.map.data[y][x] && App.map.data[y][x] != "w" &&
         !_.find(App.map.elementData[y][x], function(e) { return !e.isWalkable(); });
};

App.map.updateElementPosition = function(el,oldX,oldY) {
  var oldIndex = App.map.elementData[oldY][oldX].indexOf(el);
  if (oldIndex > -1) {
    App.map.elementData[oldY][oldX].splice(oldIndex, 1);
  } else {
    throw "Element not found on its former tile";
  }
  this.setElementPosition(el);
};

App.map.setElementPosition = function(el) {
  App.map.elementData[el.y][el.x].push(el);
}

App.map.initialize = function(map) {

  // Save map properties
  this.width = map[0].length;
  this.height = map.length;
  this.data = map;
  this.elementData = new Array(this.height);
  for (var j = 0; j < this.height; j++) {
    this.elementData[j] = new Array(this.width);
    for (var i = 0; i < this.width; i++) {
      //if (map[j][i] && map[j][i] != ' ' && map[j][i] != "w") {
        this.elementData[j][i] = [];
      //}
    }
  }

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

