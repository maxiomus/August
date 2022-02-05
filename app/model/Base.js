Ext.define('August.model.Base', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.identifier.Negative',
        'Ext.data.validator.Presence'
    ],
    
    schema: {
        namespace: 'August.model'
    }
});
