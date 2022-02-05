
Ext.define("August.view.production.WIP", {
    extend: 'August.view.Viewer',

    requires: [
        'August.view.production.WIPController',
        'August.view.production.WIPModel',
        //'August.view.production.windows.request.Form',
        'Ext.grid.plugin.Exporter'
    ],

    alias: 'widget.prod-wip',

    controller: "prod-wip",
    viewModel: {
        type: "prod-wip"
    },

    cls: "shadow-panel",

    header: false,
    margin: '0 0 0 4',

    session: {},

    listeners: {
        actrefresh: "onActionRefresh",
        clearall: 'onClearFilters',
        itemcontextmenu: 'onItemContextMenu'
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            items: [{
                xtype: "multiview",
                reference: "multiview",
                title: "Production W.I.P",
                iconCls: "x-fa fa-server",
                tbar: {
                    xtype: "topbar",
                    reference: "topbar"
                },
                mainItems: [{
                    xtype: "grid",
                    reference: "grid",
                    scrollable: true,

                    flex: 2,

                    style: {
                        //borderTop: '1px solid #cfcfcf',
                        //borderBottom: '1px solid #cfcfcf'
                    },
                    /*
                    split: {
                        size: 5
                    },
                    layout: {
                        type: 'border'
                    },
                    lockedGridConfig: {
                        header: false,
                        collapsible: true,
                        //width: 325,
                        //minWidth: 290,
                        forceFit: true
                    },
                    */
                    bind: {
                        store: "{wips}"
                    },

                    columns: this.buildColumns(),

                    cls: "wip-grid",
                    stateful: true,
                    stateId: "wip-grid",
                    //stateEvents: ["columnmove","columnresize","columnshow","columnhide"],
                    //loadMask: true,
                    //columnLines: true,
                    multiColumnSort: true,
                    // We do not need automatic height synching.
                    syncRowHeight: false,

                    selModel: {
                        pruneRemoved: false
                    },
                    viewConfig: {
                        //loadingHeight: 400,
                        stripeRows: true,
                        trackOver: true,
                        preserveScrollOnRefresh:true,
                        //deferInitialRefresh:true,
                        //trailingBufferZone: 20,
                        //leadingBufferZone: 40,

                        emptyText: '<h1 style="margin:20px">No matching results</h1>'
                        /*
                        getRowClass: function(rec, rowIndex, rowParams, store){
                            var acts = me.lookupViewModel().getStore('activities'),
                            // Regex Pattern xx-xx-xxxxC
                                re = /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)[0-9]{2}[DSC]{1}/g,
                                yellow = false, red = false;

                            acts.each(function(a){
                                var col = a.data.id,
                                    value = rec.get(col),
                                    rs, due, sent, comp;

                                if(!Ext.isEmpty(value)){
                                    while((rs = re.exec(value)) != null){
                                        //console.log(rowIndex, col, rs)
                                        switch ((rs[0]).slice(-1)){
                                            case 'D':
                                                due = rs[0].slice(0,-1);
                                                break;
                                            case 'S':
                                                sent = rs[0].slice(0,-1);
                                                break;
                                            case 'C':
                                                comp = rs[0].slice(0,-1);
                                                break;
                                        }
                                    }

                                    //console.log(rec.data.powdId, due, sent, comp)
                                    if(!Ext.isEmpty(due) && Ext.isEmpty(sent) && Ext.isEmpty(comp)){
                                        var dd = new Date(due),
                                            bd = new Date(due),
                                            b7 = bd.setDate(bd.getDate()-5),
                                            today = (new Date()).setHours(0,0,0,0);

                                        //console.log(b7, today, b7 < today);
                                        if(b7 < today){
                                            yellow = true;
                                        }

                                        if(dd < today){
                                            red = true;
                                        }
                                    }
                                }
                            });

                            if(red){
                                return 'overdue-row';
                            }

                            if(yellow){
                                return 'neardue-row';
                            }
                        }
                        */
                    },
                    plugins: [{
                        ptype: "gridfilters"
                    },{
                        ptype: 'gridexporter'
                    }],
                    listeners: {
                        render: {
                            //fn: 'onGridRender',
                            //scope: this.controller
                        },
                        select: {
                            fn: "onSelect",
                            scope: this.controller
                        }
                    }
                }],

                displayItems: [{
                    xtype: "tabpanel",
                    minTabWidth: 140,
                    tabBar: {
                        defaults: {
                            textAlign: 'left',
                            border: true,
                            style: {
                                //border: '1px solid #ccc'
                            }
                        }
                    },
                    items: [{
                        xtype: 'prod-task',
                        title: 'Tasks',
                        iconCls: "x-fa fa-tasks",
                        reference: 'taskgrid',
                        scrollable: true,
                        border: false,
                        bind: {
                            store: '{grid.selection.tasks}'
                        }
                    },{
                        xtype: 'prod-childpo',
                        title: 'Child POs',
                        iconCls: 'x-fa fa-th-list',
                        reference: 'cpogrid',
                        scrollable: true,
                        border: false,
                        bind: {
                            store: '{cpos}'
                        }
                    },{
                        xtype: 'panel',
                        title: 'Events',
                        iconCls: 'x-fa fa-calendar-check-o',
                        scrollable: true
                    }]
                }],

                bbar: me.buildBottomBar()
            }]
        });

        me.callParent(arguments);

        var multiview = me.lookupReference("multiview"),
            grid = multiview.lookupReference("grid"),
            display = multiview.lookupReference("display"),
            topbar = multiview.lookupReference("topbar");

        topbar.items.items[0].setHidden(false);
        topbar.items.last().setHidden(true);
        topbar.insert(0,
            [{
                xtype: "combo",
                width: 112,
                hideLabel: true,
                valueField: "text",
                displayField: "label",
                value: "pono",
                editable: false,
                reference: "filterSelection",
                bind: {
                    store: "{categories}"
                },
                listeners: {
                    change: "onFilterItemChange",
                    scope: this.controller
                }
            },
            {
                xtype: "searchcombo",
                reference: 'searchcombo',
                width: 300,
                hidden: true,
                listeners: {
                    triggerclear: "onClearClick",
                    triggersearch: "onSearchClick",
                    scope: this.controller
                }
            },
            {
                xtype: "searchgrid",
                reference: 'searchgrid',
                width: 300,
                grid: "grid",
                paramName: "powno"
            }]
        );

        topbar.insert(11,
            {
                xtype: "cycle",
                ui: "default",
                prependText: "Show: ",
                iconCls: "x-fa fa-filter",
                showText: true,
                reference: "statusSelect",
                changeHandler: "onStatusChange",
                scope: this.controller,
                menu: {
                    items: [{
                        text: "All",
                        iconCls: "x-fa fa-filter",
                        type: 'all',
                        checked: false
                    },{
                        text: "WIP",
                        iconCls: "x-fa fa-filter",
                        type: 'wip',
                        checked: true
                    },{
                        text: "Shipped",
                        iconCls: "x-fa fa-filter",
                        type: 'ship',
                        checked: false
                    }]
                }
            }
        );

        topbar.insert(15, {
            xtype: 'button',
            iconCls: 'x-fa fa-external-link-square',
            text: 'Export',
            //handler: 'onExport',
            //scope: this.controller

            menu: {
                items: [{
                    text: 'With Image',
                    iconCls: 'x-fa fa-file-image-o',
                    handler: 'onExport',
                    scope: this.controller
                },{
                    text: 'Data Only',
                    iconCls: 'x-fa fa-file-excel-o',
                    handler: function(b){
                        grid.saveDocumentAs({
                            type: 'excel',
                            title: 'Production W.I.P',
                            fileName: 'wip as of ' + Ext.Date.format(new Date(), 'Y-m-d') + '.xlsx'
                        });
                    }
                }]
            }

        });

        me.contextmenu = Ext.create('Ext.menu.Menu', {
            items: [topbar.actRefresh,
                {
                    text: "Production Request",
                    iconCls: "x-fa fa-tag",
                    action: "prod-request",
                    handler: 'onOpenPreviewRequestClick',
                    scope: this.controller
                },
                {
                    text: "Copy T&A",
                    iconCls: "x-fa fa-copy",
                    //action: "printlabel",
                    handler: 'onCopyTNAClick',
                    scope: this.controller
                }
            ]
        });

        this.relayEvents(grid, ["itemcontextmenu"]);
        this.relayEvents(topbar, ["actrefresh", "clearall"]);
    },

    onDestroy: function(){
        this.contextmenu.destroy();
        this.callParent(arguments);
    },

    buildColumns: function(){
        var ddRenderer = function(val, meta, rec, rIdx, cIdx, store){
            var ns = "",
                ds = val.split(","),
                ca = {D:'blue', S:'orange', C:'green'},
                color, due, sent, comp;

            Ext.Array.each(ds, function(d, i, a){
                switch (d.slice(-1)) {
                    case 'D':
                        due = d.slice(0,-1);
                        break;
                    case 'S':
                        sent = d.slice(0,-1);
                        break;
                    case 'C':
                        comp = d.slice(0,-1);
                        break;
                }
            });

            Ext.Array.each(ds, function(d, i, a){
                color = ca[d.slice(-1)];

                if(!Ext.isEmpty(due) && Ext.isEmpty(sent) && Ext.isEmpty(comp)){
                    var dd = new Date(due),
                        bd = new Date(due),
                        b7 = bd.setDate(bd.getDate()-5),
                        today = (new Date()).setHours(0,0,0,0);

                    if(b7 < today){
                        color = 'red';
                    }

                    if(dd < today){
                        color = 'red';
                    }
                }

                ns += Ext.String.format('<div style="color:{0}">{1}</div>', color, d);
            });

            return ns;
        };

        return [
            /*
            {
                text: 'Body', dataIndex: 'bodyimgsrc', width:88, locked: false, hidden: false, draggable: false, ignoreExport: true,
                renderer: function (value, metadata, record) {
                    var tpl = '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="../{0}{1}" alt="{2}" /></span>';

                    //var xf = Ext.util.Format;
                    if (!Ext.isEmpty(value)) {
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                        //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';

                        return Ext.String.format(tpl, value, "?w=64&h=64", value);
                    }

                    return value;
                }
            },            
            */            
            {
                text: 'Production', dataIndex: '', width:120, locked: false,
                filter: {
                    type: 'string'
                },
                renderer: function(val, meta, rec, rIdx, cIdx, store){
                    var tpl = '<a href="#pow/tab/{0}">{1}</a>';

                    return Ext.String.format(tpl, rec.data.orderId, val);
                }
            },
            {
                text: 'Vendor', dataIndex: 'vendor', width:120, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Brand', dataIndex: 'division', width:120, locked: false,
                filter: {
                    type: 'string'
                }
            },                                        
            {
                text: 'Style', dataIndex: 'style', width:120, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Color', dataIndex: 'color', width:120, locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {
                text: 'Description', dataIndex: 'descript', width:220, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {
                text: 'Photo', dataIndex: '', width:88, locked: false, hidden: false, draggable: false, ignoreExport: true,
                renderer: function (value, p, record) {
                    var tpl = '<span class="file"><img style="vertical-align: middle;width:64px;margin:0 2px 0 0;" src="http://n41-27:9090/StyleImages/200xImages/{0}_{1}_front.jpg?w=64&h=64" alt="{0}_{1}" /></span>';

                    //var xf = Ext.util.Format;
                    if (!Ext.isEmpty(record)) {
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                        //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                        //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';

                        //return Ext.String.format(tpl, encodeURIComponent(value), "?w=64&h=64", value);
                        return Ext.String.format(tpl, encodeURIComponent(record.data.style), encodeURIComponent(record.data.color));
                    }
                    return '';
                }
            },                                                      
            {   text: 'PO #', dataIndex: 'pono', width: 120, locked: false,
                filter: {
                    type: 'string'
                }
            },     
            //{   text: 'Status', dataIndex: 'pod_status', width: 88, locked: false  },
            //{   text: 'Memo', dataIndex: 'pod_memo', width: 88, locked: false  },
            {   xtype: 'numbercolumn', text: 'PO Qty', dataIndex: 'unitSum', locked: false, format: '0,000',
                filter: {
                    type: 'number'
                }
            },                                            
            {   text: 'ANNA', dataIndex: 'anna', locked: false, 
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'BAILEY', dataIndex: 'bailey', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'CAROL', dataIndex: 'carol', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'DOMINIQUE', dataIndex: 'dominique', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'EDDIE', dataIndex: 'eddie', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'EDGAR', dataIndex: 'edgar', locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'IN HOUSE', dataIndex: 'inhouse', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'IRENE', dataIndex: 'irene', locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'LEA', dataIndex: 'lea', locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'LYDIA', dataIndex: 'lydia', locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'SAMANTHA', dataIndex: 'samantha', locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'SARAH', dataIndex: 'sarah', locked: false,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'SHOW SHOW', dataIndex: 'showshow', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'TAMARA', dataIndex: 'tamara', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'TIFFANY', dataIndex: 'tiffany', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'VEE', dataIndex: 'vee', locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            }, 
            {   text: 'S.O #', dataIndex: 'SONOs', width: 220, locked: false,
                filter: {
                    type: 'string'
                }
            },   
            {   xtype: 'numbercolumn', text: 'Total Unit', dataIndex: 'totalUnit', locked: false, format: '0,000',
                filter: {
                    type: 'number'
                }
            },
            {
                text: 'PO MEMO', dataIndex: 'memo', width:320, locked: false,
                filter: {
                    type: 'string'
                }
            },
            {   text: 'PO MEMO 2', dataIndex: 'trimmemo', width: 320, locked: false, hidden: true,
                filter: {
                    type: 'string'
                }
            },
            //{   text: 'CUT/PO', dataIndex: 'cut_po', width: 88, locked: false  },
            {   xtype: 'datecolumn', text: 'PO Issued', dataIndex: 'orderDate', format: 'm-d-Y', width: 120, locked: false,
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {   xtype: 'datecolumn', text: 'PO Started', dataIndex: 'startDate', format: 'm-d-Y', width: 120, locked: false,
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {
                xtype: 'datecolumn', text: 'EX-FACTORY', dataIndex: '', width:120, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            }, 
            {
                xtype: 'datecolumn', text: 'ETD', dataIndex: '', width:120, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {
                xtype: 'datecolumn', text: 'ETA', dataIndex: 'etaDate', width:120, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            },
            {
                xtype: 'datecolumn', text: 'CXL', dataIndex: 'cancelDate', width:120, locked: false, format: 'm-d-Y',
                exportStyle: {
                    format: 'Short Date',
                    alignment: {
                        horizontal: 'Right'
                    }
                },
                filter: {
                    type: 'date'
                }
            }                        
        ];
    },

    buildBottomBar: function(){
        var b = Ext.create("widget.combo", {
            name: "perpage",
            //reference: 'pageSizer',
            width: 76,
            store: new Ext.data.ArrayStore({
                fields: ["id"],
                data: [["15"], ["25"], ["50"], ["100"], ["300"], ["500"]]
            }),
            //value: "50",
            displayField: "id",
            valueField: "id",
            editable: false,
            forceSelection: true,
            matchFieldWidth: true,
            queryMode: "local"
            //triggerAction: "all",
        });

        b.on('afterrender', function(c, e){
            var store = this.getViewModel().getStore("wips");
            c.setValue(store.getPageSize());
        }, this);

        b.on("select", function(e, a){
            var store = this.getViewModel().getStore("wips");
            store.setPageSize(e.getValue());
            store.load();
            //console.log("combo select", f)
        }, this);

        return {
            xtype: "pagingtoolbar",
            //itemId: "pagingtb",
            bind: {
                store: "{wips}"
            },
            //dock: "bottom",
            //displayInfo: true,
            items: ["-", b, "Per Page"]
        };
    }
});
