export const mapRuntime = `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initMap = function(id, lat, lng, zoom, tileUrl, controls, markers, geoJsonSrc) {
      if (!window.CodeForge._m) window.CodeForge._m = {};
      if (window.CodeForge._m[id]) return;

      const run = function() {
        const L = window.L || window.leaflet;
        if (!L || !L.Map || window.CodeForge._m[id]) return;

        try {
          const map = new L.Map(id, { 
            center: [lat, lng], 
            zoom: zoom,
            zoomControl: controls.indexOf('zoom') !== -1
          });
          window.CodeForge._m[id] = map;

          if (L.TileLayer) {
            new L.TileLayer(tileUrl, { attribution: '&copy; OpenStreetMap' }).addTo(map);
          }

          if (controls.indexOf('scale') !== -1 && L.Control && L.Control.Scale) {
            new L.Control.Scale().addTo(map);
          }

          if (markers && markers.length) {
            markers.forEach(function(m) {
              if (L.Marker) new L.Marker([m.lat, m.lng]).bindPopup(m.name || '').addTo(map);
            });
          }

          if (geoJsonSrc && L.GeoJSON) {
            fetch(geoJsonSrc)
              .then(function(r) { return r.json(); })
              .then(function(d) { new L.GeoJSON(d).addTo(map); })
              .catch(function(err) { console.warn('GeoJSON load failed', err); });
          }

          map.invalidateSize();
          setTimeout(function() { map.invalidateSize(); }, 250);
        } catch (e) {
          console.error('Leaflet 2.0 Alpha Init Failed:', e);
        }
      };

      const check = function() {
        const L = window.L || window.leaflet;
        return L && L.Map;
      };

      if (check()) {
        run();
      } else {
        window.addEventListener('load', run);
        const iv = setInterval(function() {
          if (check()) { run(); clearInterval(iv); }
        }, 100);
        setTimeout(function() { clearInterval(iv); }, 5000);
      }
    };
`;
