const express = require("express");
const cors = require("cors");
const app = express();

const api = require("./src/data/country.json");


app.use(cors());

app.get("/", (req, res) =>{
    res.json(api);
});



app.listen(8080, () =>{
    console.log("porta executada na 8080")
})