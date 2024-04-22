/**
 * Created by tech on 6/11/2014.
 */

Ext.define('August.store.StyleColors', {
    extend: 'Ext.data.Store',

    alias: 'store.StyleColors',

    fields: ['label', 'value', 'descript', 'style'],
    // allow the grid to interact with the paging scroller by buffering
    //buffered: true,

    storeId: 'StyleColors',

    pageSize: 0,
    autoLoad: true,

    //remoteFilter: true,
    //remoteSort: true

    proxy: {
        type: 'ajax',
        url: '/WebApp/api/List/stylecolors',
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
            memStColors.getProxy().setData(s.getRange());
            memStColors.load();
        }
    }
});

var memStColors = Ext.create('Ext.data.Store', {
    storeId: 'memStyleColors',
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
