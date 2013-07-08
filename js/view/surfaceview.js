// surfaceview

define(["view/cardview"], function(CardView) {
   return Backbone.View.extend({
      initialize: function() {
      },

      render: function() {
         var self = this;
         var cards = this.collection;

         this.$el.droppable({
            drop: _.bind(this._onDrop, this)
         });  
        

         cards.forEach(this._add, this);
         cards.on("add", this._add, this).on("remove", this._remove, this);
      },

      _add: function(cardModel) {
         var cv = new CardView({ model: cardModel, currentUser: this.options.currentUser});
         cv.render();
         this.$el.append(cv.el);     
      },

      _onDrop: function(eo, ui) {
         var card = ui.draggable.data("view").model;
         
         if (card.collection != this.collection) {
            var newz = Math.max(0, _.max(this.collection.pluck("zindex")) + 1);
            card.collection.remove(card);
            var eloff = this.$el.offset();
            card.set({
               "zindex": newz,
               x: ui.offset.left - eloff.left,
               y: ui.offset.top - eloff.top
            });
            this.collection.add(card);
         }     

      }

   });
});