var app = angular.module('gmap',[]);
app.controller('gmapcontroller', function($scope,$http){

	var mapOptions = {
                  minZoom: 3,
                  zoom: 7,
                  center: new google.maps.LatLng(-22.08659,-65.594223),
                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                  gestureHandling: 'greedy'
              };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    google.maps.event.addListener($scope.map, 'dblclick', function( event ){
       console.log( "Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng()); 
        $http.get('http://api.openweathermap.org/data/2.5/weather?units=metric',{params:{lat: event.latLng.lat(), lon:event.latLng.lng(),appid: 'OPENAPIKEY'}})
        .then(function(response){

            var marker = new google.maps.Marker(
            {position: {lat: response.data.coord.lat, lng: response.data.coord.lon}, 
            map: $scope.map,
            title:response.data.name,
            animation: google.maps.Animation.DROP});


            $scope.humidity = response.data.main.humidity;
            $scope.temp = response.data.main.temp;

            var placeName = response.data.name;
            var temp= $scope.temp;
            var humidity = $scope.humidity;
            var generateMarkers= function(marker){

                var infowindow = new google.maps.InfoWindow({content: 'Temp of '+placeName+' is '+temp+' degrees Celsius with humidity '+humidity+' %'});
                marker.infowindow =infowindow;
                marker.addListener('click', function() {
                    return marker.infowindow.open(map, marker);
                });

            };

            generateMarkers(marker);

        }).catch(function(response){
            console.log( "Not Found weather data :Latitude: "+event.latLng.lat()+" "+", longitude: "+event.latLng.lng()); 
        });
    });



        
       


    

	
});