const PubNub = require('pubnub');
const credentials ={
    publishKey: 'pub-c-868c212e-e33a-4670-ba0b-94e695878ef3',
    subscribeKey: 'sub-c-27f063fd-e1a1-42d9-95f7-13254d2428a1',
    secretKey: 'sec-c-OTU5OTA2NGYtNDViMi00ZTA3LTljYTAtOGU3YzMyYWZlZTVk'

}

const CHANNELS ={
    TEST : 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN' // when one blochain instance adds a new block it's gonna be their duty to braodcast their version of the blockchain over this blockchain channel .
    // that way other nodes can decide whether or not the new data is valid and decide to update their chain based off that
    // there the subscriber in the pubsub class needs also subscribe to the channel
}

class PubSub 
{
    constructor({blockchain})
    {
        this.blockchain = blockchain   
        this.pubnub = new PubNub(credentials)

        this.pubnub.subscribe({channels: Object.values(CHANNELS)})

        this.pubnub.addListener(this.listener())
    }
    broadcastChain() {   //this doesnt have any arguments because we can reference the chain of the local blockchain instance 
        this.publish({
          channel: CHANNELS.BLOCKCHAIN,
          message: JSON.stringify(this.blockchain.chain)   // this.blockchain.chain is an array and we can only publish string messages over channels ...therefore we take the whole blockchain.chain and wrap it into a string when we publish it on the blockchain network
        });
      }

      subscribeToChannels() {
        this.pubnub.subscribe({
          channels: [Object.values(CHANNELS)]
        });
      }
    listener()
    {
        return {

            message : messageObject =>
            {
                const{channel, message} = messageObject // this message object will take 2 parameters ---> we want to know which channel has been triggered and what is the actual message 
                 console.log(`Message recieved. Channel : ${channel}. Message: Message: ${message}`)

                 const parsedMessage = JSON.parse(message)

                 if(channel === CHANNELS.BLOCKCHAIN)
                 {
                 this.blockchain.replaceChain(parsedMessage);
                 }

            }


        }
    }
   
    publish({channel,message})          //to publish the message to all the channels
    {
      
        this.pubnub.publish({channel,message})         
    }

}

module.exports = PubSub