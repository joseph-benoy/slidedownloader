const express = require("express");
const hbs = require("hbs");
const { fileRouter } = require("./controller/file");
const app = express();
app.set("view engine",'hbs');
app.set("views",__dirname+"/views");

app.use(express.urlencoded());


app.get("/",(req,res)=>{
  res.render("index");
})

app.use("/web/file",fileRouter);



app.listen(5000,()=>{
    console.clear();
  console.log('server started at port 5000');
})
