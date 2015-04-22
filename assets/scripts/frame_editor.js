$(document).ready(function() {
    key_listeners.activate();
    editor.initialize("#text-area");
    editor.listen();
    editor.highlighter();
});

var editor = {
    lines: 1,
    linearea: $(".line-area"),
    current_row: 1,
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
    },
    highlightLine: function(selector, row) {
        $("#line-"+row).addClass("active");
    },
    highlighter: function(){
        editor.text_area.on('keypress', function() {
            console.log();
            var content = editor.text_area[0].innerHTML;
            if (content.indexOf("deane") >= 0) {
                var temp = "<span class = 'keyword deane'>deane</span>";
                var newcontent = content.substr(0,content.indexOf("deane")) +temp +content.substr(content.indexOf("deane")+5);
                editor.text_area[0].innerHTML = newcontent;
            }
        });
    }
};

