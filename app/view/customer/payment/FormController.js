Ext.define('August.view.customer.payment.receiveFormController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.payment-receiveForm',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
     requires: [
        'August.model.payment.Header',
        'August.model.payment.Detail'
        //'August.view.payment.ReceiveWindow'
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
    
    onCheckChanged: function(c, idx, checked, rec, e){        
        var me = this,    
            vm = me.getViewModel(),                 
            detailGrid = me.getView().lookupReference('payment-detail-grid'),
            payment = vm.get('thePayment'),
            total = 0;

        console.log('check changed', e);

        if(checked) {
            detailGrid.getSelectionModel().select(rec);
            rec.set('paidAmount', rec.data.dueAmt);            
        }
        else {
            rec.set('paidAmount', 0);
            //rec.set('pay_credit', 0);
            rec.set('pay_discount', 0);
            rec.set('pay_writeoff', 0);            
            detailGrid.getSelectionModel().deselect(rec);            
            //console.log(detailGrid.getSelectionModel());
        }

        rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff);
        rec.set('balance', rec.data.dueAmt - rec.data.totalPay);

        detailGrid.getStore().each(function(rec, idx){
            //bomtotal += (rec.data.cost * rec.data.qty);
            if(rec.get('checked') === 1) {
                total += rec.get('paidAmount');
            }            
        });

        payment.set('totalPaid', total);
    },

    onCustomerChanged: function(c, nv, ov) {
        console.log('Customer changed', nv, ov, c.getSelection());
        var me = this,
            vm = me.getViewModel(),    
            division = me.getView().down('combo[name="division"]'),        
            select = c.getSelection();

        division.setDisabled(select === null);

        if(select != null){
            August.model.Customer.load(nv, {
                success: function(rec, op){                        
                    vm.set('theCustomer', rec);                              
                },
                callback: function(rec, op){
                    //console.log('Customer - callback', rec);                    
                }
            });   
        }
        else {
            
        }
                            
        //c.getStore().load();
    },

    /**     
     * @param combo
     * @param nv
     * @param ov
     * @param eOpts
    **/
    onDivisionChanged: function(combo, nv, ov, eOpts){

        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('thePayment'),
            customer = me.getView().down('combo[name="customer"]'),
            detailGrid = me.getView().lookupReference('payment-detail-grid'),
            store = vm.getStore('Paymentdetails');
            //toDate = toolbar.down('datefield[name="to_date"]'),                        
            //store = rec.Paymentdetails();  

        console.log('Division', detailGrid.getStore());
        if( rec.id <= 0){            

            /*
            Ext.apply(store.getProxy().extraParams, {
                customer: customer.getSelection() != null ? customer.getValue().trim() : '',
                division: combo.getSelection() != null ? combo.getValue().trim() : ''
            });
            */
            /*
            filters = store.getFilters(),
            filter1 = new Ext.util.Filter({
                //operator: 'st',
                property: 'customer',
                value: customer.getValue()
            });
            filter2 = new Ext.util.Filter({
                //operator: 'st',
                property: 'division',
                value: combo.getValue()
            });    
            
            filters.add([filter1, filter2]);
            */
                
            //detailGrid.reconfigure(store);        
            console.log('New Payment - Division Selected', rec, detailGrid.getStore());
            
            detailGrid.getStore().load();
            /*
            var details = new August.model.payment.Detail();
            details.load({
                success: function(rec, op){                        
                    
                },
                callback: function(rec, op){
                    //console.log('Customer - callback', rec);                    
                }
            });
            */
        }               
    },
    
    onTriggerClear: function(combo){
        console.log('onTrigger', combo.getValue());
        var me = this,            
            vm = me.getViewModel(),
            division = me.getView().down('combo[name="division"]');

        division.setSelection(null);
        division.setDisabled(combo.getSelection() === null);
        vm.set('theCustomer', null);
        //cmp.setData(null);
                
        //combo.getStore().load();        
    },

    onSelectionChanged: function(grid, selected, e){        
        var vm = this.getViewModel(),
            rec = vm.get('thePayment'),
            store = grid.getStore(),
            total = 0;

        selected.forEach(function(rec, idx, self){
            rec.set('checked', 1);   
            rec.set('paidAmount', rec.data.dueAmt);
            rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff);  
            rec.set('balance', rec.data.dueAmt - rec.data.totalPay);                             
        });

        var records = store.getRange();

        for (var i = 0; i < records.length; i++) {
            if(records[i].get('checked') === 1) {
                total += records[i].get('paidAmount');
            }
        }              

        rec.set('totalPaid', total);
    },

    onRowEditing: function(editor, context, e) {
        
        var rec = context["record"];
        rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff); 
        rec.set('balance', rec.data.dueAmt - rec.data.totalPay);        
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
                    title: 'Apply Credit'
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theItem: record || {
                        type: 'payment.Detail',
                        create: {
                            orderdate: view.getViewModel().get('thePayment').data.orderDate,
                            wh: view.getViewModel().get('thePayment').data.warehouse
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
            form = me.lookupReference('payment-edit-form'),
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
                rec = session.getRecord('payment.Detail', id);
                view.getStore().add(rec);

            }
            else {
                rec = session.peekRecord('purchase.Detail', id);
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
            rec = vm.get('thePayment'),
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
