define(["lib/jquery", "lib/underscore", "lib/backbone", "view/step"], function($, _, Backbone, Step){

	var PARTS = ["endpoint", "sparql", "result", "description"];
	var scrollbar = $("html,body");

	var scrollTo = function(to, offset){
		if(to != null){
			offset = offset || 0;
			scrollbar.animate({scrollTop: to.offset().top + offset});
		}
	};

	var createNextHandler = function(index){
		var self = this;
		index = (index + 1) % PARTS.length;
		return function(){
			var n = PARTS[index];
			scrollTo(self.parts[n].$el);
		};
	};

	var createPrevHandler = function(index){
		var self = this;
		index = index - 1;
		if(index < 0){
			index = PARTS.length + index;
		}
		return function(){
			var n = PARTS[index];
			scrollTo(self.parts[n].$el);
		};
	};

	var initParts = function(options){
		var self = this;
		for(var i = 0; i < PARTS.length; i++){
			var parts = PARTS[i];
			self.parts[parts] = new Step({
				app: self.app,
				templateString: $(options[parts]).text()
			});
			self.listenTo(self.parts[parts], "send-query", self.sendQuery);
		}
		self.listenTo(self.app, "newSnipet", self.setSnipet);
		if(self.app.latestSnipet != null){
			self.setSnipet();
		}

		for(i = 0; i < PARTS.length; i++){
			parts = PARTS[i];
			self.parts[parts].on("next", createNextHandler.call(self, i));
			self.parts[parts].on("prev", createPrevHandler.call(self, i));
		}
	};

	var AppView = Backbone.View.extend({
		className: "main",
		initialize: function(app, options){
			var self = this;
			self.app = app;
			options = {
				endpoint: options.endpoint || "#template-endpoint",			
				sparql: options.sparql || "#template-sparql",
				result: options.result || "#template-result",
				description: options.result || "#template-description"
			};
			self.parts = {};
			initParts.call(self, options);
		},
		render: function(){
			for(var i = 0; i < PARTS.length; i++){
				var parts = PARTS[i];
				this.parts[parts].render();
				this.$el.append(this.parts[parts].$el);
			}
			return this;
		},
		setSnipet: function(){
			for(var parts in this.parts){
				this.parts[parts].model = this.app.latestSnipet;
			}
		},
		sendQuery: function(){
			this.listenTo(this.app, "query-result", this.showQueryResult);
			this.app.sendQuery();
		},
		showQueryResult: function(result){
			console.log(result);
		}
	});

	return AppView;
	
});
