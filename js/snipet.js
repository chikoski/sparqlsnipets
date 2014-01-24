define(["lib/backbone"], function(Backbone){

	var Snipet = Backbone.Model.extend({

		initialize: function(sparql, result, description){
			this.set("sparql", sparql);
			this.set("result", result);
			this.set("description", description);
			this.set("timestamp", new Date());
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
