$(document).ready(function(){
    var backClicked = false;
    var initializedTerminal = false;
    var Otimer;
    $("#back-end-text").mouseenter(function () {
        $(".present").addClass("dark");
        $("nav").addClass("dark");
        loadCurlText($("#writing"), 80);
    })
    .mouseleave(function() {
        if(!backClicked) {
            $(".present").removeClass("dark");
            $("nav").removeClass("dark");
        }
    })
    .click(function() {
        backClicked = !backClicked;
        if(backClicked) {
            $(".present").addClass("dark");
            $("nav").addClass("dark");
            $(this).addClass("clicked");
        } else {
            $(this).removeClass("clicked");
        }
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

    $( window ).resize(function() {
        var screenWidth = $( document ).width() + 15;
        
        if (screenWidth <= 992) {
            $(".present").removeClass("dark");
            $("nav").removeClass("dark");
            $("#back-end-text").removeClass("clicked");
            backClicked = false;
        }
    });

    $("#open-menu").click(function() {
        $("nav").toggleClass("show-menu");
    });
 });