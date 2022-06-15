
Ext.define('August.view.production.windows.style.OnHand',{

    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.OnHandController',
        'August.view.production.windows.style.OnHandModel'
    ],

    alias: 'widget.windows-style-onhand',

    controller: "windows-style-onhand",
    viewModel: {
        type: "windows-style-onhand"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'On Hand by Warehouse',
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

        me.width = document.body.clientWidth - 860;
        me.height = document.body.clientHeight - 800;

        Ext.applyIf(me, {
            items: [{
                xtype: 'grid',
                reference: 'style-onhand-grid',                               

                columnLines: true,

                bind: {
                    store: '{onhands}'
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
                    loadMask: true,
                    stripeRows: true,
                    trackOver: true,
                    //enableTextSelection: false,
                                
                    deferEmptyText: true,
                    //emptyText: '<h1 style="margin: 20px">No matching results</h1>',
                    getRowClass: function(a, g, f, h){
                        //return "custom-row-style";
                    },
            
                    listeners: {
                        render: function(view){
                            //var view = grid.getView();                            
                        }
                    }
                },

                listeners: {
                    load: {
                        fn: 'onHandStoreLoad',
                        scope: me.controller
                    }
                },

                columns: [{
                    text: 'ID', dataIndex: 'id', menuDisabled: true, fixed: true, width: 50, hidden: true
                },{
                    text: 'Warehouse', dataIndex: 'warehouse', menuDisabled: true, width: 100,
                },{
                    text: 'WH Type', dataIndex: 'type', menuDisabled: true, width: 80,
                },{
                    text: '', dataIndex: 'oh1', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh2', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh3', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh4', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh5', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh6', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh7', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh8', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh9', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh10', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh11', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh12', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh13', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh14', menuDisabled: true, width: 50,
                },{
                    text: '', dataIndex: 'oh15', menuDisabled: true, width: 50,
                },{
                    text: 'Total', dataIndex: 'ohs', menuDisabled: true, width: 70,
                }]

                //anchor: '100% 60%'
            }]
        });

        me.callParent(arguments);

    }
});



