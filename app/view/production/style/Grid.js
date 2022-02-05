/**
 * Created by tech on 3/9/2016.
 */
Ext.define("August.view.production.style.Grid", {
    extend: 'Ext.grid.Panel',

    requires: [
        'August.view.production.style.GridController',
        'August.view.production.style.GridModel',
        'August.plugin.grid.Exporter',
        'Ext.grid.plugin.Exporter',
        'Ext.grid.filters.Filters'
    ],

    alias: "widget.style-grid",

    controller: "style-grid",
    viewModel: {
        type: "style-grid"
    },

    style: {
        //borderTop: '1px solid #cfcfcf',
        //borderBottom: '1px solid #cfcfcf'
    },

    selModel: {
        mode: 'MULTI',        
        pruneRemoved: false
    },

    viewConfig: {
        //loadingHeight: 100,
        stripeRows: true,
        trackOver: true,
        //enableTextSelection: false,

        preserveScrollOnRefresh: true,
        //preserveScrollOnReload: true,
        //deferInitialRefresh: true,
        deferEmptyText: true,
        //emptyText: '<h1 style="margin: 20px">No matching results</h1>',
        getRowClass: function(a, g, f, h){
            return "custom-row-style";
        },
        listeners: {
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

                                
                                //tip.update(view.getRecord(tip.triggerElement).get('BODYIMG'));
                                tip.update(columnText);
                            }
                            else {
                                return false;
                            }

                        }
                    }
                });
            }
        }
    },

    plugins: [{
        ptype: "gridfilters"
    },{
        ptype: 'grid-exporter'
    }],

    listeners: {
        //select: "onSelect"
    },

    initComponent: function(){
        var me = this;

        Ext.applyIf(me, {
            columns: [{
                header: "ID",
                dataIndex: "id",
                width: 140,
                //locked: false,
                hidden: true,
                filter: {                    
                    type: "number"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },{
                header: "Style",
                dataIndex: "style",
                width: 140,
                //locked: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Color",
                dataIndex: "color",
                width: 140,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Description",
                dataIndex: "descript",
                width: 260,
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },            
            {
                header: "Status",
                dataIndex: "status",
                width: 140,            
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            /*
            {
                header: "Category",
                dataIndex: "category",
                width: 200,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(i, h, a){
                    var k=Ext.util.Format;
                    if(!Ext.isEmpty(i)){
                        var l=i.split("(#)"),
                        j=k.capitalize(l[0]+" / "+l[1]);
                        //h.tdAttr='data-qtip="'+j+'"';
                        return j;
                    }
                }
            },
            */
            {
                header: "Category",
                dataIndex: "category",
                width: 140,
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Season",
                dataIndex: "season",                
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Division",
                dataIndex: "division",
                hidden: false,
                filter: {
                    //operator: 'st',
                    type: "list"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Size Cat.",
                dataIndex: "sizeCat",
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "O.H Qty",
                dataIndex: "ohs",                
                hidden: false,
                filter: {
                    type: 'number'
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "ATS",
                dataIndex: "its",
                locked: false,
                hidden: true,
                filter: {
                    type: "number"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "S.O Qty",
                dataIndex: "orders",
                locked: false,
                filter: {
                    type: "number"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "P.O Qty",
                dataIndex: "pos",
                locked: false,
                filter: {
                    type: "number"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Received Qty",
                dataIndex: "receivedQty",
                locked: false,
                hidden: false,
                filter: {
                    type: "number"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Total Inv. Qty",
                dataIndex: "total_inv_qty",
                locked: false,
                hidden: false,
                filter: {
                    type: "number"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                xtype: 'checkcolumn',
                header: "Web Y/N",
                dataIndex: "web_yn",
                headerCheckbox: false,
                locked: false,
                hidden: false,
                stopSelection: false
            },
            {
                header: "Bin Location",
                dataIndex: "binlocation",
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },            
            {
                header: "Group",
                dataIndex: "grp",
                width: 120,
                hidden: false,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Sub. Category",
                dataIndex: "subcategory",
                width: 120,
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "",
                dataIndex: "",
                hidden: true,
                filter: {
                    operator: 'st',
                    type: "string"
                },
                renderer: function(f, e, a){
                    return f;
                }
            },
            {
                header: "Price",
                dataIndex: "price",
                width: 80,
                hidden: false,
                renderer: function(v, meta, rec){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },
            {
                header: "Price5",
                dataIndex: "price5",
                width: 80,
                hidden: false,
                renderer: function(v, meta, rec){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },            
            {
                header: "Cost",
                dataIndex: "cost",
                width: 80,
                align: 'center',
                hidden: false,
                renderer: function(v, meta, rec){
                    var xf = Ext.util.Format;

                    return v ? xf.usMoney(v) : '';
                }
            },
            /*
            {
                header: '<i style="text-align: center;" class="x-fa fa-paperclip fa-lg"></i>',
                dataIndex: 'photos',
                width: 50,
                align: 'center',
                renderer: function(value, metaData, rec, rowIndex, colIndex, store, view){
                    var strValue = value != 0 ? value : '',
                        icon = '<i class="x-fa fa-check-circle-o fa-lg fa-fw green-txt"></i>';
                    //metaData.tdStyle = 'font-weight:bold;color:' + (rec.data.mp ? 'green' : 'transparent');

                    if(rec.data.name){
                        strValue = '<span>'+(value != 0 ? value : '')+'</span>'+icon;
                    }

                    return strValue;
                }
            },
            */            
            {
                header: "Created On",
                dataIndex: "userTime",
                filter: {type: "date"},
                renderer: function(k, i, a){
                    if(k!=undefined){
                        var d=new Date(k),
                        j = function(c){
                            return c<10 ? "0"+c : c;
                        };
                        var l = j(d.getUTCMonth()+1)+"-"+j(d.getUTCDate())+"-"+d.getUTCFullYear();
                        i.tdAttr='data-qtip="'+l+'"';
                        return l;
                    }
                }
            }]
        });

        this.callParent(arguments);
    }
});
