var myAppModule = angular.module('myApp',['ngRoute']);
          var rentVolcanos = [];


    myAppModule.config(function($routeProvider, $locationProvider) {
      $routeProvider
        .when('/',{
          templateUrl: './partials/home.html'
        })
        .when('/volcanoHome',{
          templateUrl: './partials/volcanoHome.html'
        })
        .when('/volcanoList',{
          templateUrl: './partials/volcanoList.html'
        })
        .when('/rentVolcano',{
          templateUrl: './partials/rentVolcano.html'
        })
        .when('/snowStore', {
          templateUrl: './partials/snowHome.html'
        })
        .when('/partials', {
          templateUrl: './partials/orders.html'
        })
        .when('/partial2',{
          templateUrl: './partials/customers.html'
        })
        .otherwise({
          redirectTo: '/'
      });

    });


    myAppModule.controller("volcanoController", function ($scope, $location, volcanoFactory){
      volcanoFactory.getVolcanos(function (data) {
        $scope.volcanos = data;
        console.log('getvolcano');
      });
      $scope.addStudent = function (){
        volcanoFactory.addvolcano($scope.newVolcano, function (data){
          volcanoFactory.getVolcanos(function (data){
          $scope.volcanos = data;
          })
          $scope.newVolcano = {};
        });
      };
      $scope.showDetails = function(index){
        console.log('id');
        rentVolcanos = $scope.volcanos.splice($scope.volcanos.indexOf(index), 1);

        $location.path('/rentVolcano');
      }

      $scope.go = function (path) {
        $location.path(path);
        };
    });

    myAppModule.controller("rentVolcanoController", function ($scope,$location, volcanoFactory){
        $scope.volcanos = rentVolcanos;
        $scope.modalShown = false;
        $scope.toggleModal = function() {
          $scope.modalShown = !$scope.modalShown;
        };
      
    });

    myAppModule.factory('volcanoFactory', function($http){
      var factory = {};
      var volcanos = [];
      var rentVolcanos = [];

      factory.getVolcanos = function (callback){
        console.log('factory getVolcanos')
        $http.get('/data').success(function (output) {
          console.log('get');
          volcanos = output;
          console.log(volcanos);
          callback(volcanos);
        })    
        }
  
      factory.addvolcano = function(info, callback){
       console.log('add', info);
       $http.post('/add', info).success(function (output){
       callback(output);
       })
      }

      return factory;
    });

    myAppModule.directive('modalDialog', function() {
      return {
      restrict: 'E',
      scope: {
        show: '='
      },
      replace: true, // Replace with the template below
      transclude: true, // we want to insert custom content inside the directive
      link: function(scope, element, attrs) {
        scope.dialogStyle = {};
        if (attrs.width)
          scope.dialogStyle.width = attrs.width;
        if (attrs.height)
          scope.dialogStyle.height = attrs.height;
        scope.hideModal = function() {
          scope.show = false;
        };
        
      },
      template: "<div class='ng-modal' ng-show='show'><div class='ng-modal-overlay' ng-click='hideModal()'></div><div class='ng-modal-dialog' ng-style='dialogStyle'><div class='ng-modal-close' ng-click='hideModal()'>X</div><div class='ng-modal-dialog-content' ng-transclude></div></div></div>"
      };
    });

    //Snow Store

    myAppModule.controller('customerController', function ($scope, $location, studentFactory){
      //  initialize an empty array so $scope.students maintains a consistent data type
      console.log('customerController');
      // $scope.students = [];
      // run the getStudents method and set $scope data in the callback
      studentFactory.getStudents(function (data){
        $scope.students = data;
        console.log('studentFactory.getStudents');
      });
      $scope.removeCustomer = function (id){
        console.log('remove');
        studentFactory.removeCustomer(id, function (data){
          studentFactory.getStudents(function (data){
            $scope.students = data;
          })
        })
      }
      $scope.addStudent = function (){
        studentFactory.addfriend($scope.newStudent, function(data){
          studentFactory.getStudents(function (data){
            $scope.students = data;
          })
          $scope.newStudent = {};
        });
      };

		$scope.go = function (path) {
			$location.path(path);
		};
    });

    myAppModule.factory('studentFactory', function($http){
      // a factory is nothing more than a function that returns an object literal!
      console.log('were in the student factory');
      var factory = {};
      var students = [];
      factory.getStudents = function (callback){
        console.log('deeper in get students');
        $http.get('/friends').success(function (output){
          console.log('http get');
          students= output;
          callback(students);
        })
      }
      factory.getOrders = function (callback){
        console.log('get order');
        $http.get('/orders').success(function (output){
        orders = output;
        callback(orders);
        })
      }
      factory.removeCustomer = function(info, callback){
        console.log('remove', info);
        $http.post('/remove', {_id: info}).success(function (output){
          callback(output);
        })
      }
      factory.addfriend = function(info, callback){
        console.log('add', info);
        $http.post('/add', info).success(function (output){
          callback(output);
        })
      }
      factory.addOrders = function (info, callback){
        console.log('add order', info);
        $http.post('/addOrder', info).success(function (output){
          callback(output);
        })
      }
      factory.removeOrder = function(info, callback){
        console.log('remove O', info);
        $http.post('/removeOrder', {_id: info}).success(function (output){
          callback(output);
        })
      }
      // most important step: return the object so it can be used by the rest of our angular code
      return factory
    });


    myAppModule.controller('ordersController', function ($scope, studentFactory){
       console.log('ordersController');
      // $scope.orders = [];
      // run the getStudents method and set $scope data in the callback
      studentFactory.getOrders(function (data){
        $scope.orders = data;
        console.log('studentFactory.getOrders');
      });
      studentFactory.getStudents(function (data){
        $scope.students = data;
        console.log('studentFactory.getStudents');
      });

      $scope.addOrder = function (){
        studentFactory.addOrders($scope.newStudent, function(data){
          studentFactory.getStudents(function (data){
            $scope.students = data;
          })
          studentFactory.getOrders(function (data){
            $scope.orders = data;
          });
          $scope.newOrder = {};
        });
      };
      $scope.removeOrder = function (id){
        console.log('remove order');
        studentFactory.removeOrder(id, function (data){
          studentFactory.getStudents(function (data){
            $scope.students = data;
          })
          studentFactory.getOrders(function (data){
            $scope.orders = data;
          });
          $scope.newOrder = {};
        });
      };
    });