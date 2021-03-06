const express  = require("express");
const path = require("path");
const { downloadImage } = require("../services/downloader");
const { getSlideInfo } = require("../services/slideinfo");



const router = express.Router();

router.get("/",(req,res)=>{
    res.render("index");
})

router.post("/",async(req,res)=>{
    try{
        const {url} = req.body;
        const slideInfo = await getSlideInfo(url);
        const filePath = await downloadImage(slideInfo,res);
    }
    catch(e){
        res.render("error");
    }
})

module.exports = {
    fileRouter: router
}