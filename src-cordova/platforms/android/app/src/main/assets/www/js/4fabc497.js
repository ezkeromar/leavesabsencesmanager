(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["4fabc497"],{"0cdc":function(e,t,a){"use strict";a.d(t,"l",function(){return s}),a.d(t,"h",function(){return i}),a.d(t,"o",function(){return r}),a.d(t,"s",function(){return c}),a.d(t,"t",function(){return l}),a.d(t,"n",function(){return d}),a.d(t,"q",function(){return u}),a.d(t,"f",function(){return m}),a.d(t,"a",function(){return p}),a.d(t,"b",function(){return g}),a.d(t,"d",function(){return f}),a.d(t,"c",function(){return h}),a.d(t,"g",function(){return b}),a.d(t,"m",function(){return C}),a.d(t,"i",function(){return v}),a.d(t,"e",function(){return w}),a.d(t,"p",function(){return $}),a.d(t,"k",function(){return y}),a.d(t,"j",function(){return D}),a.d(t,"r",function(){return M});a("f751"),a("386d");var n=a("9dce"),o=a("e00b"),s=function(){var e={params:{}};n["a"].post("api/notifyManagerTwoDaysBeforLeaveStartAPI",{},e).then(function(e){o["a"].$emit("getCongetoValidateCountSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongetoValidateCountFailed",e.response)})},i=function(e){var t=e.term,a={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{search:t}};n["a"].post("api/listCollaborateurAPI",{},a).then(function(e){o["a"].$emit("getColabsSuccess",e.data)}).catch(function(e){o["a"].$emit("getColabsFailed",e.response)})},r=function(e){var t=e.id,a={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:t}};n["a"].post("api/getNumberOfLeaveDaysAllowed",{},a).then(function(e){o["a"].$emit("getTempSoldeColabsSuccess",e.data)}).catch(function(e){o["a"].$emit("getTempSoldeColabsFailed",e.response)})},c=function(e){var t=e.dateStart,a=e.dateEnd,s=e.morning,i=e.afternoon,r={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{dateDeDebut:t,dateDeFin:a,typeDebut:s,typeFin:i,jsonReturn:!0}};n["a"].post("api/soumettreDemande",{},r).then(function(e){o["a"].$emit("congeCreateSuccess",e.data)}).catch(function(e){o["a"].$emit("congeCreateFailed",e.response)})},l=function(e){var t=e.dateStart,a=e.dateEnd,s=e.morning,i=e.afternoon,r=e.id,c={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{dateDeDebut:t,dateDeFin:a,typeDebut:s,typeFin:i,id:r,jsonReturn:!0}};n["a"].post("api/soumettreDemandeAnterieurAPI",{},c).then(function(e){o["a"].$emit("storeAnterieurSuccess",e.data)}).catch(function(e){o["a"].$emit("storeAnterieurFailed",e.response)})},d=function(){var e={params:{}};n["a"].post("api/congeNouvelleDemande",{},e).then(function(e){o["a"].$emit("getReliquatsSuccess",e.data)}).catch(function(e){o["a"].$emit("getReliquatsFailed",e.response)})},u=function(e){var t=e.page,a=e.maxRows,s={params:{page:t,maxRows:a}};n["a"].post("api/congeJoursFeriersAPI",{},s).then(function(e){o["a"].$emit("requestHolidaysSuccess",e.data)}).catch(function(e){o["a"].$emit("requestHolidaysFailed",e.response)})},m=function(e){var t=e.periodPaiment,a={params:{periodPaiment:t}};n["a"].post("api/exportDemandCongePayeeAsExcel",{},a).then(function(e){o["a"].$emit("exportPaiePeriodeDemandesSuccess",e.data)}).catch(function(e){o["a"].$emit("exportPaiePeriodeDemandesFailed",e.response)})},p=function(e){var t=e.props,a={params:{id:t.id,codeConge:t.codeConge,droit:t.droit}};n["a"].post("api/addOrUpdateCodeCongeAPI",{},a).then(function(e){o["a"].$emit("addCodeCongeSuccess",e.data)}).catch(function(e){o["a"].$emit("addCodeCongeFailed",e.response)})},g=function(e){var t=e.props,a=e.dateDebutJourFerier,s={params:{id:t.id,intitule:t.intitule,dateDebutJourFerier:a,nBJourFerier:t.nBJourFerier}};n["a"].post("api/addOrUpdateCongeJoursFeriersAPI",{},s).then(function(e){o["a"].$emit("addHolidaySuccess",e.data)}).catch(function(e){o["a"].$emit("addHolidayFailed",e.response)})},f=function(e){var t=e.id,a={params:{id:t}};n["a"].post("api/deleteCongeJoursFeriersAPI",{},a).then(function(e){o["a"].$emit("deleteHolidaySuccess",e.data)}).catch(function(e){o["a"].$emit("deleteHolidayFailed",e.response)})},h=function(e){var t=e.props,a={params:{id:t.id}};n["a"].post("api/deleteCodeCongeAPI",{},a).then(function(e){o["a"].$emit("deleteCodeCongeSuccess",e.data)}).catch(function(e){o["a"].$emit("deleteCodeCongeFailed",e.response)})},b=function(){var e={params:{}};n["a"].post("api/codeCongeAPI",{},e).then(function(e){o["a"].$emit("getCodeCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCodeCongesFailed",e.response)})},C=function(e){var t=e.menuTable,a={params:{menuTableId:t}};n["a"].post("api/listMenuOptionsAPI",{},a).then(function(e){o["a"].$emit("getMenuTableSuccess",e.data)}).catch(function(e){o["a"].$emit("getMenuTableFailed",e.response)})},v=function(e){var t=e.code,a=e.maxRows,s=e.descending,i=e.column,r=e.search,c=e.dateStart,l=e.dateEnd,d=e.page,u={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{code:t,maxRows:a,descending:s,column:i,search:r,dateStart:c,dateEnd:l,page:d}};n["a"].post("api/listDemandeCongeAPI",{},u).then(function(e){o["a"].$emit("getCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongesFailed",e.response)})},w=function(e){var t=e.code,a=e.maxRows,s=e.descending,i=e.column,r=e.search,c=e.dateStart,l=e.dateEnd,d=e.page,u={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{filterType:t,maxRows:a,descending:s,column:i,search:r,dateStart:c,dateEnd:l,page:d}};n["a"].post("api/listDemandeCongeEnCoursAPI",{},u).then(function(e){o["a"].$emit("getCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongesFailed",e.response)})},$=function(e){var t=e.maxRows,a=e.descending,s=e.column,i=e.search,r=e.page,c={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{maxRows:t,descending:a,column:s,search:i,page:r}};n["a"].post("api/blockedAndUnblockedUsersAPI",{},c).then(function(e){o["a"].$emit("getUserstoBlockUnblockSuccess",e.data)}).catch(function(e){o["a"].$emit("getUserstoBlockUnblockFailed",e.response)})},y=function(e){var t=e.datePaiment,a=e.code,s=e.maxRows,i=e.descending,r=e.column,c=e.search,l=e.dateStart,d=e.dateEnd,u=e.page,m={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{code:a,maxRows:s,descending:i,column:r,search:c,dateStart:l,dateEnd:d,page:u,datePaiment:t}};n["a"].post("api/listDemandeCongeAPI",{},m).then(function(e){o["a"].$emit("getCongesSuccess",e.data)}).catch(function(e){o["a"].$emit("getCongesFailed",e.response)})},D=function(e){var t=e.reference,a={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:t}};n["a"].post("api/historiqueDemandeCongeCollaborateurAPI",{},a).then(function(e){o["a"].$emit("getCongeHistorySuccess",e.data)}).catch(function(e){o["a"].$emit("getCongeHistoryFailed",e.response)})},M=function(e){var t=e.code,a=e.rows,s=e.comment,i=e.soldtoRegulize,r=e.datePaiment,c="";switch(t){case"congeValidated":Array.isArray(a)?(c="api/validerManagerToutesDemandeAPI",a=Object.assign({},a)):c="api/validerManagerDemandeAPI";break;case"congerejected":c="api/refuserManagerDemandeAPI";break;case"congeCanceled":c="api/annulerManagerDemandeAPI";break;case"payConge":c="api/payerCongeAPI",a=Array.isArray(a)?Object.assign({},a):Object.assign({},[a]);break;case"regulariserConge":Array.isArray(a)?(c="api/regulariserToutesDemandesAPI",a=Object.assign({},a)):c="api/regulariserCongeAPI";break;case"aRegulariserConge":c="api/aRegulariserCongeAPI";break;case"UnblockCollab":Array.isArray(a)?(c="api/UnblockUserFromDemandeCongeAPI",a=Object.assign({},a)):c="api/blockOrUnblockUserFromDemandeCongeAPI";break;case"blockCollab":c="api/blockOrUnblockUserFromDemandeCongeAPI";break;case"congeSansSuite":Array.isArray(a)?(c="api/updateEtatForAllDemandeEnCours",a=Object.assign({},a)):c="api/updateEtatDemandeEnCours";break}var l={headers:{"Content-Type":"application/x-www-form-urlencoded"},params:{id:a,comment:s,sold_a_reg:i,datePaiment:r}};n["a"].post(c,{},l).then(function(e){o["a"].$emit("sendActionsSuccess",e.data)}).catch(function(e){o["a"].$emit("sendActionsFailed",e.response)})}},"2b25":function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row filterContainer"},["model1"!==e.model&&"model2"!==e.model&&"model4"!==e.model?a("div",{staticClass:"col-md-3 col-sm-6 col-xs-12"},[a("q-datetime",{attrs:{format:"DD/MM/YYYY",minimal:!0,value:e.dateStart,placeholder:this.$t("demande.conge.dateStart"),type:"date"},on:{change:function(t){e.dateStartChanged(t)}}})],1):e._e(),"model1"!==e.model&&"model2"!==e.model&&"model4"!==e.model?a("div",{staticClass:"col-md-3 col-sm-6 col-xs-12"},[a("q-datetime",{attrs:{format:"DD/MM/YYYY",minimal:!0,value:e.dateEnd,placeholder:this.$t("demande.conge.dateEnd"),type:"date"},on:{change:function(t){e.dateEndChanged(t)}}})],1):e._e(),"model1"!==e.model&&"model2"!==e.model&&"model4"!==e.model?a("div",{staticClass:"col-md-1"},[null!==e.dateEnd||null!==e.dateStart?a("div",{staticClass:"clearFilterContainer"},[a("i",{staticClass:"far fa-window-close clearfilter",on:{click:e.clearFilter}}),a("q-tooltip",[e._v(e._s(e.$t("demande.conge.deleteFilter")))])],1):e._e()]):e._e(),"model1"===e.model?a("div",{staticClass:"col-sm-8"}):e._e(),"model2"===e.model?a("div",{staticClass:"col-sm-6"}):e._e(),"model4"!==e.model?a("div",{staticClass:"col-xs-12 filteDataTableSelect",class:{"col-md-4 col-sm-4 modelOneFilterField":"model1"===e.model||"model2"===e.model,"col-md-3 col-sm-6":"model1"!==e.model}},[a("div",{staticClass:"relativePlacing"},[a("img",{directives:[{name:"show",rawName:"v-show",value:1!==e.selectOptions.length,expression:"selectOptions.length !== 1"}],staticClass:"selectAvatar",attrs:{src:e.activeAvatar}}),a("div",{staticClass:"tableFilterSelectField"},[e.selectOptions.length>0&&""!=e.select?a("q-select",{directives:[{name:"show",rawName:"v-show",value:1!==e.selectOptions.length,expression:"selectOptions.length !== 1"}],staticClass:"selectCongeState",attrs:{value:e.select,options:e.selectOptions,"no-icon":!0,before:[{icon:"dddd"}]},on:{change:function(t){e.select=t,e.changePicture(t)}}}):e._e()],1)])]):e._e(),"model4"===e.model?a("div",{staticClass:"col-md-10"}):e._e(),"model1"!==e.model||"model2"===e.model||"model4"===e.model?a("div",{staticClass:"col-md-2 col-sm-6 col-xs-12 flex justify-end searchContainer"},[a("i",{staticClass:"fas fa-search searchIcon",on:{click:e.findSearch}}),a("q-search",{staticClass:"searchFilter",attrs:{debounce:600,before:[{icon:"dddd"}],placeholder:this.$t("demande.conge.search")},on:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.findSearch(t):null}},model:{value:e.term,callback:function(t){e.term=t},expression:"term"}}),a("q-tooltip",[e._v(e._s(e.$t("demande.conge.searchwithNameMatFLName")))])],1):e._e()])},o=[];n._withStripped=!0;var s=a("2b0e"),i=a("e00b"),r=a("012a"),c=a("0cdc"),l=s["a"].extend({name:"filtersDataTable",props:["properties","model"],data(){return{selectOptions:[],select:"",activeAvatar:"",term:"",params:"",dateStart:null,dateEnd:null,codeMenu:null}},mounted(){let e=this;i["a"].$on("getMenuTable",function(t=null){e.switchTableMenu(t)}),i["a"].$on("getMenuTableSuccess",function(t){e.selectOptions=t;let a=e.selectOptions[0];if(null!=e.codeMenu)for(let n=0;n<e.selectOptions.length;n++)e.selectOptions[n].value===e.codeMenu&&(a=e.selectOptions[n]);e.select=a.value,e.params={codeMenu:a.value,terms:"",dateStart:null,dateEnd:null},e.activeAvatar=a.avatar,e.commitRightStore(),e.selectOptions.map(function(t){return t.label=e.$t(t.labelTow),t})}),i["a"].$on("getMenuTableFailed",function(t){e.selectedConges=[],e.loading=!1,void 0!==t&&401===t.status&&e.$store.commit("Auth/setExpiredError",!0)})},methods:{clearFilter(){this.dateStart=null,this.dateEnd=null,this.params.dateStart=null,this.params.dateEnd=null,this.commitRightStore()},dateStartChanged(e){this.dateStart=e,this.params.dateStart=Object(r["a"])(e).format("DD/MM/YYYY"),this.commitRightStore()},dateEndChanged(e){this.dateEnd=e,this.params.dateEnd=Object(r["a"])(e).format("DD/MM/YYYY"),this.commitRightStore()},findSearch(){this.params.terms=this.term,this.commitRightStore()},changePicture(e){for(let t=0;t<this.selectOptions.length;t++)this.selectOptions[t].value===e&&(this.select=this.selectOptions[t].value,this.activeAvatar=this.selectOptions[t].avatar,this.params={codeMenu:this.selectOptions[t].value,terms:"",dateStart:null,dateEnd:null},this.commitRightStore())},commitRightStore(){switch(this.$store.state.Dashboard.activeMenu){case"1001":this.$store.commit("conge/setEtatCongeTableMenu",this.params.codeMenu),i["a"].$emit("etatcongeRefresh",this.params);break;case"1003":this.$store.commit("conge/setEtatCongeTeamTableMenu",this.params.codeMenu),i["a"].$emit("teamcongeRefresh",this.params);break;case"1005":this.$store.commit("conge/setPayCongeTableMenu",this.params.codeMenu),i["a"].$emit("paycongeRefresh",this.params);break;case"1006":this.$store.commit("conge/setHistoryCongeTableMenu",this.params.codeMenu),i["a"].$emit("historycongeRefresh",this.params);break;case"1010":i["a"].$emit("blockUnblockUserRefresh",this.params);break;case"10011":this.$store.commit("conge/setExpiredDemandeTableMenu",this.params.codeMenu),i["a"].$emit("expiredDemandeRefresh",this.params);break;case"2001":this.$store.commit("conge/setEtatAbsenceTableMenu",this.params.codeMenu),i["a"].$emit("etatabsenceRefresh",this.params);break;case"2002":this.$store.commit("conge/setEtatAbsenceTeamTableMenu",this.params.codeMenu),i["a"].$emit("etatabsenceteamRefresh",this.params);break;case"2003":this.$store.commit("conge/setEtatAbsenceCcTableMenu",this.params.codeMenu),i["a"].$emit("etatAbsenceCcTableMenu",this.params);break}},switchTableMenu(e=null){this.codeMenu=e,c["m"]({menuTable:this.$store.state.Dashboard.activeMenu})},myFilter(e,t,a,n){const o=t?t.toLowerCase():"";return e.filter(e=>a.some(t=>-1!==(n(t,e)+"").toLowerCase().indexOf(o)))}},beforeDestroy(){i["a"].$off("getMenuTable"),i["a"].$off("getMenuTableSuccess"),i["a"].$off("getMenuTableFailed")}}),d=l,u=(a("e55b"),a("2877")),m=Object(u["a"])(d,n,o,!1,null,null,null);m.options.__file="filters.vue";t["a"]=m.exports},"3ae0":function(e,t,a){var n=a("e1d5");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=a("499e").default;o("9b27746c",n,!1,{sourceMap:!1})},e1d5:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,".q-popover .q-item{padding-top:0;padding-bottom:0;min-height:35px}.q-popover .q-item-main{font-family:WorkSans-Regular;font-size:14px;font-style:normal;font-stretch:normal;line-height:1.19;letter-spacing:normal;text-align:center;color:#242424;font-weight:700}.q-popover .q-item-avatar,.selectAvatar{width:20px!important;height:auto!important;border-radius:0!important}.selectAvatar{float:left;margin-top:4px;margin-left:3px}.selectCongeState{width:100%;height:31px}.selectCongeState .q-input-target{font-family:WorkSans-Regular;font-size:14px;font-style:normal;font-stretch:normal;line-height:1.19;letter-spacing:normal;text-align:center;color:#242424;font-weight:700}.tableFilterSelectField{position:absolute;width:100%}",""])},e55b:function(e,t,a){"use strict";var n=a("3ae0"),o=a.n(n);o.a},eb0c:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"row flex justify-center congeListe"},[a("div",{staticClass:"congeListContainer"},[a("q-card",{staticClass:"col-md-10 congeCard"},[a("q-card-main",{staticClass:"congerCardContainer"},[e.showTable?a("q-table",{staticClass:"filterWidth",attrs:{title:e.$t("demande.conge.teamDemande"),selection:e.selectionType,selected:e.selectedConges,data:e.tableData,columns:e.activeColumns,"row-key":"reference",pagination:e.serverPagination,"rows-per-page-options":e.rowPerPage,loading:e.loading},on:{"update:selected":function(t){e.selectedConges=t},"update:pagination":function(t){e.serverPagination=t},request:e.requestConges},scopedSlots:e._u([{key:"body-cell-status",fn:function(t){return a("q-td",{class:{lignBackgrount:"red"===t.row.color},attrs:{props:t}},["05"===e.$store.state.conge.etatCongeTeamTableMenu?a("i",{staticClass:"fa fa-user-clock TableIcon tableIconWait"}):e._e(),"06"===e.$store.state.conge.etatCongeTeamTableMenu?a("i",{staticClass:"fa fa-user-check TableIcon tableIconValide"}):e._e(),"07"===e.$store.state.conge.etatCongeTeamTableMenu?a("i",{staticClass:"fa fa-user-times TableIcon tableIconRefuse"}):e._e(),"08"===e.$store.state.conge.etatCongeTeamTableMenu?a("i",{staticClass:"fa fa-user-slash TableIcon tableIconCancel"}):e._e(),a("q-tooltip",[e._v(e._s(e.$t(t.row.etat.label)))])],1)}},{key:"body-cell-reference",fn:function(t){return a("q-td",{attrs:{props:t}},[a("div",{staticClass:"ellipseText"},[e._v(e._s(t.row.reference))]),a("q-tooltip",[e._v(e._s(t.row.reference))])],1)}},{key:"body-cell-dateDeCreation",fn:function(t){return a("q-td",{attrs:{props:t}},[e._v("\n            "+e._s(t.row.dateDeCreation)+"\n          ")])}},{key:"body-cell-matricule",fn:function(t){return a("q-td",{attrs:{props:t}},[e._v("\n           "+e._s(null===t.row.matricule?"...":t.row.matricule)+"\n          ")])}},{key:"body-cell-matriculeGroupe",fn:function(t){return a("q-td",{attrs:{props:t}},[e._v("\n           "+e._s(null===t.row.matriculeGroupe?"...":t.row.matriculeGroupe)+"\n          ")])}},{key:"body-cell-dateDeDebut",fn:function(t){return a("q-td",{attrs:{props:t}},[e._v("\n            "+e._s(t.row.dateDeDebut.date)+" "+e._s(e.$t(t.row.dateDeDebut.typeDebut))+"\n          ")])}},{key:"body-cell-dateDeFin",fn:function(t){return a("q-td",{attrs:{props:t}},[e._v("\n            "+e._s(t.row.dateDeFin.date)+" "+e._s(e.$t(t.row.dateDeFin.typeFin))+"\n          ")])}},{key:"body-cell-commentaireRefusManager",fn:function(t){return a("q-td",{attrs:{props:t}},[a("div",{staticClass:"ellipseDescription"},[e._v(e._s(t.row.commentaireRefusManager))]),a("q-tooltip",[e._v(e._s(t.row.commentaireRefusManager))])],1)}},{key:"body-cell-action",fn:function(t){return a("q-td",{attrs:{props:t}},e._l(t.row.action,function(n){return a("div",{key:n.code,staticClass:"actionBtnsContainer"},["congeTreated"!==n.code?a("q-btn",{class:n.class,attrs:{size:"xs",icon:"fa "+n.icon},on:{click:function(a){e.sendAction(n.code,t.row.reference)}}}):a("i",{class:"fa "+n.icon+" "+n.class}),a("q-tooltip",[e._v(e._s(e.$t(n.name)))])],1)}))}},{key:"top-right",fn:function(e){return[a("filters",{attrs:{properties:e,model:"model3"}})]}},{key:"bottom-row",fn:function(t){return e.selectedConges.length>1?a("div",{staticClass:"tableFooterBtn"},e._l(e.actionBtn,function(n){return a("div",{key:n.code,staticClass:"actionBtnsContainer",attrs:{props:t}},[a("q-btn",{class:n.class,attrs:{size:"xs",icon:"fa "+n.icon},on:{click:function(t){e.sendMultiAction(n.code)}}}),a("q-tooltip",[e._v(e._s(e.$t(n.name)))])],1)})):e._e()}}])}):e._e()],1)],1)],1)])},o=[];n._withStripped=!0;var s=a("2b0e"),i=a("2b25"),r=a("e00b"),c=a("0cdc"),l=a("6458"),d=s["a"].extend({name:"listCongeTeam",data(){return{selectedSecond:[],separator:"horizontal",tableData:[],activeColumns:[],loading:!1,serverPagination:{sortBy:null,descending:!1,rowsPerPage:5,page:1,rowsNumber:5},filter:"",selectedConges:[],showTable:!0,rowPerPage:[5,10,15,20,25,30],comment:null,actionBtn:[],selectionType:"none",dateStart:null,dateEnd:null}},mounted(){let e=this;e.$store.commit("Dashboard/setActiveMenu","1003"),e.activeColumns=e.columns(),r["a"].$on("teamcongeRefresh",function(t){e.selectedConges=[];let a=e.columns();e.showTable=!1;let n=e.changeTableColumns(t.codeMenu);for(let e=0;e<n.length;e++)a.splice(10,0,n[e]);e.dateStart=t.dateStart,e.dateEnd=t.dateEnd,e.filter=t.terms,e.requestConges({pagination:e.serverPagination}),e.activeColumns=a,e.showTable=!0}),r["a"].$on("sendActionsSuccess",function(t){r["a"].$emit("checkCountDemandeValidate"),e.selectedConges=[],e.loading=!1;let a=void 0!==t.title.demandeur?t.title.demandeur:t.title.count;l["b"].create({icon:"fa fa-check",message:e.$t(t.title.label)+" "+a,color:"white"}),e.requestConges({pagination:e.serverPagination}),e.selectedConges=[]}),r["a"].$on("sendActionsFailed",function(t){e.selectedConges=[],e.loading=!1,void 0!==t&&401===t.status&&e.$store.commit("Auth/setExpiredError",!0)}),r["a"].$on("getCongesSuccess",function(t){e.loading=!1,e.tableData=t.tableData.data,e.serverPagination.rowsNumber=t.tableData.pagination.totalCount,e.actionBtn=t.tableData.action}),r["a"].$on("getCongesFailed",function(t){e.loading=!1,void 0!==t&&401===t.status&&e.$store.commit("Auth/setExpiredError",!0)}),r["a"].$emit("getMenuTable",this.$route.query.etat)},methods:{regulize(e){},requestConges({pagination:e}){this.serverPagination.page=e.page,this.serverPagination.sortBy=e.sortBy,this.serverPagination.descending=e.descending,this.serverPagination.rowsPerPage=e.rowsPerPage,this.loading=!0,c["i"]({code:this.$store.state.conge.etatCongeTeamTableMenu,maxRows:e.rowsPerPage,column:e.sortBy,search:this.filter,dateStart:this.dateStart,dateEnd:this.dateEnd,descending:e.descending,page:parseInt(e.page-1)})},sendAction(e,t){switch(e){case"congerejected":l["a"].create({title:this.$t("demande.conge.rejectMotif"),message:this.$t("demande.conge.motifRefDesc")+" *",prompt:{model:"",type:"textarea"},ok:{label:this.$t("demande.conge.validate"),color:"primary"},cancel:{label:this.$t("demande.conge.close"),color:"white"}}).then(a=>{null!==a&&""!==a&&" "!==a?c["r"]({code:e,rows:t,comment:a}):l["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.motifRefDescRequire"),color:"white"})}).catch(()=>{});break;case"congeCanceled":l["a"].create({title:this.$t("demande.conge.cancelMotif"),message:this.$t("demande.conge.cancelMotifDesc")+" *",prompt:{model:"",type:"textarea"},ok:{label:this.$t("demande.conge.validate"),color:"primary"},cancel:{label:this.$t("demande.conge.close"),color:"white"}}).then(a=>{null!==a&&""!==a&&" "!==a?c["r"]({code:e,rows:t,comment:a}):l["b"].create({type:"negative",icon:"fa fa-times",message:this.$t("demande.conge.cancelMotifDescRequired"),color:"white"})}).catch(()=>{});break;case"congeValidated":c["r"]({code:e,rows:t,comment:""});break}},sendMultiAction(e){let t=[];for(let a=0;a<this.selectedConges.length;a++)t.push(this.selectedConges[a].reference);this.sendAction(e,t)},changeTableColumns(e){let t=[];switch(e){case"06":this.selectionType="none",t=[{name:"dateDeValidationManager",required:!0,label:this.$t("demande.conge.validationDate"),align:"center",field:"dateDeValidationManager",key:"dateDeValidationManager",sortable:!0},{name:"action",required:!0,label:this.$t("demande.conge.actions"),align:"center",field:"action",key:"action",style:"min-width: 100px",sortable:!1}];break;case"05":this.selectionType="multiple",t=[{name:"action",required:!0,label:this.$t("demande.conge.actions"),align:"center",field:"action",key:"action",style:"min-width: 100px",sortable:!1}];break;case"07":this.selectionType="none",t=[{name:"dateDeRefusAnnulerManager",required:!0,label:this.$t("demande.conge.refuDate"),align:"center",field:"dateDeRefusAnnulerManager",key:"dateDeRefusAnnulerManager",sortable:!0},{name:"commentaireRefusManager",required:!0,label:this.$t("demande.conge.motif"),align:"center",field:"commentaireRefusManager",key:"commentaireRefusManager",sortable:!0}];break;case"08":this.selectionType="none",t=[{name:"dateDeValidationManager",required:!0,label:this.$t("demande.conge.validationDate"),align:"center",field:"dateDeValidationManager",key:"dateDeValidationManager",sortable:!0},{name:"dateDeRefusAnnulerManager",required:!0,label:this.$t("demande.conge.cancelDateCol"),align:"center",field:"dateDeRefusAnnulerManager",key:"dateDeRefusAnnulerManager",sortable:!0},{name:"commentaireRefusManager",required:!0,label:this.$t("demande.conge.motif"),align:"center",field:"commentaireRefusManager",key:"commentaireRefusManager",sortable:!0}];break}return t},columns(){return[{name:"status",required:!0,label:this.$t("demande.conge.state"),align:"center",field:"status",key:"status",style:"min-width: 80px",sortable:!1},{name:"reference",required:!0,label:this.$t("demande.conge.reference"),align:"center",field:"reference",style:"min-width: 100px",sortable:!1},{name:"demandeur",required:!0,label:this.$t("demande.conge.demandeur"),align:"center",field:"demandeur",style:"min-width: 100px",sortable:!0},{name:"dateDeCreation",required:!0,label:this.$t("demande.conge.depotDate"),align:"center",field:"dateDeCreation",style:"min-width: 100px",sortable:!0},{name:"matricule",required:!0,label:this.$t("demande.conge.matr"),align:"center",field:"matricule",style:"min-width: 100px",sortable:!1},{name:"dateDeDebut",required:!0,label:this.$t("demande.conge.dateStart"),align:"center",field:"dateDeDebut",style:"min-width: 150px",sortable:!0},{name:"dateDeFin",required:!0,label:this.$t("demande.conge.dateEnd"),align:"center",field:"dateDeFin",style:"min-width: 150px",sortable:!0},{name:"duree",required:!0,label:this.$t("demande.conge.duree"),align:"center",field:"duree",style:"min-width: 100px",sortable:!1}]}},watch:{},computed:{},components:{filters:i["a"]},beforeDestroy(){r["a"].$off("getCongesSuccess"),r["a"].$off("getCongesFailed"),r["a"].$off("teamcongeRefresh"),r["a"].$off("sendActionsFailed"),r["a"].$off("sendActionsSuccess")}}),u=d,m=a("2877"),p=Object(m["a"])(u,n,o,!1,null,null,null);p.options.__file="listEquipe.vue";t["default"]=p.exports}}]);