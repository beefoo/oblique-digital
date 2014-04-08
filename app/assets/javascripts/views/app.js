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
    var that = this,
        strategy = this.getRandomStrategy(),
        asset = this.getRandomAsset(),
        options = $.extend({},strategy.toJSON(),asset.toJSON()),
        maneuver = new app.models.Maneuver(options);
    
    // remove current view if it exists
    if (this.current_view) {
      this.current_view.remove();
    }
    
    // initialize view
    this.current_view = new app.views.ManeuverView({
      parent: that,
      model: maneuver
    });
    
    // add view to page
    this.$('#strategies').html(this.current_view.render().$el);
  },
  
  onFirstLoad: function(){
    this.showRandomStrategy();
  }

});
