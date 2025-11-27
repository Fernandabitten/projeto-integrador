// import { useEffect } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import 'leaflet-gpx';

// export default function TrailMap({ gpxUrl }) {
//   useEffect(() => {
//     const map = L.map('trail-map-container', {
//       zoomControl: true,
//       center: [0, 0],
//       zoom: 13,
//     });

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       maxZoom: 19,
//     }).addTo(map);

//     // GPX
//     if (gpxUrl) {
//       new L.GPX(gpxUrl, { async: true })
//         .on('loaded', e => {
//           map.fitBounds(e.target.getBounds());

//           // necessário em Leaflet + containers flexíveis
//           setTimeout(() => map.invalidateSize(), 200);
//         })
//         .addTo(map);
//     }

//     // valida tamanho depois que tudo renderiza
//     setTimeout(() => map.invalidateSize(), 200);

//     return () => map.remove();
//   }, [gpxUrl]);

//   return <div id="trail-map-container" className="absolute inset-0 w-full h-full" />;
// }

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';
import '@raruto/leaflet-elevation/dist/leaflet-elevation.min.css';
import '@raruto/leaflet-elevation/dist/leaflet-elevation.min.js';

export default function TrailMap({ gpxUrl }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!gpxUrl) return;

    // Se o mapa já existe, não recrie
    if (mapRef.current) return;

    // Criar mapa uma vez
    const map = L.map('map', {
      center: [0, 0],
      zoom: 13,
    });

    mapRef.current = map;

    // Tile normal
    const normalLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(
      map
    );

    // Tile satélite
    const satelliteLayer = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
    );

    // GPX + elevação
    const elevation = L.control
      .elevation({
        theme: 'lime-theme',
        position: 'bottomright',
        collapsed: false,
      })
      .addTo(map);

    new L.GPX(gpxUrl, {
      async: true,
      marker_options: {
        startIconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
        endIconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
      },
    })
      .on('loaded', e => {
        map.fitBounds(e.target.getBounds());
      })
      .on('addline', e => {
        elevation.addData(e.line);
      })
      .addTo(map);

    // Controle de layers
    L.control
      .layers(
        {
          Normal: normalLayer,
          Satélite: satelliteLayer,
        },
        {},
        { position: 'topleft' }
      )
      .addTo(map);

    // Cleanup: destruir mapa ao sair da página
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [gpxUrl]);

  return (
    <div id="map" className="w-full h-[400px] sm:h-[500px] mt-4 rounded-xl overflow-hidden"></div>
  );
}
