(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  var userSigned;
  var menuInfo;

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };

  service.signUpUser = function (user) {
    // console.log("user: ", user.favdish);
    return $http.get(ApiPath + '/menu_items/'+user.favdish+'.json')
    .then(function (response) {
      console.log("then", response.data);
      menuInfo = response.data;
      userSigned = user;
      return true;
    })
    .catch(function (response) {
      // console.log("catch");
      menuInfo = undefined;
      userSigned = undefined;
      return false;
    });
  };

   service.getSignedUser = function () {
     return userSigned;
   };

   service.getMenuInfo = function () {
     return menuInfo;
   };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };

}



})();
