webpackJsonp([1],{"95Qj":function(t,e){},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("kV13"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var r=s("C7Lr")({name:"App"},i,!1,function(t){s("Raw3")},null,null).exports,n=s("wUgx"),l={name:"HelloWorld",data:function(){return{inserting:!1,status:"url",form:this.$form.createForm(this,{name:"coordinated"}),url:"",tags:[{code:"1",title:"咨询",checked:!0},{code:"2",title:"电话",checked:!0},{code:"3",title:"微信",checked:!0}],currentIdx:"",positionList:[{title:"页面左下",value:"1",styleObject:{right:"5px",top:"70%"},styletxt:"right:5px;top:70%;"},{title:"页面左中",value:"2",styleObject:{right:"5px",top:"50%"},styletxt:"right:5px;top:50%;"},{title:"页面左上",value:"3",styleObject:{right:"5px",top:"20%"},styletxt:"right:5px;top:20%;"},{title:"页面右下",value:"4",styleObject:{left:"5px",top:"70%"},styletxt:"left:5px;top:70%;"},{title:"页面右中",value:"5",styleObject:{left:"5px",top:"50%"},styletxt:"left:5px;top:50%;"},{title:"页面右上",value:"6",styleObject:{left:"5px",top:"20%"},styletxt:"left:5px;top:20%;"}],position:"1",styleObject:{right:"5px",top:"70%"},form2:this.$form.createForm(this,{name:"coordinated2"}),phone:"",phonetxt:"电话",form3:this.$form.createForm(this,{name:"coordinated3"}),wechat:"",imgLoading:!1,wechattxt:"微信",nowurl:"",html:""}},computed:{phoneDisabled:function(){for(var t=0;t<this.tags.length;t++)if("电话"==this.tags[t].title)return!this.tags[t].checked},wechatDisabled:function(){for(var t=0;t<this.tags.length;t++)if("微信"==this.tags[t].title)return!this.tags[t].checked}},methods:{beforeUpload:function(t){if(this.imgLoading)return!1;this.imgLoading=!0;return-1===["image/jpeg","image/jpg","image/gif","image/png","image/bmp"].indexOf(t.type)?(message.error("照片支持.jpg .jpeg .bmp .gif .png格式"),!1):!(t.size/1024/1024>5)||(message.error("图片大小不超过5M"),!1)},handleChange:function(t){var e=this,s=t.file;t.fileList;if("uploading"===s.status);else if("error"===s.status)this.imgLoading=!1;else if("done"===s.status){this.imgLoading=!1;var a=setTimeout(function(){e.form3.setFieldsValue({wechat:s.response.url}),e.wechat=s.response.url,a&&clearTimeout(a)},100)}else var i=setTimeout(function(){e.form3.setFieldsValue({wechat:""}),e.wechat="",i&&clearTimeout(i)},100)},callback:function(t){console.log(t)},validateToUrl:function(t,e,s){/^(?:(http|https|ftp):\/\/)?((?:[\w-]+\.)+[a-z0-9]+)((?:\/[^/?#]*)+)?(\?[^#]+)?(#.+)?$/i.test(e)?s():s("请输入正确的网址")},handleSubmit:function(t){var e=this;t.preventDefault(),this.form.validateFields(function(t,s){t||(e.status="css",e.url=s.url)})},onChange:function(t,e){this.tags[this.currentIdx].checked=t.target.checked},up:function(t){var e=this.tags,s=e.splice(t,1);e.splice(t-1,0,s[0]),this.tags=e},down:function(t){var e=this.tags,s=e.splice(t,1);e.splice(t+1,0,s[0]),this.tags=e},handleSelectChange:function(t){if(t){var e=parseInt(t);this.styleObject=this.positionList[e-1].styleObject}},cssnext:function(){for(var t=0;t<this.tags.length;t++){if(this.tags[t].checked&&"2"===this.tags[t].code)return void(this.status="phone");if(this.tags[t].checked&&"3"===this.tags[t].code)return void(this.status="wechat")}for(var e=0;e<this.tags.length;e++)if(this.tags[e].checked&&"1"===this.tags[e].code)return this.status="code",void this.getNowUrl()},prephone:function(){for(var t=-1,e=-1,s=0;s<this.tags.length;s++)this.tags[s].checked&&"2"===this.tags[s].code&&(t=s),this.tags[s].checked&&"3"===this.tags[s].code&&(e=s);this.status=-1!==e&&t<e||-1===e?"css":"wechat"},handleSubmit2:function(t){var e=this;t.preventDefault(),this.form2.validateFields(function(t,s){if(!t){e.phone=s.phone,e.phonetxt=s.phonetxt;for(var a=-1,i=-1,r=0;r<e.tags.length;r++)e.tags[r].checked&&"2"===e.tags[r].code&&(a=r),e.tags[r].checked&&"3"===e.tags[r].code&&(i=r);-1===i||-1!==i&&a>i?(e.status="code",e.getNowUrl()):e.status="wechat"}})},prewechat:function(){for(var t=-1,e=-1,s=0;s<this.tags.length;s++)this.tags[s].checked&&"3"===this.tags[s].code&&(t=s),this.tags[s].checked&&"2"===this.tags[s].code&&(e=s);this.status=-1!==e&&t<e||-1===e?"css":"phone"},handleSubmit3:function(t){var e=this;t.preventDefault(),this.form3.validateFields(function(t,s){if(!t){e.wechat=s.wechat,e.wechattxt=s.wechattxt;for(var a=-1,i=-1,r=0;r<e.tags.length;r++)e.tags[r].checked&&"3"===e.tags[r].code&&(a=r),e.tags[r].checked&&"2"===e.tags[r].code&&(i=r);-1===i||-1!==i&&a>i?(e.status="code",e.getNowUrl()):e.status="phone"}})},getNowUrl:function(){for(var t=window.location.origin+"/static/channelSettings/index.html?position="+this.position,e=[],s=0;s<this.tags.length;s++)e.push(this.tags[s].code),this.tags[s].checked&&"2"===this.tags[s].code&&(t+="&tel="+this.phone,t+="&teltxt="+this.phonetxt),this.tags[s].checked&&"3"===this.tags[s].code&&(t+="&wechat="+encodeURIComponent(this.wechat),t+="&wechattxt="+this.wechattxt),this.tags[s].checked&&"1"===this.tags[s].code&&(t+="&zx=1");t+="&tag="+e.join(","),this.html='<iframe class="qfy-iframe" frameborder="0" src="'+t+'" style="height:156px;width:204px;position:fixed;'+this.positionList[parseInt(this.position)-1].styletxt+'"></iframe>'}}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("a-tabs",{attrs:{animated:!1,"default-active-key":"1"},on:{change:t.callback}},[s("a-tab-pane",{key:"1",attrs:{tab:"网页客服"}},[t.inserting?s("div",[s("div",{staticClass:"btn-group-noe"},[s("a-button",{class:{activeBtn:"url"===t.status},attrs:{status:"url"}},[t._v("网页设置")]),t._v(" "),s("a-button",{class:{activeBtn:"css"===t.status},attrs:{status:"css"}},[t._v("样式设置")]),t._v(" "),s("a-button",{class:{activeBtn:"phone"===t.status},attrs:{disabled:t.phoneDisabled,status:"phone"}},[t._v("电话设置")]),t._v(" "),s("a-button",{class:{activeBtn:"wechat"===t.status},attrs:{disabled:t.wechatDisabled,status:"wechat"}},[t._v("微信设置")]),t._v(" "),s("a-button",{class:{activeBtn:"code"===t.status},attrs:{status:"code"}},[t._v("安装代码")])],1),t._v(" "),"url"===t.status?s("div",{staticClass:"insert_start"},[s("a-form",{attrs:{form:t.form,"label-col":{span:5},"wrapper-col":{span:12}},on:{submit:t.handleSubmit}},[s("a-form-item",{attrs:{label:"网页网址"}},[s("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["url",{validateFirst:!0,rules:[{required:!0,message:"请输入网页网址"},{validator:t.validateToUrl}]}],expression:"['url', { validateFirst:true,rules: [{ required: true,message:'请输入网页网址'},{validator:validateToUrl}]}]"}],attrs:{size:"large"}})],1),t._v(" "),s("a-form-item",{staticStyle:{"margin-top":"60px"},attrs:{"wrapper-col":{span:12,offset:5}}},[s("a-button",{staticStyle:{width:"128px"},attrs:{size:"large",type:"primary","html-type":"submit"}},[t._v("下一步")])],1)],1)],1):"css"===t.status?s("div",{staticClass:"insert_two"},[s("div",{staticStyle:{display:"flex"}},[s("div",{staticStyle:{flex:"0 0 15%"}},[s("div",{staticClass:"border"},t._l(t.tags,function(e,a){return s("div",{key:e.title,staticClass:"checkbox-item"},[s("a-checkbox",{attrs:{checked:e.checked},on:{change:t.onChange,click:function(e){t.currentIdx=a}}},[t._v(t._s(e.title))]),t._v(" "),s("p",[0!==a?s("a-icon",{attrs:{type:"arrow-up"},on:{click:function(e){return t.up(a)}}}):t._e(),t._v(" "),a!==t.tags.length-1?s("a-icon",{attrs:{type:"arrow-down"},on:{click:function(e){return t.down(a)}}}):t._e()],1)],1)}),0)]),t._v(" "),s("div",{staticStyle:{flex:"0 0 62%"}},[s("div",{staticClass:"border",staticStyle:{padding:"0"}},[s("div",{staticClass:"myiframe-box"},[s("iframe",{staticClass:"myiframe",attrs:{src:t.url,frameborder:"0"}}),t._v(" "),s("div",{staticClass:"qfy-btn-group",style:t.styleObject},t._l(t.tags,function(e){return e.checked?s("div",{key:e.title},[t._v(t._s(e.title))]):t._e()}),0)])])]),t._v(" "),s("div",{staticStyle:{flex:"0 0 23%"}},[s("div",{staticClass:"border"},[s("div",{staticStyle:{margin:"20px 0"}},[s("span",[t._v("按钮位置：")]),t._v(" "),s("a-select",{staticStyle:{width:"160px"},attrs:{size:"large",placeholder:"请选择按钮位置"},on:{change:t.handleSelectChange},model:{value:t.position,callback:function(e){t.position=e},expression:"position"}},t._l(t.positionList,function(e){return s("a-select-option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.title))])}),1)],1)])])]),t._v(" "),s("div",{staticStyle:{"margin-top":"20px","text-align":"center"}},[s("a-button",{staticStyle:{width:"128px"},attrs:{size:"large"},on:{click:function(e){t.status="url"}}},[t._v("上一步")]),t._v(" "),s("a-button",{staticStyle:{width:"128px","margin-left":"20px"},attrs:{type:"primary",size:"large"},on:{click:t.cssnext}},[t._v("下一步")])],1)]):"phone"===t.status?s("div",{staticClass:"insert_two"},[s("div",{staticStyle:{display:"flex"}},[s("div",{staticStyle:{flex:"0 0 30%"}},[s("div",{staticClass:"border"},[s("a-form",{staticStyle:{"margin-top":"20px"},attrs:{form:t.form2,"label-col":{span:8},"wrapper-col":{span:16}},on:{submit:t.handleSubmit2}},[s("a-form-item",{attrs:{label:"电话号码"}},[s("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phone",{initialValue:t.phone,rules:[{required:!0,message:"请输入电话号码"}]}],expression:"['phone', { initialValue:phone,rules: [{ required: true,message:'请输入电话号码'}]}]"}],attrs:{size:"large"}})],1),t._v(" "),s("a-form-item",{attrs:{label:"电话按钮文字"}},[s("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["phonetxt",{initialValue:t.phonetxt,rules:[{required:!0,message:"请输入电话按钮文字"}]}],expression:"['phonetxt', { initialValue:phonetxt,rules: [{ required: true,message:'请输入电话按钮文字'}]}]"}],attrs:{size:"large"}})],1),t._v(" "),s("a-form-item",{staticStyle:{"margin-top":"60px"},attrs:{"wrapper-col":{span:20,offset:2}}},[s("a-button",{staticStyle:{width:"128px"},attrs:{size:"large"},on:{click:t.prephone}},[t._v("上一步")]),t._v(" "),s("a-button",{staticStyle:{width:"128px","margin-left":"20px"},attrs:{size:"large",type:"primary","html-type":"submit"}},[t._v("下一步")])],1)],1)],1)]),t._v(" "),s("div",{staticStyle:{flex:"0 0 70%"}},[s("div",{staticClass:"border",staticStyle:{padding:"0"}},[s("div",{staticClass:"myiframe-box"},[s("iframe",{staticClass:"myiframe",attrs:{src:t.url,frameborder:"0"}}),t._v(" "),s("div",{staticClass:"qfy-btn-group",style:t.styleObject},t._l(t.tags,function(e){return e.checked?s("div",{key:e.title},[t._v(t._s(e.title))]):t._e()}),0)])])])])]):"wechat"===t.status?s("div",{staticClass:"insert_two"},[s("div",{staticStyle:{display:"flex"}},[s("div",{staticStyle:{flex:"0 0 30%"}},[s("div",{staticClass:"border"},[s("a-form",{staticStyle:{"margin-top":"20px"},attrs:{form:t.form3,"label-col":{span:8},"wrapper-col":{span:16}},on:{submit:t.handleSubmit3}},[s("a-form-item",{attrs:{label:"上传二维码"}},[s("a-upload",{directives:[{name:"decorator",rawName:"v-decorator",value:["wechat",{initialValue:t.wechat,rules:[{required:!0,message:"请上传二维码"}]}],expression:"['wechat', { initialValue:wechat,rules: [{ required: true,message:'请上传二维码'}]}]"}],attrs:{action:"/fileupload/upload","list-type":"picture-card","show-upload-list":!1,beforeUpload:t.beforeUpload},on:{change:t.handleChange}},[t.wechat?s("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.wechat}}):s("div",[s("a-icon",{attrs:{type:t.imgLoading?"loading":"plus"}}),t._v(" "),s("div",{staticClass:"ant-upload-text"},[t._v("上传")])],1)])],1),t._v(" "),s("a-form-item",{attrs:{label:"微信按钮文字"}},[s("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["wechattxt",{initialValue:t.wechattxt,rules:[{required:!0,message:"请输入微信按钮文字"}]}],expression:"['wechattxt', { initialValue:wechattxt,rules: [{ required: true,message:'请输入微信按钮文字'}]}]"}],attrs:{size:"large"}})],1),t._v(" "),s("a-form-item",{staticStyle:{"margin-top":"60px"},attrs:{"wrapper-col":{span:20,offset:2}}},[s("a-button",{staticStyle:{width:"128px"},attrs:{size:"large"},on:{click:t.prewechat}},[t._v("上一步")]),t._v(" "),s("a-button",{staticStyle:{width:"128px","margin-left":"20px"},attrs:{size:"large",type:"primary","html-type":"submit"}},[t._v("下一步")])],1)],1)],1)]),t._v(" "),s("div",{staticStyle:{flex:"0 0 70%"}},[s("div",{staticClass:"border",staticStyle:{padding:"0"}},[s("div",{staticClass:"myiframe-box"},[s("iframe",{staticClass:"myiframe",attrs:{src:t.url,frameborder:"0"}}),t._v(" "),s("div",{staticClass:"qfy-btn-group",style:t.styleObject},t._l(t.tags,function(e){return e.checked?s("div",{key:e.title},[t._v(t._s(e.title))]):t._e()}),0)])])])])]):"code"===t.status?s("div",[s("div",{staticClass:"insert_code"},[s("p",[t._v("安装代码")]),t._v(" "),s("p",[t._v("站点网址："+t._s(t.url))]),t._v(" "),s("div",{staticClass:"code-copy"},[t._v(t._s(t.html))])])]):t._e()]):s("div",{staticClass:"insert_none"},[s("p",[t._v("您还未添加网页插件")]),t._v(" "),s("a-button",{attrs:{type:"primary",size:"large"},on:{click:function(e){t.inserting=!0}}},[t._v("添加网页插件")])],1)]),t._v(" "),s("a-tab-pane",{key:"2",attrs:{tab:"APP"}},[t._v("Content of Tab Pane 2")]),t._v(" "),s("a-tab-pane",{key:"3",attrs:{tab:"微信公众号"}},[t._v("Content of Tab Pane 3")]),t._v(" "),s("a-tab-pane",{key:"4",attrs:{tab:"微信小程序"}},[t._v("Content of Tab Pane 3")])],1)],1)},staticRenderFns:[]};var c=s("C7Lr")(l,o,!1,function(t){s("95Qj")},"data-v-4b8f504c",null).exports;a.a.use(n.a);var u=new n.a({routes:[{path:"/",name:"HelloWorld",component:c}]}),p=s("j6mW");s("PTGP");a.a.use(p.a),a.a.config.productionTip=!1,new a.a({el:"#app",router:u,components:{App:r},template:"<App/>"})},PTGP:function(t,e){},Raw3:function(t,e){},hcb9:function(t,e,s){var a={"./af":"sujw","./af.js":"sujw","./ar":"Rrj4","./ar-dz":"Sevq","./ar-dz.js":"Sevq","./ar-kw":"HdsF","./ar-kw.js":"HdsF","./ar-ly":"Anuf","./ar-ly.js":"Anuf","./ar-ma":"JRrb","./ar-ma.js":"JRrb","./ar-sa":"k0hu","./ar-sa.js":"k0hu","./ar-tn":"3E7p","./ar-tn.js":"3E7p","./ar.js":"Rrj4","./az":"SO54","./az.js":"SO54","./be":"96RF","./be.js":"96RF","./bg":"gb0x","./bg.js":"gb0x","./bm":"pOeR","./bm.js":"pOeR","./bn":"3HXy","./bn.js":"3HXy","./bo":"u2ZT","./bo.js":"u2ZT","./br":"AwVA","./br.js":"AwVA","./bs":"NnH0","./bs.js":"NnH0","./ca":"vjx4","./ca.js":"vjx4","./cs":"ul0d","./cs.js":"ul0d","./cv":"G+EY","./cv.js":"G+EY","./cy":"1Bfr","./cy.js":"1Bfr","./da":"/XF1","./da.js":"/XF1","./de":"ZBqa","./de-at":"WBem","./de-at.js":"WBem","./de-ch":"vRtm","./de-ch.js":"vRtm","./de.js":"ZBqa","./dv":"7ivI","./dv.js":"7ivI","./el":"qWU1","./el.js":"qWU1","./en-au":"EtXW","./en-au.js":"EtXW","./en-ca":"iw9d","./en-ca.js":"iw9d","./en-gb":"MdAW","./en-gb.js":"MdAW","./en-ie":"4Qnp","./en-ie.js":"4Qnp","./en-il":"BDWq","./en-il.js":"BDWq","./en-in":"lYUf","./en-in.js":"lYUf","./en-nz":"amD+","./en-nz.js":"amD+","./en-sg":"Kprw","./en-sg.js":"Kprw","./eo":"T/wW","./eo.js":"T/wW","./es":"cFAv","./es-do":"6dgl","./es-do.js":"6dgl","./es-us":"K7u+","./es-us.js":"K7u+","./es.js":"cFAv","./et":"mGwW","./et.js":"mGwW","./eu":"Pg4b","./eu.js":"Pg4b","./fa":"yESV","./fa.js":"yESV","./fi":"Q//Z","./fi.js":"Q//Z","./fil":"o4Yj","./fil.js":"o4Yj","./fo":"gl/G","./fo.js":"gl/G","./fr":"47zq","./fr-ca":"5Rg3","./fr-ca.js":"5Rg3","./fr-ch":"5f/m","./fr-ch.js":"5f/m","./fr.js":"47zq","./fy":"Ng4C","./fy.js":"Ng4C","./ga":"IQpl","./ga.js":"IQpl","./gd":"nka3","./gd.js":"nka3","./gl":"mihe","./gl.js":"mihe","./gom-deva":"PHCa","./gom-deva.js":"PHCa","./gom-latn":"zVKK","./gom-latn.js":"zVKK","./gu":"dQs2","./gu.js":"dQs2","./he":"zvwm","./he.js":"zvwm","./hi":"Sq6i","./hi.js":"Sq6i","./hr":"eOEc","./hr.js":"eOEc","./hu":"MTAC","./hu.js":"MTAC","./hy-am":"qzmc","./hy-am.js":"qzmc","./id":"m0uh","./id.js":"m0uh","./is":"FtWp","./is.js":"FtWp","./it":"Gycp","./it-ch":"ZnnW","./it-ch.js":"ZnnW","./it.js":"Gycp","./ja":"1tS/","./ja.js":"1tS/","./jv":"6nzu","./jv.js":"6nzu","./ka":"Hqqu","./ka.js":"Hqqu","./kk":"kDTi","./kk.js":"kDTi","./km":"qnhy","./km.js":"qnhy","./kn":"9vXC","./kn.js":"9vXC","./ko":"PIUM","./ko.js":"PIUM","./ku":"ydN4","./ku.js":"ydN4","./ky":"YTTa","./ky.js":"YTTa","./lb":"MxgD","./lb.js":"MxgD","./lo":"K7Hs","./lo.js":"K7Hs","./lt":"Rmkd","./lt.js":"Rmkd","./lv":"TIvN","./lv.js":"TIvN","./me":"mrQB","./me.js":"mrQB","./mi":"VI+C","./mi.js":"VI+C","./mk":"s/Rp","./mk.js":"s/Rp","./ml":"16aP","./ml.js":"16aP","./mn":"0X6E","./mn.js":"0X6E","./mr":"t3c5","./mr.js":"t3c5","./ms":"5Gr9","./ms-my":"VQI3","./ms-my.js":"VQI3","./ms.js":"5Gr9","./mt":"HNPZ","./mt.js":"HNPZ","./my":"/tYy","./my.js":"/tYy","./nb":"xoya","./nb.js":"xoya","./ne":"DiT+","./ne.js":"DiT+","./nl":"Yd3n","./nl-be":"MMdN","./nl-be.js":"MMdN","./nl.js":"Yd3n","./nn":"8oEf","./nn.js":"8oEf","./oc-lnc":"K2kV","./oc-lnc.js":"K2kV","./pa-in":"+T9b","./pa-in.js":"+T9b","./pl":"Npku","./pl.js":"Npku","./pt":"sOAG","./pt-br":"JDBR","./pt-br.js":"JDBR","./pt.js":"sOAG","./ro":"1Esx","./ro.js":"1Esx","./ru":"PlOw","./ru.js":"PlOw","./sd":"va1X","./sd.js":"va1X","./se":"jVgL","./se.js":"jVgL","./si":"00wQ","./si.js":"00wQ","./sk":"YQKB","./sk.js":"YQKB","./sl":"9+DL","./sl.js":"9+DL","./sq":"koYt","./sq.js":"koYt","./sr":"FTLZ","./sr-cyrl":"wh/n","./sr-cyrl.js":"wh/n","./sr.js":"FTLZ","./ss":"EPIq","./ss.js":"EPIq","./sv":"CBBQ","./sv.js":"CBBQ","./sw":"Ongs","./sw.js":"Ongs","./ta":"Ccv8","./ta.js":"Ccv8","./te":"Ddt2","./te.js":"Ddt2","./tet":"xZj2","./tet.js":"xZj2","./tg":"M4Lt","./tg.js":"M4Lt","./th":"3uyc","./th.js":"3uyc","./tk":"63YL","./tk.js":"63YL","./tl-ph":"ZxXD","./tl-ph.js":"ZxXD","./tlh":"Gjp9","./tlh.js":"Gjp9","./tr":"xmIl","./tr.js":"xmIl","./tzl":"WQir","./tzl.js":"WQir","./tzm":"iO1J","./tzm-latn":"oWo9","./tzm-latn.js":"oWo9","./tzm.js":"iO1J","./ug-cn":"IiXR","./ug-cn.js":"IiXR","./uk":"Oo6k","./uk.js":"Oo6k","./ur":"gasK","./ur.js":"gasK","./uz":"RQ2C","./uz-latn":"V9IH","./uz-latn.js":"V9IH","./uz.js":"RQ2C","./vi":"ghVF","./vi.js":"ghVF","./x-pseudo":"gCEX","./x-pseudo.js":"gCEX","./yo":"BeWs","./yo.js":"BeWs","./zh-cn":"sb68","./zh-cn.js":"sb68","./zh-hk":"j761","./zh-hk.js":"j761","./zh-mo":"T5qO","./zh-mo.js":"T5qO","./zh-tw":"9rk6","./zh-tw.js":"9rk6"};function i(t){return s(r(t))}function r(t){var e=a[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}i.keys=function(){return Object.keys(a)},i.resolve=r,t.exports=i,i.id="hcb9"},j1Fx:function(t,e){t.exports={name:"ant-design-vue",version:"1.6.4",title:"Ant Design Vue",description:"An enterprise-class UI design language and Vue-based implementation",keywords:["ant","design","antd","vue","vueComponent","component","components","ui","framework","frontend"],main:"lib/index.js",module:"es/index.js",typings:"types/index.d.ts",files:["dist","lib","es","types","scripts"],scripts:{dev:"webpack-dev-server",start:"cross-env NODE_ENV=development webpack-dev-server --config webpack.config.js",test:"cross-env NODE_ENV=test jest --config .jest.js",compile:"node antd-tools/cli/run.js compile",pub:"node antd-tools/cli/run.js pub","pub-with-ci":"node antd-tools/cli/run.js pub-with-ci",prepublish:"node antd-tools/cli/run.js guard","pre-publish":"node ./scripts/prepub",prettier:"prettier -c --write '**/*'","pretty-quick":"pretty-quick",dist:"node antd-tools/cli/run.js dist",lint:"eslint -c ./.eslintrc --fix --ext .jsx,.js,.vue ./components","lint:site":"eslint -c ./.eslintrc --fix --ext .jsx,.js,.vue ./antdv-demo","lint:docs":"eslint -c ./.eslintrc --fix --ext .jsx,.js,.vue,.md ./antdv-demo/docs/**/demo/**","lint:style":'stylelint "{site,components}/**/*.less" --syntax less',codecov:"codecov",postinstall:'node scripts/postinstall || echo "ignore"'},repository:{type:"git",url:"git+https://github.com/vueComponent/ant-design-vue.git"},license:"MIT",bugs:{url:"https://github.com/vueComponent/ant-design-vue/issues"},homepage:"https://www.antdv.com/",peerDependencies:{vue:">=2.6.0","vue-template-compiler":">=2.6.0"},devDependencies:{"@commitlint/cli":"^8.0.0","@commitlint/config-conventional":"^8.0.0","@octokit/rest":"^16.0.0","@vue/cli-plugin-eslint":"^4.0.0","@vue/server-test-utils":"1.0.0-beta.16","@vue/test-utils":"1.0.0-beta.16",acorn:"^7.0.0",autoprefixer:"^9.6.0",axios:"^0.19.0","babel-cli":"^6.26.0","babel-core":"^6.26.0","babel-eslint":"^10.0.1","babel-helper-vue-jsx-merge-props":"^2.0.3","babel-jest":"^23.6.0","babel-loader":"^7.1.2","babel-plugin-import":"^1.1.1","babel-plugin-inline-import-data-uri":"^1.0.1","babel-plugin-istanbul":"^6.0.0","babel-plugin-syntax-dynamic-import":"^6.18.0","babel-plugin-syntax-jsx":"^6.18.0","babel-plugin-transform-class-properties":"^6.24.1","babel-plugin-transform-decorators":"^6.24.1","babel-plugin-transform-decorators-legacy":"^1.3.4","babel-plugin-transform-es3-member-expression-literals":"^6.22.0","babel-plugin-transform-es3-property-literals":"^6.22.0","babel-plugin-transform-object-assign":"^6.22.0","babel-plugin-transform-object-rest-spread":"^6.26.0","babel-plugin-transform-runtime":"~6.23.0","babel-plugin-transform-vue-jsx":"^3.7.0","babel-polyfill":"^6.26.0","babel-preset-env":"^1.6.1","case-sensitive-paths-webpack-plugin":"^2.1.2",chalk:"^3.0.0",cheerio:"^1.0.0-rc.2",codecov:"^3.0.0",colorful:"^2.1.0",commander:"^4.0.0","compare-versions":"^3.3.0","cross-env":"^7.0.0","css-loader":"^3.0.0","deep-assign":"^2.0.0","enquire-js":"^0.2.1",eslint:"^6.8.0","eslint-config-prettier":"^6.10.1","eslint-plugin-html":"^6.0.0","eslint-plugin-markdown":"^2.0.0-alpha.0","eslint-plugin-vue":"^6.2.2","fetch-jsonp":"^1.1.3","fs-extra":"^8.0.0",glob:"^7.1.2",gulp:"^4.0.1","gulp-babel":"^7.0.0","gulp-strip-code":"^0.1.4","html-webpack-plugin":"^3.2.0",husky:"^4.0.0","istanbul-instrumenter-loader":"^3.0.0",jest:"^24.0.0","jest-serializer-vue":"^2.0.0","jest-transform-stub":"^2.0.0","js-base64":"^3.0.0","json-templater":"^1.2.0",jsonp:"^0.2.1",less:"^3.9.0","less-loader":"^6.0.0","less-plugin-npm-import":"^2.1.0","lint-staged":"^10.0.0",marked:"0.3.18",merge2:"^1.2.1","mini-css-extract-plugin":"^0.9.0",minimist:"^1.2.0",mkdirp:"^0.5.1",mockdate:"^2.0.2",nprogress:"^0.2.0","optimize-css-assets-webpack-plugin":"^5.0.1",postcss:"^7.0.6","postcss-loader":"^3.0.0",prettier:"^1.18.2","pretty-quick":"^2.0.0",querystring:"^0.2.0","raw-loader":"^4.0.0",reqwest:"^2.0.5",rimraf:"^3.0.0","rucksack-css":"^1.0.2","selenium-server":"^3.0.1",semver:"^7.0.0","style-loader":"^1.0.0",stylelint:"^13.0.0","stylelint-config-prettier":"^8.0.0","stylelint-config-standard":"^19.0.0","terser-webpack-plugin":"^3.0.3",through2:"^3.0.0","url-loader":"^3.0.0",vue:"^2.6.11","vue-antd-md-loader":"^1.1.0","vue-clipboard2":"0.3.1","vue-draggable-resizable":"^2.1.0","vue-eslint-parser":"^7.0.0","vue-i18n":"^8.3.2","vue-infinite-scroll":"^2.0.2","vue-jest":"^2.5.0","vue-loader":"^15.6.2","vue-router":"^3.0.1","vue-server-renderer":"^2.6.11","vue-template-compiler":"^2.6.11","vue-virtual-scroller":"^1.0.0",vuex:"^3.1.0",webpack:"^4.28.4","webpack-cli":"^3.2.1","webpack-dev-server":"^3.1.14","webpack-merge":"^4.1.1",webpackbar:"^4.0.0","xhr-mock":"^2.5.1"},dependencies:{"@ant-design/icons":"^2.1.1","@ant-design/icons-vue":"^2.0.0","@simonwep/pickr":"~1.7.0","add-dom-event-listener":"^1.0.2","array-tree-filter":"^2.1.0","async-validator":"^3.0.3","babel-helper-vue-jsx-merge-props":"^2.0.3","babel-runtime":"6.x",classnames:"^2.2.5","component-classes":"^1.2.6","dom-align":"^1.10.4","dom-closest":"^0.2.0","dom-scroll-into-view":"^2.0.0","enquire.js":"^2.1.6",intersperse:"^1.0.0","is-mobile":"^2.2.1","is-negative-zero":"^2.0.0",ismobilejs:"^1.0.0",json2mq:"^0.2.0",lodash:"^4.17.5",moment:"^2.21.0","mutationobserver-shim":"^0.3.2","node-emoji":"^1.10.0","omit.js":"^1.0.0",raf:"^3.4.0","resize-observer-polyfill":"^1.5.1","shallow-equal":"^1.0.0",shallowequal:"^1.0.2","vue-ref":"^2.0.0",warning:"^4.0.0"},sideEffects:["site/*","components/style.js","components/**/style/*","*.vue","*.md","dist/*","es/**/style/*","lib/**/style/*","*.less"],__npminstall_done:"Tue Aug 04 2020 14:27:06 GMT+0800 (GMT+08:00)",_from:"ant-design-vue@1.6.4",_resolved:"https://registry.npm.taobao.org/ant-design-vue/download/ant-design-vue-1.6.4.tgz"}}},["NHnr"]);
//# sourceMappingURL=app.be5a6dcd1379424131b1.js.map