define(["snipet_list", "snipet"], function(SnipetList, Snipet){

	var THRESHOLD_BACKUP = 3;

	var App = function(){
		this.snipetList = new SnipetList();
	};

	var edit = function(snipet, type, value){
		snipet.set(type, value);
	};

	var updateRevision = function(){
		this._revision = (this._revision || 0) + 1;
		if(this._revision > THRESHOLD_BACKUP){
			this.backup(this.latestSnipet);
			this._revision = 0;
		}
	};

	App.prototype = {
		newSnipet: function(){
			this.latestSnipet = new Snipet();
			this._revision = 0;
		},
		finishEditting: function(){
			if(this.latestSnipet){
				this.snipetList.add(this.latestSnipet);
			}
		},
		editEndpoint: function(url){
			edit(this.latestSnipet, "endpoint", url);
			updateRevision.call(this);
		},
		editSPARQL: function(sparql){
			edit(this.latestSnipet, "sparql", sparql);
			updateRevision.call(this);
		},
		editDescription: function(description){
			edit(this.latestSnipet, "description", description);
			updateRevision.call(this);
		},
		restore: function(){
			var stored = window.sessionStorage.getItem("latestSnipet");
			if(stored && stored.length > 0){
				this.latestSnipet = Snipet.createFromJSON(stored);
			}else{
				this.latestSnipet = new Snipet();
			}
		},
		backup: function(){
			window.sessionStorage.setItem("latestSnipet",
										  this.latestSnipet.toJSON());
		}
	};
	
	return App;
});
