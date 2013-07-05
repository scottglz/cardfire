define([], function() {
	return Backbone.Model.extend({
		moveToTop: function() {
			this.trigger("requestMoveToTop", this);
		},

		getSuitNumber: function() {
			return {"clubs": 0, "spades":1, "hearts":2, "diamonds":3}[this.get("suit")];
		},

		// Sets this card's z-index based on its suit and rank
		resetZIndex: function() {
			var newz = 13 * this.getSuitNumber() + this.get("rank");
			this.set("zindex", newz);

		}
	});
});