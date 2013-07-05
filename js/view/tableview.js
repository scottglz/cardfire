define(["view/cardview", "tpl!template/table.jst"], function(CardView, tableTemplate) {
	return Backbone.View.extend({
		initialize: function() {
		},

		events: {
			"click #shuffle": "shuffle",
			"click #allup": function() { this.getDeck().allUp(); },
			"click #alldown": function() { this.getDeck().allDown(); },
			"click #collect": function() { this.getDeck().moveAll(0, 0); }, 
			"click #spread":  function() { this.getDeck().moveAll(0,0,11,0);},
			"click #reset": function() { this.getDeck().resetAll(); }
		},

		getDeck: function() {
			return this.model.get("deck");
		},

		render: function() {
			var self = this;
			var deck = this.getDeck();

			this.$el.html(tableTemplate({}));

			var $table = this.$("#table");
			function add(cardModel) {
				var cv = new CardView({ model: cardModel});
				cv.render();
				$table.append(cv.el);		
			}

			deck.forEach(function(cardModel) {	add(cardModel);	});
			deck.on("add", function(cardModel) { add(cardModel); });	
		
		},

		shuffle: function() {
			this.getDeck().shuffle().moveAll(0,0,11,0); 
		},
	});
});