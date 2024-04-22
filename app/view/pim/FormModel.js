Ext.define('August.view.pim.FormModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.Photo'
    ],

    alias: 'viewmodel.pim-form',
    
    stores: {        

        fileStore: {
            model: 'pim.ProductDetailPhoto',
            session: true,
            autoLoad: false,
            listeners: {
                beforesync: function(options, e){

                }
            }
        }
    }

});
