import axios from 'axios';
import { createHash } from 'crypto';

const GEO_API_PROVIDERS = [
    {
        name: 'ipwho.is',
        url: ip => `https://ipwho.is/${ip}`,
        parser: data => {
            // Validasi response ipwho.is
            if (!data || data.success === false) {
                throw new Error(data.message || 'Invalid response from ipwho.is');
            }
            return {
                city: data.city,
                country_code: data.country_code
            };
        }
    },
    {
        name: 'ip-api.com',
        url: ip => `http://ip-api.com/json/${ip}?fields=status,city,countryCode`,
        parser: data => {
        // Validasi response ip-api.com
        if (data.status !== 'success') {
            throw new Error('Failed to get location from ip-api.com');
        }
        return {
            city: data.city,
            country_code: data.countryCode
        };
        }
    },
    {
        name: 'ipapi.co',
        url: ip => `https://ipapi.co/${ip}/json/`,
        parser: data => {
            // Validasi response ipapi.co
            if (data.error) {
                throw new Error(data.reason || 'ipapi.co error');
            }
            return {
                city: data.city,
                country_code: data.country_code
            };
        },
        headers: {
            'User-Agent': 'axios/1.6.7' // ipapi.co membutuhkan User-Agent
        }
    }
];

export async function getLocation(ip, retryCount = 0) {
    if (isPrivateIP(ip)) {
        return `local_${hashIP(ip)}`;
    }

    try {
        const provider = GEO_API_PROVIDERS[retryCount];
        if (!provider) return 'unknown';

        console.log(`Trying provider: ${provider.name}`);
        
        const config = {
            timeout: 2000,
            headers: provider.headers || {}
        };

        const response = await axios.get(provider.url(ip), config);
        const { city, country_code } = provider.parser(response.data);

        return city ? 
        `${cleanString(city)}_${cleanString(country_code)}` : 
        'unknown';

    } catch (error) {
        console.warn(`${GEO_API_PROVIDERS[retryCount]?.name} failed:`, error.message);
        
        // Coba provider berikutnya
        if (retryCount < GEO_API_PROVIDERS.length - 1) {
            return getLocation(ip, retryCount + 1);
        }
        
        return 'unknown';
    }
}

// Helper functions
function isPrivateIP(ip) {
    return /^(::f{4}:)?(10|127|172\.(1[6-9]|2[0-9]|3[01])|192\.168)\./.test(ip);
}

function hashIP(ip) {
    return createHash('sha256').update(ip).digest('hex').slice(0, 6);
}

function cleanString(str) {
    return str.toString()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_'); // Ganti karakter spesial dengan underscore
}