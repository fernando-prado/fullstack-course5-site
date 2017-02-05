(function () {
'use strict';

angular.module('MenuApp')
.component('items', {
  templateUrl: 'src/menu-categories/templates/items.template.html',
  bindings: {
    citems: '<'
  }
});

})();
