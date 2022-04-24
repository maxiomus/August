/**
 * Created by tech on 8/20/2015.
 */
Ext.define('August.model.File', {
    extend: 'August.model.Base',    

    fields: [
        { name: 'fileId' },             
        { name: 'name', type: 'string' },
        { name: 'type', type: 'string', allowNull: true },
        { name: 'size', type: 'string', allowNull: true },
        { name: 'path', type: 'string', allowNull: true },
        { name: 'order', type: 'int', allowNull: true },        
        { name: 'tag', type: 'string', allowNull: true }, 
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
        },
        */
        {
            name: 'id',
            reference: {
                parent: 'style.Product',

                //type: 'sales.Powd',
                //association: 'MaterialsByStyle',
                //role: 'powd',
                field: 'id',
                inverse: 'filesInProducts'
            }
        }
    ],

    idProperty: 'fileId',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/Files/Product",

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
