requirejs.config({
    baseUrl: 'js',
    paths: {
        lib: '../lib'
    },
	shim: {
		"lib/backbone": {
			deps: ["lib/underscore", "lib/jquery"],
			exports: "Backbone"
		},
		"lib/underscore":{
			deps: ["lib/jquery"],
			exports: "_"
		},
		"lib/jquery": {
			exports: "jQuery"
		},
		"lib/bootstrap": {
			deps: ["lib/jquery"]
		}
	}
});

require(["main", "view"], function(App, View){
	var app = new App();
	app.newSnipet();
	var view = new View(app, {
		main: "#main",
		endpoint: "#template-endpoint"
	});
	view.render();
	
/*
	var transitTo = function(step){
		saveAllModifications();
		scrollTo(step);
	};

	elms.endpoint.change(function(event){
		app.editEndpoint(elms.endpoint.val());
	});

	elms.sparql.change(function(event){
		app.editSPARQL(elms.sparql.val());
	});

	elms.description.change(function(event){
		app.editDescription(elms.description.val());
	});

*/
});
