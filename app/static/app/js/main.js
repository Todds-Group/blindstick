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
      $.get("https://api.thingspeak.com/channels/1414842/feeds.json?api_key=9QFST2QPKRDU49Q9&results=2", (data, status)=>{
        console.log(data)
        let receivedLat = Number(data.feeds[1].field1)
        let receivedLng = Number(data.feeds[1].field2)
        let receivedAt = data.feeds[1].created_at
        if (receivedLat !== lastLat && receivedLng !== lastLng){
          lastLat = receivedLat
          lastLng = receivedLng

          const li = `
          <li>
              <p>Time: ${receivedAt} </p>
              <p>
                  <span>Lat: <b>${receivedLat}</b></span>
                  <span>Lng: <b>${receivedLng}</b></span>
              </p>
          </li>
          `

          $('#lat-lng-list').prepend(li)

          marker.setPosition({
            lat:receivedLat, 
            lng:receivedLng
          });
          map.setZoom(17);
          map.panTo(marker.position);
        }
        
      });
  }, 5000);
   })