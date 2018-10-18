sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/suite/ui/commons/demokit/tutorial/icecream/12/model/models"
], function(UIComponent, JSONModel, models) {
	"use strict";

	return UIComponent.extend("sap.suite.ui.commons.demokit.tutorial.icecream.12.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			var that = this;
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");

			// create the views based on the url/hash
			this.getRouter().initialize();
			console.log(this);
			
			//fetch data onInit, and every subsequent 5 minutes
			this.refreshData();
			setInterval(this.refreshData.bind(this), 300000)
			
		},
		createContent: function() {
			// create root view
			return sap.ui.view("AppView", {
				viewName: "sap.suite.ui.commons.demokit.tutorial.icecream.12.view.App",
				type: "XML"
			});
		},
		refreshData: function() {
			var stockModel = new sap.ui.model.json.JSONModel();
			var weatherModel = new sap.ui.model.json.JSONModel();
			stockModel.loadData('https://api.iextrading.com/1.0/stock/acn/quote');
			weatherModel.loadData('https://api.openweathermap.org/data/2.5/weather?zip=22303, US&APPID=43be971539236e44b50a19eeebb39b95');

			this.setModel(stockModel, 'stockinfo');
			this.setModel(weatherModel, 'weatherInfo')

			//just to see what the stock data looks like
			stockModel.attachRequestCompleted(function() {
				var stockData = stockModel.getData();
				console.log('stock data', stockData);
			});		
		}
	});
});

// Kunal: FLP acts as a component container. Which manages and loads the apps 
// by loading the corresponding component (ie: this file) of each app. 
// Components are independent and reusable parts of a UI5 application.