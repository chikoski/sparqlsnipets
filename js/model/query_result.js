define(["lib/backbone"], function(Backbone){

	var Result = Backbone.Model.extend({
		defaults: {
			status: 200,
			message: "",
			body: "",
			result: {
			}
		}
	});

	return Result;
	
});
