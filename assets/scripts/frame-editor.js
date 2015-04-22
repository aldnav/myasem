$(document).ready(function() {
    key_listeners.activate();
    editor.initialize("#text-area");
    editor.listen();
    editor.highlighter();
});

var editor = {
    lines: 1,
    initialize: function(text_area) {
        editor.text_area = $(text_area);
    },
    listen: function() {
        // catch Return key and replace divs with br
        editor.text_area.keypress(function(event) {
            if (event.which == 13){
                document.execCommand('insertHTML', false, '<br><br>');
                return false;
            } 
            
        })
    }, 
    highlighter: function() {
        console.log(editor.text_area.insertHTML);
    }
};