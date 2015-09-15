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
    templateUrl: 'partial-home.html'
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


  // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
  .state('about', {
    url: '/about',
    views: {
      //main template (notice blank string key)
      '': {
        templateUrl: 'partial-about.html'
      },
      //child view absolutely named
      'columnOne@about': {
        template: 'There should be a table of scotch to the right'
      },
      //for column 2 we will define a separate controller - I wonder if I could create a separate js file for the controller rather than having it all in the massive app.js doc hmmm
      'columnTwo@about': {
        
          templateUrl: 'table-data.html',
          controller: 'scotchController'
      }

    }

  });

});


//MAPPING a controller to the router - as above is it better to do this in a separete js file hmm?

//this is the controller that is defined above that is used in the 'about' state

routerApp.controller('scotchController', function($scope) {

  $scope.message = 'test';

  $scope.scotches = [{
    name: 'Macallan 12',
    price: 50
  }, {
    name: 'Chivas Regal Bagpipes 12',
    price: 1000
  }, {
    name: 'Huge Bells',
    price: 50000000
  }]
})
