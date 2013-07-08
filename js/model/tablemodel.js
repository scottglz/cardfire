// tablemodel

define([], function() {
	return Backbone.Model.extend({
		validate: function() {
			if (!this.get("surfacecards"))
				return "no surface cards";
		}
	});
});