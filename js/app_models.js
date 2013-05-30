App.modelTemplates = {
  "spider": {
    parent: "creature",
    walk: function() {
      var mv = Math.random();
      var v = mv < 0.3 ? 0 : (mv < 0.6 ? 1 : -1);
      if (Math.random() < 0.5) {
        this.move(v,0);
      } else {
        this.move(0,v);
      }
    },

    step: function() {
      var enemy;
      if (enemy = this.touchingEnemies()[0]) {
        this.attack(enemy);
      } else {
        this.walk();
      }
    }

  },

  "creature": {
    parent: "element",
    team: 1,
    initialize: function() {
      this.set('x',0);
      this.set('y',0);
      this.$el = $("<div></div>");
      this.$el.addClass(this.chain.join(' '));
      $('#elements').append(this.$el);
    },
    dmg: 5,
    attributes: {
      hp: 30
    },
    move: function(x,y) {
      var newX = this.get('x')+x,
          newY = this.get('y')+y;
      if (this.canMove(newX,newY)) {
        this.set('x',newX);
        this.set('y',newY);
      }
    },

    touchingEnemies: function() {
      return _.filter(App.map.getTouching(this.get('x'),this.get('y')), function(el) { return (this.team & el.team) != this.team }, this)
    },
    canMove: function(x,y) {
      return App.map.isWalkable(x,y);
    },

    attack: function(enemy) {
      App.setStatus(this.name.capitalize() + " attaque "+ enemy.name.capitalize() + " !");
      enemy.hurt(this.dmg);
    },

    hurt: function(dmg) {
      this.set('hp',Math.max(0, this.get('hp')-dmg));
      App.setStatus(this.name.capitalize() + " reçoit "+ dmg + " points de dégâts ! Il lui reste " + this.get('hp') + "pv !");
      if (this.get('hp') == 0) { this.die(); }
    },

    die: function() {
      App.setStatus(this.name.capitalize() + " est mort!");
      this.dead = true;
    },

    step: function() {
    },

    draw: function() {
      if (this.dead) {
        App.map.disappearElement(this.$el);
        App.removeInstance(this);
      } else {
        App.map.positionElement(this.$el,this.get('x'),this.get('y'));
      }
    }
  },

  "object": {
  },

  // FIXME: Les changements sur références objets imbriqués ne sont pas suivis.
  // FIXME: track changes on 'set'?
  // FIXME: how to allow nested changes?
  "element": {
    initialize: function() {
    },
    attributes: {
      x: 0,
      y: 0
    },
    team: -1, // Bitwise 11...11 so neutral with & operation
    walkable: false,
    isWalkable: function() {
      return !!this.walkable;
    },
    set: function(key,value) {
      this.attributes[key] = value;
    },
    get: function(key) {
      return this.attributes[key];
    },
    diff: function() {
      var self = this;
      var diff = {};
      _.each(self.attributes, function(value,key) {
        if (value != self.oldAttributes[key]) {
          diff[key] = value;
        }
      });
    },
    saved: function() {
      this.oldAttributes = this.attributes;
    },
    props: function() {
      isWalkable: false;
    }
  },

  "player": {
    parent: "creature",
    team: 2,
    dmg: 10,
    die: function() {
      this.up.die();
    App.gameOver();
    },
    initialize: function() {
      this.super();
      this.name = "Joueur";
    },
    act: function(dx,dy) {
      var collision = function(e) {
        return dx === e.get('x')-this.get('x') &&
               dy === e.get('y')-this.get('y');
      };
      var enemy = _.find(this.touchingEnemies(), collision, this);
      if (enemy) {
        this.attack(enemy);
      } else {
        this.move(dx,dy);
      }
    }
  }
};
