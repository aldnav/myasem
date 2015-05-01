var run = {
	text_area: $('textarea'),
	build : function() {
		resources.memory = new Array(40);
		resources.ram = [];

		var m = run.get_output();
		var translation_output = run.translation(m);
		if (translation_output['type'] == 'error'){
			for (var i = 0; i < translation_output['data'].length; i++) {
				var er = "<div class = 'console-line'><span class = 'error'>"+translation_output['data'][i]+"</span></div>";
				$('#console').append(er);
				console.log(translation_output['data'][i]);
			};
		} else {
				compile.mla = translation_output['data'];
				compile.run();
		}
	},
	translation : function(token) {
		var machine_code = new Array(token.length);
		for (var i = 0; i < token.length; i++) {
			if (typeof symbol_table[token[i].split(" ")[0]] !== 'undefined') {
				if (token[i].split(" ").length === 1) {
					machine_code[i] = symbol_table[token[i]]+" 00";
				} else {
					if (parseInt(symbol_table[token[i].split(" ")[0]]) >= 7 && parseInt(symbol_table[token[i].split(" ")[0]]) <= 10) {
						console.log("fuck");
						var index = token.indexOf(token[i].split(" ")[1]+":");
						if (parseInt(index) < 10) index = "0"+index;
						machine_code[i] = symbol_table[token[i].split(" ")[0]] + " " + index;
					} else {
						if (isNumeric(token[i].split(" ")[1])) {
							if (token[i].split(" ")[1].length <= 2) {
								if (token[i].split(" ")[1] < 10)
									machine_code[i] = symbol_table[token[i].split(" ")[0]] +" 0"+token[i].split(" ")[1];
								else
									machine_code[i] = symbol_table[token[i].split(" ")[0]] +" " +token[i].split(" ")[1];	
							} else 
								machine_code[i] = symbol_table[token[i].split(" ")[0]] +" " +"e99";	
							
						}else {
							if (resources.memory.indexOf(token[i].split(" ")[1]) > 29){
								machine_code[i] = symbol_table[token[i].split(" ")[0]] +" " +resources.memory.indexOf(token[i].split(" ")[1]);
							} else {
								for (var j = 30; j < 40; j++) {
									if (typeof resources.memory[j] === 'undefined' ) {
										resources.memory[j] = token[i].split(" ")[1];
										machine_code[i] = symbol_table[token[i].split(" ")[0]] +" " + j;
										break;
									}
								};
							}
						}
					}
				}
			} else {
				if (token[i].indexOf(":") > 0) {
					if (i <10) {
						machine_code[i] = "15 0" + i;
					} else {
						machine_code[i] = "15 " + i;
					}					
				} else {
					machine_code[i] = symbol_table['error'] + " 00";
				}
			} 
		};
		error = [];
		for (var i = 0; i < machine_code.length; i++) {
			err = run.translation_error(machine_code[i], i+1);
			if (typeof err !== 'undefined') {
				error.push(err);
			}
		};
		if (error.length > 1)
			return {'type' : 'error', 'data' : error};
		else 
			return {'type' : 'mla', 'data' : machine_code};
	},
	get_output : function() {
		var output = []
		var m = $('textarea').val().split(/\n/);
		for (var i = 0; i<m.length; i++) {
			if (m[i].length > 0) {
				output.push(replaceHtmlEntites(m[i].trim()));
			}
		}
		return output;
	},
	translation_error : function (token, line) {
		console.log(token)
		token1 = token.split(" ")[0].trim();
		token2 = token.split(" ")[1].trim();
		console.log(token1,token2);
		if (token1 == '99')
			return 'error 99: command not found: \tat line ' + line;
		else if (token2 == 'e99')
			return 'error 100: parameter not in 2 bit \tat line ' + line;
		else if (token2 == '0-1')
			return 'error 0-1: label not found \tat line ' + line;
	}
}

var compile = {
	mla: [],
	instruction_pointer: 0,
	run : function() {
		resources.memory = new Array(40);

		// var m = _commands['02']({'mla':compile.mla,'ip': 14});
		// // console.log(m);
		var mla_element = $("#mla");
		mla_element.empty();
		for (var i = 0; i < compile.mla.length; i++) {
			mla_element.append("<span class = 'alert'>"+compile.mla[i]+"</span>")
		};

		var id_mla_class = $("#mla span");
		$(id_mla_class[0]).css("background-color","rgba(118, 138, 158, 0.1)");
		
		i = 0;
		var com = compile.mla[i].split(" ")[0];
		var res = _commands[com]({'mla':compile.mla,'ip': i});
		var interval = setInterval(function() {
			$(id_mla_class[i]).css("background-color","rgba(118, 138, 158, 0.1)");
			console.log(resources.ram);	
      		if (res['type'] == 'end' || res['type'] == 'error') {
      			clearInterval(interval);
      		} else if(wait == true){
      			console.log("wait");
      		} else if (i == 0) {
      			i++;
      		}else {
				console.log(com,res);
      			com = compile.mla[res['ip']].split(" ")[0];
      			i = res['ip'];
      			res = _commands[com]({'mla':compile.mla,'ip': i});
      			$(id_mla_class).css("background","none");
      			$(id_mla_class[i]).css("background-color","rgba(118, 138, 158, 0.1)");
      		}
		}, 500);
		$(id_mla_class).css("background","none");
		//create text file
	}, 
	execute: function(command) {

	}
}

var key_listeners = {
	text_area: $('textarea'),
	activate : function() {
		for (var i in key_listeners) 
			if (i !== 'activate' && i !== 'text_area') 
				key_listeners[i]();
	},
	ctr_cmd : function() {
		var ctrlDown = false;
	    $(document).keydown(function(e) {
	        if (e.keyCode == 17)  ctrlDown = true;

	    }).keyup(function(e) {
	        if (e.keyCode == 17) ctrlDown = false;
	    }).bind('keydown', function(e) {
	    		if (ctrlDown == true) {	
			    	switch(e.keyCode) {
			    		case 66 : {
	    					e.preventDefault();
			    			run.build();
			    			break;
			    		}
			    	}
	    		}
		    });
	    $('.btn.btn-blue').on('click', function(e) {
	    	e.preventDefault();
	    	run.build();
	    });
	    $('.btn.btn-black').on('click', function(e) {
	    	e.preventDefault();
	    	$('textarea').val("");
	    	var e = jQuery.Event("keydown");
	    	$('textarea').trigger(e);
	    	$('textarea').focus();
	    });
	},
	miscellaneous : function() {
		$(document).keydown(function(e) {
	        if (e.keyCode == 9) {
	        	e.preventDefault();
	        	run.text_area.val(run.text_area.val()+"    ");
	        }
	    });
	}
}