/* Directives */

var app = angular.module('marvelComments', []);

app.directive('movieTitles', function(){
    return { 
        restrict: 'E',
        templateUrl: 'partials/movie-title.html'
    };
});

  app.directive('moviePanels', function(){
    return { 
        restrict: 'E',
        templateUrl: 'partials/movie-panels.html',
        controller: function(){
            this.tab = 1;
            this.selectTab = function(setTab) {
                this.tab = setTab; 
            };
            this.isSelected = function(checkTab){
                return this.tab === checkTab;
                };
            },
        controllerAs: 'panel',
    };
});

  app.directive('movieReview', function(){
    return {
        restrict: 'E',
        templateUrl: 'partials/movie-review.html',
        controller: function(){
            this.review = {};

            this.addReview = function(product) {
                this.review.createdOn = Date.now();
                product.reviews.push(this.review);
                this.review = {};
            };
        },
        controllerAs: 'reviewCtrl'
    };
});

  app.directive('movieDetails', function(){
    return { 
        restrict: 'E',
        templateUrl: 'partials/movie-details.html'
    };
});


app.directive('slider', function ($timeout) {
  return {
    restrict: 'AE',
	replace: true,
	scope:{
		images: '='
	},
    link: function (scope, elem, attrs) {
	
		scope.currentIndex=0;

		scope.next=function(){
			scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
		};
		
		scope.prev=function(){
			scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
		};
		
		scope.$watch('currentIndex',function(){
			scope.images.forEach(function(image){
				image.visible=false;
			});
			scope.images[scope.currentIndex].visible=true;
		});
		
		/* Start: For Automatic slideshow*/
		
		var timer;
		
		var sliderFunc=function(){
			timer=$timeout(function(){
				scope.next();
				timer=$timeout(sliderFunc,5000);
			},5000);
		};
		
		sliderFunc();
		
		scope.$on('$destroy',function(){
			$timeout.cancel(timer);
		});
		
		/* End : For Automatic slideshow*/
		
    },
	templateUrl:'partials/slider.html'
  }
});