$(document).ready(function() {
    editor.initialize("#text-area");
    editor.listen();
});

var editor = {
    lines: 1,
    initialize: function(text_area) {
        editor.text_area = $(text_area);
    },
    listen: function() {
        // catch Return key and replace divs with br
        editor.text_area.keypress(function(event) {
            if (event.which != 13)
                return true;
            document.execCommand('insertHTML', false, '<br><br>');
            return false;
        });
    }
};