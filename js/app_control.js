App.control = {

  keymap: {
    left:  function() {  App.player.act(-1,0); App.step();},
    right: function() {  App.player.act(1,0); App.step();},
    up:    function() {  App.player.act(0,-1); App.step();},
    down:  function() {  App.player.act(0,1); App.step();}
  },

  initialize: function() {
    var keycodes = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    };

    // Equivalent de la configuration des touches dans un jeu.
    // A chaque touche relachée on regarde si on a une action configurée
    // pour cette touche. Comme ça on peut changer la configuration des touches
    // au cours du jeu.

    // $(document) : sélectionne la racine du document HTML.
    // $(E).on(EVENT, FN). Exécute FN quand l'élément E reçoit l'événement EVENT.
    // FN prend généralement EVENT en argument.
    $(document).on('keyup', function(event) {
      if (!event.shiftKey && !event.ctrlKey && App.control.keymap[keycodes[event.which]]) {

        // En javascript les événements sont déclenchés sur un noeud de l'arbre
        // du document puis remontent jusqu'à la racine. stopPropagation() bloque
        // leur remontée à partir du point courant.
        event.stopPropagation();
        App.control.keymap[keycodes[event.which]](event);
      }
    });
  }
}

