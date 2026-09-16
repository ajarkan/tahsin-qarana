// =======================================================
// LOGIKA APLIKASI LANDING PAGE BELAJAR AL-QUR'AN: TAHSIN QARA'NA
// (MENDUKUNG MODE TERANG & GELAP)
// =======================================================

// State aplikasi
let activeDownloaders = [];
let popupQueueIndex = 0;
let popupIntervalTimer = null;
let popupDismissTimeout = null;

// DOM Elements
const quranForm = document.getElementById("quran-download-form");
const submitBtn = document.getElementById("btn-submit-download");
const submitBtnText = document.getElementById("btn-submit-text");
const submitBtnSpinner = document.getElementById("btn-submit-spinner");
const downloadersGrid = document.getElementById("downloaders-grid");
const totalDownloadsCount = document.getElementById("total-downloads-count");
const paginationContainer = document.getElementById("downloaders-pagination");
const ITEMS_PER_PAGE = 6;
let currentDownloadersPage = 1;
const popupToast = document.getElementById("social-proof-toast");
const popupName = document.getElementById("popup-name");
const popupCity = document.getElementById("popup-city");
const popupTime = document.getElementById("popup-time");
const popupAvatar = document.getElementById("popup-avatar");
const supabaseStatusBadge = document.getElementById("supabase-status-badge");

// Inisialisasi saat dokumen siap
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  setupSupabaseStatusBadge();
  initDownloadersData();
  setupFormHandler();
  startSocialProofLoop();
});

// =======================================================
// 0. PENGATURAN MODE TERANG / GELAP (LIGHT & DARK MODE)
// =======================================================
function initTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (savedTheme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    // Default ke Mode Terang yang bersih dan segar
    document.documentElement.classList.remove("dark");
  }
  updateThemeUI();
}

window.toggleTheme = function() {
  const isDark = document.documentElement.classList.toggle("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeUI();
};

function updateThemeUI() {
  const isDark = document.documentElement.classList.contains("dark");
  const iconSun = document.getElementById("theme-icon-sun");
  const iconMoon = document.getElementById("theme-icon-moon");
  const themeText = document.getElementById("theme-text");

  if (iconSun && iconMoon) {
    if (isDark) {
      iconSun.classList.remove("hidden");
      iconMoon.classList.add("hidden");
      if (themeText) themeText.textContent = "Mode Terang";
    } else {
      iconSun.classList.add("hidden");
      iconMoon.classList.remove("hidden");
      if (themeText) themeText.textContent = "Mode Gelap";
    }
  }
}

// 1. Tampilkan status koneksi Supabase di footer
function setupSupabaseStatusBadge() {
  if (!supabaseStatusBadge) return;
  const isConfigured = window.isSupabaseConfigured && window.isSupabaseConfigured();
  if (isConfigured) {
    supabaseStatusBadge.innerHTML = `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
        <span class="w-2 h-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse"></span>
        Supabase Terhubung
      </span>
    `;
  } else {
    supabaseStatusBadge.innerHTML = `
      <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20" title="Isi credentials di supabase-config.js untuk live sync">
        <span class="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400"></span>
        Mode Demo / Supabase Belum Terisi
      </span>
    `;
  }
}

// 2. Mengambil data pendownload (dari Supabase / LocalStorage / Dummy)
async function initDownloadersData() {
  const dummy = window.DUMMY_DOWNLOADERS || [];
  const localSaved = JSON.parse(localStorage.getItem("local_pendaftar_quran") || "[]");

  activeDownloaders = [...localSaved, ...dummy];

  const client = window.getSupabaseClient ? window.getSupabaseClient() : null;
  if (client) {
    try {
      const { data, error } = await client
        .from(window.SUPABASE_CONFIG.tableName)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);

      if (!error && data && data.length > 0) {
        activeDownloaders = [...data, ...dummy];
      }
    } catch (err) {
      console.warn("Gagal mengambil data dari Supabase, menggunakan data lokal/dummy:", err);
    }
  }

  renderDownloadersPage(1, false);
  updateCounterDisplay(activeDownloaders.length + 1840);
}

