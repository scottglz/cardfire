define(["model/cardmodel"], function(CardModel) {

	describe("cardmodel", function() {
		
		it("getSuitNumber", function() {
			var card = new CardModel({suit: "clubs"});
			expect(card.getSuitNumber()).toBe(0);
			card.set("suit", "spades");
			expect(card.getSuitNumber()).toBe(1);
			card.set("suit", "hearts");
			expect(card.getSuitNumber()).toBe(2);
			card.set("suit", "diamonds");
			expect(card.getSuitNumber()).toBe(3);
		});

		it("resetZIndex", function() {
			var card = new CardModel({suit: "spades", rank: 10});
			card.resetZIndex();
			expect(card.get("zindex")).toBe(23);	
		});
	});
});	