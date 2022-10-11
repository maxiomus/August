Ext.define('August.model.File', {
    extend: 'August.model.Base',

    fields: ['fileId',
        {
            name: 'file',
            type: 'auto',
            persist: false
        },
        {   name: 'name', mapping: 'file.name'},
        {   name: 'type', mapping: 'file.type'},
        {   name: 'size', mapping: 'file.size'},
        {   name: 'created', mapping: 'file.created'},
        {   name: 'lastmod', mapping: 'file.lastmod'}
        /*
        {
            name: 'label', type: 'string', allowNull: true
        },
        {
            name: 'tag', type: 'string', allowNull: true
        },
        {
            name: 'description', type: 'string', allowNull: true
        },
        {
            name: 'priority', type: 'int', allowNull: true
        },
        {
            name: 'active', type: 'boolean', defaultValue: true, allowNull: true
        }
        */       
    ],

    idProperty: 'fileId',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/Files/Style",

        isUpload: true,

        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
