/**
 * Created by tech on 10/13/2015.
 */
Ext.define('August.model.weather.Rain', {
    extend: 'August.model.Base',

    fields: [
        {name: 'climateId', reference: 'weather.Climate', type: 'int'},
        {name: '3h'}
    ]
});
