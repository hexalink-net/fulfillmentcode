const {disclaimer} = require('../../constants')

const vaksinBCGCheckUp = (agent) => {
    let params = agent.parameters
    let answer = `Anak anda boleh menerima vaksin BCG. Namun perlu diingat, sebaiknya vaksin BCG diberikan segera setelah lahir atau segera mungkin sebelum bayi berumur 1 bulan. Bila berumur 3 bulan atau lebih, vaksin BCG dapat diberikan bila uji tuberkulin negatif.
    `

    if (params.kondisi[0] != "sehat") {
        let conditions = params.kondisi.toString();
        answer = `Jika anak anda sedang mengalami ${conditions}. Sebaiknya dikonsultasikan kepada dokter terlebih dahulu. 
Secara umum, imunisasi BCG tidak boleh diberikan pada orang dengan gangguan sistem imun, sedang terinfeksi TB aktif, sedang luka bakar, hematuria makroskopik, dan ada riwayat alergi terhadap komponen vaksin.
        `
        agent.add(answer + disclaimer)
        return
    }
    
    if (params.frekuensiVaksin > 0) {
        answer = `Vaksin BCG cukup diberikan sekali saja, jika anak anda sudah menerima vaksin BCG sebelumnya maka tidak diperlukan lagi.`
        agent.add(answer)
        return
    }
    
    if (params.alergi != "tidak") {
        answer = `Secara umum, semua orang bisa mengambil vaksin BCG. Vaksin BCG terkandung dari bentuk lemah bakteri (kuman) yang menyebabkan TB`
        agent.add(answer + disclaimer)
        return
    }

    agent.add(answer + disclaimer)
    return
}

module.exports = {vaksinBCGCheckUp};