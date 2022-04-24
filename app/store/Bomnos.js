/**
 * Created by tech on 2/17/2015.
 */
Ext.define('August.store.Bomnos', {
    extend: 'Ext.data.Store',

    fields: ['label', 'value'],

    autoLoad: false,
    pageSize: 0,

    proxy: {
        type: 'ajax',
        url: '/WebApp/api/List/bomnos',
        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});