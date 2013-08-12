calls.controller('calls', function calls($scope, usersApi, callsApi, notesApi) {
    $scope.currentCall = 0;
    $scope.noteData = {};
    $scope.callData = {};

    usersApi.get().then(function(response) {
        $scope.users = response.data;
    });

    function getCalls() {
        callsApi.get(0).then(function(response) {
            $scope.calls = response.data;
        });
    }

    $scope.submitCall = function() {
        $scope.callData.received = $scope.callData.date + " " + $scope.callData.time;
        callsApi.add($scope.callData).then(function(response) {
            getCalls();
            $scope.callData = {};
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