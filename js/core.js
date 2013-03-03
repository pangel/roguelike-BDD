// Create a new object based on this.
//Object.prototype.beget = function() {
  //var F = function() {};
  //F.prototype = this;
  //return (new F());
//};

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

  var F = function() {};
  F.prototype = Parent.prototype;
  var child = new F();

  for (var prop in template) {
    child[prop] = template[prop];
  }

  child.super = function() {
    Parent.apply(this,arguments)
  }

  Constructor.prototype = child;
}
