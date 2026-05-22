System.register("chunks:///_virtual/app-global",["./AppGlobal.ts","./CommonPopUpView.ts","./GlobalData.ts"],(function(){return{setters:[null,null,null],execute:function(){}}}));

System.register("chunks:///_virtual/AppGlobal.ts",["./rollupPluginModLoBabelHelpers.js","cc","./index3.ts","./BaseModule.ts","./SoundManager.ts","./XForge.ts","./GlobalData.ts","./MiniSDK.ts"],(function(n){var t,e,o,l,i,a,u,c;return{setters:[function(n){t=n.inheritsLoose},function(n){e=n.cclegacy},null,function(n){o=n.BaseModule,l=n.global},function(n){i=n.SoundManager},function(n){a=n.app},function(n){u=n.GlobalData},function(n){c=n.miniSDK}],execute:function(){var s;e._RF.push({},"2f078H0H+5M04W6JtB0Rcg1","AppGlobal",void 0);n("Global",l()(s=function(n){function e(){return n.apply(this,arguments)||this}t(e,n);var o=e.prototype;return o.init=function(t,e,o){n.prototype.init.call(this,t,e,o);var l=a.global.useModel(u);i.musicVolumeScale=l.musicEnabled?1:0,i.effectVolumeScale=l.effectEnabled?1:0,l.musicEnabled&&a.global.sound.playMusic("bgm"),c.init({videoID:"",payEnv:1}),c.openMenuShare({title:"一起来玩这款游戏吧！"})},o.onLoad=function(){},e}(o))||s);e._RF.pop()}}}));

System.register("chunks:///_virtual/CommonPopUpView.ts",["./rollupPluginModLoBabelHelpers.js","cc"],(function(t){var e,i,r,n,o,l,a,p,c;return{setters:[function(t){e=t.applyDecoratedDescriptor,i=t.inheritsLoose,r=t.initializerDefineProperty,n=t.assertThisInitialized},function(t){o=t.cclegacy,l=t._decorator,a=t.Label,p=t.CCString,c=t.Component}],execute:function(){var u,s,y,f,m,h,b;o._RF.push({},"1c38a8ZyylE77+pzZzXyJy7","CommonPopUpView",void 0);var g=l.ccclass,w=l.property;t("CommonPopUpView",(u=g("CommonPopUpView"),s=w(a),y=w(p),u((h=e((m=function(t){function e(){for(var e,i=arguments.length,o=new Array(i),l=0;l<i;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o))||this,r(e,"title",h,n(e)),r(e,"titleStr",b,n(e)),e}return i(e,t),e.prototype.start=function(){this.title.string=this.titleStr},e}(c)).prototype,"title",[s],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),b=e(m.prototype,"titleStr",[y],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"提示"}}),f=m))||f));o._RF.pop()}}}));

System.register("chunks:///_virtual/GlobalData.ts",["./rollupPluginModLoBabelHelpers.js","cc","./index4.ts","./BaseModel.ts","./XForge.ts"],(function(e){var t,n,i,s,l,o,a;return{setters:[function(e){t=e.inheritsLoose,n=e.createClass,i=e.assertThisInitialized},function(e){s=e.cclegacy},function(e){l=e.createStore},function(e){o=e.BaseModel},function(e){a=e.app}],execute:function(){s._RF.push({},"2d5ceu51XdCt6IM6rIIt7Cl","GlobalData",void 0);var c="game_data",r="setting_effect",u="setting_music",h="setting_shock";e("GlobalData",function(e){function s(){var t;(t=e.call(this)||this)._level=1,t._coin=0,t._hammer=0,t._mobile=0,t._effectEnabled=!0,t._musicEnabled=!0,t._shockEnabled=!0;var n,s,o,_,f=a.lib.storage.get(c);f&&(t._level=null!=(n=f.level)?n:1,t._coin=null!=(s=f.coin)?s:0,t._hammer=null!=(o=f.hammer)?o:0,t._mobile=null!=(_=f.mobile)?_:0);var b=a.lib.storage.get(r);null!=b&&(t._effectEnabled=b);var m=a.lib.storage.get(u);null!=m&&(t._musicEnabled=m);var g=a.lib.storage.get(h);return null!=g&&(t._shockEnabled=g),l(i(t))||i(t)}return t(s,e),s.prototype.save=function(){a.lib.storage.set(c,{level:this._level,coin:this._coin,hammer:this._hammer,mobile:this._mobile})},n(s,[{key:"level",get:function(){return this._level},set:function(e){this._level=e,this.save()}},{key:"hammer",get:function(){return this._hammer},set:function(e){this._hammer=e,this.save()}},{key:"mobile",get:function(){return this._mobile},set:function(e){this._mobile=e,this.save()}},{key:"coin",get:function(){return this._coin},set:function(e){this._coin=e,this.save()}},{key:"effectEnabled",get:function(){return this._effectEnabled},set:function(e){this._effectEnabled=e,a.lib.storage.set(r,e)}},{key:"musicEnabled",get:function(){return this._musicEnabled},set:function(e){this._musicEnabled=e,a.lib.storage.set(u,e)}},{key:"shockEnabled",get:function(){return this._shockEnabled},set:function(e){this._shockEnabled=e,a.lib.storage.set(h,e)}}]),s}(o));s._RF.pop()}}}));

(function(r) {
  r('virtual:///prerequisite-imports/app-global', 'chunks:///_virtual/app-global'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});