const express =require('express');
const app = express();
const dfff = require('dialogflow-fulfillment');
const serviceAccount = require('./service-account.json');
const functions = require('firebase-functions');
const admin = require('firebase-admin');



try{

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://chatbot-334511.firebaseio.com"
      });

      var db = admin.firestore();
      console.log('db connected')
      
  } catch{


 }




app.get('/', (req,res)=>{
    res.send(' <iframe allow="microphone;" width="350" height="430" src="https://console.dialogflow.com/api-client/demo/embedded/6437e984-3642-4cff-83b9-a44c4a7985f7"> </iframe> ');
})

app.post('/' ,express.json(), async (req,res)=>{
    const agent = new dfff.WebhookClient({
        request: req,
        response: res
    });

    function demo(agent){

        agent.add("Hello From the server, How can i help you ? ")
    }
    // function customPaylod(agent){
    //     var customPaylod = {
            
    //             "richContent": [
    //               [
    //                 {
    //                   "type": "accordion",
    //                   "title": "Accordion title",
    //                   "subtitle": "Accordion subtitle",
    //                   "image": {
    //                     "src": {
    //                       "rawUrl": "https://example.com/images/logo.png"
    //                     }
    //                   },
    //                   "text": "Accordion text"
    //                 }
    //               ]
    //             ]
    //           }
        
    //       agent.add(new dfff.Payload( agent.UNSPECIFIED ,customPaylod, { sendAsMessage: true,rawPayload: true }))
    // }
    function finalConfirmation(agent){

        // var name = agent.context.get("awaiting_name");
        // var email = agent.context.get("awaiting_email");
        // console.log(name)
        db.collection('meeting').add({
            name:"name of the customer ",
            email:"email of customer",
            time: Date.now()
        }).then(()=>{
            agent.add("Dummy Content");
        }).catch(err=> console.log("jflkj"))
     }

    var intentMap = new Map();
    intentMap.set('DemoC' , demo)
    intentMap.set('finalConfirmation' , finalConfirmation)

     agent.handleRequest(intentMap).then(result=>{
         console.log(result)
     }).catch(err=>{
         console.log(err)
     })

     

})



app.listen(3000,()=>{

    console.log('listening in 3000')
});





