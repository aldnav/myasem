

var run = {
	text_area: $('#text-area'),
	build : function() {
		run.get_output();
	},
	get_output : function() {
		var m = run.text_area.html().split("<br>");
		for (var i = 0; i<m.length; i++) {
			
		}
		// return text_area.val().split(/\n/g);	
	}
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