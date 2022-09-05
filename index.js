const express = require('express');
const bodyParser= require('body-parser');
const path = require("path")

const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/",express.static(path.join("public")))
const port = 3001;


const ScrappingHespress = require('./controllers/scrapping-hespress');
const ScrappingLeMatin = require('./controllers/scrapping-le-matin');


app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})
app.post("/scrapping/hespress",(request,response)=>{
    ScrappingHespress(response,request);
})

app.post("/scrapping/le-matin",(request,response)=>{
    ScrappingLeMatin(response,request);
})


app.listen(port, ()=>{
    console.log('app running on port '+port);
})