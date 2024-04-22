Ext.define('August.view.settings.DefaultController', {
    extend: 'Ext.app.ViewController',
    
    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.settings-default',
    
    onBreadCrumbChange:function(bc, node, prev) {
    if (node) {
        this.redirectTo('settings/' + node.data.routeId);
    }
    }
});
