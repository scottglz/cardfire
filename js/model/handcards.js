// handcards -- a collection of cards in a hand

define(["model/cardmodel"], function(CardModel) {
   "use strict";

   return {
      model: CardModel,
      comparator: "zindex",

      initialize: function() {
      },

      moveCardZ: function(cardmodel, zindex) {
         var oldzindex = cardmodel.get("zindex");
            cardmodel.set("zindex", zindex);
            var modfn;
            if (zindex > oldzindex) 
               modfn = function(z) { return z > oldzindex && z <= zindex ? z-1 : z };
            else 
               modfn = function(z) { return z < oldzindex && z >= zindex ? z+1 : z };
            
            this.forEach(function(cm) {
               if (cm != cardmodel) {
                  var z = cm.get("zindex");
                  cm.set("zindex", modfn(z));
               }
            });
            this.sort();
        },


   };
});   