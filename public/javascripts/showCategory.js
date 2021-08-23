const url = window.location.pathname;
const id = url.substring(url.lastIndexOf("/") + 1);
const body = $("body");
const gamesList = $("ul");
const buttons = $("#buttons");
let page = 1;

addCategoryDetails();

addGamesAndPageButtons(page);

function addCategoryDetails() {
    const settings = {
        "async" : true,
        "crossDomain" : true,
        "url" : `https://api.rawg.io/api/genres/${id}?key=86ff27e4a01f4006991e125d528c61f7`,
        "method" : "GET"
    }
    
    $.ajax(settings).done(function (response) {
        body.css("background", `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${response.image_background}") no-repeat center center fixed`);
        body.css("background-size", "cover");
    }).fail( (jqXHR, textStatus) => {
        console.log(textStatus);
    });
}

function addGamesAndPageButtons(pageNum) {
    gamesList.html("");
    buttons.html("");
    const settings = {
        "async" : true,
        "crossDomain" : true,
        "url" : `https://api.rawg.io/api/games?key=86ff27e4a01f4006991e125d528c61f7&genres=${id}&page_size=15&page=${pageNum}`,
        "method" : "GET"
    }
    
    $.ajax(settings).done(function (response) {
        for(let game of response.results) {
            $(`<li><a href="/${game.slug}">${game.name}</a></li>`).appendTo(gamesList);
        }
        
        if(response.previous != null){
            $(`<button type="button" class="btn btn-success prevButton">Previous Page</button>`).appendTo(buttons);
        } else {
            $(`<button type="button" class="btn btn-success disabled mx-2 prevButton">Previous Page</button>`).appendTo(buttons);
        }

        if(response.next != null) {
            $(`<button type="button" class="btn btn-success mx-2 nextButton">Next Page</button>`).appendTo(buttons);
        } else {
            $(`<button type="button" class="btn btn-success disabled mx-2 nextButton">Next Page</button>`).appendTo(buttons);
        }

        $(".nextButton").on("click", function(){
            page++;
            addGamesAndPageButtons(page);
        });

        $(".prevButton").on("click", function(){
            page--;
            addGamesAndPageButtons(page);
        });

    }).fail( (jqXHR, textStatus) => {
        console.log(textStatus);
    });
}