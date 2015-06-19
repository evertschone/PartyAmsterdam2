//angular.module('ionicApp', ['ionic'])
// bootstrap Ionic only after loading the platform
window.ionic.Platform.ready(function() {
    window.setTimeout(function(){
    angular.bootstrap(document, ['ionicApp']);
    }, 10);
});

angular.module('ionicApp', ['ionic', 'ionicApp.controllers', 'ionicApp.services', 'ngOpenFB'])

.run(function($ionicPlatform, ngFB) {
    // inits facebook API with appID (dependancies are declared above)
    ngFB.init({appId: '492752134210657'});

    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
        .state('eventmenu', {
            url: "/app",
            abstract: true,
            templateUrl: "templates/event-menu.html",
            controller: "ListCtrl"
        })
        .state('eventmenu.home', {
            url: "/home",
            views: {
                'menuContent': {
                    templateUrl: "templates/home.html",
                    controller: "ListCtrl"
                }
            }
        })
        .state('eventmenu.checkin', {
            url: "/check-in",
            views: {
                'menuContent': {
                    templateUrl: "templates/check-in.html",
                    controller: "CheckinCtrl"
                }
            }
        })
        .state('eventmenu.attendees', {
            url: "/attendees",
            views: {
                'menuContent': {
                    templateUrl: "templates/attendees.html",
                    controller: "AttendeesCtrl"
                }
            }
        })
        .state('eventmenu.event', {
            url: "/event/:evId",
            views: {
                'menuContent': {
                    templateUrl: "templates/eventdetail.html",
                    controller: "ListCtrl"
                }
            }
        })

    $urlRouterProvider.otherwise("/app/home");
});