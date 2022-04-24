Ext.define('August.view.production.windows.style.web.ExportController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.windows-style-webexport',

    onBeforeStoreLoad: function(store, operation, eOpts){
        var me = this,
            vm = me.getViewModel();

            topbar = me.getView().down("toolbar"),
            field = topbar.down("combo[name=site]");
        
        //console.log('onBeforeStoreLoad - publishGrid', store, topbar, field.getValue(), vm.get('selected').get('style'));

        Ext.apply(store.getProxy().extraParams, {       
            style: encodeURIComponent(vm.get('selected').data.style),     
            siteid: encodeURIComponent(field.getValue())            
        });
        
    },

    onBeforeAttributeStoreLoad: function(store, operation, eOpts){
        var me = this,
            vm = me.getViewModel();

            topbar = me.getView().down("toolbar"),
            field = topbar.down("combo[name=site]");
        
        //console.log(me, topbar, field.getValue(), vm.get('selected').get('style'));
        //store.removeAll();
        var siteId = field.getValue();
        console.log(field.getValue())
        switch (siteId) {            
            case '10':
            case '11':
            case '12':
            case '13':            
            case '16':
            case '99':
                siteId = 16;
                break;

        }
        Ext.apply(store.getProxy().extraParams, {
            style: encodeURIComponent(vm.get('selected').data.style),
            siteid: siteId
        });
    },

    onPublishSelect: function(sm, selected){
        var me =this,
            store = me.getViewModel().getStore('styleAttributes');

        store.load();
        console.log(store);        
    },

    onSiteChange: function(combo, nValue, oValue){
        var me = this,
            vm = me.getViewModel();

        publishStore = vm.getStore('publishes');
        publishStore.load(function(recs, operation, success){
            vm.getStore('styleAttributes').removeAll();
        });
    }
});
