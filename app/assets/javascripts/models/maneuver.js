app.models.Maneuver = Backbone.Model.extend({

  defaults: function() {
    return {
      prompt: 'What is your strategy?',
      type: 'text',
      options: [],
      url: 'http://lorempixel.com/800/600/',
      credit: 'Lorem Pixel',
      credit_url: 'http://lorempixel.com/',
      input: 'I do not need a strategy'
    };
  }

});
