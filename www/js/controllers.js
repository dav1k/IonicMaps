angular
  .module('controllers', [])
  .controller('MapCtrl', MapCtrl);

function MapCtrl($scope, $state, $compile, $cordovaGeolocation) {
  console.log('MapCtrl loaded.');

  // Expose global
  var vm = this;

  // Geolocation options
  var options =  {
    timeout: 10000,
    enableHighAccuracy: true
  };

  // Position succesfull
  function callPosition(position) {
    $scope.location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    vm.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    function MarkerCurrent() {
      var marker = new google.maps.Marker({
        map: vm.map,
        animation: google.maps.Animation.DROP,
        position: latLng
      });


      var infoWindow = new google.maps.InfoWindow({
        content: "Current Location"
      });

      google.maps.event.addListener(marker, 'click', function () {
        infoWindow.open(vm.map, marker);
      });
    }

    google.maps.event.addListenerOnce(vm.map, 'idle', MarkerCurrent);
  }

  // Position error
  function callError() {
    console.error('Unable to determine location.');
  }

  // Where are we?? Find me!
  $cordovaGeolocation.getCurrentPosition(options).then(callPosition, callError);
}
