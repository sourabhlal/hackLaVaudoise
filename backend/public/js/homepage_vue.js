function goToVaudoisePage(e){$("iframe").attr("src","https://www.vaudoise.ch/"+e)}function showNotif(e){notif.text=e,setTimeout(function(){notif.text=""},1e6)}var DELIMITERS=["${","}"];$(document).ready(function(){$("#app-1").css("opacity",1),setTimeout(function(){$("#avatar-stuff-container").css("opacity",1)},1e3);setTimeout(function(){showNotif()},3e3)});var assuranceLink="/fr/particulier/nos-produits/mes-assurances-vehicules/assurances-voitures/moins-de-30-ans",notif={text:""},baseMessage="Bonjour Philippe, je peux vous aider? ",notFoundMessage="\nJe ne suis pas sûr d'avoir compris.";window.accountVue=new window.Vue({el:"#app-1",name:"textSearch",data:function(){return{textSearch:"",currentView:VIEWS.home,VIEWS:VIEWS,billsAnswers:factures,filters:{bills:{}},message:baseMessage,showArm:!1,notification:notif}},delimiters:DELIMITERS,methods:{goToAssuranceLink:function(){goToVaudoisePage(assuranceLink)},askQuestion:function(){var e=this.textSearch,t=KeyWordsManager.getActionAndData(e);console.log(t,e),t?(void 0!==t.view&&(this.currentView=t.view),t.view===VIEWS.bills&&(this.filters.bills=t.filters)):this.currentView=VIEWS.home},print:function(){this.notification.text=""},getBagdeClass:function(e){return e.paid?"label-success":e.month<(new Date).getMonth()+1?"label-danger":"label-warning"},questionChange:function(){this.askQuestion();var e=MESSAGES[this.currentView],t=this.textSearch.length>6?notFoundMessage:"";this.message=e?e(this.filters):baseMessage+t}},computed:{billsFiltered:function(){var e=this;return this.billsAnswers.filter(function(t){return console.log(e.filters.bills,t),e.filters.bills.late?t.month<(new Date).getMonth()+1&&!t.paid:!e.filters.bills.unpaid||!t.paid})}},created:function(){},watch:{}});