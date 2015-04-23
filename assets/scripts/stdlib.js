var symbol_table = {
	'read':  "01",
	'disp':  "02", 
	'pushi': "03", 
	'pushv': "04",
	'pop':   "05", 
	'mod':   "06", 
	'jmp':   "07", 
	'jl':    "08", 
	'jg':    "09", 
	'jeq':   "10", 
	'add':   "12",
	'sub':   "13", 
	'cmp':   "14",
	'proc':  "15",
	'begin': "00", 
	'end':   "11",
	'error': "99"
}


// helper functions

var replaceHtmlEntites = (function() {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp": " ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return function(s) {
        return ( s.replace(translate_re, function(match, entity) {
            return translate[entity];
    }) );
  }
})();

var isNumeric = function(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);	
}