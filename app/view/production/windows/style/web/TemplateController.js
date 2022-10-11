Ext.define('August.view.production.windows.style.web.TemplateController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-style-webtemplate',

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();

        Ext.Ajax.request({
            url: 'resources/data/production/windows/stores.json',
            scope: me,
            success: function(response){
                var o = {};

                try {
                    o = Ext.decode(response.responseText);
                }
                catch(e){
                    alert(e.message);
                    return;
                }

                if(!o.success){
                    // @todo error handling
                    alert("Unknow error occurs!");
                    return;
                }

                Ext.Object.each(o.stores, function(key, value, itself){
                    var store = me.getViewModel().getStore(key);
                    //console.log(store, key, value)
                    if(store && value){
                        store.loadData(value);
                    }
                });
            },
            failure: function(response){

            }
        });

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

    buildNordstromStore: function(){        
        return new Ext.data.Store({
            model: "shopify.Nordstrom",
            storeId: "nordstromtemplates",            

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

    
    buildKohlsStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.Kohls",
            storeId: "kohlstemplates",            

            //session: true,
            remoteFilter: true,
            remoteSort: true,     

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this
                    //single: true,
                }
                /*
                beforeload: function(s){                                                                                          
                    var vm = me.getViewModel();

                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    });

                    Ext.apply(s.getProxy().extraParams, {     
                        siteid: 3,                               
                        stylecolors: Ext.JSON.encode(vm.get('styles'))            
                    });
                }
                */
            }
        });
    },

    buildBelkMpStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.BelkMp",
            storeId: "belkMptemplates",            

            //session: true,
            remoteFilter: true,
            remoteSort: true,     

            listeners: {
                beforeload: {
                    fn: 'onBeforeStoreLoad',
                    scope: this
                    //single: true,
                }
                /*
                beforeload: function(s){                                                                                          
                    var vm = me.getViewModel();

                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    });

                    Ext.apply(s.getProxy().extraParams, {     
                        siteid: 3,                               
                        stylecolors: Ext.JSON.encode(vm.get('styles'))            
                    });
                }
                */
            }
        });
    },

    buildSpoMpStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.SPO",
            storeId: "spoMptemplates",            

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

    buildAmazonMpStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.AmazonTemplate",
            storeId: "amazonMptemplates",            

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
    }
});
