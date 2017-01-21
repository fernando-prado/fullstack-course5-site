(function () {
'use strict';


angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;
  toBuyList.items = ShoppingListCheckOffService.getToBuyItems();

  toBuyList.buyIt = function (itemIndex) {
    ShoppingListCheckOffService.buyIt(itemIndex);
  };
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;
  boughtList.items = ShoppingListCheckOffService.getBoughtItems();
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items to buy
  var toBuyItems = fillToBuyItems();
  /*
  for (var i = 0; i < 3; i++) {
    toBuyItems[i] = {
      name: "ITEM_"+(i+1),
      quantity: (i+1)*10
    };
  }
  */
  //List of items already bought
  var boughtItems = [];

  service.buyIt = function (itemIndex) {
    var boughtItem = toBuyItems[itemIndex]

    toBuyItems.splice(itemIndex, 1);
    boughtItems.push(boughtItem);
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.getToBuyItems = function () {
    return toBuyItems;
  };

  function fillToBuyItems() {
    return [{name: "Cookies" , quantity: 2},{name: "Apples" , quantity: 3},{name: "Bananas" , quantity: 3},{name: "Coconut Water Bottles" , quantity: 4}];
  }

}

})();
