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
    narrowList.title = "NarrowList";
    narrowList.errorMessage = "";

    if (!narrowList.searchTerm) {
      narrowList.found = [];
      narrowList.errorMessage = "Nothing found";
      return;
    }

    var promise = MenuSearchService.getMatchedMenuItems(narrowList.searchTerm);

    promise.then(function (response) {
      narrowList.found = response;
      if (!narrowList.found.length) {
        narrowList.errorMessage = "Nothing found";
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

  };

  narrowList.removeItem = function (itemIndex) {
    narrowList.found.splice(itemIndex, 1);
    if (!narrowList.found.length) {
      narrowList.title = "";
      //narrowList.errorMessage = "Nothing found";
    }
  };

}

MenuSearchService.$inject = ['$http'];
function MenuSearchService($http) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    //https://davids-restaurant.herokuapp.com/menu_items.json.
    return $http({
      method: "GET",
      url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
    }).then(function (result) {
      var returnedItems = result.data.menu_items;
      var foundItems = narrowItems(returnedItems, searchTerm);
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
