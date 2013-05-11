window.App = {};
App.models = {};
App.instances = [];
App.status = [];

App.setStatus = function(str) {
  App.status.push(str);
};

App.drawStatus = function() {
  $c = $("#status").children();
  $c.addClass('old');
  var s = $c.size();
  var l =this.status.length;
  if (l + s > 8) {
    $c = $c.slice(0,Math.max(0,8-l));
  }

  $c.last().css('margin-bottom','10px');

  $("#status").html($c);
  _.each(this.status, function(str) {
    $("#status").append('<div>'+str+'</div>');
  });

  App.status = [];
}

App.removeInstance = function(el) {
  var index = App.instances.indexOf(el);
  if (index > -1) {
    App.instances[index] = null;
  }
};

App.step = function() {
  App.map.draw();
  _.each(this.instances, function(instance) {
      if (instance) {
        if (!instance.dead) {
          instance.step();
        }
        instance.draw();
      }
  });
  App.instances = _.compact(App.instances);

  App.drawStatus();
};

// Once a model was built and put into App.models, call new App.models.model_name() to create an instance an initialize it.
// If you want to create an instance but initialize it later, do:
// * var obj = Object.create(App.models.model_name.prototype)
// * obj.initialize()
App.buildModel = function(name) {

  // Cache for already-built models
  if (App.models[name]) { return App.models[name]; }

  var template = App.modelTemplates[name];

  // The constructor can be specified in the template. Otherwise, it will just call super().
  var Constructor = template.initialize || function() { this.super(); };

  // The constructor of the parent will be bound to super(). If there is no parent,
  // super will be the empty function.
  var ParentConstructor = template.parent ? this.buildModel(template.parent) : function() {};

  template.chain = (ParentConstructor.prototype.chain || []).concat([name]);
  template.name = name;

  Object.build(Constructor, template, ParentConstructor);

  return App.models[name] = Constructor;
};
