Ext.define('August.view.shopify.OrderController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.shopify-order',

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
        //console.log(this.lookupReference('multiview').refs);
        var me = this;

        me.mv = August.app.getMainView();        
    },

    onBeforeStoreLoad: function(store){
        var me = this,            
            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=stores]");

        
        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        });

        Ext.apply(store.getProxy().extraParams, {            
            store: combo.getValue()
        });
    },

    onStoreChange: function(combo, nValue, oValue) {
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('shopifyorders'),
            bbar = me.getView().down("toolbar[dock=bottom]"),
            nextBtn = bbar.down("button[name=next]"),
            prevBtn = bbar.down("button[name=prev]"); 

        vm.set('shopifyLink', null);
        store.getProxy().setExtraParams({}); 

        store.load({
            callback: function(recs, op, success){
                var linkInfo = op.getResponse().responseJson.LinkHeader;
                
                nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  

                vm.set('shopifyLink', linkInfo);
            }
        });
    },    

    /**
     * 
     * @param {*} menu 
     * @param {*} event
    **/
    onCreateSoClick: function(m, e){
        var me = this,    
            topbar = me.getView().down("toolbar"),
            combo = topbar.down("combo[name=stores]"),
            //vm = me.getViewModel(),
            mv = me.lookupReference('multiview'),
            grid = mv.lookupReference('shopify-order-grid'),            
            rec = grid.getSelection()[0],                                          
            store = grid.getStore();                

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });                        
        
        Ext.Ajax.request({
            url: '/WebApp/api/SalesOrders/' + combo.getValue(), 
            method: 'POST',        
            //useDefaultXhrHeader: false,
            //cors: true,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },

            jsonData: rec.getData(true),

            params: {
                //store: comboSelected.get('name')
            }
                                  
        }).then(function(response){
            var result = Ext.decode(response.responseText, false);
            console.log('callback', store);

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
        
        //me.win.close();
        processMask.show();
    },

    onActEditClick: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('shopify-order-grid') || layout.lookupReference('tiles'),
            rec = grid.getSelection()[0];

        //console.log(rec.data.id);
        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("shopify-order/edit/" + rec.data.id);
    },

    /**
     *
     * @param b
     * @param c
     */
    onActCopyClick: function(b, c){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];

        me.showWindow(rec, 'windows-style-stylecopy', function(type){
            var win = me.win,
                //colorStore = win.down('multiselector').getStore(),
                colors = win.lookupReference('colors'),
                divisionSize = win.lookupReference('divisionSize'),
                btnSave = win.down('button[action="save"]');

            divisionSize.setHidden(true);

            win.lookupReference('chkNewColor').on('change', function(c, n, o){
                if(!n){
                    colors.setValue('');
                }
                btnSave.setDisabled(n === true && colors.getValue().length === 0);
            });

            colors.on('change', function(c, n, o){
                btnSave.setDisabled(c.getValue().length === 0);
            });

            /*
            colorStore.on('datachanged', function(store){
                btnSave.setDisabled(store.getCount() == 0);
            });
            */

            win.on('saveclick', me.onSaveCopy, me);
        });

        //var wvm = me.win.getViewModel();
        /*
        wvm.setStores({
            colors: {
                //storeId: 'memMyColors',
                pageSize: 50,
                remoteFilter: true,
                proxy: {
                    type: 'memory',
                    enablePaging: true,
                    reader: {
                        type: 'json',
                        rootProperty: 'data'
                    }
                }
            }
        });

        var remoteColors = Ext.create('Ext.data.Store', {
            model: 'Color',

            pageSize: 0,
            autoLoad: true,

            remoteFilter: true,

            proxy: {
                type: 'ajax',
                url: '/api/Options/colors',

                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                load: function(s){

                    wvm.getStore('colors').getProxy().setData(s.getRange());
                    wvm.getStore('colors').load();

                }
            }
        });
        */
    },

    onActRefreshClick: function(b, c){
        var me = this,
            vm = me.getViewModel(),
            linkInfo = vm.get('shopifyLink'),
            store = vm.getStore('shopifyorders'),
            bbar = me.getView().down("toolbar[dock=bottom]"),
            nextBtn = bbar.down("button[name=next]"),
            prevBtn = bbar.down("button[name=prev]");

            if(linkInfo == null){
                store.getProxy().setExtraParams({});
            }   

        store.load({
            callback: function(recs, op, success){
                var linkInfo = op.getResponse().responseJson.LinkHeader;
                console.log(bbar, nextBtn, linkInfo);
                
                nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  
                vm.set('shopifyLink', linkInfo);
            }
        });
    },

    onActDeleteClick: function(b, c){
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
                        grid = layout.lookupReference('grid'),
                        rec = grid.getSelection()[0];

                    //rec.drop();
                    //me.saveStore(grid, me.getView());
                }
            }
        });
    },
    

    onClearFilters: function(b){
        var me = this,
            layout = me.view.lookupReference("multiview"),
            topbar = layout.lookupReference("topbar"),
            searchcombo = topbar.lookupReference('searchcombo'),
            searchgrid = topbar.down('searchgrid'),
            grid = layout.lookupReference("grid");

        searchcombo.setValue('');
        searchcombo.getTrigger('clear').hide();
        searchgrid.setValue('');
        searchgrid.getTrigger('clear').hide();

        // Clear Sort...
        grid.getStore().sorters.clear();
        // Clear Grid filters...
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

        //display.setActive(rec);

        //console.log(rec);
        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "shopify-order";
        //k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[1] = "default";
        k[2] = rec.get("id");

        //console.log('grid - onSelect', rec);

        this.redirectTo(k.join("/"));
    },

    /**
     * 
     * @param {*} h tableview
     * @param {*} j record
     * @param {*} k element
     * @param {*} g row index
     * @param {*} l event
     */
    onItemContextMenu:function(h, j, k, g, l){
        var me = this,
            mv = me.lookupReference('multiview'),
            grid = mv.lookupReference('shopify-order-grid'),
            sm = h.getSelectionModel();

        l.stopEvent();                

        if(!sm.isSelected(g)){
            sm.select(g);
        }
                
        me.view.contextmenu.items.items[3].setDisabled(!Ext.isEmpty(grid.getSelection()[0].get('note')));

        me.view.contextmenu.showAt(l.getXY());
    }

});
