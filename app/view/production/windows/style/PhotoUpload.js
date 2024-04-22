
Ext.define('August.view.production.windows.style.PhotoUpload',{
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.PhotoUploadController',
        'August.view.production.windows.style.PhotoUploadModel',
        'Ext.ux.form.MultiUpload'
    ],

    alias: 'widget.windows-style-photoupload',

    controller: "windows-style-photoupload",
    viewModel: {
        type: "windows-style-photoupload"
    },

    layout: {
        type: 'fit'
    },

    header: {
        title: 'Photo Upload',
        iconCls: 'x-fa fa-upload',
        titlePosition: 0,
        titleAlign: 'left'
    },

    padding: '0 10 10 10',

    bind: {
        //title: '{title}'
    },

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
        me.height = document.body.clientHeight - 320;

        /*
        Ext.define('File', {
            extend: 'Ext.data.Model',
            fields: [ 'id', 'name', 'size', 'lastmod' ],
            idProperty: 'id'
        });

        var fileStore = Ext.create('Ext.data.Store', {
            model: 'File'
        });
        */                

        me.items = [{
            xtype: 'multiupload',

            cls: 'product-photo-grid',

            enableEdit: false,
            //features: [],
            columns: me.buildColumns()
            //fields: me.buildFields()   
        }];

        me.buttons = [{
            action: 'save',
            text: 'Save',
            formBind: true,
            //glyph: 86,
            iconCls: 'x-fa fa-save',
            handler: function(btn){
                me.fireEvent('saveclick', btn, me);
            }
        },{
            action: 'close',
            text: 'Close',
            //glyph: 88,
            iconCls: 'x-fa fa-times-circle',
            handler: function(btn){
                btn.up('window').close();
            }
        }];

        Ext.applyIf(me, {

        });

        me.callParent(arguments);

    },

    buildColumns: function(){

        return [{           
            text: '',
            dataIndex: '', 
            menuDisabled: true,
            width: 30,            
            sortable: false,
            hidden: false,
            align: 'center',
            renderer: function(value, metaData, record, rowIndex, colIndex, store){
                return rowIndex + 1;
            }
        },{
            text: 'File ID',
            dataIndex: 'fileId',
            menuDisabled: true,
            fixed: true,
            width: 30,
            sortable: false,
            hidden: true
        },{
            text: 'Style # / Color',            
            dataIndex: 'style',            
            width: 200,
            sortable: false,
            hidden: false,
            renderer: function (value, p, rec) {
                var tpl = '<div class="thumb-wrap">' + 
                            '<div class="thumb">' + 
                                '<img style="vertical-align:bottom;margin-left:4px;width:36px;" src={0} />' + 
                            '</div>' +                            
                          '</div>' + 
                          '<div>{1}</div>' + 
                          '<div>{2}</div>';

                //var xf = Ext.util.Format;                                

                if (!Ext.isEmpty(rec)) {                    
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tpl, value, "?w=264&h=288", record.data.BODYIMG) + '"';
                    //var tmp = '<img src="../DLIB/BLU-ILLUSTRATIONS/{0}.jpg?w=264&h=288" />';
                    //metadata.tdAttr = 'data-qtip="' + Ext.String.format(tmp, value) + '"';
                    //return Ext.String.format(tpl, encodeURIComponent(images.first().data.src));

                    return Ext.String.format(tpl, rec.get('path'), value, rec.get('color'));
                }

                return value;
            }
        },{
            text: 'Color',            
            dataIndex: 'color',            
            width: 100,
            hidden: true,
            sortable: false
        },{
            text: 'File Name',
            dataIndex: 'name',            
            width: 300,
            sortable: false,            
            hidden: false
        },{
            text: 'Position',
            dataIndex: 'position',
            menuDisabled: true,
            width: 80,
            sortable: false,            
            hidden: false
        },{
            text: 'Type',
            dataIndex: 'type',
            sortable: false,            
            hidden: false
        },{
            text: 'Size',
            dataIndex: 'size',
            menuDisabled: true,
            sortable: false,
            hidden: false,
            formatter: 'fileSize'
        },{
            text: 'Tag',
            dataIndex: 'tag',
            menuDisabled: true,
            flex: 1,
            sortable: false,            
            hidden: false
        },{
            text: 'Path',
            dataIndex: 'path',
            menuDisabled: true,
            sortable: false,            
            hidden: true
        },{
            xtype: 'datecolumn',
            text: 'Created',
            dataIndex: 'created',
            menuDisabled: true,
            sortable: false,            
            hidden: true,
            format: 'MM-dd-yyyy'
        },{
            xtype: 'datecolumn',
            text: 'Last Modified',
            dataIndex: 'lastmod',
            menuDisabled: true,
            sortable: false,            
            hidden: true,
            format: 'MM-dd-yyyy'
        },{
            xtype: 'actioncolumn',
            text: '<i class="x-fa fa-times-circle fa-lg red-txt"></i>',
            //iconCls: 'x-fa fa-close red-txt',
            width: 50,
            align: 'center',
            menuDisabled: true,
            sortable: false,
            items: [{
                //icon: 'resources/images/shared/icon-error.png',
                //glyph: 45,
                //ui: 'default',
                iconCls: 'x-fa fa-minus-circle red-txt',
                tooltip: 'Remove',
                handler: function(view, rowIndex, colIndex) {
                    //var store = grid.getStore();
                    //store.removeAt(rowIndex);
                    var field = view.grid.up('multiupload').fileUpload,
                        rec = view.getStore().getAt(rowIndex);
                    rec.drop();
                    //view.grid.getSelectionModel().deselectAll();
                    //console.log(rec.id * -1 - 1)
                    if(rec.phantom){
                        field.removeFileFromQueue(rec.id * -1 - 1)
                    }
                }
            }]
        }];
    },

    buildFields: function(){        
        /*
        return [{
            xtype: 'combo',
            name: 'F_CATEGORY',
            fieldLabel: 'Category',
            hideEmptyLabel: false,
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                store: '{types}',
                value: '{components.selection.F_CATEGORY}',
                disabled: '{!components.selection}'
            },
            valueField: "text",
            displayField: "text",
            //forceSelection: true,
            //selectOnFocus: true,
            allowBlank: false,
            editable: false,
            autoLoadOnValue: true,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'all',
            //minChars: 1,
            matchFieldWidth: true,
            plugins: [{
                ptype: "cleartrigger"
            }]
        },{
            xtype: "textfield",
            name: 'F_DESC5',
            fieldLabel: "Body #",
            //hideLabel: true,
            //labelWidth: 50,
            //width: 160,
            bind: {
                value: '{components.selection.F_DESC5}',
                disabled: '{!components.selection}'
            }
        },{
            xtype: "tagfield",
            name: 'F_OWNER',
            fieldLabel: "Original #",
            //labelWidth: 50,
            //width: 160,
            hideTrigger: true,
            bind: {
                //store: '{bodies}',
                value: '{components.selection.F_OWNER}',
                disabled: '{!components.selection}'
            },
            store: 'memBodies',
            remoteStore: 'Bodies',
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            pageSize: 50,
            queryMode: "local",
            //queryParam: "filter",
            //triggerAction: 'last',
            //lastQuery: '',
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                beforequery: function(qe){
                    delete qe.combo.lastQuery;
                }
            }
        },{
            xtype: "textfield",
            name: 'F_DESC7',
            fieldLabel: "Sewing Price",
            //hideLabel: true,
            bind: {
                value: '{components.selection.F_DESC7}',
                disabled: '{!components.selection}'
            }

        },{
            xtype: "combo",
            name: 'F_MFLAG',
            fieldLabel: "Fabric Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{fabricTypes}',
                value: '{components.selection.F_MFLAG}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 25,
            //minChars: 1,
            matchFieldWidth: false,
            listConfig: {
                loadindText: 'Searching...',
                emptyText: 'No matching items found.',
                width: 340
            },
            plugins: [{
                ptype: "cleartrigger"
            }],
            listeners: {
                render: function(c){
                    c.on('focus', function () {
                        c.expand();
                    });
                }
            }
        },{
            xtype: "tagfield",
            name: 'F_DESC2',
            fieldLabel: "Body Type",
            //hideLabel: true,
            hideTrigger: true,
            bind: {
                store: '{bodyTypes}',
                value: '{components.selection.F_DESC2}',
                disabled: '{!components.selection}'
            },
            valueField: "id",
            displayField: "id",
            forceSelection: false,
            selectOnFocus: true,
            queryMode: 'local',
            //queryParam: "filter",
            //triggerAction: 'all',
            //lastQuery: '',
            //filterPickList: true,
            //pageSize: 25,
            //minChars: 1,
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
            xtype: 'textareafield',
            name: 'F_DESC1',
            fieldLabel: 'Description',
            grow: true,
            //hidLabel: true,
            bind: {
                value: '{components.selection.F_DESC1}',
                disabled: '{!components.selection}'
            }
        }];
        */
    }
});



