$(document).ready(function() {
    // key_listeners.activate();
    editor.initialize();
    editor.listen();
});

var editor = {
    lines: 1,
    linearea: $(".line-area"),
    current_row: 1,
    initialize: function() {
        console.log("hello world!");
        // initial setup
        editor.linearea.append("<div id=line-"+editor.lines+">"+editor.lines+"</div>");
        var selector = "#line-"+editor.current_row;
        editor.highlightLine(selector, editor.current_row);
    },
    listen: function() {

        // display the number of lines
        $("#textarea").bind("keyup keydown", function(e) {
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
        $("#textarea").bind("keydown mousedown", function() {
            var row_bin = editor.current_row;
            editor.current_row = $(this).get(0).value.substr(0, $(this).get(0).selectionStart).split("\n").length;
            if (row_bin != editor.current_row)
                $("#line-"+row_bin).removeClass("active");
            var selector = "#line-"+editor.current_row;
            editor.highlightLine(selector, editor.current_row);
        });
        // find the caret position and highlight line
        $("#textarea").bind("keyup mouseup", function() {
            var row_bin = editor.current_row;
            editor.current_row = $(this).get(0).value.substr(0, $(this).get(0).selectionStart).split("\n").length;
            if (row_bin != editor.current_row)
                $("#line-"+row_bin).removeClass("active");
            var selector = "#line-"+editor.current_row;
            editor.highlightLine(selector, editor.current_row);
        });        

        // synchronize scroll/view for text area and linearea
        $("#textarea").on('scroll', function() {
            editor.linearea.scrollTop($(this).scrollTop());
        });

    },
    highlightLine: function(selector, row) {
        $("#line-"+row).addClass("active");
    },
    getCaretPosition : function(editableDiv) {
        var caretPos = 0, sel, range;
        if (window.getSelection) {
            sel = window.getSelection();
            if (sel.rangeCount) {
                range = sel.getRangeAt(0);
                if (range.commonAncestorContainer.parentNode == editableDiv) {
                    caretPos = range.endOffset;
                }
            }
        } else if (document.selection && document.selection.createRange) {
            range = document.selection.createRange();
            if (range.parentElement() == editableDiv) {
                var tempEl = document.createElement("span");
                editableDiv.insertBefore(tempEl, editableDiv.firstChild);
                var tempRange = range.duplicate();
                tempRange.moveToElementText(tempEl);
                tempRange.setEndPoint("EndToEnd", range);
                caretPos = tempRange.text.length;
            }
        }
        return caretPos;
    }
};