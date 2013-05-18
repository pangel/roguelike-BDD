// $ exécute son argument quand tout le DOM (= structure HTML)
// a été créé. Cela évite d'avoir du code qui demande l'élément X alors que X n'a
// pas encore été créé.
$(function() {

    var map = App.map.map;



  var instances = [];

  App.map.initialize(map);
    _.each(App.tiles, function(tile){
	var t = $('<div class="tt '+tile.id+'" id="'+tile.id+'"></div>');
	$('#tiles').append(t);
    });

    App.map.positionElement($("#initpos"),"0","0");

  App.control.initialize();




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
});
