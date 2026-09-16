// =======================================================
// KONFIGURASI SUPABASE
// =======================================================
// Cara mendapatkan Project URL & Anon Key:
// 1. Masuk ke https://supabase.com/dashboard
// 2. Pilih project Anda
// 3. Masuk ke menu 'Project Settings' (ikon gear di kiri bawah) -> 'API'
// 4. Salin 'Project URL' dan 'anon' public key ke dalam objek di bawah ini.
//
// CATATAN:
// Jika belum diisi, landing page tetap berfungsi secara mulus
// dengan data lokal dan simulasi pengiriman data.
// =======================================================

const SUPABASE_CONFIG = {
  // Project URL Supabase Anda
  url: "https://muknznyopiijbkcjbjrd.supabase.co",

  // Anon/public API Key Supabase Anda
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im11a256bnlvcGlpamJrY2pianJkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk1MjkwMDMsImV4cCI6MjEwNTEwNTAwM30.43S9ITdzODLFJ6lDCFY6-cMwl-pDZymHczOjeB7qqDc",

  // Nama tabel yang digunakan di Supabase
  tableName: "pendaftar_quran"
};

// Nomor WhatsApp Admin Tujuan Pengiriman Pesan
const WA_ADMIN_NUMBER = "6282116807451";

// Cek apakah Supabase sudah dikonfigurasi
function isSupabaseConfigured() {
  return (
    typeof SUPABASE_CONFIG.url === "string" &&
    SUPABASE_CONFIG.url.startsWith("https://") &&
    !SUPABASE_CONFIG.url.includes("abcdefghijklm") &&
    typeof SUPABASE_CONFIG.anonKey === "string" &&
    SUPABASE_CONFIG.anonKey.length > 20
  );
}

// Inisialisasi Supabase Client jika kredensial sudah ada
let supabaseClient = null;
try {
  if (isSupabaseConfigured() && window.supabase) {
    supabaseClient = window.supabase.createClient(
      SUPABASE_CONFIG.url,
      SUPABASE_CONFIG.anonKey
    );
    console.log("✅ Supabase terhubung dengan sukses!");
  } else {
    console.info("ℹ️ Supabase belum dikonfigurasi. Menjalankan mode demo / local fallback.");
  }
} catch (err) {
  console.warn("⚠️ Gagal inisialisasi Supabase client:", err);
}

window.SUPABASE_CONFIG = SUPABASE_CONFIG;
window.WA_ADMIN_NUMBER = WA_ADMIN_NUMBER;
window.isSupabaseConfigured = isSupabaseConfigured;
window.getSupabaseClient = () => supabaseClient;
