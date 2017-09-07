var DELIMITERS = ['${', '}'];

$(document).ready(function(){
    $('#app-1').css('opacity', 1);

    setTimeout(function(){
        $('#avatar-stuff-container').css('opacity', 1);
    }, 1000);

    var nbMinutes = 0.05;
    setTimeout(function() {
        showNotif();
    }, 1000 * 60 * nbMinutes);

});

var assuranceLink = '/fr/particulier/nos-produits/mes-assurances-vehicules/assurances-voitures/moins-de-30-ans';

function goToVaudoisePage(link) {
    $('iframe').attr('src', 'https://www.vaudoise.ch/'+link);
}


var notif = {text:''};

function showNotif(text) {
    notif.text = text;
    setTimeout(function() {
        notif.text = '';
    }, 1000 * 1000);
}
var baseMessage = "Bonjour Philippe, je peux vous aider? ";

var notFoundMessage = "\nJe ne suis pas sûr d'avoir compris.";

window.accountVue = new window.Vue({
       el: '#app-1',
       name: 'textSearch',
       data: function() {
           return {
               textSearch:'',
               currentView: VIEWS.home,
               VIEWS: VIEWS,
               billsAnswers: factures,
               filters:{
                   bills: {}
               },
               message: baseMessage,
               showArm: false,
               notification: notif
           };
       },
       delimiters: DELIMITERS,
       methods: {

           goToAssuranceLink: function() {
               goToVaudoisePage(assuranceLink);
           },

           askQuestion: function() {
               var q = this.textSearch;

               var data = KeyWordsManager.getActionAndData(q);

               console.log(data, q);

               if(!data) {
                   this.currentView = VIEWS.home;

                   return;
               }

               if(data.view !== undefined) {
                   this.currentView = data.view;
               }

               if(data.view === VIEWS.bills) {
                   this.filters.bills = data.filters;
               }

           },


           print: function() {
                this.notification.text = '';
           },

           getBagdeClass: function(bill) {
               if(!bill.paid) {
                   if(bill.month < (new Date()).getMonth()+1) {
                       return 'label-danger';
                   }
                   return 'label-warning';
               } else {
                   return 'label-success';
               }
           },

           questionChange: function() {
                this.askQuestion();
                var messF = MESSAGES[this.currentView];
                var extra = this.textSearch.length > 6 ? notFoundMessage : '';
                this.message = messF ? messF(this.filters) : baseMessage + extra;
           },
       },
       computed: {
            billsFiltered: function() {
                var self = this;
                return this.billsAnswers.filter(function(bill) {

                    console.log(self.filters.bills, bill);

                    if(self.filters.bills.late) {
                        return bill.month < (new Date()).getMonth()+1 && !bill.paid;
                    } else if(self.filters.bills.unpaid) {
                        return !bill.paid;
                    }

                    return true;

                });
            }
       },
       created: function () {

       },
       watch: {

       }
   });


