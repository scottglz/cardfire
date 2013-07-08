define(["model/surfacecards"], function(SurfaceCards) {
	return {

		open: function(firebase) {
			var props = _.extend({firebase:firebase.child("cards")}, SurfaceCards);
			var Collection = Backbone.Firebase.Collection.extend(props);  
			return new Collection();
		},

		createNew: function(firebase) {
			var newfb = firebase.push();
			var surfaceCards = this.open(newfb);
			surfaceCards.createNew();
			return newfb.name();

		},
	};
});