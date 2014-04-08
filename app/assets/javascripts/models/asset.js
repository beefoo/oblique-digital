app.models.Asset = Backbone.Model.extend({

  defaults: function() {
    return {
      image_url: 'http://lorempixel.com/800/600/',
      credit: 'Lorem Pixel',
      credit_url: 'http://lorempixel.com/'
    };
  },
  
  parse: function(result){
    return {
      image_url: 'http://images.nypl.org/index.php?id='+result.imageID+'&t=w',
      credit: "NYPL Digital Collections",
      credit_url: result.itemLink
    }
  }

});
