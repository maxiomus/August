Ext.define('August.model.sales.OrderDetail', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: 'sodId', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'total', type: 'number' },
        { name: 'price', type: 'number' },
        { name: 'extPrice', type: 'number' },
        { name: 'orderNo', type: 'int' },        
        { name: 'customer', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'division', type: 'string' },
        { name: 'custpo', type: 'string' },        
        { name: 'status', type: 'string' },
        { name: 'orderDate', type: 'date', dateFormat: 'C'  },
        { name: 'shipdate', type: 'date', dateFormat: 'C'  },        
        { name: 'cancelDate', type: 'date', dateFormat: 'C'  },
        { name: 'userf_date', type: 'date', dateFormat: 'C'  },
        { name: 'ordertype', type: 'string' },
        { name: 'poNo', type: 'int' },
        { name: 'vendor1', type: 'string' },
        { name: 'vendor2', type: 'string' },
        { name: 'vendor3', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'category', type: 'string' },
        { name: 'subcategory', type: 'string' },
        { name: 'grp', type: 'string' },
        { name: 'Sizecat', type: 'string' },
        { name: 'wh', type: 'string' },
        { name: 'store', type: 'string' },
        { name: 'rep1', type: 'string' },
        { name: 'rep2', type: 'string' },
        { name: 'ohs', type: 'number' },
        { name: 'orders', type: 'number' },
        { name: 'pos', type: 'number' },
        { name: 'ats', type: 'number' },
        { name: 'ots', type: 'number' },
        { name: 'term', type: 'string' },
        { name: 'Paymentcode', type: 'string' },
        { name: 'shipvias', type: 'string' },
        { name: 'memo', type: 'string' },                       
        { name: 'unit1', type: 'number' },
        { name: 'unit2', type: 'number' },
        { name: 'unit3', type: 'number' },
        { name: 'unit4', type: 'number' },
        { name: 'unit5', type: 'number' },
        { name: 'unit6', type: 'number' },
        { name: 'unit7', type: 'number' },
        { name: 'unit8', type: 'number' },
        { name: 'unit9', type: 'number' },
        { name: 'unit10', type: 'number' },
        { name: 'unit11', type: 'number' },
        { name: 'unit12', type: 'number' },
        { name: 'unit13', type: 'number' },
        { name: 'unit14', type: 'number' },
        { name: 'unit15', type: 'number' },    
        { name: 'S1', type: 'string' },
        { name: 'S2', type: 'string' },
        { name: 'S3', type: 'string' },
        { name: 'S4', type: 'string' },
        { name: 'S5', type: 'string' },
        { name: 'S6', type: 'string' },
        { name: 'S7', type: 'string' },
        { name: 'S8', type: 'string' },
        { name: 'S9', type: 'string' },
        { name: 'S10', type: 'string' },
        { name: 'S11', type: 'string' },
        { name: 'S12', type: 'string' },
        { name: 'S13', type: 'string' },
        { name: 'S14', type: 'string' },
        { name: 'S15', type: 'string' },        
        { name: 'customerName', type: 'string' },
        { name: 'customerType', type: 'string' },
        { name: 'nonrevenue', type: 'string' },
        { name: 'cust_type', type: 'string' }
    ],

    //idProperty: 'orderno',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/OrderDetails',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
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
                console.log('OrderDetail - Model', response, operation);
            }
        }
    }
});