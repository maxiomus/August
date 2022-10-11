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

    onExportClick: function(btn, owner){                
        var me = this,
            grid = me.lookupReference('payment-detail-grid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Payment Detail List',
            fileName: 'Payment Details ' + Ext.Date.format(new Date(), 'Y-m-d')
        });        
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

    onTriggerClear: function(combo){
        
        var me = this,            
            vm = me.getViewModel(),
            division = me.getView().down('combo[name="division"]');
        
        division.setSelection(null);
        //console.log('onTrigger', combo.getValue(), vm.get('thePayment').get('customer'));
        division.setDisabled(combo.getSelection() === null);
        vm.set('theCustomer', null);
        //cmp.setData(null);
                
        //combo.getStore().load();        
    },

    /*
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
    */
    onCustomerChanged: function(c, nv, ov) {
        //console.log('Customer changed', nv, ov, c.getSelection());
        var me = this,
            vm = me.getViewModel(),    
            division = me.getView().down('combo[name="division"]'),   
            received = me.getView().down('numberfield[name="amt"]'),     
            select = c.getSelection();
        
        division.setDisabled(select === null || received.getValue() === 0);

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
            store = vm.getStore('Paymentdetails'),
            creditStore = vm.getStore('credits');
            //toDate = toolbar.down('datefield[name="to_date"]'),                        
            //store = rec.details();              
            //store = detailGrid.getStore();
        
        if( rec.id <= 0){            
            
            Ext.apply(store.getProxy().extraParams, {
                customer: customer.getSelection() != null ? customer.getValue().trim() : '',
                division: combo.getSelection() != null ? combo.getValue().trim() : ''
            });

            Ext.apply(creditStore.getProxy().extraParams, {
                customer: customer.getSelection() != null ? customer.getValue().trim() : ''
                //division: combo.getSelection() != null ? combo.getValue().trim() : ''
            });
                        
            creditStore.load({
                callback: function(recs, op, success){
                    var total = 0;
                    Ext.Array.each(recs, function(r){
                        
                        total += r.get('balance');
                    });

                    rec.set('available_credit', -1 * total);
                }
            });

            store.load({
                callback: function(recs, op, success){
                    console.log('Division', store, detailGrid.getStore());
                    /*
                    var a = [];
                    Ext.Array.each(recs, function(r){
                        a.push(r.getData())
                    });

                    rec.set('Paymentdetails', a);
                    */
                    //console.log('store load', recs, store.getRange(), rec.details());
                    //rec.details().getProxy().setData(recs);        
                    //detailGrid.reconfigure(store);        
                       
                    //console.log('New Payment - Division Selected'); 
                }
            });                    
            
            //detailGrid.reconfigure(store);                                
            //rec.set('Paymentdetails', store.load().getData().items);
                        
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

    onUncheckClick: function(btn, e){
        var me = this,
            vm = me.getViewModel(),
            session = vm.getSession(),
            form = me.getView(),
            grid = form.lookupReference('payment-detail-grid'),
            selection = grid.getSelectionModel().getSelection(),
            payment = vm.get('thePayment'),
            store = payment.details(),
            total = 0;

        Ext.each(selection, function(rec, idx, self){
            rec.set('checked', false);
            rec.set('paidAmount', 0);
            //rec.set('pay_credit', 0);
            rec.set('pay_discount', 0);
            rec.set('pay_writeoff', 0);    

            rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff);
            rec.set('balance', rec.data.dueAmt - rec.data.totalPay);

            var selected = session.peekRecord('payment.Detail', rec.data.did);
            
            store.remove(selected);
            session.evict(selected);
        });
                
        grid.getStore().each(function(rec, idx){            
            if(rec.get('checked')) {
                total += rec.get('paidAmount');
            }            
        });

        payment.set('totalPaid', total);

        grid.getSelectionModel().deselectAll();
        
    },

    onCheckChanged: function(c, idx, checked, rec, e){        
        var me = this,    
            vm = me.getViewModel(),    
            session = vm.getSession(),             
            detailGrid = me.getView().lookupReference('payment-detail-grid'),            
            sm = detailGrid.getSelectionModel(),
            payment = vm.get('thePayment'),
            store = payment.details(),
            total = 0;

        //sm.select(rec, false, true);        
        //console.log('check changed', rec, payment.details(), detailGrid.getStore());
        
        if(checked) {
            //detailGrid.getSelectionModel().select(rec);
            var balance = payment.get('bal');
            if(balance <= rec.get('dueAmt')){
                rec.set('paidAmount', balance);            
            }
            else {
                rec.set('paidAmount', rec.get('dueAmt'));            
            }            
            
        }
        else {
            
            rec.set('paidAmount', 0);
            //rec.set('pay_credit', 0);
            rec.set('pay_discount', 0);
            rec.set('pay_writeoff', 0);            
            
            //detailGrid.getSelectionModel().deselect(rec);            
            //console.log(detailGrid.getSelectionModel());
        }        

        rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff);
        rec.set('balance', rec.data.dueAmt - rec.data.totalPay);
        
        detailGrid.getStore().each(function(rec, idx){
            //bomtotal += (rec.data.cost * rec.data.qty);
            if(rec.get('checked')) {
                total += rec.get('paidAmount');
            }            
        });

        payment.set('totalPaid', total);

        if(checked){
            var newRec = Ext.create('August.model.payment.Detail', {
                id: rec.get('did'),
                paymentNo: rec.get('paymentNo'),
                invoiceNo: rec.get('invoiceNo'),
                cmno: rec.get('cmno'),
                paymentDate: rec.get('paymentDate') ? rec.get('paymentDate') : payment.get('paymentDate'),
                paidAmount: rec.get('paidAmount'),
                pay_discount: rec.get('pay_discount'),
                pay_writeoff: rec.get('pay_writeoff'),
                pay_credit: rec.get('pay_credit'),
                charge_type: rec.get('charge_type') ? rec.get('charge_type') : rec.get('trans_type'),
                adjust_id: rec.get('adjust_id')            
            });

            store.add(newRec);            
        }
        else {
            var selected = session.peekRecord('payment.Detail', rec.data.did);
            
            store.remove(selected);
            session.evict(selected);
        }

        //console.log(detailGrid.getSelection(), sm.selected);
    },
         
    onSelect: function(sm, rec, idx, e){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('payment-detail-grid'),
            //vm = this.getViewModel(),        
            //payment = vm.get('thePayment'),
            column = grid.getColumns()[1],
            checked = rec.get('checked');
            //cell = grid.getView().getCell(rec, column, true),
            //store = sm.getStore(),                        
            //store = payment.details(),
            //total = 0;
        
        if(checked == 0 || checked == false){
            rec.set('checked', true);

            column.fireEvent('checkchange', column, idx, true, rec, e);
        }        
                
        /*
        var balance = payment.get('bal');
        if(balance <= rec.get('dueAmt')){
            rec.set('paidAmount', balance);            
        }
        else {
            rec.set('paidAmount', rec.get('dueAmt'));            
        }  
        
        rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff);
        rec.set('balance', rec.data.dueAmt - rec.data.totalPay);
        
        grid.getStore().each(function(rec, idx){
            //bomtotal += (rec.data.cost * rec.data.qty);
            if(rec.get('checked')) {
                total += rec.get('paidAmount');
            }            
        });

        payment.set('totalPaid', total);

        var newRec = Ext.create('August.model.payment.Detail', {
            id: rec.get('did'),
            paymentNo: rec.get('paymentNo'),
            invoiceNo: rec.get('invoiceNo'),
            cmno: rec.get('cmno'),
            paymentDate: rec.get('paymentDate') ? rec.get('paymentDate') : payment.get('paymentDate'),
            paidAmount: rec.get('paidAmount'),
            pay_discount: rec.get('pay_discount'),
            pay_writeoff: rec.get('pay_writeoff'),
            pay_credit: rec.get('pay_credit'),
            charge_type: rec.get('charge_type') ? rec.get('charge_type') : rec.get('trans_type'),
            adjust_id: rec.get('adjust_id')            
        });

        store.add(newRec); 
        */
    },

    onSelectionChanged: function(sm, selected, e){        
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('payment-detail-grid'),
            vm = this.getViewModel(),        
            payment = vm.get('thePayment'),
            column = grid.getColumns()[1],
            cell = grid.getView().getCell(selected[0], column, true),
            //store = sm.getStore(),            
            store = payment.details(),
            total = 0;

        var el = cell.query('.x-grid-checkcolumn', false)[0];        
                
        el.on('click', function(){
            //console.log('hell click', this);
        }, el);

        el.fireEvent('click');
        /*        
        selected.forEach(function(rec, idx, self){
            rec.set('checked', true);   
            //rec.set('paidAmount', rec.data.dueAmt);
            //rec.set('totalPay', rec.data.paidAmount + rec.data.pay_credit + rec.data.pay_discount + rec.data.pay_writeoff);  
            //rec.set('balance', rec.data.dueAmt - rec.data.totalPay);           
                                
        });       
        */
         
        
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
            detailGrid = form.lookupReference('payment-detail-grid'),
            store = detailGrid.getStore(),
            viewer = form.up('viewer'),
            vm = me.getViewModel(),
            //entities = vm.getSchema().entities,
            //entityNames = Ext.Object.getKeys(entities),
            rec = vm.get('thePayment'),
            session = vm.getSession();            

        //console.log('onSave', entityNames, entities);        

        //var details = rec.get('Paymentdetails');        
        //var created = session.peekRecord('payment.Header', rec.getId());             
        session.data['payment.Detail'] = null;        

        if(form.isValid()){
            
            var batch = session.getSaveBatch(),
                changes = session.getChanges();

            
            //var created = changes["payment.Header"];                        
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
