let map = undefined;
let marker = undefined;

function initMap() {
    // The location of atd
    const atd = { lat: 34.168751, lng: 73.221497 };
    // The map, centered at atd
    map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: atd,
    });
    // The marker, positioned at atd
    marker = new google.maps.Marker({
      position: atd,
      map: map,
    });
  }

  let lastLat = 0
  let lastLng = 0
  $(document).ready(function (e) {
    setInterval(function(){ 
      console.log("Executing")
      $.get("/read_last_entry/", (data, status)=>{
        if (data.lat !== lastLat && data.lng !== lastLng){
          lastLat = data.lat
          lastLng = data.lastLng

          const li = `
          <li>
              <p>Time: ${data.created_at} </p>
              <p>
                  <span>Lat: <b>${data.lat}</b></span>
                  <span>Lng: <b>${data.lng}</b></span>
              </p>
          </li>
          `

          $('#lat-lng-list').prepend(li)

          marker.setPosition({
            lat:data.lat, 
            lng:data.lng
          });
          map.setZoom(17);
          map.panTo(marker.position);
        }
        
      });
  }, 5000);
   })