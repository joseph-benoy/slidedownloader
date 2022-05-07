const { default: axios } = require('axios');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');
const PDFDocument = require("pdfkit");
var rimraf = require("rimraf");

const downloadImage = async(slideInfo,res)=>{
    try{
        const tempDirName = uuidv4();
        const urlSepIndex = slideInfo.imgUrl.lastIndexOf("-");
        const prefix = slideInfo.imgUrl.substring(0,urlSepIndex).slice(0,-1);
        const postfix = slideInfo.imgUrl.substring(urlSepIndex);
        const dirName = `${__dirname}/temp/${tempDirName}/`;
        if(!fs.existsSync(dirName)){
            fs.mkdirSync(dirName);
        }
        let doc = new PDFDocument({autoFirstPage:false});
        const pdfFileName = dirName+slideInfo.title+".pdf";
        var filePipe;
        doc.pipe(filePipe= fs.createWriteStream(pdfFileName));
        for(let i = 1;i<=slideInfo.slideCount;i++){
            const tempUrl = prefix+i+postfix;
            const res = await axios.get(tempUrl,{
                method:"GET",
                responseType:"arraybuffer"
            });
            const img = doc.openImage(res.data);
            doc.addPage({size:[img.width,img.height]});
            doc.image(img,0,0);
        }
        doc.end();
        filePipe.on("finish",()=>{
            res.download(pdfFileName);
            rimraf(dirName,(e)=>{
                console.log(e)
            });
        })
    }
    catch(e){
        throw new Error("cannot download image : "+e.message);
    }
}

module.exports = {
    downloadImage
}