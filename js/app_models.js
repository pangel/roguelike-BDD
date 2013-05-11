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
      this.walk();
    }

  },

  "creature": {
    parent: "element",
    initialize: function() {
      this.x = 0;
      this.y = 0;

      this.$el = $("<div></div>");
      this.$el.addClass(this.chain.join(' '));
      $('body').append(this.$el);
    },
    move: function(x,y) {
      var oldX = this.x, oldY = this.y,
          newX = oldX+x, newY = oldY+y;
      if (this.canMove(newX,newY)) {
        this.x = newX;
        this.y = newY;
        this.updatePosition(oldX, oldY);
      }
    },

    step: function() {
    },

    draw: function() {
      App.map.positionElement(this.$el,this.x,this.y);
    }
  },

  // FIXME: Les changements sur références objets imbriqués ne sont pas suivis.
  // FIXME: track changes on 'set'?
  // FIXME: how to allow nested changes?
  "element": {
    walkable: false,
    initialize: function() {
      this.attributes = {};
    },
    canMove: function(x,y) {
      return App.map.isWalkable(x,y);
    },
    registerPosition: function() {
      App.map.setElementPosition(this);
    },
    updatePosition: function(oldX,oldY) {
      App.map.updateElementPosition(this,oldX,oldY);
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
    initialize: function() {
      this.super();
      this.x = this.start[0];
      this.y = this.start[1];
    },
    start: [3,3]
  }
};
