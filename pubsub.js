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

        this.pubnub.addListener({
            message : messageObject =>
            {
                const{channel, message} = messageObject

            }
        })
    }

    listener()
    {
        return {
            
        }
    }
}