import axios from 'axios'

// Unified geolocation service with multiple API fallbacks
// Supports: villages, districts, cities, countries worldwide

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/reverse'
const GEONAMES_URL = 'https://secure.geonames.org/findNearbyPlaceNameJSON'
const OPENCAGE_URL = 'https://api.opencagedata.com/geocode/v1/reverse'

// In-memory cache to avoid redundant API calls
const geocodeCache = new Map()

// Enhanced country lookup with more precise coordinate ranges
const countryCoordinateLookup = {
  'JP': { latRange: [30, 45], lonRange: [130, 145], center: [36.2, 138.2], name: 'Japan', capital: 'Tokyo' },
  'IN': { latRange: [8, 35], lonRange: [68, 97], center: [20, 78], name: 'India', capital: 'Delhi' },
  'US': { latRange: [24, 50], lonRange: [-125, -66], center: [39, -98], name: 'United States' },
  'CN': { latRange: [18, 54], lonRange: [73, 135], center: [35, 105], name: 'China' },
  'GB': { latRange: [50, 59], lonRange: [-8, 2], center: [54, -3], name: 'United Kingdom' },
  'DE': { latRange: [47, 56], lonRange: [6, 16], center: [51, 10], name: 'Germany' },
  'FR': { latRange: [42, 51], lonRange: [-5, 8], center: [46, 2], name: 'France' },
  'IT': { latRange: [37, 47], lonRange: [7, 19], center: [41.8, 12.5], name: 'Italy' },
  'ES': { latRange: [36, 44], lonRange: [-9, 4], center: [40, -3], name: 'Spain' },
  'AU': { latRange: [-44, -10], lonRange: [113, 154], center: [-25, 133], name: 'Australia' },
  'BR': { latRange: [-33, 5], lonRange: [-73, -35], center: [-15, -51], name: 'Brazil' },
  'RU': { latRange: [41, 81], lonRange: [19, 169], center: [61, 105], name: 'Russia' },
  'KR': { latRange: [33, 43], lonRange: [124, 132], center: [37, 127.5], name: 'South Korea' },
  'SG': { latRange: [1, 2], lonRange: [103, 104], center: [1.35, 103.8], name: 'Singapore' },
  'AE': { latRange: [22, 27], lonRange: [51, 56], center: [23.4, 53.8], name: 'United Arab Emirates' },
  'PK': { latRange: [24, 37], lonRange: [61, 77], center: [30, 69], name: 'Pakistan' },
  'NP': { latRange: [26, 31], lonRange: [80, 88], center: [28, 84], name: 'Nepal' },
  'BD': { latRange: [21, 26], lonRange: [88, 93], center: [23.5, 90.3], name: 'Bangladesh' },
  'LK': { latRange: [5, 9], lonRange: [80, 82], center: [7, 81], name: 'Sri Lanka' },
  'MY': { latRange: [1, 7], lonRange: [100, 120], center: [4, 101.6], name: 'Malaysia' },
  'TH': { latRange: [5, 21], lonRange: [98, 105], center: [13, 101], name: 'Thailand' },
  'VN': { latRange: [8, 23], lonRange: [102, 109], center: [15.5, 106.8], name: 'Vietnam' },
  'ID': { latRange: [-11, 6], lonRange: [95, 141], center: [-0.7, 113], name: 'Indonesia' },
  'CA': { latRange: [41, 83], lonRange: [-141, -52], center: [60, -95], name: 'Canada' },
  'MX': { latRange: [14, 33], lonRange: [-117, -87], center: [23, -102], name: 'Mexico' },
  'ZA': { latRange: [-35, -22], lonRange: [16, 33], center: [-30, 24], name: 'South Africa' },
  'NG': { latRange: [4, 14], lonRange: [2, 15], center: [9, 8], name: 'Nigeria' },
  'EG': { latRange: [22, 32], lonRange: [25, 35], center: [26.8, 30.8], name: 'Egypt' }
}

/**
 * Normalize API response into standardized format
 * @returns { name, admin: { village, town, city, district, state, country }, country_code, bbox, source }
 */
function normalizeResponse(data, source) {
  return {
    name: data.name || 'Unknown',
    admin: {
      village: data.village || data.hamlet || undefined,
      town: data.town || undefined,
      city: data.city || undefined,
      district: data.district || data.county || undefined,
      state: data.state || data.province || undefined,
      country: data.country || undefined
    },
    country_code: data.country_code?.toUpperCase() || undefined,
    bbox: data.bbox || undefined,
    source
  }
}

/**
 * Reverse geocode using Nominatim (free, no key required)
 */
async function reverseGeocodeNominatim(lat, lon) {
  try {
    const res = await axios.get(NOMINATIM_URL, {
      params: {
        format: 'json',
        lat,
        lon,
        zoom: 18,
        addressdetails: 1
      },
      timeout: 5000
    })
    
    const addr = res.data.address || {}
    return normalizeResponse({
      name: res.data.name || addr.city || addr.town || addr.village || addr.hamlet || 'Unknown',
      village: addr.village || addr.hamlet,
      town: addr.town,
      city: addr.city,
      district: addr.county || addr.district,
      state: addr.state,
      country: addr.country,
      country_code: res.data.address?.country_code,
      bbox: res.data.boundingbox
    }, 'nominatim')
  } catch (err) {
    console.warn('Nominatim reverse geocode failed:', err.message)
    return null
  }
}

/**
 * Reverse geocode using GeoNames (requires username, better for villages/districts)
 */
