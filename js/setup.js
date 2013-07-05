requirejs.config({
    "baseUrl": "js",
    paths: {
    	"template" : "../template",
    	"tpl": "lib/tpl"
    }
 });
require(["main"]);