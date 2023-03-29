const {disclaimer} = require('../../constants')

const vaksinCampakCheckUp = (agent) => {
    let params = agent.parameters
    let answer = `
    `
    
    if (params.umur.unit == "month") {
        if (params.umur.amount < 9){
            answer = `Anak anda belum boleh mengambil vaksin campak (MR/MMR). Berdasarkan IDAI (Ikatan Dokter Anak Indonesia) dianjurkan vaksin campak diberikan ketika anak berumur minimal 9 bulan. 
            `
            agent.add(answer + disclaimer)
            return
        } else if (params.umur.amount >= 9 && params.umur.amount < 18) {
            if (params.frekuensiVaksin >= 1) {
                answer = `Anak anda tidak perlu mengambil vaksin campak (MR/MMR) lagi. Berdasarkan IDAI (Ikatan Dokter Anak Indonesia) anak dibawah umur 2 tahun hanya perlu mengambil vaksin MR/MMR sekali saja 
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.amount >= 18) {
            if (params.frekuensiVaksin >= 1) {
                answer = `Anak anda tidak perlu mengambil vaksin campak (MR/MMR) lagi. Berdasarkan IDAI (Ikatan Dokter Anak Indonesia) anak dibawah umur 2 tahun hanya perlu mengambil vaksin MR/MMR sekali saja 
                `
                agent.add(answer + disclaimer)
                return
            }
        }
    }
    
    if (params.kondisi[0] != "sehat" ) {
        let conditions = params.kondisi.toString();
        answer = `Jika anak anda sedang mengalami ${conditions}. Sebaiknya dikonsultasikan kepada dokter terlebih dahulu. 
Disarankan untuk memberi tahu dokter jika anak anda menderita penyakit infeksi atau demam dan sedang menjalani pengobatan.
        `
        agent.add(answer + disclaimer)
        return
    }
    
    if (params.alergi != "tidak") {
        answer = `Jika anak anda memiliki riwayat alergi vaksin campak, disarankan untuk konsultasi terlebih dahulu dengan dokter. Vaksin campak tidak boleh diberikan kepada orang yang alergi terhadap setiap bahan yang terkandung di dalam vaksin ini.`
        agent.add(answer + disclaimer)
        return
    }

    if (params.umur.unit == "month") {
        if (params.umur.amount >= 9 && params.umur.amount < 18) {
            answer = `Pada umur ${params.umur.amount} ${params.umur.unit}, anak anda bisa diberikan vaksin MR.
            `
            agent.add(answer + disclaimer)
            return
        } else if (params.umur.amount >= 18) {
            answer = `Pada umur ${params.umur.amount} ${params.umur.unit}, anak anda bisa diberikan vaksin MMR, jika sebelumnya belum pernah mendapatkan vaksin MR.
            `
            agent.add(answer + disclaimer)
            return
        }
    }

    agent.add(answer + disclaimer)
    return
}

module.exports = {vaksinCampakCheckUp};