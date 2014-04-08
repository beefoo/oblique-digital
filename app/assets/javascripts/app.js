window.app = {  
  models: {},
  collections: {},
  views: {},
  routers: {},
  init: function() {
    var csrf_token = $("meta[name='csrf-token']").attr('content');
    // adds the X-CSRF-Token header with each Ajax call
    Backbone.sync = (function(original) {
      return function(method, model, options) {
        options.beforeSend = function(xhr) {
          xhr.setRequestHeader('X-CSRF-Token', csrf_token);
        };
        original(method, model, options);
      };
    })(Backbone.sync);    
    
    app.routers.main = new app.routers.MainRouter();
    // Enable pushState for compatible browsers
    var enablePushState = true;
    // Disable for older browsers
    var pushState = !!(enablePushState && window.history && window.history.pushState);
    // Start **Backbone History**
    Backbone.history = Backbone.history || new Backbone.History({});
    Backbone.history.start({
      pushState:pushState
    });
  },
  csrfToken: $("meta[name='csrf-token']").attr('content')
};

// Define routes
app.routers.MainRouter = Backbone.Router.extend({

  routes: {
    '': 'random',
    'demo': 'demo'
  },
  
  demo: function(){},
  
  random: function(){
    app.views.main = new app.views.AppView();
  }

});

// Init backbone app
$(document).ready(function(){
  app.init(); 
});