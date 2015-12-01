/*! angular-liferay-base - 2015-12-01 */
(function(angular, Liferay){
'use strict';

Liferay.Portlet.ready(function(portletInstanceId, node) {
	var portletNode = node.one('.liferay-ng-app');
	if (portletNode) {
		var domNode = portletNode.getDOMNode();
		var ngModules = [];
		if (domNode && domNode.dataset && domNode.dataset.ngModules) {
			ngModules = domNode.dataset.ngModules.split(' ');
			if (ngModules.length === 1 && ngModules.length[0] === '') {
				
				
				ngModules = [];
			}
		} else {
			
			
		}
		try {
			angular.bootstrap(domNode, ngModules);
		} catch (err) {
			
			
			
			
			
			
		}
	}
});
;
'use strict';

angular.module('angular-liferay-base', []);
;
'use strict';

angular.module('angular-liferay-base').value('liferayAuthToken', Liferay.authToken);
;
'use strict';

angular.module('angular-liferay-base').value('liferayBrowser', Liferay.Browser);
;
'use strict';

angular.module('angular-liferay-base').factory('liferayService', ["$q", "liferayAuthToken", function($q, liferayAuthToken) {
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
}]);
;
'use strict';

angular.module('angular-liferay-base').value('liferayThemeDisplay', Liferay.ThemeDisplay);
;
'use strict';

angular.module('angular-liferay-base').value('liferay', Liferay);
;
'use strict';

angular.module('angular-liferay-base').constant('portletConfigService', {});

angular.module('angular-liferay-base').directive('portletConfig', ["portletConfigService", function(portletConfigService) {
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
}]);

}(angular, Liferay));