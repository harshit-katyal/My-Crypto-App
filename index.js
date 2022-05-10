const express = require('express')
const Blockchain = require('./blockchain')
const bodyParser = require('body-parser')

const app = express();
const blockchain = new Blockchain();
//bodyparser is initialized so that our express server can handle json requests 
app.use(bodyParser.json())

//api to display the blocks
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)  //now this will send back the blockchain.chain in its json form to whoever makes api/blocks request

})   //get http request is used to read data from a backend 

app.post('/api/mine',()=>(req,res)=>
{
   const {data} = req.body

   blockchain.addBlock({data});
   
   res.redirect('/api/blocks') // this will redirect to api/blocks which will display all blocks--> previous and added 
})
const PORT = 3000
app.listen(PORT,()=>console.log(`listening at localhost ${PORT}`))