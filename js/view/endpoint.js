define(["lib/backbone", "lib/underscore"], function(Backbone, _){
	var View = Backbone.View.extend({
		tagName: "section",
		className: "step container",
		events: {
			"click .next": "next"
		},
		initialize: function(options){
			this.template = _.template(options.templateString);
		},
		render: function(){
			var self = this;
			var attributes = {
				endpoint: ""
			};
			if(self.model != null && self.model.attributes != null){
				attributes = self.model.attributes;
			}
			self.$el.html(self.template(attributes));
			return this;
		}
	});

	return View;
	
});
