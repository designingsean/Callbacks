var calls = angular.module("calls", ["ui.bootstrap"])
.config(function($locationProvider, $routeProvider) {
    $routeProvider
        .when("/", { controller: "calls", templateUrl: "app/views/calls.html" })
        .otherwise({ redirectTo: '/calls' });
})
.factory('usersApi', ['$http', function($http) {
    return {
        get : function() {
            return $http.get("/calls/api/?action=usersGet");
        }
    };
}])
.factory('callsApi', ['$http', function($http) {
    return {
        add : function(formData) {
            return $http({
                method: 'POST',
                url: "/calls/api/?action=callsAdd",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(formData)
            });
        },
        get : function(completed) {
            return $http.get("/calls/api/?action=callsGet&completed=" + completed);
        },
        update : function(id) {
            return $http.get("/calls/api/?action=callsUpdate&id=" + id);
        }
    };
}])
.factory('notesApi', ['$http', function($http) {
    return {
        add : function(formData) {
            return $http({
                method: 'POST',
                url: "/calls/api/?action=notesAdd",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                data: $.param(formData)
            });
        },
        get : function(call) {
            return $http.get("/calls/api/?action=notesGet&call=" + call);
        }
    };
}])
.filter('phone', function() {
    return function(phone) {
        var area, prefix, number;
        switch(phone.length) {
            case 7:
                area = '(843) ';
                prefix = phone.slice(0,3);
                number = phone.slice(3);
                break;
            default:
                area = '(' + phone.slice(0, 3) + ') ';
                prefix = phone.slice(3, 6);
                number = phone.slice(6);
                break;
        }
        return area + prefix + '-' + number;
    };
});