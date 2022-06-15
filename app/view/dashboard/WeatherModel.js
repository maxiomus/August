Ext.define('August.view.dashboard.WeatherModel', {
    extend: 'Ext.app.ViewModel',
    
    alias: 'viewmodel.dashboard-weather',

    requires: [
        'August.model.weather.City',
        'August.model.weather.Climate',
        'Ext.data.proxy.JsonP'
    ],    

    stores: {
        cities: {
            model: 'weather.City',
            storeId: 'cities',
            proxy: {
                type: 'ajax',
                url: '/WebApp/api/Cities',
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                },
                listeners: {

                }
            }
        },
        climates: {
            //model: 'weather.Climate',
            storeId: 'climates',
            //autoLoad: true,
            proxy: {
                type: 'jsonp',
                url: 'http://api.openweathermap.org/data/2.5/group?units=imperial&appid=0ed3c4c0ed7a4a22b182e748757ffd11',
                //noCache: true,
                pageParam: '',
                startParam: '',
                limitParam: '',
                reader: {
                    type: 'json',
                    rootProperty: 'list'
                }
            },
            listeners: {
                beforeload: 'onBeforeLoad',
                load: 'onLoad'
            }
        }
    }

});
