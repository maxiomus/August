/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'August.Application',

    name: 'August',

    requires: [
        // This will automatically load all classes in the August namespace
        // so that application classes do not need to require each other.
        'August.*'
    ],

    // The name of the initial view to create.
    mainView: 'August.view.main.Main'
});
