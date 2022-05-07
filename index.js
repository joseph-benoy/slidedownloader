const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { fileRouter } = require("./controller/file");
const process = require('process');

const app = express();
app.set("view engine",'hbs');
app.set("views",__dirname+"/views");

app.use(express.urlencoded());

app.use("/web/file/",express.static(path.join(__dirname,"services/temp/")));


app.use("/",fileRouter);



app.listen(process.env.PORT||5000,()=>{
    console.clear();
  console.log('server started at port 5000');
})
