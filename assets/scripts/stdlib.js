var input_error = false;
var wait = false;
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
			return "<div class = 'console-line'><span class = 'alert'>"+n+"</span></div>";	
		else
			return "<div class = 'console-line'><span class = 'error'>"+n+"</span></div>";	
	}
}
var _commands = {
	// begin
	'00' : function(params) {
		//check errors
		if (params['mla'].length > 30) {
			$('#console').append($(elements.display_console("Error: Overflow Error",1)));
			return {'type': 'error', 'message':'success','ip' : -1}; 
		} else if (params['ip'] > 0){
			$('#console').append($(elements.display_console("Error: misplaced begin",1)));
			return {'type': 'error', 'message':'success','ip' : -1}; 
		} else {
			for (var i = 0; i < params['mla'].length; i++) {
				resources.memory[i] = params['mla'][i];
			};
			return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1}; 
		}
	},
	// read 
	'01' : function(params) {
		input = 2;
		wait = true;
		$('.current-input').attr('contentEditable',false);
		$('#console').append($(elements.read_console()));
		$('.current-input').last().focus();
	    $('#console').on('keypress','.console-line .current-input', function(e) {
	        if (e.which == 13) {
	            e.preventDefault();
	            $(this).attr('contentEditable',false);
	            var array_index = params['mla'][params['ip']].split(" ")[1];
	            console.log($(this).text());
				resources.memory[array_index] = $(this).text();
	            if (!isNumeric($(this).text()) || parseInt($(this).text()) > 99) {
	            	input_error = true;	
	            }
	            wait =false;
	        }
	    });      
		return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};
	},
	// display 
	'02' : function(params) {
		var array_index = params['mla'][params['ip']].split(" ")[1];
		if (array_index >= 30) {
			var item = resources.memory[array_index];
			if (typeof item == 'undefined'){
				$('#console').append($(elements.display_console("Error: index "+array_index+" cant be found or returned nothing",1)));
				return {'type': 'error', 'message':'success','ip' : -1};
			}
			else {
				$('#console').append($(elements.display_console(item,0)));
				return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};
			}
		}
	},
	// push i
	'03' : function(params) {
		var integer = params['mla'][params['ip']].split(" ")[1];
		if (resources.ram_length() < 5 ){
			if (isNumeric(integer)) {
				resources.ram.push(integer)
			} else {
				$('#console').append($(elements.display_console("Error: not an integer",1)));
				return {'type': 'error', 'message':'success','ip' : -1};
			}
		} else {
			$('#console').append($(elements.display_console("Error: stack overflow",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		}
		return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};		
	},
	// push variable
	'04' : function(params) {
		var array_index = params['mla'][params['ip']].split(" ")[1];
		if (resources.ram_length() < 5 ){
			if (isNumeric(array_index) ) {
				resources.ram.push(resources.memory[array_index]);
			} else {
				$('#console').append($(elements.display_console("Error: cant push integer",1)));
				return {'type': 'error', 'message':'success','ip' : -1};
			}
		}
		return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};
	},
	// pop
	'05' : function(params) {
		if (resources.ram_length() == 0 ) {
			$('#console').append($(elements.display_console("Error: empty stack",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {			
			var array_index = params['mla'][params['ip']].split(" ")[1];
			var top_stack = resources.ram.pop();
			resources.memory[array_index] = top_stack;
			return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};
		}
	},
	// mod
	'06' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null operand error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var x1 = resources.ram.pop();
			var x2 = resources.ram.pop();
			var res = parseInt(x2) % parseInt(x1);
			resources.ram.push(res);
			return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};
		}
	},
	// jmp
	'07' : function(params) {
		var next_pointer = params['mla'][params['ip']].split(" ")[1];
		return {'type': 'done', 'message':'success','ip' : next_pointer};
	},
	// jl
	'08' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null compare error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var x1 = resources.ram.pop();
			var x2 = resources.ram.pop();
			if (parseInt(x1) < parseInt(x2)) {
				var jmp_index = params['mla'][params['ip']].split(" ")[1];
				return {'type': 'done', 'message':'success','ip' : jmp_index};
			} else{
				return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};		
			}
		}	
	},
	// jg 
	'09' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null compare error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var x1 = resources.ram.pop();
			var x2 = resources.ram.pop();
			if (parseInt(x1) > parseInt(x2)) {
				var jmp_index = params['mla'][params['ip']].split(" ")[1];
				return {'type': 'done', 'message':'success','ip' : jmp_index};
			} else{
				return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};		
			}
		}
	},
	// jeq
	'10' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null compare error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var x1 = resources.ram.pop();
			var x2 = resources.ram.pop();
			if (parseInt(x1) == parseInt(x2)) {
				var jmp_index = (params['mla'][params['ip']].split(" "))[1];
				if (jmp_index == "0-1"){
					$('#console').append($(elements.display_console("Error: error no label found",1)));
					return {'type': 'error', 'message':'success','ip' : -1};
				}
				else
					return {'type': 'done', 'message':'success','ip' : jmp_index};
			} else{
				return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};		
			}
		}
	},
	// end
	'11' : function(params) {
		return {'type': 'end', 'message':'success','ip' : parseInt(params['ip']) +1};		
	},
	// add
	'12' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null operand error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var x1 = resources.ram.pop();
			var x2 = resources.ram.pop();
			var res = parseInt(x2) + parseInt(x1);
			if (res > 99) {
				$('#console').append($(elements.display_console("Error: Overflow Error.",1)));
				return {'type': 'error', 'message':'success','ip' : -1};
			} else {
				resources.ram.push(res);
				return {'type': 'wait', 'message':'success','ip' : parseInt(params['ip']) +1};
			}
		}		
	},
	// sub
	'13' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null operand error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var x1 = resources.ram.pop();
			var x2 = resources.ram.pop();
			var res = parseInt(x2) - parseInt(x1);
			if (res < 0) {
				$('#console').append($(elements.display_console("Error: Overflow Error.",1)));
				return {'type': 'error', 'message':'success','ip' : -1};
			} else {
				resources.ram.push(res);
				return {'type': 'wait', 'message':'success','ip' : parseInt(params['ip']) +1};
			}
		}
	},
	// cmp 
	'14' : function(params) {
		if (resources.ram_length() < 2) {
			$('#console').append($(elements.display_console("Error: Null operand error",1)));
			return {'type': 'error', 'message':'success','ip' : -1};
		} else {
			var p = 0;
			resources.ram.push(x1);
			resources.ram.push(x2);
			if (parseInt(x1) == parseInt(x2))
				p =1;
			resources.ram.push(p);
			return {'type': 'wait', 'message':'success','ip' : parseInt(params['ip']) +1};
		}
	},
	'15' : function(params) {
		return {'type': 'done', 'message':'success','ip' : parseInt(params['ip']) +1};
	}, 
	return_error : function(params) {
		// console.log('error');
		return params;
	}
}


var resources = {
	memory : new Array(40),
	ram : [],
	ram_length: function(){
		return this.ram.length;
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

