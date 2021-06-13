const path = require("path");
exports.waitSec = (sec) => new Promise((resolve)=>setTimeout(resolve, sec*1000));
exports.pathJoin = path.join;
exports.toBuffer = (ab) => {
    const buf = Buffer.alloc(ab.byteLength);
    const view = new Uint8Array(ab);
    for (let i = 0; i < buf.length; ++i) {
        buf[i] = view[i];
    }
    return buf;
}
