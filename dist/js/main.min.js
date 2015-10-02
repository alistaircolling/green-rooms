// app.js
//the routerApp used for all routing of states, views and URLs

var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');
    // add states to the state provider
    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
        url: '/home',
        templateUrl: 'partial-home.html',
        controller: function($scope) {}
    })

    //nested list with custom controller - I think the scope is passed and the dogs array is attached. presumably I could specify a controller with its own js file for example that requested the data from an API
    .state('home.list', {
            url: '/list',
            templateUrl: 'partial-home-list.html',
            controller: function($scope) {
                $scope.dogs = ['Fenella', 'Monty', 'Coco'];
            }
        })
        //nested paragraph with a string passed in template. again, presumably the template could specify
        .state('home.paragraph', {
            url: '/paragraph',
            template: 'This was text passed from the router config.'
        })
                   //BEDS ===========
        .state('beds', {
            url: '/beds',
            views: {
                '': {
                    templateUrl: 'partial-beds.html'
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


//MAPPING a controller to the router - as above is it better to do this in a separete js file hmm?

//this is the controller that is defined above that is used in the 'about' state

routerApp.controller('pricesController', function($scope) {

    $scope.message = 'test';

    $scope.rooms = [{
        name: 'Basic',
        price: 50
    }, {
        name: 'En-suite',
        price: 1000
    }, {
        name: 'Presidential',
        price: 50000000
    }]
})
