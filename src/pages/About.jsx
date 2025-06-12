import React from 'react'
import Layout from '../components/Layout'

function About() {
    return (
        <Layout>
            <h1 className='satisfy text-5xl mx-auto w-fit mt-16'>The Unspoken Words</h1>
            <p className='text-sm text-center mt-5'>
                Write your letter, let your words work
            </p>
            <p className='my-5'>
                The Unspoken Words is a web application for sending anonymous messages that are displayed publicly. The application is designed as a free space for expression, a place for anyone who has feelings that have not been expressed, such as love, longing, forgiveness, disappointment, or support. All messages are sent anonymously, creating a space that is honest, spontaneous, and full of meaning.
            </p>
            <p className='my-5'>
                Masa pengembangan dimulai pada pertengahan bulan Mei 2025. Saat ini masih tahap finalisasi, dan akan segera diluncurkan pada pertengahan bulan Juni 2025.
            </p>
            <p className='my-5'>
                Diluncurkan sebagai aplikasi bebasis web agar bisa digunakan oleh semua perangkat tanpa batasan perangkat. Tidak pula ada batasan kalangan. Semua bisa menggunakan aplikasi ini.
            </p>
            <p className='my-5 whitespace-pre-wrap'>
                Instruksi penggunaan:
                <ol className='list-decimal list-inside'>
                    <li>Pastikan perangkat Anda terhubung ke internet.</li>
                    <li>Buka browser, lalu kunjungi: www.theunspokenwords.app (URL akan aktif saat peluncuran).</li>
                    <li>Pilih warna latar yang mencerminkan mood Anda:
                        <ul className='list-inside ms-4'>
                            <li>❤️ Merah (marah)</li>
                            <li>💙 Biru (tenang)</li>
                            <li>💛 Kuning (bahagia)</li>
                            <li>🖤 Abu-abu (sedih), dan lainnya.</li>
                        </ul>
                    </li>
                    <li>Masukkan nama atau inisial penerima (opsional).</li>
                    <li>Tulis isi pesan Anda.</li>
                    <li>Klik Kirim.</li>
                    <li>Pesan akan langsung tampil sebagai riwayat publik dan tersimpan selama maksimal 5 bulan.</li>
                </ol>
            </p>
        </Layout>
    )
}

export default About