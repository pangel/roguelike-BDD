App.getMap = function(mapId, success) {
  var error = function(str)  { console.error(str); };
  var xhr = $.get('/bdd/connect.php', {id: mapId});

  xhr.error(function() { error('Erreur serveur') });
  xhr.success(function(data) {
    if (!data.map) { error('Carte non trouvée'); }
    var tiles = _.map(data.map.tiles.split('\n'), function(s) {
      return s.split('')
    });
    var instances = _.map(data.content, function(el) {
      return { model_id: el.type, attributes: { x: el.startX, y: el.startY } };
    });
    success(tiles,instances);
  });
};

