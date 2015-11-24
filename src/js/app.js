// app.js
//the routerApp used for all routing of states, views and URLs

console.log('log test--------------------------------');

var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/-home');
    // add states to the state provider
    $stateProvider
    //HOME =================================
        .state('-home', {
            url: '/-home',
            //templateUrl: 'partial-home.html',
            controller: function($scope, $state, DeviceService) {
                console.log("home controller");
                if (DeviceService.isMobile) {
                    console.log("is mobile");
                    $state.go('home-mobile');
                } else {
                    console.log("is desktop");
                    $state.go('home');
                }
            }
        })
        .state('home-mobile', {
            url: '/m-home',
            templateUrl: 'partial-home-mobile2.html',
            controller: 'mobile-home-controller'
        })

    .state('home', {

        url: '/home',
        templateUrl: 'partial-home.html',
        controller: 'home-controller'
        //TODO update names of controllers to be TitleCase
    })


    //BEDS ==================================

    .state('beds', {
        url: '/beds',
        views: {
            '': {
                templateUrl: 'partial-beds.html',
                controller: 'BedsController'
            },
            'prices-intro@beds': {
                template: 'All rooms come with tea and coffee making facilities'
            },
            'prices@beds': {
                templateUrl: 'table-data.html',
                controller: 'pricesController'
            }
        }
    })

    //LOCATION    ===========
    .state('location', {
        url: '/location',
        templateUrl: 'partial-location.html',
        controller: function($scope) {
            // reset the scroll
        }
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('about', {
        url: '/about',
        views: {
            //main template (notice blank string key)
            '': {
                templateUrl: 'partial-about.html',
                controller: function($scope) {
                    // reset the scroll
                }
            }

        }

    });
});
