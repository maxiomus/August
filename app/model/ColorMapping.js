/**
 * Created by tech on 6/11/2014.
 */
 Ext.define('August.model.ColorMapping', {
    extend: 'August.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'color', type: 'string' },
        { name: 'customer', type: 'string' },
        { name: 'customerColor', type: 'string' }
        /*    
        { name: 'updateUser', type: 'string' },
        { name: 'updateDate', type: 'date' }
        */
    ],

    idProperty: 'id',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/WebApp/api/ColorMappings/",

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
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
