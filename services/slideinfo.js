const { default: axios } = require('axios');
const cheerio = require('cheerio');


const getSlideInfo = async(url)=>{
    try{
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const slideImages = $(".slide-image")[0];
        const imgSrcSet = ((slideImages.attribs.srcset).split(", "));
        const imgUrl = (imgSrcSet[imgSrcSet.length-1]).split(" ")[0];
        const slideCount = $(".slide").length;
        const imgType = imgUrl.split(".").pop().split("?")[0];
        return {
            imgUrl,
            slideCount,
            imgType
        }
    }
    catch(e){
        throw new Error("Couldn't get slideInfo");
    }
}

module.exports = {
    getSlideInfo
}