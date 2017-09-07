
var MESSAGES = {};

MESSAGES[VIEWS.bills] = function(filters) {
    if(filters.bills) {
        if(filters.bills.unpaid || filters.bills.late) {
            return 'Voulez-vous obtenir un délai pour le paiement?';
        }

        return "Voici vos factures. Avez-vous besoin d'autre chose?"
    }
};

MESSAGES[VIEWS.sinistres] = function() {
    return "Voici la situation à propos de votre annonce de sinistre.";
};

MESSAGES[VIEWS.info] = function() {
   return 'Cela répond-il à la question?'
};