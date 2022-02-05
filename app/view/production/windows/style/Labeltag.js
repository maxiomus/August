/**
 * Created by tech on 10/8/2014.
 */
Ext.define('August.view.production.windows.style.Labeltag', {
    extend: 'Ext.window.Window',

    requires: [
        'August.view.production.windows.style.LabeltagController',
        //'August.view.production.sample.windows.LabeltagModel'
        'Ext.ux.IFrame'
    ],

    alias: 'widget.windows-style-labeltag',

    controller: "windows-style-labeltag",
    /*
    viewModel: {
        type: "sample"
    },
    */

    title: 'Print Tag Label',

    minWidth: 400,
    //minHeight: window.innerHeight - 80,
    maxHeight: 600,

    closable: true,
    closeAction: 'destroy',

    bodyStyle: {
        background:'#fff',
        padding: '5px 0 0 2px'
    },

    resizable: false,
    modal: true,

    layout: {
        type: 'fit'
    },

    //loader: {
    //    url: 'PrintTag.aspx',
    //    autoLoad: false
    //},

    buttons: [{
        xtype: 'button',
        action: 'print',
        itemId:'btnPrint',
        text: 'Print',
        iconCls: 'x-fa fa-print',
        //glyph: 'xf00c@FontAwesome'
        handler: 'onPrintClick',
        scope: this.controller
    },
    {
        xtype: 'button',
        action: 'close',
        itemId: 'btnClose',
        text: 'Close',
        iconCls: 'x-far fa-times-circle',
        //glyph: 'xf00d@FontAwesome'
        handler: function(btn, e){
            btn.up('window').close();
        }
    }],

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {

        });

        me.callParent(arguments);
    }
});
