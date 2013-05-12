// $ exécute son argument quand tout le DOM (= structure HTML)
// a été créé. Cela évite d'avoir du code qui demande l'élément X alors que X n'a
// pas encore été créé.
$(function() {
  App.initialize();
  App.control.initialize();
  var mapId = 1;
  App.getMap(mapId, function(tiles, instances) {

    App.map.initialize(tiles);

    App.initializeInstances(mapId, instances);

    App.player = _.find(App.instances, function(el) { return el.type === "player"; });

    App.map.draw();
    _.each(App.instances, function(instance) {
      instance.draw();
    });
  });
});
