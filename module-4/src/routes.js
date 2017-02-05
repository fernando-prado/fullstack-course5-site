(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu-categories/templates/home.template.html'
  })

  // Categories list page
  .state('mainList', {
    //url: '/main-list',
    url: '/categories',
    templateUrl: 'src/menu-categories/templates/main-categories.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
      items: ['MenuDataService', function (MenuDataService) {
        //return MenuDataService.getAllCategoriesMock();
        return MenuDataService.getAllCategories()
        .then(function (result) {
          return result.data;
        });
      }]
    }
  })

  // items list page
  //TODO make it nest of mainList (OPCIONAL)
  .state('itemsList', {
    //url: '/items-list/{itemId}',
    url: '/items/{itemId}',
    templateUrl: 'src/menu-categories/templates/main-items.template.html',
    controller: 'ItemsCategoryController as itemsList',
    resolve: {
      citems: ['$stateParams', 'MenuDataService',
        function ($stateParams, MenuDataService) {
        return MenuDataService.getItemsForCategory($stateParams.itemId)
        .then(function (result) {
          return result.data.menu_items;
        });
      }]
    }
  })


}

})();
