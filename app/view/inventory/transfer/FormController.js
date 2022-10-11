Ext.define('August.view.inventory.transfer.FormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.transfer-form',

    /**
     *  When working with Session & Association Model,
     *  All of models must be added on requires...
     */
    requires: [
        'August.model.inventory.TransferH',
        'August.model.inventory.TransferD',
        //'August.model.PIRoll',
        'August.view.inventory.transfer.Window'
    ],

    listen: {
        component: {
            'window': {
                close: function(w){
                    this.getView().unmask();
                }
            }
        }
    },

    init: function(){
        //var vm = this.getViewModel();
        //console.log('init', vm.linkData.theTransfer);
        //console.log('init', this.getReferences());        
            
    },

    initViewModel: function(vm) {
                
        var grid = this.getView().lookupReference('transfer-grid');

        console.log('initViewModel', grid, grid.getStore());
        grid.getStore().on('datachanged', function(store){
            console.log('datachanged', rec, store);
        });
    },    

    onUnitChanged: function(field, nv, ov){
        //console.log('onUnitChanged', field, nv, ov);
    },

    onRowEdit: function(editor, context){
        var rec = context.record,
            total = rec.get('unit1') + rec.get('unit2') + rec.get('unit3') + rec.get('unit4') + rec.get('unit5') + rec.get('unit6') + rec.get('unit7') + rec.get('unit8') + rec.get('unit9') + rec.get('unit10') + rec.get('unit11') + rec.get('unit12') + rec.get('unit13') + rec.get('unit14') + rec.get('unit15');        
        rec.set('totalUnit',  total);
        rec.set('extPrice', rec.get('price') * total);

        rec.commit();
    },      

    onOpenStyleClick: function(b, e){
        var me = this,
            vm = me.getViewModel(),
            form = me.getView(),                                    
            grid = form.lookupReference('transfer-grid');        

            //console.log(rec);
        me.showWindow(null, 'transfer-windows-stylelist', function(type){

            var wvm = me.win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];                
                field = me.win.down('searchtextlist'),
                listGrid = me.win.lookupReference('styleListGrid'),                        
                btnAdd = me.win.down('button[action="add"]');                        
                                    
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);            

            wvm.getStore('templatestyles').on('beforeload', function(store){                
                    
                var fwh = form.down('combo[name="fr_warehouse"]'),
                    twh = form.down('combo[name="to_warehouse"]');
                                
                //store.removeAll();

                store.getProxy().setHeaders({
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                });

                Ext.apply(store.getProxy().extraParams, {
                    fwh: fwh.getValue(),
                    twh: twh.getValue()            
                });
            });

            me.win.on('addclick', function(b,c) {
                var store = grid.getStore(), //grid.getStore('transferdetails')
                    recs = listGrid.getSelectionModel().selected;
                
                grid.setLoading(true);
                recs.each(function(rec, idx){
                    store.insert(0, {            
                        transferno: form.down('textfield[name="transferno"]').getValue(),
                        transferdate: form.down('datefield[name="transferdate"]').getValue(),
                        style: rec.get('style'),
                        color: rec.get('color'),
                        descript: rec.get('descript'),
                        price: rec.get('cost'),
                        binlocation: rec.get('binlocation'),
                        bundle: rec.get('bundle'),
                        size1: rec.get('size1'),
                        size2: rec.get('size2'),
                        size3: rec.get('size3'),
                        size4: rec.get('size4'),
                        size5: rec.get('size5'),
                        size6: rec.get('size6'),
                        size7: rec.get('size7'),
                        size8: rec.get('size8'),
                        size9: rec.get('size9'),
                        size10: rec.get('size10'),
                        size11: rec.get('size11'),
                        size12: rec.get('size12'),
                        size13: rec.get('size13'),
                        size14: rec.get('size14'),
                        size15: rec.get('size15'),       
                        fwh_oh1: rec.get('fwh_oh1'),
                        fwh_oh2: rec.get('fwh_oh2'),
                        fwh_oh3: rec.get('fwh_oh3'),
                        fwh_oh4: rec.get('fwh_oh4'),
                        fwh_oh5: rec.get('fwh_oh5'),
                        fwh_oh6: rec.get('fwh_oh6'),
                        fwh_oh7: rec.get('fwh_oh7'),
                        fwh_oh8: rec.get('fwh_oh8'),
                        fwh_oh9: rec.get('fwh_oh9'),
                        fwh_oh10: rec.get('fwh_oh10'),
                        fwh_oh11: rec.get('fwh_oh11'),
                        fwh_oh12: rec.get('fwh_oh12'),
                        fwh_oh13: rec.get('fwh_oh13'),
                        fwh_oh14: rec.get('fwh_oh14'),
                        fwh_oh15: rec.get('fwh_oh15'),
                        fwh_ohs: rec.get('fwh_ohs'),                              
                        twh_oh1: rec.get('twh_oh1'),
                        twh_oh2: rec.get('twh_oh2'),
                        twh_oh3: rec.get('twh_oh3'),
                        twh_oh4: rec.get('twh_oh4'),
                        twh_oh5: rec.get('twh_oh5'),
                        twh_oh6: rec.get('twh_oh6'),
                        twh_oh7: rec.get('twh_oh7'),
                        twh_oh8: rec.get('twh_oh8'),
                        twh_oh9: rec.get('twh_oh9'),
                        twh_oh10: rec.get('twh_oh10'),
                        twh_oh11: rec.get('twh_oh11'),
                        twh_oh12: rec.get('twh_oh12'),
                        twh_oh13: rec.get('twh_oh13'),
                        twh_oh14: rec.get('twh_oh14'),
                        twh_oh15: rec.get('twh_oh15'),
                        twh_ohs: rec.get('twh_ohs'),                 
                        fr_warehouse: form.down('textfield[name="fr_warehouse"]').getValue(),
                        to_warehouse: form.down('textfield[name="to_warehouse"]').getValue()
                    }); 

                });                                    
                
                override = grid.getPlugin('rowExpander');                
                override.expandAll();                    
                grid.setLoading(false);
                me.win.close();
            }, me);

            me.win.on('resetclick', function(b,c) {
                var store = listGrid.getStore();  

                //var selected = template.getSelectionModel().selected;
                field.fireEvent('triggerclear', field);
                store.removeAll();

            }, me);            
        });
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
            grid = form.lookupReference('transfer-grid'),
            store = grid.getStore(),
            rowEdit = grid.getPlugin("transferGridRowEdit");        

        rowEdit.cancelEdit();

        var rec = store.insert(0, {            
            transferno: form.down('textfield[name="transferno"]').getValue(),
            fr_warehouse: form.down('textfield[name="fr_warehouse"]').getValue(),
            to_warehouse: form.down('textfield[name="to_warehouse"]').getValue()
        });

        override = grid.getPlugin('rowExpander');                             
        override.expandAll(); 

        rowEdit.startEdit(0, 0);
    },

    onCopyItemClick: function(btn){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('transfer-grid'),
            session = me.getViewModel().getSession(),            
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', d);
        grid.getStore().add(nd);
        
    },

    onEditItemClick: function(btn){
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('transfer-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("transferGridRowEdit");

        //console.log('onEdit', selection)
        //this.showWindow(btn, selection);            

        rowEdit.cancelEdit();
        rowEdit.startEdit(selection, 0);        
    },

    onDeleteItemClick: function(btn){
        var me = this,
        form = me.getView(),
        grid = form.lookupReference('transfer-grid'),
        store = grid.getStore(),
        selection = grid.getSelection()[0];
            
        //selection = grid.getSelectionModel().getSelection()[0];
        //store.remove(grid.getSelection()[0]);
        selection.drop();
        grid.getSelectionModel().deselectAll();

    },

    onItemDblClick: function(grid, rec, tr, idx, e){
        var btn = this.lookupReference('edit');

        //this.showWindow(btn, rec);
        //console.log(rec)
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    },

    onTabChange: function(t, n, o, e){

    },

    onSelectionChanged: function(sm, selected, e) {
        var me = this,
            form = me.getView(),
            grid = form.lookupReference('transfer-grid'),
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

    onWidgetSetClick: function(btn, e){
        
        var grid = btn.up('grid'),        
            rowEdit = grid.getPlugin("transferGridRowEdit");
            rec = btn.getWidgetRecord();

        rec.set('unit1', rec.get('fwh_oh1'));
        rec.set('unit2', rec.get('fwh_oh2'));
        rec.set('unit3', rec.get('fwh_oh3'));
        rec.set('unit4', rec.get('fwh_oh4'));
        rec.set('unit5', rec.get('fwh_oh5'));
        rec.set('unit6', rec.get('fwh_oh6'));
        rec.set('unit7', rec.get('fwh_oh7'));
        rec.set('unit8', rec.get('fwh_oh8'));
        rec.set('unit9', rec.get('fwh_oh9'));
        rec.set('unit10', rec.get('fwh_oh10'));
        rec.set('unit11', rec.get('fwh_oh11'));
        rec.set('unit12', rec.get('fwh_oh12'));
        rec.set('unit13', rec.get('fwh_oh13'));
        rec.set('unit14', rec.get('fwh_oh14'));
        rec.set('unit15', rec.get('fwh_oh15'));
        
        rowEdit.fireEvent('edit', rowEdit, {record:rec});
    },
    
    onStyleComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('transfer-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("transferGridRowEdit"),
            fwh = form.down('combo[name="fr_warehouse"]'),
            twh = form.down('combo[name="to_warehouse"]'),
            color = combo.nextSibling('combo[name="color"]');

        //console.log(combo, rec, color, color.getSelection(), fwh.getValue(), twh.getValue());

        if(!Ext.isEmpty(combo.getValue()) && !Ext.isEmpty(color.getValue())) {
            
            Ext.Ajax.request({
                url : '/WebApp/api/Products/Transfer',
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                params : {
                    fwh: fwh.getValue(),
                    twh: twh.getValue(),
                    //page: 1,
                    //start: 0,
                    //limit: 100
                    filter: Ext.JSON.encodeValue([{property: 'style', value: combo.getValue()},{property: 'color', value: color.getValue()}])
                },
                //disableCaching : true,
                success : function(response, options) {                    
    
                    var results = JSON.parse(response.responseText);                                                

                    Ext.Array.each(results.data, function(rec,idx,self){
                        selection.set('descript', rec["descript"]);
                        selection.set('price', rec["price"]);
                        selection.set('bundle', rec["bundle"]);
                        selection.set('binlocation', rec["binlocation"]);
                        selection.set('fwh_oh1', rec["fwh_oh1"]);
                        selection.set('fwh_oh2', rec["fwh_oh2"]);
                        selection.set('fwh_oh3', rec["fwh_oh3"]);
                        selection.set('fwh_oh4', rec["fwh_oh4"]);
                        selection.set('fwh_oh5', rec["fwh_oh5"]);
                        selection.set('fwh_oh6', rec["fwh_oh6"]);
                        selection.set('fwh_oh7', rec["fwh_oh7"]);
                        selection.set('fwh_oh8', rec["fwh_oh8"]);
                        selection.set('fwh_oh9', rec["fwh_oh9"]);
                        selection.set('fwh_oh10', rec["fwh_oh10"]);
                        selection.set('fwh_oh11', rec["fwh_oh11"]);
                        selection.set('fwh_oh12', rec["fwh_oh12"]);
                        selection.set('fwh_oh13', rec["fwh_oh13"]);
                        selection.set('fwh_oh14', rec["fwh_oh14"]);
                        selection.set('fwh_oh15', rec["fwh_oh15"]);       
                        selection.set('twh_oh1', rec["twh_oh1"]);
                        selection.set('twh_oh2', rec["twh_oh2"]);
                        selection.set('twh_oh3', rec["twh_oh3"]);
                        selection.set('twh_oh4', rec["twh_oh4"]);
                        selection.set('twh_oh5', rec["twh_oh5"]);
                        selection.set('twh_oh6', rec["twh_oh6"]);
                        selection.set('twh_oh7', rec["twh_oh7"]);
                        selection.set('twh_oh8', rec["twh_oh8"]);
                        selection.set('twh_oh9', rec["twh_oh9"]);
                        selection.set('twh_oh10', rec["twh_oh10"]);
                        selection.set('twh_oh11', rec["twh_oh11"]);
                        selection.set('twh_oh12', rec["twh_oh12"]);
                        selection.set('twh_oh13', rec["twh_oh13"]);
                        selection.set('twh_oh14', rec["twh_oh14"]);
                        selection.set('twh_oh15', rec["twh_oh15"]);                                        
                    });                                                      
                    
                    //rowEdit.cancelEdit();
                    //rowEdit.startEdit(selection, 0);                       
                    
                },
                failure : function(response, options) {
                    var result = JSON.parse(response.responseText);
                    console.log('failed!', response, options);                    
                },
                scope : this
            });
        }        
                
    },

    onColorComboSelected: function(combo, rec, e){
        var me = this,
            form = me.getView(), 
            grid = form.lookupReference('transfer-grid'),
            selection = grid.getSelection()[0];
            rowEdit = grid.getPlugin("transferGridRowEdit"),
            fwh = form.down('combo[name="fr_warehouse"]'),
            twh = form.down('combo[name="to_warehouse"]'),
            style = combo.previousSibling('combo[name="style"]');

        //console.log(combo, rec, color, color.getSelection(), fwh.getValue(), twh.getValue());

        if(!Ext.isEmpty(style.getValue()) && !Ext.isEmpty(combo.getValue())) {
            
            Ext.Ajax.request({
                url : '/WebApp/api/Products/Transfer',
                method : 'GET',
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                },
                params : {
                    fwh: fwh.getValue(),
                    twh: twh.getValue(),
                    //page: 1,
                    //start: 0,
                    //limit: 100
                    filter: Ext.JSON.encodeValue([{property: 'style', value: style.getValue()},{property: 'color', value: combo.getValue()}])
                },
                //disableCaching : true,
                success : function(response, options) {                    
    
                    var results = JSON.parse(response.responseText);                                                

                    Ext.Array.each(results.data, function(rec,idx,self){
                        selection.set('descript', rec["descript"]);
                        selection.set('price', rec["price"]);
                        selection.set('bundle', rec["bundle"]);
                        selection.set('binlocation', rec["binlocation"]);
                        selection.set('fwh_oh1', rec["fwh_oh1"]);
                        selection.set('fwh_oh2', rec["fwh_oh2"]);
                        selection.set('fwh_oh3', rec["fwh_oh3"]);
                        selection.set('fwh_oh4', rec["fwh_oh4"]);
                        selection.set('fwh_oh5', rec["fwh_oh5"]);
                        selection.set('fwh_oh6', rec["fwh_oh6"]);
                        selection.set('fwh_oh7', rec["fwh_oh7"]);
                        selection.set('fwh_oh8', rec["fwh_oh8"]);
                        selection.set('fwh_oh9', rec["fwh_oh9"]);
                        selection.set('fwh_oh10', rec["fwh_oh10"]);
                        selection.set('fwh_oh11', rec["fwh_oh11"]);
                        selection.set('fwh_oh12', rec["fwh_oh12"]);
                        selection.set('fwh_oh13', rec["fwh_oh13"]);
                        selection.set('fwh_oh14', rec["fwh_oh14"]);
                        selection.set('fwh_oh15', rec["fwh_oh15"]);       
                        selection.set('twh_oh1', rec["twh_oh1"]);
                        selection.set('twh_oh2', rec["twh_oh2"]);
                        selection.set('twh_oh3', rec["twh_oh3"]);
                        selection.set('twh_oh4', rec["twh_oh4"]);
                        selection.set('twh_oh5', rec["twh_oh5"]);
                        selection.set('twh_oh6', rec["twh_oh6"]);
                        selection.set('twh_oh7', rec["twh_oh7"]);
                        selection.set('twh_oh8', rec["twh_oh8"]);
                        selection.set('twh_oh9', rec["twh_oh9"]);
                        selection.set('twh_oh10', rec["twh_oh10"]);
                        selection.set('twh_oh11', rec["twh_oh11"]);
                        selection.set('twh_oh12', rec["twh_oh12"]);
                        selection.set('twh_oh13', rec["twh_oh13"]);
                        selection.set('twh_oh14', rec["twh_oh14"]);
                        selection.set('twh_oh15', rec["twh_oh15"]);                                        
                    });                                                      
                    
                    //rowEdit.cancelEdit();
                    //rowEdit.startEdit(selection, 0);                       
                    
                },
                failure : function(response, options) {
                    var result = JSON.parse(response.responseText);
                    console.log('failed!', response, options);                    
                },
                scope : this
            });
        }   
    },

    showWindow: function(rec, xtype, callback){
        var me = this,
            view = me.getView();

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
            me.view.mask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },

    onSaveItemClick: function(b){
        // Save the changes pending in the win's child session back to the
        // parent session.
        console.log('onSave', this.getReferences());
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('transfer-edit-form'),
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
                rec = session.getRecord('inventory.TransferD', id);
                grid.getStore().add(rec);

            }
            else {
                rec = session.peekRecord('inventory.TransferD', id);
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
            rec = vm.get('theTransfer'),
            session = vm.getSession(),
            changes = session.getChanges();

        if(view.isValid()){

            var batch = session.getSaveBatch();
            //changes = session.getChanges();
            //console.log(changes, batch);
            //var changes = me.getView().getSession().getChanges();
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

                        //Call Ajax...                        

                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });                        
                    },
                    exception: function(batch, op){
                        processMask.hide('', function(){
                            //Ext.Msg.alert('Error', 'Error occurred');
                            var objResp = op.getResponse();
                            //console.log(objResp)
                            if(!Ext.isEmpty(objResp)){
                                var response = objResp.responseJson;
                                Ext.Msg.alert(objResp.statusText, objResp.responseJson);
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
