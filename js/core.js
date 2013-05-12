// Set Constructor to produce instances of Parent
// Merge template into Constructor's prototype.
// Add super method to Constructor's prototype.
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

  /* ~Equivalent to:
  * function F() {}
  * F.prototype = Parent.prototype;
  * Constructor.prototype = new F();
  */
  Constructor.prototype = Object.create(Parent.prototype);

  for (var prop in template) {
    Constructor.prototype[prop] = template[prop];
  }

  Constructor.prototype.super = function() {
    Parent.apply(this,arguments)
  }
}

// Warning! Stupid capitalize, only works on non-space-prefixed single words.
String.prototype.capitalize = function() {
  return this.replace(/^./,this.charAt(0).toUpperCase());
}

// Simplified version of
// http://www.broofa.com/Tools/Math.uuid.js
Math.uuid = function () {
  var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split(''),
      radix = chars.length,
      uuid = [];

  for (var i = 0; i < 12; i++) {
    uuid[i] = chars[0 | Math.random()*radix];
  }

  return uuid.join('');
}
