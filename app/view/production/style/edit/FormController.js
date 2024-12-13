Ext.define('August.view.production.style.edit.FormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.style-edit-form',

    requires: [
        'August.model.ProcessOrder',
        'August.model.style.Product',
        'August.model.style.Bomh',
        'August.model.style.Bom',
        'August.model.style.Bolh',
        'August.model.style.Bol',
        'August.model.style.Smph',
        'August.model.style.File',
        'August.model.style.Reqh',
        'August.model.style.Reqd',
        'August.model.style.Reqe'
    ],

    listen: {
        component: {
            'style-edit-form > window': {
                close: function(p){
                    this.mv.unmask();
                }
            }
        }
    },

    init: function(){
        var me = this;

        me.mv = August.app.getMainView();

        Ext.Ajax.request({
            url: 'resources/data/production/style/stores.json',
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

    initViewModel: function(vm) {
        //var rec = vm.linkData.theSample;
        //console.log('initViewModel', rec, vm.get('theSample'))
    },

    /*
    onViewUploadRender: function(c){
        var refs = this.getReferences(),
            view = refs.attachment.down('viewupload'),
            toolbar = c.previousSibling('toolbar');

        toolbar.add(view.fileUpload);
    },

    onAttachBtnRemoveAll: function(btn){
        var refs = this.getReferences(),
            view = refs.attachment.down('viewupload');

        view.getStore().removeAll();
        view.fileUpload.filesQueue.length = 0;
    },

    onBtnReject: function(btn){
        var me = this,
            refs = this.getReferences(),
            view = refs.attachment.down('viewupload'),
            vm = me.getViewModel(),
            changes = me.getSession().getChanges();

        view.getStore().rejectChanges();

        console.log(me.getSession())

        changes=Ext.JSON.encodeValue(changes, '<br>');
        Ext.Msg.alert('proxy', '<pre>' + changes + '</pre>');
    },

    onToggleSlideChange: function(btn, pressed){
        var refs = this.getReferences(),
            photos = refs.photos,
            attach = refs.attachment,

            detail = attach.getComponent('attach-detail');

        btn.setIconCls(pressed ? 'x-fa fa-toggle-on' : 'x-fa fa-toggle-off');

        detail.setHidden(!pressed);
    },
    */

    onWarehouseStoreLoad: function(store){
        store.insert(0, {
            label: 'All',
            value: 'All'
        });
    },

    onBeforeInventoriesStoreLoad: function(store){
                
    },

    onWarehouseSelect: function(combo, rec){
        var me = this,
            vm = me.getViewModel(),
            store = vm.getStore('inventories');

        store.filter('warehouse', combo.getValue());
    },

    onViewRefresh: function(view, selected, e) {
        var me = this,
            onhandEl = view.getEl().down('i.dataview-icon-onhand'),
            onorderEl = view.getEl().down('i.dataview-icon-onorder'),
            wipEl = view.getEl().down('i.dataview-icon-wip');                        

        //console.log('onViewRefresh', onhandEl);

        if(onhandEl){
            onhandEl.on('click', function(e, node) {
                me.showWindow('windows-style-onhand', function(ref){
                    var grid = me.win.lookupReference('style-onhand-grid'),
                        store = me.getViewModel().getStore('onhands'),
                        columns = grid.getColumns(),
                        rec = store.first();
                    
                    //console.log(grid, store, columns, rec);
                    if(rec != null){
                        var index = 0;
                        Ext.each(columns, function(col, idx){                        
                            
                            if(idx > 2 && idx < 18) {
                                index = idx - 2;                            
                                col.setText(rec.get('size'+index));             
                            }                        
                        });
                    }
                    
                });
    
            }, view, {                                    
                stopEvent: true
            });
        }        

        if(onorderEl){
            onorderEl.on('click', function(e, node) {
                me.showWindow('windows-style-onorder');
                    var grid = me.win.lookupReference('style-onorder-grid'),
                    store = me.getViewModel().getStore('onorders'),
                    columns = grid.getColumns(),
                    rec = store.first();
                
                //console.log(grid, store, columns, rec);
                if(rec != null){
                    var index = 0;
                    Ext.each(columns, function(col, idx){                        
                        
                        if(idx > 16 && idx < 32) {
                            index = idx - 16;                            
                            col.setText(rec.get('size'+index));             
                        }                        
                    });
                }
                
            }, view, {                                    
                stopEvent: true
            });
        }

        if(wipEl){
            wipEl.on('click', function(e, node) {
                me.showWindow('windows-style-wip');
    
            }, view, {                                    
                stopEvent: true
            }); 
        }
                
    },

    onBeforeViewItemClick: function(view, rec, item, idx, e) {                

        var me = this,
            onhandEl = view.getEl().down('i.dataview-icon-onhand'),
            onorderEl = view.getEl().down('i.dataview-icon-onorder'),
            wipEl = view.getEl().down('i.dataview-icon-wip');
                
        e.preventDefault();         
        
        console.log('onBeforeViewItemClick', onhandEl);
    },

    onPositionChange: function(btn, active){
        var tabpanel = this.lookupReference('editproducttabs'),
            tabBar = tabpanel.tabBar,
            vertical = active.itemId == 'left' || active.itemId == 'right';

        tabpanel.setBind({
            tabPosition: active.itemId
        });

    },

    onTabChange: function(t, n, o, e){
        var refs = this.getView().getReferences();

        refs.costCrud.setHidden(n.reference != 'costslist');
        refs.reqCrud.setHidden(n.reference != 'reqs');
        //refs.toggledetail.setHidden(n.reference != 'attachment' && n.reference != 'photos');

    },

    // Cost Sheets...
    onAddCostClick: function(btn){
        this.showCosting(null);
    },

    onCopyCostClick: function(btn){
        var me = this,
            session = me.getSession(),
            grid = me.lookupReference('costslist'),
            d = grid.getSelection()[0];

        var lbo = grid.getStore().getData().last();

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', nd);

        nd.data.processtotal = null;
        nd.data.subTotal = null;
        nd.data.assoctotal = null;
        nd.data.total = null;

        nd.data.confirm_yn = null;
        nd.data.updateUser = null;
        nd.data.updateTime = null;

        nd.set('bomno', lbo.data.bomno + 1);
        nd.set('createUser', August.user.data.AccountId);
        nd.set('createTime', new Date());

        d.boms().each(function(rec){
            var cr = rec.copy(null, session);
            cr.set('bomno', nd.data.bomno);
            nd.boms().add(cr);
        });
        /*
        Ext.Object.each(session.data['sample.Bom'], function(key, value, self){
            var rec = value.record;
            if(rec.get('bomhId') == d.id){
                var cr = rec.copy(null, session);
                cr.set('bomno', nd.data.bomno)
                nd.boms().add(cr);
            }
        });
        */

        if(false){
            var bolh = d.bolhs().first();
            if(bolh){
                var nb = bolh.copy(null, session);
                nb.set('bomno', nd.data.bomno);
                nb.set('createUser', August.user.data.AccountId);
                nb.set('createTime', new Date());
                nb.set('updateUser', null);
                nb.set('updateTime', null);

                nd.bolhs().add(nb);

                bolh.bols().each(function(rec){
                    var cr = rec.copy(null, session);
                    cr.set('bomno', nd.data.bomno);
                    nb.bols().add(cr);
                });
                /*
                 Ext.Object.each(session.data['sample.Bol'], function(key, value, self){
                 var rec = value.record;
                 if(rec.get('bomhId') == d.id){
                 var cr = rec.copy(null, session);
                 cr.set('bomno', nd.data.bomno)
                 nd.bols().add(cr);
                 }
                 });
                 */
            }
        }

        nd.set('subTotal', (nd.data.colorCompTotal * 100 + nd.data.processtotal * 100) / 100);
        nd.set('total', nd.get('subTotal') + nd.get('assoctotal'));

        grid.getStore().add(nd);
        grid.getView().refresh();
    },

    onEditCostClick: function(btn){
        var me = this,
            view = me.lookupReference('costslist'),
            selection = view.getSelection()[0];

        this.showCosting(selection);
    },

    onDeleteCostClick: function(btn){
        var me = this,
            grid = me.lookupReference('costslist'),
            store = grid.getStore(),
            bomhCellEdit = grid.getPlugin("bomhCellEdit"),
            selection = grid.getSelectionModel().getSelection()[0];

        bomhCellEdit.cancelEdit();

        grid.getSelectionModel().deselectAll();
        //store.remove(grid.getSelection()[0]);

        //delete this.getSession().data['sample.Bolh'][selection.getBolh().id];
        /**
         * By setting record property dropped as  true,
         * This will remove record from session.
         */
        //console.log(selection.getBolh(), this.getSession().data['sample.Bolh'])
        /*
        var bolhId = '';
        if(selection.getBolh() != null){
            //selection.getBolh().dropped = true;
            bolhId = selection.getBolh().id;
            selection.setBolh(null);
            //console.log('not null', selection, this.getSession().peekRecord('sample.Bolh', bolhId))
        }

        if(bolhId.split('-').length < 3 && this.getSession().peekRecord('sample.Bolh', bolhId) != null){
            delete this.getSession().data['sample.Bolh'][bolhId];
        }
        */
        selection.drop();
        //console.log(this.getSession().data['sample.Bolh'])
        //console.log(this.getSession())
    },

    onCopyFromClick: function(btn){
        var me = this,
            view = me.getView();

        me.win = view.add({
            xtype: 'window',

            layout: {
                type: 'fit'
            },

            header: {
                title: 'Copy From Other Style',
                iconCls: 'x-fa fa-clone',
                titlePosition: 0,
                titleAlign: 'left'
            },

            padding: 10,

            width: 720,
            height: 240,
            minWidth: 720,
            minHeight: 240,

            //modal: true,
            monitorResize: true,
            maximizable: true,
            constrain: true,
            closable: true,

            tools: [{
                type: 'pin'
            }],

            items: [{
                xtype: 'form',
                layout: {
                    type: 'anchor'
                },
                defaults: {
                    margin: '0 0 10 0'
                },
                items: [{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    fieldDefaults: {
                        margin: '0 15 0 0'
                    },
                    items:[{
                        xtype: 'combo',
                        name: 'style',
                        fieldLabel: 'Style #',
                        labelWidth: 50,
                        //hideTrigger: true,
                        tabIndex: 0,
                        allowBlank: false,

                        store: 'memStyles',
                        remoteStore: 'Styles',
                        valueField: 'id',
                        displayField: 'id',

                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        matchFieldWidth: false,
                        queryMode: 'local',
                        //queryParam: "filter",
                        pageSize: 50,
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            triggerClear: function(combo){

                                var cboColor = combo.ownerCt.query('combo[name="color"]')[0],
                                    cboBomno = combo.ownerCt.query('combo[name="bomno"]')[0];

                                cboColor.getStore().clearFilter();
                                cboColor.setValue('');

                                cboBomno.setValue('');
                            },
                            select: function(combo){
                                var cboColor = combo.ownerCt.down('combo[name="color"]'),
                                    store = cboColor.getStore();

                                store.clearFilter();

                                if(!Ext.isEmpty(combo.getValue())){

                                    store.filter([{
                                        property: 'text',
                                        value: combo.getValue().toUpperCase(),
                                        operator: '='
                                    }]);

                                    //cboColor.select(store.first());
                                }
                            }
                        }
                    },{
                        xtype: 'combo',
                        name: 'color',
                        fieldLabel: 'Color',
                        labelWidth: 40,
                        //hideTrigger: true,
                        tabIndex: 1,
                        allowBlank: false,

                        store: 'memStColors',
                        remoteStore: 'stColors',

                        valueField: 'label',
                        displayField: 'label',

                        selectOnFocus: false,
                        selectOnTab: false,
                        //typeAhead: true,
                        //forceSelection: true,
                        //minChars: 1,
                        autoLoadOnValue: true,
                        matchFieldWidth: false,
                        queryMode: 'local',
                        pageSize: 50,
                        tpl: new Ext.XTemplate('<tpl for=".">' +
                            '<tpl if="[xindex] == 1">' +
                            '<table class="cbo-list">' +
                            '<tr>' +
                            '<th width="55%">Color</th>' +
                            '<th width="45%">Code #</th>' +
                            '</tr>' +
                            '</tpl>' +
                            '<tr class="x-boundlist-item">' +
                            '<td>{label}</td>' +
                            '<td>{text}</td>' +
                            '</tr>' +
                            '<tpl if="[xcount-xindex]==0">' +
                            '</table>' +
                            '</tpl>' +
                            '</tpl>'),
                        listConfig: {
                            width: 340,
                            loadingText: 'Searching....',
                            emptyText: '<p style="padding-left: 5px;">No match found.</p>'

                            // Custom rendering template for each item
                        },
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        listeners: {
                            triggerClear: function(combo){

                                var cboBomno = combo.ownerCt.query('combo[name="bomno"]')[0];

                                cboBomno.setValue('');
                            },
                            beforequery: {
                                fn: function(qe){

                                }
                            },
                            select: function (combo, rec) {
                                var cboStyle = combo.ownerCt.query('combo[name="style"]')[0],
                                    cboBomno = combo.ownerCt.query('combo[name="bomno"]')[0],
                                    store = cboBomno.getStore();

                                Ext.apply(store.getProxy().extraParams, {
                                    style: cboStyle.getValue().trim(),
                                    color: combo.getValue().trim()
                                });

                                store.load({
                                    callback: function(){
                                        //qe.combo.select(store.first());
                                        //colorCombo.fireEvent('select', combo, [store.first()]);
                                    }
                                });
                            }

                        }
                    },{
                        xtype: 'combo',
                        name: 'bomno',
                        fieldLabel: 'C.S #',
                        labelWidth: 40,
                        width: 95,
                        store: 'Bomnos',
                        displayField: 'id',
                        valueField: 'id',

                        editable: false,
                        forceSelection: true,
                        //minChars: 1,
                        tabIndex: 2,
                        matchFieldWidth: true,
                        queryMode: 'local',
                        //pageSize: 15,
                        //queryDelay: 500,
                        allowBlank: false,
                        listeners: {
                            beforequery: {
                                fn: function(qe){

                                    //delete qe.combo.lastQuery;
                                }
                            }
                        }
                    }]
                }],

                buttons: [{
                    action: 'save',
                    text: 'Save',
                    formBind: true,
                    //glyph: 86,
                    iconCls: 'x-fa fa-save',
                    handler: function(btn){
                        var form = me.win.down('form').getForm(),
                            data = form.getValues();

                        me.copyCostSheet(data);
                    }
                },{
                    action: 'close',
                    text: 'Close',
                    //glyph: 88,
                    iconCls: 'x-far fa-times-circle',
                    handler: function(btn){
                        me.win.close();
                    }
                }]
            }]
            // Create a child session that will spawn from the current session of this view
            //session: true,
        });

        me.win.show('', function(){
            me.mv.mask();
        });
    },

    copyCostSheet: function(data){
        var me = this,
            theSample = me.getViewModel().get('theSample'),
            grid = me.lookupReference('costslist'),
            lbo = grid.getStore().getData().last(),
            id = data.style+'-'+data.color+'-'+data.bomno;


        var processMask = new Ext.LoadMask({
            msg: 'Processing... Please wait',
            target: me.mv
        });

        processMask.show('', function(){
            me.win.close();
        });

        August.model.style.Bomh.load(id, {
            success: function (d, ope) {

                var nd = d.copy(null);
                //console.log('onCopyStyleClick - before', nd);
                nd.set('style', theSample.data.style);
                nd.set('color', theSample.data.color);
                nd.set('bomno', lbo ? lbo.data.bomno + 1 : 1);

                nd.data.subTotal = null;
                nd.data.assoctotal = null;
                nd.data.total = null;

                nd.data.confirm_yn = null;
                nd.data.updateUser = null;
                nd.data.updateTime = null;

                nd.set('createUser', August.user.data.AccountId);
                nd.set('createTime', new Date());

                d.boms().each(function(rec){
                    var cr = rec.copy(null);
                    cr.set('style', nd.data.style);
                    cr.set('color', nd.data.color);
                    cr.set('bomno', nd.data.bomno);
                    nd.boms().add(cr);
                });

                var bolh = d.bolhs().first();
                if(bolh){
                    var nb = bolh.copy(null);
                    nb.set('style', nd.data.style);
                    nb.set('color', nd.data.color);
                    nb.set('bomno', nd.data.bomno);

                    nb.set('createUser', August.user.data.AccountId);
                    nb.set('createTime', new Date());
                    nb.set('updateUser', null);
                    nb.set('updateTime', null);

                    nd.bolhs().add(nb);

                    bolh.bols().each(function(rec){
                        var cr = rec.copy(null);
                        cr.set('style', nd.data.style);
                        cr.set('color', nd.data.color);
                        cr.set('bomno', nd.data.bomno);
                        nb.bols().add(cr);
                    });
                }

                nd.set('subTotal', (nd.data.colorCompTotal * 100 + nd.data.processtotal * 100) / 100);
                nd.set('total', nd.get('subTotal') + nd.get('assoctotal'));

                grid.getStore().add(nd);
                grid.getView().refresh();

            },
            failure: function(rec, ope) {

            },
            callback: function(rec, ope){
                processMask.hide();
            }
        });
    },

    onSaveCostClick: function(){
        // Save the changes pending in the win's child session back to the
        // parent session.
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('detail'),
            grid = me.lookupReference('costslist'),
            isEdit = this.isEdit,
            id;

        var bomh = win.getViewModel().get('theCosting');

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theCosting').id;
            }

            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store

                grid.getStore().add(session.getRecord('style.Bomh', id));
            }
            /*
             else {
             rec = session.peekRecord('style.Bomh', id);
             }
             */

            //console.log(win.getViewModel(),session);
            grid.getView().refresh();

            win.close();
        }
    },

    onPreviewCostClick: function(item, e){
        var me = this,
            grid = me.lookupReference('costslist'),
            rec = grid.getSelection()[0],
            view = me.getView(),
            //mv = August.app.getMainView(),
            xf = Ext.util.Format;

        var srcPath = xf.format('../services/CostSheetPrint.ashx?ID={0}&bomno={1}', rec.getProduct().getId() ,rec.data.bomno);

        me.win = view.add({
            xtype: 'window',

            title: 'Cost Sheet #' + rec.data.bomno,
            iconCls: "x-fa fa-calculator",

            layout: {
                type: 'fit'
            },

            renderTo: Ext.getBody(),
            //maximized: true,
            maximizable: true,
            //alignTarget: '',
            width: view.getWidth() * 0.98,
            //maxWidth: 1366,
            height: view.getHeight() * 0.98,

            items: [{
                xtype: 'component',
                itemId: 'contentIframe',
                autoEl: {
                    tag: 'iframe',
                    style: 'height: 100%; width: 100%; border: none',
                    src: srcPath
                }
            }],

            buttons: [{
                text: 'Print',
                handler: function(btn){
                    var iframe = me.win.getComponent('contentIframe');

                    if(iframe){
                        var cw = iframe.getEl().dom.contentWindow;
                        //console.log(iframe, cw.document);
                        cw.print();
                    }
                }
            }, {
                text: 'Cancel',
                handler: function(btn){
                    me.win.close();
                },
                scope: this
            }]
        });

        me.win.show('', function(){
            me.mv.mask();
        });

    },

    onAddReqClick: function(btn){
        this.showRequest(null);
    },

    onCopyReqClick: function(btn){
        var me = this,
            session = me.getSession(),
            grid = me.lookupReference('reqs').down('dataview'),
            d = grid.getSelection()[0];

        var nd = d.copy(null, session);
        //console.log('onCopyStyleClick - before', nd);

        nd.set('userId', August.user.data.AccountId);
        nd.set('userTime', new Date());

        d.reqds().each(function(rec){
            var cr = rec.copy(null, session);

            nd.reqds().add(cr);
        });

        grid.getStore().add(nd);
        grid.refresh();
    },

    onEditReqClick: function(btn){
        var me = this,
            view = me.lookupReference('reqs').down('dataview'),
            selection = view.getSelection()[0];

        this.showRequest(selection);
    },

    onDeleteReqClick: function(btn){
        var me = this,
            view = me.lookupReference('reqs').down('dataview'),
            store = view.getStore(),
            selection = view.getSelectionModel().getSelection()[0];

        view.getSelectionModel().deselectAll();

        selection.drop();
    },

    onSaveReqClick: function(){
        // Save the changes pending in the win's child session back to the
        // parent session.
        var me = this,
            session = me.getSession(),
            win = me.win,
            view = me.getView(),
            form = me.lookupReference('req-form'),
            dataview = me.lookupReference('reqs').down('dataview'),
            isEdit = this.isEdit,
            id, rec;

        if (form.isValid()) {
            if (!isEdit) {
                // Since we're not editing, we have a newly inserted record. Grab the id of
                // that record that exists in the child session
                id = win.getViewModel().get('theRequest').id;
            }

            win.getSession().save();

            if (!isEdit) {
                // Use the id of that child record to find the phantom in the parent session,
                // we can then use it to insert the record into our store
                rec = session.getRecord('style.Reqh', id);
                view.getStore().add(rec);
            }

            dataview.refresh();
            win.close();
        }
    },

    onPreviewReqClick: function(item, e){
        var me = this,
            grid = me.lookupReference('reqs').down('dataview'),
            rec = grid.getSelection()[0],
            view = me.getView(),
            //mv = August.app.getMainView(),
            xf = Ext.util.Format;

        var da = [], ea = [], jo = rec.data;

        if(rec.getId() > 0){
            rec.reqds().each(function(item){
                da.push(item.data);
            });

            rec.reqes().each(function(item){
                ea.push(item.data);
            });

            jo.reqds = da;
            jo.reqes = ea;
        }
        else {
            var to = me.getSession().getChanges();

            jo = to["style.Reqh"]["C"][0];

            jo.reqds = to["style.Reqd"] ? to["style.Reqd"]["C"] : [];
            jo.reqes = to["style.Reqe"] ? to["style.Reqe"]["C"] : [];
        }

        //console.log(jo)
        Ext.Ajax.request({
            url: '../api/Reqh/pdf',
            method: 'POST',
            binary: true,
            jsonData: [jo],
            success: function(response, options) {
                // decode response
                //console.log(response);
                var pdf = new Blob([response.responseBytes], {type: 'application/pdf'}),
                    fileurl = window.URL.createObjectURL(pdf);

                me.win = view.add({
                    xtype: 'window',

                    title: 'Request For Quote',
                    iconCls: "x-fa fa-print",

                    layout: {
                        type: 'fit'
                    },

                    renderTo: Ext.getBody(),
                    //maximized: true,
                    maximizable: true,
                    //alignTarget: '',
                    width: view.getWidth() * 0.98,
                    //maxWidth: 1366,
                    height: view.getHeight() * 0.98,

                    items: [{
                        xtype: 'component',
                        itemId: 'contentIframe',
                        autoEl: {
                            tag: 'iframe',
                            style: 'height: 100%; width: 100%; border: none',
                            //src: xf.format('../services/RFQHandler.ashx?ID={0}&bomno={1}', rec.getId() ,rec.data.bomno)
                            src: fileurl
                        }
                    }],

                    buttons: [{
                        text: 'Print',
                        handler: function(btn){
                            var iframe = me.win.getComponent('contentIframe');

                            if(iframe){
                                var cw = iframe.getEl().dom.contentWindow;
                                //console.log(iframe, cw.document);
                                cw.print();
                            }
                        }
                    }, {
                        text: 'Cancel',
                        handler: function(btn){
                            me.win.close();
                        },
                        scope: this
                    }]
                });

                me.win.show('', function(){
                    me.mv.mask();
                });
            },
            failure: function(response, options) {
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {

            }
        });

    },

    onGridRowDblclick: function(grid, rec, tr, idx, e){
        this.showCosting(rec);
        //console.log(rec)
    },

    onGridRowSelect: function(sm, selected, idx){

    },    

    showWindow: function(xtype, callback){
        var me = this,
            view = me.getView();

        //console.log(window.innerWidth, window.innerHeight)        

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
                    
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.                    
                }
            },            

            renderTo: Ext.getBody(),
            // Creates a child session that will spawn from the current session
            // of this view.       
            buttons: [{
                text: 'Close',
                handler: function(b){
                    me.win.close();
                }
            }]              
        });        
                
        me.win.show('', function(){
            me.mv.mask();            
        });

        me.win.on('close', function(p){
            me.mv.unmask();            
        });

        if(typeof callback === "function"){
            callback(xtype);
        }
    },

    showCosting: function(rec){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
            //mv = August.app.getMainView(),
            theProduct = vm.get('theProduct'),
            theBomh = theProduct.bomhs().last();

        console.log('showCosting', theProduct, theBomh);
        this.isEdit = !!rec;

        var mStyle = theProduct.data.style.trim(),
            mColor = theProduct.data.color.trim(),
            mBomno =  theBomh ? theBomh.data.bomno + 1 : 1;            

        me.win = view.add({
            xtype: 'window',
            iconCls: "x-fa fa-calculator",
            reference: 'costing-window',

            bind: {
                title: '{title}'
            },

            layout: {
                type: 'fit'
            },

            renderTo: Ext.getBody(),
            maximized: true,
            maximizable: true,
            //alignTarget: '',
            //width: view.getWidth() * 0.98,
            //height: view.getHeight() * 0.98,

            minHeight: 320,

            viewModel: {
                data: {
                    title: !rec ? 'Add New Costing' : ('Edit Costing: ' + (rec.get('style') && rec.get('color') ? rec.get('style') + ' / ' + rec.get('color') + '  - Cost Sheet #' + rec.get('bomno') : '')),
                    bomsValid: true
                },

                links: {
                    // If we are passed a record, a copy of it will be created in the newly spawned session.
                    // Otherwise, create a new phantom customer in the child.
                    theCosting: rec || {
                        type: 'style.Bomh',
                        create: {
                            style: mStyle,
                            color: mColor,
                            bomno: mBomno,
                            //processType: theSample.data.processtype.trim(),
                            EffStartDate: '2000-01-01 00:00:00',
                            EffEndDate: '2099-12-31 12:59:59'
                            //createUser: August.user.data.Userid
                        }
                    }
                },

                formulas: {

                    costValid: {
                        get: function(get){
                            return get('bomsValid') && get('theCosting').isValid();
                        }
                    },

                    isCostPhantom: {
                        bind: {
                            bindTo: '{theCosting}',
                            deep: true
                        },
                        get: function (bomh) {
                            return bomh.phantom;
                        }
                    }

                    /*
                    theProcessType: {
                        bind: {
                            bindTo: '{theProcessH}',
                            deep: true
                        },
                        get: function(bolh){
                            if(bolh){
                                console.log(bolh)
                                return bolh.data.ProcessType;
                            }
                        },
                        set: function(value){
                            console.log(this, value);
                            //this.set('theProcessH.ProcessType', value)
                        }
                    }
                    */
                    /*
                    materialsTotal: {
                        bind: {
                            bindTo: '{theCosting.boms}',
                            deep: true
                        },
                        get: function(boms){
                            var total = 0;
                            boms.each(function(r, idx){
                                total += r.get('cost') * r.get('qty');
                            })
                            return total;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('materialsTotal', value);
                        }
                    },

                    laborTotal: {
                        bind: {
                            bindTo: '{theCosting.bolhs}',
                            deep: true
                        },
                        get: function(bolhs){
                            var total = 0,
                                bolh = bolhs.first();

                            if(bolh){
                                bolh.bols().each(function(r, idx){
                                    total += r.get('price');
                                });
                            }
                            return total;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('laborTotal', value);
                        }
                    },

                    subTotal: {
                        get: function(data){
                            return (data('materialsTotal')*100 + data('laborTotal')*100)/100;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('subTotal', value);
                        }
                    },

                    associateTotal: {
                        bind: {
                            bindTo: '{theCosting.assoctotal}',
                            deep: true
                        },
                        get: function(data){
                            return data;
                        }
                    },

                    grandTotal: {
                        get: function(data){
                            return (data('subTotal')*100 + data('associateTotal')*100) / 100;
                        },
                        set: function(value){
                            //console.log(value)
                            //this.set('subTotal', value);
                        }
                    }
                    */
                }
            },

            // Creates a child session that will spawn from the current session
            // of this view.
            session: true,

            items: [{
                xtype: 'style-edit-detail',
                reference: 'detail'
            }],

            buttons: [{
                text: 'Save',
                bind: {
                    disabled: '{!costValid}'
                },
                handler: 'onSaveCostClick'
            }, {
                text: 'Cancel',
                handler: function(btn){
                    me.win.close();
                },
                scope: this
            }]
        });


        var wvm = me.win.getViewModel(),
            //cId = wvm.get('theCosting'),
            cRec = wvm.get('theCosting');
            //rec = rec != null ? rec : cRec,

        var detail = me.lookupReference('detail'),
            costSelect = detail.lookupReference('costSelect'),
            processSelect = detail.lookupReference('processSelect'),
            changes = this.getSession().getChanges();

        costSelect.setReadOnly(rec && !rec.phantom);

        if(changes && changes['style.Bolh']){
            if(changes['style.Bolh'].D && changes['style.Bolh'].D.indexOf(cRec.id) != -1)
            {
                //console.log(changes)
                processSelect.setDisabled(true);
            }
        }

        var boms = cRec.boms();
        boms.setGroupField('rawMatType');

        boms.on('update', function(store, record, op, mod, dt) {
            //console.log('update', record, op, mod)
            var flag = true,
                bomtotal = 0;

            store.each(function(r, idx){
                if(r.data.rawStyle && r.data.rawColor){
                    bomtotal += r.data.cost * r.data.qty;
                }
                else {
                    flag = false;
                }

            });

            wvm.set('bomsValid', flag);

            //me.win.getViewModel().get('theCosting').set('colorCompTotal', bomtotal)
            cRec.set('colorCompTotal', bomtotal);
            cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));

        }, this);

        boms.on('datachanged', function(store){
            console.log('datachanged', store.getCount());

            var flag = true,
                bomtotal = 0;

            store.each(function(r, idx){
                if(r.data.rawStyle && r.data.rawColor){
                    bomtotal += r.data.cost * r.data.qty;
                }
                else {
                    flag = false;
                }

            });

            wvm.set('bomsValid', flag);

            //me.win.getViewModel().get('theCosting').set('colorCompTotal', bomtotal)
            cRec.set('colorCompTotal', bomtotal);
            cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));
        }, this);

        boms.on('remove', function(store , records , index , isMove){

        }, this);

        if(!this.isEdit){

            boms.add({
                line_seq: 0,
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'SELF',
                rawMatType: 'FABRICS'
            },{
                line_seq: 1,
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'CONT #1',
                rawMatType: 'FABRICS'
            },{
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'SUB PAPER',
                rawMatType: 'SUBLIMATION PAPER'
            },{
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'STONES',
                rawMatType: 'STONE SHEETS'
            },{
                style: mStyle,
                color: mColor,
                bomno: mBomno,
                memo: 'TRIMS',
                rawMatType: 'TRIMS'
            });

        }

        //console.log('theProcessH', rec, bolh, wvm.get('theProcessH'))
        var bolh = cRec.bolhs().first();

        if(bolh){
            //console.log(rec.bolhs().first(), bolh)
            //processSelect.setDisabled(rec && !rec.phantom);
            //processSelect.setReadOnly(rec && !rec.phantom);

            var bols = bolh.bols();

            bols.on('update', function(store, record, op, mod, dt) {
                //console.log('bols update', store, cRec)

                var boltotal = 0;
                store.each(function(r, idx){
                    boltotal += r.data.price;
                });

                bolh.set('TotalCost', boltotal);

                cRec.set('processtotal', boltotal);
                cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));

            }, this);

            bols.on('datachanged', function(store){
                //console.log('datachanged', store, rec, cRec)

                //vm.get('theProcessH').set('ProcessType', me.lookupReference('detail').lookupReference('processSelect').getValue())
                var boltotal = 0;
                store.each(function(r, idx){
                    boltotal += r.data.price;
                });

                bolh.set('TotalCost', boltotal);

                cRec.set('processtotal', boltotal);
                cRec.set('total', cRec.get('subTotal') + cRec.get('assoctotal'));

            }, this);

            bols.on('remove', function(store , records , index , isMove){

            }, this);
        }

        wvm.set('theProcessH', bolh);

        me.win.show('', function(){
            me.mv.mask();
        });
    },

    showRequest: function(rec){
        var me = this,
            view = me.getView(),
            vm = me.getViewModel(),
        //mv = August.app.getMainView(),
            smp = vm.get('theProduct');

        if(smp){
            var style = smp.data.style.trim(),
                color = smp.data.color.trim(),
                bodyref = smp.data.user2.trim();

            me.isEdit = !!rec;

            me.win = view.add({
                xtype: 'window',
                iconCls: "x-fa fa-calculator",
                reference: 'request-window',

                bind: {
                    title: '{title}'
                },

                layout: {
                    type: 'fit'
                },

                renderTo: Ext.getBody(),
                //maximized: true,
                maximizable: true,
                //alignTarget: '',

                width: view.getWidth() * 0.98,
                height: view.getHeight() * 0.98,

                viewModel: {
                    data: {
                        title: 'Request For Quote: '
                    },

                    links: {
                        // If we are passed a record, a copy of it will be created in the newly spawned session.
                        // Otherwise, create a new phantom customer in the child.
                        theRequest: rec || {
                            type: 'style.Reqh',
                            create: {
                                style: style,
                                color: color,
                                bomno: 1,
                                bodyref: bodyref,
                                userId: August.user.data.AccountId,
                                userTime: new Date()
                            }
                        }
                    },

                    formulas: {
                        testValue: {
                            bind: '{theRequest.testing}',
                            get: function(value) {
                                return {
                                    testing: value
                                };
                            },
                            set: function(value) {
                                this.set('theRequest.testing', value.testing);
                            }
                        },

                        inspectValue: {
                            bind: '{theRequest.inspection}',
                            get: function(value) {
                                return {
                                    inspection: value
                                };
                            },
                            set: function(value) {
                                this.set('theRequest.inspection', value.inspection);
                            }
                        }
                    }
                },

                // Creates a child session that will spawn from the current session
                // of this view.
                session: true,

                items: [{
                    xtype: 'style-edit-requestForm',
                    reference: 'req-form'
                }],

                buttons: [{
                    text: 'Save',
                    bind: {
                        //disabled: '{!isCostValid}'
                    },
                    handler: 'onSaveReqClick'
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        me.win.close();
                    },
                    scope: this
                }]
            });

            var wvm = me.win.getViewModel(),
                request = wvm.get('theRequest'),
            //mats = request.reqds(),
                strLabel = '', seq = 0, printCtn = 0, stoneCtn = 0, trimCtn = 0, paperCtn = 0;

            wvm.setStores({
                fabrics: {
                    //model: 'sample.Reqd',
                    source: request.reqds(),
                    groupField: 'rawmattype',
                    filters: [{
                        property: 'rawmattype',
                        value: 'FABRICS'
                    }]
                },
                others: {
                    //model: 'sample.Reqd',
                    source: request.reqds(),
                    groupField: 'rawmattype'
                },
                emails: {
                    source: request.reqes()
                }
            });

            var fabrics = wvm.get('fabrics'),
                others = wvm.get('others'),
                emails = wvm.get('emails'),
                nda = [];

            others.filterBy(function(rec){
                return rec.data.rawmattype != 'FABRICS';
            });

            //fabrics.setGroupField('rawmattype');
            //others.setGroupField('rawmattype');

            if(!me.isEdit){
                smp.bomhs().getAt(0).boms().each(function (m) {

                    if(m.data.rawMatType == 'FABRICS'){
                        switch(m.data.line_seq){
                            case 0:
                                strLabel = 'SELF';
                                break;
                            default:
                                strLabel = 'CONTRAST ' + m.data.line_seq;
                        }

                        nda = fabrics.add({
                            lineseq: m.data.line_seq,
                            style: m.data.rawStyle,
                            color: m.data.rawColor,
                            label: strLabel,
                            description: m.data.descript + (Ext.isEmpty(m.data.fabcontent) ? '' : ' (' + m.data.fabcontent + ')'),
                            rawmattype: m.data.rawMatType,
                            qty1: m.data.qty,
                            width: m.data.width,
                            weight: m.data.weight
                        });

                        request.reqds().add(nda);
                    }
                    else {
                        switch(m.data.rawMatType){
                            case 'PRINTS':
                                seq = printCtn += 1;
                                strLabel = m.data.grp;
                                break;
                            case 'SUBLIMATION PAPER':
                                seq = paperCtn += 1;
                                strLabel = m.data.rawMatType;
                                break;
                            case 'STONE':
                            case 'STONE SHEETS':
                                seq = stoneCtn += 1;
                                strLabel = 'STONE ' + stoneCtn;
                                break;
                            case 'TRIMS':
                                seq = trimCtn += 1;
                                strLabel = 'TRIM ' + trimCtn;
                                break;
                            default:
                                break;
                        }

                        nda = others.add({
                            lineseq: seq - 1,
                            style: m.data.rawStyle,
                            color: m.data.rawColor,
                            label: strLabel,
                            description: m.data.descript,
                            rawmattype: m.data.rawMatType,
                            qty1: m.data.qty,
                            width: m.data.width,
                            weight: m.data.weight
                        });

                        request.reqds().add(nda);
                    }
                });
            }

            fabrics.on('datachanged', function(s){

                s.each(function(rec,idx){
                    rec.set('lineseq', idx);
                });

            });

            others.on('datachanged', function(s){
                var seq = 0, print = 0, paper = 0, stone = 0, trim = 0;

                s.each(function(rec,idx){
                    switch(rec.data.rawmattype){
                        case 'PRINTS':
                            seq = print;
                            print += 1;
                            break;
                        case 'SUBLIMATION PAPER':
                            seq = paper;
                            paper += 1;
                            break;
                        case 'STONE':
                        case 'STONE SHEETS':
                            seq = stone;
                            stone += 1;
                            break;
                        case 'TRIMS':
                            seq = trim;
                            trim += 1;
                            break;
                        default:
                            break;
                    }

                    rec.set('lineseq', seq);
                });
            });
        }
        else {
            Ext.Msg.show({
                title: 'Error!',
                msg: 'Unable to read the record(the Sample)',
                buttons: Ext.Msg.OK,
                icon: Ext.MessageBox.INFO
            });
        }

        me.win.show('', function(){
            me.mv.mask();
        });
    },

    onItemContextMenu: function(h, j, k, g, l){
        /*
        l.stopEvent();

        var i = h.getSelectionModel();

        if(!i.isSelected(g)){
            i.select(g)
        }

        this.view.contextmenu.showAt(l.getXY())
        */
    },

    onMenuRefreshClick: function(c, item){
        
        var me = this,       
            vm = me.getViewModel(),
            session = me.getSession(),     
            changes = session.getChanges();        

        if(changes != null){
            //changes=Ext.JSON.encodeValue(changes, '<br>');
            //Ext.Msg.alert('proxy', '<pre>' + changes + '</pre>');
            //var a = changes['style.ProductPhoto'].C;
            //a.splice(0, a.length);
            //changes['style.ProductPhoto'] = null;
            if(session.data.hasOwnProperty('style.ProductPhoto')){
                session.data['style.ProductPhoto'] = null;
            }
            
            if(session.data.hasOwnProperty('File')){
                session.data['File'] = null;
            }
            
        }
                
        console.log('refresh', c, item, changes, session);
        c.store.load();        
    },

    onMenuRemoveClick: function(c, item){
        
        var me = this,                   
            store = c.getStore(),
            session = me.getSession(),     
            changes = session.getChanges(),
            data = [];

        Ext.each(c.getSelection(), function(rec, idx, self){
                                               
            if(rec.phatom){
                c.fileUpload.removeFileFromQueue(rec.id * -1 - 1);
            }            

            data.push(rec.getData(true));
            
            rec.drop();     
            session.evict(rec);                               

            //console.log('onMenuRemoveClick', rec.getData(true));
        });

        var url = '/WebApp/api/',
            modelName = '';

        if(session.data.hasOwnProperty('style.ProductPhoto')){
            session.data['style.ProductPhoto'] = null;
            modelName = 'ProductPhotos';
        }
        
        if(session.data.hasOwnProperty('File')){
            session.data['File'] = null;
            modelName = 'Files/Product';
        }

        Ext.Ajax.request({
            url: url + modelName,
            method: 'DELETE',            

            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
            },

            jsonData: data,

            params: {
                //store: comboSelected.get('name')
            },

            success: function(response){
                
                Ext.Msg.alert('Status', 'Item has removed successfully.', function(){
                    console.log('success', response);
                    
                    if(changes != null){
                        //changes = null;                        
                        if(session.data.hasOwnProperty('style.ProductPhoto')){
                            session.data['style.ProductPhoto'] = null;
                        }
                        
                        if(session.data.hasOwnProperty('File')){
                            session.data['File'] = null;
                        }
                    }

                    store.rejectChanges();
                    c.getStore().load();
                    console.log('changes', changes) 
                });  
            },
            failure: function(response){
                Ext.Msg.alert('Status ' + response.status, response.statusText, function(){
                    console.log('failure', response);    
                }); 
            }
        });
    },

    onFileDropped: function(view, recs){
        var me = this,
            //form = me.getView(),
            store = view.getStore(),
            vm = me.getViewModel(),
            session = vm.getSession(),
            changes = session.getChanges();
            //sData = me.getViewModel().get('theProduct').data,
            //mv = form.previousSibling('multiview'),
            //grid = mv.refs.grid,
            //sample = grid.getStore().getById(sData.id),
            //total = view.getStore().getCount(),
            //routeId = form.ownerCt.routeId;
        
        //var idx = 1,
        //    sub = total - recs.length;        

        var theProduct = vm.get('theProduct'),
            field = me.getView().lookupReference('attachment').down('viewupload').fileUpload;

        field.name = field.name + '-' + theProduct.id;
        console.log('onFileDropped', store, theProduct, recs, field);

        var data = [],
            total = store.getCount(),            
            count = store.getNewRecords().length;
                
        Ext.each(recs, function(rec, idx, self) {
            rec.set('order', (total - count) + idx + 1);
            var postfix = ((total - count) + idx + 1).toString().padStart(3, '0')            

            rec.set('tag', theProduct.get('style') + '_' + theProduct.get('color').replace('/', '-') + "_" + postfix);
            
            data.push(rec.data);                               
                     
            console.log(data);
        });                

        if(field && field.getFilesQueue().length > 0){

            field.send({
                url: '/WebApp/api/Files/Product/Upload',
                success: function(response, opts){
                    
                    if(changes != null){
                        //changes = null;                        
                        session.data['File'] = null;
                    }

                    store.rejectChanges();  
                    store.load();
                    //console.log('sucess', response, store.getNewRecords(), me.getSession().getChanges());

                },
                failure: function(response, opts) {
                    console.log('failure', response);
                    Ext.Msg.alert('Failure', response);
                }
            },{
                attachment: JSON.stringify(data)
            });
        }
        
    },

    onPhotoDropped: function(view, recs){
        var me = this,
            //form = me.getView(),
            store = view.getStore(),            
            vm = me.getViewModel(),
            session = vm.getSession(),
            changes = session.getChanges();
            //sData = me.getViewModel().get('theProduct').data,
            //mv = form.previousSibling('multiview'),
            //grid = mv.refs.grid,
            //sample = grid.getStore().getById(sData.id),
            //total = view.getStore().getCount(),
            //routeId = form.ownerCt.routeId;
        
        //var idx = 1,
        //    sub = total - recs.length;        

        var theProduct = vm.get('theProduct'),
            field = me.getView().lookupReference('photos').down('viewupload').fileUpload

        field.name = field.name + '-' + theProduct.id;        

        var data = [],
            total = store.getCount(),            
            count = store.getNewRecords().length,
            storeData = store.getData(),
            frontExist = false,
            backExist = false;                        

        var m = storeData.findBy(function(item,key){            
            return item.get('order') == 1;
        });

        var n = storeData.findBy(function(item,key){            
            return item.get('order') == 2;
        });

        var oMax = storeData.max('order');

        if(m != null){
            frontExist = true;
        }

        if(n != null){
            backExist = true;
        }

        console.log('onPhotoDropped', m, n, oMax, store, recs, storeData);                

        Ext.each(recs, function(rec, idx, self) {
                        
            var postfix = ((total - count) + idx + 1).toString().padStart(3, '0');

            console.log('index', rec, idx, total);
            
            if(m == null && n == null){
                postfix = "front";      
                rec.set('order', 1);          
            }

            if(m == null && n != null){
                postfix = "front";
                rec.set('order', 1);          
            }                    

            if(m != null && n == null){
                postfix = "back";
                rec.set('order', 2);          
            }            

            rec.set('order', oMax + idx + 1);
            rec.set('tag', theProduct.get('style') + '_' + theProduct.get('color').replace('/', '-') + "_" + postfix);            
            data.push(rec.data);                               
                     
            //console.log('onPhoto', store.getNewRecords(), vm.getSession());            
        });                        

        if(field && field.getFilesQueue().length > 0){
            
            field.send({
                url: '/WebApp/api/ProductPhotos/Upload',

                success: function(response, opts){                    

                    if(changes != null){
                        //changes = null;                        
                        session.data['style.ProductPhoto'] = null;
                    }

                    store.rejectChanges();    
                                    
                    store.reload();                    
                    //console.log('sucess', response, store.getNewRecords(), me.getSession().getChanges());

                },
                failure: function(response, opts) {                    
                    Ext.Msg.alert('Failure', response);
                }
            },{
                Photos: JSON.stringify(data)
            });                     
        }
    },

    onAttachItemDblClick: function(view, rec, item, index){
        var me = this,
            form = me.getView(),
            viewer = form.up('product'),
            reference = 'product-'+ rec.get('fileId').toString().replace('.', '-'),
            aw = viewer.lookupReference(reference),
            //title = rec.data.Title,
            //mv = August.app.getMainView(),
            xf = Ext.util.Format;            

        //prefix = 'nDisplay-';        
        console.log('Attach DBLCLICK', rec, aw);
        var srcPath = xf.format('/WebApp/services/PDFHandler.ashx?path={0}&name={1}', 'August', rec.data.name);

        if(rec.data.hasOwnProperty('path') && !Ext.isEmpty(rec.data.path)){
            //srcPath = rec.data.path;
        }

        if (!aw) {
            aw = form.add({
                xtype: 'window',
                reference: reference,
                iconCls: 'x-fa fa-print',
                title: rec.data.name,

                width: form.getWidth() * 0.7,
                height: form.getHeight() * 0.7,

                renderTo: Ext.getBody(),

                modal: true,
                maximized: true,
                maximizable: true,
                //draggable: false,
                //resizable: false,

                layout: 'fit',

                /*
                tbar: {
                    padding: '5 0 5 0',
                    items: {
                        xtype: 'tbtext',
                        html: '<i class="x-fa fa-times-circle-o fa-2x fa-fw red-txt"></i>',
                        style: {
                            cursor: 'pointer'
                        },
                        listeners: {
                            render: function (c) {
                                //var panel = img.ownerCt.body;
                                c.getEl().on({
                                    click: function (event, element) {
                                        aw.close();
                                    }
                                });
                            }
                        }
                    }
                },
                */
                //active: rec,
                items: [{
                    xtype: 'component',
                    itemId: 'contentIframe',
                    autoEl: {
                        tag: 'iframe',
                        style: 'height: 100%; width: 100%; border: none',
                        //src: 'QuickGuideforIllustratorCS6-Basics.pdf'
                        src: srcPath
                    }
                }],

                buttons: [{
                    text: 'Print',
                    handler: function(btn){
                        var iframe = aw.getComponent('contentIframe');

                        if(iframe){
                            var cw = iframe.getEl().dom.contentWindow;
                            //console.log(iframe, cw.document);
                            cw.print();
                        }
                    }
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        aw.close();
                    },
                    scope: this
                }]
            });
        }

        aw.show('', function(){
            me.mv.mask();
        });
    },

    onPhotoItemDblClick: function(view, rec, item, index){
        
        var me = this,
            form = me.getView(),
            viewer = form.up('product'),
            title = rec.get('name').substr(0, rec.get('name').length - 4).replace(/_/gi, ' ').toUpperCase(),
            //reference = viewer.routeId + '-photo-' + photoName.replace(/_/gi, '-'),
            reference = 'product-'+ rec.get('pid').toString().replace('.', '-'),
            pw = viewer.lookupReference(reference),
            //mv = August.app.getMainView(),                        
            xf = Ext.util.Format;        
        
        var srcPath = 'https://endlessrose.net' + rec.get('path') + rec.get('name');        

        if(rec.data.hasOwnProperty('path') && rec.data.path.includes("blob:")){
            srcPath = rec.data.path;            
        }

        if (!pw) {
            pw = form.add({
                xtype: 'window',
                reference: reference,
                title: title,

                width: form.getWidth() * 0.7,
                height: form.getHeight() * 0.7,

                renderTo: Ext.getBody(),

                //header: false,
                //headerPosition: 'right',

                modal: true,
                //draggable: false,
                //resizable: false,
                //constrain: true,
                //closable: true,
                maximized: true,
                maximizable: true,
                //scrollable: true,

                lbar: {
                    padding: '5 0 0 0',
                    items: {
                        xtype: 'tbtext',
                        html: '<i class="x-far fa-times-circle-o fa-2x fa-fw red-txt"></i>',
                        style: {
                            cursor: 'pointer'
                        },
                        listeners: {
                            render: function (c) {
                                //var panel = img.ownerCt.body;
                                c.getEl().on({
                                    click: function (event, element) {
                                        pw.close();
                                    }
                                });
                            }
                        }
                    }
                },

                layout: 'fit',
                //active: rec,
                items: [{
                    xtype: 'container',
                    itemId: 'innerPnl',
                    scrollable: true,
                    items:[{
                        xtype: 'image',
                        src: srcPath,
                        maxHeight: 1040,
                        margin: '10 0 5 10',
                        style: {
                            position: 'absolute',
                            cursor: 'zoom-in',
                            //width: '99%',
                            height: '98%',
                            top: 0,
                            left: 0
                        },
                        listeners: {
                            render: function (img) {
                                //var panel = img.ownerCt.body;
                                img.getEl().on({
                                    click: function (event, element) {

                                        var position = img.getEl().dom.style.position,
                                            cursor = img.getEl().dom.style.cursor;

                                        position = position == 'absolute' ? 'relative' : 'absolute';
                                        cursor = cursor == 'zoom-in' ? 'zoom-out' : 'zoom-in';
                                        img.setStyle({
                                            'position': position,
                                            'cursor': cursor
                                        });

                                    }
                                });
                            }
                        }
                    }]
                }],

                buttons: [{
                    text: 'Print',
                    handler: function(btn){
                        var iframe = pw.getComponent('contentIframe');

                        if(iframe){
                            var cw = iframe.getEl().dom.contentWindow;
                            //console.log(iframe, cw.document);
                            cw.print();
                        }
                        else{
                            //var innerPnl = this.view.items.items[0].ownerCt;
                            //var img = innerPnl.down('image');

                            var innerPnl = pw.getComponent('innerPnl');
                            //console.log('innerPnl', innerPnl);
                            innerPnl.print();
                            
                        }
                    }
                }, {
                    text: 'Cancel',
                    handler: function(btn){
                        pw.close();
                    },
                    scope: this
                }]
            });
        }

        pw.show('', function(){
            me.mv.mask();
        });
    },

    onPhotoSelect: function(view, rec, idx){
        //console.log('onPhotoSelect', rec);
    },    

    onPhotoSelectionChange: function(sm, rec){
        var me = this,
            view = me.getView(),
            refs = me.getReferences(),
            photos = refs.photos,
            detail = photos.getComponent('photo-detail'),
            dvm = detail.getViewModel();
        
        //view.setSelection(rec);
        if(rec.length > 0){

            //console.log(rec[0])
            if(detail.items.length == 0){
                detail.add([{
                    xtype: 'box',
                    itemId: 'detail-header',
                    cls: 'sample-detail-header',
                    style: {
                        borderBottom: '1px solid #cfcfcf'
                    },
                    padding: '10 0 10 0',
                    tpl: new Ext.XTemplate(
                        '<div style="font-weight: bold; font-size: 1.2em; color: #888;">PHOTO DETAILS</div>',
                        //'<a class="link" href="{linkUrl}">',                        
                        '<div><i class="far fa-file-image fa-4x" style="padding-top:14px;padding-bottom: 5px;"></i></div>',
                            //'<img src="{[this.getSrcPath(values, xcount)]}" width="96" title="{name}" style="border:1px solid #888;" />',
                        '<div style="font-weight: bold;">{name}</div>',                        
                        '<div>{created:this.getFileDate}</div>',
                        {
                            getSrcPath: function(a,b){
                                var str;
                                if(a.path){
                                    str = a.path;
                                }
                                else {
                                    if(!Ext.isEmpty(a.name) && !Ext.isEmpty(a.type)) {
                                        
                                        str = 'https://endlessrose.net:9443/StyleImages/' + a.name + '?w=174&h=232';
                                        if(a.ID < 0){
                                            str = 'https://endlessrose.net:9443/StyleImages/' + a.name + '?w=174&h=232';
                                        }
                                    }
                                    else {
                                        str = 'https://endlessrose.net:9443/StyleImages/' + a.name + '?w=174&h=232';
                                    }
                                }

                                return str;
                                //return a.replace(/(\.[^.]+)$/, "_medium$1");
                            },
                            getFileDate: function(v){
                                if(Ext.isEmpty(v)){
                                    v = new Date();
                                }

                                return Ext.util.Format.date(v, 'F j, Y');
                            }
                        }
                    )
                },{
                    xtype: 'fieldcontainer',
                    layout: 'anchor',

                    style: {
                        borderTop: '1px solid #ffffff'                        
                    },
                    padding: '4px 0 0 0',

                    defaultType: 'textfield',

                    defaults: {
                        anchor: '100%'
                    },

                    fieldDefaults: {
                        msgTarget: 'under',
                        labelAlign: 'top'
                    },

                    items: me.buildPhotoFields()
                }]);
            }

            //detail.updateLayout();
            var selected = rec[rec.length-1];
            if(detail.down('#detail-header')){
                detail.down('#detail-header').update(selected.data);

                dvm.set('thePhoto', selected);

                if(view.ownerCt.routeId == 'sample'){
                    dvm.set('fieldLabel', 'For RFQ');
                    dvm.set('readOnly', false);
                }

                if(view.ownerCt.routeId == 'product'){
                    dvm.set('fieldLabel', 'For AUGUST');
                    dvm.set('readOnly', true);
                    //dvm.set('readOnly', !selected.phantom);
                }
            }

        }
        else {
            detail.removeAll();
        }

    },

    onPhotoRefresh: function(view){
        var imgs = view.getEl().query('img.stylePhotos', false)
        console.log('onPhotoRender', imgs);
        Ext.each(imgs, function(img){
            console.log(img.dom.complete, img.dom.naturalHeight, img.dom.src);
        });
    },

    onItemSelectionChange: function(sm, rec){
        var me = this,
            refs = this.getReferences(),
            attach = refs.attachment,
            detail = attach.getComponent('attach-detail');

        //view.setSelection(rec);
        if(rec.length){

            if(detail.items.length == 0){
                detail.add([{
                    xtype: 'box',
                    itemId: 'detail-header',
                    style: {
                        borderBottom: '1px solid #cfcfcf'
                    },
                    padding: '10 0 10 0',
                    tpl: new Ext.XTemplate(
                        '<div style="font-weight: bold; font-size: 1.2em; color: #888;">ATTACHMENT DETAILS</div>',
                        '<div><i class="far fa-file{type:this.getFileType} fa-4x" style="padding-top:14px;padding-bottom: 5px;"></i></div>',
                        '<div style="font-weight: bold;">{name:this.getFileName}</div>',
                        '<div>{created:this.getFileDate}</div>',
                        {
                            getFileName: function(v){
                                var a = v.split('_'),
                                name = a[0] + ' ' +a[1] + ' ' + a[2];                                     

                                return Ext.String.ellipsis(name, 30);
                            }
                        },
                        {
                            getFileType: function(v){
                                var a = ['txt', 'pdf', 'excel', 'word', 'csv'];

                                for(var i = 0; i < a.length; i++){
                                    if(v.indexOf(a[i]) != -1) {
                                        return '-' + a[i];
                                    }
                                }

                                return '';
                            },
                            getFileDate: function(v){
                                if(Ext.isEmpty(v)){
                                    v = new Date();
                                }

                                return Ext.util.Format.date(v, 'F j, Y');
                            }
                        }
                    )
                },{
                    xtype: 'fieldcontainer',
                    layout: 'anchor',

                    style: {
                        borderTop: '1px solid #ffffff'                        
                    },

                    padding: '4px 0 0 0',
                    defaultType: 'textfield',

                    defaults: {
                        anchor: '100%'
                    },

                    fieldDefaults: {
                        msgTarget: 'under',
                        labelAlign: 'top'
                    },

                    items: this.buildAttchFields()
                }]);
            }

            //detail.updateLayout();
            if(detail.down('#detail-header')){
                detail.down('#detail-header').update(rec[rec.length-1].data);
                detail.getViewModel().set('theFile', rec[rec.length-1]);
            }

        }
        else {
            detail.removeAll();
        }

    },

    /**
     *
     * @param dv {Ext.view.View}
     * @param rec {Ext.data.Model}
     * @param item {HTMLElement}
     * @param idx {Number}
     * @param e {Ext.event.Event}
     */
    onItemDblClick: function(dv, rec, item, idx, e){
        this.showRequest(rec);
    },    

    buildAttchFields: function(){
        return [{
            xtype: 'checkboxfield',
            name: 'active',
            fieldLabel: 'For RFQ',
            labelWidth: 60,
            labelAlign: 'left',

            bind: {
                value: '{theFile.active}'
            }
        },{
            fieldLabel: 'File Name',
            name: 'name',            
            bind: '{theFile.name}'
        },{
            xtype: 'tagfield',
            fieldLabel: 'Tag',
            name: 'tag',
            //store: 'memBodies',
            //remoteStore: 'Bodies',
            bind: {
                value: '{theFile.tag}',
                store: '{tags}'
            },
            hideTrigger: true,
            valueField: 'field',
            displayField: 'label',
            //forceSelection: false,
            //selectOnFocus: true,
            //pageSize: 50,
            queryMode: 'local',
            autoLoadOnValue: true,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            fieldLabel: 'Label',
            name: 'label',
            hidden: true,
            bind: '{theFile.label}'
        },{
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            //height: 120,
            hidden: true,
            grow: true,
            growMax: 300,
            bind: '{theFile.description}'
        }];
    },

    buildPhotoFields: function(){

        return [{
            xtype: 'textfield',
            fieldLabel: 'File Name',
            name: 'name',
            hidden: true,
            bind: {
                value: '{thePhoto.name}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'File Type',
            name: 'type',
            hidden: true,
            bind: {
                value: '{thePhoto.type}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'File Size',
            name: 'size',
            hidden: true,
            bind: {
                value: '{thePhoto.size}'
            }
        },{
            xtype: 'checkboxfield',
            name: 'active',
            fieldLabel: 'For RFQ',
            labelWidth: 60,
            labelAlign: 'left',

            bind: {
                value: '{thePhoto.active}'
            }
        },{
            xtype: 'tagfield',
            fieldLabel: 'Tag',
            name: 'tag',
            //store: 'memBodies',
            //remoteStore: 'Bodies',
            bind: {
                value: '{thePhoto.tag}',
                store: '{tags}'
            },
            hideTrigger: true,
            valueField: 'field',
            displayField: 'label',
            //forceSelection: false,
            //selectOnFocus: true,
            //pageSize: 50,
            queryMode: 'local',
            autoLoadOnValue: true,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            fieldLabel: 'Label',
            name: 'label',
            hidden: true,
            bind: '{thePhoto.label}'
        },{
            xtype: 'textarea',
            fieldLabel: 'Description',
            name: 'description',
            //height: 120,
            hidden: true,
            grow: true,
            growMax: 300,
            bind: '{thePhoto.description}'
        }];
    },

    onSave: function(action){
        var me = this,
            view = me.getView(),
            viewer = view.up('viewer'),
            vm = me.getViewModel(),
            session = vm.getSession(),
            changes = session.getChanges(),
            id;

        if(view.isValid()){

            var batch = session.getSaveBatch();
            //changes = session.getChanges();
            console.log(changes, batch);

            if(batch !== undefined){
                var processMask = new Ext.LoadMask({
                    msg: 'Saving... Please wait',
                    target: viewer
                });

                batch.on({
                    operationcomplete: function(batch, op){

                        var objResp = op.getResponse();

                        if(!Ext.isEmpty(objResp)){
                            //var response = JSON.parse(objResp);                            
                            console.log('Product - Batch Operation Complete', objResp);
                            /*
                            if(!Ext.isEmpty(response) && response.data.length > 0){

                                if(response.msg == 'Photos'){
                                    var field1 = view.lookupReference('photos').down('viewupload').fileUpload;

                                    if(field1 && field1.getFilesQueue().length > 0){

                                        field1.send({
                                            url: '/WebApp/api/Files/Photos/upload',
                                            success: function(response){
                                                //console.log(response);
                                                Ext.Msg.alert('Success', response);
                                            },
                                            failure: function(response) {
                                                Ext.Msg.alert('Failure', response);
                                            }
                                        }, {
                                            Media: JSON.stringify(response.data)
                                        });
                                    }
                                }

                                if(response.msg == 'Sample'){
                                    var field2 = view.lookupReference('attachment').down('viewupload').fileUpload;

                                    if(field2 && field2.getFilesQueue().length > 0){

                                        field2.send({
                                            url: '/WebApp/api/Files/Sample/upload',
                                            success: function(response){
                                                //console.log(response);
                                                Ext.Msg.alert('Success', response);
                                            },
                                            failure: function(response) {
                                                Ext.Msg.alert('Failure', response);
                                            }
                                        }, {
                                            File: JSON.stringify(response.data)
                                        });
                                    }
                                    //cost.setValue('')
                                }
                            }
                            */
                        }
                    },
                    complete: function(batch, op){

                        //var response = JSON.parse(op.getResponse());                        
                        var response = op.getResponse();
                        console.log('Product - Batch Complete',response)

                        processMask.hide('', function() {
                            Ext.Msg.alert('Status', 'Changes saved successfully.');
                        });
                    },
                    exception: function(batch, op){
                        processMask.hide('', function(){
                            //Ext.Msg.alert('Error', 'Error occurred');
                            var objResp = op.error.response;
                            //console.log(objResp)
                            if(!Ext.isEmpty(objResp)){
                                //var response = JSON.parse(objResp);
                                Ext.Msg.alert(objResp.statusText, objResp);
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
        //viewer.setActiveTab(0);
    },

    sendEmails: function(){
        Ext.Ajax.request({
            //url: '/WebApp/api/Sessions',
            url: '/WebApp/api/SendEmail',
            method: 'POST',
            jsonData: '',
            success: function(response, options) {
                // decode response
                var result = Ext.decode(response.responseText);
                //console.log('checkLogin', result.data);
                // check if success flag is true
                if(result.success) {
                    console.log('success', result);
                }
                // couldn't login...show error
                else {
                    //console.log('login failed');
                }
            },
            failure: function(response, options) {
                Ext.Msg.alert(response.statusText, response.status + ' - ' + response.responseText );
            },
            callback: function(response, opotions) {

            }
        });
    }

});
