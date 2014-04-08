// Maneuver View
// --------------
app.views.ManeuverView = Backbone.View.extend({

  tagName: 'div',
  template: JST['maneuver'],

  events: {
    'click .something': 'doSomething'
  },

  initialize: function() {
    // this.listenTo(this.model, 'change', this.render);    
  },
  
  doSomething: function(e){
    
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

});
