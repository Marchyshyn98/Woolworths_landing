$(document).ready(function() {
    // modal
    let modal = $(".modal-main");
    let modalDialog = $(".modal-main .modal-dialog");

    modalEffects();

    function modalEffects() {
        modal.fadeIn();
        modal.css("background-color", "rgba(44, 44, 45, 0.701961)")
        modalDialog.addClass("slideIn");
    }

    modal.on("click", function() {
        modalDialog.removeClass("slideIn");
        modalDialog.addClass("slideFadeOut");
        setTimeout(function() {
            modal.fadeOut(100);
        }, 300)
    });

    // date modal
    let date = new Date();
    let todayDate = date.toLocaleDateString(navigator.language || navigator.userLanguage, { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' });
    $(".date").append(todayDate);

    // sidenav menu
    $(".header__hamburger").on("click", function() {
        openNav();
    });
    $(".header__closebtn").on("click", function() {
        closeNav();
    });

    function openNav() {
        $("#mySidenav").css("width", 280 + "px");
        $(".header__closebtn").show();
        $(".navbar-custom").css("z-index", 0);
    }

    function closeNav() {
        $("#mySidenav").css("width", 0);
        $(".header__closebtn").hide();
        setTimeout(() => {
            $(".navbar-custom").css("z-index", 1);
        }, 500);
    }

    // survey flow
    $(".btn-start").on("click", function() {
        $("header, footer").fadeOut(100);
        $(".loading").fadeIn(500);
        setTimeout(() => {
            $(".loading").hide();
            $("#survey, footer").fadeIn(300);
            $(".survey__first-question").fadeIn(500).addClass("active");
        }, 1500);
    });

    $(".btn-answer").on("click", function() {
        let currentQuest = $(this).parents(".survey__question").hide().removeClass("active");
        currentQuest.next().fadeIn(1000).addClass("active");
    });

    $(".survey__last .btn-answer").on("click", function() {
        $(".navbar-custom").css("position", "relative");
        $("#final").css("padding-top", 30 + 'px');
        $("footer").hide();
        $("#survey").fadeOut(100);
        $(".loading").fadeIn(500);
        setTimeout(() => {
            $(".loading").fadeOut(100);
            $("#final, .final__get, footer").fadeIn(500);
        }, 1500);
    });

    $(".btn-get").on("click", () => {
        $(".navbar-custom").css("position", "fixed");
        $("#final").css("padding-top", 80 + 'px');
        $("footer").hide();
        $(".get__offer").fadeOut(100);
        $(".loading").fadeIn(500);
        setTimeout(() => {
            $(".loading").fadeOut(100);
            $(".final__confirm").fadeIn(500);
        }, 1500);
    });

    $(".colours__item").on("click", function() {
        $(".choose__content").hide();
        $(".checking-text").hide();
        $(".checking").fadeIn(500);
        for (var i = 0; i < 5; i++) {
            $(".checking-text").fadeOut(300);
            $(".checking-text").fadeIn(1000);
        }
        setTimeout(function() {
            $(".checking").hide();
            $(".complete").fadeIn(500);
        }, 4000);
    });

    // timer
    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);

        return {
            total,
            hours,
            minutes,
            seconds
        };
    }

    function initializeClock(id, endtime) {
        const clock = document.getElementById(id);
        const hoursSpan = clock.querySelector('.hours');
        const minutesSpan = clock.querySelector('.minutes');
        const secondsSpan = clock.querySelector('.seconds');

        function updateClock() {
            const t = getTimeRemaining(endtime);

            hoursSpan.innerHTML = ('0' + t.hours).slice(-2) + ' :';
            minutesSpan.innerHTML = ('0' + t.minutes).slice(-2) + ' :';
            secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

            if (t.total <= 0) {
                clearInterval(timeinterval);
            }
        }

        updateClock();
        const timeinterval = setInterval(updateClock, 1000);
    }

    const deadline = new Date(Date.parse(new Date()) + 1 * 60 * 60 * 1000);
    initializeClock('clockdiv', deadline);


});