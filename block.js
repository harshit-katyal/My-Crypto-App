const{ GENESIS_DATA } = require('./config')
const cryptoHash = require('./crypto-hash')
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
         const timestamp = Date.now()
         const lastHash = lastBlock.hash;
         return new this({
             timestamp,
             lastHash,
             data,
             hash:cryptoHash(timestamp,lastHash,data)
         });


     }
    
     
}
 
module.exports = Block;
