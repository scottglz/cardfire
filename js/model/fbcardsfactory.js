define(["model/cards"], function(Cards) {
	return {

		open: function(firebase) {
			var props = _.extend({firebase:firebase}, Cards);
			var Collection = Backbone.Firebase.Collection.extend(props);  
			return new Collection();
		},

		createNew: function(firebase) {
			var newfb = firebase.push();
			var deck = this.open(newfb);
			deck.createNew();
			return newfb.name();

		},
	};
});