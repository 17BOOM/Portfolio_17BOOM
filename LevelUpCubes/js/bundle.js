(function () {
    'use strict';

    class _EventName {
        constructor() {
            this.FrameEmit = {
                SetLocalData: "FrameEmit_SetLocalData",
                GetLocalData: "FrameEmit_GetLocalData",
                ShowUI: "FrameEmit_ShowUI",
                HideUI: "FrameEmit_HideUI",
                RemoveUI: "FrameEmit_RemoveUI",
            };
            this.FrameOn = {
                StartGame: "FrameOn_StartGame",
                GameOver: "FrameOn_GameOver"
            };
            this.SettingChange = "SettingChange";
            this.GameInfoUpdate = "GameInfoUpdate";
            this.startGame = "startGame";
            this.GameReset = "GameReset";
            this.GameEnd = "GameEnd";
        }
    }
    const EventName = new _EventName();

    class AutoPage extends Laya.Script {
        onAwake() {
            let View = this.owner;
            View.width = Laya.stage.width;
            View.height = Laya.stage.height;
        }
    }

    class EventControl {
        constructor() {
            this.eventDispatcher = new Laya.EventDispatcher();
        }
        emit(InName, data = null) {
            return this.eventDispatcher.event(InName, [data]);
        }
        on(InName, caller, listener, arg) {
            this.eventDispatcher.on(InName, caller, listener, arg);
        }
        once(InName, caller, listener, arg) {
            this.eventDispatcher.once(InName, caller, listener, arg);
        }
        off(InName, caller, listener) {
            this.eventDispatcher.off(InName, caller, listener);
        }
        offAll(caller) {
            this.eventDispatcher.offAllCaller(caller);
        }
    }
    var EventControl$1 = new EventControl();

    class _UIControl {
        constructor() {
            this.Views = [];
        }
        ShowUI(_class, data) {
            let _index = UIControl.GetUIIndexFromViews(_class.NAME);
            let _view = UIControl.Views[_index];
            _class.DATA = data;
            if (!_view) {
                _view = new _class(data);
                UIControl.Views.push(_view);
            }
            _view.name = _class.NAME;
            Laya.stage.addChild(_view);
            _view.visible = true;
            if (_class.AUTO) {
                _view.addComponent(AutoPage);
            }
            EventControl$1.emit(EventName.FrameEmit.ShowUI, _view.name);
            return _view;
        }
        HideUI(_class) {
            let _index = UIControl.GetUIIndexFromViews(_class.NAME);
            let _view = UIControl.Views[_index];
            if (_view) {
                Laya.stage.removeChild(_view);
                _view.visible = false;
                EventControl$1.emit(EventName.FrameEmit.HideUI, _view.name);
            }
        }
        RemoveUI(_class) {
            let _index = UIControl.GetUIIndexFromViews(_class.NAME);
            if (_index == -1)
                return;
            let _view = UIControl.Views[_index];
            if (_view) {
                _view.visible = false;
                _class.DATA = null;
                Laya.timer.clearAll(_view);
                Laya.stage.offAllCaller(_view);
                EventControl$1.offAll(_view);
                UIControl.Views.splice(_index, 1);
                Laya.timer.once(100, null, () => {
                    Laya.stage.removeChild(_view);
                    _view.destroy();
                    EventControl$1.emit(EventName.FrameEmit.RemoveUI, _view.name);
                });
            }
        }
        GetUI(_name) {
            let _index = UIControl.GetUIIndexFromViews(_name.name);
            let _view = UIControl.Views[_index];
            if (_view) {
                return _view;
            }
            else {
                return null;
            }
        }
        GetUIIndexFromViews(_names) {
            return UIControl.Views.findIndex(_ui => {
                return _ui.name == _names;
            });
        }
    }
    const UIControl = new _UIControl();

    class GameData {
        static getShaderData() {
            let shaderObj = {};
            let arr = new Array();
            for (let i = 0; i < Laya.Shader3D.debugShaderVariantCollection.variantCount; i++) {
                let shadervariant = Laya.Shader3D.debugShaderVariantCollection.getByIndex(i);
                let shaderName = shadervariant.shader.name;
                if (!shaderObj[shaderName])
                    shaderObj[shaderName] = [];
                arr = shaderObj[shaderName];
                let obj = {};
                obj.defineNames = shadervariant.defineNames;
                obj.passIndex = shadervariant.passIndex;
                obj.subShaderIndex = shadervariant.subShaderIndex;
                arr.push(obj);
            }
            console.log(JSON.stringify(shaderObj));
            return shaderObj;
        }
        static compileShader() {
            Laya.loader.load("shader.Json", Laya.Handler.create(this, this.onLoaded), null, Laya.Loader.JSON);
        }
        static onLoaded() {
            var json = Laya.loader.getRes("shader.Json");
            let shaderData = json;
            for (const key in shaderData) {
                const element1 = shaderData[key];
                for (let i = 0; i < element1.length; i++) {
                    const element2 = element1[i];
                    Laya.Shader3D.compileShaderByDefineNames(key, element2.subShaderIndex, element2.passIndex, element2.defineNames);
                }
            }
        }
        static createLine(point = []) {
            var vertexDeclaration = Laya.VertexMesh.getVertexDeclaration("POSITION,NORMAL,UV");
            var z = 1;
            var width = 0.4;
            var halfWidth = width / 2;
            var v_a = new Array();
            var i_a = new Array();
            for (var i = 0; i < point.length - 2; i = i + 2) {
                var changeAngle = Math.atan2((point[3 + i] - point[1 + i]), (point[2 + i] - point[0 + i]));
                v_a.push(point[0 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle));
                v_a.push(z);
                v_a.push(point[1 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(point[2 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle));
                v_a.push(z);
                v_a.push(point[3 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(point[2 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle));
                v_a.push(z);
                v_a.push(point[3 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(point[0 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle));
                v_a.push(z);
                v_a.push(point[1 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                i_a.push(0 + 4 * (i / 2));
                i_a.push(3 + 4 * (i / 2));
                i_a.push(2 + 4 * (i / 2));
                i_a.push(2 + 4 * (i / 2));
                i_a.push(1 + 4 * (i / 2));
                i_a.push(0 + 4 * (i / 2));
                if (i != point.length - 4) {
                    i_a.push(1 + 4 * (i / 2));
                    i_a.push(2 + 4 * (i / 2));
                    i_a.push(3 + 4 * ((i / 2) + 1));
                    i_a.push(3 + 4 * ((i / 2) + 1));
                    i_a.push(0 + 4 * ((i / 2) + 1));
                    i_a.push(1 + 4 * (i / 2));
                }
            }
            var total = v_a.length / 8;
            var f0 = total - 1 - 2;
            var f1 = total - 1 - 1;
            for (var i = 0; i < point.length - 2; i = i + 2) {
                var changeAngle = Math.atan2((point[3 + i] - point[1 + i]), (point[2 + i] - point[0 + i]));
                v_a.push(point[0 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle));
                v_a.push(z / 3 * 2);
                v_a.push(point[1 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(point[2 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle));
                v_a.push(z / 3 * 2);
                v_a.push(point[3 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(point[2 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle));
                v_a.push(z / 3 * 2);
                v_a.push(point[3 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(point[0 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle));
                v_a.push(z / 3 * 2);
                v_a.push(point[1 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                i_a.push(0 + 4 * (i / 2) + total);
                i_a.push(1 + 4 * (i / 2) + total);
                i_a.push(2 + 4 * (i / 2) + total);
                i_a.push(2 + 4 * (i / 2) + total);
                i_a.push(3 + 4 * (i / 2) + total);
                i_a.push(0 + 4 * (i / 2) + total);
                if (i != point.length - 4) {
                    i_a.push(3 + 4 * (i / 2) + total);
                    i_a.push(2 + 4 * (i / 2) + total);
                    i_a.push(1 + 4 * ((i / 2) + 1) + total);
                    i_a.push(1 + 4 * ((i / 2) + 1) + total);
                    i_a.push(0 + 4 * ((i / 2) + 1) + total);
                    i_a.push(3 + 4 * (i / 2) + total);
                }
                i_a.push(0 + 4 * (i / 2));
                i_a.push(0 + 4 * (i / 2) + total);
                i_a.push(1 + 4 * (i / 2));
                i_a.push(1 + 4 * (i / 2) + total);
                i_a.push(1 + 4 * (i / 2));
                i_a.push(0 + 4 * (i / 2) + total);
                if (i != point.length - 4) {
                    i_a.push(1 + 4 * ((i / 2) + 1));
                    i_a.push(1 + 4 * ((i / 2) + 1) + total);
                    i_a.push(0 + 4 * (i / 2));
                    i_a.push(0 + 4 * (i / 2) + total);
                    i_a.push(0 + 4 * (i / 2));
                    i_a.push(1 + 4 * ((i / 2) + 1) + total);
                }
                i_a.push(2 + 4 * (i / 2) + total);
                i_a.push(3 + 4 * (i / 2) + total);
                i_a.push(3 + 4 * (i / 2));
                i_a.push(3 + 4 * (i / 2));
                i_a.push(2 + 4 * (i / 2));
                i_a.push(2 + 4 * (i / 2) + total);
                if (i != point.length - 4) {
                    i_a.push(2 + 4 * (i / 2));
                    i_a.push(3 + 4 * (i / 2));
                    i_a.push(3 + 4 * ((i / 2) + 1) + total);
                    i_a.push(3 + 4 * ((i / 2) + 1) + total);
                    i_a.push(2 + 4 * ((i / 2) + 1) + total);
                    i_a.push(2 + 4 * (i / 2));
                }
            }
            var total1 = v_a.length / 8;
            var f3 = total1 - 1 - 2;
            var f2 = total1 - 1 - 1;
            i_a.push(f0);
            i_a.push(f3);
            i_a.push(f2);
            i_a.push(f2);
            i_a.push(f1);
            i_a.push(f0);
            for (var i = 0; i < point.length - 2; i = i + 2) {
                var changeAngle = Math.atan2((point[3 + i] - point[1 + i]), (point[2 + i] - point[0 + i]));
                v_a.push(-(point[0 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle)));
                v_a.push(-z / 3 * 2);
                v_a.push(-(point[1 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(-(point[2 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle)));
                v_a.push(-z / 3 * 2);
                v_a.push(-(point[3 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(-(point[2 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle)));
                v_a.push(-z / 3 * 2);
                v_a.push(-(point[3 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(-(point[0 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle)));
                v_a.push(-z / 3 * 2);
                v_a.push(-(point[1 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                i_a.push(0 + 4 * (i / 2) + total1);
                i_a.push(3 + 4 * (i / 2) + total1);
                i_a.push(2 + 4 * (i / 2) + total1);
                i_a.push(2 + 4 * (i / 2) + total1);
                i_a.push(1 + 4 * (i / 2) + total1);
                i_a.push(0 + 4 * (i / 2) + total1);
                if (i != point.length - 4) {
                    i_a.push(1 + 4 * (i / 2) + total1);
                    i_a.push(2 + 4 * (i / 2) + total1);
                    i_a.push(3 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(3 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(0 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(1 + 4 * (i / 2) + total1);
                }
            }
            var total2 = v_a.length / 8;
            var ff3 = total2 - 1 - 2;
            var ff2 = total2 - 1 - 1;
            for (var i = 0; i < point.length - 2; i = i + 2) {
                var changeAngle = Math.atan2((point[3 + i] - point[1 + i]), (point[2 + i] - point[0 + i]));
                v_a.push(-(point[0 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle)));
                v_a.push(-z);
                v_a.push(-(point[1 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(-(point[2 + i] + halfWidth * Math.cos(1.5 * Math.PI + changeAngle)));
                v_a.push(-z);
                v_a.push(-(point[3 + i] + halfWidth * Math.sin(1.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(-(point[2 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle)));
                v_a.push(-z);
                v_a.push(-(point[3 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                v_a.push(-(point[0 + i] + halfWidth * Math.cos(0.5 * Math.PI + changeAngle)));
                v_a.push(-z);
                v_a.push(-(point[1 + i] + halfWidth * Math.sin(0.5 * Math.PI + changeAngle)));
                v_a.push(0);
                v_a.push(0);
                v_a.push(-1);
                v_a.push(0);
                v_a.push(1);
                i_a.push(0 + 4 * (i / 2) + total2);
                i_a.push(1 + 4 * (i / 2) + total2);
                i_a.push(2 + 4 * (i / 2) + total2);
                i_a.push(2 + 4 * (i / 2) + total2);
                i_a.push(3 + 4 * (i / 2) + total2);
                i_a.push(0 + 4 * (i / 2) + total2);
                if (i != point.length - 4) {
                    i_a.push(3 + 4 * (i / 2) + total2);
                    i_a.push(0 + 4 * ((i / 2) + 1) + total2);
                    i_a.push(1 + 4 * ((i / 2) + 1) + total2);
                    i_a.push(1 + 4 * ((i / 2) + 1) + total2);
                    i_a.push(2 + 4 * (i / 2) + total2);
                    i_a.push(3 + 4 * (i / 2) + total2);
                }
                i_a.push(1 + 4 * (i / 2) + total1);
                i_a.push(0 + 4 * (i / 2) + total2);
                i_a.push(0 + 4 * (i / 2) + total1);
                i_a.push(1 + 4 * (i / 2) + total1);
                i_a.push(1 + 4 * (i / 2) + total2);
                i_a.push(0 + 4 * (i / 2) + total2);
                if (i != point.length - 4) {
                    i_a.push(0 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(1 + 4 * (i / 2) + total2);
                    i_a.push(1 + 4 * (i / 2) + total1);
                    i_a.push(1 + 4 * (i / 2) + total2);
                    i_a.push(0 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(0 + 4 * ((i / 2) + 1) + total2);
                }
                i_a.push(2 + 4 * (i / 2) + total2);
                i_a.push(3 + 4 * (i / 2) + total2);
                i_a.push(3 + 4 * (i / 2) + total1);
                i_a.push(3 + 4 * (i / 2) + total1);
                i_a.push(2 + 4 * (i / 2) + total1);
                i_a.push(2 + 4 * (i / 2) + total2);
                if (i != point.length - 4) {
                    i_a.push(3 + 4 * (i / 2) + total2);
                    i_a.push(2 + 4 * ((i / 2) + 1) + total2);
                    i_a.push(2 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(2 + 4 * ((i / 2) + 1) + total1);
                    i_a.push(3 + 4 * (i / 2) + total1);
                    i_a.push(3 + 4 * (i / 2) + total2);
                }
            }
            var total3 = v_a.length / 8;
            var ff0 = total3 - 1 - 2;
            var ff1 = total3 - 1 - 1;
            i_a.push(ff0);
            i_a.push(ff3);
            i_a.push(ff2);
            i_a.push(ff2);
            i_a.push(ff1);
            i_a.push(ff0);
            var vertices = new Float32Array(v_a);
            var indices = new Uint16Array(i_a);
            return Laya.PrimitiveMesh["_createMesh"](vertexDeclaration, vertices, indices);
        }
    }
    GameData.endCoin = 100;

    var View = Laya.View;
    var Dialog = Laya.Dialog;
    var Scene = Laya.Scene;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var View_Commercialize;
        (function (View_Commercialize) {
            class CustomAdPageUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/CustomAdPage");
                }
            }
            View_Commercialize.CustomAdPageUI = CustomAdPageUI;
            REG("ui.View_Commercialize.CustomAdPageUI", CustomAdPageUI);
            class LuckBoxPageUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/LuckBoxPage");
                }
            }
            View_Commercialize.LuckBoxPageUI = LuckBoxPageUI;
            REG("ui.View_Commercialize.LuckBoxPageUI", LuckBoxPageUI);
            class RecommendedAdPageUI extends Dialog {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/RecommendedAdPage");
                }
            }
            View_Commercialize.RecommendedAdPageUI = RecommendedAdPageUI;
            REG("ui.View_Commercialize.RecommendedAdPageUI", RecommendedAdPageUI);
            class View_Box1UI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Box1");
                }
            }
            View_Commercialize.View_Box1UI = View_Box1UI;
            REG("ui.View_Commercialize.View_Box1UI", View_Box1UI);
            class View_Box2UI extends Scene {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Box2");
                }
            }
            View_Commercialize.View_Box2UI = View_Box2UI;
            REG("ui.View_Commercialize.View_Box2UI", View_Box2UI);
            class View_DrawUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Draw");
                }
            }
            View_Commercialize.View_DrawUI = View_DrawUI;
            REG("ui.View_Commercialize.View_DrawUI", View_DrawUI);
            class View_EndLuckBoxPageUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_EndLuckBoxPage");
                }
            }
            View_Commercialize.View_EndLuckBoxPageUI = View_EndLuckBoxPageUI;
            REG("ui.View_Commercialize.View_EndLuckBoxPageUI", View_EndLuckBoxPageUI);
            class View_NativeBannerUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_NativeBanner");
                }
            }
            View_Commercialize.View_NativeBannerUI = View_NativeBannerUI;
            REG("ui.View_Commercialize.View_NativeBannerUI", View_NativeBannerUI);
            class View_NativeBigUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_NativeBig");
                }
            }
            View_Commercialize.View_NativeBigUI = View_NativeBigUI;
            REG("ui.View_Commercialize.View_NativeBigUI", View_NativeBigUI);
            class View_PrivacyUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Privacy");
                }
            }
            View_Commercialize.View_PrivacyUI = View_PrivacyUI;
            REG("ui.View_Commercialize.View_PrivacyUI", View_PrivacyUI);
            class View_SignUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Sign");
                }
            }
            View_Commercialize.View_SignUI = View_SignUI;
            REG("ui.View_Commercialize.View_SignUI", View_SignUI);
            class View_StoreUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Store");
                }
            }
            View_Commercialize.View_StoreUI = View_StoreUI;
            REG("ui.View_Commercialize.View_StoreUI", View_StoreUI);
            class View_TrialSkinUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_TrialSkin");
                }
            }
            View_Commercialize.View_TrialSkinUI = View_TrialSkinUI;
            REG("ui.View_Commercialize.View_TrialSkinUI", View_TrialSkinUI);
        })(View_Commercialize = ui.View_Commercialize || (ui.View_Commercialize = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var View_Game;
        (function (View_Game) {
            class View_BlackUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_Black");
                }
            }
            View_Game.View_BlackUI = View_BlackUI;
            REG("ui.View_Game.View_BlackUI", View_BlackUI);
            class View_colorUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_color");
                }
            }
            View_Game.View_colorUI = View_colorUI;
            REG("ui.View_Game.View_colorUI", View_colorUI);
            class View_CustomUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_Custom");
                }
            }
            View_Game.View_CustomUI = View_CustomUI;
            REG("ui.View_Game.View_CustomUI", View_CustomUI);
            class View_GameUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_Game");
                }
            }
            View_Game.View_GameUI = View_GameUI;
            REG("ui.View_Game.View_GameUI", View_GameUI);
            class View_GameOver_LoseUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_GameOver_Lose");
                }
            }
            View_Game.View_GameOver_LoseUI = View_GameOver_LoseUI;
            REG("ui.View_Game.View_GameOver_LoseUI", View_GameOver_LoseUI);
            class View_GameOver_WinUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_GameOver_Win");
                }
            }
            View_Game.View_GameOver_WinUI = View_GameOver_WinUI;
            REG("ui.View_Game.View_GameOver_WinUI", View_GameOver_WinUI);
            class View_LoadingUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_Loading");
                }
            }
            View_Game.View_LoadingUI = View_LoadingUI;
            REG("ui.View_Game.View_LoadingUI", View_LoadingUI);
            class View_MainUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_Main");
                }
            }
            View_Game.View_MainUI = View_MainUI;
            REG("ui.View_Game.View_MainUI", View_MainUI);
            class View_SettingUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Game/View_Setting");
                }
            }
            View_Game.View_SettingUI = View_SettingUI;
            REG("ui.View_Game.View_SettingUI", View_SettingUI);
        })(View_Game = ui.View_Game || (ui.View_Game = {}));
    })(ui || (ui = {}));

    class _Tools {
        get getPlatform() {
            if (Laya.Browser.window.qq && typeof Laya.Browser.window.qq.getSystemInfoSync == "function" && Laya.Browser.window.qq.getSystemInfoSync().benchmarkLevel) {
                return "qq";
            }
            else if (Laya.Browser.window.tt && typeof Laya.Browser.window.tt.getSystemInfoSync == "function" && Laya.Browser.window.tt.getSystemInfoSync().safeArea) {
                return "tt";
            }
            else if (Laya.Browser.window.wx && typeof Laya.Browser.window.wx.getSystemInfoSync == "function" && Laya.Browser.window.wx.getSystemInfoSync().benchmarkLevel) {
                return "wx";
            }
            else {
                return "other";
            }
        }
        WxWindowIfTip(content, callback) {
            if (Tools.getPlatform == "wx") {
                let data = {
                    content: content,
                    success(res) {
                        if (typeof callback == "function") {
                            callback(res.confirm);
                        }
                    }
                };
                wx.showModal(data);
            }
            else if (typeof alert && alert) {
                alert(content);
                if (typeof callback == "function") {
                    callback(true);
                }
            }
            else {
                console.log(content);
                if (typeof callback == "function") {
                    callback(true);
                }
            }
        }
        WxWindowTip(content, callback) {
            if (Tools.getPlatform == "wx") {
                let data = {
                    content: content,
                    showCancel: false,
                    success() {
                        if (typeof callback == "function") {
                            callback();
                        }
                    }
                };
                wx.showModal(data);
            }
            else if (typeof alert && alert) {
                alert(content);
                if (typeof callback == "function") {
                    callback(true);
                }
            }
            else {
                console.log(content);
                if (typeof callback == "function") {
                    callback(true);
                }
            }
        }
        isSameDay(startTime, endTime) {
            const startTimeMs = new Date(startTime).setHours(0, 0, 0, 0);
            console.log("startTimeMs" + startTimeMs);
            const endTimeMs = new Date(endTime).setHours(0, 0, 0, 0);
            console.log("endTimeMs" + endTimeMs);
            return startTimeMs === endTimeMs ? true : false;
        }
        add3DChild() {
        }
    }
    let Tools = new _Tools();

    const ResPath = {
        "BGM.mp3": "res/Music/BGM.mp3",
        "Button.mp3": "res/Music/Button.mp3",
        "Lose.mp3": "res/Music/Lose.mp3",
        "shoot.mp3": "res/Music/shoot.mp3",
        "Win.mp3": "res/Music/Win.mp3",
        "GunGIReflection.ltcb.ls": "LayaScene_3DScene/Conventional/Assets/Scenes/GunGIReflection.ltcb.ls",
        "Gun.ls": "LayaScene_3DScene/Conventional/Gun.ls",
        "SampleScene.ls": "LayaScene_3DScene/Conventional/SampleScene.ls",
        "game.ls": "LayaScene_game/Conventional/game.ls",
        "Bullet.lh": "LayaScene_3DScene/Conventional/Bullet.lh",
        "ChildUp.lh": "LayaScene_3DScene/Conventional/ChildUp.lh",
        "DamageDown.lh": "LayaScene_3DScene/Conventional/DamageDown.lh",
        "DamageUp.lh": "LayaScene_3DScene/Conventional/DamageUp.lh",
        "Ending.lh": "LayaScene_3DScene/Conventional/Ending.lh",
        "FireRateDown.lh": "LayaScene_3DScene/Conventional/FireRateDown.lh",
        "FireRateUp.lh": "LayaScene_3DScene/Conventional/FireRateUp.lh",
        "fx.lh": "LayaScene_3DScene/Conventional/fx.lh",
        "GameObject.lh": "LayaScene_3DScene/Conventional/GameObject.lh",
        "Gear.lh": "LayaScene_3DScene/Conventional/Gear.lh",
        "Money.lh": "LayaScene_3DScene/Conventional/Money.lh",
        "obstaclebox.lh": "LayaScene_3DScene/Conventional/obstaclebox.lh",
        "Player.lh": "LayaScene_game/Conventional/Player.lh",
        "TripleShot.lh": "LayaScene_3DScene/Conventional/TripleShot.lh",
        "Cube_Man.lh": "LayaScene_game/Conventional/Cube_Man.lh",
        "FX.lh": "LayaScene_game/Conventional/FX.lh",
        "Level_1.lh": "LayaScene_game/Conventional/Level_1.lh",
        "Level_2.lh": "LayaScene_game/Conventional/Level_2.lh",
        "Level_3.lh": "LayaScene_game/Conventional/Level_3.lh",
        "Level_4.lh": "LayaScene_game/Conventional/Level_4.lh"
    };
    let _ResPath = { "BGM.mp3": null, "Button.mp3": null, "Lose.mp3": null, "shoot.mp3": null, "Win.mp3": null, "GunGIReflection.ltcb.ls": null, "Gun.ls": null, "SampleScene.ls": null, "game.ls": null, "Bullet.lh": null, "ChildUp.lh": null, "DamageDown.lh": null, "DamageUp.lh": null, "Ending.lh": null, "FireRateDown.lh": null, "FireRateUp.lh": null, "fx.lh": null, "GameObject.lh": null, "Gear.lh": null, "Money.lh": null, "obstaclebox.lh": null, "Player.lh": null, "TripleShot.lh": null, "Cube_Man.lh": null, "FX.lh": null, "Level_1.lh": null, "Level_2.lh": null, "Level_3.lh": null, "Level_4.lh": null };
    const PackName = { "res": "res", "LayaScene_3DScene": "LayaScene_3DScene" };
    const ResGet = new Proxy(_ResPath, {
        get: function (target, propKey, receiver) {
            let result = Laya.loader.getRes(ResPath[propKey]);
            return result ? result : null;
        }
    });
    let VIEWJSONPATH = ["View_Commercialize/CustomAdPage.json", "View_Commercialize/LuckBoxPage.json", "View_Commercialize/RecommendedAdPage.json", "View_Commercialize/View_Box1.json", "View_Commercialize/View_Box2.json", "View_Commercialize/View_Draw.json", "View_Commercialize/View_EndLuckBoxPage.json", "View_Commercialize/View_NativeBanner.json", "View_Commercialize/View_NativeBig.json", "View_Commercialize/View_Privacy.json", "View_Commercialize/View_Sign.json", "View_Commercialize/View_Store.json", "View_Commercialize/View_TrialSkin.json", "View_Game/View_Black.json", "View_Game/View_color.json", "View_Game/View_Custom.json", "View_Game/View_Game.json", "View_Game/View_GameOver_Lose.json", "View_Game/View_GameOver_Win.json", "View_Game/View_Loading.json", "View_Game/View_Main.json", "View_Game/View_Setting.json"];
    class _ResLoad {
        constructor() {
            this.PackageLoadNum = 0;
            this.GetResState = 0;
            this.ResList = [];
            this.IsInit = false;
        }
        init(ResFn, PackFn) {
            if (ResControl.IsInit === false) {
                ResControl.IsInit = true;
                ResControl.load(VIEWJSONPATH, ResControl, null, null, 0);
                for (let ResName in ResPath) {
                    if (typeof ResFn == "function") {
                        if (ResFn(ResPath[ResName]))
                            ResControl.ResList.push(ResPath[ResName]);
                    }
                    else {
                        ResControl.ResList.push(ResPath[ResName]);
                    }
                }
                let PackageNameArr = [];
                ResControl.DownloadAllPackage(PackageNameArr);
            }
        }
        load(url = [], caller = null, complete = null, progress = null, priority = 1) {
            if (!url)
                url = [];
            Laya.loader.create(url, Laya.Handler.create(caller, complete), Laya.Handler.create(caller, progress), null, null, null, priority, true);
        }
        loadPackage(name = [], caller = null, complete, progress) {
            if (!name)
                name = [];
            if (typeof complete != "function")
                complete = () => { };
            if (typeof progress != "function")
                progress = () => { };
            complete = complete.bind(caller);
            progress = progress.bind(caller);
            let _index = 0;
            let _seccess = 0;
            let _progress = [];
            DownloadSubpackage();
            Laya.timer.loop(100, ResControl, AllLoadProgress);
            function DownloadSubpackage() {
                if (Tools.getPlatform == "wx") {
                    if (_index >= name.length) {
                        return;
                    }
                    let index = _index;
                    _progress[index] = 0;
                    Laya.Browser.window.wx.loadSubpackage({
                        name: name[index],
                        success() {
                            let text = '分包[' + name[index] + ']加载成功';
                            console.info('%c' + text + '', 'color: #43bb88;font-size: 10px;');
                            _seccess++;
                            _progress[index] = 1;
                        },
                        fail(res) {
                            let text = '分包[' + name[index] + ']加载失败';
                            console.error('%c' + text + '', 'color: red;font-size: 14px;font-weight: bold;', res);
                            _progress[index] = 1;
                        }
                    });
                    Laya.timer.loop(100, ResControl, LoadProgress);
                    function LoadProgress() {
                        if (_progress[index] >= 0.95) {
                            Laya.timer.clear(ResControl, LoadProgress);
                        }
                        else if (_progress[index] >= 0.75) {
                            _progress[index] += 0.005;
                        }
                        else {
                            _progress[index] += 0.01;
                        }
                    }
                    _index++;
                    DownloadSubpackage();
                }
                else if (Tools.getPlatform == "qq") {
                    if (_index >= name.length) {
                        return;
                    }
                    let index = _index;
                    _progress[index] = 0;
                    Laya.Browser.window.qq.loadSubpackage({
                        name: name[index],
                        success() {
                            let text = '分包[' + name[index] + ']加载成功';
                            console.info('%c' + text + '', 'color: #43bb88;font-size: 10px;');
                            _seccess++;
                            _progress[index] = 1;
                            _index++;
                            DownloadSubpackage();
                        },
                        fail(res) {
                            let text = '分包[' + name[index] + ']加载失败';
                            console.error('%c' + text + '', 'color: red;font-size: 14px;font-weight: bold;', res);
                            _progress[index] = 1;
                            _index++;
                            DownloadSubpackage();
                        }
                    });
                    Laya.timer.loop(100, ResControl, LoadProgress);
                    function LoadProgress() {
                        if (_progress[index] >= 0.95) {
                            Laya.timer.clear(ResControl, LoadProgress);
                        }
                        else if (_progress[index] >= 0.75) {
                            _progress[index] += 0.005;
                        }
                        else {
                            _progress[index] += 0.01;
                        }
                    }
                }
                else if (Tools.getPlatform == "tt") {
                    if (_index >= name.length) {
                        return;
                    }
                    let index = _index;
                    _progress[index] = 0;
                    Laya.Browser.window.tt.loadSubpackage({
                        name: name[index],
                        success() {
                            let text = '分包[' + name[index] + ']加载成功';
                            console.info('%c' + text + '', 'color: #43bb88;font-size: 10px;');
                            _seccess++;
                            _progress[index] = 1;
                            _index++;
                            DownloadSubpackage();
                        },
                        fail(res) {
                            let text = '分包[' + name[index] + ']加载失败';
                            console.error('%c' + text + '', 'color: red;font-size: 14px;font-weight: bold;', res);
                            _progress[index] = 1;
                            _index++;
                            DownloadSubpackage();
                        }
                    });
                    Laya.timer.loop(100, ResControl, LoadProgress);
                    function LoadProgress() {
                        if (_progress[index] >= 0.95) {
                            Laya.timer.clear(ResControl, LoadProgress);
                        }
                        else if (_progress[index] >= 0.75) {
                            _progress[index] += 0.005;
                        }
                        else {
                            _progress[index] += 0.01;
                        }
                    }
                }
                else {
                    if (_index >= name.length) {
                        return;
                    }
                    let index = _index;
                    _progress[index] = 0;
                    _seccess++;
                    _progress[index] = 1;
                    Laya.timer.loop(100, ResControl, LoadProgress);
                    function LoadProgress() {
                        if (_progress[index] >= 0.95) {
                            Laya.timer.clear(ResControl, LoadProgress);
                        }
                        else if (_progress[index] >= 0.75) {
                            _progress[index] += 0.005;
                        }
                        else {
                            _progress[index] += 0.01;
                        }
                    }
                    _index++;
                    DownloadSubpackage();
                }
            }
            function AllLoadProgress() {
                let All_progress = 0;
                _progress.forEach((item) => {
                    All_progress += item;
                });
                All_progress = All_progress / name.length;
                progress(All_progress);
                if (All_progress >= 1) {
                    complete(_seccess == name.length);
                    Laya.timer.clear(ResControl, AllLoadProgress);
                }
            }
        }
        DownloadAllPackage(PackageNameArr = []) {
            if (PackageNameArr.length >= 1) {
                ResControl.loadPackage(PackageNameArr, ResControl, (res) => {
                    ResControl.ResAutoLoad();
                }, (res) => {
                    ResControl.PackageLoadNum = res;
                });
            }
            else {
                ResControl.PackageLoadNum = 1;
                ResControl.ResAutoLoad();
            }
        }
        ResAutoLoad() {
            let indexNum = 0;
            load();
            function load() {
                if (ResControl.ResList.length <= indexNum) {
                    return;
                }
                if (ResControl.GetResState) {
                    Laya.timer.frameOnce(100, ResControl, load);
                }
                else if (Laya.loader.getRes(ResControl.ResList[indexNum])) {
                    indexNum++;
                    Laya.timer.frameOnce(100, ResControl, load);
                }
                else {
                    ResControl.load([ResControl.ResList[indexNum]], ResControl, (res) => {
                        indexNum++;
                        Laya.timer.frameOnce(100, ResControl, load);
                    }, null, 4);
                }
            }
        }
        ResState(resurlarr, caller, callback) {
            if (!resurlarr)
                resurlarr = [];
            if (caller)
                callback = callback.bind(caller);
            ResControl.GetResState++;
            let noLoadList = [];
            let noLoadListProgress = 0;
            resurlarr.forEach(item => {
                let result = Laya.loader.getRes(item);
                if (result == null && item) {
                    if (item) {
                        noLoadList.push(item);
                    }
                }
            });
            let progress = 1 - ResControl.PackageLoadNum + 1 - noLoadListProgress;
            Laya.timer.frameLoop(1, ResControl, load);
            function load() {
                if (ResControl.PackageLoadNum >= 1 && noLoadList.length > 0) {
                    Laya.timer.clear(ResControl, load);
                    ResControl.load(noLoadList, ResControl, (res) => {
                    }, (res) => {
                        noLoadListProgress = res;
                    }, 1);
                }
                else if (noLoadList.length == 0) {
                    noLoadListProgress = 1;
                    Laya.timer.clear(ResControl, load);
                }
            }
            Laya.timer.frameLoop(1, ResControl, result);
            function result() {
                let _progress = 1 - (1 - ResControl.PackageLoadNum + 1 - noLoadListProgress) / progress;
                if (_progress >= 1) {
                    ResControl.GetResState--;
                    Laya.timer.clear(ResControl, result);
                }
                if (typeof callback == "function") {
                    callback(_progress);
                }
            }
        }
    }
    let ResControl = new _ResLoad();

    let LOCALDATA = {
        VERSION: 2,
        Goldnum: 0,
        Levelnum: 1,
        CreateNum: 1,
        overgame: false,
        running: false,
        shootSpeed: 1500,
        damage: 100,
        GetCoin: 50,
        Coin: 100,
        DrawNum: 1,
        LiheProgress: 0,
        speed_up: 500,
        damage_up: 500,
        coin_up: 500,
        Skin: [0, 0, 0, 0, 0, 0],
        SkinTryCopy: false,
        SkinUse: -1,
        SkinTry: 0,
        buyIcon: [500, 1000, 1500, 2000, 2500, 3000],
        Hat: [0, 0, 0, 0, 0, 0],
        HatUse: -1,
        HatTry: 0,
        HatIcon: [],
        HighAmount: [0, 0],
        FirstIn: true,
        DrawInData: {
            FirstDraw: true,
            lastDrawTime: 1666022400000
        },
        RewardInData: {
            collectionNum: 0,
            isReward: [false, false, false],
            isRewarded: [false, false, false],
            receiveOver: false,
            OnlineTime: 0,
            lastRewardTime: 1666022400000,
            timeLength: [60, 180, 300],
            getCoin: [150, 250, 500]
        },
        Setting: {
            title: "设置",
            musicSwitch: true,
            soundSwitch: true,
            vibrationSwitch: true,
        },
        SignInData: {
            last_time: null,
            state_update_time: null,
            historical_state: [],
            SignDays: 0,
        },
        yinsi: true,
        isSettlement: false
    };
    let identification = "__Star__";
    let InitState = false;
    function _InitLocaData() {
        if (InitState)
            return;
        InitState = true;
        if (JSON_Parse(Laya.LocalStorage.getJSON(identification + "VERSION")) != LocalData.VERSION) {
            for (const key in LOCALDATA) {
                LocalData[key] = LocalData[key];
            }
        }
        else {
            for (const key in LOCALDATA) {
                let data = JSON_Parse(Laya.LocalStorage.getJSON(identification + key));
                if (!data && data != 0) {
                    LocalData[key] = LocalData[key];
                }
                else {
                    LocalData[key] = data;
                }
            }
        }
    }
    let LocalData = new Proxy(LOCALDATA, {
        get(target, key) {
            _InitLocaData();
            return target[key];
        },
        set(target, key, value) {
            Reflect.set(target, key, value);
            Laya.LocalStorage.setJSON(identification + key, JSON_Stringify(value));
            _InitLocaData();
            return true;
        },
    });
    function JSON_Parse(str) {
        if (typeof str == "string") {
            try {
                var obj = JSON.parse(str);
                if (typeof obj == "object" && obj) {
                    return obj;
                }
                else {
                    return str;
                }
            }
            catch (e) {
                return str;
            }
        }
        else {
            return str;
        }
    }
    function JSON_Stringify(obj) {
        if (typeof obj === "object" && obj != null) {
            return JSON.stringify(obj);
        }
        else {
            return obj;
        }
    }

    class View_Game extends ui.View_Game.View_GameUI {
        onAwake() {
            View_Game.isRunning = true;
            this.txt_LevelNum.text = LocalData.Levelnum.toString();
        }
    }
    View_Game.NAME = "View_Game";
    View_Game.AUTO = true;
    View_Game.DATA = null;
    View_Game.isRunning = false;
    View_Game.self = null;

    class View_Main extends ui.View_Game.View_MainUI {
        onAwake() {
            this.txt_LevelNum.text = LocalData.Levelnum.toString();
            this.btn_start.on(Laya.Event.CLICK, this, this.startGame);
        }
        startGame() {
            UIControl.RemoveUI(View_Main);
            UIControl.ShowUI(View_Game);
        }
    }
    View_Main.NAME = "View_Main";
    View_Main.AUTO = true;
    View_Main.DATA = null;

    class View_GameOver_Lose extends ui.View_Game.View_GameOver_LoseUI {
        onAwake() {
            this.btn_rstart.on(Laya.Event.CLICK, this, this.btn_rstartClick);
            this.btn_double.on(Laya.Event.CLICK, this, this.btn_doubleClick);
        }
        btn_rstartClick() {
            this.ToNext();
        }
        btn_doubleClick() {
            this.ToNext();
        }
        ToNext() {
            Scenes3DControl.TempNode.destroyChildren();
            Laya.Resource.destroyUnusedResources();
            Scenes3DControl.addNode(1);
            UIControl.RemoveUI(View_GameOver_Lose);
            UIControl.ShowUI(View_Main);
            Laya.timer.clearAll(this);
        }
    }
    View_GameOver_Lose.NAME = "View_GameOver_Lose";
    View_GameOver_Lose.AUTO = true;
    View_GameOver_Lose.DATA = null;

    class View_GameOver_Win extends ui.View_Game.View_GameOver_WinUI {
        onAwake() {
            this.btn_next.on(Laya.Event.CLICK, this, this.btn_nextClick);
            this.btn_double.on(Laya.Event.CLICK, this, this.btn_doubleClick);
        }
        btn_nextClick() {
            this.ToNext();
        }
        btn_doubleClick() {
            this.ToNext();
        }
        ToNext() {
            Scenes3DControl.TempNode.destroyChildren();
            Laya.Resource.destroyUnusedResources();
            LocalData.Levelnum += 1;
            Scenes3DControl.addNode(1);
            Laya.timer.clearAll(this);
            UIControl.RemoveUI(View_GameOver_Win);
            UIControl.ShowUI(View_Main);
        }
    }
    View_GameOver_Win.NAME = "View_GameOver_Win";
    View_GameOver_Win.AUTO = true;
    View_GameOver_Win.DATA = null;

    var ObstacleBState;
    (function (ObstacleBState) {
        ObstacleBState[ObstacleBState["standby"] = 1] = "standby";
        ObstacleBState[ObstacleBState["attack"] = 2] = "attack";
    })(ObstacleBState || (ObstacleBState = {}));
    class ObstacleB extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.ObsB_T = 0;
            this.liftHeight = 1.2;
            this.liftSpeed = 0.5;
            this.upInterval = 2;
            this.downInterval = 4;
            this.damageValue = 1;
            this.state = ObstacleBState.standby;
        }
        onAwake() {
            this.ObsB = this.owner;
            this.ObsB_Entity = this.ObsB.getChildByName("Obstacle_ArmB");
            this.ObsB_Entity.transform.localPositionY = -0.2;
            this.ObsB_T = this.ObsB_Entity.transform.localPositionY;
            this.state = ObstacleBState.standby;
            this.LiftSelf();
        }
        LiftSelf() {
            this.ObsB_T += this.liftHeight;
            this.state = ObstacleBState.attack;
            Laya.Tween.to(this.ObsB_Entity.transform, {
                localPositionY: this.ObsB_T
            }, 1000 * this.liftSpeed, null, Laya.Handler.create(this, () => {
                Laya.timer.once(1000 * this.upInterval, this.ObsB_Entity, () => {
                    this.ObsB_T -= this.liftHeight;
                    Laya.Tween.to(this.ObsB_Entity.transform, {
                        localPositionY: this.ObsB_T
                    }, 1000 * this.liftSpeed, null, Laya.Handler.create(this, () => {
                        this.state = ObstacleBState.standby;
                        Laya.timer.once(1000 * this.downInterval, this.ObsB_Entity, () => {
                            this.LiftSelf();
                        });
                    }));
                });
            }));
        }
        onDestroy() {
            Laya.Tween.clearAll(this.ObsB_Entity.transform);
        }
    }

    var PlayerState;
    (function (PlayerState) {
        PlayerState[PlayerState["standby"] = 0] = "standby";
        PlayerState[PlayerState["move"] = 1] = "move";
        PlayerState[PlayerState["bebound"] = 2] = "bebound";
        PlayerState[PlayerState["over"] = 3] = "over";
    })(PlayerState || (PlayerState = {}));
    class PlayerControl extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this._outHitResult = new Laya.HitResult();
            this._ray = new Laya.Ray(new Laya.Vector3(0, 0, 0), new Laya.Vector3(0, 0, 0));
            this.PlayerMoveSpeed = 0.1;
            this.reboundForce = 4;
            this.noCubeChildNum = 3;
            this.borderRL = 3.2;
            this._startpos = new Laya.Vector2(0, 0);
            this.moveDis = 0;
            this.startposTE = 0;
            this.endposTE = 0;
            this.dis = new Laya.Vector3();
            this.playerState = PlayerState.standby;
            this.cubeNum = 1;
            this.isWin = false;
            this.isFollow = true;
        }
        onAwake() {
            PlayerControl.self = this;
            this.Player = this.owner;
            this.PlayerRig = this.Player.getComponent(Laya.Rigidbody3D);
            this.PlayerMoveFx = this.Player.getChildByName("FX").getChildByName("stepsmoke");
            this.PlayerRotateFx = this.Player.getChildByName("FX").getChildByName("Nova");
            this.PlayerRotateFx.active = false;
            this.cubeNum = this.Player.numChildren - this.noCubeChildNum;
            this.showCubeNumText();
            this.makeUpRole();
            this.isWin = false;
            this.isFollow = true;
            Laya.stage.on(Laya.Event.MOUSE_UP, this, this.MOUSE_UP);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.MOUSE_DOWN);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.MOUSE_MOVE);
            this.MainCamera = Scenes3DControl.MainCamera;
            this.dis.x = this.Player.transform.position.x - this.MainCamera.transform.position.x;
            this.dis.y = this.Player.transform.position.y - this.MainCamera.transform.position.y;
            this.dis.z = this.Player.transform.position.z - this.MainCamera.transform.position.z;
        }
        onUpdate() {
            if (this.playerState === PlayerState.move && View_Game.isRunning) {
                this.Player.transform.localPositionZ += this.PlayerMoveSpeed * Engine.fpsscale;
            }
        }
        onLateUpdate() {
            if (this.isFollow) {
                this.CameraFollow();
            }
        }
        onTriggerEnter(e) {
            this.target = e.owner.name;
            switch (this.target) {
                case "Arm_1":
                case "Arm_2":
                    console.log("碰到障碍物A");
                    if (this.playerState === PlayerState.bebound) {
                        break;
                    }
                    if (this.cubeNum === 1) {
                        this.onGameOver(this.isWin);
                        return;
                    }
                    else if (this.cubeNum === 2) {
                        this.changeSelfCube(-1);
                        this.onRebound();
                        return;
                    }
                    else {
                        this.changeSelfCube(-2);
                        this.onRebound();
                        return;
                    }
                    break;
                case "Obstacle_ArmB":
                    console.log("障碍物B状态" + e.owner.parent.getComponent(ObstacleB).state);
                    if (this.playerState === PlayerState.bebound) {
                        break;
                    }
                    if (e.owner.parent.getComponent(ObstacleB).state === 2) {
                        console.log("碰到障碍物B处于攻击状态");
                        if (this.cubeNum === 1) {
                            this.onGameOver(this.isWin);
                            return;
                        }
                        else if (this.cubeNum === 2) {
                            this.changeSelfCube(-1);
                            this.onRebound();
                            return;
                        }
                        else {
                            this.changeSelfCube(-2);
                            this.onRebound();
                            return;
                        }
                    }
                    break;
                case "Obstacle_ArmC":
                    console.log("碰到障碍物C");
                    if (this.playerState === PlayerState.bebound) {
                        break;
                    }
                    if (this.cubeNum === 1) {
                        this.onGameOver(this.isWin);
                        return;
                    }
                    else if (this.cubeNum === 2) {
                        this.changeSelfCube(-1);
                        this.onRebound();
                        return;
                    }
                    else {
                        this.changeSelfCube(-2);
                        this.onRebound();
                        return;
                    }
                    break;
                case "gainCube":
                    console.log("碰到增益块");
                    if (this.playerState === PlayerState.bebound) {
                        break;
                    }
                    this.changeSelfCube(1);
                    e.owner.active = false;
                    this.rotateSelf();
                    break;
                case "enemy":
                    console.log("碰到敌人");
                    if (this.playerState === PlayerState.bebound) {
                        break;
                    }
                    let aicubeNum = e.owner.getComponent(AIControl).AIcubeNum;
                    console.log("敌人的方块数为" + aicubeNum);
                    if (this.cubeNum >= aicubeNum) {
                        this.changeSelfCube(aicubeNum);
                        e.owner.active = false;
                        this.rotateSelf();
                    }
                    else {
                        if (this.cubeNum === 1) {
                            this.onGameOver(this.isWin);
                            return;
                        }
                        else if (this.cubeNum === 2) {
                            this.changeSelfCube(-1);
                            this.onRebound();
                            return;
                        }
                        else {
                            this.changeSelfCube(-2);
                            this.onRebound();
                            return;
                        }
                    }
                    break;
                case "end":
                    console.log("到达终点，游戏胜利");
                    this.PlayerRig.gravity = new Laya.Vector3(0, 0, 0);
                    this.isWin = true;
                    break;
                case "End_Road_0":
                case "End_Road_1":
                case "End_Road_2":
                case "End_Road_3":
                case "End_Road_4":
                case "End_Road_5":
                case "End_Road_6":
                case "End_Road_7":
                case "End_Road_8":
                case "End_Road_9":
                case "End_Road_10":
                case "End_Road_11":
                case "End_Road_12":
                case "End_Road_13":
                    console.log("碰到" + this.target + "减少一块");
                    this.Player.transform.localPositionY += 0.8;
                    if (this.cubeNum === 1) {
                        this.onGameOver(this.isWin);
                        return;
                    }
                    this.changeSelfCube(-1);
                    break;
                case "End_Road_14":
                    this.isFollow = false;
                    this.playerState = PlayerState.over;
                    this.Player.transform.position.x;
                    this.Player.transform.localPositionY += 0.8;
                    Laya.Tween.to(this.Player.transform, {
                        localPositionX: LocalData.HighAmount[0],
                        localPositionZ: LocalData.HighAmount[1] - 1
                    }, 800, null, Laya.Handler.create(this, () => {
                        this.onGameOver(this.isWin);
                    }));
                    break;
                default:
                    break;
            }
        }
        CameraFollow() {
            this.MainCamera.transform.position.x += (this.Player.transform.position.x - this.MainCamera.transform.position.x) * 0.8 - this.dis.x;
            this.MainCamera.transform.position.y += (this.Player.transform.position.y - this.MainCamera.transform.position.y) - this.dis.y;
            this.MainCamera.transform.position.z += (this.Player.transform.position.z - this.MainCamera.transform.position.z) - this.dis.z;
            this.MainCamera.transform.position = this.MainCamera.transform.position;
        }
        MOUSE_DOWN(e) {
            if (this.playerState === PlayerState.bebound || this.playerState === PlayerState.over)
                return;
            if (View_Game.isRunning) {
                this.playerState = PlayerState.move;
            }
            this.startposTE = e.stageX;
            this._startpos.setValue(e.stageX, e.stageY);
        }
        MOUSE_MOVE(e) {
            if (this.playerState === PlayerState.bebound || this.playerState === PlayerState.over)
                return;
            this.moveDis = ((this.startposTE - e.stageX) / Laya.stage.width) * 24;
            if (this.playerState === PlayerState.move && View_Game.isRunning) {
                this.Player.transform.localPositionX += this.moveDis;
            }
            this.startposTE = e.stageX;
            if (this.Player.transform.localPositionX > this.borderRL) {
                this.Player.transform.localPositionX = this.borderRL;
            }
            if (this.Player.transform.localPositionX < -this.borderRL) {
                this.Player.transform.localPositionX = -this.borderRL;
            }
        }
        MOUSE_UP(e) {
            this.endposTE = e.stageX;
            this.moveDis = 0;
        }
        onGameOver(isWin) {
            this.playerState = PlayerState.over;
            View_Game.isRunning = false;
            UIControl.RemoveUI(View_Game);
            if (isWin) {
                console.log("游戏胜利");
                UIControl.ShowUI(View_GameOver_Win);
            }
            else {
                console.log("游戏失败");
                UIControl.ShowUI(View_GameOver_Lose);
            }
        }
        changeSelfCube(_cubenum) {
            this.cubeNum += _cubenum;
            this.dis.y -= _cubenum * 0.4;
            Scenes3DControl.MainCamera.transform.localRotationEulerX -= 0.2 * _cubenum;
            console.log("相机旋转角 " + Scenes3DControl.MainCamera.transform.localRotationEulerX);
            if (this.cubeNum <= 0)
                return;
            let diffV = Math.abs(this.cubeNum - (this.Player.numChildren - this.noCubeChildNum));
            if (this.cubeNum > (this.Player.numChildren - this.noCubeChildNum)) {
                console.log("增加" + diffV);
                let height = this.Player.getChildAt(this.Player.numChildren - 1).transform.localPositionY;
                console.log("增加前置顶块y为" + height);
                for (let i = 0; i < diffV; i++) {
                    let cube = this.Player.addChild(ResGet["Cube_Man.lh"].clone());
                    cube.transform.localPosition = this.Player.getChildAt(0).transform.localPosition;
                    cube.transform.localPositionY = height + 0.6 + 0.6 * i;
                }
                this.makeUpRole();
            }
            else {
                console.log("减少" + diffV);
                for (let i = 1; i <= diffV; i++) {
                    let cube = this.Player.getChildAt(this.Player.numChildren - i);
                    if (!this.isWin) {
                        let targetX = i % 2 == 0 ? cube.transform.localPositionX + 2 : cube.transform.localPositionX - 2;
                        let targetY = cube.transform.localPositionY - 2;
                        let targetZ = cube.transform.localPositionZ + 3;
                        Laya.Tween.to(cube.transform, {
                            localPositionX: targetX,
                            localPositionY: targetY,
                            localPositionZ: targetZ,
                            localScaleX: 0,
                            localScaleY: 0,
                            localScaleZ: 0
                        }, 300, null, Laya.Handler.create(this, () => {
                            cube.destroy(true);
                        }));
                    }
                    else {
                        console.log("isWin");
                        cube.destroy(true);
                        let newCube = Scenes3DControl.TempNode.addChild(ResGet["Cube_Man.lh"].clone());
                        newCube.transform.localPosition = this.Player.transform.localPosition;
                        this.showCube(newCube);
                    }
                }
                this.makeUpRole();
            }
            this.showCubeNumText();
        }
        makeUpRole() {
            if (this.cubeNum > 1) {
                for (let index = this.noCubeChildNum; index < this.Player.numChildren; index++) {
                    if (index != this.noCubeChildNum && index != this.Player.numChildren - 1) {
                        let cube = this.Player.getChildAt(index).getChildByName("Cube_Man").getChildByName("Cube_Man");
                        let body = cube.getChildByName("Body");
                        for (let index2 = 0; index2 < body.numChildren; index2++) {
                            body.getChildAt(index2).active = false;
                        }
                        cube.getChildByName("Leg_Left").active = false;
                        cube.getChildByName("Leg_Right").active = false;
                        cube.getChildByName("heat_skin").active = false;
                    }
                    else if (index === this.noCubeChildNum) {
                        let cube = this.Player.getChildAt(index).getChildByName("Cube_Man").getChildByName("Cube_Man");
                        let body = cube.getChildByName("Body");
                        for (let index2 = 0; index2 < body.numChildren; index2++) {
                            body.getChildAt(index2).active = false;
                        }
                        cube.getChildByName("Leg_Left").active = true;
                        cube.getChildByName("Leg_Right").active = true;
                        cube.getChildByName("heat_skin").active = false;
                    }
                    else if (index === this.Player.numChildren - 1) {
                        let cube = this.Player.getChildAt(index).getChildByName("Cube_Man").getChildByName("Cube_Man");
                        let body = cube.getChildByName("Body");
                        for (let index2 = 0; index2 < body.numChildren; index2++) {
                            body.getChildAt(index2).active = true;
                        }
                        cube.getChildByName("Leg_Left").active = false;
                        cube.getChildByName("Leg_Right").active = false;
                        if (LocalData.HatUse != -1) {
                            cube.getChildByName("heat_skin").active = true;
                        }
                        else {
                            cube.getChildByName("heat_skin").active = false;
                        }
                    }
                }
            }
            else if (this.cubeNum === 1) {
                let cube = this.Player.getChildAt(3).getChildByName("Cube_Man").getChildByName("Cube_Man");
                let body = cube.getChildByName("Body");
                for (let index2 = 0; index2 < body.numChildren; index2++) {
                    body.getChildAt(index2).active = true;
                }
                cube.getChildByName("Leg_Left").active = true;
                cube.getChildByName("Leg_Right").active = true;
                if (LocalData.HatUse != -1) {
                    cube.getChildByName("heat_skin").active = true;
                }
                else {
                    cube.getChildByName("heat_skin").active = false;
                }
            }
        }
        showCube(cubeMan) {
            let cube = cubeMan.getChildByName("Cube_Man").getChildByName("Cube_Man");
            let body = cube.getChildByName("Body");
            for (let index2 = 0; index2 < body.numChildren; index2++) {
                body.getChildAt(index2).active = false;
            }
            cube.getChildByName("Leg_Left").active = false;
            cube.getChildByName("Leg_Right").active = false;
            cube.getChildByName("heat_skin").active = false;
        }
        rotateSelf() {
            this.PlayerRotateFx.transform.localPositionY = (this.cubeNum / 2) * 0.6;
            this.PlayerRotateFx.active = true;
            Laya.timer.once(500, this, () => {
                this.PlayerRotateFx.active = false;
            });
            for (let index = this.noCubeChildNum; index < this.Player.numChildren; index++) {
                let cube = this.Player.getChildAt(index);
                let _r = cube.transform.localRotationEulerY;
                _r += 360;
                Laya.Tween.to(cube.transform, {
                    localRotationEulerY: _r
                }, (200 + 50 * index), null, Laya.Handler.create(this, () => {
                    console.log("自转完成");
                    cube.transform.localRotationEulerY = 0;
                }));
            }
        }
        onRebound() {
            this.playerState = PlayerState.bebound;
            console.log("反弹");
            let targetPos = this.Player.transform.localPositionZ - this.reboundForce;
            Laya.Tween.to(this.Player.transform, {
                localPositionZ: targetPos
            }, 500, null, Laya.Handler.create(this, () => {
                console.log("反弹结束");
                this.playerState = PlayerState.move;
            }));
        }
        showCubeNumText() {
            if (this.cubeNum <= 0)
                return;
            let number1 = this.Player.getChildByName("number1");
            let number2 = this.Player.getChildByName("number2");
            let n1 = number2.getChildByName("n1");
            let n2 = number2.getChildByName("n2");
            let initHeight;
            LocalData.HatUse != -1 ? initHeight = 1.5 : initHeight = 1.2;
            number1.transform.localPositionY = initHeight + this.cubeNum * 0.6;
            number2.transform.localPositionY = initHeight + this.cubeNum * 0.6;
            for (let index = 0; index < number1.numChildren; index++) {
                number1.getChildAt(index).active = false;
            }
            for (let index = 0; index < n1.numChildren; index++) {
                n1.getChildAt(index).active = false;
            }
            for (let index = 0; index < n2.numChildren; index++) {
                n2.getChildAt(index).active = false;
            }
            if (this.cubeNum >= 10) {
                let g = this.cubeNum % 10;
                let s = Math.floor(this.cubeNum / 10);
                n1.getChildAt(s - 1).active = true;
                n2.getChildAt(g).active = true;
            }
            else {
                number1.getChildAt(this.cubeNum - 1).active = true;
            }
        }
        onDestroy() {
            EventControl$1.offAll(this);
            Laya.timer.clearAll(this);
            Laya.Tween.clearAll(this.Player.transform);
            Laya.stage.off(Laya.Event.MOUSE_UP, this, this.MOUSE_UP);
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.MOUSE_DOWN);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.MOUSE_MOVE);
        }
    }
    PlayerControl.self = null;

    class AIControl extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.AIMoveSpeed = 0.02;
            this.AIcubeNum = 0;
        }
        onAwake() {
            this.AIself = this.owner;
            this.AIcubeNum = this.AIself.numChildren - 2;
            this.makeUpRole();
            this.showCubeNumText();
        }
        onUpdate() {
            if (View_Game.isRunning && PlayerControl.self.playerState === 1) {
                this.AIself.transform.localPositionZ += this.AIMoveSpeed * Engine.fpsscale;
            }
        }
        makeUpRole() {
            if (this.AIcubeNum > 1) {
                for (let index = 2; index < this.AIself.numChildren; index++) {
                    if (index != 2 && index != this.AIself.numChildren - 1) {
                        let cube = this.AIself.getChildAt(index).getChildByName("Cube_Man");
                        let body = cube.getChildByName("Body");
                        for (let index2 = 0; index2 < body.numChildren; index2++) {
                            body.getChildAt(index2).active = false;
                        }
                        cube.getChildByName("Leg_Left").active = false;
                        cube.getChildByName("Leg_Right").active = false;
                        cube.getChildByName("heat_skin").active = false;
                    }
                    else if (index === 2) {
                        let cube = this.AIself.getChildAt(index).getChildByName("Cube_Man");
                        let body = cube.getChildByName("Body");
                        for (let index2 = 0; index2 < body.numChildren; index2++) {
                            body.getChildAt(index2).active = false;
                        }
                        cube.getChildByName("Leg_Left").active = true;
                        cube.getChildByName("Leg_Right").active = true;
                        cube.getChildByName("heat_skin").active = false;
                    }
                    else if (index === this.AIself.numChildren - 1) {
                        let cube = this.AIself.getChildAt(index).getChildByName("Cube_Man");
                        let body = cube.getChildByName("Body");
                        for (let index2 = 0; index2 < body.numChildren; index2++) {
                            body.getChildAt(index2).active = true;
                        }
                        cube.getChildByName("Leg_Left").active = false;
                        cube.getChildByName("Leg_Right").active = false;
                        if (LocalData.HatUse != -1) {
                            cube.getChildByName("heat_skin").active = true;
                        }
                        else {
                            cube.getChildByName("heat_skin").active = false;
                        }
                    }
                }
            }
            else {
                let cube = this.AIself.getChildAt(2).getChildByName("Cube_Man");
                let body = cube.getChildByName("Body");
                for (let index2 = 0; index2 < body.numChildren; index2++) {
                    body.getChildAt(index2).active = true;
                }
                cube.getChildByName("Leg_Left").active = true;
                cube.getChildByName("Leg_Right").active = true;
                cube.getChildByName("heat_skin").active = true;
            }
        }
        showCubeNumText() {
            let number1 = this.AIself.getChildByName("number1");
            let number2 = this.AIself.getChildByName("number2");
            let n1 = number2.getChildByName("n1");
            let n2 = number2.getChildByName("n2");
            number1.transform.localPositionY = 0.9 + this.AIcubeNum * 0.6;
            number2.transform.localPositionY = 0.9 + this.AIcubeNum * 0.6;
            for (let index = 0; index < number1.numChildren; index++) {
                number1.getChildAt(index).active = false;
            }
            for (let index = 0; index < n1.numChildren; index++) {
                n1.getChildAt(index).active = false;
            }
            for (let index = 0; index < n2.numChildren; index++) {
                n2.getChildAt(index).active = false;
            }
            if (this.AIcubeNum >= 10) {
                let g = this.AIcubeNum % 10;
                let s = Math.floor(this.AIcubeNum / 10);
                n1.getChildAt(s - 1).active = true;
                n2.getChildAt(g).active = true;
            }
            else {
                number1.getChildAt(this.AIcubeNum - 1).active = true;
            }
        }
    }

    class GainCube extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.rotateAngle = 90;
            this.rotateSpeed = 1;
            this.GainC_R = 0;
        }
        onAwake() {
            this.GainC = this.owner;
            this.GainC_R = this.GainC.transform.localRotationEulerY;
            this.RotateSelf();
        }
        RotateSelf() {
            this.GainC_R += this.rotateAngle;
            Laya.Tween.to(this.GainC.transform, {
                localRotationEulerY: this.GainC_R
            }, 1000 * this.rotateSpeed, null, Laya.Handler.create(this, () => {
                this.GainC_R += this.rotateAngle;
                Laya.Tween.to(this.GainC.transform, {
                    localRotationEulerY: this.GainC_R
                }, 1000 * this.rotateSpeed, null, Laya.Handler.create(this, () => {
                    this.RotateSelf();
                }));
            }));
        }
        onDestroy() {
            Laya.Tween.clearAll(this.GainC.transform);
        }
    }

    class ObstacleA extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.rotateAngle = 90;
            this.rotateSpeed = 1;
            this.damageValue = 2;
            this.ObsA_R = 0;
        }
        onAwake() {
            this.ObsA = this.owner;
            this.ObsA_R = this.ObsA.transform.localRotationEulerY;
            this.RotateSelf();
        }
        RotateSelf() {
            this.ObsA_R += this.rotateAngle;
            Laya.Tween.to(this.ObsA.transform, {
                localRotationEulerY: this.ObsA_R
            }, 1000 * this.rotateSpeed, null, Laya.Handler.create(this, () => {
                this.ObsA_R += this.rotateAngle;
                Laya.Tween.to(this.ObsA.transform, {
                    localRotationEulerY: this.ObsA_R
                }, 1000 * this.rotateSpeed, null, Laya.Handler.create(this, () => {
                    this.RotateSelf();
                }));
            }));
        }
        onDestroy() {
            Laya.Tween.clearAll(this.ObsA.transform);
        }
    }

    class ObstacleC extends Laya.Script3D {
        constructor() {
            super(...arguments);
            this.rotateSpeed = 90;
            this.damageValue = 2;
            this.ObsC_R = 0;
        }
        onAwake() {
            this.ObsC = this.owner;
            this.ObsC_R = this.ObsC.transform.localRotationEulerY;
            this.RotateSelf();
        }
        RotateSelf() {
            this.ObsC_R += this.rotateSpeed;
            Laya.Tween.to(this.ObsC.transform, {
                localRotationEulerY: this.ObsC_R
            }, 1000, null, Laya.Handler.create(this, () => {
                this.ObsC_R += this.rotateSpeed;
                Laya.Tween.to(this.ObsC.transform, {
                    localRotationEulerY: this.ObsC_R
                }, 1000, null, Laya.Handler.create(this, () => {
                    this.RotateSelf();
                }));
            }));
        }
        onDestroy() {
            Laya.Tween.clearAll(this.ObsC.transform);
        }
    }

    class _Scenes3DControl {
        constructor() {
            this.Loadover = false;
        }
        init() {
            Scenes3DControl.load();
        }
        load() {
            let ResData = [
                ResPath["game.ls"],
                ResPath["Level_1.lh"],
                ResPath["Level_2.lh"],
                ResPath["Level_3.lh"],
                ResPath["Level_4.lh"],
                ResPath["Player.lh"],
                ResPath["FX.lh"],
                ResPath["Cube_Man.lh"],
            ];
            ResControl.load(ResData, this, this.addNode);
        }
        addNode(res) {
            if (res != 1)
                return;
            if (_Scenes3DControl.FirstIn) {
                this.Scene3D = Laya.stage.addChild(ResGet["game.ls"]);
                this.TempNode = this.Scene3D.addChild(new Laya.Sprite3D("TempNode"));
                this.MainCamera = this.Scene3D.getChildByName("Camera");
                this.CameraStartPoint = this.MainCamera.transform.position.clone();
                this.OpenShadow(this.Scene3D.getChildByName("Directional Light"));
                _Scenes3DControl.FirstIn = false;
            }
            let i = LocalData.Levelnum % 4;
            let j;
            if (i == 0) {
                j = 4;
            }
            else {
                j = i;
            }
            let curLv = "Level_" + j + ".lh";
            this.MainCamera.transform.position = this.CameraStartPoint;
            this.Player = this.TempNode.addChild(ResGet["Player.lh"].clone());
            this.PlayerMoveFx = this.Player.getChildByName("FX").getChildByName("stepsmoke");
            this.PlayerRotateFx = this.Player.getChildByName("FX").getChildByName("Nova");
            this.Player.addComponent(PlayerControl);
            this.Level = this.TempNode.addChild(ResGet[curLv].clone());
            this.EndGame_Road = this.Level.getChildByName("EndGame_Road");
            this.HighAmount = this.EndGame_Road.getChildByName("EndSetter");
            LocalData.HighAmount[0] = this.HighAmount.transform.position.x;
            LocalData.HighAmount[1] = this.HighAmount.transform.position.z;
            this.Road = this.Level.getChildByName("Env");
            this.Obstacle = this.Level.getChildByName("Obstacle");
            for (let index = 0; index < this.Obstacle.numChildren; index++) {
                if (this.Obstacle.getChildAt(index).name == "Obstacle_A") {
                    this.Obstacle.getChildAt(index).addComponent(ObstacleA);
                }
                else if (this.Obstacle.getChildAt(index).name == "Obstacle_B") {
                    this.Obstacle.getChildAt(index).addComponent(ObstacleB);
                }
                else if (this.Obstacle.getChildAt(index).name == "Obstacle_C") {
                    this.Obstacle.getChildAt(index).addComponent(ObstacleC);
                }
            }
            this.Enemy = this.Level.getChildByName("Enemy");
            for (let index = 0; index < this.Enemy.numChildren; index++) {
                this.Enemy.getChildAt(index).addComponent(AIControl);
            }
            this.GainCube = this.Level.getChildByName("GainCube");
            for (let index = 0; index < this.GainCube.numChildren; index++) {
                this.GainCube.getChildAt(index).addComponent(GainCube);
            }
            Scenes3DControl.Loadover = true;
        }
        static vibrateCtr(index) {
            if (LocalData.Setting.vibrationSwitch) {
                switch (index) {
                    case 0:
                        if (Tools.getPlatform == "wx") {
                            wx.vibrateShort({
                                type: "light",
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        if (Laya.Browser.onQGMiniGame) {
                            qg.vibrateShort({
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        break;
                    case 1:
                        if (Tools.getPlatform == "wx") {
                            wx.vibrateShort({
                                type: "medium",
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        if (Laya.Browser.onQGMiniGame) {
                            qg.vibrateShort({
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        break;
                    case 2:
                        if (Tools.getPlatform == "wx") {
                            wx.vibrateShort({
                                type: "heavy",
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        if (Laya.Browser.onQGMiniGame) {
                            qg.vibrateShort({
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        break;
                    case 3:
                        if (Tools.getPlatform == "wx") {
                            wx.vibrateLong(null);
                        }
                        if (Laya.Browser.onQGMiniGame) {
                            qg.vibrateLong({
                                success: () => { },
                                fail: () => { },
                                complete: () => { },
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        OpenShadow(DirectionLight) {
            DirectionLight.shadowMode = Laya.ShadowMode.Hard;
            DirectionLight.shadowDistance = 100;
            DirectionLight.shadowResolution = 2048;
            DirectionLight.shadowCascadesMode = Laya.ShadowCascadesMode.FourCascades;
            DirectionLight.shadowStrength = 0.5;
        }
    }
    _Scenes3DControl.CameraStart = new Laya.Vector3;
    _Scenes3DControl.FirstIn = true;
    const Scenes3DControl = new _Scenes3DControl();

    class View_Loading extends ui.View_Game.View_LoadingUI {
        constructor() {
            super(...arguments);
            this.loadNum = 0;
            this.loadOver = false;
            this.loadvalue = 0;
        }
        onEnable() {
            this.initProgress();
            Scenes3DControl.init();
            Laya.SoundManager.playMusic("res/Music/BGM.mp3", 0);
        }
        initProgress() {
            this.loadingbar.value = 0;
            this.loadNum = 1;
            this.loadOver = false;
            Laya.timer.frameLoop(20, this, () => {
                if (this.loadNum > 2) {
                    this.loadhint.text = "加载3D资源包中" + Math.floor(this.loadingbar.value * 100) + "%... ";
                }
                else {
                    this.loadhint.text = "加载3D资源包" + this.loadNum + "中" + Math.floor(this.loadingbar.value * 100) + "%...";
                }
                if (this.loadingbar.value >= 1) {
                    this.loadingbar.value = 0;
                    this.loadNum++;
                }
                if (View_Loading.DATA == 0) {
                    if (!this.loadOver && Scenes3DControl.Loadover) {
                        this.loadOver = true;
                        Laya.Tween.to(this.loadingbar, { value: 1 }, 200, null, Laya.Handler.create(this, () => {
                            this.onGameStart();
                        }));
                    }
                    else {
                        this.loadingbar.value += 0.02;
                    }
                }
                else {
                    if (!this.loadOver) {
                        this.loadOver = true;
                        Laya.Tween.to(this.loadingbar, { value: 1 }, 200, null, Laya.Handler.create(this, () => {
                            this.onGameStart();
                        }));
                    }
                    else {
                        this.loadingbar.value += 0.02;
                    }
                }
            });
        }
        onGameStart() {
            EventControl$1.offAll(this);
            Laya.timer.clearAll(this);
            switch (View_Loading.DATA) {
                case 0:
                    UIControl.RemoveUI(View_Loading);
                    UIControl.ShowUI(View_Main, 0);
                    break;
                case 1:
                    break;
            }
        }
    }
    View_Loading.NAME = "View_Loading";
    View_Loading.AUTO = true;
    View_Loading.DATA = null;

    class Engine {
        constructor() {
            this.index = 0;
            this.tempFps = 0;
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onkeyup);
            this.ToStart();
            Laya.timer.loop(1000, this, () => {
                this.FpsChange();
            });
            GameData.compileShader();
        }
        ToStart() {
            UIControl.ShowUI(View_Loading, 0);
        }
        onkeyup(e) {
            var codeNum = e.keyCode;
            switch (codeNum) {
                case 79:
                    Laya.Stat.show();
                    break;
                case 80:
                    Laya.Stat.hide();
                    break;
                case 75:
                    break;
                case 76:
                    GameData.getShaderData();
                    break;
                default:
                    break;
            }
        }
        FpsChange() {
            this.tempFps = Laya.timer.currFrame - this.tempFps;
            if (this.tempFps < 30) {
                Engine.fpsscale = 2;
                if (this.tempFps < 20) {
                    Engine.fpsscale = 3;
                }
            }
            else {
                Engine.fpsscale = 60 / this.tempFps;
            }
            ;
            this.tempFps = Laya.timer.currFrame;
        }
    }
    Engine.fpsscale = 1;

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "View_Game/View_Main.scene";
    GameConfig.sceneRoot = "";
    GameConfig.debug = false;
    GameConfig.stat = false;
    GameConfig.physicsDebug = false;
    GameConfig.exportSceneToJson = true;
    GameConfig.init();

    class Main {
        constructor() {
            Config.useWebGL2 = false;
            if (window["Laya3D"])
                Laya3D.init(GameConfig.width, GameConfig.height);
            else
                Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
            Laya["Physics"] && Laya["Physics"].enable();
            Laya["DebugPanel"] && Laya["DebugPanel"].enable();
            Laya.stage.scaleMode = GameConfig.scaleMode;
            Laya.stage.screenMode = GameConfig.screenMode;
            Laya.stage.alignV = GameConfig.alignV;
            Laya.stage.alignH = GameConfig.alignH;
            Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;
            if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true")
                Laya.enableDebugPanel();
            if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"])
                Laya["PhysicsDebugDraw"].enable();
            if (GameConfig.stat)
                Laya.Stat.show();
            Laya.alertGlobalError(true);
            Laya.MouseManager.multiTouchEnabled = false;
            Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
        }
        onVersionLoaded() {
            Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
        }
        onConfigLoaded() {
            new Engine();
        }
    }
    new Main();

}());
