/**
 * Created by tech on 10/8/2014.
 */
Ext.define('August.view.production.windows.style.LabeltagController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.windows-style-labeltag',

    init: function() {

    },

    onRender: function(win) {
        //console.log(win);
    },

    onPrintClick: function(btn, eOpts) {
        //console.log(Ext.getBody());

        if(this.getView())
        {
            var win = this.getView();
            window.frames['innerFrame'].focus();
            window.frames['innerFrame'].print();

            //console.log(win.body.el.dom.innerHTML);

            //var printwin = window.open('', 'print');
            //printwin.document.open();
            //printwin.document.write(win.body.el.dom.innerHTML);
            //printwin.document.close();

            //printwin.print();

            //printwin.close();
            //win.print();

            //win.document.close();
            //win.print();
            //win.close();

            this.getView().close();
        }
    }
})
