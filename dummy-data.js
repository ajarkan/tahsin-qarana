// =======================================================
// DUMMY DATA PENDAFTAR & NOTIFIKASI SOCIAL PROOF
// APLIKASI BELAJAR AL-QUR'AN: TAHSIN QARA'NA
// (DARI NOL SAMPAI LANCAR)
// =======================================================

const DUMMY_DOWNLOADERS = [
  {
    nama: "Muhammad Raihan",
    no_wa: "0812****7890",
    tempat_lahir: "Bandung",
    tanggal_lahir: "1995-04-12",
    pesan: "Alhamdulillah sangat membantu! Dulu terbata-bata baca hijaiyah, sekarang makin lancar dan percaya diri.",
    waktu_relatif: "2 menit lalu",
    created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString()
  },
  {
    nama: "Siti Nur Aisyah",
    no_wa: "0813****5432",
    tempat_lahir: "Jakarta Selatan",
    tanggal_lahir: "1998-08-25",
    pesan: "Audio pelafalan aslinya jernih sekali (bukan suara robot/AI). Sangat mempermudah makhraj huruf.",
    waktu_relatif: "5 menit lalu",
    created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString()
  },
  {
    nama: "Ahmad Fauzan Pratama",
    no_wa: "0821****7788",
    tempat_lahir: "Surabaya",
    tanggal_lahir: "1992-11-03",
    pesan: "Metode Tahsin Qara'na beneran dari nol sampai bisa. Tampilan flipbook interaktifnya sangat praktis.",
    waktu_relatif: "9 menit lalu",
    created_at: new Date(Date.now() - 9 * 60 * 1000).toISOString()
  },
  {
    nama: "Fathimah Az-Zahra",
    no_wa: "0857****3344",
    tempat_lahir: "Yogyakarta",
    tanggal_lahir: "2000-01-17",
    pesan: "Dulu sempat malu belajar ngaji di usia segini. Untung ada aplikasi ini, belajar mandiri di rumah jadi nyaman.",
    waktu_relatif: "15 menit lalu",
    created_at: new Date(Date.now() - 15 * 60 * 1000).toISOString()
  },
  {
    nama: "Dimas Wahyu Prasetyo",
    no_wa: "0878****1122",
    tempat_lahir: "Semarang",
    tanggal_lahir: "1994-06-30",
    pesan: "Penjelasan hukum tajwid dan hukum mad-nya sangat mudah dipahami. Jazakallah khair ustadz!",
    waktu_relatif: "22 menit lalu",
    created_at: new Date(Date.now() - 22 * 60 * 1000).toISOString()
  },
  {
    nama: "H. Syamsudin Noor",
    no_wa: "0819****8811",
    tempat_lahir: "Makassar",
    tanggal_lahir: "1985-03-15",
    pesan: "Standar Rasm Utsmani Timur Tengah-nya persis mushaf Madinah. Sangat saya rekomendasikan untuk keluarga.",
    waktu_relatif: "30 menit lalu",
    created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  },
  {
    nama: "Anisa Rahmawati",
    no_wa: "0852****9933",
    tempat_lahir: "Malang",
    tanggal_lahir: "1999-09-09",
    pesan: "Navigasi halamannya simpel dan intuitif. Senang sekali bisa belajar tahsin gratis.",
    waktu_relatif: "38 menit lalu",
    created_at: new Date(Date.now() - 38 * 60 * 1000).toISOString()
  },
  {
    nama: "Budi Kurniawan",
    no_wa: "0822****4455",
    tempat_lahir: "Medan",
    tanggal_lahir: "1991-12-20",
    pesan: "Bagus sekali untuk yang mau melancarkan lisan. Setiap huruf ada contoh suara aslinya.",
    waktu_relatif: "47 menit lalu",
    created_at: new Date(Date.now() - 47 * 60 * 1000).toISOString()
  },
  {
    nama: "Nurul Hidayati",
    no_wa: "0812****0044",
    tempat_lahir: "Surakarta (Solo)",
    tanggal_lahir: "1997-05-18",
    pesan: "Semoga berkah untuk pembuat aplikasi dan yang membagikan. Sangat bermanfaat untuk umat.",
    waktu_relatif: "1 jam lalu",
    created_at: new Date(Date.now() - 65 * 60 * 1000).toISOString()
  },
  {
    nama: "Rizky Ramadhan",
    no_wa: "0856****2211",
    tempat_lahir: "Palembang",
    tanggal_lahir: "1996-02-28",
    pesan: "Alhamdulillah dari yang belum lancar sekarang sudah bisa membedakan makhraj huruf tebal dan tipis.",
    waktu_relatif: "2 jam lalu",
    created_at: new Date(Date.now() - 120 * 60 * 1000).toISOString()
  },
  {
    nama: "Zulfa Maharani",
    no_wa: "0813****1188",
    tempat_lahir: "Bogor",
    tanggal_lahir: "2001-07-14",
    pesan: "Masya Allah, aplikasinya ringan dibuka di HP dan audionya jernih tanpa jeda!",
    waktu_relatif: "3 jam lalu",
    created_at: new Date(Date.now() - 180 * 60 * 1000).toISOString()
  },
  {
    nama: "Hendro Wibowo",
    no_wa: "0877****6622",
    tempat_lahir: "Bekasi",
    tanggal_lahir: "1989-10-05",
    pesan: "Sangat cocok untuk belajar malam hari selepas pulang kerja. Penjelasannya to the point.",
    waktu_relatif: "4 jam lalu",
    created_at: new Date(Date.now() - 240 * 60 * 1000).toISOString()
  },
  {
    nama: "Khadijah Al-Munawwarah",
    no_wa: "0812****4321",
    tempat_lahir: "Banda Aceh",
    tanggal_lahir: "1993-03-21",
    pesan: "Jazakallahu khair, ilmunya sangat berkah. Anak-anak di rumah juga ikut antusias menyimak audionya.",
    waktu_relatif: "5 jam lalu",
    created_at: new Date(Date.now() - 300 * 60 * 1000).toISOString()
  },
  {
    nama: "Teguh Santoso",
    no_wa: "0823****8899",
    tempat_lahir: "Denpasar",
    tanggal_lahir: "1990-11-12",
    pesan: "Sebagai mualaf, materi dari nol ini sangat memandu saya belajar melafalkan huruf hijaiyah dengan benar.",
    waktu_relatif: "6 jam lalu",
    created_at: new Date(Date.now() - 360 * 60 * 1000).toISOString()
  },
  {
    nama: "Dewi Safitri",
    no_wa: "0858****7711",
    tempat_lahir: "Padang",
    tanggal_lahir: "1998-04-02",
    pesan: "Tampilan flipbook-nya cantik sekali! Mudah dipelajari kapan saja tanpa ribet bawa buku fisik.",
    waktu_relatif: "7 jam lalu",
    created_at: new Date(Date.now() - 420 * 60 * 1000).toISOString()
  },
  {
    nama: "Arif Hidayat",
    no_wa: "0819****2345",
    tempat_lahir: "Banjarmasin",
    tanggal_lahir: "1994-08-19",
    pesan: "Alhamdulillah sangat terbantu untuk memperbaiki hukum ikhfa dan idgham yang sering keliru.",
    waktu_relatif: "8 jam lalu",
    created_at: new Date(Date.now() - 480 * 60 * 1000).toISOString()
  },
  {
    nama: "Laila Majidah",
    no_wa: "0853****6677",
    tempat_lahir: "Samarinda",
    tanggal_lahir: "1997-12-08",
    pesan: "Senang sekali ada modul interaktif seperti ini, belajar mandiri terasa seperti ada guru pembimbing.",
    waktu_relatif: "9 jam lalu",
    created_at: new Date(Date.now() - 540 * 60 * 1000).toISOString()
  },
  {
    nama: "Rahmat Santika",
    no_wa: "0812****9012",
    tempat_lahir: "Cirebon",
    tanggal_lahir: "1988-06-16",
    pesan: "Terima kasih banyak ustadz, semoga menjadi amal jariyah yang terus mengalir.",
    waktu_relatif: "10 jam lalu",
    created_at: new Date(Date.now() - 600 * 60 * 1000).toISOString()
  }
];

window.DUMMY_DOWNLOADERS = DUMMY_DOWNLOADERS;
