const { Router } = require("express");
const con = require('../database/connection');

const route = Router();


const addResult =(result)=>{
    con.connect(err=>{
        if(err) throw err;

        const query = `INSERT INTO result VALUES (${result.rollnumber},'${String(result.name)}',str_to_date(${result.date},'%Y-%m-%d'),${result.score},${result.edit})`;
        con.query(query,(err,result)=>{
            if(err) throw err;
        })

    })
    
};

route.get('/teacher',async (req,res)=>{
    con.connect(err=>{
        if(err) throw err;

        const query = "SELECT * FROM result";
        con.query(query,(err,result)=>{
            if(err) throw err;
            res.status(200).send(result);
        })

    })
    
});

route.post('/teacher/addrecord',(req,res)=>{
    const record = req.body;
    addResult(record);
    res.send(record);
});

route.delete('/teacher',async (req,res)=>{
    const rollnumber = req.body.rollnumber;
    con.connect(err=>{
        if(err) throw err;

        const query = `DELETE FROM result WHERE rollnumber = ${rollnumber}`;
        con.query(query,(err,result)=>{
            if(err) throw err;
            res.send("Removed");
        })

    })
    
});

route.put('/teacher', async (req,res)=>{
    const record = req.body;
    con.connect(err=>{
        if(err) throw err;

        const query = `SELECT * FROM result WHERE rollnumber = ${record.rollnumber}`;
        con.query(query,(err,result)=>{
            if(err) throw err;

            if(result){
                const query2 = `DELETE FROM result WHERE rollnumber = ${record.rollnumber}`;
                con.query(query2,(err,result)=>{
                    if(err) throw err;
                    addResult(record);
                    res.send("Updated");
                })
                
            }
        })

    })
});


module.exports = route;
