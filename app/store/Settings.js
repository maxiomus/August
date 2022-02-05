Ext.define('August.store.Settings', {
    extend: 'Ext.data.Store',

    storeId: 'Settings',

    model: 'August.model.settings.Options',

    autoLoad: false,

    proxy: {
        type: 'rest',
        url: '/api/Settings',

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: "json",
            rootProperty: "data"
        }
    }
});