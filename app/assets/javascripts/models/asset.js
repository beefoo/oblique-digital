app.models.Asset = Backbone.Model.extend({

  defaults: function() {
    return {
      url: 'http://lorempixel.com/800/600/',
      credit: 'Lorem Pixel',
      credit_url: 'http://lorempixel.com/'
    };
  }

});
