// When ready...
var routerApp = angular.module('routerApp', ['uz.mailto', 'ui.router', 
    'ngSanitize', 'ngAnimate', 'angulartics', 'angulartics.google.analytics']);

routerApp.run(function ( $rootScope, $state){
    $rootScope.$state = $state;
    //$rootScope.on('$routeChangeSucess', ()=>{
        //var interval = setInterval(()=>{
            //if(document.readyState == 'complete'){

            //}
        //}, 200);
    //})
});

//create device service first
routerApp.factory('DeviceService', function() {  
    console.log("checking is mobile...");
    var check = false;
    (function(a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
    })(navigator.userAgent || navigator.vendor || window.opera);
    console.log("resultz:" + check);
    return {
        isMobile: check
    };
});

routerApp.factory('CalendarService', ['$http', function($http){
    var CalendarService = {};
    // timeStamp so only future events are retrieved
    var timeStamp;

    function ISODateString(d){
        function pad(n){return n<10 ? '0'+n : n}
        return d.getUTCFullYear()+'-'
            + pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'T'
            + pad(d.getUTCHours())+':'
            + pad(d.getUTCMinutes())+':'
            + pad(d.getUTCSeconds())+'Z'
    }

    timeStamp = ISODateString(new Date());

    CalendarService.getCalendar = function() {
        return $http.get(
            'https://www.googleapis.com/calendar/v3/calendars/info@greenrooms.london/events?key=AIzaSyCcSoCl6WtjI3JvMaS_jIl1A9N7yc8Bq7A&orderBy=startTime&singleEvents=true&timeMin='+timeStamp)
    }
    return CalendarService;
}
])

routerApp.filter('formatDateTime', function() {
    return function(text){
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.toString().replace(urlRegex, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }
})
routerApp.filter('urlify', function() {
    return function(text){
        var urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.toString().replace(urlRegex, function(url) {
            return '<a href="' + url + '">' + url + '</a>';
        })
        // or alternatively
        // return text.replace(urlRegex, '<a href="$1">$1</a>')
    }
})

routerApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/-home');
   // add states to the state provider
   console.log("router app---");
    $stateProvider.state('-home', {
            url: '/-home',
            //templateUrl: 'partial-home.html',
            controller: function($scope, $state, DeviceService) {
                console.log("home controller");
                if (DeviceService.isMobile) {
                    console.log("is mobile");
                    $state.go('home-mobile');
                } else {
                    console.log("is desktop");
                    $state.go('home');
                }
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: 'home-controller'
                //TODO update names of controllers to be TitleCase
        })
        .state('home-mobile', {
            url: '/m-home',
            templateUrl: 'partial-home-mobile.html',
            controller: 'mobile-home-controller'
        })



    //rooms ==================================
    .state('rooms', {
        url: '/rooms',
        views: {
            '': {
                templateUrl: 'partial-rooms.html',
                controller: 'rooms-controller'
            }
        }
    })

    // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
    .state('building', {
            url: '/building',
            views: {
                //main template (notice blank string key)
                '': {
                    templateUrl: 'partial-building.html',
                    controller: 'BuildingController'
                }
            }
        })
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            url: '/about',
            views: {
                //main template (notice blank string key)
                '': {
                    templateUrl: 'partial-about.html',
                    controller: 'AboutController'
                }
            }
        })
        .state('spaces', {
            url: '/spaces',
            views: {
                //main template (notice blank string key)
                '': {
                    templateUrl: 'partial-spaces.html',
                    controller: 'SpacesController'
                }
            }
        })
        .state('questions', {
            url: '/questions',
            views: {
                //main template (notice blank string key)
                '': {
                    templateUrl: 'partial-questions.html',
                    controller: 'QuestionsController'
                }
            }
        })
        .state('terms', {
            url: '/terms',
            views: {
                //main template (notice blank string key)
                '': {
                    templateUrl: 'partial-terms.html',
                    controller: 'TermsController'
                }
            }
        })
        .state('termsandcs', {
            url: '/termsandcs',
            views: {
                //main template (notice blank string key)
                '': {
                    templateUrl: 'partial-tandcs.html',
                    controller: 'TermsController'
                }
            }
        })

    .state('press', {
        url: '/press',
        views: {
            //main template (notice blank string key)
            '': {
                templateUrl: 'partial-press.html',
                controller: 'PressController'
            }
        }
    })
    .state('events', {
        url: '/events',
        views: {
            //main template (notice blank string key)
            '': {
                templateUrl: 'partial-events.html',
                controller: 'EventsController'
            }
        }
    });

});
