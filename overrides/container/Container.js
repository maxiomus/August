/**
 * Created by tech on 11/13/2015.
 */
Ext.define('Ext.overrides.container.Container', {
   override: 'Ext.container.Container',

    print: function(pnl, css){
        if (!pnl) {
            pnl = this;
        }
        //console.log(pnl);
        // instantiate hidden iframe        

        var iFrameId = "printerFrame";
        var printFrame = Ext.get(iFrameId);

        if (printFrame == null) {
            printFrame = Ext.getBody().appendChild({
                id: iFrameId,
                tag: 'iframe',
                cls: 'x-hidden',
                style: {
                    display: "none"
                }
            });
        }

        var cw = printFrame.dom.contentWindow;        
        
        // instantiate application stylesheets in the hidden iframe

        var stylesheets = "";
        /*for (var i = 0; i < document.styleSheets.length; i++) {
            stylesheets += Ext.String.format('<link rel="stylesheet" href="{0}" />', document.styleSheets[i].href);
        }*/

        var ssTemplate = ''.concat(                                      
            '@page { width: 8.5in; height: 11in; margin: 0; } ',            
            //'@media screen { width: 8.5in; height: 11in; margin: 0; } ',

            '@media print {',                                
                
                'html, body { width: 8.75in; height: 11in; margin:0; font-family: "Helvetica Neue", Arial, Helvetica, sans-serif; } ',
                '.sheet { page-break-inside: avoid; page-break-before: always; } ',
                '.pagebreak { page-break-inside: avoid; page-break-after: always; } ',          

                '.price-tag-view .item-selector {',
                    //'-moz-border-radius:.7em;',
                    //'-webkit-border-radius:.7em;',
                    //'border-radius:.7em;',
                    'background: #ffffff;',
                    //'border: 1px solid #1c1c1c;',
                    'float: left;',
                    'margin: 0 0.13in 0 0;',
                    'width: 2.66in;',
                    'height: 0.99in;',
                    'padding: 7px 0 0 7px;', 
                    'border-collapse: collapse;',
                    'cursor: pointer;',
                '} ',      
                '.price-tag-view .item-boxer {',
                    'display: table;',
                    'border-collapse: collapse;',
                '} ',
                '.price-tag-view .item-boxer .box-row {',
                    'display: table-row;',
                    'border-collapse: collapse;',
                '} ',
                    '.price-tag-view .item-boxer .center {',
                    'text-align: center;',
                '} ',    
                    '.price-tag-view .item-boxer .right {',
                    'text-align: right;',
                '} ',     
                '.price-tag-view .item-boxer .box {',
                    'display: table-cell;',
                    //'padding: 0px 2px 0px 2px;',
                    'vertical-align: middle;',
                '} ',                                                    
                '.price-tag-view .item-boxer .nb {',
                    'border: none;',
                '} }'                                                            
        );

        // various style overrides
        stylesheets += ''.concat(
            '<style type="text/css">',              
            '.x-panel-body {overflow: visible !important;}',
            css,
            // experimental - page break after embedded panels
            // .x-panel {page-break-after: always; margin-top: 10px}",
            '</style>'
        );

        /*
        var cssLink = cw.document.createElement("link");
        cssLink.rel = "stylesheet"; 
        cssLink.href = "resources/css/priceTag.css";         
        cssLink.type = "text/css"; 

        cw.document.head.appendChild(cssLink);    

        var link = "";
        if(css !== undefined){
            link = Ext.String.format('<link rel="stylesheet" href=\"{0}\" type="text/css" />', css);
        }
        */
        
        // css:example -  http://www.dynamicdrive.com/ddincludes/mainstyle.css
        // get the contents of the panel and remove hardcoded overflow properties
        //var toolbar = pnl.down('toolbar');

        var markup = pnl.getEl().dom.innerHTML;
        while (markup.indexOf('overflow: auto;') >= 0) {
            markup = markup.replace('overflow: auto;', '');
        }

        var str = Ext.String.format('<html><head>{0}</head><body>{1}</body></html>', stylesheets, markup);

        // output to the iframe
        cw.document.open();        
        cw.document.write(str);
        cw.document.close();

        //cw.focus();
        // remove style attrib that has hardcoded height property
        cw.document.getElementsByTagName('div')[0].removeAttribute('style');        
        
        // print the iframe
        console.log('container print', cw);
        cw.print();

        // destroy the iframe
        Ext.fly(iFrameId).destroy();
    }
});
