import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';
import { calculateDistance } from '../utils/geoUtils';

/**
 * Componente que exibe o mapa da trilha e extrai os dados de elevação do GPX.
 * @param {string} gpxUrl - URL do arquivo GPX.
 * @param {function} onDataExtracted - Callback para retornar os dados de elevação.
 */
export default function TrailMap({ gpxUrl, onDataExtracted }) {
  const mapRef = useRef(null);
  const leafletMapRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = mapRef.current;
    if (!container) return;

    // Limpeza da instância
    if (leafletMapRef.current) {
      try {
        leafletMapRef.current.remove();
      } catch (error) {
        console.error('Erro benigno ao tentar remover o mapa Leaflet:', error);
      }
      leafletMapRef.current = null;
    }

    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    setLoading(true);

    const initTimeout = setTimeout(() => {
      try {
        const map = L.map(container);
        leafletMapRef.current = map;

        // ============================
        // CAMADAS DO MAPA
        // ============================
        const baseMaps = {
          Padrão: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png'),
          Satélite: L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          ),
        };

        baseMaps['Padrão'].addTo(map);
        L.control.layers(baseMaps).addTo(map);

        // ============================
        // GPX
        // ============================
        const gpx = new L.GPX(gpxUrl, {
          async: true,
          trackdistance: true, // é útil para o tooltip do mapa
          marker_options: {
            startIconUrl: null,
            endIconUrl: null,
            shadowUrl: null,
          },
          polyline_options: {
            color: '#22c55e',
            opacity: 0.8,
            weight: 5,
            lineCap: 'round',
          },
        });

        gpx.on('loaded', e => {
          map.fitBounds(e.target.getBounds());
          setLoading(false);
        });

        // Extrai os dados de elevação e chama o callback
        gpx.on('addline', e => {
          const coords = e.line._latlngs;

          let accumulatedDistanceMeters = 0;
          let prevLat = coords[0]?.lat;
          let prevLon = coords[0]?.lng;

          const extracted = coords.map((pt, index) => {
            const currentLat = pt.lat;
            const currentLon = pt.lng;

            if (index > 0) {
              // Calcula a distância entre o ponto anterior e o atual
              const segmentDistance = calculateDistance(prevLat, prevLon, currentLat, currentLon);
              accumulatedDistanceMeters += segmentDistance;
            }

            // Atualiza o ponto anterior para a próxima iteração
            prevLat = currentLat;
            prevLon = currentLon;

            // Retorna o ponto no formato [Distância (km), Elevação (m)]
            return {
              // x: Distância acumulada (em km), arredondado para 2 casas
              x: parseFloat(accumulatedDistanceMeters / 1000).toFixed(2),
              // y: Elevação (em metros)
              y: pt.meta?.ele || 0,
            };
          });

          if (onDataExtracted && extracted.length > 0) {
            onDataExtracted(extracted);
          }
        });

        gpx.addTo(map);
      } catch (err) {
        console.error('Erro ao iniciar o Leaflet:', err);
        setLoading(false);
      }
    }, 0);

    return () => {
      clearTimeout(initTimeout);

      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (error) {
          console.error('Erro ao remover o mapa Leaflet:', error);
        }
        leafletMapRef.current = null;
      }

      if (container?._leaflet_id) {
        container._leaflet_id = null;
      }
    };
  }, [gpxUrl, onDataExtracted]);

  return (
    <div ref={mapRef} className="h-full w-full rounded-xl">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
          <span className="text-lg font-medium text-gray-600">Carregando Mapa...</span>
        </div>
      )}
    </div>
  );
}
