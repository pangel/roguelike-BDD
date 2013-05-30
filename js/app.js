window.App = {};
App.models = {};
App.instances = [];
App.status = [];

App.initialize = function() {
  for (var name in App.modelTemplates) {
    App.buildModel(name);
  }
};

App.initializeInstances = function(instances) {
  _.each(instances, function(instance) {
    var obj = new App.models[instance.type]();
    for (var prop in instance.attributes) {
      obj.set(prop,instance.attributes[prop]);
    }

    if (instance.instance_id) {
      obj.set('instance_id',instance.instance_id);
    } else {
      obj.set('instance_id', Math.uuid());
    }

    obj.type = instance.type; // FIXME ugly, set it up automatically / separate it from name
    App.instances.push(obj);
  });
};

App.setStatus = function(str) {
  App.status.push(str);
};

App.drawStatus = function() {
  var $s = $("#status");
  $s.children().last().addClass('bottom');
  $('<div>'+this.status.join('<br>')+'</div>').hide().appendTo($s).show("slide",{direction: "down"}, 300);
  this.status = [];
  $s.scrollTop($s[0].scrollHeight)
}

// Don't splice App.instances because we are probably
// in the middle of a loop on it.
App.removeInstance = function(el) {
  var index = App.instances.indexOf(el);
  if (index > -1) {
    App.instances[index] = null;
  }
};

App.step = function() {
  if (App.isGameOver) { return; }
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
  App.sendGame(App.dump());
};

App.gameOver = function() {
  App.isGameOver = true;
  $('.game-over').addClass('on');
};

App.wasGameOver = function() {
  App.isGameOver = true;
  $('.game-over').addClass('already-on');
};

// Once a model was built and put into App.models, call new App.models.model_name() to create an instance an initialize it.
// If you want to create an instance but initialize it later, do:
// * var obj = Object.create(App.models.model_name.prototype)
// * obj.initialize()
App.buildModel = function(name) {

  // Cache for already-built models
  if (App.models[name]) { return App.models[name]; }

  var template = App.modelTemplates[name];

  // The prototype default attributes are privately copied into the new object.
  // The constructor can be specified in the template. Otherwise, it will just call super().
  var Constructor = function() {
    this.attributes = _.extend({},this.attributes);
    if (template.initialize) {
      _.bind(template.initialize, this)(arguments);
    } else {
      this.super();
    }
  };

  // The constructor of the parent will be bound to super(). If there is no parent,
  // super will be the empty function.
  var ParentConstructor = template.parent ? this.buildModel(template.parent) : function() {};

  // Each object can specify its attributes; they will be added to their prototype's attributes
  // (and erase them in case of conflict)
  template.up = ParentConstructor.prototype;
  template.chain = (ParentConstructor.prototype.chain || []).concat([name]);
  template.attributes = _.extend({}, ParentConstructor.prototype.attributes, template.attributes);
  template.name = name;

  Object.build(Constructor, template, ParentConstructor);

  return App.models[name] = Constructor;
};

App.dump = function() {
  return _.map(App.instances, function(instance) {
    return _.extend({},instance.attributes,{type:instance.type});
  });
};
