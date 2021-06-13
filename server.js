const controllers = require("./controllers");
const express = require("express");
const morgan = require("morgan")
const cors = require('cors');
const app = express();
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'))
app.use(cors());

app.use(express.static('out'));

app.get("/show/:id", function (req, res) {
    const { id } = req.params;
    controllers.mongodb.get(id)
        .then(result=>{
            res.writeHead(200, {
                'Content-Type': result.type,
                'Content-Length': result.data.length
              });
              res.end(result.data); 
        })
        .catch(err=>{
            res.status(500)
                .json({err});
        });

});

app.post('/upload', function (req, res) {
    const { imagefile } = req.body;
    console.log({imagefile})
    controllers.mongodb.upload(imagefile)
        .then(response=>{
            const { _id } = response;
            res.json({_id});
        })
        .catch(err=>{
            res.status(400)
                .json({err: err.response});
        });

});

app.listen(port=8080, host="0.0.0.0", ()=> {
    console.log("running on the port", port, "in the host", host, "http://" + host + ":" + port);
});
