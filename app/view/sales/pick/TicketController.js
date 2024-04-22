Ext.define('August.view.sales.pick.TicketController', {
    extend: 'Ext.app.ViewController',
        
    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.pick-ticket',

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
            url: 'resources/data/customer/stores.json',
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
        
        /*
        me.showWindow(rec, 'windows-payment-invoices', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                combo = win.down('combo[name="customer"]'),                
                grid = win.lookupReference('invoicesGrid'),                        
                btnSaveAs = win.down('button[action="saveas"]');                        
                                                            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });            

            win.on('templateclick', me.onSearchInvoices, me);            

            win.on('saveclick', me.onSavePayments, me);
            
        });
        */
        me.redirectTo("customer-invoice/new");   
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var me = this,
            layout = me.lookupReference('multiview'),
            grid = layout.lookupReference('pickGrid'),
            rec = grid.getSelection()[0];
        
        me.redirectTo("pick-ticket/edit/" + rec.get('pickno'));

            //console.log(rec);
        
    },

    onActionRefresh: function(b, c){
        this.getStore("picktickets").reload();
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
                        grid = layout.lookupReference('pickGrid'),
                        rec = grid.getSelection()[0];

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
                }
            }
        });
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
            searchfield = topbar.down('searchgrid'),
            grid = layout.lookupReference("pickGrid");

        searchfield.setValue('');
        searchfield.getTrigger('clear').hide();
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
            case "pono":                
            case "SoNo":
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
            */
        }         
    },

    onItemContextMenu:function(h, j, k, g, l){        

        var mv = this.lookupReference('multiview'),
            grid = mv.lookupReference('pickGrid'),
            sm = h.getSelectionModel(),
            status = grid.getSelection()[0].get('status');

        l.stopEvent();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.items.items[4].setDisabled(status == null || status == "Closed");

        this.view.contextmenu.showAt(l.getXY());
        
    },

    onCreateInvoiceClick: function(b, e) {
        var me = this,
            layout = me.lookupReference('multiview'),
            grid = layout.lookupReference('pickGrid'),
            rec = grid.getSelection()[0];                            

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });           

        Ext.Ajax.request({
            url: '/WebApp/api/Invoices/Pick', // + rec.get('pickno');    ,
            method: '',            

            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },

            jsonData: rec.getData(true),

            params: {
                //store: comboSelected.get('name')
            }

        }).then(function(response){
            var result = Ext.decode(response.responseText, false);
            console.log('callback', result);

            if(result =! null) {
                processMask.hide('', function() {
                    Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                        console.log(result);
                    });
                });  
            }
            else {

            }                      
        }).otherwise(function(reason){
            processMask.hide('', function() {
                console.log(reason);
                //Ext.Msg.alert(reason.statusText + ' - ' + reason.status, reason.responseJson.Message);
            });
            
            if(batch.hasException) {
                for (var i = 0; i < batch.exceptions.length; i++) {
                    switch (batch.exceptions[i].action) {
                        case "destroy" :
                            msg = msg + batch.exceptions[i].records.length + " Delete, ";
                            break;
                        case "update" :
                            msg = msg + batch.exceptions[i].records.length + " Update, ";
                            break;
                        case "create" :
                            msg = msg + batch.exceptions[i].records.length + " Create, ";
                            break;
                    }
                }

                Ext.Msg.alert("Status", msg + " operation failed!");
            }
            else
            {
                Ext.Msg.alert('Status', 'Changes failed.');
            }
                    
        });

        processMask.show();
    },

    onOpenUpdateClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            searchgrid = topbar.down('searchgrid'),
            grid = multiview.lookupReference('pickGrid'),
            rec = grid.getSelectionModel().selected.items[0];        

            //console.log(rec);
        me.showWindow(rec, 'sales-windows-updatept', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];                
                field = win.down('searchgrid'),
                grid = win.lookupReference('orderGrid'),                        
                btnUpdate = win.down('button[action="update"]');
            
            if (!Ext.isEmpty(searchgrid.getValue())) {
                field.setValue(searchgrid.getValue());
                field.activeFilter = searchgrid.activeFilter;      
                field.getTrigger('clear').setHidden(false);  
            }
                                    
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);            

            win.on('resetclick', function(b,c) {
                var store = grid.getStore();  
                
                field.fireEvent('triggerclear', field);                

            }, me);

            win.on('updateclick', function(btn, type){
                var grid = win.lookupReference('orderGrid');
                                                
                //

                store = grid.getStore();
    
                var processMask = Ext.create('Ext.LoadMask', {
                    msg: 'Saving... Please wait',
                    target: me.getView()
                });
        
                processMask.show();        
                
                store.sync({
                    success: function(batch, op){
                        Ext.Msg.alert('Status', 'Changes saved successfully.', function(a){                    
                            processMask.hide('', function() {
            
                            });                    
                        });
        
                    },
                    failure: function(batch, op){
                        //console.log(op);
                        processMask.hide('', function() {
        
                        });
                    },
                    callback: function(batch, op){
                        processMask.hide('', function() {
        
                        });
                    }
                });

                //
            }, me);

            win.on('confirmclick', function(b,c) {
                var store = grid.getStore();
                    //selected = grid.getSelectionModel().getSelection();                

                    Ext.each(grid.getSelectionModel().getSelection(), function(rec, idx, self){
                        rec.set('pickd_status', 'Open');
                    });    
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
    }

});
    