Ext.define('August.view.pim.windows.ProductDescriptModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.pim-windows-productdescript',

    stores: {
        
        styles: {
            model: 'pim.ProductDetail',

            //storeId: 'products',
            autoLoad: false,

            session: true,
            remoteFilter: true,
            remoteSort: true,
            pageSize: 100,

            proxy: {
                type: 'rest',
                url: '/WebApp/api/ProductDetails',         
                
                reader: {
                    type: 'json',
                    rootProperty: 'data'
                    //totalProperty: 'total',
                    //successProperty: 'success'
                }
            },

            listeners: {
                beforeload: function(s){                    
                    s.getProxy().setHeaders({
                        'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
                    })
                }
            }
        },

        voices: {
            fields: ['label', 'value'],
            data: [
                { "label": "Excited", "value": "excited" },
                { "label": "Professional", "value": "professional" },
                { "label": "Funny", "value": "funny" },
                { "label": "Encouraging", "value": "encouraging" },
                { "label": "Dramatic", "value": "dramatic" },
                { "label": "Witty", "value": "witty" },
                { "label": "Sarcastic", "value": "sarcastic" },
                { "label": "Engaging", "value": "engaging" },
                { "label": "Creative", "value": "creative" }
              ]
        },

        sourceFields: {
            fields: ['label', 'value'],
            data: [
                { "label": "N41 Description", "value": "description" },
                { "label": "N41 Memo", "value": "characteristics" },
                { "label": "PIM Feature 1", "value": "feature1" },
                { "label": "PIM Feature 2", "value": "feature2" },
                { "label": "PIM Feature 3", "value": "feature3" },
                { "label": "PIM Feature 4", "value": "feature4" },
                { "label": "PIM Feature 5", "value": "feature5" },
                { "label": "PIM Keywords", "value": "keywords" },
                { "label": "PIM Pattern", "value": "pattern" },
                { "label": "PIM Occasion", "value": "occasion" },
                { "label": "PIM Theme", "value": "theme" }
              ]
        },

        brands: {
            fields: ['label', 'value'],
            data: [
                { "label": "Endless Rose", "value": "ER" },
                { "label": "English Factory", "value": "EF" },
                { "label": "Grey Lab", "value": "GL" },
                { "label": "Free the roses", "value": "FR" }
            ]
        },

        erkeys: {
            fields: ['label', 'value'],
            data: [
                { "label": "Luxury", "value": "luxury", "brand": "ER" },
                { "label": "Chic", "value": "chic", "brand": "ER" },
                { "label": "Elegant", "value": "elegant", "brand": "ER" },
                { "label": "Romantic", "value": "romantic", "brand": "ER" },
                { "label": "Novelty", "value": "novelty", "brand": "ER" }                                                
              ]
        },

        efkeys: {
            fields: ['label', 'value'],
            data: [
                { "label": "Preppy", "value": "preppy", "brand": "EF" },
                { "label": "Comport", "value": "comport", "brand": "EF" },
                { "label": "Cute", "value": "cute", "brand": "EF" },
                { "label": "Cottage core", "value": "cottage core", "brand": "EF" }
            ]
        },

        glkeys: {
            fields: ['label', 'value'],
            data: [
                { "label": "Trendy", "value": "trendy", "brand": "GL" },
                { "label": "Chic", "value": "chic", "brand": "GL" },
                { "label": "Boise", "value": "boise", "brand": "GL" },
                { "label": "Sporty", "value": "sporty", "brand": "GL" },
                { "label": "Structured", "value": "structured", "brand": "GL" }
            ]
        },

        frkeys: {
            fields: ['label', 'value'],
            data: [
                { "label": "Boho", "value": "boho", "brand": "FR" },
                { "label": "Freedom", "value": "freedom", "brand": "FR" },
                { "label": "Naked", "value": "naked", "brand": "FR" },
                { "label": "Earthy", "value": "earthy", "brand": "FR" },
                { "label": "Comfort", "value": "comfort", "brand": "FR" }
            ]
        },
               
        languages: {
            fields: ['label', 'value'],
            data: [
                {"label": "French", "value": "French"}
            ]
        }
    }

});
