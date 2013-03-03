window.App = {};


App.step = function() {
  _.each(this.instances, function(instance) {
    instance.step();
    instance.draw();
  });
};

App.initializeInstances = function(instances) {

  App.instances = [];
  // Create model prototypes (for objects and monsters)
  _.each(App.models, function(model,id) {
    if (!App.types[model.type]) { throw "Unknown type: "+model.type; }

    var Constructor = model.initalizer || (function() { this.super(); });
    Object.build(Constructor, model, App.types[model.type])

    App.models[id] = Constructor;
  });

  // Create saved instances
  _.each(instances, function(instance) {
    if (!App.models[instance.model_id]) { throw "Unknown model id: "+instance.model_id; }

    var instance = new App.models[instance.model_id]();
    for (var prop in instance.attributes) {
      instance[prop] = instance.attributes[prop]
    }
    App.instances.push(instance);

  });
};

