app.collections.AssetList = Backbone.Collection.extend({

  model: app.models.Asset,
  
  keyword: 'new york',
  
  url: function(){
    return '/nypl?q='+encodeURIComponent(this.keyword);
  },
  
  parse: function(response) {
    return response.nyplAPI.response.result || [];  
  }

});
