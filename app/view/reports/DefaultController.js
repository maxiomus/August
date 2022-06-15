Ext.define('August.view.reports.DefaultController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.reports-default',

    onBreadCrumbChange: function(bc, node, prev){
        //console.log('Default', bc, node, prev)
        if(node){
            this.redirectTo('reports/' + node.data.routeId);
            //this.navigateSettings(this.getView(), node.data.routeId);
        }
    }
});
