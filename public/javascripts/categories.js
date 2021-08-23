const categoriesUl = $("#categories");

addCategories();

function addCategories() {
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": `https://api.rawg.io/api/genres?key=86ff27e4a01f4006991e125d528c61f7`,
        "method": "GET"
    }
    $.ajax(settings).done(function (response) {
        appendToUl(response.results);
    }).fail( (jqXHR, textStatus) => {
        console.log(textStatus);
    });
}

function appendToUl (results) {
    for(let category of results) {
        $(`<li><a href="/categories/${category.id}">${category.name}</a></li>`).appendTo(categoriesUl);
    }
}