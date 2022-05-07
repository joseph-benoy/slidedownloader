const express = require("express");
const hbs = require("hbs");
const path = require("path");
const { fileRouter } = require("./controller/file");
const app = express();
app.set("view engine",'hbs');
app.set("views",__dirname+"/views");

app.use(express.urlencoded());

app.use("/web/file/",express.static(path.join(__dirname,"services/temp/")));

app.get("/",(req,res)=>{
  res.render("index");
})

app.use("/web/file",fileRouter);



app.listen(5000,()=>{
    console.clear();
  console.log('server started at port 5000');
})
