Ext.define('August.view.settings.shopify.ProductImageController', {
    extend: 'Ext.app.ViewController',
    
    alias: 'controller.shopify-productimage',

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
            view = me.getView(),
            mv = view.lookupReference("multiview"),
            topbar = mv.lookupReference("topbar"),
            combo = topbar.down("combo[name=stores]");
        
        console.log('Shopify Product beforeload', combo.getValue());

        store.getProxy().setHeaders({
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        })

        Ext.apply(store.getProxy().extraParams, {            
            store: combo.getValue()
        });
               
    }, 

    onStoreLoad: function(store){
        var me = this,
            //topbar = me.getView().down('toolbar'),
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopify-image-grid');
                
        //grid.getSelectionModel().deselectAll();        

        console.log('store datachanged', grid.getSelection());
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
        
        var me = this,
            //vm = me.getViewModel(),
            layout = me.getView().lookupReference('multiview'),            
            refs = layout.getReferences(),
            //grid = refs.shopifyProductGrid,
            topbar = refs.topbar;
                            
            //display = refs.display,
            //option1 = rec.options().first(),
            //colors = "";        

        var k = [],
            q = topbar.lookupReference("viewselection");

        k[0] = "shopify-product";
        //k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[1] = "default";
        k[2] = rec.get("id");
        
        me.redirectTo(k.join("/"));                   
    },

    onStoreChange: function(combo, nValue, oValue){
        var me = this,
            vm = me.getViewModel(),
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopify-image-grid'),
            store = vm.getStore('shopifyproductimages');
            //bbar = me.getView().down("toolbar[dock=bottom]"),
            //nextBtn = bbar.down("button[name=next]"),
            //prevBtn = bbar.down("button[name=prev]"); 

        vm.set('shopifyLink', null);
        store.getProxy().setExtraParams({}); 

        grid.getSelectionModel().deselectAll();

        store.load({
            callback: function(recs, op, success){
                var linkInfo = op.getResponse().responseJson.LinkHeader;
                
                //nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                //prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  

                //vm.set('shopifyLink', linkInfo);
                console.log('storechange', grid.getSelection());
            }
        });
    },

    onActRefreshClick: function(b, c){
        var me = this,
            vm = me.getViewModel(),            
            store = vm.getStore('shopifyproductimages');
            //bbar = me.getView().down("toolbar[dock=bottom]");
            //nextBtn = bbar.down("button[name=next]"),
            //prevBtn = bbar.down("button[name=prev]");               

        console.log('refresh', store);

        store.load({
            callback: function(recs, op, success){
                var linkInfo = op.getResponse().responseJson.LinkHeader;
                //console.log(bbar, nextBtn, linkInfo);
                
                //nextBtn.setDisabled(linkInfo == null || linkInfo.NextLink == null);   
                //prevBtn.setDisabled(linkInfo == null || linkInfo.PreviousLink == null);  
                //vm.set('shopifyLink', linkInfo);
            }
        });
    },

    onActExportClick: function(b, c) {
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('shopify-image-grid');

        grid.saveDocumentAs({
            type: 'xlsx',
            title: 'Shopify Product Image List',
            fileName: 'Shopify Product Images ' + Ext.Date.format(new Date(), 'Y-m-d')
        });
    }

});
