(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['MenuService'];
function RegistrationController(MenuService) {
  var reg = this;

  reg.submit = function () {
    // console.log("reg controller: ", reg.user.lastname);
    var promise = MenuService.signUpUser(reg.user);
    promise.then(function (response) {
      // console.log("then controller: ", response);
      reg.completed = response;
      reg.errorMsg = !response;
    }).catch(function (response) {
      // console.log("catch controller: ", response);
      reg.completed = false;
      reg.errorMsg = true;
    });
  };

  reg.getSignedUser = function () {
    // console.log(MenuService.getSignedUser());
    return MenuService.getSignedUser();
  }
  reg.getMenuInfo = function () {
    // console.log(MenuService.getSignedUser());
    return MenuService.getMenuInfo();
  }
}

})();
