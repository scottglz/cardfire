define(["view/surfaceview", "view/ownhandview", "tpl!template/table.jst"], 
	function(SurfaceView, OwnHandView, tableTemplate) {
	return Backbone.View.extend({
		initialize: function() {
		},

		events: {
			"click #shuffle": "shuffle",
			"click #allup": function() { this.getSurfaceCards().allUp(); },
			"click #alldown": function() { this.getSurfaceCards().allDown(); },
			"click #collect": function() { this.getSurfaceCards().moveAll(0, 0); }, 
			"click #spread":  function() { this.getSurfaceCards().moveAll(0,0,11,0);},
			"click #reset": function() { this.getSurfaceCards().resetAll(); }
		},

      getSurfaceCards: function() {
         return this.model.get("surfacecards");
      },

		render: function() {
			this.$el.html(tableTemplate({}));
			this.surface = new SurfaceView({
				el: this.$("#surface"),
				collection: this.model.get("surfacecards")
			});
			this.surface.render();

			this.ownhand = new OwnHandView({
				el: this.$("#myhand"),
				collection: this.model.get("handcards")
			});
			this.ownhand.render();
		},

		shuffle: function() {
         this.getSurfaceCards().shuffle().moveAll(0,0,11,0); 
      },

	});
});