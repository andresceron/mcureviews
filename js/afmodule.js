      var myApp = angular.module("fbs", ["firebase"]);

     myApp.controller('fbReview', ['$scope', '$firebase', '$routeParams',
        function($scope, $firebase, $routeParams) {
          //CREATE A FIREBASE REFERENCE
          var ref = new Firebase("https://ajsflako.firebaseio.com/reviews/movies/"+$routeParams.movieId);

          // GET MESSAGES AS AN ARRAY
          $scope.messages = $firebase(ref).$asArray();

          //ADD MESSAGE METHOD
          $scope.addMessage = function(e) {
              
          var createdOn = Date.now();    
              
            //LISTEN FOR RETURN KEY
            $scope.submit = function () {
              //ALLOW CUSTOM OR ANONYMOUS USER NAMES
              var author = $scope.author;
              var stars = $scope.stars;

              //ADD TO FIREBASE
              $scope.messages.$add({
                stars: $scope.stars,
                author: $scope.author,
                comment: $scope.body,
                createdOn: createdOn
              });

              //RESET MESSAGE
              $scope.stars = "";
              $scope.author = "";
              $scope.body = "";
            }
          }
        }
      ]);
    
    
	myApp.controller('MainCtrl', ['$scope', '$firebase', '$firebaseAuth', '$location',
        function($scope, $firebase, $firebaseAuth, $location) {
        
        $firebaseAuth(new Firebase("https://ajsflako.firebaseio.com/reviews").$onAuth(function(authData) {
         
          $scope.authenticatedUserDetails = authData;
          
          if (!authData) {
            $location.path('/');
          }
        }
     ))}]);

	myApp.controller('LoginCtrl', ['$scope', '$firebase', '$location',
        function($scope, $firebase, $location) {
          
        $scope.login = function() {
            console.log('funkar');

          var ref1 = new Firebase("https://ajsflako.firebaseio.com/reviews");

          ref1.authWithOAuthPopup("facebook", function(error, authData) {
           if (error) {
             $scope.error = 'Something went wrong';   
           }
           else {
             $location.path('/movies'); 
           }
        }
     )}}]);
