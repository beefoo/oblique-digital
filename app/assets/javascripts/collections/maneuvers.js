app.collections.ManeuverList = Backbone.Collection.extend({

  model: app.models.Maneuver,
  
  url: '/maneuvers'

});
