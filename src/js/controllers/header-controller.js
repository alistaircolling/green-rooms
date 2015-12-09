routerApp.controller('HeaderController', function($scope, $rootScope, DeviceService) {
    console.log("header controller here");
    /* $scope.isMobileHeader = function() {*/
    //var returnVal = (DeviceService.isMobile) ? "mobile-header" : "desktop-header";
    //return returnVal;
    /*};*/
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            console.log("STATE CHANGE:" + toState.name);
            if (DeviceService.isMobile) {
                switch (toState.name) {
                    case "about":
                        $scope.showHeader = function() {
                            return "show-header";
                        };
                        break;
                    case "beds":
                        $scope.showHeader = function() {
                            return "show-header";
                        };
                        break;
                    case "home-mobile":
                        $scope.showHeader = function() {
                            return "show-header";
                        };
                        break;
                    default:
                        $scope.showHeader = function() {
                            return "hide-header";
                        };

                }
            } else {
                $scope.showHeader = function() {
                    return "hide-header";
                };

            }
        });

});

//Mobile header needs to show when NOT on the homepage
