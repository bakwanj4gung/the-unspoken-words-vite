import { PrismaClient } from '@prisma/client';
import { getLocation } from './geoLocation.js';

const prisma = new PrismaClient();

// ID = tahunbulantanggal_jammenitdetik_geolokasi_increment
// Contoh = 20250603_212050_jakarta_id_0001

export async function generateLetterId(ip) {
    // 1. Dapatkan geolocation
      const location = await getLocation(ip);

    // 2. Format tanggal (YYYYMMDD) dan waktu (HHMMSS)
    const now = new Date();
    const datePart = now.toISOString().replace(/[^0-9]/g, '').slice(0, 8); // YYYYMMDD
    const timePart = now.toISOString().replace(/[^0-9]/g, '').slice(8, 14); // HHMMSS
    // 3. Cari data terakhir dengan tanggal dan lokasi yang sama
    const lastLetter = await prisma.letter.findFirst({
        where: {
          id: {
            startsWith: `${datePart}_${location}`,
          },
        },
        orderBy: {
          id: 'desc',
        },
      });
      
      // 4. Hitung increment
      let increment = 1;
      if (lastLetter) {
        const lastIdParts = lastLetter.id.split('_');
        const lastIncrement = parseInt(lastIdParts[lastIdParts.length - 1]) || 0;
        increment = lastIncrement + 1;
      }
      
      // 5. Gabungkan ID
      return `${datePart}_${timePart}_${location}_${increment.toString().padStart(4, '0')}`;
}

/* testing */
// generateLetterId('8.8.8.8')
//     .then(id => {
//         console.log('ID yang dihasilkan:', id);
//         process.exit(0);
//     })
//     .catch(err => {
//         console.error('Error:', err);
//         process.exit(1);
//     });