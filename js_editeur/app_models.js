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
    initialize: function() {
      this.x = 0;
      this.y = 0;

      this.$el = $("<div></div>");
      this.$el.addClass(this.chain.join(' '));
      $('body').append(this.$el);
    },
    move: function(x,y) {
      this.x = Math.max(Math.min(this.x+x,App.map.width-1), 0);
      this.y = Math.max(Math.min(this.y+y,App.map.height-1), 0);
    },

    step: function() {
    },

    draw: function() {
      App.map.positionElement(this.$el,this.x,this.y);
    }
  },

  "player": {
    parent: "creature"
  }
};
