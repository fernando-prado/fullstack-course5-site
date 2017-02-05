(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$http']
function MenuDataService($q, $http) {
  var service = this;

  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/categories.json"
    });
  };

  service.getItemsForCategory = function (entryCategory) {
    //https://davids-restaurant.herokuapp.com/menu_items.json?category=L
    console.log('Entry Param', entryCategory);
    var urlPrep = "https://davids-restaurant.herokuapp.com/menu_items.json?category="+entryCategory;
    console.log('urlPrep', urlPrep);
    return $http({
      method: "GET",
      url: urlPrep
    });
  };


  // // List of shopping items
  // var items = [];
  //
  // // Pre-populate a no cookie list
  // items.push({
  //   id: 81,
  //   short_name: "L",
  //   name: "Lunch",
  //   special_instructions: "Sunday-Friday 11:15am-3:00pm. Served with your choice of rice (Vegetable Fried RIce, Steamed Rice, Brown Rice), AND EITHER soup (Hot & Sour, Wonton, Vegetable, Egg Drop, Chicken Corn Soup) OR veggie egg roll. $1.00 extra to have both soup and egg roll.",
  //   url: "https://davids-restaurant.herokuapp.com/categories/81.json"
  // });
  // items.push({
  //   id: 82,
  //   short_name: "A",
  //   name: "Soup",
  //   special_instructions: "",
  //   url: "https://davids-restaurant.herokuapp.com/categories/82.json"
  // });
  // items.push({
  //   id: 83,
  //   short_name: "B",
  //   name: "Appetizers",
  //   special_instructions: "",
  //   url: "https://davids-restaurant.herokuapp.com/categories/83.json"
  // });
  //
  // var citems = [];
  // citems.push({
  //   id: 1069,
  //   short_name: "L1",
  //   name: "Orange Chicken",
  //   description: "chunks of chicken, breaded and deep-fried with sauce containing orange peels; white meat by request: for pint $1 extra, for large $2 extra",
  //   price_small: null,
  //   price_large: 9.75,
  //   small_portion_name: null,
  //   large_portion_name: null
  // });
  // citems.push({
  //   id: 1070,
  //   short_name: "L2",
  //   name: "General Tso's Chicken",
  //   description: "chunks of chicken, breaded and deep-fried with sauce and scallions; white meat by request: for pint $1 extra, for large $2 extra",
  //   price_small: null,
  //   price_large: 9.75,
  //   small_portion_name: null,
  //   large_portion_name: null
  // });
  //
  // // Returns a promise, NOT items array directly
  // service.getAllCategoriesMock = function () {
  //   var deferred = $q.defer();
  //   deferred.resolve(items);
  //   return deferred.promise;
  // };
  //
  // // Returns a promise, NOT items array directly
  // service.getItemsForCategoryMock = function (entryCategory) {
  //   console.log('Entry Param', entryCategory);
  //   var deferred = $q.defer();
  //   deferred.resolve(citems);
  //   return deferred.promise;
  // };

}

})();
