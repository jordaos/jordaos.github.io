var map;
var home = { lat: -4.9687496, lng: -39.01601 };
var center = { lat: -4.9687496, lng: -39.045 };
var mobileCenter = { lat: -4.9510232, lng: -39.01601 };
var isLoadingSkills = true;
var errorLoadingSkills = false;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: center,
        disableDefaultUI: true,
        zoomControl: true,
    });
    var marker = new google.maps.Marker({
        position: home,
        map: map
    });

    verifyWidthForMap();
}

function verifyWidthForMap() {
    var screenWidth = $(document).width() + 15;

    if (screenWidth <= 992)
        map.setCenter(mobileCenter);
}

$(document).ready(function () {
    var backClicked = false;
    var initializedTerminal = false;
    var Otimer;

    /* LOAD SKILLS */
    $.ajax({
        url: 'https://jordaomacedo.herokuapp.com/api/skills',
        dataType: 'json',
        success: function (data) {
            entries = data;

            var settings = {
                entries: entries,
                width: '600',
                height: '600',
                radius: '65%',
                radiusMin: 75,
                bgDraw: true,
                bgColor: 'transparent',
                opacityOver: 1.00,
                opacityOut: 0.05,
                opacitySpeed: 6,
                fov: 800,
                speed: 0.6,
                fontFamily: 'Uni Sans, Arvo, Oswald, Arial, sans-serif',
                fontSize: '18',
                fontColor: '#fff',
                fontWeight: 'bold',//bold
                fontStyle: 'normal',//italic 
                fontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                fontToUpperCase: true,
                tooltipFontFamily: 'Oswald, Arial, sans-serif',
                tooltipFontSize: '11',
                tooltipFontColor: '#fff',
                tooltipFontWeight: 'bold',//bold
                tooltipFontStyle: 'normal',//italic 
                tooltipFontStretch: 'normal',//wider, narrower, ultra-condensed, extra-condensed, condensed, semi-condensed, semi-expanded, expanded, extra-expanded, ultra-expanded
                tooltipFontToUpperCase: false,
                tooltipTextAnchor: 'left',
                tooltipDiffX: 0,
                tooltipDiffY: 10

            };
            $('#holder').svg3DTagCloud(settings);

            isLoadingSkills = false;
            changeDynamicContent();
        },
        error: function (data) {
            isLoadingSkills = false;
            errorLoadingSkills = true;
            changeDynamicContent();
        }
    });

    function changeDynamicContent() {
        var dynamicContent = $("#dynamic-content");
        if( isLoadingSkills ) {
            dynamicContent.addClass("loading");
        } else {
            dynamicContent.removeClass("loading");
        }

        if( errorLoadingSkills ) {
            dynamicContent.addClass("error");
        } else {
            dynamicContent.removeClass("error");
        }
    }

    $('.project').click(function (e) {
        e.preventDefault();
    });
    /* END LOAD SKILLS */

    $("#back-end-text").mouseenter(function () {
        $("body").addClass("dark");
        loadCurlText($("#writing"), 80);
    })
        .mouseleave(function () {
            if (!backClicked) {
                $("body").removeClass("dark");
            }
        })
        .click(function () {
            backClicked = !backClicked;
            if (backClicked) {
                $("body").addClass("dark");
                $(this).addClass("clicked");
            } else {
                $(this).removeClass("clicked");
            }
        });

    function loadCurlText(content, speed) {
        var write = "curl -i -H \"Accept: application/json\" -H \"Content-Type: appliction/json\" https://jordaomacedo.herokuapp.com/api/skills";

        var i = 0;

        function show() {
            if (i < write.length) {
                content.append(write[i]);
                i = i + 1;
            } else {
                clearInterval(Otimer);
                content.append("<br>");
                setTimeout(function () {
                    if(!errorLoadingSkills){
                        var pre = $("<pre></pre>");
                        pre.append(JSON.stringify(entries, null, 2));
                        content.append(pre);
                        content.append($(".linux-command").clone());
                        var terminalBody = $(".terminal .body");
                        terminalBody.scrollTop(terminalBody.prop("scrollHeight"));
                    } else {
                        content.append("curl: (6) Could not resolve host: jordaomacedo.herokuapp.com <br>");
                        content.append($(".linux-command").clone());
                        var terminalBody = $(".terminal .body");
                        terminalBody.scrollTop(terminalBody.prop("scrollHeight"));
                    }
                }, 2000);
            }
        };
        if (!initializedTerminal) {
            Otimer = setInterval(show, speed);
        } else if (!backClicked) {
            content.text("");
            clearInterval(Otimer);
            Otimer = setInterval(show, speed);
        }
        initializedTerminal = true;
    }



    $(window).resize(function () {
        var screenWidth = $(document).width() + 15;

        if (screenWidth <= 992) {
            $("body").removeClass("dark");
            $("#back-end-text").removeClass("clicked");
            backClicked = false;

            map.setCenter(mobileCenter);
        }
    });

    $("#open-menu").click(function () {
        $("nav").toggleClass("show-menu");
    });
});