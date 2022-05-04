const{ GENESIS_DATA } = require('./config')
class Block
{
    constructor({timestamp , lastHash, hash, data})
     {
            this.timestamp = timestamp
            this.lastHash = lastHash
             this.hash = hash
             this.data = data
     }

     static genesis() //a static function that is creating a new Block instance without directly using the constructor. They are called factory methods.
     {
         return new this(GENESIS_DATA);
     }
     static mineBlock({lastBlock, data})
     {
         return new this({
             timestamp:Date.now(),
             lastHash:lastBlock.hash,
             data

         });


     }
     
}
 
module.exports = Block;
