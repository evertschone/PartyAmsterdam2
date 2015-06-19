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

.factory('Events', ['$http',function($http){
   return {
       all: function(callback){
            $http.get(
                'js/libs/parties.xml',
                {transformResponse:function(data) {
                  // convert the data to JSON and provide
                  // it to the success function below
                    var x2js = new X2JS();
                    var json = x2js.xml_str2json( data );
                    return json;
                    }
                }
            ).
            success(function(data, status) {
                // send the converted data back
                // to the callback function
                callback(data);
            })
       }
   }
}])

.factory('EventsNopromise', ['$http', function($http) {
  // Might use a resource here that returns a JSON array


  function getXml(){
                //var xmlUrl = 'http://partyflock.nl/feed/agenda/city/1.xml'
                var xmlUrl = 'js/parties.xml'
                $http.get(
                    xmlUrl,
                    {transformResponse:function(data) {
                      // convert the data to JSON and provide
                      // it to the success function below
                        var x2js = new X2JS();
                        var json = x2js.xml_str2json( data );
                        return json;
                        }
                    }
                ).
                success(function(data, status) {
                    // send the converted data back
                    // to the callback function
                    jsonFile = data;
                    return data;
                })
           };

  
  //console.log('XMLFILE>?' + xmlFile)

  return {
    all: function() {
      var jsonFile = getXml();
      //console.log('data Events?' +  JSON.stringify(jsonFile) );
      return jsonFile;
    },
    remove: function(event) {
      jsonFile.splice(jsonFile.entry.indexOf(event), 1);
    },
    get: function(eventId) {
      for (var i = 0; i < jsonFile.length; i++) {
        if (jsonFile[i].id == eventId) {
          return jsonFile[i];
        }
      }
      return null;
    }
  };

}])


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