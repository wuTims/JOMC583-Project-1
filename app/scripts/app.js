'use strict';

// Declare app level module which depends on views, and components
(function(){
  var app = angular.module('senateApp', ['ngAnimate', 'ngRoute', 'ui.bootstrap']);
  app.config(function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/app.html',
          controller: 'SenateCtrl',
          controllerAs: 'senateCtrl'
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: 'about'
        })
        .otherwise({
          redirectTo: '/'
        });
  });
  app.animation('.slide-toggle', ['$animateCss', function($animateCss) {
        return {
            addClass: function(element, className, doneFn) {
                if (className == 'ng-hide') {
                    var animator = $animateCss(element, {                    
                        to: {height: '0px', opacity: 0}
                    });
                    if (animator) {
                        return animator.start().finally(function() {
                            element[0].style.height = '';
                            doneFn();
                        });
                    }
                }
                doneFn();
            },
            removeClass: function(element, className, doneFn) {
                if (className == 'ng-hide') {
                    var height = element[0].offsetHeight;
                    var animator = $animateCss(element, {
                        from: {height: '0px', opacity: 0},
                        to: {height: height + 'px', opacity: 1}
                    });
                    if (animator) {
                     return animator.start().finally(doneFn);
                    }
                }
                doneFn();
            }
        };
    }]);

})();

