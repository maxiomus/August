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

        Ext.apply(store.getProxy().extraParams, {            
            store: combo.getValue()
        });
    },

    onStoreChange: function(combo, nValue, oValue){
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

    onContextMenuEditClick: function(d, c){

    },

    onContextMenuBookmarkClick: function(d, c){
        this.addBookmark(d, this.getView());
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

        console.log('grid - onSelect', rec);
        this.redirectTo(k.join("/"));
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
    }

});
