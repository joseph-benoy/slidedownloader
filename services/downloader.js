const { default: axios } = require('axios');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

const downloadImage = async(slideInfo)=>{
    try{
        const tempDirName = uuidv4();
        const urlSepIndex = slideInfo.imgUrl.lastIndexOf("-");
        const prefix = slideInfo.imgUrl.substring(0,urlSepIndex).slice(0,-1);
        const postfix = slideInfo.imgUrl.substring(urlSepIndex);
        if(!fs.existsSync(`${__dirname}/temp/${tempDirName}`)){
            fs.mkdirSync(`${__dirname}/temp/${tempDirName}`);
        }
        for(let i = 1;i<=slideInfo.slideCount;i++){
            const tempUrl = prefix+i+postfix;
            const res = await axios.get(tempUrl,{
                method:"GET",
                responseType:"stream"
            });
            const filePath = `${__dirname}/temp/${tempDirName}/${i}.${slideInfo.imgType}`;
            await res.data.pipe(fs.createWriteStream(filePath));
        }
        
    }
    catch(e){
        throw new Error("cannot download image : "+e.message);
    }
}

module.exports = {
    downloadImage
}