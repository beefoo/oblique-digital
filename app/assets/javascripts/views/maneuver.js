// Maneuver View
// --------------
app.views.ManeuverView = Backbone.View.extend({
  
  className: 'maneuver',
  tagName: 'div',  

  initialize: function(options) {
    this.parent = options.parent;
    // this.listenTo(this.model, 'change', this.render);    
  },
  
  addButtonListeners: function(){
    var that = this;
    
    // Tap/click button
    this.$el.find('.submit-button').hammer().on('tap', function(e) { 
      var $el = $(e.currentTarget),
          value = $el.text();
      that.submitInput(value);
    });
  },
  
  addFormListeners: function(){
    var that = this;
    
    // Submit form
    this.$el.find('.maneuver-form').on('submit', function(e) {
      e.preventDefault();
      
      var $input = $(this).find('input').first(),
          value = $input.val();
      that.submitInput(value);
    });
  },
  
  addLineListeners: function(){
    var that = this,
        $canvas = this.$el.find('.canvas'),
        $line = this.$el.find('.line'),
        canvasX = 0, canvasY = 0, canvasW = 0, canvasH = 0,
        startX = 0, startY = 0, endX = 0, endY = 0;
    
    // Starting to drag rectangle, remember start values
    $canvas.hammer().on('dragstart', function(e) {
      e.stopPropagation();
      canvasX = $canvas.offset().left;
      canvasY = $canvas.offset().top;
      canvasW = $canvas.width();
      canvasH = $canvas.height();
      var eventX = (e.gesture) ? e.gesture.center.pageX : e.originalEvent.pageX,
          eventY = (e.gesture) ? e.gesture.center.pageY : e.originalEvent.pageY,
          offsetX = eventX - canvasX,
          offsetY = eventY - canvasY;
      startX = offsetX;
      startY = offsetY;
      $line.css({
        left: startX+'px',
        top: startY+'px'
      });
      $line.show();
    });
    
    // Dragging line, update line
    $canvas.hammer().on('drag', function(e) {
      var eventX = e.gesture.center.pageX,
          eventY = e.gesture.center.pageY,
          offsetX = eventX - canvasX,
          offsetY = eventY - canvasY,
          width = that.lineDistance(startX, startY, offsetX, offsetY),
          angle = that.lineAngle(startX, startY, offsetX, offsetY);
      
      // update line css 
      $line.css({
        width: width+'px',
        'webkitTransform': 'rotate('+angle+'deg)',
        'MozTransform': 'rotate('+angle+'deg)',
        'msTransform': 'rotate('+angle+'deg)',
        'OTransform': 'rotate('+angle+'deg)',
        'transform': 'rotate('+angle+'deg)',
        'webkitTransformOrigin': '0 0',
        'MozTransformOrigin': '0 0',
        'msTransformOrigin': '0 0',
        'OTransformOrigin': '0 0',
        'transformOrigin': '0 0'
      });
      
      // rememember last position
      endX = offsetX;
      endY = offsetY;
    });
    
    // Stopped dragging line: submit coordinates
    $canvas.hammer().on('dragend', function(e) { 
      var x1 = parseFloat(startX/canvasW) * 100,
          y1 = parseFloat(startY/canvasH) * 100,
          x2 = parseFloat(endX/canvasW) * 100,
          y2 = parseFloat(endY/canvasH) * 100,
          value = [x1,y1,x2,y2];
          
      that.submitInput(value);   
    });
  },
  
  addPointListeners: function(){
    var that = this;
    
    // Tap/click: find the X/Y coordinate relative to target
    this.$el.find('.target').hammer().on('tap', function(e) { 
      var $el = $(e.currentTarget),
          width = $el.width(),
          height = $el.height(),
          elX = $el.offset().left,
          elY = $el.offset().top,
          eventX = e.gesture.center.pageX,
          eventY = e.gesture.center.pageY,
          offsetX = eventX - elX,
          offsetY = eventY - elY,
          percentX = parseFloat(offsetX/width) * 100,
          percentY = parseFloat(offsetY/height) * 100;
      that.submitInput([percentX, percentY]);
    });
  },
  
  addRectangleListeners: function(){
    var that = this,
        $canvas = this.$el.find('.canvas'),
        $rectangle = this.$el.find('.rectangle'),
        canvasX = 0, canvasY = 0, canvasW = 0, canvasH = 0,
        startX = 0, startY = 0;
    
    // Starting to drag rectangle, remember start values
    $canvas.hammer().on('dragstart', function(e) {
      e.stopPropagation();
      canvasX = $canvas.offset().left;
      canvasY = $canvas.offset().top;
      canvasW = $canvas.width();
      canvasH = $canvas.height();
      var eventX = (e.gesture) ? e.gesture.center.pageX : e.originalEvent.pageX,
          eventY = (e.gesture) ? e.gesture.center.pageY : e.originalEvent.pageY,
          offsetX = eventX - canvasX,
          offsetY = eventY - canvasY;
      startX = offsetX;
      startY = offsetY;
      $rectangle.show();
    });
    
    // Dragging rectangle, update rectangle
    $canvas.hammer().on('drag', function(e) {
      var eventX = e.gesture.center.pageX,
          eventY = e.gesture.center.pageY,
          offsetX = eventX - canvasX,
          offsetY = eventY - canvasY,
          width = Math.abs(offsetX-startX),
          height = Math.abs(offsetY-startY),
          left = (offsetX - startX < 0) ? offsetX : startX,
          top = (offsetY - startY < 0) ? offsetY : startY;
      
      // update rectangle css 
      $rectangle.css({
        width: width+'px',
        height: height+'px',
        left: left+'px',
        top: top+'px'
      });
    });
    
    // Stopped dragging rectangle: submit coordinates/dimensions
    $canvas.hammer().on('dragend', function(e) { 
      var x = parseFloat(parseFloat($rectangle.css('left'))/canvasW) * 100,
          y = parseFloat(parseFloat($rectangle.css('top'))/canvasH) * 100,
          w = parseFloat($rectangle.width()/canvasW) * 100,
          h = parseFloat($rectangle.height()/canvasH) * 100,
          value = [x,y,w,h];
          
      that.submitInput(value);      
    });
    
  },
  
  assignListeners: function(){
    var type = this.model.get('type');
    switch(type) {
      case 'line':
        this.addLineListeners();
        break;
      case 'number':
      case 'text':
        this.addFormListeners();
        break;
      case 'options':
        this.addButtonListeners();
        break;
      case 'point':
        this.addPointListeners();
        break;
      case 'rectangle':
        this.addRectangleListeners();
        break;
    }
  },
  
  lineAngle: function( x1, y1, x2, y2 ) {
    var xs = x2 - x1,
        ys = y2 - y1,
        theta = Math.atan2(-ys, xs);
    
    if (theta < 0) theta += 2 * Math.PI;
    
    return (360 - theta * 180 / Math.PI);
  },
  
  lineDistance: function( x1, y1, x2, y2 ) {
    var xs = x2 - x1,
        ys = y2 - y1;
   
    xs = xs * xs;
    ys = ys * ys;
   
    return Math.sqrt( xs + ys );
  },

  render: function() {
    this.$el.html(this.template(this.model.toJSON()));
    this.assignListeners();
    return this;
  },
  
  submitInput: function(value){
    console.log('Submitting input: '+value);
    this.model.set('input', value);
    // TODO: save to database
    // this.model.save();
    this.parent.showRandomStrategy();
  },
  
  template: function(options){
    var type = options.type;
    return JST['maneuvers/'+type](options);
  },

});
