Ext.define('August.view.production.style.ProductController', {
    extend: 'Ext.app.ViewController',

    mixins: [
        'Ext.app.route.Base'
    ],

    alias: 'controller.product',

    requires: [
        'August.model.Media'
        //'August.model.Color'
    ],

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
        
    },

    onActNewClick: function(b){
        this.redirectTo("product/new");
    },

    onActEditClick: function(b, c){
        //console.log(b, c);

        var layout = this.lookupReference('multiview'),
            grid = layout.lookupReference('grid') || layout.lookupReference('tiles'),
            rec = grid.getSelection()[0];

        //console.log(rec.data.id);
        //this.showWindow(grid.getSelection()[0]);
        this.redirectTo("product/edit/" + rec.data.id);
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
                newStyle = win.lookupReference('newStyle'),
                colors = win.lookupReference('colors'),
                //divisionSize = win.lookupReference('divisionSize'),
                btnSave = win.down('button[action="save"]');

            //divisionSize.setHidden(false);
            
            win.lookupReference('chkNewStyle').on('change', function(c, n, o){
                if(!n){
                    newStyle.setValue('');
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
                url: '/WebApp/api/Options/colors',

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
        this.getStore("products").reload();
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
            //searchcombo = topbar.lookupReference('searchcombo'),
            searchtext = topbar.down('searchtextlist'),
            grid = layout.lookupReference("grid");

        //searchcombo.setValue('');
        //searchcombo.getTrigger('clear').hide();
        searchtext.setValue('');
        searchtext.getTrigger('clear').hide();

        // Clear Sort...
        grid.getStore().sorters.clear();
        // Clear Grid filters...
        grid.filters.clearFilters();
        // Clear Store filters...
        grid.getStore().clearFilter();
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

        k[0] = "product";
        k[1] = q.value == 0 ? "default" : q.value == 1 ? "medium" : "tiles";
        k[2] = rec.get("id");

        this.redirectTo(k.join("/"));
    },

    onItemContextMenu:function(h, j, k, g, l){
        l.stopEvent();

        var sm = h.getSelectionModel();

        if(!sm.isSelected(g)){
            sm.select(g);
        }

        this.view.contextmenu.showAt(l.getXY());
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
    },

    onOpenTemplateClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            topbar = multiview.lookupReference("topbar"),
            searchlist = topbar.down('searchtextlist'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];        

            //console.log(rec);
        me.showWindow(rec, 'windows-style-webtemplate', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                combo = win.down('combo[name="site"]'),
                field = win.down('searchtextlist'),
                grid = win.lookupReference('styleGrid'),        
                template = win.lookupReference('templateGrid'),   
                btnSaveAs = win.down('button[action="saveas"]');
            
            if (!Ext.isEmpty(searchlist.getValue())) {
                field.setValue(searchlist.getValue());
                field.activeFilter = searchlist.activeFilter;      
                field.getTrigger('clear').setHidden(false);  
            }
                                    
            /*            
            wvm.getStore('shopifytemplates').on('datachanged', function(store){
                btnTemplate.setDisabled(store.getCount() == 0);
                
                console.log('templates - store datachanged', store.first());
            });
            */
            //win.on('templateclick', me.onSaveWebPublish, me);            

            win.on('generateclick', function(b,c) {
                var store = template.getStore(),
                    styles = [];

                //console.log(grid.getSelectionModel().getSelection(), grid.getSelectionModel().selected);
                
                Ext.each(grid.getSelectionModel().getSelection(), function(rec, idx, self){
                    styles.push(rec.data.style.trim()+rec.data.color.trim());
                });            

                wvm.set('styles', styles);               

                store.load();

            }, me);

            win.on('resetclick', function(b,c) {
                var store = template.getStore();  

                //var selected = template.getSelectionModel().selected;
                field.fireEvent('triggerclear', field);
                store.removeAll();

            }, me);

            win.on('saveasclick', function(btn, type){
                var grid = win.lookupReference('templateGrid');
                                
                grid.saveDocumentAs({
                    type: type,
                    title: 'Shopify Product Template',
                    fileName: 'Product template ' + Ext.Date.format(new Date(), 'Y-m-d')
                });
                
            }, me);
        });
    },

    onOpenPublishClick: function(b, e){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];        

        me.showWindow(rec, 'windows-style-webexport', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnPublish = win.down('button[action="publish"]');            
            
            //console.log('onOpenPublishClick', wvm.getStore('publishes'));
            wvm.getStore('publishes').on('datachanged', function(store){
                btnPublish.setDisabled(store.getCount() == 0);
                
                console.log('publishes - store datachanged', store.first());
            });

            win.on('publishclick', me.onSaveWebPublish, me);
            win.on('saveattributeclick', me.onSaveAttribute, me);
        });
    },

    onOpenUploadClick: function(){
        var me = this,
            multiview = me.getView().lookupReference('multiview'),
            grid = multiview.lookupReference('grid'),
            rec = grid.getSelectionModel().selected.items[0];

        this.showWindow(rec, 'windows-style-upload', function(type){

            var win = me.win,
                wvm = win.getViewModel(),
                //btnSave = win.getDockedItems('toolbar[dock="bottom"] > button[action="save"]')[0];
                btnSave = win.down('button[action="save"]');

            wvm.setStores({
                fileStore: {
                    model: 'Media',
                    listeners: {
                        beforesync: function(options, e){
                            /*
                             me.fileStoreMask = new Ext.LoadMask({
                             msg    : 'Please wait...',
                             target : view
                             });

                             me.fileStoreMask.show();
                             */
                        }
                    }
                }
            });

            wvm.getStore('fileStore').on('add', function(store, records, index){

                records.forEach(function(mediaRec){
                    mediaRec.set('FID', '3');
                    mediaRec.set('RORDER', index+1);
                    mediaRec.set('F_NAME', rec.data.style.trim() + (!Ext.isEmpty(rec.data.user2) ? '_' + rec.data.user2.trim() : '') + (!Ext.isEmpty(rec.data.prints) ? '_' +  rec.data.prints.split('(#)')[0] : '') + '_' + mediaRec.data.RORDER + '.' + mediaRec.data.name.split('.').pop());
                    mediaRec.set('F_TYPE', mediaRec.data.type);
                    mediaRec.set('F_SIZE', mediaRec.data.size);
                    mediaRec.set('F_EXT', '.' + mediaRec.data.name.split('.').pop());
                    mediaRec.set('F_STYLE', rec.data.style.trim());
                    mediaRec.set('F_DESC5', rec.data.user2);
                    mediaRec.set('F_DESC6', rec.data.prints.split('(#)')[0]);
                    mediaRec.set('F_DESC3', rec.data.prints.split('(#)')[1]);
                    mediaRec.set('F_LINK', 'DLIB/BLU-PHOTOS/');
                    mediaRec.set('F_OWNER', rec.id);
                    mediaRec.set('F_LOCATION', mediaRec.data.name + '_' + mediaRec.data.size);
                    mediaRec.set('F_APPLICATION', 'DAL');
                    mediaRec.set('F_CATEGORY', 'Photos');
                    //mediaRec.set('F_OWNER', rec.data.style.trim());
                    mediaRec.set('F_BFLAG', true);
                    mediaRec.set('F_MFLAG', index > 1 ? null : (index == 0 ? 'FRONT' : 'BACK'));
                    mediaRec.set('F_USERID', August.user.data.Userid);
                    mediaRec.set('F_CREATED_ON', new Date());
                    //idx = idx + 1;
                    //console.log(mediaRec);
                });
            });

            wvm.getStore('fileStore').on('datachanged', function(store){
                btnSave.setDisabled(store.getCount() == 0);
            });

            win.on('saveclick', me.onSaveUpload, me);
        });
    },

    onGenerate: function(b, c){

    },

    /**
     *
     * @param b Ext.button.Button
     * @param c Ext.window.Window
     */
    onSaveCopy: function(b, c){
        var me = this,
            view = me.getView(),
            vm = c.getViewModel(),
            grid = view.refs.multiview.refs.grid,
            session = vm.getSession(),
            changes = session.getChanges(),
            //colorStore = c.lookupReference('color-grid').getStore(),
            newStyle = c.lookupReference('chkNewStyle'),
            copy = c.lookupReference('chkCopyCS'),
            //csnum = c.lookupReference('numCS'),
            //colors = grid.getStore().getRange(),
            sRec = grid.getSelection()[0];

        console.log('onSaveCopy', c.lookupReference('colors').getValue());
        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: view
        });

        c.hide('', function(){
            me.mv.unmask();
            processMask.show();
        });

        var form = c.down('form').getForm();

        if(form.isValid()){
            form.submit({
                url: '/WebApp/api/Products/Copy',
                success: function(form, action){
                    processMask.hide('', function() {
                        Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                            view.getViewModel().getStore('products').reload();
                        });
                    });
                },
                failure: function(form, action){
                    processMask.hide('', function(){
                        
                        switch (action.failureType) {
                            case Ext.form.action.Action.CLIENT_INVALID:
                                Ext.Msg.alert(
                                    'Failure',
                                    'Form fields may not be submitted with invalid values'
                                );
                                break;
                            case Ext.form.action.Action.CONNECT_FAILURE:
                                Ext.Msg.alert('Failure', 'Ajax communication failed');
                                break;
                            case Ext.form.action.Action.SERVER_INVALID:
                               Ext.Msg.alert('Failure', action.result.msg);                                                        
                       }                       

                    });

                                       
                }
            });
        }
        /*
        August.model.style.Product.load(parseInt(sRec.getId(),10), {
            success: function (rec, ope) {

                var colors = [];

                if(!newColor.checked){
                    colors.push(rec.data.color.trim());
                }
                else {
                    colorStore.each(function(rec){
                        colors.push(rec.data.code.trim())
                    })
                }

                Ext.each(colors, function(color){

                    var record = rec.copy(null, session);

                    if(!newColor.checked){
                        record.data.style = '';
                    }
                    record.data.color = color;
                    record.data.userName = August.user.data.Userid;
                    record.data.userTime = new Date();
                    record.data.UpdateUser = null;
                    record.data.UpdateTime = null;

                    if(!copy.checked){
                        record.data.cost = 0;
                        record.data.defaultBomCost = 0;
                        record.data.avgCost = 0;
                        record.data.BomCost1 = 0;
                        record.data.bomcost2 = 0;
                        record.data.bomcost3 = 0;
                        record.data.bomcost4 = 0;
                        record.data.bomcost5 = 0;
                    }
                    else {
                        rec.bomhs(function(bomhs){
                            //console.log('Product Get', bomhs, csnum.getValue());
                            bomhs.each(function(bomh){
                                if(bomh.data.bomno == csnum.getValue()){

                                    var nbomh = bomh.copy(null, session);
                                    nbomh.data.color = record.data.color;
                                    nbomh.data.createUser = August.user.data.Userid;
                                    nbomh.data.createTime = new Date();
                                    nbomh.data.updateUser = null;
                                    nbomh.data.updateTime = null;

                                    var abomh = record.bomhs().add(nbomh);

                                    bomh.boms(function(boms){

                                        boms.each(function(bom){
                                            var nbom = bom.copy(null, session);
                                            nbom.data.color = record.data.color;

                                            abomh[0].boms().add(nbom);
                                        });
                                        //console.log('Product Get', boms, abomh);
                                    });

                                    bomh.bolhs(function(bolhs){
                                        bolhs.each(function(bolh){
                                            var nbolh = bolh.copy(null, session);
                                            nbolh.data.color = record.data.color;
                                            nbolh.data.createUser = August.user.data.Userid;
                                            nbolh.data.createTime = new Date();
                                            nbolh.data.updateUser = null;
                                            nbolh.data.updateTime = null;

                                            var abolh = abomh.bolhs().add(nbolh);

                                            bolh.bols().each(function(bol){
                                                var nbol = bol.copy(null, session);
                                                nbol.data.color = record.data.color;

                                                abolh[0].bols().add(nbol);
                                            });
                                        });
                                    });
                                }
                            })
                        })
                    }
                });

                //console.log(session, session.getChanges())

                var batch = session.getSaveBatch();

                if(batch !== undefined){

                    batch.on({
                        operationcomplete: function(batch, op){
                            //console.log(op, op.getResultSet());
                            var objResp = op.getResponse();
                            if(!Ext.isEmpty(objResp)){
                                var response = JSON.parse(objResp.responseText);
                                //console.log(response)

                                if(!Ext.isEmpty(response) && response.data.hasOwnProperty('bomhId')){
                                    var cost = view.down('numberfield[name="cost"]');
                                    //cost.setValue('')
                                }

                            }
                        },
                        complete: function(batch, op){

                            var response = JSON.parse(op.getResponse().responseText);

                            processMask.hide('', function() {
                                Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                    view.getViewModel().getStore('samples').reload();
                                });
                            });
                        },
                        exception: function(batch, op){
                            processMask.hide('', function(){
                                //Ext.Msg.alert('Error', 'Error occurred');
                                var objResp = op.error.response;
                                //console.log(objResp)
                                if(!Ext.isEmpty(objResp)){
                                    var response = JSON.parse(objResp.responseText);
                                    Ext.Msg.alert(objResp.statusText, objResp.responseText);
                                }

                            });
                        }
                    });

                    batch.start();
                }
                else {
                    Ext.Msg.alert('No Changes', 'There are no changes to the session.');
                }

            },
            failure: function(rec, ope) {

            },
            callback: function(rec, ope){

            }
        });
        */
    },

    onSaveAs: function(b, c) {

    },

    onSaveAttribute: function(b, c){
        
        var me = this,
            vm = c.getViewModel(),
            //publishGrid = c.lookupReference('publishGrid'),
            attributeGrid = c.lookupReference('attributeGrid'),
            store = attributeGrid.getStore();

            //console.log('onSaveAttribute', store);
        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        store.sync({
            success: function(batch, opts) {
                processMask.hide('', function() {
                    Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                        
                    });
                });                
            },
            failure: function(batch, opts) {
                console.log(opts);
                var resp = opts.getResponse();                
                processMask.hide('', function() {
                    Ext.Msg.alert(resp.statusText + ' - ' + resp.status, resp.responseJson.Message);
                });
            },
            callback: function (batch, opts) {
                //console.log(opts);
            }
        });

        me.win.close();
        processMask.show();
    },

    onSaveWebPublish: function(b, c) {        

        var me = this,
            saveColors = [],
            //vm = c.getViewModel(),
            //styleGrid = me.getView().lookupReference('style-grid'),
            //styleRec = styleGrid.getSelectionModel().selected.items[0],
            topbar = c.down("toolbar"),
            combo = topbar.down("combo[name=site]"),
            comboSelected = combo.getSelection(),
            publishGrid = c.lookupReference('publishGrid'),
            //attributeGrid = c.lookupReference('attributeGrid'),                                    
            store = publishGrid.getStore();        

        store.each(function(rec, idx){
            if(rec.get('toPublish') == false){
                store.remove(rec);
            }
            else{
                saveColors.push(rec.get('color'));
            }
        });

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.win
        });        
        
        var p = me.constructShopifyProduct(store, saveColors);
        
        Ext.Ajax.request({
            url: '/WebApp/api/ShopifyProducts',            
            method: 'POST',        
            //useDefaultXhrHeader: false,
            //cors: true,
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },
            jsonData: p,
            params: {
                store: comboSelected.get('name')
            }
            //username: '2bc37edde9a6a0cb3897ee531cda2e44',
            //password: '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',                        
        }).then(function(response){
            var result = Ext.decode(response.responseText, false);
            console.log('callback from shopify', store);
            if(result =! null) {
                store.each(function(rec, idx){
                    rec.set('published', true)
                });

                store.sync({
                    success: function(batch, opts) {
                        //me.win.close();
                        store.load();
                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.', function(){
                                console.log(result);
                            });
                        });                
                    },
                    failure: function(batch, opts) {
                        console.log(opts);
                        var resp = opts.getResponse();                
                        processMask.hide('', function() {
                            Ext.Msg.alert(resp.statusText + ' - ' + resp.status, resp.responseJson.Message);
                        });
                    },
                    callback: function (batch, opts) {
                        //console.log(opts);
                    }    
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

    onSaveUpload: function(b, c){

        var me = this,
            vm = c.getViewModel(),
            grid = me.getView().refs.multiview.refs.grid,
            form = c.down('form').getForm(),
            sampleRec = grid.getSelection()[0],
            fileStore = vm.getStore('fileStore'),
            field = c.down('form').down('multiupload').getDockedItems('toolbar[dock="top"] > uploadfiles')[0];

        if(!form.isValid()){
            Ext.create('Ext.ux.window.Notification', {
                position: 'br',
                useXAxis: true,
                cls: 'ux-notification-light',
                iconCls: 'ux-notification-icon-information',
                closable: false,
                title: 'Error',
                padding: '0 5px 5px 5px',
                html: '<p>Form is invalid. Please check all the fields.</p>',
                slideInDuration: 800,
                slideBackDuration: 1500,
                autoCloseDelay: 4000,
                slideInAnimation: 'elasticIn',
                slideBackAnimation: 'elasticIn'
            }).show();
        }

        var processMask = new Ext.LoadMask({
            msg: 'Saving... Please wait',
            target: me.getView()
        });

        fileStore.sync({
            //url: '/form-upload.aspx',
            //headers : {'Content-Type':'multipart/form-data; charset=UTF-8'},
            //waitMsg: 'Uploading files...',
            success: function(batch, opt) {

                /*
                var res = Ext.JSON.decode(response.responseText, true);
                var win = form.owner.up('window');
                if(win){
                    win.close();
                }
                */

                var operations = batch.getOperations();

                for(var i in operations){
                    var operation = operations[i];
                    //console.log(operation);
                    if(operation.getResponse()){
                        var response = JSON.parse(operation.getResponse().responseText);
                        if(field && field.getFilesQueue().length > 0){
                            field.send({
                                url: '/WebApp/api/Files/Photos/upload',
                                success: function(resp){
                                    //console.log(resp);
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Status', JSON.stringify(resp.data.Media, null, 4));
                                    });
                                    //Ext.Msg.alert('Status', 'Changes saved successfully.');
                                },
                                failure: function(resp) {
                                    processMask.hide('', function() {
                                        Ext.Msg.alert('Failure', resp);
                                    });
                                }
                            }, {
                                Media: JSON.stringify(response.data)
                            });
                        }
                    }
                }

            },
            failure: function(batch, options) {

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

            },
            callback: function (batch, options) {
                //console.log(options);
            }
        });

        me.win.close();
        processMask.show();
    },

    onOpenLabeltagClick: function(btn){

        var win,
            view = this.getView(),
            layout = view.lookupReference('multiview'),
            grid = layout.lookupReference('grid'),
            record = grid.getSelectionModel().selected.items[0];

        if (!win) {

            win = Ext.widget('windows-style-labeltag', {
                width: 400,
                height: view.getHeight() - 80
                //maxHeight: 600
                //width: window.innerWidth * 0.8,
                //height: window.innerHeight * 0.8
            });

            //console.log(window.innerHeight)
            //win.loader.load();
            var request = "../PrintTag.aspx?style=" + record.get('style').trim() + "&color=" + record.get('color').trim();
            win.html = '<iframe src="' + request + '" id="innerFrame" name="innerFrame" width="100%" height="100%" frameborder="0"></iframe>';
        }

        win.show(this, function () {
            //console.log('callback function from window show.');
        });
    },

    //Private function...
    /**
     * 
     * @param {Ext.data.Store} store 
     * @param {Array} colors 
     * @returns 
     */
    constructShopifyProduct: function(store, colors){
        
        var rec = store.first(),
            memo = this.stringToHtmlUlTag(rec.get('memo').replace(/, updated by Mass Update/g, ""), 'product-details memo', /- .*/mig),
            style = this.stringToHtmlUlTag(rec.get('style'), 'product-descriptions style', null),            
            cimemo = this.stringToHtmlUlTag(rec.get('cimemo'), 'product-descriptions cimemo', null),
            retailSize = this.stringToHtmlUlTag(rec.get('user6'), 'product-descriptions user6', null);

        //console.log('constructShopifyProduct', memo);
        var product = Ext.create('August.model.shopify.Product', {
            title: rec.get('descript'),
            body_html: memo + style + cimemo + retailSize,
            vendor: rec.get("division"),            
            product_type: rec.get('category'),            
            handle: rec.get('descript') + "-" + rec.get('style'),
            status: rec.get('active') ? 'active' : 'draft',
            published_scope: 'global'
        });
        
        var optionInfo = [{name: 'Color', position: 1}, {name: 'Size', position: 2}],
            sizeInfo = rec.getSizeVariant(),
            sizes = sizeInfo.get('sizes').split(",", sizeInfo.get('sizeCount')),
            upcInfo = rec.get('upcs'),
            upcSize = {};

        Ext.Array.each(upcInfo, function(item, idx, self){
            upcSize[item.size] = item.upc;
        });

        Ext.Array.each(optionInfo, function(item, index, self){
            var values = index == 0 ? colors : sizes;            
            item.values = values;

            var option = Ext.create('August.model.shopify.ProductOption', item);                
            product.options().add(option);            
        });                           

        var ctr = 1,
            twoSides = ['front', 'back'];

        store.each(function(rec, idx){                                    
            /*
            Ext.Array.each(twoSides, function(item, idx, self){
                var imageurl = Ext.String.format('http://64.136.152.54:8088/ProductImages/{0}_{1}_{2}.jpg', rec.get('style'), rec.get('color'), item),  
                image = Ext.create('August.model.shopify.ProductImage', {
                    src: imageurl
                });
                product.images().add(image);
            });            
            */

            sizes.forEach(function(value, index, arr){
                var variant = Ext.create('August.model.shopify.ProductVariant', {
                    title: rec.get('color') + " / " + value,
                    price: rec.get('sgtRetailPrice'),
                    sku : rec.get('style') + "-"+ rec.get('color') + "-" + value,
                    position: ctr, 
                    inventory_policy: "deny",                          
                    //"compare_at_price": null,
                    fulfillment_service: "manual",
                    inventory_management: "shopify",      
                    option1: rec.get('color'),
                    option2: value,
                    //"option3": null,                    
                    taxable: true,
                    //"inventory_item_id": 43775777734826,
                    //"inventory_quantity": 2,
                    //"old_inventory_quantity": 2,
                    //"requires_shipping": true,
                    barcode: upcSize[value]
                });

                product.variants().add(variant);
                ctr = ctr + 1;                
            });
        });
        
        console.log('constructShopifyProduct', product, sizes, sizeInfo);
        return product.getData(true);        
    },

    /**
     * 
     * @param {string} source 
     * @param {string} cls 
     * @param {string} rgxPattern 
     */
    stringToHtmlUlTag: function(source, cls, rgxPattern)
    {
        var html = Ext.String.format("<ul class=\"{0}\">", cls);

        var matches = source.match(rgxPattern);
        
            //console.log('stringToHtmlUlTag', source, matches);
            if(matches == null){
                return Ext.String.format("<div class=\"{0}\">{1}</div>", cls, source);
            }                        

            matches.forEach(function(value, index, self){
                html += Ext.String.format("<li class=\"{0}\">{1}</li>", cls, value.replace(/(- )/, ""));
            });

            html += '</ul>';    
            //console.log('stringToHtmlUlTag', Ext.htmlDecode(html));            

            return Ext.htmlDecode(html);
    }
    

});
