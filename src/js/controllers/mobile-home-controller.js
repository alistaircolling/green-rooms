routerApp.controller('mobile-home-controller', function($log, $scope, $state, $sce) {
    $scope.phoneNumberDisplay = '+44(020) 8888 5317';
    $scope.bookingLink = 'https://live.high-level-software.com/hotels/greenrooms/availability';
    $scope.phoneNumberDial = '+442088885317';
    $scope.address = '<span>13-27 STATION ROAD<br>WOOD GREEN<br>LONDON<br>N22 6UW</span>';
    //$scope.$state = $state;
    //$log.log('>>> state:'+$state.current.name);

});
