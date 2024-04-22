
Ext.define('August.view.pim.Topbar',{
    extend: 'Ext.toolbar.Toolbar',

    alias: 'widget.pim-topbar',

    requires: [
        //'August.view.pim.TopBarController',
        //'August.view.pim.TopBarModel'
    ],
    /*
    controller: 'sample-edit-topbar',
    viewModel: {
        type: 'sample-edit-topbar'
    },
    */
    width: "100%",
    enableOverflow: true,
    defaultActionType: 'button',

    defaults: {
        ui: 'default'
    },

    initComponent: function(c){
        var me = this;

        Ext.applyIf(me, {

        });
        
        me.items = me.buildItems();

        me.callParent(arguments);
    },

    buildItems: function(){
        var me = this;

        return [{
            iconCls: 'x-fa fa-sync-alt',
            text: 'Refresh',
            ui: 'default',
            //glyph:'xf0c7@FontAwesome',
            hidden: false,
            tooltip: 'Refresh View',
            handler: 'onRefresh'
        },{
            iconCls: 'x-fa fa-save',
            //reference: 'save',
            text: 'Save',
            nextStep: 'save',
            tooltip: 'Save the Data',                
            handler: 'onSave'                
        },{
            iconCls: 'x-far fa-times-circle',
            text: 'Close',
            //glyph:'xf0c7@FontAwesome',
            tooltip: 'Close View',
            handler: 'onClose'
        },'-', {
            xtype: 'toolbar',
            reference: 'photoCrud',
            margin: 0,            
            padding: 0,
            hidden: true,
            items: [{
                text: 'New',
                iconCls: 'x-fa fa-plus-circle',
                //glyph:'xf0c7@FontAwesome',
                tooltip: 'Add Item',
                //reference: 'add',
                //ui: 'default',
                handler: 'onAddItemClick',
                scope: this.controller
            },            
            {
                text: 'Edit',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit Item',
                //reference: 'edit',
                bind: {
                    disabled: '{!selection}'
                },
                handler: 'onEditItemClick',
                scope: this.controller
            },
            {
                text: 'Delete',
                iconCls: 'x-fa fa-minus-circle',
                tooltip: 'Delete Item',
                //reference: 'remove',
                bind: {
                    disabled: '{!selection}'
                },
                handler: 'onDeleteItemClick',
                scope: this.controller
            }]
        }];
    }
});
