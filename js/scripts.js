$(document).ready(function(){
    var backClicked = false;
    var initializedTerminal = false;
    var Otimer;
    $("#back-end-text").mouseenter(function () {
        $(".present").addClass("dark");
        loadCurlText($("#writing"), 80);
        console.log("enter");
    })
    .mouseleave(function() {
        if(!backClicked)
            $(".present").removeClass("dark");
        console.log("leave");
    })
    .click(function() {
        backClicked = !backClicked;
        if(backClicked) {
            $(".present").addClass("dark");
            $(this).addClass("clicked");
        } else {
            $(this).removeClass("clicked");
        }
        console.log("click");
    });

    function loadCurlText(content, speed) {
        var write = "curl -i -H \"Accept: application/json\" -H \"Content-Type: appliction/json\" https://secret-waters-63016.herokuapp.com/pubs";

        var i = 0;

        function show() {
            if (i < write.length) {
                content.append(write[i]);
                i = i + 1;
            } else {
                clearInterval(Otimer);
                content.append("<br>");
                setTimeout(function () {
                    var pre = $("<pre></pre>");
                    pre.append(JSON.stringify(entries, null, 2));
                    content.append(pre);
                    content.append($(".linux-command").clone());
                    var terminalBody = $(".terminal .body");
                    terminalBody.scrollTop(terminalBody.prop("scrollHeight"));
                }, 2000);
            }
        };
        if(!initializedTerminal) {
            Otimer = setInterval(show, speed);
        } else if(!backClicked) {
            content.text("");
            clearInterval(Otimer);
            Otimer = setInterval(show, speed);
        }
        initializedTerminal = true;
    }
 });