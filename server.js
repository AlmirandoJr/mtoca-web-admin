const express = require('express');
const path = require('path');
const app = express();
app.use(express.static(_dirname+'/dist/mtoca-web-admin'))
app.get('/*',function(req,res){
    res.sendFile(path.join(_dirname+'/dist/mtoca-web-admin/index.html'));
});
app.listen(process.env || 8080);