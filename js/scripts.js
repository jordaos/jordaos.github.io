$(document).ready(function(){
    $("#back-end-text").mouseenter(function () {
        $(".present").addClass("dark");
        console.log("enter");
    })
    .mouseleave(function() {
        $(".present").removeClass("dark");
        console.log("leave");
    });
 });