Ext.define('August.view.production.windows.style.UploadModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.style.File'
    ],

    alias: 'viewmodel.windows-style-upload',

    stores: {
        /*
        fileStore: {
            model: 'August.model.File'
        }
        */
    }

});