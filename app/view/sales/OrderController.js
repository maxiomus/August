Ext.define('August.view.sales.OrderController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.sales-order',

    listen: {
        component: {
            'window': {
                close: function(w){
                    this.mv.unmask();
                }
            }
        }
    },

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();

        Ext.Ajax.request({
            url: 'resources/data/sales/stores.json',
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

        

    onAfterGridRender: function(p){

    },

    onActionNew: function(b){
        this.redirectTo("sales-order/new");
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('sales-order-grid'),
            rec = grid.getSelection()[0];

        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("sales-order/edit/" + rec.data.orderno);
    },

    onActionRefresh: function(b, c){
        this.getStore("salesorders").reload();
    },

    onActionDelete: function(b, c){
        var me = this;
        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);
                    var layout = me.lookupReference('multiview'),
                        grid = layout.lookupReference('sales-order-grid'),
                        rec = grid.getSelection()[0];

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
                }
            }
        });
    },

    onOpenPOTemplateClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            //searchlist = topbar.down('searchtextlist'),
            grid = multiview.lookupReference('sales-order-grid'),
            rec = grid.getSelectionModel().selected.items[0];        

            //console.log(rec);
        me.showWindow(rec, 'windows-po-generate', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                combo = win.down('combo[name="category"]'),
                field = win.down('searchtextlist'),
                grid = win.lookupReference('orderItemsGrid'),        
                template = win.lookupReference('poTemplateGrid'),   
                btnSave = win.down('button[action="save"]');        
                                    
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);            

            //btnSave.setDisabled(template.getStore().getCount() == 0);

            win.on('resetclick', function(b,c) {
                var store = grid.getStore();                    

                var selected = template.getSelectionModel().selected;
                template.getStore().each(function(rec, index){
                    rec.drop();
                });
                                
                store.load();

            }, me);

            win.on('saveclick', function(btn, type){
                                
                var vm = win.getViewModel(),
                    session = vm.getSession(),
                    batch = session.getSaveBatch(),
                    changes = session.getChanges();
                    grid = win.lookupReference('poTemplateGrid'),
                    store = grid.getStore();
                                                    
                console.log(vm, session, changes);
                
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: win
                });

                store.sync({                    
                    success: function(batch, opts) {                                                                                               
                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                
                            });
                        });                
                    },
                    failure: function(batch, opts) {
                        console.log('failure', batch.exceptions[0].error.response);
                        var resp = batch.exceptions[0].error.response;
                        processMask.hide('', function() {
                            Ext.Msg.alert(resp.statusText + ' - ' + resp.status, resp.responseJson.Message);
                        });
                    },
                    callback: function (batch, opts) {
                        console.log('callback', batch, opts);
                        
                    }
                });

                //me.win.close();
                processMask.show();                
                
                /*
                if(batch !== undefined){
                    var processMask = new Ext.LoadMask({
                        msg: 'Saving... Please wait',
                        target: me.view
                    });

                    batch.on({
                        operationcomplete: function(batch, op){
                            console.log(op, op.getResultSet(),op.getResponse());
                            var objResp = op.getResponse();
                            if(!Ext.isEmpty(objResp)){
                                //var response = JSON.parse(objResp.responseText);
                            }
                        },
                        complete: function(batch, op){
                            console.log(op, op.getResponse());
                            var objResp = op.getResponse();
                            if(!Ext.isEmpty(objResp)){
                                //var response = JSON.parse(objResp.responseText);
                            }

                            processMask.hide('', function() {
                                Ext.Msg.alert('Status', 'Changes saved successfully.');
                            });

                        },
                        exception: function(batch, op){
                            processMask.hide('', function(){
                                //Ext.Msg.alert('Error', 'Error occurred');
                                var objResp = op.error.response;
                                console.log(objResp)
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
                */

            }, me);
        });
    },


    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView(),
            multiview = view.lookupReference('multiview');

        me.isEdit = !!rec;

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                data: {
                    selected: rec
                }
            },
            // Create a child session that will spawn from the current session of this view
            session: true,

            renderTo: Ext.getBody()
        });

        me.win.show('', function(){
            me.mv.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },
    
    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
    },

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchgrid = topbar.down('searchgrid'),
            grid = layout.lookupReference("sales-order-grid");

        searchgrid.setValue('');
        searchgrid.getTrigger('clear').hide();
        grid.filters.clearFilters();
    },


    /**
     *
     * @param sm
     * @param rec
     * @param index
     * @param eOpts
     */
    onSelect: function(sm, rec, index, eOpts){
        //onSelectionChange: function(sm, selected, eOpts) {

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        display.setActive(rec);

        //console.log(rec);
        this.redirectTo('sales-order/default/' + rec.get('orderno'));
    },

    onFilterItemChange: function(combo, j, g, l){
        var topbar = combo.up("topbar"),
           m = topbar.down("searchgrid"),
           n = topbar.down("searchnumber"),            
           j = combo.getValue();

        switch(j){
            /*
           case "grp":
               if (st === '') {
                   st = 'groups';
               }
           case "subcategory":
               if (st === '') {
                   st = 'subcategories';
               }
           */           
           case "orderno":
               n.paramName = j;
               n.show();               
               m.setValue('');
               m.hide();
               break;
           default:
               m.paramName = j;
               m.show();         
               n.setValue('');
               n.hide();               
       }                
   },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }
        this.view.contextmenu.showAt(l.getXY());
    }

});
