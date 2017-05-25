'use strict';

var app = angular.module('wikiSearch', []);
app.controller('mainCtrl', function($scope, $http, $timeout) {
  var input = $('input');
  $scope.view1 = true;
  $scope.results = [];

  $('#btnLucky').click(function() {
    
    var api = 'https://en.wikipedia.org/wiki/Special:Random';
    var cb = '&callback=JSON_CALLBACK';
    $http.jsonp(api + title + cb)
         .success(function(data) {
          $scope.results = data.query.pages;
          $scope.view2 = true;
          console.log('random: ' + $scope.results);
          });
  });

  $scope.search = function() {
    var title = input.val();
    if (!title) {
      return;
    }
    var api = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch=';
    var cb = '&callback=JSON_CALLBACK';
    var page = 'https://en.wikipedia.org/?curid=';
    $scope.view1 = false;

    $http.jsonp(api + title + cb)
      .success(function(data) {
        $scope.results = data.query.pages; 
        $scope.view2 = true;
        console.log('search res: ' + $scope.results);
      });
  };

  $scope.clearView = function() {
    $scope.view1 = true;
    $scope.view2 = false;
    $scope.results = [];
    $scope.searchText = null;
  };

});