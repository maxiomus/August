
Ext.define('Ext.overrides.grid.plugin.RowExpander', {
    override: 'Ext.grid.plugin.RowExpander',

    isCollapsed: function (rowIdx) {
        var me = this,
            rowNode = me.view.getNode(rowIdx),
            row = Ext.fly(rowNode, '_rowExpander');

        return row.hasCls(me.rowCollapsedCls)
    },


    collapse: function (rowIdx) {
        if (this.isCollapsed(rowIdx) == false) {
            this.toggleRow(rowIdx, this.grid.getStore().getAt(rowIdx));
        }
    },


    collapseAll: function () {
        for (i = 0; i < this.grid.getStore().getCount(); i++) {
            this.collapse(i);
        }
    },


    expand: function (rowIdx) {
        if (this.isCollapsed(rowIdx) == true) {
            this.toggleRow(rowIdx, this.grid.getStore().getAt(rowIdx));
        }
    },


    expandAll: function () {
        for (i = 0; i < this.grid.getStore().getCount(); i++) {
            this.expand(i);
        }
    }
});