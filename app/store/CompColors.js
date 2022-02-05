/**
 * Created by tech on 6/11/2014.
 */

Ext.define('August.store.CompColors', {
    extend: 'Ext.data.Store',

    fields: ['id','label', 'value', 'descript'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,
    pageSize: 0,

    storeId: 'compColors',
    autoLoad: true,
    remoteFilter: true,

    proxy: {
        type: 'ajax',
        url: '/WebApp/api/List/compcolors',
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
            memCompColors.getProxy().setData(s.getRange());
            //memRawColors.load();
        }
    }
});

var memCompColors = Ext.create('Ext.data.Store', {
    storeId: 'memCompColors',
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
