angular.module('routerApp').controller('EventsController', function($scope, CalendarService) {
    //Could inject data service here
    $scope.title = 'Who stays here?';
    debugger;
    var calendar = CalendarService.requestCalendar();

});
//Could inject data service her//Could inject data service herer});
