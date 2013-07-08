// surfacecards -- a collection of cards on a surface.

define(["model/cardmodel"], function(CardModel) {
	"use strict";
	return {  
		model: CardModel,

		initialize: function() {
 			this.on("requestMoveToTop", this._onRequestMoveToTop, this);
		},

		comparator: "zindex",
     
        _onRequestMoveToTop: function(cardmodel) {
        	var oldzindex = cardmodel.get("zindex");
            cardmodel.set("zindex", 52);
            this.forEach(function(cm) {
               if (cm != cardmodel) {
                  var z = cm.get("zindex");
                  if (z > oldzindex)
                     cm.set("zindex", z-1);
               }

            });	
            this.sort();
        },

        resetAll: function() {
        	this.forEach(function(card) {
        		card.resetZIndex();
        	});
        	this.sort();
        	this.allUp();
          	this.moveAll(0,0,11,0);	
        },

        createNew: function() {
		  var all = [];
	      var suits = ["clubs", "spades", "hearts", "diamonds"];
	      for (var s=0; s < 4; s++) {
	         for (var i=1; i<=13; i++) {
	            all.push({
	               suit:suits[s],rank:i
	            });
	         }
	      }
	      this.add(all);
	      this.resetAll();

      
        },

        shuffle: function() {

        	function getRandomInt(min, max) {
					return Math.floor(Math.random() * (max - min + 1)) + min;
			}
        	var self = this;
        	this.forEach(function(card) {
        		var otherIdx = getRandomInt(0, self.length-1);
        		var otherCard = self.at(otherIdx);
        		var tmp = card.get("zindex");
        		card.set("zindex", otherCard.get("zindex"));
        		otherCard.set("zindex", tmp);
        	});
        	this.sort();
        	return this;
        },

        _setAll: function() {
        	var args = arguments;
        	this.forEach(function(model) {
        		model.set.apply(model, args);
        	});
        	return this;
        },

        allUp: function() { 
        	return this._setAll("up", true)
        },

        allDown: function() {
        	return this._setAll("up", false)
        },
        	
        moveAll: function(x,y, dx, dy) {
        	dx = dx || 0;
        	dy = dy || 0;
        	this.forEach(function(card) {
        		card.set({x: x, y: y});
        		x += dx;
        		y += dy;
        	});
        	return this;
        }


	};  
});