Ext.define('August.view.customer.payment.ReceiveController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.payment-receive',        

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
            url: 'resources/data/purchase/stores.json',
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

    onActionNew: function(b){
        //this.redirectTo("payment-receive/new");
        var me = this,
            layout = me.lookupReference('multiview'),
            grid = layout.lookupReference('payment-receive-grid'),
            rec = grid.getSelection()[0];
        
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
        me.redirectTo("payment-receive/new");   
    },

    onActionEdit: function(b, c){
        //console.log(b, c);

        var me = this,
            layout = me.lookupReference('multiview'),
            grid = layout.lookupReference('payment-receive-grid'),
            rec = grid.getSelection()[0];
        
        me.redirectTo("payment-receive/edit/" + rec.data.paymentNo);            

            //console.log(rec);
        
    },

    onActionRefresh: function(b, c){
        this.getStore("paymentreceives").reload();
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
                        grid = layout.lookupReference('payment-receive-grid'),
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
            grid = layout.lookupReference("payment-receive-grid");

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

        var layout = this.getView().lookupReference('multiview'),
            refs = layout.getReferences(),
            topbar = refs.topbar,
            display = refs.display;

        display.setActive(rec);

        //console.log(rec);
        this.redirectTo('payment-receive/default/' + rec.get('paymentNo'));
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
        l.stopEvent();

        var i = h.getSelectionModel();
        if(!i.isSelected(g)){
            i.select(g);
        }
        this.view.contextmenu.showAt(l.getXY());
    },

    onSearchInvoices: function(){

    },

    onSavePayments: function() {

    },

    showWindow: function(record, xtype, callback){
        var me = this,
            view = me.getView();

        //console.log(window.innerWidth, window.innerHeight)
        me.isEdit = !!record;

        me.win = view.add({
            xtype: xtype,
            reference: xtype,

            //alignTarget: '',
            //width: window.innerWidth < 1360 ? (view.getWidth() * 0.98) : 1480,
            //maxWidth: 1366,
            //height: window.innerHeight < 760 ? (view.getHeight() * 0.94) : 600,
            session: true,               

            viewModel: {
                data: {
                    selected: record
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    thePayment: record || {
                        type: 'payment.Header',
                        create: {                            
                            userName: August.loggedInUser.userId,
                            createuser: August.loggedInUser.userId
                            //wh: view.getViewModel().get('thePayment').data.warehouse
                        }
                    }
                }
            },

            renderTo: Ext.getBody()
            // Creates a child session that will spawn from the current session
            // of this view.                     
        });


        //var rec = me.win.getViewModel().get('theItem');
        //console.log('showWindow', rec);
        //matStore.sort('lineseq', 'ASC');
                
        me.win.show('', function(){
            me.mv.unmask();
            //view.up('maincontainerwrap').mask();
        });

        me.win.on('close', function(p){
            me.mv.mask();
            //view.up('maincontainerwrap').unmask();
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    }

});
