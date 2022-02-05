/**
 * Created by tech on 10/13/2015.
 */
Ext.define('August.model.weather.Sys', {
    extend: 'August.model.Base',

    fields: [
        {name: 'climateId', reference: 'weather.Climate', type: 'int'},
        {name: 'id'},
        {name: 'type'},
        {name: 'message'},
        {name: 'country'},
        {name: 'sunrise'},
        {name: 'sunset'}
    ]
});
