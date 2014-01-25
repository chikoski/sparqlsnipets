define(["lib/backbone", "model/snipet"], function(Backbone, Snipet){

	var SnipetList = Backbone.Collection.extend({
		model: Snipet
	});

	return SnipetList;
	
});
