routerApp.controller('AboutController', function($scope, CopyService) {

    $scope.content;

    CopyService.getPage('about')
        .success(function(content){
            $scope.content = content;
        })
        .error(function(error){
            console.log("about loading error")
        });
    //
    //$scope.articles = [{
        //copy: "'Come back!' the Caterpillar called after her. 'I've something important to say!' This sounded promising, certainly: Alice turned and came back again. 'Keep your temper,' said the Caterpillar. 'Is that all?' said Alice, swallowing down her anger as well as she  could. 'No,' said the Caterpillar. Alice thought she might as well wait, as she had nothing else to do, and  perhaps after all it might tell her something worth hearing.",
        //image: "http://d2v52k3cl9vedd.cloudfront.net/assets/images/placeholder-square.svg"
    //}   
    //];


});
//Could inject data service her//Could inject data service herer});
