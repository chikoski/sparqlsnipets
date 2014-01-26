define(["lib/underscore", "lib/backbone", "model/snipet_list", "model/snipet", "model/query", "model/query_result", "lib/jquery"], function(_, Backbone, SnipetList, Snipet, Query, QueryResult, $){

	var THRESHOLD_BACKUP = 3;

	var updateRevision = function(){
		this._revision = (this._revision || 0) + 1;
		if(this._revision > THRESHOLD_BACKUP){
			this.backup(this.latestSnipet);
			this._revision = 0;
		}
	};

	var App = function(){
		this.snipetList = new SnipetList();
	};

	App.prototype = _.extend({
		newSnipet: function(){
			this.latestSnipet = new Snipet();
			this._revision = 0;
			this.trigger("newSnipet");
		},
		finishEditting: function(){
			if(this.latestSnipet){
				this.snipetList.add(this.latestSnipet);
			}
			this.trigger("finishEditting");
		},
		edit: function(type, value){
			this.latestSnipet.set(type, value); // XXX type should be checked
		},
		editEndpoint: function(url){
			this.edit("endpoint", url);
			updateRevision.call(this);
		},
		editSPARQL: function(sparql){
			this.edit("sparql", sparql);
			updateRevision.call(this);
		},
		editDescription: function(description){
			this.edit("description", description);
			updateRevision.call(this);
		},
		restore: function(){
			var stored = window.sessionStorage.getItem("latestSnipet");
			if(stored && stored.length > 0){
				this.latestSnipet = Snipet.createFromJSON(stored);
			}else{
				this.latestSnipet = new Snipet();
			}
			this.trigger("restore");
		},
		backup: function(){
			window.sessionStorage.setItem("latestSnipet",
										  this.latestSnipet.toJSON());
			this.trigger("backup");
		},
		sendQuery: function(){
			if(this.latestSnipet != null){
				var query = Query.createFromSnipet(this.latestSnipet);
				var url = query.toURL();
				if(url.length > 0){
					return;
				}
			}
			var response = new QueryResult({
				status: 400,
				message: "badrequest"
			});
			this.trigger("query-result", response);
		}
	}, Backbone.Events);
	
	return App;
});
