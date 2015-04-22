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
		for (var i = 0; i < token.length; i++) {
			if (symbol_table[token[i].split(" ")[0]] !== undefined) {
				token[i] = token[i].replace(token[i].split(" ")[0],symbol_table[token[i].split(" ")[0]]);
			} else {
				token[i] = token[i].replace(token[i],symbol_table['error']);
			}
		};
		for (var i = 0; i < token.length; i++) {
			if (token[i].split(" ")[1] === undefined) {
				token[i] = token[i]+"00";
			} else {
				if(resources.memory.indexOf(token[i].split(" ")[1]) > 0) {
					if (resources.memory.indexOf(token[i].split(" ")[1]) < 10 ) {
						token[i] = token[i].replace(token[i].split(" ")[1], "0"+resources.memory.indexOf(token[i].split(" ")[1])).replace(" ","");
					} else {
						token[i] = token[i].replace(token[i].split(" ")[1], resources.memory.indexOf(token[i].split(" ")[1])).replace(" ","");
					}
					token[i] = token[i].replace(token[i].split(" ")[1], resources.memory.indexOf(token[i].split(" ")[1])).replace(" ", "");
				} else if (!isNumeric(token[i].split(" ")[1])){
					for (var j = 30; j < 40; j++) {
						if (resources.memory[j] === undefined) {
							resources.memory[j] = token[i].split(" ")[1];
							token[i] = token[i].replace(token[i].split(" ")[1], j).replace(" ","");
							break;
						}
					};
				} else {
					for (var j = 1; j < 30; j++) {
						if (resources.memory[j] === undefined) {
							resources.memory[j] = token[i].split(" ")[1];
							if (j < 10 ) {
								token[i] = token[i].replace(token[i].split(" ")[1], "0"+j).replace(" ","");
							} else {
								token[i] = token[i].replace(token[i].split(" ")[1], j).replace(" ","");
							}
							break;
						}
					};
				}
			}
		};
		console.log(resources.memory);
		for (var i = 0; i < token.length; i++) {
			console.log(token[i]);
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