$(document).ready(function() {
    editor.initialize();
    editor.listen();
    key_listeners.activate();

    $("textarea").keypress(function(){
        // console.log($(this).val().split(/\n/));
    });
});

var editor = {
    lines: 1,
    linearea: $(".line-area"),
    current_row: 1,
    initialize: function() {
        // initial setup
        editor.linearea.append("<div id=line-"+editor.lines+">"+editor.lines+"</div>");
        var selector = "#line-"+editor.current_row;
        editor.highlightLine(selector, editor.current_row);
    },
    listen: function() {

        // display the number of lines
        $("textarea").bind("keyup keydown", function(e) {
            var line_bin = editor.lines;
            editor.lines = $(this).val().split(/\r\n|\r|\n/).length;
            if (line_bin != editor.lines) {
                editor.linearea.empty();
                for (var i = 1; i < editor.lines+1; i++) {
                    editor.linearea.append("<div id=line-"+i+">"+i+"</div>")
                }
            }
        });

        // find the caret position and highlight line
        $("textarea").bind("keyup keydown mousedown mouseup", function() {
            var row_bin = editor.current_row;
            editor.current_row = $(this).get(0).value.substr(0, $(this).get(0).selectionStart).split("\n").length;
            if (row_bin != editor.current_row)
                $("#line-"+row_bin).removeClass("active");
            var selector = "#line-"+editor.current_row;
            editor.highlightLine(selector, editor.current_row);
        });

        // synchronize scroll/view for text area and linearea
        $("textarea").on('scroll', function() {
            editor.linearea.scrollTop($(this).scrollTop());
        });

    },
    highlightLine: function(selector, row) {
        $("#line-"+row).addClass("active");
    }
};
