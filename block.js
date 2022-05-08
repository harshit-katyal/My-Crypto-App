const{ GENESIS_DATA , MINE_RATE } = require('./config')
const cryptoHash = require('./crypto-hash')
class Block
{
    constructor({timestamp , lastHash, hash,nonce,difficulty,data})
     {
            this.timestamp = timestamp
            this.lastHash = lastHash
            this.hash = hash
            this.data = data
            this.nonce = nonce
            this.difficulty = difficulty

     }

     static genesis() //a static function that is creating a new Block instance without directly using the constructor. They are called factory methods.
     {
         return new this(GENESIS_DATA);
     }
     static mineBlock({lastBlock, data})
     {
        const lastHash = lastBlock.hash;
        let hash,timestamp;
        let { difficulty } = lastBlock
        let nonce =0
        do
         {
              nonce++;
              timestamp = Date.now();
              difficulty = Block.adjustDifficulty({originalBlock: lastBlock,timestamp})
              hash = cryptoHash(timestamp,lastHash,data,nonce,difficulty)
         }
         while(hash.substring(0,difficulty) !=='0'.repeat(difficulty));

         return new this({
             timestamp,
             lastHash,
             data,
             difficulty,
             nonce,
             hash });


     }

     static adjustDifficulty({originalBlock , timestamp})
      {
          const {difficulty} = originalBlock

          if((timestamp - originalBlock.timestamp) > MINE_RATE) return difficulty -1;
          

          return difficulty +1;
        
      }
    
     
}
 
module.exports = Block;
