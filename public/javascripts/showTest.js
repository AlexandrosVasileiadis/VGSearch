const slug = $("title").text();
const body = $("body");
const description = $("#description");
const carouselIndicators = $(".carousel-indicators");
const carouselInner = $(".carousel-inner");

addBackgroundAndDescription();

addScreenshotsCarousel();

function addBackgroundAndDescription () {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.rawg.io/api/games/${slug}?key=86ff27e4a01f4006991e125d528c61f7`,
        "method": "GET"
    }
    
    $.ajax(settings).done(function (response) {
        const bodySettings = {
            background : `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${response.background_image}") no-repeat center center fixed`,
            backgroundSize : "cover"
        }
        body.css(bodySettings);
        description.html(response.description);
    }).fail( (jqXHR, textStatus) => {
        console.log(textStatus);
    });
}

function addScreenshotsCarousel () {
    const settings = {
        "async" : true,
        "crossDomain" : true,
        "url" : `https://api.rawg.io/api/games/${slug}/screenshots?key=86ff27e4a01f4006991e125d528c61f7`,
        "method" : "GET"
    }

    $.ajax(settings).done(function (response) {
        addCarouselIndicatorsAndInner(response.results);
    }).fail( (jqXHR, textStatus) => {
        console.log(textStatus);
    });
}

function addCarouselIndicatorsAndInner (results) {
    let counter = 0;
    for(let img of results) {
        $(`<button class="carouselButton" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="${counter}" aria-label="Slide ${counter}"></button>`).appendTo(carouselIndicators);
        $(`<div class="carousel-item"><img src="${img.image}" class="d-block w-100" alt=""></div>`).appendTo(carouselInner);
        counter++;
    }
    $(".carouselButton").first().addClass("active");
    $(".carouselButton").first().attr("aria-current", "true");
    $(".carousel-item").first().addClass("active");
}