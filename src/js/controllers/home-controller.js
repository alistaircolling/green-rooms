routerApp.controller('home-controller', function($scope, DeviceService, GAPI, Calendar) {
    //debugger;
    GAPI.init(); 
    var my = GAPI;
    var cal = Calendar.getCalendars('0gbh2vlcl091o66vo0p2di51p2mr4k0e@import.calendar.google.com');
    setTimeout($scope.authorize(), 1000);
    $scope.phoneNumberDisplay = '+44(0)207800880';
    $scope.phoneNumberDial = '+44207800880';
    $scope.address = '100 KING ROAD, WOOD GREEN, LONDON N10 1RT';
});
