class CalendarService {

    constructor($http, $log){
    'ngInject';
        $log.log('I am the CalendarService!');
        this.$log = $log;
        this.$http = $http;
        this.urlBase = 'https://www.googleapis.com/calendar/v3/calendars/0gbh2vlcl091o66vo0p2di51p2mr4k0e%40import.calendar.google.com/events?key=AIzaSyCcSoCl6WtjI3JvMaS_jIl1A9N7yc8Bq7A';
    }

    requestCalendar(){
        return this.$http.get(urlBase)
            .then((response) =>{
                return response.data;
                this.$log.log('success');
            })
            .catch((error)=>{
                $log.log('error in json submit');
            })
    }

}
//export default CalendarService;

