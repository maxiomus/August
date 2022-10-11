Ext.define('August.view.production.windows.style.web.ColorMappingController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-style-colormapping',

    listen: {
        component: {
            'window': {
                close: function(w){                    
                    //w.unmask();
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

    onItemContextMenu: function(view, rec, item, idx, e){
        e.stopEvent();

        var me = this,
            grid = me.lookupReference('colorGrid'),
            sm = view.getSelectionModel();

        if(!sm.isSelected(rec)){
            sm.select(rec);
        }
                
        grid.contextmenu.showAt(e.getXY());
    },

    onRowSelect: function(rm, rec, idx){
        var me = this,
            grid = me.lookupReference('colorGrid');
        
        Ext.each(grid.getColumns(), function(col, idx){
            if(col.dataIndex == 'code'){
                col.getEditor().setDisabled(!rec.phantom);
                return false;
            }
        });
    },    

    /**
     *
     * @param ct Ext.grid.header.Container
     * @param column Ext.grid.column.Column
     * @param e Ext.event.Event
     * @param t HTMLElement
     */
    onGridCellClick: function(view, td, cIdx, rec, tr, rIdx, e){        
        var me = this,
            grid = me.lookupReference('colorGrid'),
            column = grid.getColumns()[cIdx],
            topbar = me.lookupReference('topbar'),
            search = me.lookupReference('searchgrid');

        console.log(grid, topbar);
        search.paramName = column.dataIndex;

        column.focus();
        //console.log(grid.getHeaderContainer(), grid.getColumns()[cIdx].focus(), column.dataIndex)
    },

    onAddClick: function(b, e){

        var me = this,
            grid = me.lookupReference('colorGrid'),
            rowEdit = grid.getPlugins()[0],
            store = grid.getStore();

        rowEdit.cancelEdit();
        store.insert(0, {});
        rowEdit.startEdit(0, 0);
    },

    onCopyClick: function(b, e){
        var me = this,
            grid = me.lookupReference('colorGrid'),
            rowEdit = grid.getPlugins()[0],
            rec = grid.getSelection()[0];

        rowEdit.cancelEdit();
        var nr = rec.copy(null);
        grid.getStore().insert(0, nr);
        rowEdit.startEdit(nr, 0);

    },

    onEditClick: function(b, e){
        var me = this,
            grid = me.lookupReference('colorGrid'),
            rowEdit = grid.getPlugins()[0],
            store = grid.getStore(),
            rec = grid.getSelection()[0];

        rowEdit.cancelEdit();

        rowEdit.startEdit(rec, store.indexOf(rec));
    },

    onRemoveClick: function(b, e){
        var me = this,
            grid = me.lookupReference('colorGrid'),
            sm = grid.getSelectionModel();

        Ext.Array.each(sm.getSelection(), function(rec, idx, a){
            rec.drop();
        });

        //console.log(sm.selected);
        if(sm.selected){
            sm.deselectAll();
        }
    },

    onRefreshClick: function(b, e){
        var me = this,
            store = me.lookupReference('colorGrid').getStore();

        store.reload();
    },

    onToolbarRemoveClick: function(c, btn){
        //console.log(c, btn);
    
        var view = c.down('viewupload');

        view.fileUpload.filesQueue.length = 0;
        view.getStore().removeAll();
        
    },

    onExportClick: function(b, e){
        var me = this,
            grid = me.lookupReference('colorGrid');        
                                
        grid.saveDocumentAs({
            type: 'csv',
            title: 'Color Mapping' + grid.getTitle(),
            fileName: 'Color Mapping ' + grid.getTitle() + ' ' + Ext.Date.format(new Date(), 'Y-m-d')
        });
    },

    onSaveClick: function(b, e){
        var me = this,
            vm = me.getViewModel(),
            session = vm.getSession(),
            batch = session.getSaveBatch(),
            changes = session.getChanges();

        //console.log(vm, session, changes);

        if(batch !== undefined){
            var processMask = new Ext.LoadMask({
                msg: 'Saving... Please wait',
                target: me.view
            });

            batch.on({
                operationcomplete: function(batch, op){                    
                    var objResp = op.getResponse();
                    
                    if(!Ext.isEmpty(objResp)){
                        
                    }
                },
                complete: function(batch, op){                    
                    var objResp = op.getResponse();
                    
                    if(!Ext.isEmpty(objResp)){
                        console.log(objResp.responseJson);    
                    }

                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.');
                    });

                },
                exception: function(batch, op){
                    processMask.hide('', function(){
                        //Ext.Msg.alert('Error', 'Error occurred');
                        var objResp = op.error.response;
                        //console.log(objResp)
                        if(!Ext.isEmpty(objResp)){
                            //var response = JSON.parse(objResp.responseText);
                            Ext.Msg.alert(objResp.statusText, objResp.responseText);
                        }

                    });
                }
            });

            processMask.show('', function(){

            });
            batch.start();
        }
        else {
            Ext.Msg.alert('No Changes', 'There are no changes to the session.');
        }
    },      

    onUploadClick: function(b, e){
        var me = this;

        me.showWindow(null, 'windows-mapping-uploadcolors', b, function(type){
            var win = me.win;                        
            
            win.on('importclick', me.onImport, me);
            win.on('close', function(c) {
                // c is self                
                me.view.unmask();
            }, me); 
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

        
        var field = me.getView().down('viewupload').fileUpload;

        field.name = "file";

        if(field && field.getFilesQueue().length > 0){

            field.send({
                url: '/WebApp/api/Files/Product/Import',
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
            view.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    }

});
