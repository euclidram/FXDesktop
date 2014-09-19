Ext.define('ParentApp.util.HttpStorageProvider', {
	/* Begin Definitions */

	extend : 'Ext.state.Provider',
	alias : 'state.httpstorage',

	config : {
		userid : null,
		url : null,
		timeout : 30000
	},

	constructor : function(config) {
		this.initConfig(config);
		var me = this;
		me.state = {};
		me.callParent(arguments);
		me.restoreState();
	},
	
	initState:function(state) {
        if(state instanceof Array) {
                Ext.each(state, function(item) {
                        this.state[item.name] = this.decodeValue(item.value);
                }, this);
        }
        else {
                this.state = state ? state : {};
        }
	},
	set : function(name, value) {
		var me = this;

		if (typeof value == "undefined" || value === null) {
			me.clear(name);
			return;
		}
		me.persist(name, value);
		me.callParent(arguments);
	},
	// private
	restoreState : function() {
		var me = this;
		var response = Ext.Ajax.request({
			async : false,
			url : this.getUrl() + "/get.jsonp",
			method : 'get',
			params : {
				userid : this.getUserid(),
				method : 'get'
			}
		});

		// debugger;
		var items = Ext.decode(response.responseText);
		if (items !== undefined) {
			for ( var name in items) {
				var temp = this.decodeValue(items[name]);
				if(name !== "success") {
					me.state[name] = temp;
				}
				console.log("restored: " + name);
			}
			//me.initState(items);
		}

		// Ext.data.JsonP.request({
		// url : this.getUrl() + "/get.jsonp",
		// params : {
		// userid : this.getUserid(),
		// method : 'get'
		// },
		// disableCaching : true,
		// success : function(results) {
		// console.log('success', results);
		// for ( var i in results) {
		// this.state[i] = this.decodeValue(results[i]);
		// }
		// },
		// failure : function() {
		// console.log('failed', arguments);
		// },
		// scope : this
		// });
	},
	// private
	clear : function(name) {
		this.clearKey(name);
		this.callParent(arguments);
	},
	// private
	persist : function(name, value) {
		var me = this;
		Ext.data.JsonP.request({
			url : this.getUrl() + "/save.jsonp",
			params : {
				userid : this.getUserid(),
				method : 'save',
				name : name,
				value : me.encodeValue(value)
			},
			disableCaching : true,
			success : function() {
				console.log('success');
			},
			failure : function() {
				console.log('failed', arguments);
			}
		});
	},
	// private
	clearKey : function(name) {
		Ext.data.JsonP.request({
			url : this.getUrl() + "/clear.jsonp",
			params : {
				userid : this.getUserid(),
				method : 'clear',
				name : name
			},
			disableCaching : true,
			success : function() {
				console.log('success');
			},
			failure : function() {
				console.log('failed', arguments);
			}
		});
	}
});
