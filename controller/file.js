const express  = require("express");
const { downloadImage } = require("../services/downloader");
const { getSlideInfo } = require("../services/slideinfo");



const router = express.Router();

router.post("/get",async(req,res)=>{
    const {url} = req.body;
    const slideInfo = await getSlideInfo(url);
    res.send(slideInfo);
})

module.exports = {
    fileRouter: router
}