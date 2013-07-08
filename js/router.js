// router.js

define(["mybase", "view/tableview", "model/tablemodel", "model/fbcardsfactory", "model/handcards"], 
	function(mainfb, TableView, TableModel, CardsFactory, HandCards)  {
	return Backbone.Router.extend({
		routes: {
			"": "main",
			"table/:id": "table"
		},
		
		main: function() {
			var id = CardsFactory.createNew(mainfb);
			this.navigate("table/" + id, {trigger:true});
		},

		table: function(id) {
         var tablefb = mainfb.child(id);
  			var deck = CardsFactory.open(tablefb);

         var currentUser = this._getUserID();
         var props = _.extend({firebase:tablefb.child("hands/" + currentUser)}, HandCards);
         var handCardsCollection = new (Backbone.Firebase.Collection.extend(props))();  

  			var model = new TableModel({
            surfacecards: deck,
            handcards: handCardsCollection
         });
			var tableView = new TableView({
				model: model, 
				el: $("#all"),
				currentUser: this._getUserID()
			});
			tableView.render();
		},

		_getUserID: function() {
			var id = localStorage.getItem("userid");
			if (!id) {
	      	var d = new Date().getTime();
    			id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        			var r = (d + Math.random()*16)%16 | 0;
        			d = Math.floor(d/16);
        			return (c=='x' ? r : (r&0x7|0x8)).toString(16);
    			});
    			localStorage.setItem("userid", id);
			}
			return id;
		}	
	});

	

});