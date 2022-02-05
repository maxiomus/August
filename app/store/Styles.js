Ext.define('August.store.Styles', {
    extend: 'Ext.data.Store',

    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    alias: 'store.Styles',

    fields: ['id', {
        name: 'label',
        sortType: 'asUCString'
    },{
        name: 'value',
        sortType: 'asUCString'
    }],

    storeId: 'Styles',

    pageSize: 0,
    autoLoad: true,

    //remoteFilter: true,
    //remoteSort: true,

    proxy: {
        type: 'ajax',
        url: '/WebApp/api/List/styles',
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
            memStyles.getProxy().setData(s.getRange());
            memStyles.load();
        }
    }
});

var memStyles = Ext.create('Ext.data.Store', {
    storeId: 'memStyles',
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