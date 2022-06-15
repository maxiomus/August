Ext.define('August.view.settings.company.users.ListModel', {
    extend: 'Ext.app.ViewModel',

    requires: [
        'August.model.settings.users.User'
    ],

    alias: 'viewmodel.users-list',

    stores: {
        users: {
            model: 'settings.users.User',
            autoLoad: true
        }
    }
});
