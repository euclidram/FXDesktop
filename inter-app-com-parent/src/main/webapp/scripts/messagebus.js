Ext.define('Ext.ux.MessageBroker', {
    extend: 'Ext.util.Observable',

    statics: {
        instance: null,
        setInstance: function(i) {
            this.instance = i;
        },
        sendMessage: function(msg, data) {
            this.instance.fireEvent('message',{"msg":msg,"data":data});
        }
    },

    constructor: function(config){
        this.addEvents({
            "message" : true
        });

        if(config && config.listeners) this.listeners = config.listeners;

        Ext.ux.MessageBroker.superclass.constructor.call(this, config);
    }

}, function() {
    Ext.ux.MessageBroker.setInstance(new Ext.ux.MessageBroker());
});
