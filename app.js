import express from "express";
import mongoose from "mongoose";
const app = express();

app.use(express.urlencoded({extended : false}));
app.use(express.json());


mongoose.connect("mongodb://127.0.0.1.27017/api");

const port = 4000;
app,listen (port, (error) =>{
    if (error){
        console.log(error)
    }
    console.log(`API rodando em http://localhost:${port}`);
})