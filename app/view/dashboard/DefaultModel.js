Ext.define('August.view.dashboard.DefaultModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.dashboard-default',

    requires: [
        'August.model.weather.Climate',
        'August.model.weather.City',
        'August.model.UserOption'
    ],

    data: {
        today: new Date()
    },

    formulas: {
        tzoffset: function(get){
            var d = get('today'),
                offset = d.getTimezoneOffset();

            return offset + 60;
        }
    }

});
