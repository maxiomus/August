Ext.define('August.view.customer.invoice.FormController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.invoice-form',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
     requires: [
        'August.model.invoice.Header',
        'August.model.invoice.Detail',
        'Ext.ux.grid.plugin.AllRowExpander'
        //'August.view.payment.ReceiveWindow'
    ],
    
    calculateSum: function(store, rec) {
        var misc = 0,
            subTotal = 0,
            total = 0;

        //console.log('calculateSum', store);
        store.each(function(r){
            subTotal = subTotal + r.get('extPrice');
        });

        rec.set('subtotal', subTotal);

        //misc = subTotal * -0.18;
        //rec.set('misc', misc);

        total = subTotal + rec.get('discount') + rec.get('misc') + rec.get('freight');
        rec.set('total', total);        

    },

    init: function(){
        var vm = this.getViewModel();
        //console.log('init', vm.linkData.theOrder);
        console.log('init', this.getReferences());
    },

    initViewModel: function(vm) {

        var me = this,
            form = me.getView(),
            grid = form.down('inv-grid'),
            rec = vm.linkData.theInvoice;

        var binding = vm.bind('{theInvoice}', function(rec){            

            var store = rec.INVDs();
            store.on('update', function(s, rs, i){
                //console.log('update', s, rs);
                
                me.calculateSum(store, rec);
                console.log('update', rec);                
            });            

        });

        console.log('initViewModel', rec);

    },

    onRender: function(form) {
        var grid = form.lookupReference("inv-grid"),
            store = grid.getStore();

        console.log('FormController', grid, store);
    },

    onItemSelect: function(sm, rec){
        //var sm = view.getSelectionModel();
        //console.log(this.getView(), sm);
        var view = this.lookupReference('inv-view');
        view.setSelection(rec);
    },
    
    // Items...
    onAddItemClick: function(btn){        

        var me = this,
            form = me.getView(),
            //refs = this.getReferences(),
            grid = form.lookupReference('inv-grid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin("invGridRowEdit");        

        rowEdit.cancelEdit();

        var rec = store.insert(0, {            
            line: store.getCount() + 1,
            status: 'Open',
            warehouse: 'WH',
            salesrep1: form.down('combo[name="salesrep1"]').getValue(),
            salesrep2: form.down('combo[name="salesrep2"]').getValue()            
        });

        var override = grid.getPlugin('invRowExpander');                             
        override.expandAll(); 

        rowEdit.startEdit(0, 0);
    },

    onCopyItemClick: function(btn){
        var me = this,
            form = me.getView(),
            session = me.getViewModel().getSession(),
            grid = form.lookupReference('inv-grid'),
            store = grid.getStore(),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        nd.set('line', store.getCount());
        nd.set('status', 'Open');
        nd.set('userName', August.loggedInUser.userId);
        nd.set('userTime', new Date());

        grid.getStore().add(nd);

        var override = grid.getPlugin('invRowExpander');                             
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
            grid = form.lookupReference('inv-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("invGridRowEdit");

        //console.log('onEdit', selection)
        //this.showWindow(btn, selection);            

        rowEdit.cancelEdit();
        rowEdit.startEdit(selection, 0);  
    },

    onDeleteItemClick: function(btn){
        var me = this,
            form = me.getView(),
            vm = me.getViewModel(),
            rec = vm.get('theInvoice'),
            grid = form.lookupReference('inv-grid'),
            store = grid.getStore(),
            selection = grid.getSelection()[0];

        //store.remove(grid.getSelection()[0]);
        //selection.drop();
        grid.getSelectionModel().deselectAll();

        Ext.Msg.show({
            title:'Warning!',
            message: 'Are you sure you want to delete this?',
            buttons: Ext.Msg.OKCANCEL,
            icon: Ext.Msg.QUESTION,
            fn: function(btn) {
                if (btn === 'ok') {
                    //grid.getStore().remove(rec);                    
                    //me.calculateOnRemove(rec);                    
                    selection.drop();                                        
                    me.calculateSum(store, rec);                

                    grid.getSelectionModel().deselectAll();
                }
            }
        });
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
        
        var grid = context["grid"],
            store = grid.getStore(),
            rec = context["record"];
            
        console.log('onRowEditing', rec);

        rec.set('totalUnit', rec.get('unit1') + rec.get('unit2') + rec.get('unit3') + rec.get('unit4') + rec.get('unit5') + rec.get('unit6') + 
            rec.get('unit7') + rec.get('unit8') + rec.get('unit9') + rec.get('unit10') + rec.get('unit11') + rec.get('unit12') + rec.get('unit13')); 

        rec.set('extPrice', rec.data.totalUnit * rec.data.price);   
        
        //this.calculateSum(store);
    },

    onSelectionChanged: function(sm, selected, e) {
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('inv-grid'),
            columns = grid.getColumns(),
            rec = selected[0];

        if(rec != null){
            var index = 0;
            Ext.each(columns, function(col, idx){                        
                
                if(idx > 4 && idx < 16) {
                    index = idx - 4;  
                    col.setText(rec.get('size'+index));             
                }                        
            });
        }
    },

    onStyleComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('inv-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("invGridRowEdit"),            
            color = combo.next('combo[name="color"]'),
            price = combo.next('numberfield[name="price"]');
            //season = combo.next('combo[name="season"]'),
            //cancelDate = combo.next('datefield[name="cancelDate"]');            
        
        if((combo.getValue() != selection.get('style')) && !Ext.isEmpty(combo.getValue()) && !Ext.isEmpty(color.getValue())) {
            
            Ext.Ajax.request({
                url : '/WebApp/api/Products/SI',
                method : 'GET',
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
                    
                    selection.set('style_id', rec.data["style_id"]);
                    selection.set('style', rec.data["style"]);
                    selection.set('color', rec.data["color"]);
                    selection.set('descript', rec.data["descript"]);
                    selection.set('price', rec.data["price"]);                        
                    selection.set('style_price', rec.data["price5"]);                        
                    selection.set('bundle', rec.data["bundle"]);
                    selection.set('season', rec.data["season"]);
                    selection.set('cancelDate', Ext.Date.getLastDateOfMonth(new Date()));                                                    
                    selection.set('salesrep1', rec.data["salesrep1"]);
                    selection.set('salesrep2', rec.data["salesrep2"]);                                            
                    selection.set('sizeCat', rec.data["sizeCat"]);                              
                    selection.set('size1', rec.data["Size1"]);
                    selection.set('size2', rec.data["Size2"]);
                    selection.set('size3', rec.data["Size3"]);
                    selection.set('size4', rec.data["Size4"]);
                    selection.set('size5', rec.data["Size5"]);
                    selection.set('size6', rec.data["Size6"]);
                    selection.set('size7', rec.data["Size7"]);
                    selection.set('size8', rec.data["Size8"]);
                    selection.set('size9', rec.data["Size9"]);
                    selection.set('size10', rec.data["Size10"]);
                    selection.set('size11', rec.data["Size11"]);
                    selection.set('size12', rec.data["Size12"]);
                    selection.set('size13', rec.data["Size13"]);
                    selection.set('size14', rec.data["Size14"]);
                    selection.set('size15', rec.data["Size15"]);                                                      
                                                                
                    price.setValue(rec.data["price"]);
                    //season.setValue(rec.data["season"]);
                    //cancelDate.setValue(rec["cancelDate"]);                    

                    //rowEdit.cancelEdit();
                    //rowEdit.startEdit(selection, 0);                       
                    
                },
                failure : function(response, options) {
                    //var result = JSON.parse(response.responseText);
                    //console.log('failed!', response, options); 
                    var msg = 'Style ' + response.statusText;
                    Ext.Msg.alert('Error!', msg);                   
                },
                scope : this
            });
        }        
                
    },

    onColorComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('inv-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("invGridRowEdit"),            
            style = combo.previousSibling('combo[name="style"]'),
            price = combo.next('numberfield[name="price"]');
            //season = combo.next('combo[name="season"]'),
            //cancelDate = combo.next('datefield[name="cancelDate"]');          
        
        if((combo.getValue() != selection.get('color')) && !Ext.isEmpty(style.getValue()) && !Ext.isEmpty(combo.getValue())) {
                        
            Ext.Ajax.request({
                url : '/WebApp/api/Products/SI',
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                params : {
                    style: style.getValue(),
                    color: combo.getValue()
                    //page: 1,
                    //start: 0,
                    //limit: 100                    
                },
                //disableCaching : true,
                success : function(response, options) {                    
    
                    var results = JSON.parse(response.responseText);                                                                    

                    Ext.Array.each(results.data, function(rec,idx,self) {
                        selection.set('style', rec["style"]);
                        selection.set('color', rec["color"]);
                        selection.set('descript', rec["descript"]);
                        selection.set('price', rec["price"]);     
                        selection.set('style_price', rec["price5"]);                                          
                        selection.set('bundle', rec["bundle"]);
                        //selection.set('season', rec["season"]);    
                        selection.set('cancelDate', Ext.Date.getLastDateOfMonth(new Date()));                                            
                        selection.set('salesrep1', rec["salesrep1"]);
                        selection.set('salesrep2', rec["salesrep2"]);                                                
                        selection.set('sizeCat', rec["sizeCat"]);                              
                        selection.set('size1', rec["Size1"]);
                        selection.set('size2', rec["Size2"]);
                        selection.set('size3', rec["Size3"]);
                        selection.set('size4', rec["Size4"]);
                        selection.set('size5', rec["Size5"]);
                        selection.set('size6', rec["Size6"]);
                        selection.set('size7', rec["Size7"]);
                        selection.set('size8', rec["Size8"]);
                        selection.set('size9', rec["Size9"]);
                        selection.set('size10', rec["Size10"]);
                        selection.set('size11', rec["Size11"]);
                        selection.set('size12', rec["Size12"]);
                        selection.set('size13', rec["Size13"]);
                        selection.set('size14', rec["Size14"]);
                        selection.set('size15', rec["Size15"]);                                                         
                    
                        //rowEdit.cancelEdit();
                        //rowEdit.startEdit(selection, 0);                                               
                        price.setValue(rec["price"]);
                        //season.setValue(rec["season"]);    
                        //cancelDate.setValue(rec["cancelDate"]);                    
                    });
                                                            
                },
                failure : function(response, options) {
                    //var result = JSON.parse(response.responseText);
                    console.log('failed!', response, options);           
                    var msg = 'Style ' + response.statusText;
                    Ext.Msg.alert('Error!', msg);           
                },
                scope : this
            });
        }   
    },

    onCustomerChanged: function(c, nv, ov) {
        //console.log('Customer changed', nv, ov, c.getSelection());
        var me = this,
            vm = me.getViewModel(),
            storeCombo = c.nextSibling('combo'),
            select = c.getSelection(),
            cmp = me.getView().down('component[name="customerAddress"]');

        if(select != null){
            August.model.Customer.load(nv, {
                success: function(rec, op){                        
                    vm.set('theCustomer', rec);          
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

    onCustomerSelected: function(combo, record){
        console.log('onCustomerSelected', record);                           
                        
    },

    onShipToBeforeLoad: function(s){
        var me = this,
            combo = me.getView().down('combo[name="customer"]'),
            vm = me.getViewModel();
        
        Ext.apply(s.getProxy().extraParams, {                        
            type: combo.getValue()
        });
        
    },

    onShipToChanged: function(c, nv, ov){
        console.log('onShipToChanged', nv, ov);
        var me = this,
            vm = me.getViewModel(),
            custCb = c.previousSibling('combo'),
            cmp = me.getView().down('component[name="storeAddress"]');

        August.model.Store.getProxy().setUrl('/WebApp/api/Stores/' + custCb.getValue());
        
        if(nv != null) {
            August.model.Store.load(nv, {
                success: function(rec, op){
                    vm.set('theStore', rec);                
                }
            });
        }     
        else {
            cmp.setData(null);
        }  
        
        c.setDisabled(nv == null); 
        
    },

    onTriggerClear: function(combo){
        
        var me = this,
            storeCb = combo.nextSibling('combo'),
            cmp = this.getView().down('component[name="customerAddress"]');

        //cmp.setData(null);
        
        storeCb.setValue('');
        combo.getStore().load();        
    },

    onOpenPrintViewClick: function(b, e){
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('thePO');
            
        me.showWindow(rec, 'invoice-windows-printinvoice', function(type){

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

    showWindow: function(comp, record){
        var me = this,
            view = this.getView(),
            viewer = view.up('viewer');

        //console.log(window.innerWidth, window.innerHeight)
        this.isEdit = !!record;
        me.win = view.add({
            xtype: 'inv-window',
            reference: 'inv-Window',

            //alignTarget: '',
            //width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1480,
            //maxWidth: 1366,
            //height: window.innerHeight < 760 ? (view.getHeight() * 0.94) : 600,

            viewModel: {
                data: {
                    title: !record ? 'Add New Item' : ('Edit Item: ' + (record.get('style') && record.get('color') ? ' (' + record.get('style') + ' / ' + record.get('color') + ')' : ''))
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theItem: record || {
                        type: 'invoice.Detail',
                        create: {
                            orderdate: view.getViewModel().get('theInvoice').data.orderDate,
                            wh: view.getViewModel().get('theInvoice').data.warehouse,
                            create_user: August.loggedInUser.userId
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
                handler: this.onSaveItemClick,
                scope: this
            }, {
                text: 'Cancel',
                handler: function(b){
                    me.win.close();
                }
            }]
        });


        var rec = this.win.getViewModel().get('theItem');
        console.log('showWindow', rec);
        //matStore.sort('lineseq', 'ASC');

        this.win.on('close', function(p){
            view.up('viewer').up('maincontainerwrap').unmask();
        });

        this.win.show('', function(){
            view.up('viewer').up('maincontainerwrap').mask();
        });
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            rec = vm.get('theInvoice'),
            session = vm.getSession(),
            changes = session.getChanges(),
            batch = session.getSaveBatch(); 

        if(view.isValid()){
            
            console.log(changes, batch);
            //var changes = me.getView().getSession().getChanges();
            
            if(changes != null && changes["invoice.Detail"] != undefined){
                delete changes["invoice.Detail"];
            }
            
            if(batch !== undefined){
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: viewer
                });

                batch.on({
                    complete: function(batch, op){

                        var response = op.getResponse();
                        console.log(response);
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
                                //var response = JSON.parse(objResp.responseText);
                                //Ext.Msg.alert(objResp.statusText, objResp.responseText);
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

    onRefresh: function(btn, e){
        
        var me = this,
            form = me.getView(),
            vm = me.getViewModel();                
        
        var processMask = new Ext.LoadMask({
            msg: 'Loading... Please wait',
            target: form
        });        

        processMask.show();

        August.model.invoice.Header.load(vm.get('theInvoice').id, {
            scope: this,
            success: function(rec, op){
                vm.set('theInvoice', rec);     

                processMask.hide('', function() {
                    
                });
            }
        });        

    },

    onClose: function(btn, e){
        var me = this,
            viewer = me.getView().up('viewer');

        viewer.remove(me.getView());
    }
});
