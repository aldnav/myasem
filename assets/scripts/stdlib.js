var input = "";
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
	'error': "99",
	get_key : function (value) {
		for (var sym in symbol_table) {
			if (sym !== 'get_key') {
				if (symbol_table[sym] === value)
					return sym;
			}
		}
	}
}

var elements = {
	read_console : function() {
		return "<div class = 'console-line'><span class = 'alert'>Read input:</span> <div class = 'current-input' contentEditable='true'>&nbsp;</div></div>";
	}
}
var _commands = {
	// begin
	'00' : function(params) {
		//check errors
		if (params['mla'].length > 30) {
			_commands.return_error({'type': 'error', 'message':'Overflow error','ip' : -1});
		} else if (params['ip'] > 0){
			_commands.return_error({'type': 'error', 'message':'Overflow error','ip' : -1});
		} else {
			for (var i = 0; i < params['mla'].length; i++) {
				resources.memory[i] = params['mla'][i];
			};
			return {'type': 'good', 'message':'success','ip' : params['ip']}; 
		}
	},
	// read 
	'01' : function(params) {
		input = 2;
		// var ent_key = false;
		// $('.current-input').attr('contentEditable',false);
		// $('#console').append($(elements.read_console()));
		// $('.current-input').last().focus();
	 //    $('#console').on('keypress','.console-line .current-input', function(e) {
	 //        if (e.which == 13) {
	 //            e.preventDefault();
	 //            clearInterval(myVar);
	 //            $(this).attr('contentEditable',false);
	 //        }
	 //    });  
	 //    var myVar = setInterval(function(){console.log("will wait")}, 1000);
		// console.log('asd');   
		params['mla'][params['mla']] = input;
		console.log(params['mla'][params['mla'][params['ip']].split(" ")[1]]);
		console.log("fuck", params['mla'][params['ip']]);
		return {'type': 'wait', 'message':'success','ip' : params['ip']};
	},
	// display 
	'02' : function(params) {
		console.log("fuck");
	},
	// push i
	'03' : function(params) {
		console.log("fuck");	
	},
	// push variable
	'04' : function(params) {
		console.log("fuck");
	},
	// pop
	'05' : function(params) {
		console.log("fuck");
	},
	// mod
	'06' : function(params) {
		console.log("fuck");
	},
	// jmp
	'07' : function(params) {
		console.log("fuck");
	},
	// jl
	'08' : function(params) {
		console.log("fuck");
	},
	// jg 
	'09' : function(params) {
		console.log("fuck");
	},
	// jeq
	'10' : function(params) {
		console.log("fuck");
	},
	// end
	'11' : function(params) {
		console.log("fuck");
	},
	// add
	'12' : function(params) {
		console.log("fuck");
	},
	// sub
	'13' : function(params) {
		console.log("fuck");
	},
	// cmp 
	'14' : function(params) {
		console.log("fuck");
	},
	// proc
	'15' : function(params) {
		console.log("fuck");
	},
	return_error : function(params) {
		console.log('error');
		return params;
	}
}


var resources = {
	memory : new Array(40),
	ram : new Array(5),

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

