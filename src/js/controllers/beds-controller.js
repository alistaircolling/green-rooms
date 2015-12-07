routerApp.controller('BedsController', function($scope) {
    $scope.rooms = [{
        name: 'Basic',
        price: 50,
        copy: 'A great option if you are on a budget or travelling in a large group.',
        image: "http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg"
    }, {
        name: 'Deluxe',
        price: 80,
        copy: 'A great option if you are on a budget or travelling in a large group.',
        image: "http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg"
    }, {
        name: 'Presidential Suite',
        price: 200,
        copy: 'A great option if you are on a budget or travelling in a large group.',
        image: "http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg"
    }];
});
