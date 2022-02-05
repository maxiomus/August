Ext.define('August.model.style.SizeCategory', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { 
            name: 'code', type: 'string'            
        },
        { name: 'size1', type: 'string' },
        { name: 'size2', type: 'string' },
        { name: 'size3', type: 'string' },
        { name: 'size4', type: 'string' },
        { name: 'size5', type: 'string' },
        { name: 'size6', type: 'string' },
        { name: 'size7', type: 'string' },
        { name: 'size8', type: 'string' },
        { name: 'size9', type: 'string' },
        { name: 'size10', type: 'string' },
        { name: 'size11', type: 'string' },
        { name: 'size12', type: 'string' },
        { name: 'size13', type: 'string' },
        { name: 'size14', type: 'string' },
        { name: 'size15', type: 'string' },
        { name: 'size16', type: 'string' },
        { name: 'size17', type: 'string' },
        { name: 'size18', type: 'string' },
        { name: 'size19', type: 'string' },
        { name: 'size20', type: 'string' },
        { name: 'size21', type: 'string' },
        { name: 'size22', type: 'string' },
        { name: 'size23', type: 'string' },
        { name: 'size24', type: 'string' },
        { name: 'size25', type: 'string' },
        { name: 'size26', type: 'string' },
        { name: 'size27', type: 'string' },
        { name: 'size28', type: 'string' },
        { name: 'size29', type: 'string' },
        { name: 'size30', type: 'string' },
        { name: 'nrf1', type: 'string' },
        { name: 'nrf2', type: 'string' },
        { name: 'nrf3', type: 'string' },
        { name: 'nrf4', type: 'string' },
        { name: 'nrf5', type: 'string' },
        { name: 'nrf6', type: 'string' },
        { name: 'nrf7', type: 'string' },
        { name: 'nrf8', type: 'string' },
        { name: 'nrf9', type: 'string' },
        { name: 'nrf10', type: 'string' },
        { name: 'nrf11', type: 'string' },
        { name: 'nrf12', type: 'string' },
        { name: 'nrf13', type: 'string' },
        { name: 'nrf14', type: 'string' },
        { name: 'nrf15', type: 'string' },
        { name: 'sizeCount', type: 'int' },
        { name: 'sample_size', type: 'string', allowNull: true },
        { name: 'rowguid', type: 'string' }
    ],

    idProperty: 'sizeCategoryId',
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
