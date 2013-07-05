// router.js

define(["mybase", "view/tableview", "model/tablemodel", "model/fbcardsfactory"], 
	function(fb, TableView, TableModel, CardsFactory)  {
	return Backbone.Router.extend({
		routes: {
			"": "main",
			"table/:id": "table"
		},
		
		main: function() {
			var id = CardsFactory.createNew(fb);
			this.navigate("table/" + id, {trigger:true});
		},

		table: function(id) {
  			var deck = CardsFactory.open(fb.child(id));
  			var model = new TableModel({deck: deck});
			var tableView = new TableView({model: model, el: $("#all")});
			tableView.render();
		}	
	});

	

});