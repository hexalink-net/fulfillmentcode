const {disclaimer} = require('./constants')

const vaksinHepatitisBCheckUp = (agent) => {
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

module.exports = {vaksinHepatitisBCheckUp};