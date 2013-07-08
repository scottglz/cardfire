define ([], function() {
   "use strict";
  

   return Backbone.View.extend({
      tagName: "div",
      className: "card up",

      initialize: function() {

         this.model.on("change:zindex", this._onChangeZIndex, this)
                   .on("remove", this._onRemove, this);

         this.$el.draggable({
            containment: $("#table") // BAD coupling
          });
      },

      events: {
               
      }, 

      _getBackgroundPositionCSS: function() {
         var model = this.model,
         suit_num = model.getSuitNumber();
         return ((model.get("rank")-1) * -73 -1 ) + "px " + (suit_num * -98 - 1) + "px ";
      },

      render: function() {
         var model = this.model;
         this.$el.css({
          "background-position": this._getBackgroundPositionCSS(),
          "top": 0
         });
         this._onChangeZIndex(model, model.get("zindex"));
         this.$el.data("view", this);
      },

      _onChangeZIndex: function(m, v) {
        this.$el.css({
          "z-index": v,
          "left": v * 16
        });
      },

      _onRemove: function() {
        this.$el.remove();
      }
   });
});