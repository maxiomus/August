Ext.define('August.view.authenticate.LoginController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.login',

    requires: [
        'August.util.Utilities',
        'August.util.SessionMonitor',
        'August.util.CapsLockQuickTip',
        'Ext.ux.window.Notification'
    ],

    onTextFieldKeyPressed: function(field, e){

        var charCode = e.getCharCode(),
            me = this;
        if((e.shiftKey && charCode >= 97 && charCode <= 122) ||
            (!e.shiftKey && charCode >= 65 && charCode <= 90)){
            if(me.capslockTooltip === undefined){
                me.capslockTooltip = Ext.create('widget.capslocktip', {
                    target: 'txtPassword'
                });
            }
            me.capslockTooltip.show();
        } else {
            if(me.capslockTooltip !== undefined){
                me.capslockTooltip.hide();
            }
        }
    },

    /**
     * Handles special key press for textfield
     * @param field
     * @param e
     * @param eOpts
     */
    onTextFieldSpecialKey: function(field, e) {

        if (e.getKey() == e.ENTER) {
            this.onLoginButton();
        }
    },

    /**
     * Handles form submission for login
     * @param {Ext.button.Button} button
     * @param {Ext.EventObject} e
     * @param {Object} eOpts
     */
    onLoginButton: function(button, e, eOpts) {
        var me = this,
            form = me.getView().down('form').getForm();

        me.getView().mask('Authenticating... Pleas wait...');

        form.submit({
            clientValidation: true,
            //url: '/api/Login/',
            url: '/WebApp/authenticate',
            scope: me,
            success: me.onLoginSuccess,
            failure: me.onLoginFailure,
            callback: function(options, success, response){
                //console.log(options, success, response);
            }
        });
    },

    onLoginSuccess: function(form, action) {
        var me = this,
            view = me.getView();
        // decode response
        //view.unmask();
        view.close();

        var result = action.result;        
        // check if success flag is true
        if(action.result.success === 'true') {
            // has session...add to application stack
            //August.LoggedInUser = Ext.create( 'August.model.security.User', result.data );
            //Ext.util.Cookies.set('loggedInUser', Ext.encode(result.data));      
            August.app.accessToken = result.access_token;

            localStorage.setItem('access_token', result.access_token);                        
            localStorage.setItem('expires', result[".expires"]);
            
            var userInfo = Ext.decode(result.userInfo);
            August.loggedInUser = userInfo;
            console.log('onLoginSuccess', result[".expires"], August.app.accessToken);
            
            localStorage.setItem('userId', userInfo.userId);
            localStorage.setItem('name', userInfo.name);
            localStorage.setItem('roles', userInfo.roles);
            localStorage.setItem('group', userInfo.group);
            
            //Ext.getStore('Settings').load();

            //August.account = Ext.create('August.model.authenticate.Account', action.result.userInfo);//                        
            // fire global event aftervalidateloggedin
            //Ext.GlobalEvents.fireEvent('aftervalidateloggedin');

            // Get previous location...
            var node = August.app.getPrevNode();
            if(node == null) {
                node = 'dashboard';
            }

            me.redirectTo(node);

            // show message
            August.util.Utilities.showNotification('Confirm', 'ux-notification-icon-information', '<p>You are successfully logged in.</p>');            
            
            August.util.SessionMonitor.start();
        }
        // couldn't login...show error
        else {
            August.util.Utilities.showErrorMsg(result);
            //Ext.Msg.alert('Error!', result.message);
        }
    },

    onLoginFailure: function(form, action){
        var me = this,
            view = me.getView(),
            password = view.down('textfield[name=password]');

        me.getView().unmask();

        console.log('failure', action, form);
        //var response = Ext.decode(action.response.responseText);
        var response = action.response;
        
        localStorage.removeItem('access_token');

        switch (action.failureType) {
            case Ext.form.action.Action.CLIENT_INVALID:
                August.util.Utilities.showErrorMsg('Form fields may not be submitted with invalid values');
                break;
            case Ext.form.action.Action.CONNECT_FAILURE:
                form.reset();
                August.util.Utilities.showErrorMsg(response.status + ' ' + response.statusText);
                break;
            case Ext.form.action.Action.SERVER_INVALID:
                password.setValue('');
                August.util.Utilities.showErrorMsg(response.responseText);
                break;
        }

        //August.util.Util.showErrorMsg(conn.responseText);
    }
});
