const { Router } = require("express");
const con = require('../database/connection');
const route = Router();

route.post('/student/result',async (req,res) =>{
    const roll = req.body.rollnumber;
    const query = `SELECT * FROM Result WHERE rollnumber = ${roll}`;
    con.connect((err)=>{
        if(err) throw err;

        con.query(query,(err,result)=>{
            if(err) throw err;
            res.send(result);
        })
    })
    
});

module.exports = route;