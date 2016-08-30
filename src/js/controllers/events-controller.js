routerApp.controller('EventsController', function($scope, $sce, CalendarService) {
    // Could inject data service here
    $scope.title = 'Who stays here?';
    $scope.calendar;    
    $scope.events;
    $scope.trustAsHtml = $sce.trustAsHtml;
    $scope.getImage = function(fileId){
        return 'http://drive.google.com/uc?export=view&id='+fileId;
    };
    CalendarService.getCalendar()
        .success(function(calendar){
            $scope.calendar = calendar;
            $scope.events = calendar.items;
        })
        .error(function(error){
            console.log("calendar error")
        });
});
