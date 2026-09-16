-- =======================================================
-- SKRIP DATABASE SUPABASE UNTUK LANDING PAGE AL-QUR'AN
-- Jalankan skrip ini di: Supabase Dashboard -> SQL Editor
-- =======================================================

-- 1. Buat Tabel Pendaftar
CREATE TABLE IF NOT EXISTS public.pendaftar_quran (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    nama TEXT NOT NULL,
    no_wa TEXT NOT NULL,
    tempat_lahir TEXT NOT NULL,
    tanggal_lahir DATE NOT NULL,
    pesan TEXT
);

-- 2. Aktifkan Row Level Security (RLS)
ALTER TABLE public.pendaftar_quran ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Izinkan siapa saja (anon) untuk menambahkan data (INSERT)
CREATE POLICY "Izinkan publik menambahkan pendaftar" 
ON public.pendaftar_quran 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 4. Policy: Izinkan siapa saja (anon) untuk membaca daftar pendownload (SELECT)
CREATE POLICY "Izinkan publik membaca daftar pendaftar" 
ON public.pendaftar_quran 
FOR SELECT 
TO anon, authenticated 
USING (true);

-- =======================================================
-- Contoh Data Awal (Opsional - Jalankan jika ingin data uji di Supabase)
-- =======================================================
INSERT INTO public.pendaftar_quran (nama, no_wa, tempat_lahir, tanggal_lahir, pesan)
VALUES 
('Muhammad Raihan', '081234567890', 'Bandung', '1995-04-12', 'Alhamdulillah aplikasinya sangat ringan dan tajwid warnanya sangat membantu.'),
('Siti Aisyah', '081398765432', 'Jakarta', '1998-08-25', 'Jazakallah khair, sangat berkah dibagikan gratis untuk umat.'),
('Ahmad Fauzan', '082155667788', 'Surabaya', '1992-11-03', 'Murottal 30 juz-nya sangat jernih. Semoga menjadi amal jariyah untuk developer.'),
('Fathimah Az-Zahra', '085711223344', 'Yogyakarta', '2000-01-17', 'Tampilannya adem dan nyaman sekali dibaca saat tilawah malam.'),
('Dimas Prasetyo', '087899001122', 'Semarang', '1994-06-30', 'Alhamdulillah terjemahan perkata mempermudah tadabbur Al-Quran.');
