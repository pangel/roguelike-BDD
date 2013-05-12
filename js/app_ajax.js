(function() {

  var error = function(str)  { console.error(str); };

  var getSuccess = function(success) {
    return function(data) {
      if (!data.map) { error('Carte non trouvée'); }
      var tiles = _.map(data.map.tiles.split('\n'), function(s) {
        return s.split('')
      });
      var instances = _.map(data.instances, function(el) {
        return { type: el.type, attributes: _.omit(el,type) };
      });
      success(tiles,instances);
    };
  };

App.ajax = function(params) {
  return $.get('/bdd/update.php', params).error(function(err) { error('Erreur serveur', err) });
}

App.getMap = function(mapId, success) {
  this.ajax({method: "map", id: mapId}).success(getSuccess(success));
};

App.getGame = function(gameId, success) {
  this.ajax({method: "game", id: mapId}).success(getSuccess(success));
};

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
