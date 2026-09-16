# 📖 Landing Page Aplikasi Belajar Al-Qur'an: Tahsin Qara'na (Dari Nol Sampai Lancar)

Landing page responsif dan berorientasi konversi khusus untuk promosi **Aplikasi Belajar Al-Qur'an: TAHSIN QARA'NA (Melatih Lisan Memperbaiki Bacaan Al-Qur'an Dari Nol Sampai Lancar)**.

---

## 🌟 Fitur Utama yang Telah Disesuaikan

1. **Branding & Copywriting Sesuai Screenshot**:
   - Judul: **APLIKASI TAHSIN QARA'NA (Dari Nol Sampai Lancar)**
   - 3 Highlight Badges:
     - 📑 *Navigasi Aplikasi Mudah*
     - 🎙️ *Audio Pelafalan Asli (Bukan AI)*
     - 📚 *Materi Lengkap (0 sampai Bisa)*
   - Target Audiens (*Untuk Siapa Aplikasi Ini?*):
     - ✅ Buat yang belum bisa baca Quran
     - ✅ Buat yang belum lancar (terbata)
     - ✅ Buat yang mau melancarkan Tajwidnya
     - ✅ Buat yang masih malu memulai
2. **Slot Dummy Box / Gambar Mockup**:
   - Gambar screenshot Anda telah otomatis dimasukkan ke dalam landing page di folder `assets/tahsin-qarana-banner.png`.
   - Disediakan juga alternatif placeholder 3D box di `assets/dummy-box.svg`.
   - Anda dapat dengan mudah mengganti file gambar box ini dengan file JPG atau PNG Anda sendiri kapan saja.
3. **Formulir Pendaftaran**:
   - Nama Lengkap (*Required*)
   - No. WhatsApp / HP (*Required*)
   - Tempat & Tanggal Lahir (Kalender klik / datepicker) (*Required*)
   - Pesan / Motivasi Belajar Mengaji (*Teks*)
   - Tombol: *"Dapatkan Aplikasi Belajar Gratis via WA"*
4. **Penyimpanan Ganda (Supabase + WA Redirect)**:
   - Data otomatis tersimpan ke tabel Supabase `pendaftar_quran`.
   - Otomatis membuka WhatsApp ke admin nomor **`6282116807451`** dengan format pesan rapi.
5. **Pop-up Social Proof Berkala (Pojok Kanan Atas)**:
   - Muncul setiap 7.5 detik secara dinamis, menampilkan nama dan kota yang baru saja mendownload aplikasi Tahsin Qara'na.
6. **Daftar Pendownload di Bagian Bawah**:
   - Menampilkan feed testimoni dan pesan motivasi belajar dari orang-orang yang sudah mendownload.

---

## 🖼️ Cara Mengganti Gambar Dummy Box dengan File Anda Sendiri

Ada dua cara mudah untuk mengganti gambar mockup produk:

### Cara 1 (Paling Cepat - Tanpa Ubah Kode):
1. Siapkan file gambar box atau mockup Anda dalam format PNG atau JPG.
2. Ganti nama filenya menjadi `tahsin-qarana-banner.png` (atau `tahsin-qarana-banner.jpg`).
3. Timpa (replace) file tersebut ke dalam folder:
   ```
   C:\Users\hp\.gemini\antigravity\scratch\quran-landing-page\assets\
   ```
4. Refresh browser, gambar Anda akan langsung terpasang!

### Cara 2 (Mengubah Nama File di `index.html`):
1. Letakkan gambar Anda di folder `assets/`, misalnya `assets/box-saya.png`.
2. Buka `index.html`, cari baris `<img id="product-box-image" src="assets/tahsin-qarana-banner.png" ...>`.
3. Ganti `src="assets/tahsin-qarana-banner.png"` menjadi `src="assets/box-saya.png"`.

---

## 🚀 Cara Menjalankan

Cukup klik dua kali (double-click) file `index.html` di File Explorer, atau jalankan menggunakan live server:
```bash
cd C:\Users\hp\.gemini\antigravity\scratch\quran-landing-page
python -m http.server 3000
```
Lalu buka: `http://localhost:3000` di browser Anda.
