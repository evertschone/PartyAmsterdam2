angular.module('ionicApp.controllers', [])

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
	// wait till device is ready

		//get sidebar max width
	    $scope.maxwidth = function(spacer) {
	    	var width = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight
	    	return width - spacer
	    }

	    console.log(window.orientation + ' - ' + $scope.maxwidth(40) );

	    // get device width each rotate
	    window.addEventListener("orientationchange", function() {
	        //get sidebar max width
	        console.log(window.orientation + ' - ' + $scope.maxwidth(40) );
	    }, false);

	    $scope.attendees = [{
	        firstname: 'DJ Supervet',
	        lastname: 'de Draaibaas'
	    }, {
	        firstname: 'Jean-Claude',
	        lastname: 'Van Damme'
	    }, {
	        firstname: 'Keanu',
	        lastname: 'Reeves'
	    }, {
	        firstname: 'Steven',
	        lastname: 'Seagal'
	    }];

	    $scope.toggleLeft = function() {
	        $ionicSideMenuDelegate.toggleLeft();
	    };

	    //sidebar swipe fix
	    document.addEventListener('touchstart', function(event) {
	        // workaround for Android
	        if ($ionicSideMenuDelegate.isOpenLeft() || $ionicSideMenuDelegate.isOpenRight()) {
	            event.preventDefault();
	        }
	    });
})

.controller('CheckinCtrl', function($scope) {
    $scope.showForm = true;

    $scope.shirtSizes = [{
        text: 'Large',
        value: 'L'
    }, {
        text: 'Medium',
        value: 'M'
    }, {
        text: 'Small',
        value: 'S'
    }];

    $scope.attendee = {};
    $scope.submit = function() {
        if (!$scope.attendee.firstname) {
            alert('Info required');
            return;
        }
        $scope.showForm = false;
        $scope.attendees.push($scope.attendee);
    };

})

.controller('AttendeesCtrl', function($scope) {

    $scope.activity = [];
    $scope.arrivedChange = function(attendee) {
        var msg = attendee.firstname + ' ' + attendee.lastname;
        msg += (!attendee.arrived ? ' has arrived, ' : ' just left, ');
        msg += new Date().getMilliseconds();
        $scope.activity.push(msg);
        if ($scope.activity.length > 3) {
            $scope.activity.splice(0, 1);
        }
    };

})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function(chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
    $scope.settings = {
        enableFriends: true
    };
});