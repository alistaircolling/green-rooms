console.log('gallery controller loaded!');
routerApp.controller('gallery-controller', function($scope) {

    $scope.photos = [
    {id:'p1', 'title':'Hi!', src: "http://lorempixel.com/output/business-q-c-640-480-1.jpg"},
    {id:'p1', 'title':'Hi!', src: "http://lorempixel.com/output/business-q-c-640-480-1.jpg"},
    ];
});
