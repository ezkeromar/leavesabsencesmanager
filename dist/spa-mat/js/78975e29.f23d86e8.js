(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["78975e29"],{"5b6e":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("q-card",{staticClass:"congeCardCreateB absenceCardCreateB"},[a("q-card-title",[e._v("\n        "+e._s(e.$t("demande.absence.absencespecialdemende"))+"\n      ")]),a("div",{staticClass:"marginsmall"}),a("q-card-main",[a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-4"},[a("q-select",{attrs:{value:e.typeval,options:e.typeoptions},on:{change:function(t){return e.typechanged(t)}}})],1),a("div",{staticClass:"col-md-2"}),a("div",{staticClass:"col-md-4"},[e.subtypeoptions.length>0?a("q-select",{staticClass:"subtypewidthlimitation",attrs:{value:e.subtypeval,options:e.subtypeoptions},on:{change:function(t){return e.subtypechanged(t)}}}):e._e()],1)]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-md-12"},[a("div",{staticClass:"row"},[a("q-field",{staticClass:"col-md-4"},[a("q-datetime",{staticClass:"congeDatePicker",attrs:{color:"#949292",minimal:!0,format:"DD/MM/YYYY",placeholder:this.$t("demande.conge.dateStart"),type:"date",value:e.dateStart},on:{change:function(t){e.dateStart=t,e.showDateDiff()}}})],1),a("div",{staticClass:"col-md-5 flex justify-center items-center"},[a("q-toggle",{staticClass:"congeSwitch",attrs:{color:"#fbd46b",icon:e.isMorningIcon,value:e.morning},on:{change:function(t){e.morning=t,e.showDateDiff()}}})],1)],1),a("div",{staticClass:"row"},[a("q-field",{staticClass:"col-md-4"},[a("q-datetime",{staticClass:"congeDatePicker",attrs:{color:"#949292",minimal:!0,format:"DD/MM/YYYY",placeholder:this.$t("demande.conge.dateEnd"),type:"date",value:e.dateEnd},on:{change:function(t){e.dateEnd=t,e.showDateDiff()}}})],1),a("div",{staticClass:"col-md-5 flex justify-center items-center"},[a("q-toggle",{staticClass:"congeSwitch congeSwitchEnd",attrs:{color:"#001165",icon:e.afternoonIcon,value:e.afternoon},on:{change:function(t){e.afternoon=t,e.showDateDiff()}}})],1)],1)])]),a("div",{staticClass:"marginsmall"}),a("q-card-actions",[a("q-btn",{staticClass:"congeBtnSend",attrs:{label:this.$t("demande.conge.send"),color:"primary"},on:{click:e.storeFunc}}),a("q-btn",{staticClass:"congeBtnCancel",attrs:{label:this.$t("demande.conge.cancel"),color:"white"},on:{click:e.clearForm}})],1)],1)],1)},n=[];s._withStripped=!0;var i=a("2b0e"),o=a("012a"),c=a("e00b"),d=a("6458"),r=a("c15c"),l=i["a"].extend({name:"legalFamilyAbsenceCreation",data(){return{daysNumber:0,dateStart:Object(o["a"])().format(),dateEnd:Object(o["a"])().format(),morning:!1,afternoon:!0,isMorningIcon:"fa fa-cloud-sun",afternoonIcon:"fa fa-moon",showDialog:!1,type:"",typeval:"",subtypeval:"",typeoptions:[],subtypeoptions:[],legalduration:0}},mounted(){let e=this;c["a"].$on("legalfamilystoreSuccess",function(t){e.$router.push("/admin/absence/list"),d["b"].create({icon:"fa fa-thumbs-up",message:e.$t(t.message),color:"white"})}),c["a"].$on("legalfamilystoreFailed",function(t){void 0!==t&&(401===t.status&&e.$store.commit("Auth/setExpiredError",!0),400===t.status&&e.showErrors(t.data))}),c["a"].$on("listabslegalSuccess",function(t){e.typeoptions=t,e.typeval=e.typeoptions[0].value,e.legalduration=e.typeoptions[0].duree}),c["a"].$on("listabslegalFailed",function(t){void 0!==t&&(401===t.status&&e.$store.commit("Auth/setExpiredError",!0),400===t.status&&e.showErrors(t.data))}),this.showDateDiff(!0),this.getlistabsence()},methods:{typechanged(e){this.typeval=e;for(let t=0;t<this.typeoptions.length;t++)e===this.typeoptions[t].value&&(this.legalduration=this.typeoptions[t].duree,this.typeoptions[t].subTypes.length>0?(this.subtypeoptions=this.typeoptions[t].subTypes,this.subtypeval=this.typeoptions[t].subTypes[0].value):this.subtypeval="")},subtypechanged(e){this.subtypeval=e;for(let t=0;t<this.typeoptions.length;t++)e===this.subtypeoptions[t].value&&(this.legalduration=this.typeoptions[t].duree)},getlistabsence(){r["c"]()},showErrors(e){var t=JSON.parse(JSON.stringify(e));d["b"].create({type:"negative",icon:"fa fa-times",message:this.$t(t.title),color:"white"})},storeFunc(){"true"===this.$store.state.Auth.user.isBlocked?d["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.blockedAddConge"),color:"white"}):this.daysNumber===this.legalduration&&this.daysNumber>0?("Sat"===Object(o["a"])(this.dateStart).format("ddd")&&(this.dateStart=Object(o["a"])(this.dateStart).add(2,"days").format()),"Sun"===Object(o["a"])(this.dateStart).format("ddd")&&(this.dateStart=Object(o["a"])(this.dateStart).add(1,"days").format()),"Sat"===Object(o["a"])(this.dateEnd).format("ddd")&&(this.dateEnd=Object(o["a"])(this.dateEnd).subtract(1,"days").format()),"Sun"===Object(o["a"])(this.dateEnd).format("ddd")&&(this.dateEnd=Object(o["a"])(this.dateEnd).subtract(2,"days").format()),d["a"].create({title:this.$t("demande.conge.confirmation"),message:this.$t("demande.conge.youWantContinue"),ok:{label:this.$t("demande.conge.validate"),color:"primary"},cancel:{label:this.$t("demande.conge.cancel"),color:"white"}}).then(()=>{r["b"]({dateStart:Object(o["a"])(this.dateStart).format("DD-MM-YYYY"),dateEnd:Object(o["a"])(this.dateEnd).format("DD-MM-YYYY"),morning:!this.morning,afternoon:this.afternoon,type:""!==this.subtypeval?this.subtypeval:this.typeval})}).catch(()=>{d["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.demandeCanceled"),color:"white"}),this.clearForm()})):this.daysNumber>0&&this.daysNumber!==this.legalduration?d["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.absence.demandeDeferentofalowed")+" "+this.legalduration,color:"white"}):d["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.demandeZeroLength"),color:"white"})},showDateDiff(e=!1){Object(o["a"])(this.dateEnd).diff(Object(o["a"])(this.dateStart),"days")<0&&(this.dateEnd=this.dateStart);let t=Object(o["a"])(this.dateStart),a=Object(o["a"])(this.dateEnd);this.daysNumber=0;while(t<=a)"sam."!==t.format("ddd")&&"dim."!==t.format("ddd")&&this.daysNumber++,t=Object(o["a"])(t,"YYYY-MM-DD").add(1,"days");if(this.morning?(this.daysNumber-=.5,this.isMorningIcon="fa fa-sun"):this.isMorningIcon="fa fa-cloud-sun",this.afternoon?this.afternoonIcon="fa fa-moon":(this.daysNumber-=.5,this.afternoonIcon="fa fa-sun"),Object(o["a"])(this.dateEnd).diff(Object(o["a"])(this.dateStart),"days")<0&&(this.daysNumber=Object(o["a"])(this.dateEnd).diff(Object(o["a"])(this.dateStart),"days")),!0!==e)if(Object(o["a"])().diff(Object(o["a"])(this.dateStart),"days")>0)d["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.dateInPasteERR"),color:"white"});else if(this.daysNumber>=0){let e="";e=this.daysNumber<=1?this.$t("demande.conge.youSelected")+" "+this.daysNumber+" "+this.$t("demande.conge.day"):this.$t("demande.conge.youSelected")+" "+this.daysNumber+" "+this.$t("demande.conge.days"),d["b"].create({icon:"fa fa-calendar-alt",message:e,color:"white"})}},clearForm(){this.dateStart=Object(o["a"])().format(),this.dateEnd=Object(o["a"])().format(),this.morning=!1,this.afternoon=!0,this.motif=""}},watch:{},beforeDestroy(){c["a"].$off("congeCreateSuccess"),c["a"].$off("congeCreateFailed"),c["a"].$off("getReliquatsSuccess"),c["a"].$off("getReliquatsFailed")}}),u=l,h=a("2877"),m=Object(h["a"])(u,s,n,!1,null,null,null);m.options.__file="legalFamilyAbsence.vue";t["default"]=m.exports},c15c:function(e,t,a){"use strict";a.d(t,"d",function(){return i}),a.d(t,"b",function(){return o}),a.d(t,"a",function(){return c}),a.d(t,"e",function(){return d}),a.d(t,"c",function(){return r});a("f751"),a("386d");var s=a("9dce"),n=a("e00b"),i=function(e){var t=e.dateStart,a=e.dateEnd,i=e.morning,o=e.afternoon,c=e.motif,d={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{dateDeDebut:t,dateDeFin:a,typeDebut:i,typeFin:o,motif:c,jsonReturn:!0}};s["a"].post("api/nouvelleAbsenceNonRemuneree",{},d).then(function(e){n["a"].$emit("absenceCreateSuccess",e.data)}).catch(function(e){n["a"].$emit("absenceCreateFailed",e.response)})},o=function(e){var t=e.dateStart,a=e.dateEnd,i=e.morning,o=e.afternoon,c=e.type,d={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{dateDeDebut:t,dateDeFin:a,typeDebut:i,typeFin:o,typeAbsenceCode:c,jsonReturn:!0}};s["a"].post("api/ajouterAbsenceSpecial",{},d).then(function(e){n["a"].$emit("legalfamilystoreSuccess",e.data)}).catch(function(e){n["a"].$emit("legalfamilystoreFailed",e.response)})},c=function(e){var t=e.code,a=e.maxRows,i=e.descending,o=e.column,c=e.search,d=e.dateStart,r=e.dateEnd,l=e.page,u={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{maxRows:a,descending:i,column:o,search:c,dateStart:d,dateEnd:r,page:l}},h="";switch(t){case"23":h="api/listAbsenceNonRemunereeCollaborateur";break;case"24":h="api/listAbsenceSpecialForRoleCollab";break;case"28":h="api/listAbsenceNonRemunereeEquipe";break;case"29":h="api/listAbsenceSpecialEquipe";break}s["a"].post(h,{},u).then(function(e){n["a"].$emit("getAbsenceSuccess",e.data)}).catch(function(e){n["a"].$emit("getAbsenceFailed",e.response)})},d=function(e){var t=e.code,a=e.rows,i=e.comment,o=e.soldtoRegulize,c=e.datePaiment,d="";switch(t){case"deleteabs":d="api/supprimerAbsence",a=Object.assign({},[a]);break;case"validateabsren":d="api/validerAbsenceNonRemunereeEquipe",a=Array.isArray(a)?Object.assign({},a):Object.assign({},[a]);break;case"refuseabsren":d="api/refuserAbsenceNonRemunereeEquipe";break}var r={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:a,comment:i,sold_a_reg:o,datePaiment:c}};s["a"].post(d,{},r).then(function(e){n["a"].$emit("sendActionsSuccess",e.data)}).catch(function(e){n["a"].$emit("sendActionsFailed",e.response)})},r=function(){var e={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{jsonReturn:!0}};s["a"].post("api/listTypesAbsenceSpecial",{},e).then(function(e){n["a"].$emit("listabslegalSuccess",e.data)}).catch(function(e){n["a"].$emit("listabslegalFailed",e.response)})}}}]);