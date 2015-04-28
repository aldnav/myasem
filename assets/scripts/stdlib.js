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
	},
	display_console : function(n,type) {
		if (type == 0)
			return "<div class = 'console-line'><span class = 'alert'>"+n+"</span> <div class = 'current-input' contentEditable='true'>&nbsp;</div></div>";	
		else
			return "<div class = 'console-line'><span class = 'error'>"+n+"</span></div>";	
	}
}
var _commands = {
	// begin
	'00' : function(params) {
		//check errors
		if (params['mla'].length > 30) {
			_commands.return_error({'type': 'error', 'message':'Overflow error','ip' : -1});
		} else if (params['ip'] >= 0){
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
		var array_index = parseInt(params['mla'][params['ip']].split(" ")[1]);
		resources.memory[array_index] = input;
		return {'type': 'wait', 'message':'success','ip' : params['ip']};
	},
	// display 
	'02' : function(params) {
		var array_index = parseInt(params['mla'][params['ip']].split(" ")[1]);
		if (array_index >= 30) {
			var item = resources.memory[array_index];
			if (typeof item == 'undefined')
				$('#console').append($(elements.display_console("Error: index "+array_index+" cant be found or returned nothing",1)));
			else 
				$('#console').append($(elements.display_console(item,0)));
		}
	},
	// push i
	'03' : function(params) {
		var integer = parseInt(params['mla'][params['ip']].split(" ")[1]);
		if (resources.ram_length() < 5 ){
			if (isNumeric(integer)) {
				resources.ram.push(integer)
			} else {
				$('#console').append($(elements.display_console("Error: not an integer",1)));
			}
		} else {
			$('#console').append($(elements.display_console("Error: stack overflow",1)));
		}
		return {'type': 'wait', 'message':'success','ip' : params['ip']};		
	},
	// push variable
	'04' : function(params) {
		var array_index = parseInt(params['mla'][params['ip']].split(" ")[1]);
		if (resources.ram_length < 5 ){
			if (isNumeric(array_index) ) {
				resources.ram.push(resources.memory[array_index])
			} else {
				$('#console').append($(elements.display_console("Error: cant push integer",1)));
			}
		}
		return {'type': 'wait', 'message':'success','ip' : params['ip']};
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
		// console.log('error');
		return params;
	}
}


var resources = {
	memory : new Array(40),
	ram : new Array(5),
	ram_length: function(){
		for (var i = 0; i < this.ram.length; i++) {
			if (typeof this.ram[i] == 'undefined') {
				return i;
			};
		};
	}

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

