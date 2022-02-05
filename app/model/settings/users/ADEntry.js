/**
 * Created by tech on 2/5/2015.
 */

Ext.define('August.model.settings.user.ADEntry', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'Name', type: 'string' },
        { name: 'distinguishedName', type: 'string' },
        {
            name: 'Category', type: 'string',
            convert: function(value, record){
                var splits = value.split(',');

                return splits[0].replace('CN=','');
            }
        },
        { name: 'CN', type: 'string' },
        { name: 'OU', type: 'string' },
        { name: 'Description', type: 'string' }
    ]
});