// 3. Render grid testimoni / pendownload (Paginasi maksimal 6 data per halaman)
function renderDownloadersPage(page = 1, shouldScroll = false) {
  if (!downloadersGrid) return;

  const totalItems = activeDownloaders.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  if (page < 1) page = 1;
  if (page > totalPages) page = totalPages;
  currentDownloadersPage = page;

  const startIndex = (currentDownloadersPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const itemsToShow = activeDownloaders.slice(startIndex, endIndex);

  downloadersGrid.innerHTML = "";
  itemsToShow.forEach((item, index) => {
    const card = createDownloaderCard(item, startIndex + index);
    downloadersGrid.appendChild(card);
  });

  renderPaginationControls(totalPages, currentDownloadersPage, startIndex, endIndex, totalItems);

  if (shouldScroll) {
    const sectionEl = document.getElementById("daftar-pendownload");
    if (sectionEl) {
      sectionEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

// Fungsi navigasi halaman global (bisa dipanggil dari tombol pagination)
window.goToDownloadersPage = function(page, shouldScroll = true) {
  renderDownloadersPage(page, shouldScroll);
};

// Render tombol dan indikator paginasi (Responsif Desktop & HP)
function renderPaginationControls(totalPages, currentPage, startIndex, endIndex, totalItems) {
  if (!paginationContainer) return;

  if (totalPages <= 1) {
    paginationContainer.innerHTML = `
      <div class="text-xs text-slate-500 dark:text-slate-400">
        Menampilkan semua <strong class="font-bold text-slate-800 dark:text-slate-200">${totalItems}</strong> sahabat
      </div>
    `;
    return;
  }

  // Teks info rentang data yang ditampilkan
  const infoText = `
    <div class="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
      Menampilkan <span class="font-bold text-emerald-600 dark:text-emerald-400">${startIndex + 1}–${endIndex}</span> dari <span class="font-bold text-slate-900 dark:text-slate-100">${totalItems}</span> sahabat
    </div>
  `;

  // Tombol navigasi Sebelumnya
  const isFirstPage = currentPage === 1;
  const prevButton = `
    <button type="button" 
            onclick="goToDownloadersPage(${currentPage - 1}, true)"
            ${isFirstPage ? "disabled" : ""}
            class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isFirstPage 
                ? "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60 border border-slate-200 dark:border-slate-800" 
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer active:scale-95"
            }">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
      </svg>
      <span class="hidden sm:inline">Sebelumnya</span>
    </button>
  `;

  // Tombol navigasi Berikutnya
  const isLastPage = currentPage === totalPages;
  const nextButton = `
    <button type="button" 
            onclick="goToDownloadersPage(${currentPage + 1}, true)"
            ${isLastPage ? "disabled" : ""}
            class="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              isLastPage 
                ? "bg-slate-100 dark:bg-slate-800/60 text-slate-400 dark:text-slate-600 cursor-not-allowed opacity-60 border border-slate-200 dark:border-slate-800" 
                : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm cursor-pointer active:scale-95"
            }">
      <span class="hidden sm:inline">Berikutnya</span>
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
      </svg>
    </button>
  `;

  // Tombol nomor halaman
  let pageButtons = "";
  for (let p = 1; p <= totalPages; p++) {
    const isActive = p === currentPage;
    if (isActive) {
      pageButtons += `
        <button type="button" 
                aria-current="page"
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 text-slate-950 font-black text-xs sm:text-sm shadow-md shadow-emerald-500/25 ring-2 ring-emerald-400 transition-all flex items-center justify-center">
          ${p}
        </button>
      `;
    } else {
      pageButtons += `
        <button type="button" 
                onclick="goToDownloadersPage(${p}, true)"
                class="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 font-bold text-xs sm:text-sm transition-all shadow-sm cursor-pointer flex items-center justify-center active:scale-95">
          ${p}
        </button>
      `;
    }
  }

  paginationContainer.innerHTML = `
    ${infoText}
    <div class="flex items-center gap-1.5 sm:gap-2">
      ${prevButton}
      <div class="flex items-center gap-1 sm:gap-1.5">
        ${pageButtons}
      </div>
      ${nextButton}
    </div>
  `;
}

function createDownloaderCard(item, index) {
  const card = document.createElement("div");
  card.className = "bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-emerald-500/20 hover:border-emerald-500 dark:hover:border-emerald-400 transition-all duration-300 rounded-2xl p-5 shadow-md dark:shadow-lg shadow-emerald-950/5 dark:shadow-emerald-950/20 flex flex-col justify-between group hover:-translate-y-1";

  const initials = getInitials(item.nama || "Hamba Allah");
  const namaMasked = maskName(item.nama || "Hamba Allah");
  const kota = item.tempat_lahir || "Indonesia";
  const pesanTeks = item.pesan && item.pesan.trim() !== "" 
    ? item.pesan 
    : "Alhamdulillah sangat terbantu belajar Al-Quran dengan Tahsin Qara'na.";
  const relativeTime = item.waktu_relatif || formatRelativeTime(item.created_at);

  const avatarGradients = [
    "from-emerald-500 to-teal-700",
    "from-teal-500 to-cyan-700",
    "from-emerald-600 to-green-800",
    "from-amber-500 to-emerald-700",
    "from-cyan-600 to-blue-800"
  ];
  const gradient = avatarGradients[index % avatarGradients.length];

  card.innerHTML = `
    <div>
      <div class="flex items-center justify-between mb-3.5">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 rounded-full bg-gradient-to-tr ${gradient} flex items-center justify-center font-bold text-white shadow-md text-sm ring-2 ring-emerald-400/30">
            ${initials}
          </div>
          <div>
            <h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
              ${namaMasked}
            </h4>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
              <svg class="w-3 h-3 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              ${kota}
            </p>
          </div>
        </div>
        <span class="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
          ${relativeTime}
        </span>
      </div>

      <div class="relative">
        <svg class="w-6 h-6 text-emerald-500/20 absolute -top-2 -left-1 transform -scale-x-100" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
        </svg>
        <p class="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pl-5 italic">
          "${pesanTeks}"
        </p>
      </div>
    </div>

    <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
      <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
        <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
        </svg>
        Belajar Tahsin Qara'na
      </span>
      <span class="text-slate-400 text-[11px]">Aplikasi Gratis</span>
    </div>
  `;
  return card;
}

// 4. Form Submit Handler
function setupFormHandler() {
  if (!quranForm) return;

  quranForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const namaInput = document.getElementById("input-nama");
    const noWaInput = document.getElementById("input-no-wa");
    const tempatLahirInput = document.getElementById("input-tempat-lahir");
    const tanggalLahirInput = document.getElementById("input-tanggal-lahir");
    const pesanInput = document.getElementById("input-pesan");

    const nama = namaInput ? namaInput.value.trim() : "";
    const rawWa = noWaInput ? noWaInput.value.trim() : "";
    const tempatLahir = tempatLahirInput ? tempatLahirInput.value.trim() : "";
    const tanggalLahir = tanggalLahirInput ? tanggalLahirInput.value : "";
    const pesan = pesanInput ? pesanInput.value.trim() : "";

    // Validasi Sisi Klien (Nama, No WA, Tempat Lahir, Tanggal Lahir required)
    if (!nama) {
      highlightError(namaInput, "Nama lengkap wajib diisi!");
      return;
    }
    if (!rawWa) {
      highlightError(noWaInput, "Nomor WhatsApp wajib diisi!");
      return;
    }
    if (!tempatLahir) {
      highlightError(tempatLahirInput, "Tempat lahir wajib diisi!");
      return;
    }
    if (!tanggalLahir) {
      highlightError(tanggalLahirInput, "Tanggal lahir wajib dipilih pada kalender!");
      return;
    }

    const cleanWa = formatIndonesianPhone(rawWa);
    if (cleanWa.length < 9) {
      highlightError(noWaInput, "Format nomor WhatsApp tidak valid!");
      return;
    }

    setButtonLoading(true);

    const newEntry = {
      nama: nama,
      no_wa: cleanWa,
      tempat_lahir: tempatLahir,
      tanggal_lahir: tanggalLahir,
      pesan: pesan || "Bismillah, ingin belajar Al-Qur'an dari nol sampai lancar.",
      created_at: new Date().toISOString()
    };

    // A. Simpan ke Supabase jika terkonfigurasi
    const client = window.getSupabaseClient ? window.getSupabaseClient() : null;
    if (client) {
      try {
        const { data, error } = await client
          .from(window.SUPABASE_CONFIG.tableName)
          .insert([
            {
              nama: newEntry.nama,
              no_wa: newEntry.no_wa,
              tempat_lahir: newEntry.tempat_lahir,
              tanggal_lahir: newEntry.tanggal_lahir,
              pesan: newEntry.pesan
            }
          ]);

        if (error) {
          console.error("Gagal simpan ke Supabase:", error.message);
        } else {
          console.log("✅ Data berhasil tersimpan ke tabel Supabase!");
        }
      } catch (err) {
        console.error("Error koneksi Supabase:", err);
      }
    }

    // B. Simpan ke LocalStorage sebagai backup
    try {
      const localSaved = JSON.parse(localStorage.getItem("local_pendaftar_quran") || "[]");
      localSaved.unshift(newEntry);
      localStorage.setItem("local_pendaftar_quran", JSON.stringify(localSaved.slice(0, 50)));
    } catch (e) {
      console.warn("Gagal simpan ke localStorage", e);
    }

    // C. Tambahkan langsung ke daftar downloaders aktif di tampilan (masuk ke halaman 1)
    activeDownloaders.unshift(newEntry);
    renderDownloadersPage(1, false);

    // D. Munculkan langsung pop-up notifikasi untuk pendaftar ini!
    showSocialProofItem(newEntry, true);

    // E. Siapkan pesan WhatsApp terformat rapi khusus Tahsin Qara'na
    const waAdmin = window.WA_ADMIN_NUMBER || "6282116807451";
    const waText = buildWhatsAppMessage(newEntry);
    const waUrl = `https://wa.me/${waAdmin}?text=${encodeURIComponent(waText)}`;

    setButtonLoading(false);
    quranForm.reset();

    showCustomAlert("Pendaftaran Berhasil! Mengalihkan ke WhatsApp Anda...");

    setTimeout(() => {
      window.location.href = waUrl;
    }, 1200);
  });
}

// 5. Template Pesan WhatsApp
function buildWhatsAppMessage(data) {
  const tglIndo = formatIndonesianDate(data.tanggal_lahir);
  return `Assalamu'alaikum Warahmatullahi Wabarakatuh,

Halo Admin, saya ingin mendapatkan link download Aplikasi Belajar Al-Qur'an: *TAHSIN QARA'NA (Dari Nol Sampai Lancar)* Gratis.

Berikut data pendaftaran saya:
👤 *Nama Lengkap:* ${data.nama}
📱 *No. WhatsApp:* ${data.no_wa}
📍 *Tempat Lahir:* ${data.tempat_lahir}
📅 *Tanggal Lahir:* ${tglIndo}
💬 *Pesan/Motivasi Belajar:* ${data.pesan}

Mohon bantuannya untuk dikirimkan link download aplikasinya ya min. 
Terima kasih! Jazakumullahu khairan katsiran.`;
}

// 6. Floating Pop-up Social Proof (Pojok Kanan Atas)
function startSocialProofLoop() {
  if (popupIntervalTimer) clearInterval(popupIntervalTimer);

  popupIntervalTimer = setInterval(() => {
    if (!activeDownloaders || activeDownloaders.length === 0) return;

    const item = activeDownloaders[popupQueueIndex % activeDownloaders.length];
    popupQueueIndex++;

    showSocialProofItem(item, false);
  }, 7500);

  setTimeout(() => {
    if (activeDownloaders && activeDownloaders.length > 0) {
      showSocialProofItem(activeDownloaders[0], false);
      popupQueueIndex = 1;
    }
  }, 2000);
}

function showSocialProofItem(item, isImmediateNew) {
  if (!popupToast) return;

  if (popupDismissTimeout) clearTimeout(popupDismissTimeout);

  const nama = item.nama ? maskName(item.nama) : "Sahabat Qur'an";
  const kota = item.tempat_lahir || "Indonesia";
  const initials = getInitials(item.nama || "TQ");
  const timeText = isImmediateNew ? "Baru saja!" : (item.waktu_relatif || "Baru saja");

  if (popupName) popupName.textContent = nama;
  if (popupCity) popupCity.textContent = kota;
  if (popupTime) popupTime.textContent = timeText;
  if (popupAvatar) popupAvatar.textContent = initials;

  popupToast.classList.remove("translate-x-full", "opacity-0", "pointer-events-none");
  popupToast.classList.add("translate-x-0", "opacity-100");

  popupDismissTimeout = setTimeout(() => {
    popupToast.classList.remove("translate-x-0", "opacity-100");
    popupToast.classList.add("translate-x-full", "opacity-0", "pointer-events-none");
  }, 3500);
}

window.closeSocialProofToast = function() {
  if (!popupToast) return;
  if (popupDismissTimeout) clearTimeout(popupDismissTimeout);
  popupToast.classList.remove("translate-x-0", "opacity-100");
  popupToast.classList.add("translate-x-full", "opacity-0", "pointer-events-none");
};

// 7. Helper Utilities
function getInitials(name) {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function maskName(name) {
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return `${parts[0]} ${parts[1][0]}.`;
  return `${parts[0]} ${parts[1][0]}. ${parts[parts.length - 1]}`;
}

function formatIndonesianPhone(phone) {
  let cleaned = phone.replace(/\D/g, "");
  if (cleaned.startsWith("0")) {
    cleaned = "62" + cleaned.slice(1);
  } else if (cleaned.startsWith("8")) {
    cleaned = "62" + cleaned;
  }
  return cleaned;
}

function formatIndonesianDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch (e) {
    return dateStr;
  }
}

function formatRelativeTime(dateStr) {
  if (!dateStr) return "Baru saja";
  try {
    const past = new Date(dateStr).getTime();
    const now = Date.now();
    const diffMin = Math.floor((now - past) / (1000 * 60));
    if (diffMin < 1) return "Baru saja";
    if (diffMin < 60) return `${diffMin} menit lalu`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return `${Math.floor(diffHours / 24)} hari lalu`;
  } catch (e) {
    return "Hari ini";
  }
}

function updateCounterDisplay(num) {
  if (!totalDownloadsCount) return;
  totalDownloadsCount.textContent = num.toLocaleString("id-ID");
}

function setButtonLoading(isLoading) {
  if (!submitBtn) return;
  submitBtn.disabled = isLoading;
  if (isLoading) {
    if (submitBtnText) submitBtnText.textContent = "Menyimpan & Mengalihkan ke WhatsApp...";
    if (submitBtnSpinner) submitBtnSpinner.classList.remove("hidden");
    submitBtn.classList.add("opacity-80", "cursor-not-allowed");
  } else {
    if (submitBtnText) submitBtnText.textContent = "Dapatkan Aplikasi Belajar Gratis via WA";
    if (submitBtnSpinner) submitBtnSpinner.classList.add("hidden");
    submitBtn.classList.remove("opacity-80", "cursor-not-allowed");
  }
}

function highlightError(element, message) {
  if (!element) return;
  element.focus();
  element.classList.add("border-red-500", "ring-2", "ring-red-500/50");
  showCustomAlert(message, true);
  setTimeout(() => {
    element.classList.remove("border-red-500", "ring-2", "ring-red-500/50");
  }, 3000);
}

function showCustomAlert(message, isError = false) {
  const alertEl = document.getElementById("action-banner-alert");
  if (!alertEl) {
    alert(message);
    return;
  }

  alertEl.textContent = message;
  alertEl.className = isError 
    ? "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold text-white bg-red-600 border border-red-400 transition-all duration-300 opacity-100 translate-y-0"
    : "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold text-white bg-emerald-600 border border-emerald-400 transition-all duration-300 opacity-100 translate-y-0";

  setTimeout(() => {
    alertEl.className = "fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-2xl text-sm font-semibold text-white opacity-0 translate-y-5 pointer-events-none transition-all duration-300";
  }, 2800);
}
