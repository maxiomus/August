Ext.define('August.view.production.windows.style.web.TemplateController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-style-webtemplate',

    onBeforeStoreLoad: function(store, operation, eOpts){
        var me = this,
            vm = me.getViewModel();

            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=site]"),
            wh = topbar.down('combo[name=warehouse]');
        
        //console.log(me, topbar, field.getValue(), vm.get('selected').get('style'));
        //store.removeAll();

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(store.getProxy().extraParams, {
            siteid: combo.getValue(),
            wh: wh.getValue(),
            stylecolors: Ext.JSON.encode(vm.get('styles'))            
        });
    },

    onSiteSelect: function(combo, rec){
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            grid = me.lookupReference('templateGrid');

        var name = combo.getValue() < 100 ? "SH" : rec.data.name;
            
        var etc = view.etc[name],
            store = me[etc.store]();

        grid.reconfigure(store, etc.columns);                        

        vm.set({
            title: rec.data.label
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
    },

    buildShopifyStore: function(){
        return new Ext.data.Store({
            model: "shopify.shopifyTemplate",
            storeId: "shopifytemplates",
            //type: 'buffered',

            //autoLoad: true,
                        
            //session: true,
            remoteFilter: true,
            remoteSort: true,      

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this
                    //single: true,
                }
            }
        });
    },

    buildLordTaylorStore: function(){
        return new Ext.data.Store({
            model: "shopify.lordTaylorTemplate",
            storeId: "lordtaylortemplates",            

            //session: true,
            remoteFilter: true,
            remoteSort: true,     

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this
                    //single: true,
                }
            }
        });
    },

    buildHBCStore: function(){
        return new Ext.data.Store({
            model: "shopify.HBCTemplate",
            storeId: "hbctemplates",            

            //session: true,
            remoteFilter: true,
            remoteSort: true,     

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this
                    //single: true,
                }
            }
        });
    },

    buildBelkStore: function(){
        return new Ext.data.Store({
            model: "shopify.BelkTemplate",
            storeId: "belktemplates",            

            //session: true,
            remoteFilter: true,
            remoteSort: true,     

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this
                    //single: true,
                }
            }
        });
    },
});
