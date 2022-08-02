
require("dotenv").config
const { query } = require("express");
const express = require("express");
const morgan = require("morgan");
const db= require("./db")
const cors =require("cors");

const app = express()
const port = process.env.PORT || 3005;
app.use(cors());
app.use(express.json());

app.get("/get", async(rqe,res)=>{
    try{
        const results = await db.query("select * from bimart.movie")
        console.log(results.rows),
    res.status(201).json({
        status:"success",
        data:{
            movie:results.rows
        }
    })
    }catch(err){
        console.log(err);
    }    
});

app.post("/post",async (req,res)=>{
    try {
        const results = await db.query("insert into bimart.movie (id,name,review) values ($1,$2,$3)",[req.body.id,req.body.name, req.body.review])
        console.log(req.body);
        res.status(201).json({
            status:"succes",
            data:{
                movie:results.rows,
            },
        })
    }catch (err){
        console.log(err)
    }
})



app.get('/get/:id',(req,res)=>{
    console.log(req.params);
})

app.put("/put/:id",async(req,res)=>{
    try {
        const results = await db.query("UPDATE BIMART.MOVIE SET name=$2, review=$3 WHERE id = $1",[req.body.id,req.body.name,req.body.review]);
        console.log(req.params);
        console.log(req.body);
        res.status(200).json({
            status:"succes",
            data:{
                movie:req.body.name
            },
        });

    }catch(err){
        console.log
    }
})

app.delete("/delete/:id",async(req,res)=>{
    try{
        console.log(req.params)
        const results = await db.query("DELETE FROM BIMART.MOVIE where id = $1",[req.params.id])

    }catch (err){
        console.log(err)
    }
})

app.listen(3005,()=>{
    console.log(`server is up and listening on port ${port}`);
    console.log('good')
}
)