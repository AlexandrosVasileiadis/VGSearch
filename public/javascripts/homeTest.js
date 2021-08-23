let timer, timeOutVal = 1000;
let page = 1;

const typer = $(".typer");
const searchResult = $("#resultUl");
const buttons = $("#buttons");

typer.on("keypress", handleKeyPress);
typer.on("keyup",handleKeyUp);

function handleKeyPress (e) {
    window.clearTimeout(timer);
}

function handleKeyUp (e) {
    window.clearTimeout(timer);
    timer = window.setTimeout( () => {
        if(typer.val() == "") {
            searchResult.html("");
            buttons.html("");
        }
        else {
            addGames(page);
        }
    }, timeOutVal);
}

function showResults (games) {
    searchResult.html("");
    buttons.html("");
    for(let result of games) {
        $(`<li><a href="/${result.slug}">${result.name}</a></li>`).appendTo(searchResult);
    }
}

function addGames(pageNum) {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.rawg.io/api/games?key=86ff27e4a01f4006991e125d528c61f7&search=${typer.val()}&page=${pageNum}&page_size=15`,
        "method": "GET",
    };
    $.ajax(settings).done( (response) => {
        showResults(response.results);
        
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
            addGames(page);
        });

        $(".prevButton").on("click", function(){
            page--;
            addGames(page);
        });
    }).fail( (jqXHR, textStatus) => {
        console.log(textStatus);
    });
}