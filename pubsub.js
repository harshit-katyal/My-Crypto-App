const PubNub = require('pubnub');
const credentials ={
    publishKey: 'pub-c-868c212e-e33a-4670-ba0b-94e695878ef3',
    subscribeKey: 'sub-c-27f063fd-e1a1-42d9-95f7-13254d2428a1',
    secretKey: 'sec-c-OTU5OTA2NGYtNDViMi00ZTA3LTljYTAtOGU3YzMyYWZlZTVk'

}

const CHANNELS ={
    TEST : 'TEST'
}

class PubSub 
{
    constructor()
    {
        this.pubnub = new PubNub(credentials)

        this.pubnub.subscribe({channels: Object.values(CHANNELS)})

        this.pubnub.addListener(this.listener())
    }

    listener()
    {
        return {

            message : messageObject =>
            {
                const{channel, message} = messageObject // this message object will take 2 parameters ---> we want to know which channel has been triggered and what is the actual message 
                 console.log(`Message recieved. Channel : ${channel}. Message: {Message: ${message}}`)
            }


        }
    }

    publish({channel,message})          //to publish the message to all the channels
    {
        this.pubnub.publish({channel,message})         
    }

}
module.exports = PubSub