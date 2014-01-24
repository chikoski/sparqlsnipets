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
	app.restore();
	$steps.height($(window).height());

	$(".next").click(function(event){
		event.preventDefault();
		var next_step = $(this).parents(".step").next();
		scrollbar.animate({scrollTop: next_step.offset().top});
	});

	$(".finish").click(function(event){
		event.preventDefault();
		app.finishEditting();
		app.newSnipet();
		scrollbar.animate({scrollTop: 0});
	});
});
