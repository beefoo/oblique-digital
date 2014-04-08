app.collections.StrategyList = Backbone.Collection.extend({

  model: app.models.Strategy,
  
  url: '/data/strategies.json',
  
  parse: function(response) {
    return response.strategies;
  }

});
