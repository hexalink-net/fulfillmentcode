const {disclaimer} = require('../../constants')

const vaksinDPTCheckUp = (agent) => {
    let params = agent.parameters
    let answer = `Anak anda boleh menerima vaksin DPT. Menurut jadwal imunisasi yang direkomendasikan, vaksin diberikan sebanyak 3 kali sebagai imunisasi primer, yaitu 0,5 ml diberikan ketika anak berusia 2, 3, dan 4 bulan atau 2, 4, dan 6 bulan dengan rentang waktu antar pemberian adalah 4–6 minggu.
    `
    let info = `Pada usia 2, 3, dan 4 bulan vaksin DPT dapat diambil dalam bentuk kombinasi dengan vaksin Hepatitis B dan Hib
    `
    let lastDate = ``
    if (params.tanggalTerakhirVaksin != "belum") {
        lastDate = params.tanggalTerakhirVaksin.date.split('T')[0];
    }
    
    if (params.umur.unit == "month") {
        if (params.umur.amount <= 1){
            answer = `Anak anda belum boleh mengambil vaksin DPT. Berdasarkan IDAI (Ikatan Dokter Anak Indonesia) dianjurkan vaksin DPT diberikan ketika anak berumur 2, 3, dan 4 bulan sebanyak 3 kali. 
            `
            agent.add(answer + disclaimer)
            return
        } else if (params.umur.amount == 2){
            if (params.frekuensiVaksin >= 1) {
                answer = `Vaksin DPT selanjutnya dapat anda berikan ketika anak anda berusia 3 bulan dengan jarak ideal minimal 4-6 minggu dari tanggal terakhir vaksinmu ${lastDate}. Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin DPT perlu diberikan sebanyak 3 kali pada bayi dan anak-anak. Jadwal vaksinasi DPT pertama dilakukan saat bayi berusia 2, 3, dan 4 bulan atau 2, 4, dan 6 bulan dengan rentang waktu antar pemberian adalah 4–6 minggu.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.amount == 3) {
            if (params.frekuensiVaksin >= 2) {
                answer = `Vaksin DPT selanjutnya dapat anda berikan ketika anak anda berusia 4 bulan dengan jarak ideal minimal 4-6 minggu dari tanggal terakhir vaksinmu ${lastDate}. Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin DPT perlu diberikan sebanyak 3 kali pada bayi dan anak-anak. Jadwal vaksinasi DPT pertama dilakukan saat bayi berusia 2, 3, dan 4 bulan atau 2, 4, dan 6 bulan dengan rentang waktu antar pemberian adalah 4–6 minggu.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.amount >= 4) {
            if (params.frekuensiVaksin >= 3) {
                answer = `Vaksin DPT selanjutnya dapat anda berikan sebagai booster saat anak berusia 15–20 atau 18 bulan, setidaknya 6 bulan setelah dosis ketiga.
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
        answer = `Jika anak anda memiliki riwayat alergi vaksin DPT, disarankan untuk konsultasi terlebih dahulu dengan dokter. Vaksin DPT tidak boleh diberikan kepada orang yang alergi terhadap setiap bahan yang terkandung di dalam vaksin ini.
        `
        agent.add(answer + disclaimer)
        return
    }

    if (params.frekuensiVaksin > 0) {
        answer = `Anak anda boleh menerima vaksin DPT selanjutnya dengan rentang minimal 4 - 6 minggu dari tanggal terakhir vaksin anakmu (${lastDate}), dan dengan kondisi sehat.
            `
        agent.add(answer + disclaimer)
        return
    }

    agent.add(answer + disclaimer)
    return
}

module.exports = {vaksinDPTCheckUp};