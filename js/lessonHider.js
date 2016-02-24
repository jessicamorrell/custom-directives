angular.module('directivePractice')
.directive('lessonHider', function() {
	return {
		restrict: 'E',
		templateUrl: 'lessonHider.html',
		scope: {
			lesson: '=',
			dayAlert: '&',
		},
		link: function(scope, element, attrs) {
			scope.getSchedule.then(function( response ) {
                scope.schedule = response.data;

                scope.schedule.forEach(function(day) {
                	if(day.lesson === scope.lesson) {
                		element.css('text-decoration', 'line-through');
                		scope.lessonDay = day.weekday;
                		return;
                	}
                })
                scope.toggleLesson = function() {
                	//element.on('mousedown', function() {
                	scope.strike = false;
                	element.on('click', function() {
                		if (scope.strike === false) {
                			element.css('text-decoration', 'line-through');
                			scope.strike = true;
                		} else if (scope.strike === true) {
	                		element.css('text-decoration', 'none');
	                		scope.strike = false;
                		}
                	})
	                // else if (scope.strike === true) {
	                // 	element.on('click', function() {
	                // 		element.css('text-decoration', 'none');
	                // 	}) 
	                // 	scope.strike = false;
	                // }
                	// scope.strike = false;
                	// element.on('mousedown', function() {
                	// 	scope.strike = true;
                	// })
                	// if (scope.strike === true) {
                	// 	element.css('text-decoration', 'line-through');
                	// 	return;
                	// }
                }
                scope.removeLesson = function() {
                	element.on('click', function() {
                		element.css('display', 'none');
                		//element.toggle()
                	})
                	// element.click('function(){
                	// 	element.css('display', 'none');
                	// }')
                }
            });
		},
		controller: function($scope, lessonService) {
			$scope.getSchedule = lessonService.getSchedule();

		}
	}
})