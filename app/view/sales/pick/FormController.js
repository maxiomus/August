Ext.define('August.view.sales.pick.FormController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.pick-ticketForm',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
     requires: [
        'August.model.pick.Header',
        'August.model.pick.Detail',
        'Ext.ux.grid.plugin.AllRowExpander'
        //'August.view.payment.ReceiveWindow'
    ],

    init: function(){
        var me = this,
            vm = this.getViewModel();

        me.mv = August.app.getMainView();            
        
        //console.log('init', this.getReferences());
    },

    initViewModel: function(vm) {

        var rec = vm.linkData.theOrder;
        console.log('initViewModel', vm.linkData);
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
            grid = form.lookupReference('pick-grid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin("pickGridRowEdit");        

        rowEdit.cancelEdit();

        var rec = store.insert(0, {            
            line: store.getCount() + 1,
            status: 'Open',
            warehouse: 'WH'            
        });

        var override = grid.getPlugin('pickRowExpander');                                              
        if(override.isCollapsed(0) == true) {
            override.toggleRow(0, store.getAt(0));
        }               
        //override.expandAll(); 

        rowEdit.startEdit(0, 0);
    },

    onCopyItemClick: function(btn){
        var me = this,
            form = me.getView(),
            session = me.getViewModel().getSession(),
            grid = form.lookupReference('pick-grid'),
            store = grid.getStore(),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        nd.set('line', store.getCount());
        nd.set('status', 'Open');
        nd.set('userName', August.loggedInUser.userId);
        nd.set('userTime', new Date());

        grid.getStore().add(nd);

        var override = grid.getPlugin('pickRowExpander');                             
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
            grid = form.lookupReference('pick-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("pickGridRowEdit");

        //console.log('onEdit', selection)
        //this.showWindow(btn, selection);            

        rowEdit.cancelEdit();
        rowEdit.startEdit(selection, 0);  
    },

    onDeleteItemClick: function(btn){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('pick-grid'),
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
        console.log('onRowEditing', rec);
        rec.set('totalUnit', rec.get('unit1') + rec.get('unit2') + rec.get('unit3') + rec.get('unit4') + rec.get('unit5') + rec.get('unit6') + 
            rec.get('unit7') + rec.get('unit8') + rec.get('unit9') + rec.get('unit10') + rec.get('unit11') + rec.get('unit12') + rec.get('unit13')); 
        rec.set('extPrice', rec.data.totalUnit * rec.data.price);        
    },

    onSelectionChanged: function(sm, selected, e) {
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('pick-grid'),
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
            grid = form.lookupReference('pick-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("pickGridRowEdit"),            
            color = combo.next('combo[name="color"]'),
            price = combo.next('numberfield[name="price"]');
            //season = combo.next('combo[name="season"]'),
            //cancelDate = combo.next('datefield[name="cancelDate"]');            
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
        */        
                
    },

    onColorComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('pick-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("pickGridRowEdit"),            
            style = combo.previousSibling('combo[name="style"]'),
            price = combo.ownerCt.down('numberfield[name="price"]'),
            origPrice = combo.ownerCt.down('combo[name="stylePrice"]');
            //season = combo.next('combo[name="season"]'),
            //cancelDate = combo.next('datefield[name="cancelDate"]');          
        
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
            rec = vm.get('thePickTicket');
            
        me.showWindow(rec, 'sales-windows-printpt', function(type){

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
            //session: true,

            renderTo: Ext.getBody()
        });

        me.win.show('', function(){
            me.mv.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            rec = vm.get('thePickTicket'),
            session = vm.getSession(),
            changes = session.getChanges(),
            batch = session.getSaveBatch(); 

        console.log('Pick - Form', session, changes, batch);

        if(view.isValid()){
                        
            //var changes = me.getView().getSession().getChanges();
            
            if(changes != null && changes["pick.Detail"] != undefined){
                delete changes["pick.Detail"];
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

        August.model.pick.Header.load(vm.get('thePickTicket').id, {
            scope: this,
            success: function(rec, op){
                vm.set('thePickTicket', rec);     

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
