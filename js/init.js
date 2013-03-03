// $ exécute son argument quand tout le DOM (= structure HTML)
// a été créé. Cela évite d'avoir du code qui demande l'élément X alors que X n'a
// pas encore été créé.
$(function() {
  var map = [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w','w', 'w', 'w','w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'o', 'o', 'o','o', 'o', 'o','o', 'o', 'o', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w','w', 'w', 'w','w']
  ];

  var instances = [{ model_id: "spider", attributes: { x: 3, y: 6 }}];

  App.control.initialize();
  App.map.initialize(map);

  for (var name in App.modelTemplates) {
    App.buildModel(name);
  }

  _.each(instances, function(instance) {
    var obj = new App.models[instance.model_id]();
    for (var prop in instance.attributes) {
      obj[prop] = instance.attributes[prop];
    }
    App.instances.push(obj);
  });

  App.player = new App.models.player();
  App.instances.push(App.player);
});

