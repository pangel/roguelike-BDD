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
    initialize: function() {
      this.x = 0;
      this.y = 0;
      this.$el = $("<div></div>");
      this.$el.addClass(this.chain.join(' '));
      $('#elements').append(this.$el);
    },
    hp: 30,
    dmg: 5,
    move: function(x,y) {
      var newX = this.x+x, newY = this.y+y;
      if (this.canMove(newX,newY)) {
        this.x = newX;
        this.y = newY;
      }
    },

    attack: function(enemy) {
      enemy.hurt(this.dmg);
      App.setStatus("Attacking enemy!");
    },

    hurt: function(dmg) {
      this.hp = Math.max(0, this.hp-dmg);
      if (this.hp == 0) { this.die(); }
    },

    die: function() {
      App.setStatus("is dead!");
      this.dead = true;
    },

    step: function() {
    },

    draw: function() {
      if (this.dead) {
        App.map.disappearElement(this.$el);
        App.removeInstance(this);
      } else {
        App.map.positionElement(this.$el,this.x,this.y);
      }
    }
  },

  "object": {
    team: -1 // Bitwise 11...11 so neutral with & operation
  },

  // FIXME: Les changements sur références objets imbriqués ne sont pas suivis.
  // FIXME: track changes on 'set'?
  // FIXME: how to allow nested changes?
  "element": {
    initialize: function() {
      this.attributes = {};
    },
    team: 1,
    walkable: false,
    touchingEnemies: function() {
      return _.filter(App.map.getTouching(this.x,this.y), function(el) { return this.team & el.team != this.team }, this)
    },
    canMove: function(x,y) {
      return App.map.isWalkable(x,y);
    },
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
    initialize: function() {
      this.super();
      this.x = this.start[0];
      this.y = this.start[1];
    },
    start: [3,3]
  }
};
