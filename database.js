const mongoose=require("mongoose"); 
class dtatbase{
    constructor(){
        this.connect();
    }


    connect()
    {
        mongoose.connect('mongodb+srv://norah:norah@cluster0.k9xtst6.mongodb.net/?retryWrites=true&w=majority')
        .then(()=>{
            console.log("DB connection successful"); 
        })
        .catch((err)=>{
            console.log('DB connection error');
        })
    }  
}    
module.exports=new dtatbase(); 
