Ext.define('August.store.Customers', {
    extend: 'Ext.data.Store',

    alias: 'store.Customers',

    fields: ['guid', 'label', 'value'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    storeId: 'Customers',

    pageSize: 0,
    autoLoad: true,

    remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/WebApp/api/List/customers',
        
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    },

    listeners: {
        load: function(s){
            memCustomers.getProxy().setData(s.getRange());
            memCustomers.load();
        }
    }
});

var memCustomers = Ext.create('Ext.data.Store', {
    storeId: 'memCustomers',
    pageSize: 50,
    remoteFilter: true,
    proxy: {
         type: 'memory',
         enablePaging: true,
         reader: {
             type: 'json',
             rootProperty: 'data'
         }
    }
});     