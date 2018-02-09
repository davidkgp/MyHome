var app = angular.module('gmap',[]);
app.controller('gmapcontroller', function($scope,$http){

	var mapOptions = {
                  zoom: 10,
                  center: new google.maps.LatLng(-22.08659,-65.594223),
                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                  gestureHandling: 'greedy'
              };
    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);



        if(fqu!=undefined){
        	//var infoWindow = new google.maps.InfoWindow();
        	for(let i = 0 ; i < fqu.length ; i++){
        		
        

        $http.get('http://api.openweathermap.org/data/2.5/weather?units=metric',{params:{id: fqu[i].id, appid: 'TO_BE_DEFINED'}})
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
            /*var infowindow = new google.maps.InfoWindow({
              content: 'Temp of '+placeName+' is '+temp+' degrees Celsius with humidity '+humidity+' %'
            });

            marker.infowindow =infowindow;
            marker.addListener('click', function() {
	         	return marker.infowindow.open(map, marker);
	        });*/
            
	        /*var infoWindow = new google.maps.InfoWindow();

	        $scope.map.addListener(marker, 'click', (function(marker, i) {
              return function() {
                infoWindow.setContent('Hi');
                infoWindow.open($scope.map, marker);
              }
            })(marker, i));*/




            
        }).catch(function(response){
            /*$scope.humidity = 'NA';
            $scope.temp ='NA';
            var infowindow = new google.maps.InfoWindow({
              content: 'Temp of this region not found'
              

            });


            marker.addListener('click', function() {
        	  infowindow.open(map, marker);
            });*/
        });
        	}
        }

        /*var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var marker = new google.maps.Marker(
        	{position: {lat: -22.08659, lng: -65.594223}, 
        	map: map,
        	title:'Villazon',
        	animation: google.maps.Animation.DROP});

        var infowindow = new google.maps.InfoWindow({
              content: 'Temp of Villazon is 30 degrees'

        });


        marker.addListener('click', function() {
        	infowindow.open(map, marker);
        });*/


	var request = {
                method: 'get',
                url: 'city.list.json',
                dataType: 'json',
                contentType: "application/json"
            };

    $scope.cityList = new Array;

    $http(request).then(function(response){
        $scope.cityList=response.data;
    }).catch(function(response){
    });

    $scope.getValue = function(){

    	console.log($scope.selectedCityLat);
    	console.log($scope.selectedCityLon);

    	var mapOptions = {
                  zoom: 10,
                  center: new google.maps.LatLng($scope.selectedCityLat,$scope.selectedCityLon),
                  mapTypeId: google.maps.MapTypeId.TERRAIN,
                  gestureHandling: 'greedy'
              }

        var map = new google.maps.Map(document.getElementById('map'), mapOptions);
        var marker = new google.maps.Marker(
        	{position: {lat: $scope.selectedCityLat, lng: $scope.selectedCityLon}, 
        	map: map,
        	title:$scope.selectedCityName,
        	animation: google.maps.Animation.DROP});


        $http.get('http://api.openweathermap.org/data/2.5/weather?units=metric',{params:{id: $scope.selectedName, appid: 'TO_BE_DEFINED'}}).then(function(response){
        	$scope.humidity = response.data.main.humidity;
        	$scope.temp = response.data.main.temp;
        	var placeName = $scope.selectedCityName;
        var temp= $scope.temp;
        var humidity = $scope.humidity;
        var infowindow = new google.maps.InfoWindow({
              content: 'Temp of '+placeName+' is '+temp+' degrees Celsius with humidity '+humidity+" %"
              

        });


        marker.addListener('click', function() {
        	infowindow.open(map, marker);
        });
        }).catch(function(response){
            $scope.humidity = 'NA';
            $scope.temp ='NA';
        });
        


    /*var resourceObj = $resource('http://api.openweathermap.org/data/2.5/weather?units=metric',callback:populateData);

    resourceObj.get({appid:'TO_BE_DEFINED',id: $scope.selectedName}, function(response) {//params are ordered in alphabetical order of the name
        $scope.humidity = response.main.humidity;
        $scope.temp = response.main.temp;
    },function(error){
        $scope.humidity = 'NA';
        $scope.temp ='NA';
    });*/


        
       
    };

    

	
});