routerApp.filter('pricer',
    function() {
        return function(price) {
            var output = '£' + price + ' ' + 'per night';
            return output;
        };
    }
);
