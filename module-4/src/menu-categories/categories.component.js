(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/menu-categories/templates/categories.template.html',
  bindings: {
    items: '<'
  }
});

})();
