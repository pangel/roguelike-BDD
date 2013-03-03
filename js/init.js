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

  var instances = [
    { model_id: 12, attributes: { x: 3, y: 6 }}
  ];

  App.player = new App.types.Player();
  App.control.initialize();
  App.map.initialize(map);
  App.initializeInstances(instances);
  App.instances.push(App.player);
});

