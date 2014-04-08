app.models.Strategy = Backbone.Model.extend({

  defaults: function() {
    return {
      prompt: 'What is your strategy?',
      type: 'text',
      options: []
    };
  }

});