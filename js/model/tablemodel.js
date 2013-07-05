// tablemodel

define([], function() {
	return Backbone.Model.extend({
		validate: function() {
			if (!this.get("deck"))
				return "no deck";
		}
	});
});