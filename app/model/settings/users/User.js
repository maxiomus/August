Ext.define('August.model.settings.users.User', {
    extend: 'August.model.Base',

    fields: [
        { name: 'nvltUser', type: 'string' },
        { name: 'password', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'security_key', type: 'string' },
        { name: 'user_group', type: 'string' },
        { name: 'user_type', type: 'string' },
        { name: 'salesrep', type: 'string' },
        { name: 'sr_group', type: 'string' },
        { name: 'division', type: 'string' },
        { name: 'sr_manager', type: 'string' },
        { name: 'active', type: 'string' },
        { name: 'security_level', type: 'string' },
        { name: 'view_cost', type: 'string' },
        { name: 'confirmScanPack', type: 'string' },
        { name: 'pricelevel_from', type: 'string' },
        { name: 'pricelevel_to', type: 'string' },
        { name: 'Scanpackpassword', type: 'string' },
        { name: 'upload_directory', type: 'string' },
        { name: 'theme', type: 'string' },
        { name: 'def_wh', type: 'string' },
        { name: 'ipoduser', type: 'string' },
        { name: 'Printer_ShippingLabel', type: 'string' },
        { name: 'Printer_CCReceipt', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'def_email_accntname', type: 'string' },
        { name: 'login_fail_count', type: 'int' },
        { name: 'is_lock', type: 'string' },
        { name: 'latest_try_login_date', type: 'date', dateFormat: 'c' },
        { name: 'lock_count', type: 'int' }
    ],

    idProperty: 'UserId',
    //identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/Users",

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
        reader: {
            type: "json",
            rootProperty: "data"
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }

});
