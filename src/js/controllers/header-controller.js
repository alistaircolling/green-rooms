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
            console.log("is mobile");
                switch (toState.name) {
                    case "about":
                        $scope.mainHeader = function() {
                            return "hide-header";
                        };
                        $scope.mobileHeader = function() {
                            return "show-header";
                        };
                        break;
                    case "rooms":
                    console.log("is beds or rooms");
                        $scope.mainHeader = function() {
                            return "hide-header";
                        };
                        $scope.mobileHeader = function() {
                            return "show-header";
                        };
                        break;
                    case "home-mobile":
                        $scope.mainHeader = function() {
                            return "hide-header";
                        };
                        $scope.mobileHeader = function() {
                            return "show-header";
                        };
                        //Scroll to show address bar on mobile
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
                        $scope.mainHeader = function() {
                            return "show-header";
                        };
                        $scope.mobileHeader = function() {
                            return "hide-header";
                        };

                }
            } else {
            console.log("not mobile");
                switch (toState.name) {
                    case "about":
                        $scope.mainHeader = function() {
                            return "show-header";
                        };
                        $scope.mobileHeader = function() {
                            return "hide-header";
                        };
                        break;
                    case "rooms":
                        $scope.mainHeader = function() {
                            return "show-header";
                        };
                        $scope.mobileHeader = function() {
                            return "hide-header";
                        };
                        break;
                    case "home-mobile":
                        $scope.mainHeader = function() {
                            return "hide-header";
                        };
                        $scope.mobileHeader = function() {
                            return "show-header";
                        };
                        //Scroll to show address bar on mobile
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
                        $scope.mainHeader = function() {
                            return "show-header";
                        };
                        $scope.mobileHeader = function() {
                            return "hide-header";
                        };

                }

            }
        });

});

//Mobile header needs to show when NOT on the homepage
