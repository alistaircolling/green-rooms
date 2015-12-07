console.log('beds controller loaded!');
routerApp.controller('BedsController', function($scope) {

    $scope.message = 'test';

    $scope.rooms = [
    {
        name: 'Basic',
        price: 50,
        copy: 'A great option if you are on a budget or travelling in a large group.',
        bullets: [{
            copy: 'clean sheets'
        }, {
            copy: 'personal power supply'
        }],
        image:"http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg"
    }
    
    ];

});
