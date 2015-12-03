routerApp.controller('HeaderController', function($scope, $rootScope, DeviceService) {
    console.log("header controller here");
    $scope.isMobileHeader = function() {
        var returnVal = (DeviceService.isMobile) ? "mobile-header" : "desktop-header";
        return returnVal;
    };
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            console.log("STATE CHANGE");
            debugger;
        })
});

//Mobile header needs to show when NOT on the homepage
