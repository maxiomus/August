Ext.define('August.view.production.windows.style.TemplateController', {
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
            grid = me.lookupReference('templateGrid'),
            subCombo = grid.down("combo[name=bkcategory]"),
            shCombo = grid.down("combo[name=fgsheet]");

        subCombo.setHidden(combo.getValue() != 102);
        shCombo.setHidden(combo.getValue() != 114);

        var name = combo.getValue() < 100 ? "SH" : rec.data.name;
                    
        var etc = view.etc[name],
            store = me[etc.store]();

        grid.reconfigure(store, etc.columns);                        

        vm.set({
            title: rec.data.label
        });


    },

    onBelkCateogrySelect: function(combo, rec){
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            grid = me.lookupReference('templateGrid');

        //console.log('BK', combo);
        var name = combo.getValue();
            
        var etc = view.etc[name],
            store = me[etc.store]();

        grid.reconfigure(store, etc.columns);                        

        vm.set({
            title: rec.data.label
        });
    },

    onFGSheetSelect: function(combo, rec){
        var me = this,
            vm = me.getViewModel(),
            view = me.getView(),
            grid = me.lookupReference('templateGrid');
        
        var name = combo.getValue();
            
        var etc = view.etc[name],
            store = me[etc.store]();

        console.log('seelct', etc, store);
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

    onActSaveAsClick: function(a, b) {
        console.log('onActSaveAsClick', a, b);

        /*
        Ext.Ajax.request({
            url : '/WebApp/api/ProductTemplates/FG',
            method : 'POST',
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },
            params : {     
                style: combo.getValue(),
                color: color.getValue()               
                //page: 1,
                //start: 0,
                //limit: 100                    
            },
            //disableCaching : true,
            success : function(response, options) {                    

                var rec = JSON.parse(response.responseText);                                                                  
                
                
                //season.setValue(rec.data["season"]);
                //cancelDate.setValue(rec["cancelDate"]);                                    
                
            },
            failure : function(response, options) {
                //var result = JSON.parse(response.responseText);
                //console.log('failed!', response, options); 
                var msg = 'Style ' + response.statusText;
                Ext.Msg.alert('Error!', msg);                   
            },
            scope : this
        });
        */
    },

    onImportClick: function(b, e){
        var me = this;

        me.showWindow(null, 'windows-style-uploadstyles', b, function(type){
            var win = me.win;                        
            
            win.on('uploadclick', me.onUpload, me);
            win.on('close', function(c) {
                // c is self                
                me.view.unmask();
            }, me); 
        });    
    },    

    onUpload: function(b, e){
        
        var me = this,
            vm = me.getViewModel(),
            template = me.lookupReference('templateGrid'),  
            view = me.win.down('viewupload'),
            field = view.fileUpload,
            store = view.getStore(),            
            session = vm.getSession();
            //changes = session.getChanges();                                                                  

        
        var field = me.getView().down('viewupload').fileUpload;

        field.name = "file";

        if(field && field.getFilesQueue().length > 0){            

            var fr = new FileReader(),
                file = field.getFilesQueue()[0];

            /*
            CSV.fetch({
                file: file
            }).done(function(dataset){
                console.log(dataset);
            });
            */

            fr.addEventListener(
                "load",
                () => {
                    var store = template.getStore(),
                        styles = this.processData(fr.result);

                    console.log('up', fr.result, this.processData(fr.result));                    
                    //console.log(grid.getSelectionModel().getSelection(), grid.getSelectionModel().selected);                                        

                    vm.set('styles', styles);               

                    store.load();

                    me.win.close();
                    
                },
                false
            );

            fr.readAsText(file);
            
            /*
            field.send({
                url: '/WebApp/api/Files/StyleList/Import',
                success: function(response, opts){                                        

                    store.rejectChanges();  
                                        
                    Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                        //vm.getStore('colormappings').reload();                        
                    });

                    
                    //store.load();
                    console.log('sucess', response);

                },
                failure: function(response, opts) {
                    console.log('failure', response);
                    Ext.Msg.alert('Failure', response);
                }
            });

            me.win.close();
            */
        }
    },

    processData: function (data) {
        var allTextLines = data.split(/\r\n|\n/);
        var headers = allTextLines[0].split(',');
        var lines = [];
    
        var tarr = [];
        for (var i=1; i<allTextLines.length; i++) {
            var values = allTextLines[i].split(',');
            if (values.length == headers.length) {
    
                
                var style = '';
                for (var j=0; j<headers.length; j++) {
                    style += values[j].trim();
                    //tarr.push(headers[j]+":"+values[j]);
                }

                tarr.push(style);
                //lines.push(tarr);
            }
        }

        return tarr;
        // alert(lines);
    },

    showWindow: function(rec, xtype, btn, callback){
        var me = this,
            view = me.getView();     
        
        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true,

            animateTarget: btn,
            renderTo: Ext.getBody()
        });

        me.win.show('', function(){
            view.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
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

    buildFGProductStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.FGPTemplate",
            storeId: "fgproducttemplates",            

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

    buildFGColorStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.FGCTemplate",
            storeId: "fgcolortemplates",            

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

    buildBKStore: function(){
        return new Ext.data.Store({
            model: "shopify.BelkTemplate",
            storeId: "bktemplates",            

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

    buildBKTopStore: function(){
        return new Ext.data.Store({
            model: "shopify.BelkDsco",
            storeId: "bktoptemplates",            

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

    buildBKCoatStore: function(){
        return new Ext.data.Store({
            model: "shopify.BelkDsco",
            storeId: "bkcoattemplates",            

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

    buildBKDressStore: function(){
        return new Ext.data.Store({
            model: "shopify.BelkDsco",
            storeId: "bkdresstemplates",            

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

    buildBKBottomStore: function(){
        return new Ext.data.Store({
            model: "shopify.BelkDsco",
            storeId: "bkbottomtemplates",            

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
    },

    buildMacyMpStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.MacyTemplate",
            storeId: "macyMptemplates",            

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

    buildSaksStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.SaksTemplate",
            storeId: "saksMptemplates",            

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

    buildReitmansStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.ReitmansTemplate",
            storeId: "reitmansMptemplates",            

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

    buildHudsonsStore: function(){
        var me = this;
        
        return new Ext.data.Store({
            model: "shopify.ReitmansTemplate",
            storeId: "reitmansMptemplates",            

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
