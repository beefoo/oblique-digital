// The Application
// ---------------
app.views.AppView = Backbone.View.extend({

  el: 'body',

  initialize: function() {
    var that = this;
    this.strategies = new app.collections.StrategyList;
    this.assets = new app.collections.AssetList;    
    this.strategies.fetch({
      success: function(){             
        that.assets.fetch({
          success: function(){         
            that.onFirstLoad();
          }
        });
      }
    });    
  },
  
  getRandomAsset: function(){
    var len = this.assets.length,
        random = Math.floor(Math.random() * len);
    return this.assets.at(random);
  },
  
  getRandomStrategy: function(){
    var len = this.strategies.length,
        random = Math.floor(Math.random() * len);
    return this.strategies.at(random);
  },
    
  showRandomStrategy: function(){
    var strategy = this.getRandomStrategy(),
        asset = this.getRandomAsset(),
        options = $.extend({},strategy.toJSON(),asset.toJSON()),
        maneuver = new app.models.Maneuver(options),
        maneuver_view = new app.views.ManeuverView({model: maneuver});
    this.$('#strategies').html(maneuver_view.render().$el);
  },
  
  onFirstLoad: function(){
    this.showRandomStrategy();
  }

});
