app.collections.AssetList = Backbone.Collection.extend({

  model: app.models.Asset,
  
  url: '/data/assets.json',
  
  parse: function(response) {
    return response.assets;
  }

});
