'use strict';

Liferay.Portlet.ready(function(portletInstanceId, node) {
	var portletNode = node.one('.liferay-ng-app');
	if (portletNode) {
		var domNode = portletNode.getDOMNode();
		var ngModules = [];
		if (domNode && domNode.dataset && domNode.dataset.ngModules) {
			ngModules = domNode.dataset.ngModules.split(' ');
			if (ngModules.length === 1 && ngModules.length[0] === '') {
				console.log('There is a .liferay-ng-app block and there is an empty data-ng-module on it !');
				console.log('We will not use any dependencies');
				ngModules = [];
			}
		} else {
			console.log('There is a .liferay-ng-app block but there is no data-ng-module on it !');
			console.log('We will not use any dependencies');
		}
		try {
			angular.bootstrap(domNode, ngModules);
		} catch (err) {
			console.error('error while initializing Angular app', err);
			console.error('*** portletInstanceId', portletInstanceId);
			console.error('*** node', node);
			console.error('*** portletNode', portletNode);
			console.error('*** domNode', domNode);
			console.error('*** ngModules', ngModules);
		}
	}
});
