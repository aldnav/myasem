var text_area = $('#container #frame-panel .frame .frame-body textarea');

var run = {
	build : function() {
		var raw_code =run.get_output();
	},
	get_output : function() {
		return text_area.val().split(/\n/g);	
	}
}

var key_listeners = {
	activate : function() {
		for (var i in key_listeners) 
			if (i !== 'activate') 
				key_listeners[i]();
	},
	ctr_cmd : function() {
		var ctrlDown = false;
	    $(document).keydown(function(e) {
	        if (e.keyCode == 17) ctrlDown = true;
	    }).keyup(function(e) {
	        if (e.keyCode == 17) ctrlDown = false;
	    });
	    
	    var cmd_key;
	    text_area.bind('keydown', function(e) {
	    	switch(e.keyCode) {
	    		case 66 : {
	    			run.build();
	    			break;
	    		}
	    	}
	    });
	},
	miscellaneous : function() {
		$(document).keydown(function(e) {
	        if (e.keyCode == 9) {
	        	e.preventDefault();
	        	text_area.val(text_area.val()+"    ");
	        }
	    });
	}
}