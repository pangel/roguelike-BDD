// Modify 'Constructor' so its prototype is a copy of 'template' and
// that copy of 'template' has the prototype of Parent as its prototype.
// Final result:
//
//      new Constructor() --> object
//             |
//             |
//         (prototype)
//             |
//             |
//      copy of template
// + super: function() {  Parent() }
//             |
//             |
//         (__proto__)
//             |
//             |
//       Parent.prototype
Object.build = function(Constructor,template,Parent) {
  var Model = function() {};
  Model.prototype = Parent.prototype;
  var child = new Model();

  for (var prop in template) {
    child[prop] = template[prop];
  }

  child.super = function() {
    Parent.apply(this,arguments)
  }

  Constructor.prototype = child;
}
