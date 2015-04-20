$(document).ready(function() {
    // key_listeners.activate();
    editor.initialize();
    editor.listen();
});

var editor = {
    lines: 1,
    linearea: $(".line-area"),
    tarea: $('#container #frame-panel .frame .frame-body #textarea'),
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
        // $("#textarea").bind("keyup keydown", function(e) {
        //     var line_bin = editor.lines;
        //     editor.lines = editor.tarea.html().split("<br>").length-1;
        //     if (line_bin != editor.lines) {
        //         editor.linearea.empty();
        //         for (var i = 1; i < editor.lines+1; i++) {
        //             editor.linearea.append("<div id='line-"+i+"'>"+i+"</div>")
        //         }
        //     }
        // });
        // find the caret position and highlight line
        // bind("keydown mousedown", function(e) {
        //     var temp_content = editor.tarea.html().split("<br>");     
        //     var clean_content = [];
        //     for (var i = 0; i < temp_content.length; i++) {
        //         clean_content.push(replaceHtmlEntites(temp_content[i]).replace(/\n/g,""));
        //     }
        //     console.log(clean_content);
        //     // myString.replace(/<(?:.|\n)*?>/gm, '');
        //     // var row_bin = editor.current_row;
        //     // editor.current_row = $(this).get(0).value.substr(0, $(this).get(0).selectionStart).split("\n").length;
        //     // if (row_bin != editor.current_row)
        //     //     $("#line-"+row_bin).removeClass("active");
        //     // var selector = "#line-"+editor.current_row;
        //     // editor.highlightLine(selector, editor.current_row);
        // })
        $("#textarea").keypress(function(event) {
            if (event.which != 13)
                return true;

            var docFragment = document.createDocumentFragment();

            //add a new line
            var newEle = document.createTextNode('\n');
            docFragment.appendChild(newEle);

            //add the br, or p, or something else
            newEle = document.createElement('br');
            docFragment.appendChild(newEle);

            //make the br replace selection
            var range = window.getSelection().getRangeAt(0);
            range.deleteContents();
            range.insertNode(docFragment);

            console.log(docFragment);
            //create a new range
            range = document.createRange();
            range.setStartAfter(newEle);
            range.collapse(true);

            //make the cursor there
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
            console.log(editor.tarea.html());
            return false;
        });
        // find the caret position and highlight line
        // $("#textarea").bind("keyup mouseup", function() {
        //     var row_bin = editor.current_row;
        //     console.log($(this).get(0).val());
        //     editor.current_row = $(this).get(0).val.substr(0, $(this).get(0).selectionStart).split("\n").length;
        //     if (row_bin != editor.current_row)
        //         $("#line-"+row_bin).removeClass("active");
        //     var selector = "#line-"+editor.current_row;
        //     editor.highlightLine(selector, editor.current_row);
        // });        

        // synchronize scroll/view for text area and linearea
        // $("#textarea").on('scroll', function() {
        //     editor.linearea.scrollTop($(this).scrollTop());
        // });

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

var replaceHtmlEntites = (function() {
    var translate_re = /&(nbsp|amp|quot|lt|gt);/g;
    var translate = {
        "nbsp": " ",
        "amp" : "&",
        "quot": "\"",
        "lt"  : "<",
        "gt"  : ">"
    };
    return function(s) {
        return ( s.replace(translate_re, function(match, entity) {
            return translate[entity];
    }) );
  }
})();