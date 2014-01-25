define(["lib/backbone", "lib/underscore"], function(Backbone){

	var Snipet = Backbone.Model.extend({
		defaults: {
			endpoint: "",
			sparql: "",
			result: "",
			description: ""
		}
	});

	Snipet.createFromJSON = function(json){
		var obj = JSON.parse(json);
		if(obj.timestamp && typeof obj.timestamp === "string"){
			obj.timestamp = new Date(obj.timestamp);
		}
		return new Snipet(obj);
	};

	return Snipet;
	
});
