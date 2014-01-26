define(["lib/backbone", "model/snipet"], function(Backbone, Snipet){

	var Query = Backbone.Model.extend({
		toURL: function(){
			return this.get("endpoint") + "?query=" +
				this.get("sparql");
		}
	});

	var ready = function(snipet){
		return true; // XXX
	};

	Query.createFromSnipet = function(snipet){
		if(ready(snipet)){
			return new Query({
				endpoint: snipet.get("endpoint"),
				sparql: snipet.get("sparql")
			});
		}
		return null;
	};

	return Query;

});
