// Initialize the map
var map = L.map("map").setView([0, 0], 13);
let ipInfo = document.querySelector("#ipInfo");
let ipTarget = document.querySelector("#ipTarget");
let ipLocation = document.querySelector("#ipLocation");
let ipTime = document.querySelector("#ipTime");
let ipISP = document.querySelector("#ipISP");
// Add a tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// Function to fetch data using Axios GET
async function fetchData() {
  try {
    let ipAddress = document.querySelector("#ipAddress").value;
    const response = await axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=at_VbRnEnKjefBuqIe8iJE7RbFR07ure&ipAddress=${ipAddress}&domain=${ipAddress}`
    );
    const data = response.data;
    return data;
  } catch (error) {
    alert("IP or Domain Name not present in the database");
    return null;
  }
}

async function handleData() {
  const data = await fetchData();
  if (data) {
    let ipAddress = document.querySelector("#ipAddress").value;
    if (ipAddress === "") {
      ipInfo.classList.remove("flex");
      ipInfo.classList.add("hidden");
      ipAddress = "8.8.8.8";
    } else {
      ipInfo.classList.remove("hidden");
      ipInfo.classList.add("flex");
    }
    const { ip, location, isp } = data;
    const { country, region, city, timezone, lat, lng } = location;
    ipTarget.innerText = ip;
    ipLocation.innerText = `${city}, ${region}, ${country}`;
    ipTime.innerHTML = `UTC ${timezone}`;
    ipISP.innerText = `${isp}`;

    // Add a marker to the map
    var marker = L.marker([lat, lng]).addTo(map);

    // Center the map on the marker
    map.setView([lat, lng], 13);

    // Bind a popup to the marker
    // marker.bindPopup("Curr.").openPopup();
  }
}

// Call the function to handle data and add marker to the map
handleData();
