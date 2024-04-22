Ext.define('August.view.sales.windows.UpdatePTController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sales-windows-updatept',

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();        

    },

    initViewModel: function(vm) {
        //var rec = vm.linkData.theSample;
        //console.log('initViewModel', rec, vm.get('theSample'))
    },

    onBeforeStoreLoad: function(store, operation, eOpts){
        var me = this,
            vm = me.getViewModel();
        
        //console.log(me, topbar, field.getValue(), vm.get('selected').get('style'));
        //store.removeAll();

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(store.getProxy().extraParams, {
                   
        });
    }
});
