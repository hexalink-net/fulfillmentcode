const express = require('express')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()
const {vaksinBCGCheckUp} = require('./bcgCheckUp')
const {vaksinHepatitisBCheckUp} = require('./hepatitisBCheckUp')
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

function handleWebHookIntentDetailVaksin(agent){
    if (agent.parameters.vaksin == "BCG") {
        agent.add(`Vaksin BCG merupakan salah satu dari sejumlah vaksin wajib yang memberi perlindungan pada anak terhadap penyakit tuberkulosis atau TBC.  Fungsi vaksin BCG yang paling utama adalah mencegah dan mengurangi risiko terjangkit TBC. Tak hanya itu, pemberian vaksin BCG juga dapat mencegah TBC parah hingga 70 persen!!
        Vaksin BCG di Indonesia umumnya diberikan pada bayi yang baru lahir atau saat bayi berusia 1 bulan. Jika ditunda, pemberian vaksin BCG paling lambat diberikan saat bayi berusia 2−3 bulan.
        Semoga informasi tersebut membantu! 😁`)
        return
    } else {
        agent.add("Maaf saya belum bisa mengenali vaksin tersebut, untuk pertanyaan tersebut bisa menghubungi dokter kami pada link berikut")
        return
    }
}

function handleWebHookIntentPersyaratanVaksin(agent){
    if (agent.parameters.vaksin == "BCG") {
        vaksinBCGCheckUp(agent)
        return
    } else if (agent.parameters.vaksin == "Hepatitis B") {
        vaksinHepatitisBCheckUp(agent)
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