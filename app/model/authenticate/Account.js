/**
 * {@link Ext.data.Model} for Security User
 */
 Ext.define('August.model.authenticate.Account', {
    extend: 'Ext.data.Model',
    fields: [
        // non-relational properties       
        {
            name: 'userId',
            type: 'string'
        }, 
        {
            name: 'name',
            type: 'string'
        },
        {
            name: 'descript',
            type: 'string'
        },
        {
            name: 'userGroup',
            type: 'string'
        },
        {
            name: 'userType',
            type: 'string'
        },
        {
            name: 'active',
            type: 'string'
        },
        {
            name: 'email',
            type: 'string'
        },
        {
            name: 'verified',
            type: 'date',
            persist: false,
            allowNull: true
        },
        {
            name: 'isVerified',
            type: 'boolean',
            persist: false
        },
        {
            name: 'token',
            type: 'string',
            persist: false
        },
        {
            name: 'tokenExpires',
            type: 'date',
            persist: false,
            allowNull: true
        },               
        {
            name: 'roles',
            type: 'auto'
        }
    ],

    inRole: function(RoleID) {
        var me = this;
        return Ext.Array.contains(me.get('roles'), RoleID );
    },

    userOwn: function(id){
        var me = this;

        //console.log('userOwn', userid === me.get('Userid'));
        return id === me.get('userId');
    }
});
