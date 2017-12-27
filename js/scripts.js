$(document).ready(function(){
    var backClicked = false;
    $("#back-end-text").mouseenter(function () {
        $(".present").addClass("dark");
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
                var pre = $("<pre></pre>");
                pre.append(JSON.stringify(entries, null, 2));
                content.append(pre);
                content.append();
            }
        };
        var Otimer = setInterval(show, speed);
    }

    loadCurlText($("#writing"), 8);
 });