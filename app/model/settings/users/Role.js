/**
 * Created by tech on 5/4/2015.
 */
Ext.define('August.model.settings.users.Role', {
    extend: 'August.model.Base',

    fields: [
        {
            name: 'RoleId',
            type: 'string'
        },
        {
            name: 'RoleName',
            type: 'string'
        }
    ],

    idProperty: 'RoleId'
});