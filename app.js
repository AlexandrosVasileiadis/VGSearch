const express = require("express");
const engine = require("ejs-mate");
const app = express();
const path = require("path");
const axios = require("axios").default;

app.engine("ejs", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req,res) => {
    res.render("home");
})

app.get("/categories", (req, res) => {
    res.render("categories");
})

app.get("/categories/:id", (req, res) => {
    const { id } = req.params;
    getCategories(function (categories) {
        for(let cat of categories) {
            if(cat.id == id) {
                return res.render("showCategory", { cat });
            }
        }
        res.redirect("/");
    });
})

app.get("/:id", (req, res) => {
    const name = req.params.id;
    res.render("show", { name })
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`serving on port ${port}`);
})

function getCategories(callback) {
    let categories = [];
    const options = {
        method: "GET",
        url: `https://api.rawg.io/api/genres?key=86ff27e4a01f4006991e125d528c61f7`
    }

    axios.request(options).then(function (response) {
        for(let cat of response.data.results) {
            categories.push(cat);
        }
        callback(categories);
    }).catch(function (error) {
        console.log(error);
    });
}