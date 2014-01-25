define(["lib/backbone", "lib/underscore", "lib/jquery"], function(Backbone, _, $){
	var View = Backbone.View.extend({
		tagName: "section",
		className: "step container",
		events: {
			"change .input": "changed",
			"click .next": "next",
			"click .prev": "prev"
		},
		initialize: function(options){
			this.app = options.app;
			this.template = _.template(options.templateString);
		},
		render: function(){
			var self = this;
			if(self.model != null && self.model.attributes != null){
				self.$el.html(self.template(self.model.attributes));
				self.$el.height($(window).height());
			}
			return this;
		},
		next: function(){
			this.trigger("next");
		},
		prev: function(){
			this.trigger("prev");
		},
		changed: function(event){
			var value = event.target.value;
			var attribute = event.target.getAttribute("id");
			this.app.edit(attribute, value);
		}
	});

	return View;
	
});
