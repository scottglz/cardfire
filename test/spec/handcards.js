define(["model/handcards"], function(Cards) {

   describe("handcards", function() {

      var cards;

      beforeEach(function() {
         cards = new (Backbone.Collection.extend(Cards))();
      });
      
      it("requestMoveZ", function() {

         expect(cards.length).toBe(0);
         cards.add([{suit: "spades", rank:1, zindex:0}, {suit: "spades", rank:2, zindex:1}, {suit: "spades", rank:3, zindex:2}]);
         cards.moveCardZ(cards.at(0), 2);
         for (var i=0; i < cards.length; i++)
            expect(cards.at(i).get("zindex")).toBe(i); 
         expect(cards.at(2).get("rank")).toBe(1);     
       });

      it("requestMoveZ2", function() {

         expect(cards.length).toBe(0);
         cards.add([{suit: "spades", rank:1, zindex:0}, {suit: "spades", rank:2, zindex:1}, {suit: "spades", rank:3, zindex:2}]);
         cards.moveCardZ(cards.at(2), 0);
         for (var i=0; i < cards.length; i++)
            expect(cards.at(i).get("zindex")).toBe(i); 
         expect(cards.at(2).get("rank")).toBe(2);     
       });
      
   });
});   