(function () {
'use strict';

angular.module('LunchChecker', [])
.controller('LunchCheckerController', LunchCheckerController);

LunchCheckerController.$inject = ['$scope', '$filter'];
function LunchCheckerController($scope, $filter) {
  $scope.lunch_menu = "";
  $scope.lunch_menu_message = "";

  $scope.checkLunchMenu = function () {
    var lunch_menu = $scope.lunch_menu;
    if (lunch_menu == "") {
      $scope.lunch_menu_message = "Please enter data first";
      return;
    }
    var lunch_menu_a = lunch_menu.split(',');
    if (lunch_menu_a.length <= 3) {
      $scope.lunch_menu_message = "Enjoy!";
    } else {
      $scope.lunch_menu_message = "Too much!";
    }
  };

}

})();
