(function () {
    const about = $(".about-container");
    const closeAbout = $(".close-about");
    const overlay = $(".overlay");
    const showAbout = $("#about");
    console.log(about);
    console.log(closeAbout);
    console.log(overlay);

    showAbout.on("click", () => {
        about.addClass("about-container-slide");
    });

    // showAbout.on("click", () => {
    //     about.css({
    //         visibility: "visible",
    //     });
    //     // overlay.css({
    //     //     visibility: "visible",
    //     // });
    // });

    closeAbout.on("click", () => {
        about.addClass("about-container-slideout");
        // overlay.css({
        //     visibility: "hidden",
        // });
    });
})();
