const express = require('express')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()
const {vaksinBCGCheckUp} = require('./vaccines/checkup/bcgCheckUp')
const {vaksinHepatitisBCheckUp} = require('./vaccines/checkup/hepatitisBCheckUp')
const {vaksinCampakCheckUp} = require('./vaccines/checkup/campakCheckUp')
const {handleWebHookIntentDetailVaksin} = require('./vaccines/detail/vaccineDetail')
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Server Is Working......")
})
/**
* on this route dialogflow send the webhook request
* For the dialogflow we need POST Route.
* */
app.post('/webhook', (req, res) => {
    // get agent from request
    let agent = new WebhookClient({request: req, response: res})
    // create intentMap for handle intent
    let intentMap = new Map();
    // add intent map 2nd parameter pass function
    intentMap.set('Detail Vaksin',handleWebHookIntentDetailVaksin)
    intentMap.set('Persyaratan Vaksin',handleWebHookIntentPersyaratanVaksin)
    // now agent is handle request and pass intent map
    agent.handleRequest(intentMap)
})

function handleWebHookIntentPersyaratanVaksin(agent){
    if (agent.parameters.vaksin == "BCG") {
        vaksinBCGCheckUp(agent)
        return
    } else if (agent.parameters.vaksin == "Hepatitis B") {
        vaksinHepatitisBCheckUp(agent)
        return
    } else if (agent.parameters.vaksin == "Campak") {
        vaksinCampakCheckUp(agent)
        return
    } else {
        agent.add("Maaf saya belum bisa mengenali vaksin tersebut, untuk pertanyaan tersebut bisa menghubungi dokter kami pada link berikut")
        return
    }
}

/**
* now listing the server on port number 3000 :)
* */
app.listen(3000, () => {
    console.log("Server is Running on port 3000")
})