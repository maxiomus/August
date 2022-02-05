/**
 * Created by tech on 10/16/2015.
 */
 Ext.define('August.model.UserOption', {
    extend: 'August.model.Base',

    fields: [
        {name: 'UserName'},
        {name: 'Category'},
        {name: 'DataValue'},
        {name: 'Description'}
    ],

    idProperty: 'DataValue',

    proxy: {
        type: 'rest',
        url: '/api/UserOptions',
        noCache: true,
        pageParam: '',
        startParam: '',
        limitParam: '',
        reader: {
            type: 'json',
            //totalProperty: 'total',
            rootProperty: 'data'
        }
    }
});
