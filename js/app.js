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

require(["lib/bootstrap", "lib/jquery", "main"], function(Bootstrap, $, App){
	var $steps = $(".step");
	var scrollbar = $("html,body");
	var app = new App();


	var saveAllModifications = function(){
		app.editEndpoint(elms.endpoint.val());
		app.editSPARQL(elms.sparql.val());
		app.editDescription(elms.description.val());
	};

	var scrollTo = function(to, offset){
		if(to != null){
			offset = offset || 0;
			scrollbar.animate({scrollTop: to.offset().top + offset});
		}
	};

	var transitTo = function(step){
		saveAllModifications();
		scrollTo(step);
	};
	
//	app.restore();
	app.newSnipet();
	$steps.height($(window).height());

	var elms = {
		endpoint: $("#endpoint"),
		sparql: $("#sparql"),
		description: $("#description"),
		result: $("#result")
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


	$(".next").click(function(event){
		event.preventDefault();
		var next_step = $(this).parents(".step").next();
		transitTo(next_step);
	});

	$(".prev").click(function(event){
		event.preventDefault();
		var next_step = $(this).parents(".step").prev();
		transitTo(next_step);
	});

	$(".finish").click(function(event){
		event.preventDefault();
		saveAllModifications();
		app.finishEditting();
		app.newSnipet();
		scrollbar.animate({scrollTop: 0});
	});
});
