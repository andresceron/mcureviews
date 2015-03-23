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
    
    
    var ref1 = new Firebase("https://ajsflako.firebaseio.com/reviews");
    
//        ref1.authWithOAuthPopup("facebook", function(error, authData) {
//    if (error) {
//    console.log("Login Failed!", error);
//    } else {
//    console.log("Authenticated successfully with payload:", authData);
//  }
//});
    
//    ref1.createUser({
//        email    : "bobtony@firebase.com",
//        password : "correcthorsebatterystaple"
//        }, function(error, userData) {
//    if (error) {
//        console.log("Error creating user:", error);
//    } else {
//        console.log("Successfully created user account with uid:", userData.uid);
//  }
//});
