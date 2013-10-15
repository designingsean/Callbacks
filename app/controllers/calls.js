calls.controller('calls', function calls($scope, usersApi, callsApi, notesApi) {
    $scope.currentCall = 0;
    $scope.noteData = {};
    $scope.callData = {};

    $scope.callData.date = moment().format("YYYY-MM-DD");

    var z = "-0" + (moment(new Date()).zone())/60 + "00";

    usersApi.get().then(function(response) {
        $scope.users = response.data;
    });

    function getCalls() {
        callsApi.get(0).then(function(response) {
            $scope.calls = response.data;
            angular.forEach($scope.calls, function(value, key) {
                $scope.calls[key].received += z;
            });
        });
    }

    $scope.submitCall = function() {
        $scope.callData.received = $scope.callData.date + " " + $scope.callData.time;
        callsApi.add($scope.callData).then(function(response) {
            getCalls();
            $scope.callData = {};
            $scope.callData.date = moment().format("YYYY-MM-DD");
        });
    };

    $scope.completeCall = function(callID) {
        callsApi.update(callID).then(function(response) {
            getCalls();
        });
    };

    $scope.showNotes = function(callID) {
        notesApi.get(callID).then(function(response) {
            $scope.notes = response.data;
            angular.forEach($scope.notes, function(value, key) {
                $scope.notes[key].notesDate += z;
            });
        });
        $scope.currentCall = callID;
    };

    $scope.submitNotes = function() {
        $scope.noteData.callID = $scope.currentCall;
        notesApi.add($scope.noteData).then(function(response) {
            $scope.showNotes($scope.currentCall);
            $scope.noteData = {};
        });
    };

    $scope.getUser = function(userID) {
        return _.where($scope.users, {id:userID})[0].name;
    };

    getCalls();
});