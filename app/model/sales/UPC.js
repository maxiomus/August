Ext.define('August.model.sales.UPC', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.identifier.Negative'
    ],

    fields: [                        
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'colorNRF', type: 'string' },      
        { name: 'upc_size', type: 'string' },  
        { name: 'upcno', type: 'int' },
        { name: 'style_descipt', type: 'string' },
        { name: 'customerPO', type: 'string' },        
        { name: 'orderno', type: 'int' },                        
        { name: 'customer', type: 'string' },        
        { name: 'status', type: 'string' },
        { name: 'msrp', type: 'float' },     
        { name: 'ticket_msrp', type: 'float' },     
        { name: 'bundle', type: 'string' },  
        { name: 'numOfBundle', type: 'int' },
        { name: 'sizeCat', type: 'string' },
        { name: 'unit', type: 'string' },        
        { name: 'total', type: 'int' },  
        { name: 'price1', type: 'float' },        
        { name: 'price2', type: 'float' },        
        { name: 'price3', type: 'float' },        
        { name: 'price4', type: 'float' },        
        { name: 'price5', type: 'float' }        
        
        /*   
        {
            //
            //     When associate models,
            //     model name with Id prefixed.
            //     ex. pihId
            //    or using field...
            //
            name: 'orderno',
            reference: {
                parent: 'sales.Order',
                //
                //type: 'sales.Order',
                //association: 'itemsBySalesOrder',
                //role: 'product',
                field: 'orderno',
                inverse: 'salesorderitems'
            }
        }      
        */     
    ],

    //idProperty: 'upcno',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/SalesOrderItems/UPC',

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

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

        extraParams: {},

        listeners: {            
            exception: function (proxy, response, operation) {
                console.log('UPC - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
}
