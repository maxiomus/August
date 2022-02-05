/**
 * Created by tech on 10/13/2015.
 */
 Ext.define('August.model.weather.City', {
    extend: 'August.model.Base',

    fields: [
        {name: 'id'},
        {name: 'name'},
        {name: 'country'},
        {name: 'lat'},
        {name: 'lon'},
        {name: 'coord',
            calculate: function(data){
                return {lon: data.lon, lat: data.lat};
            }
        }
    ],

    idProperty: 'id'
});