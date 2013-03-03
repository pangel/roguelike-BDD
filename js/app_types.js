App.types = {};

// En javascript le constructeur d'un objet est juste une fonction.
// Quand une fonction est appelée avec le mot clé new devant, un nouvel
// objet vide est créé et chaque utilisation du mot clé this dans le corps
// de la fonction fera référence à cet objet. La fonction renvoie ensuite
// automatiquement l'objet.
App.types.Creature = function() {
  this.x = 0;
  this.y = 0;

  this.$el = $("<div></div>");
  this.cssClass = this.cssClass.concat([this.name]);
  this.$el.addClass(this.cssClass.join(' '));
  $('body').append(this.$el);
};

// Les objets héritent les uns des autres à travers leurs prototypes.
// Ici tous les objets créés par new Creature() auront l'objet suivant
// comme prototype, donc ils auront tous la méthode move.
App.types.Creature.prototype = {
  cssClass: ["creature"],
  move: function(x,y) {
    this.x = Math.max(Math.min(this.x+x,App.map.width-1), 0);
    this.y = Math.max(Math.min(this.y+y,App.map.height-1), 0);
  },

  step: function() {
  },

  draw: function() {
    App.map.positionElement(this.$el,this.x,this.y);
  }
};

App.types.Player = function() {
  this.cssClass = this.cssClass.concat(['player']);
  App.types.Creature.call(this);
}

App.types.Player.prototype = Object.create(App.types.Creature.prototype);
