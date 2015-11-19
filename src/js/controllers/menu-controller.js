routerApp.controller('MenuController', function($scope, DeviceService){

    $scope.isMobileMenu = function(){
    //return the name of the css class for the mobile meny
    return (DeviceService.isMobile)? "mobile-menu":"desktop-menu";

   };
});

