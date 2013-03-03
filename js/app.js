window.App = {};
App.models = {};
App.instances = [];

App.step = function() {
  _.each(this.instances, function(instance) {
    instance.step();
    instance.draw();
  });
};

App.buildModel = function(name) {

  // Cache for already-built models
  if (App.models[name]) { return App.models[name]; }

  var template = App.modelTemplates[name];

  // The constructor of the parent will be bound to super(). If there is no parent,
  // super will be the empty function.
  var ParentConstructor = template.parent ? this.buildModel(template.parent) : function() {};

  // The constructor can be specified in the template. Otherwise, it will just call super().
  var Constructor = template.initialize || function() { this.super(); };

  Object.build(Constructor, template, ParentConstructor);

  // Automatically set the css class unless the template has already done that.
  if (!Constructor.prototype.hasOwnProperty("cssClass")) {
    Constructor.prototype.cssClass = (Constructor.prototype.cssClass || []).concat([name]);
  }

  return App.models[name] = Constructor;
};
