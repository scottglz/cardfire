// ownhandview -- view of one's own hand. These are always up, always in a z-orders fanned row. They can
// be sorted by drag drop, and you can add and remove via drag drop. Or something.

define(["view/ownhandcardview"], function(OwnHandCardView) {
   return Backbone.View.extend({
      initialize: function() {
      },

      render: function() {
         var self = this;
         var cards = this.collection;

         this.$el.addClass("ownhand");
                 

         cards.forEach(this._add, this);
         cards.on("add", this._add, this);

         this.$el.droppable({
            drop: _.bind(this._onDrop, this)
         });     

      },

      _add: function(cardModel) {
          var cv = new OwnHandCardView({ model: cardModel});
          cv.render();
          this.$el.append(cv.el); 
      },

      _onDrop: function(eo, ui) {
         var card = ui.draggable.data("view").model;
         
         if (card.collection != this.collection) {
            var newz = Math.max(0, _.max(this.collection.pluck("zindex")) + 1);
            card.collection.remove(card);
            card.set("zindex", newz);
            this.collection.add(card);
         } 
         else {
            newz = Math.min(this.collection.length - 1, Math.max(0, Math.floor(ui.position.left / 16)));
            this.collection.moveCardZ(card, newz);
            ui.draggable.css("top", 0);
         }    

      }
    });
});      