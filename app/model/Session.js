Ext.define('August.model.Session', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'id', type: 'int' },        
        { name: 'token', type: 'string' }
    ],

    proxy: {
        type: 'localstorage',
        id: 'august-session'
    }
});