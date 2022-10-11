Ext.define('August.view.purchase.OrderFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.purchase-orderForm',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
    requires: [
        'August.model.purchase.Order',
        'August.model.purchase.OrderItem'   
        //'August.model.purchase.SalesOrderItem',        
        //'August.view.purchase.OrderWindow'
    ],

    init: function(){
        var me = this;
        vm = me.getViewModel(),
        me.mv = August.app.getMainView();
        //console.log('init', vm.linkData.thePO);
        console.log('init', this.getReferences());
    },

    initViewModel: function(vm) {

        var rec = vm.linkData.thePO;
        console.log('initViewModel', vm.linkData);
    },

    onItemSelect: function(sm, rec){
        //var sm = view.getSelectionModel();
        //console.log(this.getView(), sm);
        //var view = this.lookupReference('po-view');
        //view.setSelection(rec);
    },

    // Items...
    onAddItemClick: function(btn){
        var me = this,
        //form = me.getView(),
            refs = this.getReferences();

        //this.showWindow(btn, null);

        var me = this,
            form = me.getView(),
            //refs = this.getReferences(),
            grid = form.lookupReference('po-grid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin("poGridRowEdit");        

        rowEdit.cancelEdit();

        var rec = store.insert(0, {            
            line: store.getCount() + 1,
            status: 'Open',
            warehouse: form.down('combo[name="warehouse"]').getValue(),
            etadate: form.down('datefield[name="etaDate"]').getValue()          
        });

        var override = grid.getPlugin('poRowExpander');                             
        override.expandAll(); 

        rowEdit.startEdit(0, 0);
    },

    onCopyItemClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            session = me.getViewModel().getSession(),
            grid = me.lookupReference('po-grid'),
            store = grid.getStore(),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        nd.set('line', store.getCount());
        nd.set('status', 'Open');        

        grid.getStore().add(nd);

        var override = grid.getPlugin('poRowExpander');                             
        override.expandAll(); 
        /*
         d.powms().each(function (m) {
         nd.powms().add(m.copy(null, session));
         console.log('materials',m)
         });

         d.tnaps().each(function (p) {
         nd.tnaps().add(p.copy(null, session));
         console.log('tnaps', m)
         });
         */
        //console.log('onCopyStyleClick', d, nd);
        //grid.getView().refresh();        
    },

    onEditItemClick: function(btn){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('po-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("poGridRowEdit");

        //console.log('onEdit', selection)
        //this.showWindow(btn, selection);            

        rowEdit.cancelEdit();
        rowEdit.startEdit(selection, 0);  
    },

    onDeleteItemClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            view = me.lookupReference('po-grid'),
            //store = grid.getStore(),
            selection = view.getSelectionModel().getSelection()[0];

        //store.remove(grid.getSelection()[0]);
        selection.drop();
        view.getSelectionModel().deselectAll();

    },

    onItemDblClick: function(grid, rec, tr, idx, e){
        
    },

    onItemContextMenu: function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    onRowEditing: function(editor, context, e) {
        
        var rec = context["record"];
        //console.log('onRowEditing', rec);
        rec.set('unitSum', rec.get('unit1') + rec.get('unit2') + rec.get('unit3') + rec.get('unit4') + rec.get('unit5') + rec.get('unit6') + 
            rec.get('unit7') + rec.get('unit8') + rec.get('unit9') + rec.get('unit10') + rec.get('unit11') + rec.get('unit12') + rec.get('unit13')); 
        rec.set('extPrice', rec.data.unitSum * rec.data.price);        
    },

    onSelectionChanged: function(sm, selected, e) {
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('po-grid'),
            columns = grid.getColumns(),
            rec = selected[0];

        if(rec != null){
            var index = 0;
            Ext.each(columns, function(col, idx){                        
                
                if(idx > 5 && idx < 17) {
                    index = idx - 5;  
                    col.setText(rec.get('size'+index));             
                }                        
            });
        }
    },

    onStyleComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('po-grid'),
            selection = grid.getSelection()[0];                              
                
        selection.set('descript', rec.get('descript'));
    },

    onColorComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('po-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("poGridRowEdit"),            
            style = combo.previousSibling('combo[name="style"]'),
            price = combo.next('numberfield[name="price"]'),
            //season = combo.next('combo[name="season"]'),
            etaDate = combo.next('datefield[name="etaDate"]');          
                 
    },    

    onVendorChanged: function(c, nv, ov) {
        //console.log('Customer changed', nv, ov, c.getSelection());
        var me = this,
            vm = me.getViewModel(),
            storeCombo = c.next('combo[name="shipto"]'),
            select = c.getSelection(),
            cmp = me.getView().down('component[name="vendorAddress"]');

        if(select != null){
            August.model.Vendor.load(nv, {
                success: function(rec, op){                        
                    vm.set('theVendor', rec);          
                    storeCombo.getStore().load();
                },
                callback: function(rec, op){
                    //console.log('Customer - callback', rec);
                    storeCombo.setDisabled(select == null);                
                }
            });   
        }
        else {

            cmp.setData(null);
        }

        //c.getStore().load();
    },

    onShipToChanged: function(combo, nv, ov){
        //console.log('onShipToChanged', nv, ov);                
        console.log('onShipToChanged', nv, ov);
        var me = this,
            vm = me.getViewModel(),
            vendorCb = combo.prev('combo[name="vendor"]'),
            cmp = me.getView().down('component[name="shipToAddress"]');

        August.model.ShipTo.getProxy().setUrl('/WebApp/api/Vendors/ShipTo/');
        
        if(nv != null) {
            August.model.ShipTo.load(nv, {
                success: function(rec, op){
                    vm.set('theShipTo', rec);                
                }
            });
        }     
        else {
            cmp.setData(null);
        }  
        
        combo.setDisabled(nv == null); 
    },    

    onTriggerClear: function(combo){
        
        var me = this,
            shipToCb = combo.next('combo[name="shipto"]'),
            cmp = this.getView().down('component[name="shipToAddress"]');

        //cmp.setData(null);
        
        shipToCb.setValue('');
        combo.getStore().load();        
    },

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView();        

        me.win = view.add({
            xtype: xtype,

            viewModel: {
                
            },
            // Create a child session that will spawn from the current session of this view
            session: true,

            renderTo: Ext.getBody()
        });

        me.win.show('', function(){
            me.mv.mask();
        });

        me.win.on('close', function(p){
            me.mv.unmask();            
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },

    onPrintClick: function(b, e){
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('thePO');
            
        me.showWindow(rec, 'purchase-windows-printpo', function(type){

            var win = me.win,
                wvm = win.getViewModel();
                                      
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);                        

            //btnSave.setDisabled(template.getStore().getCount() == 0);                                                       
        });
    },    

    /*
    showWindow: function(record, xtype, callback){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer');

        //console.log(window.innerWidth, window.innerHeight)
        me.isEdit = !!record;
        me.win = view.add({
            xtype: xtype,
            reference: xtype,

            //alignTarget: '',
            //width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1480,
            //maxWidth: 1366,
            //height: window.innerHeight < 760 ? (view.getHeight() * 0.94) : 600,
            renderTo: Ext.getBody(),

            viewModel: {
                data: {
                    title: !record ? 'Add New Item' : ('Edit Item: ' + (record.get('style') && record.get('color') ? ' (' + record.get('style') + ' / ' + record.get('color') + ')' : ''))
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theItem: record || {
                        type: 'purchase.OrderItem',
                        create: {
                            orderdate: view.getViewModel().get('thePO').data.orderDate,
                            wh: view.getViewModel().get('thePO').data.warehouse
                            //create_user: August.account.data.AccountId
                        }
                    }
                }
            },
            // Creates a child session that will spawn from the current session
            // of this view.
            session: true,

            buttons: [{
                text: 'Save',
                bind: {
                    //disabled: '{!isStyleValid}'
                },
                handler: me.onSaveItemClick,
                scope: me
            }, {
                text: 'Cancel',
                handler: function(b){
                    me.win.close();
                }
            }]
        });


        //var rec = me.win.getViewModel().get('theItem');
        //console.log('showWindow', rec);
        //matStore.sort('lineseq', 'ASC');

        me.win.on('close', function(p){
            viewer.up('maincontainerwrap').unmask();
        });

        me.win.show('', function(){
            viewer.up('maincontainerwrap').mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },
    */

    onSaveItemClick: function(b){
        // Save the changes pending in the win's child session back to the
        // parent session.
        console.log('onSaveItemClick', this.getReferences());
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('po-edit-form'),
            view = me.lookupReference('po-view'),
            isEdit = me.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theItem').id;
            }
            
            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('purchase.Order', id);
                view.getStore().add(rec);

            }
            else {
                rec = session.peekRecord('purchase.Order', id);
            }

            /*
            var data = [];
            win.getViewModel().get('theItem').pis(function(pis){
                piss.each(function(item){
                    //data.push(item.data);
                })
            });
            */

            me.win.close();
        }
    },

    onRefresh: function(btn, e){
        
        var me = this,
            form = me.getView(),
            vm = me.getViewModel();                
        
        var processMask = new Ext.LoadMask({
            msg: 'Loading... Please wait',
            target: form
        });        

        processMask.show();

        August.model.purchase.Order.load(vm.get('thePO').id, {
            scope: this,
            success: function(rec, op){
                vm.set('thePO', rec);     

                processMask.hide('', function() {
                    
                });
            }
        });        

    },

    onSave: function(action){
        var me = this,
            form = me.getView(),
            viewer = form.up('viewer'),
            vm = me.getViewModel(),
            //entities = vm.getSchema().entities,
            //entityNames = Ext.Object.getKeys(entities),
            rec = vm.get('thePO'),
            session = vm.getSession(),
            changes = session.getChanges();

        //console.log('onSave', entityNames, entities);        

        if(form.isValid()){
            
            var batch = session.getSaveBatch();
            //changes = session.getChanges();
            console.log('onSave', changes, batch);
            //var changes = me.getView().getSession().getChanges();
            if(changes != null && changes["purchase.Order"] != undefined){
                delete changes["purchase.OrderItem"];
            }
            
            if(batch !== undefined){
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: viewer
                });

                batch.on({
                    complete: function(batch, op){

                        var response = op.getResponse();
                        //console.log(response);
                        //refresh In-Review
                        me.onClose();

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
                                //var response = objResp;
                                Ext.Msg.alert(objResp.statusText + ' - '+objResp.status, objResp.responseJson.Message);
                            }

                        });
                    }
                });

                processMask.show();
                batch.start();
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            /*
            if (changes !== null) {
                new Ext.window.Window({
                    autoShow: true,
                    title: 'Session Changes',
                    modal: true,
                    width: 600,
                    height: 400,
                    layout: 'fit',
                    items: {
                        xtype: 'textarea',
                        value: JSON.stringify(changes, null, 4)
                    }
                });
            }
            else {
                Ext.Msg.alert('No Changes', 'There are no changes to the session.');
            }
            */

        }
    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
    }

});
