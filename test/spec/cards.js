define(["model/cards"], function(Cards) {

	describe("cards", function() {

		var cards;

		beforeEach(function() {
			cards = new (Backbone.Collection.extend(Cards))();
			cards.createNew();
		});
		
		it("createNew", function() {
   			expect(cards.length).toBe(52);
   			var suits = ["clubs", "spades", "hearts", "diamonds"];
   			var i = 0;
	      	for (var s=0; s < 4; s++) {
	         	for (var r=1; r<=13; r++) {
	            	var card = cards.at(i++);
	            	expect(card.get("suit")).toBe(suits[s]);
	            	expect(card.get("rank")).toBe(r);
	            }
	         }
	    });
		
	});
});	