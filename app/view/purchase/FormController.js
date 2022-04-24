Ext.define('August.view.purchase.OrderFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.purchase-orderForm',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
    requires: [
        'August.model.purchase.Order',
        'August.model.purchase.OrderItem',        
        //'August.model.purchase.SalesOrderItem',        
        'August.view.purchase.OrderWindow'
    ],

    init: function(){
        var vm = this.getViewModel();
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
        var view = this.lookupReference('po-view');
        view.setSelection(rec);
    },

    // Items...
    onAddItemClick: function(btn){
        var me = this,
            view = me.lookupReference('po-view');

        me.showWindow(null, 'po-window');
    },

    onCopyItemClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            session = me.getViewModel().getSession(),
            view = me.lookupReference('po-view'),
            d = view.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        view.getStore().add(nd);

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
            //refs = this.getReferences(),
            view = me.lookupReference('po-view'),
            selection = view.getSelection()[0];

        //console.log('onEdit', selection)
        me.showWindow(selection, 'po-window');
    },

    onDeleteItemClick: function(btn){
        var me = this,
            //refs = me.getReferences(),
            view = me.lookupReference('po-view'),
            //store = grid.getStore(),
            selection = view.getSelectionModel().getSelection()[0];

        //store.remove(grid.getSelection()[0]);
        selection.drop();
        view.getSelectionModel().deselectAll();

    },

    onItemDblClick: function(grid, rec, tr, idx, e){
        //var btn = this.lookupReference('edit');
        var me = this;

        me.showWindow(rec, 'po-window');
        //console.log(rec)
    },

    onItemContextMenu: function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    onVendorChanged: function(combo, nv, ov){
        //console.log('onVendorChanged', nv, ov);
        var me = this,
            vm = me.getViewModel();

        August.model.Vendor.load(nv,{
            success: function(rec, op){                        
                vm.set('theVendor', rec);                
            }
        });
        
    },

    onShipToChanged: function(combo, nv, ov){
        //console.log('onShipToChanged', nv, ov);
        var me = this,
            vm = me.getViewModel();

        August.model.ShipTo.load(nv, {
            success: function(rec, op){
                vm.set('theShipTo', rec);                
            }
        });
        
    },

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
                        /*
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
                         */
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
