
routerApp.controller('home-controller', function($scope) {

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
    }];
});
