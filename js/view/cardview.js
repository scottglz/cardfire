define ([], function() {
   "use strict";
   
   function makeViewDraggable(view, options) {
      var opts = _.extend({
          start: function(eo, ui) {
             if (view.onDragStart)
               view.onDragStart(eo, ui);
          },
          drag: function(eo, ui) {
             if (view.onDragDrag)
               view.onDragDrag(eo, ui);
          }
       }, options);
      view.$el.draggable(opts);  
   }   
   
	return Backbone.View.extend({
      tagName: "div",
      className: "card",
      
		initialize: function() {
         this.queueSetPos =  _.bind(_.throttle(this.setPos, 100), this);
         
         this.model.on("change:x", this._onChangeX, this)
                   .on("change:y", this._onChangeY, this)
                   .on("change:up", this._onChangeUp, this)
                   .on("change:zindex", this._onChangeZIndex, this);
         
        makeViewDraggable(this, {containment: this.$el.parent()});
   
         // Workaround for serious annoyance -- if you set up an on("click") even before calling .draggable() on an element, then you get a click
         // at the end of the drag. For some reason, if you do it in the opposite order, you don't. We don't want the click event. But we're 
         // setting up the "on" using the events hash, which happens before render time. However, we can undo that and do it again:
         this.undelegateEvents();
         this.delegateEvents();                   
		},
      
      events: {
         "click": "_onClick",
      }, 
      
      setPos: function(x, y) {
         this.model.set({x: x, y: y});
      },
      
      _onClick: function() {
         this.model.set("up", !this.model.get("up"));
      }, 
      
      onDragStart: function() {
         this.model.moveToTop();
      },
      
      onDragDrag: function(eo, ui) {
         this.queueSetPos(ui.position.left, ui.position.top);
      },   

		render: function() {
         var model = this.model;
         var suit_num = model.getSuitNumber();
			this.$el.css({
            "background-position": ((model.get("rank")-1) * -73 -1 ) + "px " + (suit_num * -98 - 1) + "px ",
            "left": model.get("x"),
            "top": model.get("y"),
            "z-index": model.get("zindex")
         });
         var up = model.get("up");
         this.$el.toggleClass("up", up).toggleClass("down", !up);
        
		},

      
      _onChangeX: function(m, v) {
          this.$el.css("left", v);
      }, 
      
      _onChangeY: function(m, v) {
          this.$el.css("top", v);
      }, 
      
      _onChangeUp: function(m, v) {
          this.$el.toggleClass("up", v).toggleClass("down", !v);
      }, 
      
      _onChangeZIndex: function(m, v) {
          this.$el.css("z-index", v);
      }   
	});
});