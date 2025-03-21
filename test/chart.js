// Location data
const locations = [
  {
    name: "Golfiņš Minigofs",
    coordinates: [24.1393957, 56.9604584],
    description: "Tokyo is Japan's capital and the world's most populous metropolitan area. It is also one of Japan's 47 prefectures, consisting of 23 central city wards and multiple cities, towns and villages west of the city center.",
    facts: [
      "Population: 13.96 million",
      "Famous landmarks: Tokyo Tower, Tokyo Skytree, Imperial Palace",
      "The city hosted the 1964 and 2020 Summer Olympics"
    ]
  },
  {
    name: "New York City, USA",
    coordinates: [23.48536, 56.9427495],
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers.",
    facts: [
      "Population: 8.8 million",
      "Famous landmarks: Statue of Liberty, Empire State Building, Central Park",
      "Home to the United Nations Headquarters"
    ]
  }
];

// Set up the map projection
const width = document.getElementById('map').clientWidth;
const height = document.getElementById('map').clientHeight; 

// Calculate the bounds to fit both points
const points = locations.map(d => d.coordinates);
const bounds = {
  minLng: d3.min(points, d => d[0]),
  maxLng: d3.max(points, d => d[0]),
  minLat: d3.min(points, d => d[1]),
  maxLat: d3.max(points, d => d[1])
};

// Add padding to the bounds
const padding = 1; // degrees
bounds.minLng -= padding;
bounds.maxLng += padding;
bounds.minLat -= padding/2;
bounds.maxLat += padding/2;

const projection = d3.geoMercator()
  .center([(bounds.minLng + bounds.maxLng) / 2, (bounds.minLat + bounds.maxLat) / 2])
  .scale(width / (2 * Math.PI) * (bounds.maxLng - bounds.minLng > 180 ? 
    360 / (bounds.maxLng - bounds.minLng) : 
    180 / Math.max(bounds.maxLng - bounds.minLng, (bounds.maxLat - bounds.minLat) * 2)))
  .translate([width / 2, height / 2]);

const path = d3.geoPath().projection(projection);

// Create SVG element
const svg = d3.select("#map")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// Load and display world map
d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json")
  .then(function(topology) {
    // Draw countries
    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(topology, topology.objects.countries).features)
      .enter()
      .append("path")
      .attr("class", "country")
      .attr("d", path);
    
    // Add location points
    svg.selectAll(".location-point")
      .data(locations)
      .enter()
      .append("circle")
      .attr("class", "location-point")
      .attr("cx", d => projection(d.coordinates)[0])
      .attr("cy", d => projection(d.coordinates)[1])
      .attr("r", 8)
      .on("mouseover", function(event, d) {
        // Enlarge point on hover
        d3.select(this).attr("r", 12);
        
        // Show tooltip
        const tooltip = d3.select("#tooltip");
        tooltip.style("opacity", 1)
          .style("left", (event.pageX - document.querySelector('.container').offsetLeft + 15) + "px")
          .style("top", (event.pageY - document.querySelector('.container').offsetTop - 30) + "px")
          .html(`<h3>${d.name}</h3><p>Click for more information</p>`);
      })
      .on("mouseout", function() {
        // Reset point size
        d3.select(this).attr("r", 8);
        
        // Hide tooltip
        d3.select("#tooltip").style("opacity", 0);
      })
      .on("click", function(event, d) {
        // Display location information in the panel
        showLocationInfo(d);
      });
  })
  .catch(function(error) {
    console.error("Error loading map data:", error);
    // Fallback if map data fails to load
    const mapElement = document.getElementById('map');
    mapElement.innerHTML = '<p style="text-align: center; padding: 20px;">Error loading map. Please check your internet connection or try again later.</p>';
  });

// Function to display location information
function showLocationInfo(location) {
  const infoPanel = document.getElementById('info-panel');
  const locationTitle = document.getElementById('location-title');
  const locationContent = document.getElementById('location-content');
  
  // Set title and content
  locationTitle.textContent = location.name;
  
  // Build content HTML
  let contentHTML = `<p>${location.description}</p>`;
  contentHTML += '<h3>Key Facts:</h3><ul>';
  
  location.facts.forEach(fact => {
    contentHTML += `<li>${fact}</li>`;
  });
  
  contentHTML += '</ul>';
  
  // Set content and display panel
  locationContent.innerHTML = contentHTML;
  infoPanel.style.display = 'block';
}

