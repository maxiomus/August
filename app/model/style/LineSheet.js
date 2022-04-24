Ext.define('August.model.style.LineSheet', {
    extend: 'August.model.Base',

    fields: [
        { name: 'lineseq', type: 'int' },
        { name: 'linetitle', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'totalCount', type: 'int' },
        { name: 'createUser', type: 'string' },
        { name: 'createTime', type: 'date', dateFormat: 'C' }
    ],

    idProperty: 'lineseq',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/Linesheets",

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
