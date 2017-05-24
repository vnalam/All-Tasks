var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(function($routeProvider) {
    $routeProvider
        .when('/create', {
            templateUrl: 'create.html',
            controller: 'CreateCtrl'
        })
		.when('/retrieve', {
            templateUrl: 'retrieve.html',
            controller: 'RetrieveCtrl'
        })
        .otherwise({
            redirectTo: '/create'
        });
});

mainApp.controller('CreateCtrl', function($scope, $http, $window) {
    $scope.insertData = function() {
        var eName =$scope.eName;
        var eEmail = $scope.eEmail;
		var salary =$scope.salary;
		$window.alert(eEmail);
   
        $http.post("http://localhost:3000/api/insert", {

      
            "ename": eName,
            "email": eEmail,
			"salary": salary
         
        }).then(function(response) {
            if (response.data.error == undefined) {
                $window.alert('Data Inserted Successfully!!');
            } else {
                $window.alert('Sorry insertion failed. Check your mail !!');

            }
        })

    }
});
mainApp.controller('RetrieveCtrl', function($scope, $http, $window,$rootScope) {
    $scope.getList = function() {
        var salary = $scope.salary;
		alert(salary)
        $http.post("http://localhost:3000/api/retrieve",{"salary":salary}).then(function(response) {
            
			if (response.data.error!=0) {
                
				alert(response.data.output)
				$scope.data=response.data.output;
				
            } else {
                $window.alert('Please Check Entered ID');

            }
        });
    }
    
	//update data
	$scope.update = function() {
		
		 var eName = $scope.eName;
        var eEmail = $scope.eEmail;
		var salary = $scope.salary;
		alert(eName)
		alert(eEmail)
        
        $http.post("http://localhost:3000/api/update", {
            "name": eName,
            "email": eEmail,
			"salary":salary
        }).then(function(response) {
          if (response.data.result!=0) {
              $window.alert('Data Updated Successfully!!');
              $window.alert(JSON.stringify(response));
          } else {
              $window.alert('update failed. Check your mail !!');
          }
        })
    }
});