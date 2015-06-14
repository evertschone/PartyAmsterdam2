angular.module('ionicApp.services', [])

.directive('slideAlong', function($timeout, $ionicSideMenuDelegate) {
    return  {
        link: function($scope, $element, $attrs) {
            $scope.$watch(function() {
                return $ionicSideMenuDelegate.getOpenRatio();
            }, function(ratio) {

                // retrieve the offset value from the offset attribute
                var offset = parseInt($attrs.offset);
                // set the new position
                var position = $attrs.side == 'left' ? (ratio * (offset * -1)) + (offset) : (ratio * (offset * -1) - offset);

                // we want to set the transition to 500ms (arbitrary) when 
                // clicking/tapping and 0ms when swiping
                $element[0].style.webkitTransition = (ratio === 0 || ratio === 1 || ratio === -1) ? '500ms' : '0ms';

                // we set the offset according to the current ratio
                $element[0].style.webkitTransform = 'translate3d(' + position + '%, 0, 0)';

            });
        }
    };
})

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  }, {
    id: 2,
    name: 'Andrew Jostlin',
    lastText: 'Did you get the ice cream?',
    face: 'https://pbs.twimg.com/profile_images/491274378181488640/Tti0fFVJ.jpeg'
  }, {
    id: 3,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 4,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
