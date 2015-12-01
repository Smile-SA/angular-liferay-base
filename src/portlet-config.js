'use strict';

angular.module('angular-liferay-base').constant('portletConfigService', {});

angular.module('angular-liferay-base').directive('portletConfig', function(portletConfigService) {
	return {
		restrict: 'A',
		compile: function(elem) {
			var config;
			var configTxt = elem.text();
			if (configTxt && configTxt.length > 2) {
				config = angular.fromJson(configTxt);
				angular.forEach(config, function(value, key) {
					portletConfigService[key] = value;
				});
			}
		}
	};
});
