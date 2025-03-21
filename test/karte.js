const locations = [
  {
    name: "Golfiņš Minigolfs",
    coordinates: [56.9604584, 24.1393957],
    description: "22. marts, 12:00 - 13:00"
  },
  {
    name: "Iepirkšanās",
    coordinates: [56.929892714440314, 24.036465991793996],
    description: "22. marts, 13:00 - ~16:00"
  },
  {
    name: "Ķemeri",
    coordinates: [56.9427495, 23.48536],
    description: "22. marts, 13:00 - 23. marts, xx:xx"
  }
];

const map = L.map('map');

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  maxZoom: 18
}).addTo(map);

const bounds = L.latLngBounds();

const locationsContainer = document.getElementById('locations-container');

const markers = {};

locations.forEach((location, index) => {
  bounds.extend(location.coordinates);
  
  const marker = L.marker(location.coordinates, {
    title: location.name
  }).addTo(map);

  markers[index] = marker;

  marker.on('click', function() {
    map.setView(location.coordinates, 14, { animate: true, duration: 1 });
  });

  const locationItem = document.createElement('div');
  locationItem.className = 'location-item';
  locationItem.innerHTML = `<strong>${location.name}</strong><br>${location.description}`;
  
  locationItem.addEventListener('click', () => {
    map.setView(location.coordinates, 14, { animate: true, duration: 1 });
    marker.openPopup();
  });

  locationsContainer.appendChild(locationItem);
});

map.fitBounds(bounds, { padding: [50, 50], maxZoom: 10 });

