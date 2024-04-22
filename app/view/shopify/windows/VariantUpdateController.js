Ext.define('August.view.shopify.windows.VariantUpdateController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.shopify-windows-variantupdate',

    onBeforeStoreLoad: function(store, operation, eOpts){
        var me = this,
            vm = me.getViewModel(),
            topbar = me.getView().down("toolbar"),
            withImages = topbar.down('checkbox[name=withImages]');            
        
        //console.log('onBeforeStoreLoad - publishGrid', store, topbar, field.getValue(), vm.get('selected').get('style'));
        var param = vm.get('selected'),
            extra = {};

        extra.style = encodeURIComponent(param.style);
        extra.siteid = encodeURIComponent(param.siteid);
        //extra.img = withImages.getValue();                

        Ext.apply(store.getProxy().extraParams, extra);

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        })
        
    },

    onBeforeAttributeStoreLoad: function(store, operation, eOpts){
        var me = this,
            vm = me.getViewModel();

            topbar = me.getView().down("toolbar"),
            field = topbar.down("combo[name=site]");
        
        //console.log(me, topbar, field.getValue(), vm.get('selected').get('style'));
        //store.removeAll();
        var siteId = field.getValue() <= 5 ? field.getValue() : 16;
        //console.log(field.getValue())
                
        Ext.apply(store.getProxy().extraParams, {
            style: encodeURIComponent(vm.get('selected').data.style),
            siteid: siteId
        });
    },

    onPublishSelect: function(sm, selected){
        
    },

    onSiteChange: function(combo, nValue, oValue){
        
    }

});
