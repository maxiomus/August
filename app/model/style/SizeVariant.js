Ext.define('August.model.style.SizeVariant', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { 
            name: 'code', type: 'string'            
        },
        { name: 'sizes', type: 'string' },       
        { name: 'sizeCount', type: 'int' }
    ],

    idProperty: 'sizeVariantId',
    //identifier: 'negative',

    validators: {
        code: 'presence'
        /*
         ordertype: { type: 'length', min: 2 },
         gender: { type: 'inclusion', list: ['Male', 'Female'] },
         username: [
         { type: 'exclusion', list: ['Admin', 'Operator'] },
         { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
         ]
         */
    },

    proxy: {
        type: 'rest',
        //batchActions: true, // default false when rest proxy.
        url: '/WebApp/api/Sizes/',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
