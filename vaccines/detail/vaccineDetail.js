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
    } else if (agent.parameters.vaksin == "Campak") {
        agent.add(`Vaksin campak adalah vaksin yang digunakan untuk mencegah penyakit campak. Vaksin campak termasuk dalam program imunisasi rutin lengkap yang dianjurkan oleh Kementerian Kesehatan Republik Indonesia.
        Terdapat dua jenis vaksin yang digunakan untuk mencegah campak, yaitu vaksin MR dan vaksin MMR. Vaksin MR mencegah penyakit campak dan rubella, sedangkan vaksin MMR mencegah penyakit campak, rubella, dan gondongan.
        Berdasarkan IDAI dianjurkan untuk umur 9 bulan diberikan vaksin MR. Bila sampai umur 12 bulan belum mendapat vaksin MR, dapat 
        diberikan MMR. Umur 18 bulan berikan MR atau MMR. Umur 5 – 7 tahun berikan MR (dalam program BIAS kelas 1) atau MMR.
        Semoga informasi tersebut membantu! 😁`)
        return
    } else if (agent.parameters.vaksin == "Polio") {
        agent.add(`Vaksin polio adalah vaksin yang diberikan untuk mencegah terjadinya penyakit poliomyelitis atau polio. Pemerintah Republik Indonesia menetapkan vaksin polio sebagai salah satu jenis vaksin yang wajib diberikan kepada anak-anak.
        Terdapat dua jenis vaksin polio, yaitu oral polio vaccine (OPV) dan inactivated polio vaccine (IPV). OPV mengandung virus polio hidup yang dilemahkan, sedangkan IPV menggunakan virus yang sudah tidak aktif. Di Indonesia jenis OPV yang digunakan adalah jenis bOPV, yaitu jenis vaksin polio oral bivalen.
        Vaksin ini bekerja dengan cara memicu tubuh untuk membentuk antibodi yang dapat melawan infeksi virus polio.
        Berdasarkan rekomendasi jadwal imunisasi dari Ikatan Dokter Anak Indonesia (IDAI), vaksin polio perlu diberikan sebanyak 4 kali pada bayi dan anak-anak, diberikan pada usia 0-1 bulan, usia 2, 3 dan 4 bulan.
        Semoga informasi tersebut membantu! 😁`)
        return
    } else if (agent.parameters.vaksin == "DPT") {
        agent.add(`Vaksin DPT adalah vaksin kombinasi yang diberikan untuk difteri, pertusis (batuk rejan), dan tetanus.  Di Indonesia, vaksin DPT merupakan salah satu vaksinasi yang wajib diberikan kepada anak-anak.
        Di dalam vaksin DPT, terkandung diptheria toxoid, tetanus toxoid, dan pertussis antigens, yang akan memicu sistem kekebalan tubuh untuk memproduksi antibodi dalam memerangi infeksi dari ketiga penyakit tersebut jika sewaktu-waktu menyerang
        Sesuai dengan jadwal imunisasi yang dikeluarkan oleh Ikatan Dokter Anak Indonesia (IDAI), vaksin DPT merupakan salah satu vaksin yang wajib diberikan kepada anak. Vaksin DPT primer akan diberikan sebanyak 3 kali pada usia 2, 3, dan 4 bulan.
        Semoga informasi tersebut membantu! 😁`)
        return
    } else {
        agent.add("Maaf saya belum bisa mengenali vaksin tersebut, untuk pertanyaan tersebut bisa menghubungi dokter kami pada link berikut")
        return
    }
}

module.exports = {handleWebHookIntentDetailVaksin};