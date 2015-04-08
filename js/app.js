/* App Module */

var app = angular.module('marvelReviews', [
  'ngRoute',
    'fbs',
  'marvelAnimations',
  'marvelControllers',
  'marvelServices',
  'marvelComments',
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/movies', {
        templateUrl: 'partials/movie-list.html',
        controller: 'MarvelListCtrl'
      }).
      when('/movies/:movieId', {
        templateUrl: 'partials/movie-single.html',
        controller: 'MarvelDetailCtrl'
      }).
      when('/about', {
        templateUrl: 'partials/about.html',
        controller: 'AboutCtrl'
      }).      
      when('/contact', {
        templateUrl: 'partials/contact.html',
        controller: 'AboutCtrl'
      }).
      otherwise({
        redirectTo: '/movies'
      });
  }]);

app.config(function($sceDelegateProvider) {
  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
  ]);

  // The blacklist overrides the whitelist so the open redirect here is blocked.
  $sceDelegateProvider.resourceUrlBlacklist([
    '/index.html#/movies/**'
  ]);
});

//$(window).scroll(function() {
//    
//if ( ($(window).scrollTop() + 100) < $(document).scrollTop() ) {
//    $('#back-to-top').removeClass('hidden').affix({
//        // how far to scroll down before link "slides" into view
//        offset: {top:100}
//    });
//}      
//    
//});




$(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
        $('#back-to-top').removeClass('hidden').affix({
            offset: {
                top:100
            }
        })
}
    else {  
        // <= 100px from top - hide div
    }
});