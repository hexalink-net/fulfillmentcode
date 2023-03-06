const express = require('express')
const {WebhookClient} = require('dialogflow-fulfillment')
const app = express()
const {disclaimer} = require('./constants')
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
        vaksinBCGCheckUp(agent.parameters)
        return
    } else {
        agent.add("Maaf saya belum bisa mengenali vaksin tersebut, untuk pertanyaan tersebut bisa menghubungi dokter kami pada link berikut")
        return
    }
}

function vaksinBCGCheckUp(params){
    let answer = `Anak anda boleh menerima vaksin BCG. Sebaiknya vaksin BCG diberikan segera setelah lahir atau segera mungkin sebelum bayi berumur 1 bulan. Bila berumur 3 
    bulan atau lebih, vaksin BCG dapat diberikan bila uji tuberkulin negatif.`

    if (params.kondisi[0] != "sehat") {
        let conditions = params.kondisi.toString();
        answer = `Jika anak anda sedang mengalami ${conditions}. Sebaiknya dikonsultasikan kepada dokter terlebih dahulu. Secara umum, imunisasi BCG tidak boleh diberikan pada orang dengan gangguan sitem imun, sedang terinfeksi TB aktif, sedang luka bakar, hematuria makroskopik, dan ada riwayat alergi terhadap komponen vaksin. Vaksin BCG ditunda pada kondisi anak demam tinggi, terdapat luka di kulit daerah penyuntikan, dan infeksi saluran kemih.`
        agent.add(answer + disclaimer)
        return
    } else if (params.frekuensiVaksin > 0) {
        answer = `Vaksin BCG cukup diberikan sekali saja, jika anak anda sudah menerima vaksin BCG sebelumnya maka tidak diperlukan lagi.`
        agent.add(answer)
        return
    } else if (params.alergi[0] != "tidak ada") {
        answer = `Secara umum, semua orang bisa mengambil vaksin BCG. Vaksin BCG terkandung dari bentuk lemah bakteri (kuman) yang menyebabkan TB`
        agent.add(answer + disclaimer)
        return
    }

    agent.add(answer + disclaimer)
    return
}
/**
* now listing the server on port number 3000 :)
* */
app.listen(3000, () => {
    console.log("Server is Running on port 3000")
})