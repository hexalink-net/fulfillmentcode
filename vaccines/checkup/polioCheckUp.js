const {disclaimer} = require('../../constants')

const vaksinPolioCheckUp = (agent) => {
    let params = agent.parameters
    let lastDate = ``
    let answer = `
    `
    if (params.tanggalTerakhirVaksin != "belum") {
        lastDate = params.tanggalTerakhirVaksin.date.split('T')[0];
    }

    if (params.kondisi[0] != "sehat" ) {
        let conditions = params.kondisi.toString();
        answer = `Jika anak anda sedang mengalami ${conditions}. Sebaiknya dikonsultasikan kepada dokter terlebih dahulu. 
Disarankan untuk memberi tahu dokter jika anak anda menderita penyakit infeksi atau demam dan sedang menjalani pengobatan.
        `
        agent.add(answer + disclaimer)
        return
    }
    
    if (params.umur.unit == "month") {
        if (params.umur.amount >= 0 && params.umur.amount <= 1) {
            if (params.frekuensiVaksin >= 1) {
                answer = `Vaksin Polio selanjutnya dapat anda berikan IPV (suntik) ketika anak anda berusia 2 bulan dengan jarak ideal minimal 4 minggu dari tanggal terakhir vaksin anakmu (${lastDate}). Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin polio perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.amount == 2) {
            if (params.frekuensiVaksin >= 2) {
                answer = `Vaksin Polio selanjutnya dapat anda berikan IPV (suntik) ketika anak anda berusia 3 bulan dengan jarak ideal minimal 4 minggu dari tanggal terakhir vaksin anakmu (${lastDate}). Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin polio perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.amount == 3) {
            if (params.frekuensiVaksin >= 3) {
                answer = `Vaksin Polio selanjutnya dapat anda berikan OPV (tetes mulut) ketika anak anda berusia 4 bulan dengan jarak ideal minimal 4 minggu dari tanggal terakhir vaksin anakmu (${lastDate}). Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin polio perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
                `
                agent.add(answer + disclaimer)
                return
            }
        } else if (params.umur.amount >= 4) {
            if (params.frekuensiVaksin >= 4) {
                answer = `Vaksin Polio selanjutnya dapat anda berikan ketika anak anda berusia 18 bulan sebagai booster.
                `
                agent.add(answer + disclaimer)
                return
            }
        } 
    }
    
    if (params.alergi != "tidak") {
        answer = `Jika anak anda memiliki riwayat alergi vaksin polio atau pun vaksin lainnya yang mengandung formalin, neomycin, streptomycin, atau polymixin B. Disarankan untuk konsultasi terlebih dahulu dengan dokter. Vaksin hepatitis B tidak boleh diberikan kepada orang yang alergi terhadap setiap bahan yang terkandung di dalam vaksin ini.`
        agent.add(answer + disclaimer)
        return
    }

    if (params.umur.unit == "month") {
        if (params.umur.amount >= 0 && params.umur.amount <= 1) {
            answer = `Pada umur ${params.umur.amount} bulan, anak anda bisa diberikan vaksin polio dalam bentuk OPV (tetes mulut).
            `
            agent.add(answer + disclaimer)
            return
        } else if (params.frekuensiVaksin == 0){
            answer = `Jika anak telah melewatkan seluruh rangkaian dosis vaksin polio, maka dokter atau petugas kesehatan akan merekomendasikan jadwal yang tepat untuk memulai kembali vaksinasi polio sesuai dengan usia dan status imunisasi anak. Namun, biasanya jarak antara dosis pertama dan kedua adalah 4-8 minggu, dan jarak antara dosis kedua dan ketiga adalah 6-12 bulan.`
            agent.add(answer + disclaimer)
            return
        } else if (params.umur.amount >= 2 && params.umur.amount <= 3) {
            if (params.umur.amount == 3 && params.frekuensiVaksin == 1){
                answer = `Jika anakmu berumur ${params.umur.amount} bulan dan baru mendapatkan dosis satu, anak anda bisa diberikan vaksin polio dosis 2 dalam bentuk IPV (suntik) dan untuk vaksinasi polio selanjutnya antara dosis 2 dan 3 akan diperpendek dari 1 bulan menjadi 2-4 minggu.
                `
                agent.add(answer + disclaimer)
                return
            }
            answer = `Pada umur ${params.umur.amount} bulan, anak anda bisa diberikan vaksin polio dalam bentuk IPV (suntik).
            `
            agent.add(answer + disclaimer)
            return
        } else if (params.umur.ammount >= 4){
            if (params.frekuensiVaksin == 3){
                answer = `Pada umur ${params.umur.amount} bulan, anak anda bisa diberikan vaksin polio dalam bentuk OPV (tetes mulut).
                `
                agent.add(answer + disclaimer)
                return
            } else if (params.frekuensiVaksin == 1){
                answer = `Jika anakmu berumur ${params.umur.amount} bulan dan baru mendapatkan dosis satu, anak anda bisa diberikan vaksin polio dosis dua dalam bentuk IPV (suntik) dan untuk vaksinasi polio selanjutnya antara dosis 2 dan 3 akan diperpendek dari 1 bulan menjadi 2-4 minggu.
                `
                agent.add(answer + disclaimer)
                return
            } else if (params.frekuensiVaksin == 2){
                answer = `Jika anakmu berumur ${params.umur.amount} bulan dan baru mendapatkan dosis dua, anak anda bisa diberikan vaksin polio dosis tiga dalam bentuk IPV (suntik) dan untuk vaksinasi polio selanjutnya antara dosis 3 dan 4 akan diperpendek dari 1 bulan menjadi 2-4 minggu.
                `
                agent.add(answer + disclaimer)
                return
            }
        }
    }
    
    agent.add(answer + disclaimer)
    return
}

module.exports = {vaksinPolioCheckUp};