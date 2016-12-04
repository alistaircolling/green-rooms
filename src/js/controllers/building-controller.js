routerApp.controller('BuildingController', function($scope, CopyService) {
    //Could inject data service here
    $scope.content ;

    CopyService.getPage('building')
        .success(function(content){
            $scope.content = content;
        })
        .error(function(error){
            console.log("building loading error")
        });
});
//Could inject data service her//Could inject data service herer});
