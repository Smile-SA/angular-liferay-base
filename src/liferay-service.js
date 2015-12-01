'use strict';

angular.module('angular-liferay-base').factory('liferayService', function($q, liferayAuthToken) {
	var api = {};

	api.call = function(url, data) {
		var deferred = $q.defer();
		if (!data) {
			data = {};
		}
		angular.extend(data, {
			'p_auth': liferayAuthToken
		});
		Liferay.Service(url, data, function(result, result2) {
			// Liferay javascript API is not great, there are multiple ways to write callback management :
			// https://gist.github.com/marclundgren/91ed22ef06fc3098e885
			if (result2) {
				deferred.reject(result2);
			} else {
				deferred.resolve(result);
			}
		});
		return deferred.promise;
	};

	return api;
});
