var resources = {
	memory : new Array(40),
	ram : new Array(5),

}

var run = {
	text_area: $('#text-area'),
	build : function() {
		var m = run.get_output();
		var machine_code = run.translation(m);
	},
	translation : function(token) {
		console.log(token);
		var machine_code = new Array(token.length)
		for (var i = 0; i < token.length; i++) {
			if (typeof symbol_table[token[i].split(" ")[0]] !== 'undefined') {
				if (token[i].split(" ").length === 1) {
					machine_code[i] = symbol_table[token[i]]+" 00";
				} else {
					if (parseInt(symbol_table[token[i].split(" ")[0]]) >= 7 && parseInt(symbol_table[token[i].split(" ")[0]]) <= 10) {
						var index = token.indexOf(token[i].split(" ")[1]+":");
						if (parseInt(index) < 10) index = "0"+index;
						machine_code[i] = symbol_table[token[i].split(" ")[0]] + " " + index;
					} else {
						if (isNumeric(token[i].split(" ")[1])) {
							if (token[i].split(" ")[1] < 10)
								machine_code[i] = symbol_table[token[i].split(" ")[0]] +" 0"+token[i].split(" ")[1];
							else
								machine_code[i] = symbol_table[token[i].split(" ")[0]] +" " +token[i].split(" ")[1];
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
						machine_code[i] = "0" + i+ " 00";
					} else {
						machine_code[i] = i + " 00";
					}					
				} else {
					machine_code[i] = symbol_table['error'] + " 00";
				}
			} 
		};
		console.log(resources.memory);
		for (var i = 0; i < machine_code.length; i++) {
			console.log(token[i] +" =>"+machine_code[i]);
		};
	},
	get_output : function() {
		var output = []
		var m = run.text_area.html().split("<br>");
		for (var i = 0; i<m.length; i++) {
			if (m[i].length > 0) {
				output.push(replaceHtmlEntites(m[i].trim()));
			}
		}
		return output;
	}

}

var compile = {

}

var key_listeners = {
	text_area: $('#text-area'),
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
		    });;
	    // console.log(ctrlDown);
	    // if (ctrlDown == true) {
		   //  run.text_area.bind('keydown', function(e) {
		   //  	switch(e.keyCode) {
		   //  		case 66 : {
		   //  			run.build();
		   //  			break;
		   //  		}
		   //  	}
		   //  });
	    // }
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