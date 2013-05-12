// $ exécute son argument quand tout le DOM (= structure HTML)
// a été créé. Cela évite d'avoir du code qui demande l'élément X alors que X n'a
// pas encore été créé.
$(function() {
  App.initialize();
  App.control.initialize();
  App.getMap(1, function(tiles, instances) {

    App.map.initialize(tiles);

    _.each(instances, function(instance) {
      var obj = new App.models[instance.model_id]();
      for (var prop in instance.attributes) {
        obj[prop] = instance.attributes[prop];
      }
      obj.type = instance.model_id; // FIXME ugly, set it up automatically / separate it from name
      App.instances.push(obj);
    });

    App.player = _.find(App.instances, function(el) { return el.type === "player"; });

    App.map.draw();
    _.each(App.instances, function(instance) {
      instance.draw();
    });
  });
});
