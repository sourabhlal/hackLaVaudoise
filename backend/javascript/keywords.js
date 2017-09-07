
 var KEYWORDS = [{
        keywords: ['facture', 'payé', 'payés', 'payer', 'paiement'],
        getActionAndData: function(keywords, text) {

            var data = {view: VIEWS.bills, filters:{}};

            var unpaid = ['impayé', 'impayés', 'à payer'];
            var unpaidK = getKeyword(text, unpaid);

            if(unpaidK) {
                data.filters.unpaid = true;
            }

            var late = ['retar'];
            var lateK = getKeyword(text, late);

            if(lateK) {
                data.filters.late = true;
            }

            return data;
        }
    },
     {
         keywords: ['sinistr'],
         getActionAndData: function(keywords, text) {

             var data = {view: VIEWS.sinistres, filters:{}};

             /*
             var unpaid = ['impayé', 'impayés', 'à payer'];
             var unpaidK = getKeyword(text, unpaid);

             if(unpaidK) {
                 data.filters.unpaid = true;
             }

             var late = ['retar'];
             var lateK = getKeyword(text, late);

             if(lateK) {
                 data.filters.late = true;
             }
              */

             return data;
         }
     },

     {
         keywords: ['police', 'assurance', 'couvert', 'information', 'assuré'],
         getActionAndData: function(keywords, text) {

             var data = {view: VIEWS.info, filters:{}};

              var panne = ['panne', 'essence'];
              var panneK = getKeyword(text, panne);

              if(panneK) {
                data.filters.panne = true;
              }


             var accident = ['accident', 'crash'];
             var accidentK = getKeyword(text, accident);

             if(accidentK) {
                 data.filters.accident = true;
             }


             return data;
         }
     }

 ];


var getKeyword = function(text, keywords) {
    text = text.toLowerCase();
    return keywords.find(function(word) {
        word.toLowerCase();
        return text.indexOf(word) !== -1;
    });
};

var KeyWordsManager = {
    getActionAndData: function(text) {

        var key = KEYWORDS.find(function(keyword) {

            return getKeyword(text, keyword.keywords);

            /*
            return keyword.keywords.split(' ').find(function(word) {
                return text.indexOf(word) !== -1;
            });
            */
        });

        if(key) {
            return key.getActionAndData(key.keywords, text);
        }

    }
};
