Ext.define('August.view.dashboard.NewsModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard-news',

    stores: {
        News: {
            model: 'August.model.New',
            autoLoad: true,
            proxy: {
                type: 'rest',
                url: '/api/Widgets/news',
                //noCache: true,
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                }
            },
            listeners: {
                //beforeload: 'onBeforeLoad',
                //load: 'onLoad'
            }
        }
    }

});
