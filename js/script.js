document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const body = document.querySelector("body");
    const buttonMenu = document.querySelector(".header__menu");
    const headerMenu = document.querySelector(".header__body");
    const headerLinks = document.querySelectorAll(".header__item>a");

    buttonMenu.addEventListener("click", function () {
        body.classList.toggle("lock");
        buttonMenu.classList.toggle("active");
        headerMenu.classList.toggle("active");
    });
    for (let i = 0; i < headerLinks.length; i++) {
        headerLinks[i].addEventListener("click", function (event) {
            body.classList.remove("lock");
            buttonMenu.classList.remove("active");
            headerMenu.classList.remove("active");
            event.preventDefault(event);
        });
    }

    const formOpen = document.querySelector(".fullscreen__link>a");
    const formBody = document.querySelector(".popup-form");
    const formClose = document.querySelector(".popup-form__close");

    formOpen.addEventListener("click", function (event) {
        body.classList.add("lock-form");
        formBody.classList.add("active");
        event.preventDefault();
    });
    formClose.addEventListener("click", function () {
        body.classList.remove("lock-form");
        formBody.classList.remove("active");
    });
    document.addEventListener("keydown", function (event) {
        if (event.which === 27) {
            body.classList.remove("lock-form");
            formBody.classList.remove("active");
        }
    });
    formBody.addEventListener("click", function (event) {
        if (!event.target.closest(".popup-form__form")) {
            body.classList.remove("lock-form");
            formBody.classList.remove("active");
        }
    });

    const servicesMore = document.querySelectorAll(".services-body__link>a");
    const servicesPopups = document.querySelectorAll(".services__popup");
    const servicesPopupsClose = document.querySelectorAll(".services-popup__back>a");
    const servicesOrder = document.querySelectorAll(".services-popup__link>a");

    for (let i = 0; i < servicesMore.length; i++) {
        servicesMore[i].addEventListener("click", function (event) {
            if (servicesPopups[i] == undefined) {
                return;
            } else {
                body.classList.add("lock-services");
                servicesPopups[i].classList.add("open");
                event.preventDefault();
            }
        });
    }
    for (let i = 0; i < servicesPopupsClose.length; i++) {
        servicesPopupsClose[i].addEventListener("click", function (event) {
            body.classList.remove("lock-services");
            servicesPopups[i].classList.remove("open");
            event.preventDefault();
        });
    }
    document.addEventListener("keydown", function (event) {
        if (event.which == 27) {
            for (let i = 0; i < servicesPopups.length; i++) {
                body.classList.remove("lock-services");
                servicesPopups[i].classList.remove("open");
            }
        }
    });
    for (let i = 0; i < servicesOrder.length; i++) {
        servicesOrder[i].addEventListener("click", function (event) {
            servicesPopups[i].classList.remove("open");
            body.classList.remove("lock-services");
            formBody.classList.add("active");
            body.classList.add("lock-form");
            event.preventDefault();
        });
    }

    const galleryOpen = document.querySelectorAll(".gallery__item");
    const galleryPopup = document.querySelector(".gallery__popup");
    const galleryPopupClose = document.querySelector(".gallery-popup__close");

    for (let i = 0; i < galleryOpen.length; i++) {
        galleryOpen[i].addEventListener("click", function () {
            galleryPopup.classList.add("open");
            body.classList.add("lock-gallery");

            $('.gallery-popup__items').slick({
                infinite: true,
                slidesToShow: 1,
                adaptiveHeight: true,
                initialSlide: i,
                prevArrow: $(".gallery-popup__button.prev"),
                nextArrow: $(".gallery-popup__button.next")
            });
        });
    }

    galleryPopupClose.addEventListener("click", function () {
        galleryPopup.classList.remove("open");
        body.classList.remove("lock-gallery");
        setTimeout(function () {
            $('.gallery-popup__items').slick('unslick');
        }, 300);
    });
    galleryPopup.addEventListener("click", function (event) {
        if (!event.target.closest(".gallery-popup__img img") && !event.target.closest(".gallery-popup__close") && !event.target.closest(".gallery-popup__button")) {
            galleryPopup.classList.remove("open");
            body.classList.remove("lock-gallery");
            setTimeout(function () {
                $('.gallery-popup__items').slick('unslick');
            }, 300);
        }
    });
    document.addEventListener("keydown", function (event) {
        if (event.which == 27) {
            galleryPopup.classList.remove("open");
            body.classList.remove("lock-gallery");
            setTimeout(function () {
                $('.gallery-popup__items').slick('unslick');
            }, 300);
        }
    });

    const blockTitles = document.querySelectorAll(".about-item__title h1");
    const blockColumns = document.querySelectorAll(".about__item");
    const arrTexts = [];
    const animationDone = [];

    for (let i = 0; i < blockTitles.length; i++) {
        var blockTitlesText = Number(blockTitles[i].id);
        arrTexts.push(blockTitlesText);
        animationDone.push(false);
    }

    var animateCounter = function (element, endValue) {
        let startValue = 0;
        let duration = 1500;
        let startTime;

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / duration;

            if (progress < 1) {
                const value = Math.floor(startValue + (endValue - startValue) * progress);
                element.textContent = value;
                requestAnimationFrame(step);
            } else {
                element.textContent = endValue;
            }
        }

        requestAnimationFrame(step);
    };

    var increment = function () {
        for (let i = 0; i < blockColumns.length; i++) {
            var blockColumnTop = blockColumns[i].getBoundingClientRect().top;
            var koef = 2;

            if (blockColumnTop < window.innerHeight - (blockColumns[i].clientHeight / koef) && blockColumnTop > 0 && !animationDone[i]) {
                blockTitles[i].classList.add("active");
                animateCounter(blockTitles[i], arrTexts[i]);
                animationDone[i] = true;
            }
        }
    }

    window.addEventListener("load", increment);
    window.addEventListener("scroll", increment);

    const linkServices = document.querySelector(".header__item #services");
    const linkGallery = document.querySelector(".header__item #gallery");
    const linkAbout = document.querySelector(".header__item #about");
    const linkContacts = document.querySelector(".header__item #contacts");

    const targetServices = document.querySelector(".services");
    const targetGallery = document.querySelector(".gallery");
    const targetAbout = document.querySelector(".about");
    const targetContacts = document.querySelector(".contacts");

    const targetAnchor = document.querySelector(".fullscreen");
    const anchorUp = document.querySelector(".anchor");

    linkServices.addEventListener('click', function() {
        targetServices.scrollIntoView({ behavior: 'smooth' });
    });
    linkGallery.addEventListener('click', function() {
        targetGallery.scrollIntoView({ behavior: 'smooth' });
    });
    linkAbout.addEventListener('click', function() {
        targetAbout.scrollIntoView({ behavior: 'smooth' });
    });
    linkContacts.addEventListener('click', function() {
        targetContacts.scrollIntoView({ behavior: 'smooth' });
    });

    window.addEventListener('scroll', function() {
        if ((window.scrollY) >= document.body.offsetHeight) {
            anchorUp.classList.add("show");
        }
        if (window.scrollY < document.body.offsetHeight) {
            anchorUp.classList.remove("show");
        }
    });

    anchorUp.addEventListener("click", function () {
        targetAnchor.scrollIntoView({ behavior: 'smooth' });
    });
});