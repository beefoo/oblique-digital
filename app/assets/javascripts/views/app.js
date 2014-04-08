// The Application
// ---------------
app.views.AppView = Backbone.View.extend({

  el: 'body',
  
  keywords: [
    'children', 'war', 'depression', 
    'nature', 'new york', 'stage', 'art',
    'architecture', 'indigenous', 'botany',
    'religion', 'photography'
  ],
  loaded_keywords: [],

  initialize: function() {
    var that = this,
        keyword = this.getRandomKeyword();
    this.strategies = new app.collections.StrategyList;
    this.assets = new app.collections.AssetList;
    this.assets.keyword = keyword;
    this.strategies.fetch({
      success: function(){             
        that.assets.fetch({
          success: function(response_assets){
            console.log('Loaded ' + response_assets.length + ' assets around '+keyword);      
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
  
  getRandomKeyword: function(){
    // only return one we haven't loaded yet
    var queue = _.difference(this.keywords, this.loaded_keywords),
        len = queue.length,
        random = Math.floor(Math.random() * len),
        keyword = false;
        
    if (len>0) {
      keyword = queue[random];
      this.loaded_keywords.push(keyword);
    }
        
    return keyword;
  },
  
  getRandomStrategy: function(){
    var len = this.strategies.length,
        random = Math.floor(Math.random() * len);
    return this.strategies.at(random);
  },
  
  loadMoreAssets: function(){
    var that = this,
        new_assets = new app.collections.AssetList,
        keyword = this.getRandomKeyword();
    
    if (keyword) {
      new_assets.keyword = keyword;
      new_assets.fetch({
        success: function(response_assets){    
          console.log('Loaded ' + response_assets.length + ' more assets around '+keyword);
          that.assets.add(response_assets.toJSON());
        }
      });
    }
  },
  
  randomlyLoadMoreAssets: function(){
    var random = Math.floor(Math.random() * 6);
    if (random === 0) {
      this.loadMoreAssets();
    }
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
    
    // randomly load more assets
    this.randomlyLoadMoreAssets();
  },
  
  onFirstLoad: function(){
    this.$('.loading').hide();
    this.showRandomStrategy();
  }

});
