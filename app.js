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

function vaksinBCGCheckUp(agent){
    let params = agent.parameters
    let answer = `Anak anda boleh menerima vaksin BCG. Namun perlu diingat, sebaiknya vaksin BCG diberikan segera setelah lahir atau segera mungkin sebelum bayi berumur 1 bulan. Bila berumur 3 
    bulan atau lebih, vaksin BCG dapat diberikan bila uji tuberkulin negatif.`

    if (params.kondisi[0] != "sehat") {
        let conditions = params.kondisi.toString();
        answer = `Jika anak anda sedang mengalami ${conditions}. Sebaiknya dikonsultasikan kepada dokter terlebih dahulu. 
        Secara umum, imunisasi BCG tidak boleh diberikan pada orang dengan gangguan sistem imun, sedang terinfeksi TB aktif, sedang luka bakar, hematuria makroskopik, dan ada riwayat alergi terhadap komponen vaksin.
        `
        agent.add(answer + disclaimer)
        return
    } else if (params.frekuensiVaksin > 0) {
        answer = `Vaksin BCG cukup diberikan sekali saja, jika anak anda sudah menerima vaksin BCG sebelumnya maka tidak diperlukan lagi.`
        agent.add(answer)
        return
    } else if (params.alergi[0] != "tidak") {
        answer = `Secara umum, semua orang bisa mengambil vaksin BCG. Vaksin BCG terkandung dari bentuk lemah bakteri (kuman) yang menyebabkan TB`
        agent.add(answer + disclaimer)
        return
    }

    agent.add(answer + disclaimer)
    return
}

function vaksinHepatitisBCheckUp(agent){
    let params = agent.parameters
    let answer = `Anak anda boleh menerima vaksin Hepatitis B. Menurut jadwal imunisasi yang direkomendasikan, vaksin hepatitis B pertama sebaiknya diberikan pada bayi usia 0-2 bulan. Jadi, jika anak Anda berusia ${params.umur} dan belum mendapatkan vaksin hepatitis B pertama, maka sebaiknya segera memberikan vaksin tersebut.
    `
    
    if (params.kondisi[0] == "flu" || params.kondisi[0] == "batuk" || params.kondisi[1] == "pilek") {
        answer = `Anak yang sedang sakit, terutama dengan demam, sebaiknya menunda pemberian vaksin hepatitis B sampai dia pulih dari sakitnya. Namun, jika anak Anda hanya mengalami gejala ringan, seperti flu, maka kemungkinan besar tidak ada masalah dengan memberikan vaksin hepatitis B.
        `
        agent.add(answer + disclaimer)
        return
    } else if (params.kondisi[0] != "sehat" ) {
        let conditions = params.kondisi.toString();
        answer = `Jika anak anda sedang mengalami ${conditions}. Sebaiknya dikonsultasikan kepada dokter terlebih dahulu. 
        Disarankan untuk memberi tahu dokter jika anak anda menderita penyakit infeksi atau demam dan sedang menjalani pengobatan.
        `
        agent.add(answer + disclaimer)
        return
    } else if (params.umur.unit == "month") {
        if (params.umur.measure == 1) {
            if (params.frekuensiVaksin >= 1) {
                answer = `Vaksin Hepatitis B selanjutnya dapat anda berikan ketika anak anda berusia 2 bulan dengan jarak ideal minimal 4 minggu dari tanggal terakhir vaksinmu ${params.tanggalTerakhirVaksin}. Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin hepatitis B perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.measure == 2) {
            if (params.frekuensiVaksin >= 2) {
                answer = `Vaksin Hepatitis B selanjutnya dapat anda berikan ketika anak anda berusia 3 bulan dengan jarak ideal minimal 4 minggu dari tanggal terakhir vaksinmu ${params.tanggalTerakhirVaksin}. Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin hepatitis B perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.measure == 3) {
            if (params.frekuensiVaksin >= 3) {
                answer = `Vaksin Hepatitis B selanjutnya dapat anda berikan ketika anak anda berusia 4 bulan dengan jarak ideal minimal 4 minggu dari tanggal terakhir vaksinmu ${params.tanggalTerakhirVaksin}. Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin hepatitis B perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.measure >= 4) {
            if (params.frekuensiVaksin >= 4) {
                answer = `Vaksin Hepatitis B selanjutnya dapat anda berikan ketika anak anda berusia 18 bulan sebagai booster.
                `
                agent.add(answer + disclaimer)
                return
            } else if (params.frekuensiVaksin < 4) {
                answer = `Kamu dapat menerima vaksin hepatitis B walaupun telat jadwal. Namun perlu diingat dibutuhkan adanya jeda minimal 4 minggu dari setiap penerimaan dosis vaksin dan dipastikan anak anda tidak memiliki riwayat alergi terhadap vaksin Hepatitis B. 
                `
                agent.add(answer + disclaimer)
                return
            }
        } 
    } else if (params.alergi[0] != "tidak ada") {
        answer = `Jika anak anda memiliki riwayat alergi vaksin Hepatitis B, disarankan untuk konsultasi terlebih dahulu dengan dokter. Vaksin hepatitis B tidak boleh diberikan kepada orang yang alergi terhadap setiap bahan yang terkandung di dalam vaksin ini.
        `
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