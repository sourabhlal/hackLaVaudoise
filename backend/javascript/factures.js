
var Facture = function(title, paid, month) {
    this.title = title;
    this.paid = paid;
    this.month = month;
};



var factures = [
    new Facture('Prime janvier 2017', true, 1),
    new Facture('Prime février 2017', true, 2),
    new Facture('Prime mars 2017', true, 3),
    new Facture('Prime avril 2017', true, 4),
    new Facture('Prime mai 2017', true, 5),
    new Facture('Prime juin 2017', true, 6),
    new Facture('Prime juillet 2017', true, 7),
    new Facture('Prime août 2017', false, 8),
    new Facture('Prime septembre 2017', false, 9)
];
