// This jQuery plugin implements the $.fn.highlightText method
// making it easy to highlight text within an element by wrapping
// it in a span with a given class.
//
// To use this plugin, first select the element that contains the text
// that you want to replace, then call .highlightText() on it.
// the plugin has one required parameter and two optional parameters.
//
// $(selector).highlightText(stringToHighlight [,classesToAdd] [,fullMatchOnly])
//
// the first parameter is the string that you want to highlight.
// the second parameter is a space delimited of classes that you wish to add.
// the third parameter is a boolean value. If true, only full matches will be 
// highlighted.
//
// You can also highlight multiple strings by passing in a "|" delimited list 
// of strings.
(function($){

	$.fn.highlightText = function(str, classes, full) {
	    var re, c, f;
	    // handle arguments
	    if (typeof classes == "boolean") {
	        f = classes;
	        c = "highlight";
	    }
	    else {
	        f = full ? true : false;
	        c = classes ? classes : "highlight";
	    }
	    if (f) {
	        re = new RegExp("(\\b" + str + "\\b)", "ig");
	    }
	    else {
	        re = new RegExp("(" + str + ")", "ig");
	    }
	    // iterate through each matched element
	    return this.each(function() {
	        // loop through contents of element
	        $(this).add($(this).find("*")).contents().filter(function(){
				return this.nodeType === 3 && $(this).closest("." + c).length === 0;
			}).each(function() {
	            var output;
	            output = this.nodeValue
	                .replace(re,"<span class='" + c + "'>$1</span>");
	            if (output != this.nodeValue) {
	                $(this).wrap("<p></p>").parent()
	                    .html(output).contents().unwrap();
	            }
	        });
	    });
	};

})(jQuery)