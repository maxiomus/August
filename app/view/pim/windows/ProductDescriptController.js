Ext.define('August.view.pim.windows.ProductDescriptController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.pim-windows-productdescript',

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
            vm = me.getViewModel(),

            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=site]"),
            wh = topbar.down('combo[name=warehouse]'),
            check = topbar.down('checkbox[name=preorder]'),
            withImages = topbar.down('checkbox[name=withImages]');
        
        //console.log(me, topbar, field.getValue(), vm.get('selected').get('style'));
        //store.removeAll();

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(store.getProxy().extraParams, {
            check: check.getValue(),
            img: withImages.getValue(),
            siteid: combo.getValue(),
            wh: wh.getValue(),            
            stylecolors: Ext.JSON.encode(vm.get('styles'))            
        });
    },    

    onCategorySelect: function(combo, rec){
        var me = this,
            vm = me.getViewModel(),  
            topbar = combo.up('toolbar'),
            field = topbar.down('searchtextlist');            
        
        field.paramName = combo.getValue();
        
        /*
        vm.set({
            title: rec.data.label
        });
        */
    }
});
