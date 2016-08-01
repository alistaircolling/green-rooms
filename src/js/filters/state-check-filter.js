routerApp.filter('contains-state', function() {
    return function(states, currentState) {
        return states.filter(function(currentState) 
                {
                    return states.name != currentState;
                });
    };
}
);
