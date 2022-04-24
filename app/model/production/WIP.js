
Ext.define('August.model.production.WIP', {
    extend:  'August.model.Base',

    fields:  [        
        {name: 'pono', type: 'string'},
        {name: 'processtype', type: 'string'},        
        {name: 'division', type: 'string'},        
        {name: 'totalqty', type: 'string'},
        {name: 'startDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d'},
        {name: 'orderDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d'},
        {name: 'cancelDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d'},
        {name: 'etaDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d'},        
        {name: 'style', type: 'string'},
        {name: 'color', type: 'string'},
        //{name: 'descript', type: 'string'},                
        {name: 'unitSum', type: 'int'},
        {name: 'totalUnit', type: 'int'},        
        {name: 'memo', type: 'string'},        
        {name: 'trimmemo', type: 'string'},        
        {name: 'anna', type: 'string'},
        {name: 'ashley', type: 'string'},
        {name: 'bailey', type: 'string'},
        {name: 'betty', type: 'string'},
        {name: 'carol', type: 'string'},
        {name: 'dominique', type: 'string'},
        {name: 'eddie', type: 'string'},
        {name: 'edgar', type: 'string'},
        {name: 'inhouse', type: 'string'},
        {name: 'irene', type: 'string'},                
        {name: 'lea', type: 'string'},
        {name: 'lydia', type: 'string'},
        {name: 'samantha', type: 'string'},
        {name: 'sarah', type: 'string'},
        {name: 'showshow', type: 'string'},
        {name: 'tamara', type: 'string'},
        {name: 'tiffany', type: 'string'},
        {name: 'vee', type: 'string'}
    ],

    //idProperty:  'id',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/Wips/",

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: "json",
            rootProperty: "data"
            //totalProperty: "total"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },
        
        listeners: {            
            exception: function (proxy, response, operation) {
                console.log('WIP - Model', response, operation);
            }
        }},

    listeners: {
        //beforeload: "onBeforeLoad",
        //load: "onLoad"
    }
});
