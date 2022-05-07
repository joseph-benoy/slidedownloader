const express  = require("express");
const path = require("path");
const { downloadImage } = require("../services/downloader");
const { getSlideInfo } = require("../services/slideinfo");



const router = express.Router();

router.post("/get",async(req,res)=>{
    const {url} = req.body;
    const slideInfo = await getSlideInfo(url);
    const filePath = await downloadImage(slideInfo);
    res.sendFile(path.join(__dirname,))
})

module.exports = {
    fileRouter: router
}