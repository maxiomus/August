Ext.define('August.view.settings.product.ColorMappingController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.product-colormapping',

    listen: {
        component: {
            'window': {
                close: function(w){
                    Ext.getBody().unmask();
                }
            }
        }
    },

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();

        Ext.Ajax.request({
            url: 'resources/data/settings/product/stores.json',
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
            vm = me.getViewModel();
            /*
            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=site]"),
            wh = topbar.down('combo[name=warehouse]'),
            check = topbar.down('checkbox[name=preorder]'),
            withImages = topbar.down('checkbox[name=withImages]');    
            */

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        /*
        Ext.apply(store.getProxy().extraParams, {
            check: check.getValue(),
            img: withImages.getValue(),
            siteid: combo.getValue(),
            wh: wh.getValue(),            
            stylecolors: Ext.JSON.encode(vm.get('styles'))            
        });
        */
    },

    onToolbarRemoveClick: function(c, btn){
        //console.log(c, btn);
    
        var view = c.down('viewupload');

        view.fileUpload.filesQueue.length = 0;
        view.getStore().removeAll();
        
    },

    onUploadClick: function(b, e){
        var me = this;

        me.showWindow(null, 'windows-mapping-uploadcolors', b, function(type){
            var win = me.win;                        
            
            win.on('importclick', me.onImport, me);
        });    
    },

    onImport: function(b, e){
        
        var me = this,
            vm = me.getViewModel(),
            view = me.win.down('viewupload'),
            field = view.fileUpload,
            store = view.getStore(),            
            session = vm.getSession();
            //changes = session.getChanges();                                                                  

        if(field && field.getFilesQueue().length > 0){

            field.send({
                url: '/WebApp/api/Files/ColorMap/Import',
                success: function(response, opts){                                        

                    store.rejectChanges();  
                                        
                    Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                        vm.getStore('colormappings').reload();                        
                    });

                    /*
                    new Ext.window.Window({
                        autoShow: true,
                        title: 'Changes saved successfully.',
                        modal: true,
                        width: 600,
                        height: 400,
                        layout: 'fit',
                        items: {
                            xtype: 'textarea',
                            value: JSON.stringify(response.data, null, 4)
                        }
                    });                    
                    */
                    //store.load();
                    console.log('sucess', response);

                },
                failure: function(response, opts) {
                    console.log('failure', response);
                    Ext.Msg.alert('Failure', response);
                }
            });

            me.win.close();
        }
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
            Ext.getBody().mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    }

});
