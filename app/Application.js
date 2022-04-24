/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('August.Application', {
    extend: 'Ext.app.Application',

    name: 'August',

    controllers: [
        'Root'
    ],

    views: [
        'main.Main', 'authenticate.Login', 'pages.Error404Window'
    ],

    stores: [
        'NavigationTree', 'Settings', 'Components', 'CompColors', 'Styles', 'StyleColors', 'Colors', 'Bomnos', 'Customers'
    ],

    defaultToken: 'dashboard',

    quickTips: true,
    platformConfig: {
        desktop: {
            quickTips: true
        }
    },

    config: {
        //appReady: false,
        accessToken: null,
        loggedInUser: null,
        prevNode: null
    },

    init: function() {
        var me = this;
        Ext.tip.QuickTipManager.init();
        //this.setGlyphFontFamily('Pictos');

        me.splashscreen = Ext.getBody().mask(
            'Loading application, Please wait...', 'splashscreen'
        );

        me.splashscreen.addCls('splashscreen');

        Ext.DomHelper.insertFirst(Ext.query('.x-mask-msg')[0], {
            cls: 'x-splash-icon'
        });
    },

    launch: function() {
        var me = this;

        Ext.route.Router.suspend();        

        if(new Date() < new Date(localStorage.getItem('expires'))) {
            August.app.accessToken = localStorage.getItem('access_token');
        }
        else {
            localStorage.clear();            
        }        

        console.log('Application.js - launch - this: ', me, localStorage.getItem('expires'));
        // logic check if your is already authenticated.

        /*
        Ext.Ajax.request({
            url: '/WebApp/api/Sessions/' + userId,
            //url: '/security/checkLogin.ashx',
            scope: this,
            success: function(response, options) {
                // decode response
                var result = Ext.decode(response.responseText);
                console.log('checkLogin', response);
                // check if success flag is true
                if(result.success) {
                    // has session...add to application stack
                    //Vega.LoggedInUser = Ext.create('August.model.authenticate.Account', result.data );
                    //Ext.util.Cookies.set('loggedInUser', result.data);
                    //Ext.getStore('Settings').load();

                    me.onUser(
                        //August.account = Ext.create('August.model.authenticate.Account', result.data)                            
                        August.loggedInUser = result.data
                    );

                    August.util.SessionMonitor.start();
                }
                // couldn't login...show error
                else {
                    console.log('User not found!', me.loggedInUser, August.loggedInUser);                        
                }
            },
            failure: function(response, options) {
                //console.log(response);
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {
                //console.log('checkLogin - callback', response);
            }
        });
        */

        // user logged in or not
        if(August.app.accessToken != null){
            
            me.onUser(
                //August.account = Ext.create('August.model.authenticate.Account', result.data)                            
                August.loggedInUser = { 
                    userId: localStorage.getItem('userId'),
                    name: localStorage.getItem('name'),
                    roles: localStorage.getItem('roles'),
                    group: localStorage.getItem('group'),
                }
            );

        }
        else {

            me.onUser(
                August.loggedInUser = null
            );
        }                       
        /*
        me.onUser(
            August.account = Ext.create('August.model.authenticate.Account', {
                'AccountId': '2.7August',
                'FirstName': "Jake",
                'LastName': "Lee",
                'Email': 'jake@27augustapparel.com',
                'Roles': ['administrator', 'manager', 'user']
            })
        );
        */
    },

    onUser: function(user){

        //August.app.setAppReady(true);
        //this.fireEvent('appready', this);
        if(user){
            Ext.route.Router.resume();        
        }
        else{
            Ext.route.Router.resume(true);
            this.redirectTo('login');
        }
        
    },

    onBeforeRequest: function(conn, options){
        options.headers = options.headers || {};
        options.headers['Authorization'] = 'Bearer ' + August.app.getAccessToken();
    },

    onAppUpdate: function () {
        Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
