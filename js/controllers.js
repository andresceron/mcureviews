/* Controllers */

var marvelControllers = angular.module('marvelControllers', []);

marvelControllers.controller('MarvelListCtrl', ['$scope', 'Movie',
  function($scope, Movie) {
    $scope.movies = Movie.query();
    $scope.orderProp = 'rating';
    $scope.orderProp = 'age';
    
  }]);

marvelControllers.controller('MarvelDetailCtrl', ['$scope', '$routeParams', 'Movie', '$rootScope', '$location',
  function($scope, $routeParams, Movie, $rootScope, $location) {
    $scope.movie = Movie.get({movieId: $routeParams.movieId}, function(movie) {
      $scope.mainImageUrl = movie.images;
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
    
    $rootScope.currentPage;
    
    var history = [];
    /**
     * Get the previous location hash
     */
    $rootScope.$on('$routeChangeSuccess', function() {
        history.push($location.$$path);
        $rootScope.currentPage = history.slice(-1)[0];
    });
    
    /**
     * If previous location hash's length
     * is longer than 1, remove both indexes
     * and change location hash to the previous one
     */
    $rootScope.back = function() {
        var previousUrl = history.length > 1 ? history.splice(-2)[0] : "/movies/";
        $location.path(previousUrl);
    };
    
    
  }]);

marvelControllers.controller('StoreController', ['$http', '$routeParams', function($http, $routeParams){
    var detail = this;
      detail.products = [];
      $http.get('movies/' + $routeParams.movieId + '.json').success(function(data){
          detail.products = data;
      });
  }]);


marvelControllers.controller('SliderController', function($scope) {
  $scope.images = [{
    src: '../img/design/slide1.jpg',
  }, {
    src: '../img/design/slide2.jpg',
  }, {
    src: '../img/design/slide3.jpg',
  }, {
    src: '../img/design/slide4.jpg',
  }, {
    src: '../img/design/slide5.jpg',
  }, {
    src: '../img/design/slide6.jpg',
  }];
});


