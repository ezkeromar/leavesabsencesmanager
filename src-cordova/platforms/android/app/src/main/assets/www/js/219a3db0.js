(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["219a3db0"],{"0cdc":function(e,a,t){"use strict";t.d(a,"l",function(){return s}),t.d(a,"h",function(){return i}),t.d(a,"o",function(){return d}),t.d(a,"s",function(){return c}),t.d(a,"t",function(){return r}),t.d(a,"n",function(){return l}),t.d(a,"q",function(){return u}),t.d(a,"f",function(){return m}),t.d(a,"a",function(){return g}),t.d(a,"b",function(){return f}),t.d(a,"d",function(){return p}),t.d(a,"c",function(){return h}),t.d(a,"g",function(){return b}),t.d(a,"m",function(){return C}),t.d(a,"i",function(){return $}),t.d(a,"e",function(){return y}),t.d(a,"p",function(){return v}),t.d(a,"k",function(){return w}),t.d(a,"j",function(){return _}),t.d(a,"r",function(){return S});t("f751"),t("386d");var n=t("9dce"),o=t("e00b"),s=function(){var e={params:{}};n["a"].post("api/notifyManagerTwoDaysBeforLeaveStartAPI",{},e).then(function(e){o["a"].$emit("getCongetoValidateCountSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongetoValidateCountFailed",e.response)})},i=function(e){var a=e.term,t={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{search:a}};n["a"].post("api/listCollaborateurAPI",{},t).then(function(e){o["a"].$emit("getColabsSuccess",e.data)}).catch(function(e){o["a"].$emit("getColabsFailed",e.response)})},d=function(e){var a=e.id,t={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:a}};n["a"].post("api/getNumberOfLeaveDaysAllowed",{},t).then(function(e){o["a"].$emit("getTempSoldeColabsSuccess",e.data)}).catch(function(e){o["a"].$emit("getTempSoldeColabsFailed",e.response)})},c=function(e){var a=e.dateStart,t=e.dateEnd,s=e.morning,i=e.afternoon,d={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{dateDeDebut:a,dateDeFin:t,typeDebut:s,typeFin:i,jsonReturn:!0}};n["a"].post("api/soumettreDemande",{},d).then(function(e){o["a"].$emit("congeCreateSuccess",e.data)}).catch(function(e){o["a"].$emit("congeCreateFailed",e.response)})},r=function(e){var a=e.dateStart,t=e.dateEnd,s=e.morning,i=e.afternoon,d=e.id,c={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{dateDeDebut:a,dateDeFin:t,typeDebut:s,typeFin:i,id:d,jsonReturn:!0}};n["a"].post("api/soumettreDemandeAnterieurAPI",{},c).then(function(e){o["a"].$emit("storeAnterieurSuccess",e.data)}).catch(function(e){o["a"].$emit("storeAnterieurFailed",e.response)})},l=function(){var e={params:{}};n["a"].post("api/congeNouvelleDemande",{},e).then(function(e){o["a"].$emit("getReliquatsSuccess",e.data)}).catch(function(e){o["a"].$emit("getReliquatsFailed",e.response)})},u=function(e){var a=e.page,t=e.maxRows,s={params:{page:a,maxRows:t}};n["a"].post("api/congeJoursFeriersAPI",{},s).then(function(e){o["a"].$emit("requestHolidaysSuccess",e.data)}).catch(function(e){o["a"].$emit("requestHolidaysFailed",e.response)})},m=function(e){var a=e.periodPaiment,t={params:{periodPaiment:a}};n["a"].post("api/exportDemandCongePayeeAsExcel",{},t).then(function(e){o["a"].$emit("exportPaiePeriodeDemandesSuccess",e.data)}).catch(function(e){o["a"].$emit("exportPaiePeriodeDemandesFailed",e.response)})},g=function(e){var a=e.props,t={params:{id:a.id,codeConge:a.codeConge,droit:a.droit}};n["a"].post("api/addOrUpdateCodeCongeAPI",{},t).then(function(e){o["a"].$emit("addCodeCongeSuccess",e.data)}).catch(function(e){o["a"].$emit("addCodeCongeFailed",e.response)})},f=function(e){var a=e.props,t=e.dateDebutJourFerier,s={params:{id:a.id,intitule:a.intitule,dateDebutJourFerier:t,nBJourFerier:a.nBJourFerier}};n["a"].post("api/addOrUpdateCongeJoursFeriersAPI",{},s).then(function(e){o["a"].$emit("addHolidaySuccess",e.data)}).catch(function(e){o["a"].$emit("addHolidayFailed",e.response)})},p=function(e){var a=e.id,t={params:{id:a}};n["a"].post("api/deleteCongeJoursFeriersAPI",{},t).then(function(e){o["a"].$emit("deleteHolidaySuccess",e.data)}).catch(function(e){o["a"].$emit("deleteHolidayFailed",e.response)})},h=function(e){var a=e.props,t={params:{id:a.id}};n["a"].post("api/deleteCodeCongeAPI",{},t).then(function(e){o["a"].$emit("deleteCodeCongeSuccess",e.data)}).catch(function(e){o["a"].$emit("deleteCodeCongeFailed",e.response)})},b=function(){var e={params:{}};n["a"].post("api/codeCongeAPI",{},e).then(function(e){o["a"].$emit("getCodeCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCodeCongesFailed",e.response)})},C=function(e){var a=e.menuTable,t={params:{menuTableId:a}};n["a"].post("api/listMenuOptionsAPI",{},t).then(function(e){o["a"].$emit("getMenuTableSuccess",e.data)}).catch(function(e){o["a"].$emit("getMenuTableFailed",e.response)})},$=function(e){var a=e.code,t=e.maxRows,s=e.descending,i=e.column,d=e.search,c=e.dateStart,r=e.dateEnd,l=e.page,u={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{code:a,maxRows:t,descending:s,column:i,search:d,dateStart:c,dateEnd:r,page:l}};n["a"].post("api/listDemandeCongeAPI",{},u).then(function(e){o["a"].$emit("getCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongesFailed",e.response)})},y=function(e){var a=e.code,t=e.maxRows,s=e.descending,i=e.column,d=e.search,c=e.dateStart,r=e.dateEnd,l=e.page,u={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{filterType:a,maxRows:t,descending:s,column:i,search:d,dateStart:c,dateEnd:r,page:l}};n["a"].post("api/listDemandeCongeEnCoursAPI",{},u).then(function(e){o["a"].$emit("getCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongesFailed",e.response)})},v=function(e){var a=e.maxRows,t=e.descending,s=e.column,i=e.search,d=e.page,c={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{maxRows:a,descending:t,column:s,search:i,page:d}};n["a"].post("api/blockedAndUnblockedUsersAPI",{},c).then(function(e){o["a"].$emit("getUserstoBlockUnblockSuccess",e.data)}).catch(function(e){o["a"].$emit("getUserstoBlockUnblockFailed",e.response)})},w=function(e){var a=e.datePaiment,t=e.code,s=e.maxRows,i=e.descending,d=e.column,c=e.search,r=e.dateStart,l=e.dateEnd,u=e.page,m={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{code:t,maxRows:s,descending:i,column:d,search:c,dateStart:r,dateEnd:l,page:u,datePaiment:a}};n["a"].post("api/listDemandeCongeAPI",{},m).then(function(e){o["a"].$emit("getCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongesFailed",e.response)})},_=function(e){var a=e.reference,t={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:a}};n["a"].post("api/historiqueDemandeCongeCollaborateurAPI",{},t).then(function(e){o["a"].$emit("getCongeHistorySuccess",e.data)}).catch(function(e){o["a"].$emit("getCongeHistoryFailed",e.response)})},S=function(e){var a=e.code,t=e.rows,s=e.comment,i=e.soldtoRegulize,d=e.datePaiment,c="";switch(a){case"congeValidated":Array.isArray(t)?(c="api/validerManagerToutesDemandeAPI",t=Object.assign({},t)):c="api/validerManagerDemandeAPI";break;case"congerejected":c="api/refuserManagerDemandeAPI";break;case"congeCanceled":c="api/annulerManagerDemandeAPI";break;case"payConge":c="api/payerCongeAPI",t=Array.isArray(t)?Object.assign({},t):Object.assign({},[t]);break;case"regulariserConge":Array.isArray(t)?(c="api/regulariserToutesDemandesAPI",t=Object.assign({},t)):c="api/regulariserCongeAPI";break;case"aRegulariserConge":c="api/aRegulariserCongeAPI";break;case"UnblockCollab":Array.isArray(t)?(c="api/UnblockUserFromDemandeCongeAPI",t=Object.assign({},t)):c="api/blockOrUnblockUserFromDemandeCongeAPI";break;case"blockCollab":c="api/blockOrUnblockUserFromDemandeCongeAPI";break;case"congeSansSuite":Array.isArray(t)?(c="api/updateEtatForAllDemandeEnCours",t=Object.assign({},t)):c="api/updateEtatDemandeEnCours";break}var r={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:t,comment:s,sold_a_reg:i,datePaiment:d}};n["a"].post(c,{},r).then(function(e){o["a"].$emit("sendActionsSuccess",e.data)}).catch(function(e){o["a"].$emit("sendActionsFailed",e.response)})}},"24e4":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"row congeCreate"},[!1===e.showDialog?t("div",{staticClass:"col-md-9 congeCreateContainer"},[t("q-card",{staticClass:"congeCreateCard"},[t("q-card-title",[t("span",[t("i",{staticClass:"fa fa-info-circle congeCreateListIcon"}),t("q-tooltip",[e._v(e._s(e.$t("demande.conge.actualSoldeTooltip")))])],1),e._v("\n        "+e._s(e.$t("demande.conge.actualSolde"))+": "+e._s(e.soldes.solde_total)+" "+e._s(e.soldes.solde_total>1?e.$t("demande.conge.days"):e.$t("demande.conge.day"))+"\n      ")]),t("q-card-main",[t("q-table",{staticClass:"congeCreateTable",attrs:{data:e.tableData,columns:e.columns,"row-key":"name",pagination:e.serverPagination,"rows-per-page-options":[0],loading:e.loading,"hide-bottom":""},on:{"update:pagination":function(a){e.serverPagination=a},request:e.request}})],1)],1),t("q-card",{staticClass:"congeCardCreateB"},[t("q-card-title",[e._v("\n        "+e._s(e.$t("demande.conge.congedemande"))+"\n      ")]),t("q-card-main",[t("div",{staticClass:"row"},[t("div",{staticClass:"col-md-6"},[t("ul",{staticClass:"congeCreateList"},[t("li",[t("span",[t("q-tooltip",[e._v(e._s(e.$t("demande.conge.regulizeSoldeTooltip")))]),t("i",{staticClass:"fa fa-info-circle congeCreateListIcon"})],1),t("span",[e._v(e._s(e.$t("demande.conge.regulizeSolde")))]),t("span",[e._v(": "),t("b",[e._v(e._s(e.soldes.soldeARegulariser)+" "+e._s(e.soldes.soldeARegulariser>1?e.$t("demande.conge.days"):e.$t("demande.conge.day")))])])]),t("li",[t("span",[t("i",{staticClass:"fa fa-info-circle congeCreateListIcon"}),t("q-tooltip",[e._v(e._s(e.$t("demande.conge.waitValidationTooltip")))])],1),t("span",[e._v(e._s(e.$t("demande.conge.waitValidation")))]),t("span",[e._v(": "),t("b",[e._v(e._s(e.soldes.count_conge_en_cours_validation)+" "+e._s(e.soldes.count_conge_en_cours_validation>1?e.$t("demande.conge.days"):e.$t("demande.conge.day")))])])]),t("li",[t("span",[t("i",{staticClass:"fa fa-info-circle congeCreateListIcon"}),t("q-tooltip",[e._v(e._s(e.$t("demande.conge.waitPaiementTooltip")))])],1),t("span",[e._v(e._s(e.$t("demande.conge.waitPaiement")))]),t("span",[e._v(": "),t("b",[e._v(e._s(e.soldes.count_conge_validee)+" "+e._s(e.soldes.count_conge_validee>1?e.$t("demande.conge.days"):e.$t("demande.conge.day")))])])]),t("li",[t("span",[t("i",{staticClass:"fa fa-info-circle congeCreateListIcon"}),t("q-tooltip",[e._v(e._s(e.$t("demande.conge.TempSoldeTooltip")))])],1),t("span",[e._v(e._s(e.$t("demande.conge.TempSolde")))]),t("span",[e._v(": "),t("b",[e._v(e._s(e.soldes.solde_temporaire)+" "+e._s(e.soldes.solde_temporaire>1?e.$t("demande.conge.days"):e.$t("demande.conge.day")))])])]),t("li",[t("span",[t("i",{staticClass:"fa fa-info-circle congeCreateListIcon"}),t("q-tooltip",[e._v(e._s(e.$t("demande.conge.prorataTooltip")))])],1),t("span",[e._v(e._s(e.$t("demande.conge.prorata")))]),t("span",[e._v(": "),t("b",[e._v(e._s(e.soldes.prorata)+" "+e._s(e.soldes.prorata>1?e.$t("demande.conge.days"):e.$t("demande.conge.day")))])])])])]),t("div",{staticClass:"col-md-6"},[t("div",{staticClass:"row"},[t("q-field",{staticClass:"col-md-6"},[t("q-datetime",{staticClass:"congeDatePicker",attrs:{color:"#949292",minimal:!0,format:"DD/MM/YYYY",placeholder:this.$t("demande.conge.dateStart"),type:"date",value:e.dateStart},on:{change:function(a){e.dateStart=a,e.showDateDiff()}}})],1),t("div",{staticClass:"col-md-5 flex justify-center items-center"},[t("q-toggle",{staticClass:"congeSwitch",attrs:{color:"#fbd46b",icon:e.isMorningIcon,value:e.morning},on:{change:function(a){e.morning=a,e.showDateDiff()}}})],1)],1),t("div",{staticClass:"row"},[t("q-field",{staticClass:"col-md-6"},[t("q-datetime",{staticClass:"congeDatePicker",attrs:{color:"#949292",minimal:!0,format:"DD/MM/YYYY",placeholder:this.$t("demande.conge.dateEnd"),type:"date",value:e.dateEnd},on:{change:function(a){e.dateEnd=a,e.showDateDiff()}}})],1),t("div",{staticClass:"col-md-5 flex justify-center items-center"},[t("q-toggle",{staticClass:"congeSwitch congeSwitchEnd",attrs:{color:"#001165",icon:e.afternoonIcon,value:e.afternoon},on:{change:function(a){e.afternoon=a,e.showDateDiff()}}})],1)],1)])]),t("q-card-actions",[t("q-btn",{staticClass:"congeBtnSend",attrs:{label:this.$t("demande.conge.send"),color:"primary"},on:{click:e.storeFunc}}),t("q-btn",{staticClass:"congeBtnCancel",attrs:{label:this.$t("demande.conge.cancel"),color:"white"},on:{click:e.clearForm}})],1)],1)],1)],1):t("div",{staticClass:"congeCreateContainer"},[t("div",{staticClass:"alert alert-info permisionMessage"},[t("strong",[e._v(e._s(e.$t("demande.conge.info"))+"!")]),e._v(" "+e._s(e.$t(e.permisionCaption))+".\n    ")])])])},o=[];n._withStripped=!0;var s=t("2b0e"),i=t("e00b"),d=t("012a"),c=t("0cdc"),r=t("6458"),l=s["a"].extend({name:"createConge",data(){return{daysNumber:0,loading:!1,serverPagination:{page:1,rowsNumber:0},dateStart:Object(d["a"])().format(),dateEnd:Object(d["a"])().format(),morning:!1,afternoon:!0,columns:[{name:"annee",required:!0,label:this.$t("demande.conge.year"),align:"left",field:"annee"},{name:"ddroitAnnuelesc",required:!0,label:this.$t("demande.conge.annualRights"),align:"left",field:"droitAnnuel"},{name:"jours_comptabilisés",required:!0,label:this.$t("demande.conge.comptabilisedDays"),align:"left",field:"jours_comptabilisés"},{name:"jours_consommes",required:!0,label:this.$t("demande.conge.comsomedDays"),align:"left",field:"jours_consommes"},{name:"solde",required:!0,label:this.$t("demande.conge.solde"),align:"left",field:"solde"}],tableData:[],isMorningIcon:"fa fa-cloud-sun",afternoonIcon:"fa fa-moon",soldes:[],showDialog:!1,permisionCaption:""}},mounted(){let e=this;e.$store.commit("Dashboard/setActiveMenu","1000"),i["a"].$on("congeCreateSuccess",function(a){e.$router.push("/admin/conge/list"),r["b"].create({icon:"fa fa-thumbs-up",message:e.$t(a.title),color:"white"})}),i["a"].$on("congeCreateFailed",function(a){void 0!==a&&(401===a.status&&e.$store.commit("Auth/setExpiredError",!0),400===a.status&&e.showErrors(a.data))}),i["a"].$on("getReliquatsSuccess",function(a){e.loading=!1,e.tableData=a.data,e.soldes=a}),i["a"].$on("getReliquatsFailed",function(a){e.loading=!1,void 0!==a&&(401===a.status&&e.$store.commit("Auth/setExpiredError",!0),400===a.status&&(e.permisionCaption=a.data.text,e.showDialog=!0))}),this.request(),this.showDateDiff(!0)},methods:{showErrors(e){var a=JSON.parse(JSON.stringify(e));r["b"].create({type:"negative",icon:"fa fa-times",message:this.$t(a.title),color:"white"})},storeFunc(){"true"===this.$store.state.Auth.user.isBlocked?r["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.blockedAddConge"),color:"white"}):Object(d["a"])().diff(Object(d["a"])(this.dateStart),"days")>0?r["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.dateInPasteERR"),color:"white"}):this.daysNumber>0?("Sat"===Object(d["a"])(this.dateStart).format("ddd")&&(this.dateStart=Object(d["a"])(this.dateStart).add(2,"days").format()),"Sun"===Object(d["a"])(this.dateStart).format("ddd")&&(this.dateStart=Object(d["a"])(this.dateStart).add(1,"days").format()),"Sat"===Object(d["a"])(this.dateEnd).format("ddd")&&(this.dateEnd=Object(d["a"])(this.dateEnd).subtract(1,"days").format()),"Sun"===Object(d["a"])(this.dateEnd).format("ddd")&&(this.dateEnd=Object(d["a"])(this.dateEnd).subtract(2,"days").format()),r["a"].create({title:this.$t("demande.conge.confirmation"),message:this.$t("demande.conge.youWantContinue"),ok:{label:this.$t("demande.conge.validate"),color:"primary"},cancel:{label:this.$t("demande.conge.cancel"),color:"white"}}).then(()=>{c["s"]({dateStart:Object(d["a"])(this.dateStart).format("DD-MM-YYYY"),dateEnd:Object(d["a"])(this.dateEnd).format("DD-MM-YYYY"),morning:!this.morning,afternoon:this.afternoon})}).catch(()=>{r["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.demandeCanceled"),color:"white"}),this.clearForm()})):r["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.demandeZeroLength"),color:"white"})},showDateDiff(e=!1){Object(d["a"])(this.dateEnd).diff(Object(d["a"])(this.dateStart),"days")<0&&(this.dateEnd=this.dateStart);let a=Object(d["a"])(this.dateStart),t=Object(d["a"])(this.dateEnd);this.daysNumber=0;while(a<=t)"sam."!==a.format("ddd")&&"dim."!==a.format("ddd")&&this.daysNumber++,a=Object(d["a"])(a,"YYYY-MM-DD").add(1,"days");if(this.morning?(this.daysNumber-=.5,this.isMorningIcon="fa fa-sun"):this.isMorningIcon="fa fa-cloud-sun",this.afternoon?this.afternoonIcon="fa fa-moon":(this.daysNumber-=.5,this.afternoonIcon="fa fa-sun"),Object(d["a"])(this.dateEnd).diff(Object(d["a"])(this.dateStart),"days")<0&&(this.daysNumber=Object(d["a"])(this.dateEnd).diff(Object(d["a"])(this.dateStart),"days")),!0!==e)if(Object(d["a"])().diff(Object(d["a"])(this.dateStart),"days")>0)r["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.dateInPasteERR"),color:"white"});else if(this.daysNumber>=0){let e="";e=this.daysNumber<=1?this.$t("demande.conge.youSelected")+" "+this.daysNumber+" "+this.$t("demande.conge.day"):this.$t("demande.conge.youSelected")+" "+this.daysNumber+" "+this.$t("demande.conge.days"),r["b"].create({icon:"fa fa-calendar-alt",message:e,color:"white"})}},request(){this.loading=!0,c["n"]()},clearForm(){this.dateStart=Object(d["a"])().format(),this.dateEnd=Object(d["a"])().format(),this.morning=!1,this.afternoon=!0}},watch:{},beforeDestroy(){i["a"].$off("congeCreateSuccess"),i["a"].$off("congeCreateFailed"),i["a"].$off("getReliquatsSuccess"),i["a"].$off("getReliquatsFailed")}}),u=l,m=t("2877"),g=Object(m["a"])(u,n,o,!1,null,null,null);g.options.__file="create.vue";a["default"]=g.exports}}]);