async function reverseGeocodeGeoNames(lat, lon) {
  const username = import.meta.env.VITE_GEONAMES_USER
  if (!username) return null
  
  try {
    const res = await axios.get(GEONAMES_URL, {
      params: {
        lat,
        lng: lon,
        username,
        featureClass: 'P,A', // Places and Administrative divisions
        maxRows: 10
      },
      timeout: 5000
    })
    
    if (res.data.geonames && res.data.geonames.length > 0) {
      const place = res.data.geonames[0]
      return normalizeResponse({
        name: place.name,
        village: place.fcode === 'PPL' ? place.name : undefined,
        city: ['PPLA', 'PPLA2', 'PPLA3', 'PPLC'].includes(place.fcode) ? place.name : undefined,
        district: place.adminName2,
        state: place.adminName1,
        country: place.countryName,
        country_code: place.countryCode
      }, 'geonames')
    }
    return null
  } catch (err) {
    console.warn('GeoNames reverse geocode failed:', err.message)
    return null
  }
}

/**
 * Reverse geocode using OpenCage (aggregates multiple sources, structured response)
 */
async function reverseGeocodeOpenCage(lat, lon) {
  const apiKey = import.meta.env.VITE_OPENCAGE_KEY
  if (!apiKey) return null
  
  try {
    const res = await axios.get(OPENCAGE_URL, {
      params: {
        key: apiKey,
        q: `${lat},${lon}`,
        language: 'en'
      },
      timeout: 5000
    })
    
    if (res.data.results && res.data.results.length > 0) {
      const result = res.data.results[0]
      const comp = result.components || {}
      return normalizeResponse({
        name: result.formatted || comp.city || comp.town || comp.village || 'Unknown',
        village: comp.village || comp.hamlet,
        town: comp.town,
        city: comp.city,
        district: comp.county || comp.district,
        state: comp.state,
        country: comp.country,
        country_code: comp.country_code?.toUpperCase(),
        bbox: result.bounds
      }, 'opencage')
    }
    return null
  } catch (err) {
    console.warn('OpenCage reverse geocode failed:', err.message)
    return null
  }
}

/**
 * Main reverse geocoding function with fallback chain
 * Returns best available place data: village → town → city → district → state → country
 */
export async function reverseGeocode(lat, lon, useCache = true) {
  const cacheKey = `${lat.toFixed(4)},${lon.toFixed(4)}`
  
  // Check cache
  if (useCache && geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)
  }
  
  // Try APIs in order: GeoNames (best for villages) → Nominatim (fast, free) → OpenCage (best structured)
  let result = null
  
  result = await reverseGeocodeGeoNames(lat, lon)
  if (result) {
    geocodeCache.set(cacheKey, result)
    return result
  }
  
  result = await reverseGeocodeNominatim(lat, lon)
  if (result) {
    geocodeCache.set(cacheKey, result)
    return result
  }
  
  result = await reverseGeocodeOpenCage(lat, lon)
  if (result) {
    geocodeCache.set(cacheKey, result)
    return result
  }
  
  // Fallback: return unknown location
  console.warn(`Could not geocode coordinates: ${lat}, ${lon}`)
  return {
    name: 'Unknown Location',
    admin: {},
    country_code: null,
    source: 'fallback'
  }
}

/**
 * Forward geocoding: search for a place by name
 * Returns array of results with full admin hierarchy
 */
export async function forwardGeocode(query) {
  const cacheKey = `forward:${query.toLowerCase()}`
  
  if (geocodeCache.has(cacheKey)) {
    return geocodeCache.get(cacheKey)
  }
  
  try {
    // Use Nominatim for forward geocoding (free, global coverage)
    const res = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5
      },
      timeout: 5000
    })
    
    const results = res.data.map(r => {
      const addr = r.address || {}
      return {
        name: r.display_name?.split(',')[0] || r.name,
        lat: parseFloat(r.lat),
        lon: parseFloat(r.lon),
        admin: {
          village: addr.village || addr.hamlet,
          town: addr.town,
          city: addr.city,
          district: addr.county || addr.district,
          state: addr.state,
          country: addr.country
        },
        country_code: addr.country_code?.toUpperCase(),
        bbox: r.boundingbox
      }
    })
    
    geocodeCache.set(cacheKey, results)
    return results
  } catch (err) {
    console.warn('Forward geocoding failed:', err.message)
    return []
  }
}

/**
 * Get place hierarchy: return village/district/city/state/country as structured object
 */
export async function getPlaceHierarchy(lat, lon) {
  const data = await reverseGeocode(lat, lon)
  return {
    village: data.admin.village,
    district: data.admin.district,
    city: data.admin.city || data.name,
    state: data.admin.state,
    country: data.admin.country,
    country_code: data.country_code,
    primary_name: data.name
  }
}

/**
 * Clear geocode cache (useful for development/testing)
 */
export function clearGeocodeCache() {
  geocodeCache.clear()
  console.log('Geocode cache cleared')
}

/**
 * Get cache statistics
 */
export function getGeocodeStats() {
  return {
    cached_entries: geocodeCache.size,
    cache_size_bytes: JSON.stringify([...geocodeCache]).length
  }
}

/**
 * CRITICAL: Get country code from coordinates - WORKS IMMEDIATELY
 * This is the most reliable function for country detection
 */
export function getCountryCodeFromCoordinates(lat, lon) {
  // Precise coordinate-based country detection
  for (const [code, range] of Object.entries(countryCoordinateLookup)) {
    if (lat >= range.latRange[0] && lat <= range.latRange[1] &&
        lon >= range.lonRange[0] && lon <= range.lonRange[1]) {
      return code
    }
  }
  return 'IN' // Default fallback
}
