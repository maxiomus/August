
Ext.define('August.view.inventory.transfer.Form',{
    extend: 'Ext.form.Panel',

    requires: [
        'August.view.inventory.transfer.FormController',
        'August.view.inventory.transfer.FormModel',
        'Ext.ux.grid.plugin.AllRowExpander'
    ],

    alias: 'widget.transfer-form',

    controller: 'transfer-form',
    viewModel: {
        type: 'transfer-form'
    },

    bind: {
        title: '{title}'
    },

    session: true,
    trackResetOnLoad: true,
    //scrollable: 'y',
    style: {
        borderTop: '1px solid #cfcfcf'
    },

    layout: {
        type: 'vbox',
        align: 'stretch',
        pack: 'start'
    },

    listeners: {

    },

    initComponent: function() {
        var me = this;

        var tpl = new Ext.ux.CTemplate(
            '<tpl for=".">',
            '<div class="item">{button}</div>',
            '</tpl>'
        );

        /*
         var actNew = Ext.create('Ext.Action', {
         text: "New",
         tooltip: "Add New Item",
         //reference: 'new',
         iconCls: "x-fa fa-plus-circle",
         handler: function(item, e){
         this.fireEvent("actnew", this, item);
         },
         scope: this
         }),
         actEdit = Ext.create('Ext.Action', {
         text: 'Edit',
         tooltip: 'Edit Selected Item',
         //reference: 'edit',
         iconCls: 'x-fa fa-edit',
         handler: function(item, e){
         this.fireEvent("actedit", this, item);
         },
         scope: this
         }),
         actDelete = Ext.create('Ext.Action', {
         text: "Delete",
         tooltip: "Delete Selected Item",
         //reference: 'delete',
         iconCls: "x-fa fa-minus-circle",
         //disabled: true,
         handler: function(item, e){
         this.fireEvent("actdelete", this, item);
         },
         scope: this
         }),
         actCopy = Ext.create('Ext.Action', {
         text: 'Copy',
         tooltip: 'Copy Selected Item',
         //reference: 'edit',
         iconCls: 'x-fa fa-copy',
         handler: function(item, e){
         this.fireEvent("actcopy", this, item);
         },
         scope: this
         });
         */

        var btnNew = {
            text: 'New',
            iconCls: 'x-fa fa-plus-circle',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Add Item',
            //ui: 'default',
            bind: {
                disabled: '{!setWHs}'
            },
            handler: 'onAddItemClick',
            scope: this.controller
        },
        btnCopy = {
            text: 'Copy',
            iconCls: 'x-fa fa-copy',
            tooltip: 'Copy Item',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onCopyItemClick',
            scope: this.controller
        },
        btnEdit = {
            text: 'Edit',
            iconCls: 'x-fa fa-edit',
            tooltip: 'Edit Item',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onEditItemClick',
            scope: this.controller
        },
        btnDelete = {
            text: 'Delete',
            iconCls: 'x-fa fa-times',
            tooltip: 'Delete Item',
            bind: {
                disabled: '{!selection}'
            },
            handler: 'onDeleteItemClick',
            scope: this.controller
        },
        btnOpen = {
            text: 'List',
            iconCls: 'x-fa fa-list-alt',
            tooltip: 'List Styles',
            bind: {
                disabled: '{!setWHs}'
            },    
            handler: 'onOpenStyleClick',
            scope: this.controller
        };
        var btnsConfig = [btnOpen,btnNew, btnCopy, btnEdit, btnDelete];

        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            //reference: 'topbar',
            width: "100%",
            enableOverflow: true,
            defaults: {
                ui: 'default'
            },
            items: [{
                iconCls: 'x-fa fa-save',
                //reference: 'save',
                text: 'Save',
                nextStep: 'save',
                tooltip: 'Save the Data',                
                handler: 'onSave'
            },{
                iconCls: 'x-fa fa-times-circle',
                text: 'Close',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Close View',
                handler: 'onClose'
            },'-', {
                xtype: 'buttongroup',
                reference: 'groupCrud',                
                //margin: -8,
                hidden: false,
                items: btnsConfig
            }]
        }],

        Ext.applyIf(me, {
            items: [{
                xtype: "container",
                //title: "P.I",
                reference: "transferheader",
                //iconCls: "x-fa fa-calculator",
                layout: {
                    type: 'responsivecolumn',
                    states: {
                        /*
                         small: 800,
                         medium: 1200,
                         large: 0
                         */
                    }
                },
                //margin: "0 0 5 0",
                //bodyPadding: 8,
                defaultType: 'container',
                defaults: {
                    //margin: "5 0 0 0"
                },
                fieldDefaults: {
                    labelAlign: "left",
                    margin: 0
                },
                items: [{
                    responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        constrain: true,
                        margin: '0 10 3 0',
                        labelWidth: 105
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textfield',
                        name: 'transferno',
                        fieldLabel: 'Transfer #',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theTransfer.transferno}'
                        },
                        allowBlank: false
                    },{
                        xtype: 'textfield',
                        name: 'status',
                        fieldLabel: 'Status',
                        readOnly: true,
                        selectOnFocus: false,
                        //flex: 1,
                        bind: {
                            value: '{theTransfer.status}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'transferdate',
                        format: 'Y-m-d',
                        fieldLabel: 'Transfer Date',
                        //editable: false,
                        bind: {
                            value: '{theTransfer.transferdate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'datefield',
                        name: 'confirmdate',
                        format: 'Y-m-d',
                        fieldLabel: 'Confirm Date',
                        //editable: false,
                        bind: {
                            value: '{theTransfer.confirmdate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'combo',
                        name: 'pireason',
                        fieldLabel: 'Transfer Reason',
                        displayField: 'label',
                        valueField: 'value',
                        selectOnFocus: true,
                        editable: true,
                        forceSelection: true,
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',                        
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        //queryParam: 'filter',
                        //triggerAction: 'all',
                        bind: {
                            store: '{pireasons}',
                            value: '{theTransfer.pireason}'
                        }
                    },{
                        xtype: 'datefield',
                        name: 'receivedate',
                        format: 'Y-m-d',
                        fieldLabel: 'Receive Date',
                        //editable: false,
                        bind: {
                            value: '{theTransfer.receivedate}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{                        
                        xtype: 'combo',
                        name: 'fr_warehouse',
                        fieldLabel: 'From WH',
                        fieldCls: 'required',
                        displayField: 'label',
                        valueField: 'value',
                        selectOnFocus: true,
                        editable: true,
                        forceSelection: true,
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',                        
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        bind: {
                            store: '{fromWHs}',
                            value: '{theTransfer.fr_warehouse}'
                        }
                    },{
                        xtype: 'combo',
                        name: 'to_warehouse',
                        fieldLabel: 'To WH',
                        fieldCls: 'required',
                        displayField: 'label',
                        valueField: 'value',
                        selectOnFocus: true,
                        editable: true,
                        forceSelection: true,
                        minChars: 1,
                        queryMode: 'local',
                        //queryParam: 'filter',
                        //triggerAction: 'all',                               
                        plugins: [{
                            ptype: "cleartrigger"
                        }],
                        bind: {
                            store: '{toWHs}',
                            value: '{theTransfer.to_warehouse}'
                        }
                    }]
                }, {
                    responsiveCls: 'small-100',
                    //width: '30%',
                    layout: {
                        type: 'table',
                        columns: 2,
                        tableAttrs: {
                            style: {}
                        }
                    },
                    defaultType: 'textfield',
                    defaults: {
                        constrain: true,
                        margin: '0 10 3 0',
                        labelWidth: 105
                        //minHeight: 720,
                        //padding: '10 10 0 10'
                    },
                    items: [{
                        xtype: 'textarea',
                        name: 'memo',
                        emptyText: 'Memo:',
                        colspan: 2,
                        width: 550,
                        bind: {
                            value: '{theTransfer.memo}'
                        }
                        //fieldLabel: 'Memo'
                    },{
                        xtype: 'textfield',
                        name: 'createUser',
                        fieldLabel: 'Create User',
                        readOnly: true,
                        selectOnFocus: false,
                        labelWidth: 85,
                        //editable: false,
                        bind: {
                            value: '{theTransfer.createUser}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'confirmuser',
                        fieldLabel: 'Confirm User',
                        readOnly: true,
                        selectOnFocus: false,                        
                        //editable: false,
                        bind: {
                            value: '{theTransfer.confirmuser}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'datefield',
                        name: 'createTime',
                        fieldLabel: 'Create Time',
                        readOnly: true,
                        selectOnFocus: false,
                        labelWidth: 85,
                        //editable: false,
                        format: 'Y-m-d h:i a',
                        bind: {
                            value: '{theTransfer.createTime}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    },{
                        xtype: 'textfield',
                        name: 'unconfirmuser',
                        fieldLabel: 'Un-Confirm User',
                        readOnly: true,
                        selectOnFocus: false,
                        //editable: false,
                        bind: {
                            value: '{theTransfer.unconfirmuser}'
                        }
                        //renderer: Ext.util.Format.dateRenderer('F j, Y, h:i:s a')
                    }]
                }]
            },
            {
                xtype: "grid",                
                reference: "transfer-grid",
                            
                tools: [
                    { 
                        type: 'refresh',
                        tooltip: 'Refresh data'
                    }
                ],

                header: {
                    title: 'Detail',
                    iconCls: 'x-fa fa-th',  
                    titlePosition: 2,
                    titleAlign: 'left',
                    items: [{
                        xtype: 'button',
                        //text: 'Expand all',
                        iconCls: 'x-fa fa-expand',
                        pressed: true,
                        enableToggle: true,
                        toggleHandler: function(button, pressed) {
                            var grid = button.up('grid');
                            var override = grid.getPlugin('rowExpander');
                    
                            //console.log('toggle', this, override);
                            if (!pressed) {
                                    //button.setText('Collapse all');                             
                                    override.expandAll();                            
                            } else {
                                //button.setText('Expand all');     
                                override.collapseAll();
                            }
                        }
                    },{
                        xtype: 'tbspacer',
                        width: 10
                    }]
                },

                region: 'center',                             
                //collapseFirst: true,
                //collapseMode: 'mini',                              
                scrollable: true,                         
                flex: 2,                
                style: {
                    borderTop: '1px solid #cfcfcf',
                    borderBottom: '1px solid #cfcfcf'
                },

                bind: {
                    selection: '{selection}',
                    store: '{theTransfer.transferdetails}'
                },

                listeners: {                                                                           
                    selectionchange: {
                        fn: 'onSelectionChanged',
                        scope: this.controller
                    },
                    edit: {
                        //fn: 'onRowEditing',
                        //scope: this.controller
                    }
                },

                columns: me.buildGridColumns(),

                selModel: {
                    //type: 'checkboxmodel',                    
                    //mode: 'MULTI',
                    pruneRemoved: false
                },

                viewConfig: {
                    loadMask: true,
                    stripeRows: true,
                    trackOver: true,
                    preserveScrollOnRefresh: true,
                    preserveScrollOnReload: true,
                    deferInitialRefresh: true,
                    emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                    getRowClass: function(a, g, f, h){
                        return "custom-row-style";
                    },
                    listeners: {
                        refresh: function(view, e){
                            var expander = view.ownerCt.getPlugin('rowExpander');
                            expander.expandAll();
                        }
                        /*
                        render: function(view){
                            //var view = grid.getView();
                            view.tip = Ext.create('Ext.tip.ToolTip', {
                                // The overall target element.
                                target: view.el,
                                // Each grid row causes its own separate show and hide.
                                //delegate: view.itemSelector,
                                delegate: view.cellSelector,
                                // Moving within the row should not hide the tip.
                                trackMouse: true,
                                // Render immediately so that tip.body can be referenced prior to the first show.
                                renderTo: Ext.getBody(),
                                listeners: {
                                    // Change content dynamically depending on which element triggered the show.
                                    beforeshow: function updateTipBody(tip) {
                                        var trigger = tip.triggerElement,
                                            parent = tip.triggerElement.parentElement,
                                            columnTitle = view.getHeaderByCell(trigger).text,
                                            columnDataIndex = view.getHeaderByCell(trigger).dataIndex,
                                            columnText = view.getRecord(parent).get(columnDataIndex);

                                        if(!Ext.isEmpty(columnText)){
                                            var xf = Ext.util.Format;

                                            tip.update(columnText);
                                        }
                                        else {
                                            return false;
                                        }

                                    }
                                }
                            });
                        }
                        */
                    }
                },

                features: [{
                    ftype: 'summary'
                }],

                plugins: [{
                    ptype: 'rowediting',
                    pluginId: 'transferGridRowEdit',
                    clicksToMoveEditor: 1,                    
                    //errorSummary: false,
                    autoCancel: false,
                    listeners: {
                        edit: {
                            fn: 'onRowEdit',
                            scope: this.controller
                        }
                    }
                },{
                    ptype: 'allrowexpander',
                    //bodyBefore: true,
                    expandOnDblClick: false,
                    pluginId: 'rowExpander',
                    rowBodyTpl: new Ext.XTemplate(
                        '<div class="item-boxer" >',
                            '<div class="box-row" style="height:20px">',
                                '<div class="box nb center" style="width:40px;"></div>',
                                '<div class="box nb center" style="width:58px;"></div>',
                                '<div class="box ab center" style="width:318px;">{descript}</div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size1}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size2}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size3}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size4}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size5}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size6}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size7}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size8}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size9}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size10}</div>',
                                    '<div class="box rb" style="width:50px;padding-left:10px;">{size11}</div>',
                                    '<div class="box nb" style="width:48px;padding-left:10px;">{size12}</div>',
                                    //'<div class="box nb center" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab center" style="width:82px;">Ext. Price</div>',
                                '<div class="box ab" style="width:70px;padding-left:10px;">{extPrice:usMoney}</div>',                                
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                        '<div class="box rb center" style="width:90px;"><b>Bin Location</b></div>',
                                        '<div class="box rb center" style="width:120px;">{binlocation}</div>',
                                        '<div class="box rb center" style="width:120px;"><b>Status</b></div>', 
                                        '<div class="box nb center" style="width:160px;">{status}</div>',
                                    '</div>',
                                '</div>',                                
                            '</div>',
                            '<div class="box-row" style="height:20px">',
                                '<div class="box nb" style="width:40px;"></div>',
                                '<div class="box nb center" style="width:58px;"></div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        //'<div class="box nb" style="width:160px;"></div>',
                                        '<div class="box nb right" style="width:318px;">O.H of From-WH</div>',
                                    '</div>',
                                '</div>',                                                                
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh1}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh2}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh3}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh4}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh5}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh6}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh7}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh8}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh9}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh10}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{fwh_oh11}</div>',
                                        '<div class="box nb" style="width:48px;padding-left:10px;">{fwh_oh12}</div>',
                                        //'<div class="box nb" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab" style="width:82px;padding-left:10px;">{fwh_ohs}</div>',                                
                                '<div class="box ab center" style="width:70px;"></div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                    '<div class="box rb center" style="width:90px;"><b>From WH</b></div>',
                                    '<div class="box rb center" style="width:120px;">{fr_warehouse}</div>',
                                    '<div class="box rb center" style="width:120px;"><b>Update User</b></div>',                                        
                                    '<div class="box nb center" style="width:160px;">{updateUser}</div>',                                        
                                    '</div>',
                                '</div>',                                
                            '</div>',  
                            '<div class="box-row" style="height:20px">',
                                '<div class="box nb" style="width:40px;"></div>',
                                '<div class="box nb center" style="width:58px;"></div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        //'<div class="box nb" style="width:160px;"></div>',
                                        '<div class="box nb right" style="width:318px;">O.H of To-WH</div>',
                                    '</div>',
                                '</div>',                                                                
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh1}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh2}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh3}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh4}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh5}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh6}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh7}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh8}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh9}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh10}</div>',
                                        '<div class="box rb" style="width:50px;padding-left:10px;">{twh_oh11}</div>',
                                        '<div class="box nb" style="width:48px;padding-left:10px;">{twh_oh12}</div>',
                                        //'<div class="box nb" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab" style="width:82px;padding-left:10px;">{twh_ohs}</div>',                                
                                '<div class="box ab center" style="width:70px;"></div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer" style="height:20px">',
                                    '<div class="box rb center" style="width:90px;"><b>To WH</b></div>',
                                    '<div class="box rb center" style="width:120px;">{to_warehouse}</div>',
                                    '<div class="box rb center" style="width:120px;"><b>Update Time</b></div>',                                        
                                    '<div class="box nb center" style="width:160px;">{updateTime:date("Y-m-d h:i")}</div>',                                        
                                    '</div>',
                                '</div>',                                
                            '</div>',                           
                        '</div>',                        
                        {
                            formatChange: function(v) {
                                var color = v >= 0 ? 'green' : 'red';
        
                                return '<span style="color: ' + color + ';">' +
                                    Ext.util.Format.usMoney(v) + '</span>';
                            }
                        })
                },{
                    ptype: "gridfilters"
                },{
                    ptype: 'grid-exporter'
                }]
            }
            /*
            {
                xtype: 'panel',
                title: 'Items',
                iconCls: 'x-fa fa-list',
                //height: '100%',
                flex: 1,

                layout: {
                    type: 'fit'
                },
                items: [{
                    xtype: 'transfer-view',
                    reference: "piview",
                    //width: '80%',
                    scrollable: true,
                    margin: 5,
                    cls: 'transfer-view',
                    bind: {
                        selection: '{selection}',
                        store: "{theTransfer.TRANSFERDs}"
                    },
                    listeners: {
                        select: 'onItemSelect',
                        itemcontextmenu: 'onItemContextMenu',
                        itemdblclick: {
                            fn: 'onItemDblClick'
                        }
                    },
                    tpl: new Ext.XTemplate(
                        '<div class="item-boxer" style="width:1400px;margin: 1px;">',
                            '<div class="box-row">',
                                '<div class="box ab center" style="width:30px;">Line</div>',
                                '<div class="box ab center" style="width:160px;">Style</div>',
                                '<div class="box">',
                                    '<div class="item-boxer">',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab center" style="width:70px;">UOM</div>',
                                '<div class="box ab center" style="width:120px;">WH/Lot#</div>',
                                '<div class="box ab center" style="width:120px;">P.I Date</div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb center" style="width:100px;">Lot Memo</div>',
                                        '<div class="box rb center" style="width:110px;">PO #</div>',
                                        '<div class="box nb" style="width:120px;"></div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                            '<div class="box-row">',
                                '<div class="box nb" style="width:30px;"></div>',
                                '<div class="box ab center" style="width:160px;">Color</div>',
                                '<div class="box">',
                                    '<div class="item-boxer">',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:70px;"></div>',
                                        '<div class="box nb" style="width:82px;"></div>',
                                    '</div>',
                                '</div>',
                                '<div class="box ab center" style="width:70px;">Total Qty</div>',
                                '<div class="box ab center" style="width:120px;">Price</div>',
                                '<div class="box ab center" style="width:120px;">User/Update</div>',
                                '<div class="box ab">',
                                    '<div class="item-boxer">',
                                        '<div class="box rb center" style="width:100px;">Status/Loc</div>',
                                        '<div class="box rb center" style="width:110px;">ID</div>',
                                        '<div class="box nb" style="width:120px;"></div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<tpl for=".">',
                            '<div class="item-selector">',
                                '<div class="item-boxer" style="width:1400px;">',
                                '<div class="box-row">',
                                    '<div class="box ab" style="width:30px;">{lineseq}</div>',
                                    '<div class="box ab" style="width:160px;">{style:trim}</div>',
                                        '<div class="box ab">',
                                            '<div class="item-boxer">',
                                            '<div class="box rb center" style="width:70px;">{sz1}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz2}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz3}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz4}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz5}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz6}</div>',
                                            '<div class="box rb center" style="width:70px;">{sz7}</div>',
                                            '<div class="box nb center" style="width:70px;">{sz8}</div>',
                                            '</div>',
                                        '</div>',
                                    '<div class="box ab center" style="width:70px;">{uom:trim}</div>',
                                    '<div class="box ab" style="width:120px;">{wareHouse:trim}</div>',
                                    '<div class="box ab" style="width:120px;">{logdate:date("Y-m-d")}</div>',
                                    '<div class="box ab" style="width:330px;">{memo}</div>',
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box ab" style="width:30px;"></div>',
                                    '<div class="box ab" style="width:160px;">{color:trim}</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb right" style="width:70px;">{unit1}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit2}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit3}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit4}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit5}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit6}</div>',
                                            '<div class="box rb right" style="width:70px;">{unit7}</div>',
                                            '<div class="box nb right" style="width:70px;">{unit8}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab right" style="width:70px;">{totalUnit}</div>',
                                    '<div class="box ab" style="width:120px;">{lotno:trim}</div>',
                                    '<div class="box ab" style="width:120px;">{userName:trim}</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb" style="width:100px;">{status:trim}</div>',
                                            '<div class="box rb" style="width:110px;">{pono}</div>',
                                            '<div class="box nb" style="width:120px;">{updateDate:date("Y-m-d h:i")}</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                                '<div class="box-row">',
                                    '<div class="box" style="width:30px;"></div>',
                                    '<div class="box" style="width:160px;"></div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb right" style="width:70px;">{oh1}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh2}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh3}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh4}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh5}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh6}</div>',
                                            '<div class="box rb right" style="width:70px;">{oh7}</div>',
                                            '<div class="box nb right" style="width:70px;">{oh8}</div>',
                                        '</div>',
                                    '</div>',
                                    '<div class="box ab right" style="width:70px;">{ohs}</div>',
                                    '<div class="box ab" style="width:120px;">{price:usMoney}</div>',
                                    '<div class="box ab" style="width:120px;">{userTime:date("Y-m-d h:i")}</div>',
                                    '<div class="box ab">',
                                        '<div class="item-boxer">',
                                            '<div class="box rb" style="width:100px;">{location}</div>',
                                            '<div class="box rb" style="width:110px;">{inventoryId}</div>',
                                            '<div class="box nb" style="width:120px;">{ref:trim}</div>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</tpl>'
                    )                    
                }]
            }
            */
            ]
        });

        me.callParent(arguments);

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [
                btnEdit, btnCopy, btnDelete
            ]
        });
    },

    buildGridColumns: function(){
        return [{
            xtype: 'rownumberer',
            text: 'Line',
            width: 54,                        
            menuDisabled: true
        }, 
        {
            xtype: 'widgetcolumn',
            text:'Set',
            width: 54,
            widget: {
                xtype: 'button',
                //text: 'Set',
                //bind: '{setWH}',
                iconCls: 'x-fa fa-check-circle',
                tooltip: 'Set',
                
                handler: 'onWidgetSetClick'
            }
        },       
        {
            text: "ID",
            dataIndex: "ID",            
            locked: false,
            hidden: true,
            menuDisabled: true,
            filter: {
                type: "number"
            }
        },    
        {
            text: "Style",
            width: 160, 
            dataIndex: "style",            
            filter: {
                type: 'string'
            },
            editor: {
                xtype: "combo",
                name: 'style',                
                fieldCls: 'required',                
                //labelWidth: 50,
                width: 470,                             
                valueField: 'value',
                displayField: 'label',
                bind: {
                    readOnly: '{isEdit}',
                    //value: '{theTransfer.style}'
                },
                store: 'memStyles',
                remoteStore: 'Styles',
                matchFieldWidth: false,
                autoLoadOnValue: true,
                allowBlank: false,
                //forceSelection: false,
                selectOnFocus: true,
                //selectOnTab: false,
                pageSize: 50,
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //queryDelay: 800,
                //triggerAction: 'all',
                lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    beforequery: {
                        fn: function(qe){
                            delete qe.combo.lastQuery;
                        }
                    },
                    select: {
                        fn: 'onStyleComboSelected',
                        scope: this.controller
                    },
                    change: function(c){
                        c.getStore().load();
                    },                     
                    triggerClear: function(c){
                        c.getStore().load();                                
                    }
                }
            }
        },
        {
            text: "Color",
            width: 160, 
            dataIndex: "color",            
            filter: {
                type: 'string'
            },
            editor: {
                xtype: "combo",
                name: 'color',                                
                fieldCls: 'required',                
                width: 470,                
                valueField: 'value',
                displayField: 'label',
                bind: {
                    readOnly: '{isEdit}',
                    //value: '{theTransfer.color}'
                },
                store: 'memColors',
                remoteStore: 'Colors',
                matchFieldWidth: false,
                autoLoadOnValue: true,
                allowBlank: false,
                //forceSelection: true,
                selectOnFocus: true,
                pageSize: 50,
                minChars: 1,
                queryMode: 'local',
                //queryParam: 'filter',
                //queryDelay: 800,
                //triggerAction: 'all',
                lastQuery: '',
                listConfig: {
                    loadindText: 'Searching...',
                    emptyText: 'No matching items found.',
                    width: 340
                },
                plugins: [{
                    ptype: "cleartrigger"
                }],
                listeners: {
                    beforequery: {
                        fn: function(qe){
                            delete qe.combo.lastQuery;
                        }
                    },
                    select: {
                        fn: 'onColorComboSelected',
                        scope: this.controller
                    },
                    change: function(c){
                        c.getStore().load();
                    },                     
                    triggerClear: function(c){
                        c.getStore().load();                                
                    }
                }
            }
        },           
        {
            xtype: 'numbercolumn',
            //header: "unit1",
            dataIndex: "unit1",
            width: 50,                     
            menuDisabled: true,
            sortable: false,  
            format: '0,000',    
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                     
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit2",
            width: 50,       
            menuDisabled: true,
            sortable: false,    
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
            },                           
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit3",
            width: 50,   
            hideTrigger: true,
            menuDisabled: true,
            sortable: false,        
            format: '0,000',   
            editor: {
                xtype: 'numberfield',
                hideTrigger: true,
            },                       
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit4",
            width: 50,     
            menuDisabled: true,
            sortable: false,      
            format: '0,000',  
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                        
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit5",
            width: 50,       
            menuDisabled: true,
            sortable: false,    
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                         
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit6",
            width: 50,    
            menuDisabled: true,
            sortable: false,       
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                          
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit7",
            width: 50,  
            menuDisabled: true,
            sortable: false,         
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                          
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit8",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000', 
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                         
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit9",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000',
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                          
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit10",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000', 
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                         
            renderer: function(f, e, a){
                return f;
            }
        },        
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit11",
            menuDisabled: true,
            sortable: false,
            width: 50,       
            format: '0,000',     
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                    
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit12",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            format: '0,000',   
            editor: {
                xtype: 'numberfield',
                hideTrigger: true
            },                      
            renderer: function(f, e, a){
                return f;
            }
        },
        /*
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit13",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            hidden: true,    
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        }, 
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit14",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            hidden: true,    
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            xtype: 'numbercolumn',
            header: "",
            dataIndex: "unit5",
            menuDisabled: true,
            sortable: false,
            width: 50,           
            hidden: true,    
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },
        */
        {
            xtype: 'numbercolumn',
            header: "Total Qty",
            dataIndex: "totalUnit",
            width: 82,           
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },              
        {
            xtype: 'numbercolumn',
            text: "Price",
            dataIndex: "price",
            width: 70,
            menuDisabled: true,
            sortable: false,
            format: '$0,000.00'
        },  
        {
            text: "PrePack",
            dataIndex: "bundle",          
            width: 95,  
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        },  
        {
            xtype: 'numbercolumn',
            header: "# of P.P",
            dataIndex: "numofbundle",
            width: 120,           
            format: '0,000',                         
            renderer: function(f, e, a){
                return f;
            }
        },
        {
            text: "Memo",
            dataIndex: "memo",
            //width: 120,
            flex: 1,
            hidden: false,
            editor: {
                xtype: 'textfield'
            }, 
            filter: {type: "string"},
            renderer: function(value, h, a){                
                return value;
            }
        },
        /*
        {
            text: "From Warehouse",
            dataIndex: "fr_warehouse",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        }, 
        {
            text: "To Warehouse",
            dataIndex: "to_warehouse",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        },                    
        {
            xtype: 'datecolumn',
            text: "Transfer Date",
            dataIndex: "transferdate",            
            hidden: true,
            format: 'Y-m-d',
            filter: {
                type: "date"
            }
        },
        {
            text: "Update User",
            dataIndex: "updateUser",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        },  
        {
            xtype: 'datecolumn',
            text: "Update Time",
            dataIndex: "updateTime",
            format: 'Y-m-d h:i a',
            filter: {
                type: "date"
            }
        },                  
        {
            text: "Status",
            dataIndex: "status",            
            filter: {
                type: 'string'
            },
            renderer: function(value, meta, rec){                
                return value;
            }
        }
    */];
    }
});
