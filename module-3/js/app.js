(function () {
'use strict';


angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      myTitle: '@title',
      errorMessage: '@errorMessage',
      onRemove: '&',
      found: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'narrowList',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrowList = this;

  narrowList.searchTerm = "";
  narrowList.errorMessage = "";

  narrowList.narrowIt = function () {
    console.log("inside controller - calling MenuSearchService.getMatchedMenuItems");
    console.log("term:" + narrowList.searchTerm);

    narrowList.title = "NarrowList";
    narrowList.errorMessage = "";

    if (!narrowList.searchTerm) {
      narrowList.found = [];
      narrowList.errorMessage = "Nothing found";
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(narrowList.searchTerm);

    promise.then(function (response) {
      console.log("contoller promise then");
      console.log('controller then length'+ response.length);
      narrowList.found = response;
      console.log("controller - narrowList.found");
      if (!narrowList.found.length) {
        narrowList.errorMessage = "Nothing found";
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

  };

  narrowList.removeItem = function (itemIndex) {
    console.log("removendo item "+itemIndex);
    narrowList.found.splice(itemIndex, 1);
    console.log("item removido");
    if (!narrowList.found.length) {
      narrowList.errorMessage = "Nothing found";
    }
  };

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    //https://davids-restaurant.herokuapp.com/menu_items.json.
    console.log('calling API');
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (result) {
      console.log('API RETURNED');
      var returnedItems = result.data.menu_items;
      console.log('API DATA LENGTH ' + returnedItems.length);
      console.log('API PROCESSING FOR ' + searchTerm);
      var foundItems = narrowItems(returnedItems, searchTerm);
      // process result and only keep items that match

      // return processed items WRAPPED IN A PROMISE
      return foundItems;
    });
  };

  function narrowItems(list, searchTerm) {
    var returnList = []
    for (var i = 0; i < list.length; i++) {
      if (list[i] && list[i].description.toLowerCase().indexOf(searchTerm) !== -1) {
        returnList.push(list[i]);
      }
    }
    return returnList;
  }
}

})();
