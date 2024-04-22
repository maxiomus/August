Ext.define('August.view.sales.OrderFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.sales-orderForm',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
    requires: [
        'August.model.sales.Order',
        'August.model.sales.OrderDetail'
        //'August.model.sales.SalesOrderItem',        
        //'August.view.sales.OrderWindow'
    ],    
    
    init: function(){
        var me = this;
        vm = me.getViewModel(),
        me.mv = August.app.getMainView();        

        //console.log('init', vm.linkData.theOrder);
        //console.log('init', this.getReferences());
    },

    initViewModel: function(vm) {

        //var rec = vm.linkData.theOrder;
        //console.log('initViewModel', vm.getData(), vm.get('theOrder'));        

    },

    /*
    onItemSelect: function(sm, rec){
        //var sm = view.getSelectionModel();
        //console.log(this.getView(), sm);
        var view = this.lookupReference('so-view');
        view.setSelection(rec);
    },
    */

    // Items...
    onAddItemClick: function(btn){
        var me = this,
        //form = me.getView(),
            refs = this.getReferences();

        //this.showWindow(btn, null);

        var me = this,
            form = me.getView(),
            //refs = this.getReferences(),
            grid = form.lookupReference('so-grid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin("soGridRowEdit");        

        rowEdit.cancelEdit();        

        store.insert(0, {            
            line: store.getTotalCount() + 1,
            status: 'Open',            
            warehouse: form.down('combo[name="warehouse"]').getValue(),
            salesrep1: form.down('combo[name="salesrep1"]').getValue(),
            salesrep2: form.down('combo[name="salesrep2"]').getValue(),
            userName: August.loggedInUser.userId,
            userTime: new Date()
        });                        

        var override = grid.getPlugin('soRowExpander');                             
        if(override.isCollapsed(0) == true) {
            override.toggleRow(0, store.getAt(0));
        }        

        rowEdit.startEdit(0, 0);
    },

    onCopyItemClick: function(btn){
        var me = this,
            form = me.getView(),
            session = me.getViewModel().getSession(),
            grid = form.lookupReference('so-grid'),
            store = grid.getStore(),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        nd.set('line', store.getCount() + 1);
        nd.set('status', 'Open');
        nd.set('userName', August.loggedInUser.userId);
        nd.set('userTime', new Date());

        grid.getStore().insert(0, nd);

        var override = grid.getPlugin('soRowExpander');         
        if(override.isCollapsed(0) == true) {
            override.toggleRow(0, store.getAt(0));
        } 

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
            grid = form.lookupReference('so-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("soGridRowEdit");

        //console.log('onEdit', selection)
        //this.showWindow(btn, selection);            

        rowEdit.cancelEdit();
        rowEdit.startEdit(selection, 0);  
    },

    onDeleteItemClick: function(btn){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('so-grid'),
            store = grid.getStore(),
            selection = grid.getSelection()[0];

        //store.remove(grid.getSelection()[0]);
        selection.drop();
        grid.getSelectionModel().deselectAll();

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
        rec.set('totalUnit', rec.get('unit1') + rec.get('unit2') + rec.get('unit3') + rec.get('unit4') + rec.get('unit5') + rec.get('unit6') + 
            rec.get('unit7') + rec.get('unit8') + rec.get('unit9') + rec.get('unit10') + rec.get('unit11') + rec.get('unit12') + rec.get('unit13')); 
        rec.set('extPrice', rec.data.totalUnit * rec.data.price);        
    },

    onSelectionChanged: function(sm, selected, e) {
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('so-grid'),
            columns = grid.getColumns(),
            rec = selected[0];

        if(rec != null){
            var index = 0;
            Ext.each(columns, function(col, idx){                        
                
                if(idx > 5 && idx < 17) {
                    index = idx - 5;  
                    col.setText(rec.get('Size'+index));             
                }                        
            });
        }
    },

    onStyleComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('so-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("soGridRowEdit"),            
            cboColor = combo.next('combo[name="color"]'),
            price = combo.ownerCt.down('numberfield[name="price"]'),
            season = combo.ownerCt.down('combo[name="season"]'),
            cancelDate = combo.ownerCt.down('datefield[name="cancelDate"]');            
        
        /*
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
                    selection.set('Size1', rec.data["Size1"]);
                    selection.set('Size2', rec.data["Size2"]);
                    selection.set('Size3', rec.data["Size3"]);
                    selection.set('Size4', rec.data["Size4"]);
                    selection.set('Size5', rec.data["Size5"]);
                    selection.set('Size6', rec.data["Size6"]);
                    selection.set('Size7', rec.data["Size7"]);
                    selection.set('Size8', rec.data["Size8"]);
                    selection.set('Size9', rec.data["Size9"]);
                    selection.set('Size10', rec.data["Size10"]);
                    selection.set('Size11', rec.data["Size11"]);
                    selection.set('Size12', rec.data["Size12"]);
                    selection.set('Size13', rec.data["Size13"]);
                    selection.set('Size14', rec.data["Size14"]);
                    selection.set('Size15', rec.data["Size15"]);                                                      
                                                                
                    price.setValue(rec.data["price"]);
                    season.setValue(rec.data["season"]);
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
        */
        
        var store = cboColor.getStore();
        store.clearFilter();

        if(combo.getValue() != selection.get('style') && !Ext.isEmpty(combo.getValue())){

            store.filter([{
                property: 'style',
                value: combo.getValue().toUpperCase(),
                operator: '='
            }]);

            //cboColor.select(store.first());
        }

        //selection.set('descript', rec.get('descript'));
                
    },

    onColorComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('so-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("soGridRowEdit"),            
            style = combo.previousSibling('combo[name="style"]'),
            price = combo.ownerCt.down('numberfield[name="price"]'),
            season = combo.ownerCt.down('combo[name="season"]'),
            cancelDate = combo.ownerCt.down('datefield[name="cancelDate"]');          
        
        if(!Ext.isEmpty(style.getValue()) && !Ext.isEmpty(combo.getValue())) {
                        
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
                        selection.set('season', rec["season"]);    
                        selection.set('cancelDate', Ext.Date.getLastDateOfMonth(new Date()));                                            
                        selection.set('salesrep1', rec["salesrep1"]);
                        selection.set('salesrep2', rec["salesrep2"]);                                                
                        selection.set('sizeCat', rec["sizeCat"]);                              
                        selection.set('Size1', rec["Size1"]);
                        selection.set('Size2', rec["Size2"]);
                        selection.set('Size3', rec["Size3"]);
                        selection.set('Size4', rec["Size4"]);
                        selection.set('Size5', rec["Size5"]);
                        selection.set('Size6', rec["Size6"]);
                        selection.set('Size7', rec["Size7"]);
                        selection.set('Size8', rec["Size8"]);
                        selection.set('Size9', rec["Size9"]);
                        selection.set('Size10', rec["Size10"]);
                        selection.set('Size11', rec["Size11"]);
                        selection.set('Size12', rec["Size12"]);
                        selection.set('Size13', rec["Size13"]);
                        selection.set('Size14', rec["Size14"]);
                        selection.set('Size15', rec["Size15"]);                                                         
                    
                        //rowEdit.cancelEdit();
                        //rowEdit.startEdit(selection, 0);                                               
                        price.setValue(rec["price"]);
                        season.setValue(rec["season"]);    
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

    onBillToBeforeLoad: function(s){
        var me = this,
            combo = me.getView().down('combo[name="customer"]'),
            vm = me.getViewModel();
        
        Ext.apply(s.getProxy().extraParams, {                        
            type: combo.getValue()
        });
        
    },

    onCustomerChanged: function(c, nv, ov) {
        //console.log('Customer changed', nv, ov, c.getSelection());
        var me = this,
            vm = me.getViewModel(),
            sorder = vm.get('theOrder'),
            storeCombo = c.nextSibling('combo'),
            select = c.getSelection(),
            cmp = me.getView().down('component[name="customerAddress"]');

        August.model.Billto.getProxy().setUrl('/WebApp/api/billtos/' + c.getValue());

        if(select != null){
            August.model.Billto.load(sorder.get('billTo'), {
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

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView();        

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

    onPriceTagClick: function(b, e){
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('theOrder');
            
        me.showWindow(rec, 'windows-pricetag', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                store = wvm.getStore('sodetails'),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];                
                //field = win.down('searchtextlist'),
                field = win.down('textfield[name="sonoFilter"]')
                combo = win.down('combo[name="customerFilter"]');
                                      
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);                        

            //btnSave.setDisabled(template.getStore().getCount() == 0);            
            combo.setValue(rec.get('customer'));
            field.setValue(rec.get('orderno'));
    
            var orderno = new Ext.util.Filter({
                id: 'sonoFid',
                operator: 'in',
                property: 'orderno',
                type: 'list',
                value: [rec.get('orderno')]
            });            

            var customer = new Ext.util.Filter({
                id: 'customerFid',
                property: 'customer',
                value: rec.get('customer')
            });                    

            store.getFilters().add([orderno, customer]);            
            
            //store.load();
            //win.lookupReference('tag-view').bindStore(store);
            /*
            store.on('load', function(s, recs, success, op){
                console.log('load', store);
                s.each(function(rec, index){
                    for(var i = 1; i <= rec.get('total'); i++){
                        var nd = rec.copy(null)

                        store.add(nd);
                    }
                });

            }, me);
            */
            /*
            win.on('refreshclick', function(b,c) {
                var store = me.getViewModel().getStore('sodetails');                    
                
                store.each(function(rec, index){
                    
                });
                                
                store.load();

            }, me);

            win.on('printclick', function(btn, type){
                                
                var vm = win.getViewModel(),
                    session = vm.getSession(),
                    batch = session.getSaveBatch(),
                    changes = session.getChanges();
                    grid = win.lookupReference('Grid'),
                    store = grid.getStore();
                                                    
                console.log(vm, session, changes);
                                

            }, me);
            */
        });
    },

    onPrintClick: function() {
        var me = this,
            vm = me.getViewModel(),
            rec = vm.get('theOrder');
            
        me.showWindow(rec, 'sales-windows-printso', function(type){

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

    onSaveItemClick: function(b){
        // Save the changes pending in the win's child session back to the
        // parent session.
        //console.log('onSave', this.getReferences());
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('so-edit-form'),
            grid = me.lookupReference('rolls'),
            isEdit = this.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
            }
            id = win.getViewModel().get('theItem').id;
            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('SO', id);
                grid.getStore().add(rec);

            }
            else {
                rec = session.peekRecord('SO', id);
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
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            rec = vm.get('theOrder'),
            session = vm.getSession(),
            changes = session.getChanges(),
            batch = session.getSaveBatch();

        console.log('Sales Form Save', session, changes, batch);

        if(view.isValid()){
            
            //changes = session.getChanges();            
            //var changes = me.getView().getSession().getChanges();
            
            if(changes != null && changes["sales.Order"] != undefined){
                delete changes["sales.OrderDetail"];
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

        August.model.sales.Order.load(vm.get('theOrder').id, {
            scope: this,
            success: function(rec, op){
                vm.set('theOrder', rec);     

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
