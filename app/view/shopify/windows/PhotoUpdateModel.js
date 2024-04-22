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
            fields: ['color', 'uploaded', 'addition'],
            autoLoad: true,
            
            listeners: {
                //beforeload: 'onBeforeLoad',
                //load: 'onLoad'
            }
        },
        
        extensions: {
            fields: ['name', 'value'],
            autoLoad: true,
            
            proxy: {
                type: 'ajax',
                url: 'resources/data/shopify/imageExtensions.json', 

                pageParam: '',
                startParam: '',
                limitParam: '',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            }
        }
    }

});
