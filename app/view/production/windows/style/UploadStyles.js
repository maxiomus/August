Ext.define('August.view.production.windows.style.UploadStyles',{
    extend: 'Ext.window.Window',

    requires: [
        'Ext.ux.view.Upload'
    ],

    alias: 'widget.windows-style-uploadstyles',

    viewModel: {
        stores: {
            files: {
                model: 'August.model.File'
            }
        }
    },

    header: {
        title: 'Style List Import',
        iconCls: 'x-fa fa-file-import',
        titlePosition: 0,
        titleAlign: 'left'
    },

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    padding: 10,

    /*
    bind: {
        title: 'Upload Styles List'
    },
    */

    width: 960,
    height: 480,

    //minWidth: 720,
    //minHeight: 480,

    //modal: true,
    monitorResize: true,
    maximizable: true,
    constrain: true,
    closable: true,

    tools: [{
        type: 'pin'
    }],    

    listeners: {
        actremoveall: {
            fn: 'onToolbarRemoveClick'
        }     
    },

    initComponent: function() {
        var me = this;

        // Calculating the textfield height..            
        me.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            ui: 'header',
            items: [
                {
                    action: 'remove',
                    text: 'Remove All',                    
                    iconCls: 'x-fa fa-cog',
                    tooltip: 'Remove All',
                    handler: function(item){
                        me.fireEvent("actremoveall", me, item);
                    },
                    scope: me
                },'->'
            ]
        },{
            xtype: 'toolbar',
            dock: 'bottom',
            //reference: 'topbar',
            ui: 'footer',
            defaults: {
                //minWidth: 200
            },
            items: ['->', {
                action: 'upload',
                text: 'Upload',                
                //glyph: 86,
                iconCls: 'x-fa fa-upload',
                handler: function(btn){
                    me.fireEvent('uploadclick', btn, me);
                }
            },{
                action: 'close',
                text: 'Close',
                //glyph: 88,
                iconCls: 'x-far fa-times-circle',
                handler: function(btn){
                    me.close();
                }
            }]
        }],

        Ext.applyIf(me, {

            items: [{
                xtype: 'viewupload',
            
                selectionModel: {
                    mode: 'multi'
                },
            
                cls: 'sample-attach-view',
                overItemCls: "x-item-over",
                itemSelector: "div.thumb-wrap",
            
                preserveScrollOnRefresh: true,
                deferInitialRefresh: true,
                enableTextSelection: false,
            
                scrollable: true,
                region: 'center',
                padding: 10,
                flex: 1,
            
                bind: {
                    store: '{files}'
                },
            
                tpl: new Ext.XTemplate(
                    '<tpl for=".">',
                        '<div class="thumb-wrap x-unselectable">',
                        //'<a class="link" href="{linkUrl}">',
                            '<div class="thumb">',                                
                                '<i class="{name:this.getFileType} fa-5x" style="padding-top:20px;"></i>',                                
                                '<div class="title">{name}</div>',
                            '</div>',
                        //'</a>',
                        '</div>',
                    '</tpl>',
                    '<div class="x-clear"></div>',
                    {
                        getFileName: function(v){
                            var a = v.split('_'),
                                name = a[0] + ' ' +a[1] + ' ' + a[2];                                    
            
                            return Ext.String.ellipsis(name, 30);
                        }
                    },
                    {
                        getFileType: function(v){
                            var a = ['txt', 'pdf', 'xlsx', 'docx', 'csv', 'ppt'];
                            var ext = v.split('.')[1],
                                prx = 'r',
                                label = ext;
                            
                            switch(ext){
                                case 'xlsx': 
                                    label = 'excel';
                                    break;
                                case 'docx':
                                    label = 'word';
                                    break;
                                case 'txt':
                                    label = 'alt'
                                    break;       
                                case 'ppt':
                                    label = 'powerpoint'
                                    break;
                                case 'csv':
                                    prx = 's';
                                    break;                         
                            }

                            for(var i = 0; i < a.length; i++){
                                if(v.indexOf(a[i]) != -1) {
                                    return Ext.String.format('fa{0} fa-file-{1}', prx, label);
                                }
                            }
            
                            return '';
                        }
                    }
                ),
                listeners: {
                    
                    render: function(c){                                                
                        var toolbar = me.down('toolbar[dock=top]');
            
                        toolbar.add(c.fileUpload);                                                            
                    },

                    /*
                    menuefreshclick: {
                        fn: 'onMenuRefreshClick',
                        scope: this.controller
                    },
            
                    menuremoveclick: {
                        fn: 'onMenuRemoveClick',
                        scope: this.controller
                    },

                    itemdblclick: {
                        fn: 'onAttachItemDblClick',
                        scope: this.controller
                    },

                    selectionchange: {
                        fn: 'onItemSelectionChange',
                        scope: this.controller
                    },
                    */
                    dropped: {
                        fn: 'onFileDropped',
                        scope: this
                    }                    
                }
            }]
                        
        });

        me.callParent(arguments);

    },    

    onFileDropped: function(view, recs) {
        console.log(view, recs);
    }
})


