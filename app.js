const express=require("express");
const app=express();
app.listen(3000,()=>{console.log("server corriendo")});
app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});