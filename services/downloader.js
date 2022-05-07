const fs = require('fs-extra');
const https = require("https");

const downloadImage = (url,path)=>{
    https.get(url,(res)=>{
        res.pipe(fs.createWriteStream(path));
    })
}

module.exports = {
    downloadImage
}