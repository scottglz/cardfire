window.onerror = function(msg, url, line) {
   var $d = $('<div class="globalerror"></div>');
   $d.text(msg).appendTo($('body'));
}

requirejs.config({
    "baseUrl": "js",
    paths: {
    	"template" : "../template",
    	"tpl": "lib/tpl"
    }
 });
require(["main"]);