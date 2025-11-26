import fs from "fs/promises";
import xml2js from "xml2js";
import toGeoJSON from "@mapbox/togeojson";
import * as turf from "@turf/turf";
import { DOMParser } from "xmldom";

/**
 * Calcula a distância total em quilômetros de um arquivo GPX ou KML.
 * * @param {string} filePath - Caminho do arquivo temporário salvo pelo Multer.
 * @returns {Promise<number>} - Distância em quilômetros (com 2 casas decimais), ou 0 em caso de erro.
 */
export async function calculateDistance(filePath) {
  if (!filePath) return 0;

  // Tenta determinar a extensão, se existir
  const fileExtension = filePath.split(".").pop().toLowerCase();

  try {
    // Leitura do arquivo (conteúdo XML)
    const xmlContent = await fs.readFile(filePath, "utf8");

    // Cria Objeto DOM real para toGeoJSON
    // Usamos DOMParser diretamente na string XML:
    const dom = new DOMParser().parseFromString(xmlContent);

    // Conversão para GeoJSON
    let geojson;
    // Se a extensão estiver no caminho do arquivo (configuração do Multer com filename)
    if (fileExtension === "gpx" || fileExtension.includes("gpx")) {
      // Passa o DOM completo para o parser
      geojson = toGeoJSON.gpx(dom);
    } else if (fileExtension === "kml" || fileExtension.includes("kml")) {
      geojson = toGeoJSON.kml(dom);
    } else {
      console.warn(
        `⚠️ Tipo de arquivo não suportado para cálculo de distância: ${filePath}`
      );
      return 0;
    }

    // Cálcula da Distância (turf.length usa Haversine internamente)
    if (geojson.features && geojson.features.length > 0) {
      const distanceInKm = turf.length(geojson.features[0], {
        units: "kilometers",
      });
      return parseFloat(distanceInKm.toFixed(2));
    }

    return 0;
  } catch (error) {
    console.error(
      "❌ Erro ao processar arquivo GPX/KML para cálculo:",
      error.message
    );
    return 0;
  }
}
