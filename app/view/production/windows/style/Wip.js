
Ext.define('August.view.production.windows.style.Wip',{
       
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.WipController',
        'August.view.production.windows.style.WipModel'
    ],

    alias: 'widget.windows-style-wip',

    controller: "windows-style-wip",
    viewModel: {
        type: "windows-style-wip"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'W.I.P',
        iconCls: 'x-fa fa-warehouse',
        titlePosition: 0,
        titleAlign: 'left'
    },

    //padding: '0 10 10 10',    

    minWidth: 720,
    minHeight: 480,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [{
        type: 'pin'
    }],

    initComponent: function() {
        var me = this;

        // Calculating the textfield height...
        var field = new Ext.form.field.Text({
                renderTo: document.body
            }), fieldHeight = field.getHeight(),
            padding = 5,
            remainingHeight;

        field.destroy();
        remainingHeight = padding + fieldHeight * 3;

        me.width = document.body.clientWidth - 660;
        me.height = document.body.clientHeight - 520;                

        Ext.applyIf(me, {
            items: [{
                xtype: 'grid',
                reference: 'style-wip-grid',                               
                columnLines: true,

                bind: {
                    store: '{wips}'
                },
                selModel: {
                    //type: 'checkboxmodel',              
                    pruneRemoved: false
                },
                /*
                features: [{
                    ftype: 'rowbody',
                    //bodyBefore: true,
                    getAdditionalData: function(data, idx, record, orig){

                        var tpl =  '<div class="thumbnail" style="padding-left: 1.8em; margin-right: 0.6em; float:left;">' +
                            '<img id="' + record.id + '" src="' + data.path + '" width="80" height="90" /></div>';

                        tpl += '<div style="padding: 1em;"><b>File Name: ' + data.name + " - Size: " + Ext.util.Format.fileSize(data.size) + '</b></div><div>' + '</div>';

                        //console.log('rowbody', data, idx)
                        //record.set('F_EXT', '.' + data.name.split('.').pop());

                        return {
                            rowBody: tpl,
                            rowBodyCls: 'my-body-class'
                        }
                    }
                }],
                */
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
                        //return "custom-row-style";
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

                columns: [{
                    text: 'ID', dataIndex: 'id', menuDisabled: true, fixed: true, width: 50, hidden: true
                },{
                    xtype: 'rownumberer', text: '', menuDisabled: true, width: 50,
                },{
                    text: 'PO/Cut #', dataIndex: 'pono', menuDisabled: true, width: 90,
                    renderer: function(v, meta, rec){                                        
                        
                        var html = "<a href='#purchase-order/edit/{0}'>{1}</a>";
                        return Ext.String.format(html, v, v);
                    } 
                },{
                    text: 'status', dataIndex: 'status', menuDisabled: true, width: 70,
                },{
                    text: 'Vendor', dataIndex: 'vendor', menuDisabled: true, width: 120,
                },{
                    xtype: 'datecolumn', text: 'PO Date', dataIndex: 'orderdate', menuDisabled: true, width: 100,
                },{
                    xtype: 'datecolumn', text: 'ETA Date', dataIndex: 'etadate', menuDisabled: true, width: 100,
                },{
                    xtype: 'datecolumn', text: 'Ship Date', dataIndex: 'shipdate', menuDisabled: true, width: 100,
                },{
                    xtype: 'datecolumn', text: 'Cancel Date', dataIndex: 'canceldate', menuDisabled: true, width: 100,
                },{
                    text: 'Warehouse', dataIndex: 'warehouse', menuDisabled: true, width: 100,
                },{
                    text: 'Parent PO#', dataIndex: 'parent_pono', menuDisabled: true, width: 70,
                },{
                    text: 'Received Qty', dataIndex: 'receiveQty', menuDisabled: true, width: 80,
                },{
                    text: 'S.O #', dataIndex: 'sono', menuDisabled: true, width: 90,
                },{
                    text: 'Customer', dataIndex: 'customer', menuDisabled: true, width: 140,
                },{
                    text: 'Total', dataIndex: 'totalUnit', menuDisabled: true, width: 70,
                },{
                    text: 'Ship Via', dataIndex: 'shipvia', menuDisabled: true, width: 100,
                },{
                    text: 'Memo', dataIndex: 'memo', menuDisabled: true, width: 200,
                }]

                //anchor: '100% 60%'
            }]
        });

        me.callParent(arguments);

    }
});
