/**
 * This class provides the modal Ext.Window support for all Authentication forms.
 * It's layout is structured to center any Authentication dialog within it's center,
 * and provides a backGround image during such operations.
 */
 Ext.define('August.view.authenticate.LockingWindow', {
    extend: 'Ext.window.Window',
    xtype: 'lockingwindow',

    cls: 'auth-locked-window',

    closable: false,
    resizable: false,
    scrollable: false,
    autoShow: true,
    titleAlign: 'center',
    maximized: true,
    modal: true,
    frame: true,
    frameHeader: false,

    layout: {
        type: 'vbox',
        align: 'center',
        pack: 'center'
    }
});