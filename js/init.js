// $ exécute son argument quand tout le DOM (= structure HTML)
// a été créé. Cela évite d'avoir du code qui demande l'élément X alors que X n'a
// pas encore été créé.
$(function() {
  if (Bootstrap.game) {

    var tiles = _.map(Bootstrap.game.map.tiles.split('\n'), function(s) {
      return _.map(s.split(''), function(e) { return e == "\r" ? false : e; })
    });
    tiles.pop();

    _.each(Bootstrap.game.instances, function(el) {
      el.attributes = JSON.parse(el.attributes);
    });

    App.initialize();
    App.control.initialize();
    App.map.initialize(tiles);

    App.map.draw();

    App.initializeInstances(Bootstrap.game.instances);
    App.player = _.find(App.instances, function(el) { return el.type === "player"; });
    _.each(App.instances, function(instance) {
      instance.draw();
    });
  }
});
