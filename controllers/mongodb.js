require("../loaders");
const { Image } = require("../models");
const { utils } = require("../helpers");

exports.upload = (imagefile) => new Promise((resolve, reject)=>{
    const _base64Data = imagefile.data_url.split("base64,")[1];
    const buffArray = Buffer.from(_base64Data, "base64");
    const buff = utils.toBuffer(buffArray);
    const params = {
        name: imagefile.file.name,
        type: imagefile.file.type,
        data: buff
    }
    console.log({params});
    const image = new Image(params);
    image.save((err, result)=>{
        if (err) return reject(err);
        resolve(result);
    });
});

exports.get = (_id) => new Promise((resolve, reject)=>{
    Image.findOne({_id}, (err, result)=>{
        if (err) return reject(err);
        console.log({result});
        resolve(result);
    });
});
