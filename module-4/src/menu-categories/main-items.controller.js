(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsCategoryController', ItemsCategoryController);

ItemsCategoryController.$inject = ['citems'];
function ItemsCategoryController(citems) {
  var itemsList = this;
  itemsList.citems = citems;
}

})();
