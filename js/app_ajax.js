(function() {

  var error = function(str)  { console.error(str); };

App.ajax = function(params) {
  return $.get('/bdd/update.php', params).error(function(err) { error('Erreur serveur', err) });
}

App.sendGame = function(instances) {
  var instances = _.map(instances, function(attrs) {
    return { instance_id: attrs.instance_id,
             type: attrs.type,
             attributes: _.omit(attrs, 'instance_id', 'type')
           };
  });
  this.ajax({game: Bootstrap.game_id, instances: instances});
};

})();
