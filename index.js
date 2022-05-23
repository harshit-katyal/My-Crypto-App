const express = require('express')
const Blockchain = require('./blockchain')
const bodyParser = require('body-parser')
const PubSub = require('./pubsub')
const request = require('request')

const app = express();
const blockchain = new Blockchain();
//bodyparser is initialized so that our express server can handle json requests 
const pubsub = new PubSub({blockchain})
const DEFAULT_PORT = 3000
const ROOT_NODE_ADDRESS = `http://localhost:${DEFAULT_PORT}`;

app.use(bodyParser.json())

//api to display the blocks
app.get('/api/blocks',(req,res)=>{
    res.json(blockchain.chain)  //now this will send back the blockchain.chain in its json form to whoever makes api/blocks request
     
})   //get http request is used to read data from a backend 

app.post('/api/mine',(req,res)=>
{
   const {data} = req.body

   blockchain.addBlock({data});
   
   pubsub.broadcastChain();
   
   res.redirect('/api/blocks') // this will redirect to api/blocks which will display all blocks--> previous and added 
})

const syncChains = () => {
    request({ url: `${ROOT_NODE_ADDRESS}/api/blocks` }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const rootChain = JSON.parse(body);
  
        console.log('replace chain on a sync with', rootChain);
        blockchain.replaceChain(rootChain);
      }
    })
}

let PEER_PORT;

if(process.env.GENERATE_PEER_PORT === 'true')
{
    PEER_PORT = DEFAULT_PORT+ Math.ceil(Math.random()*1000)
}

const PORT = PEER_PORT||DEFAULT_PORT
app.listen(PORT,()=>{
    console.log(`listening at localhost ${PORT}`)
    
    
    if (PORT !== DEFAULT_PORT){
    syncChains()
    }
}) 