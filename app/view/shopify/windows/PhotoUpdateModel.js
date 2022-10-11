Ext.define('August.view.shopify.windows.PhotoUpdateModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.shopify-windows-photoupdate',
    
    data: {
        title: '',
        store: '',
        source: '',
        addition: 7
    },

    stores: {
        options: {
            fields: ['color', 'qty', 'total'],
            autoLoad: true,
            
            listeners: {
                //beforeload: 'onBeforeLoad',
                //load: 'onLoad'
            }
        }        
    }

});
