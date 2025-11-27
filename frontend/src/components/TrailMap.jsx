import { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gpx';

export default function TrailMap({ gpxUrl }) {
  useEffect(() => {
    const map = L.map('trail-map-container', {
      zoomControl: true,
      center: [0, 0],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(map);

    // GPX
    if (gpxUrl) {
      new L.GPX(gpxUrl, { async: true })
        .on('loaded', e => {
          map.fitBounds(e.target.getBounds());

          // necessário em Leaflet + containers flexíveis
          setTimeout(() => map.invalidateSize(), 200);
        })
        .addTo(map);
    }

    // valida tamanho depois que tudo renderiza
    setTimeout(() => map.invalidateSize(), 200);

    return () => map.remove();
  }, [gpxUrl]);

  return <div id="trail-map-container" className="absolute inset-0 w-full h-full" />;
}
