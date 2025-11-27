// src/utils/geoUtils.js

/**
 * Converte graus para radianos.
 * @param {number} deg - Ângulo em graus.
 * @returns {number} Ângulo em radianos.
 */
const toRad = deg => deg * (Math.PI / 180);

/**
 * Calcula a distância em metros entre duas coordenadas usando a fórmula de Haversine.
 * @param {number} lat1 - Latitude do ponto 1.
 * @param {number} lon1 - Longitude do ponto 1.
 * @param {number} lat2 - Latitude do ponto 2.
 * @param {number} lon2 - Longitude do ponto 2.
 * @returns {number} Distância em metros.
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  // Raio médio da Terra em metros
  const R = 6371000;

  // Converte latitudes e longitudes para radianos
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const radLat1 = toRad(lat1);
  const radLat2 = toRad(lat2);

  // Fórmula de Haversine
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(radLat1) * Math.cos(radLat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distância em metros
  const distance = R * c;

  return distance;
};
