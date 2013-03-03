App.models = {
  12: {
    type: "Creature",
    name: "spider",
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

  }
};


