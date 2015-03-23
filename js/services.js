/* Services */

var marvelServices = angular.module('marvelServices', ['ngResource']);

marvelServices.factory('Movie', ['$resource',
  function($resource){
    return $resource('movies/:movieId.json', {}, {
      query: {method:'GET', params:{movieId:'movies'}, isArray:true}
    });
  }]);
