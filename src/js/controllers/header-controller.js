routerApp.controller('HeaderController', function($scope, $rootScope, $window, DeviceService) {
    console.log("header controller here");
     $scope.isMobileHeader = function() {
    var returnVal = (DeviceService.isMobile) ? "mobile-header" : "desktop-header";
    return returnVal;
    };
    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams) {
            console.log("STATE CHANGE:" + toState.name);
            if (DeviceService.isMobile) {
                switch (toState.name) {
                    case "about":
                        $scope.showHeader = function() {
                            return "hide-header";
                        };
                        break;
                    case "beds":
                        $scope.showHeader = function() {
                            return "hide-header";
                        };
                        break;
                    case "home-mobile":
                        $scope.showHeader = function() {
                            return "show-header";
                        };
                        //Scroll to hide address bar on mobile
                        $window.addEventListener("load", function() {
                            // Set a timeout...
                            setTimeout(function() {
                                // Hide the address bar!
                                console.log("HIOHIIII");
                                $window.scrollTo(0, 1);
                            }, 0);
                        });
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
