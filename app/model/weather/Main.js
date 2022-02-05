/**
 * Created by tech on 10/13/2015.
 */
Ext.define('August.model.weather.Main', {
    extend: 'August.model.Base',

    fields: [
        {name: 'climateId', reference: 'weather.Climate', type: 'int'},
        {name: 'temp'},
        {name: 'pressure'},
        {name: 'humidity'},
        {name: 'temp_min'},
        {name: 'temp_max'}
    ]
});
