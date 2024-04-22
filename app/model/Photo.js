Ext.define('August.model.Photo', {
    extend: 'August.model.Base',

    fields: ['id',
        {
            name: 'file',
            type: 'auto',
            persist: false
        },
        {   name: 'name', mapping: 'file.name' },
        {   name: 'type', mapping: 'file.type' },
        {   name: 'size', mapping: 'file.size' },
        {   name: 'created', mapping: 'file.created' },
        {   name: 'lastmod', mapping: 'file.lastmod' },
        {
            name: 'style', type: 'string', allowNull: true
        },
        {
            name: 'color', type: 'string', allowNull: true
        },
        {
            name: 'order', type: 'int', allowNull: true
        },
        {
            name: 'tag', type: 'string', allowNull: true
        },                
        /*
        {
            name: 'description', type: 'string', allowNull: true
        },
        {
            name: 'label', type: 'string', allowNull: true
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
        url: "/WebApp/api/Files/Photos",

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
