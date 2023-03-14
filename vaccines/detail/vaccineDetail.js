const handleWebHookIntentDetailVaksin = (agent) => {
    if (agent.parameters.vaksin == "BCG") {
        agent.add(`Vaksin BCG merupakan salah satu dari sejumlah vaksin wajib yang memberi perlindungan pada anak terhadap penyakit tuberkulosis atau TBC.  Fungsi vaksin BCG yang paling utama adalah mencegah dan mengurangi risiko terjangkit TBC. Tak hanya itu, pemberian vaksin BCG juga dapat mencegah TBC parah hingga 70 persen!!
        Vaksin BCG di Indonesia umumnya diberikan pada bayi yang baru lahir atau saat bayi berusia 1 bulan. Jika ditunda, pemberian vaksin BCG paling lambat diberikan saat bayi berusia 2−3 bulan.
        Semoga informasi tersebut membantu! 😁`)
        return
    } else if (agent.parameters.vaksin == "Hepatitis B") {
        agent.add(`Vaksinasi hepatitis B merupakan salah satu program imunisasi yang wajib diberikan kepada bayi baru lahir dan orang dewasa yang belum pernah mendapatkannya. Pemberian vaksin hepatitis B penting dilakukan untuk mencegah penyakit hepatitis B.
        Hepatitis B adalah infeksi pada organ hati atau liver yang disebabkan oleh virus hepatitis B (HBV). Penyakit ini bisa bersifat akut atau berlangsung selama beberapa bulan, tetapi bisa juga berkembang menjadi kronis atau menetap hingga bertahun-tahun.
        Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin hepatitis B perlu diberikan sebanyak 4 kali pada bayi dan anak-anak. Jadwal vaksinasi hepatitis B pertama dilakukan saat bayi dilahirkan dan ketiga dosis selanjutnya diberikan ketika bayi berusia 2, 3, dan 4 bulan.
        Semoga informasi tersebut membantu! 😁`)
        return
    } else {
        agent.add("Maaf saya belum bisa mengenali vaksin tersebut, untuk pertanyaan tersebut bisa menghubungi dokter kami pada link berikut")
        return
    }
}

module.exports = {handleWebHookIntentDetailVaksin};