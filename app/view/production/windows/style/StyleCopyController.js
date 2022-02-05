Ext.define('August.view.production.windows.style.StyleCopyController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-style-stylecopy',

    init: function() {

    },

    handleSpecialKey: function(f, e) {
        if(e.getKey() === e.ENTER) {
            var task = new Ext.util.DelayedTask(function(){
                f.fireEvent('triggersearch', f);
            });
            task.delay(10);
        }
    },

    /**
     *
     * @param f Ext.form.field.Text
     * @param c {Object}
     */
    onTriggerSearchClick: function(f, c){
        //console.log(f, c);
        var vm = this.getViewModel(),
            filters = vm.getStore('colors').getFilters(),
            filterSub = new Ext.util.Filter({
                operator: 'st',
                property: 'code',
                value: f.getValue()
            });

        filters.add(filterSub);
    },

    onTriggerClearClick: function(f, c){
        //console.log(f, c);
        var vm = this.getViewModel(),
            filters = vm.getStore('colors').getFilters(),
            filterSub = new Ext.util.Filter({
                operator: 'st',
                property: 'code',
                value: f.getValue()
            });

        filters.remove(filterSub);


    }
});
