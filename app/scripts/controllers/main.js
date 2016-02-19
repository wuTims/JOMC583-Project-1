'use strict';

/**
 * @ngdoc function
 * @name senateApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the senateApp
 */

angular.module('senateApp')
  .controller('SenateCtrl', ['$http', function ($http) {
    var _this = this;
    var clicked = false;
    var sortOrder = "state";
    var myFilter = {}

    this.applyFilter = function(value) {
    	this.myFilter = {open:value};
    }

    this.order = function(order){
    	this.sortOrder = order;
  	};

  	this.revertAll = function(){
  		this.myFilter = {};
  		this.sortOrder = "state";
  	}

	$http.get("scripts/senators.json")
		.success(function(data){
			_this.senators = data['senators'];
			_this.states = data['states'];
		})
		.error(function(error){
			console.log("Request failed");
		});

	this.filterByState = function(state, senator){
		return function(senator){
			return senator.state == state;
		}
	}
	this.filterByStateIncum = function(state, senator){
		return function(senator){
			return (senator.state == state && senator.senator_class == "class3");
		}
	}
  }])
  .directive('closedStates', function(){
  	return {
  		restrict: 'E',
  		templateUrl: 'views/closed-states.html'
  	};
  })
  .directive('openStates', function(){
  	return {
  		restrict: 'E',
  		templateUrl: 'views/open-states.html'
  	};
  });
