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
            this.Carpause = "Carpause";
            this.Carreset = "Carreset";
            this.Record = "Record";
            this.SetToLast = "SetToLast";
            this.ResetGames = "ResetGames";
            this.jli = "jli";
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

    var View = Laya.View;
    var REG = Laya.ClassUtils.regClass;
    var ui;
    (function (ui) {
        var View_Commercialize;
        (function (View_Commercialize) {
            class View_DrawUI extends View {
                constructor() { super(); }
                createChildren() {
                    super.createChildren();
                    this.loadScene("View_Commercialize/View_Draw");
                }
            }
            View_Commercialize.View_DrawUI = View_DrawUI;
            REG("ui.View_Commercialize.View_DrawUI", View_DrawUI);
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
        })(View_Commercialize = ui.View_Commercialize || (ui.View_Commercialize = {}));
    })(ui || (ui = {}));
    (function (ui) {
        var View_Game;
        (function (View_Game) {
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
    }
    let Tools = new _Tools();

    const ResPath = {
        "bgm.mp3": "res/sound/bgm.mp3",
        "click.mp3": "res/sound/click.mp3",
        "Fail.mp3": "res/sound/Fail.mp3",
        "win.mp3": "res/sound/win.mp3"
    };
    let _ResPath = { "bgm.mp3": null, "click.mp3": null, "Fail.mp3": null, "win.mp3": null };
    const PackName = {};
    const ResGet = new Proxy(_ResPath, {
        get: function (target, propKey, receiver) {
            let result = Laya.loader.getRes(ResPath[propKey]);
            return result ? result : null;
        }
    });
    let VIEWJSONPATH = ["View_Commercialize/View_Draw.json", "View_Commercialize/View_Privacy.json", "View_Commercialize/View_Sign.json", "View_Commercialize/View_Store.json", "View_Game/View_Game.json", "View_Game/View_GameOver_Lose.json", "View_Game/View_GameOver_Win.json", "View_Game/View_Loading.json", "View_Game/View_Main.json", "View_Game/View_Setting.json"];
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
        VERSION: 4,
        Level: 1,
        freeDraw: 0,
        CurCoinNum: 500,
        CurStrength: 5,
        IsNewPlayer: true,
        skinNum: [1, 0, 0, 0],
        CurSkinNum: 0,
        SignInData: {
            last_time: null,
            state_update_time: null,
            historical_state: [],
            SignDays: 0,
        },
        lastTime: 0,
        UpdateStrength: null,
        Setting: {
            title: "设置",
            musicSwitch: true,
            soundSwitch: true,
            vibrationSwitch: true,
        },
        DrawNum: 1,
        LiheProgress: 0,
        overgame: false,
        jiugonggeclose: -1,
    };
    let identification = "D_";
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

    class CountCtr extends Laya.Script {
        static GetZeroIndex(data = []) {
            for (let i = 0; i < data.length; i++) {
                if (data[i] == 0) {
                    return i;
                }
            }
            return -100;
        }
        static GetNoZero(data = []) {
            for (let i = 0; i < data.length; i++) {
                if (data[i] != 0) {
                    console.log(data);
                    return i;
                }
            }
            return -100;
        }
        static GetContinueNum(data = []) {
            if (data == null) {
                return 0;
            }
            let indexTop = CountCtr.GetNoZero(data);
            let MyNum = data[indexTop];
            let NativeNum = 1;
            if (indexTop != data.length - 1) {
                for (let i = indexTop + 1; i < data.length; i++) {
                    if (MyNum == data[i]) {
                        NativeNum++;
                    }
                    else {
                        return NativeNum;
                    }
                }
            }
            return NativeNum;
        }
    }

    class View_GameOver_Win extends ui.View_Game.View_GameOver_WinUI {
        constructor() {
            super(...arguments);
            this.endnum = 300;
            this.uptime = 60;
        }
        onAwake() {
            this.currentTime = LocalData.lastTime;
            GameManager.playSound(ResPath["win.mp3"]);
            View_GameOver_Win.self = this;
            this.endnum = 300;
            LocalData.Level++;
            if (LocalData.Level > 10) {
                LocalData.Level = 1;
                LocalData.Level = LocalData.Level;
            }
            this.Win_Ad_Ctn.on(Laya.Event.CLICK, this, this.ADCtnGame);
            this.win_Ctn.on(Laya.Event.CLICK, this, this.CtnGame);
            this.VideoGet.on(Laya.Event.CLICK, this, this.adget);
            this.AddStrength.on(Laya.Event.CLICK, this, () => {
                this.AddStengthBox.visible = true;
            });
            this.VideoAdd.on(Laya.Event.CLICK, this, () => {
                if (LocalData.CurStrength < 10) {
                    LocalData.CurStrength += 5;
                }
                else {
                    LocalData.CurStrength = 15;
                    Tools_UI.Tip("当前体力值已满");
                }
                this.updateMyText();
            });
            this.CloseStrengthBox.on(Laya.Event.CLICK, this, () => {
                this.AddStengthBox.visible = false;
            });
            this.UpdateStrength();
        }
        CtnGame() {
            if (LocalData.CurStrength > 0) {
                if (LocalData.CurStrength == 5) {
                    this.currentTime = LocalData.lastTime = Date.now();
                }
                LocalData.CurStrength--;
                LocalData.CurCoinNum += this.endnum;
                Tools_UI.Tip("恭喜获得: " + this.endnum.toString() + "金币");
                this.updateMyText();
                UIControl.RemoveUI(View_Game);
                Laya.timer.once(500, this, () => {
                    UIControl.ShowUI(View_Game);
                    UIControl.RemoveUI(View_GameOver_Win);
                });
            }
            else {
                this.AddStengthBox.visible = true;
            }
        }
        updateMyText() {
            if (LocalData.CurStrength >= 5) {
                this.Strength.text = LocalData.CurStrength.toString();
            }
            else {
                this.AddStrength.visible = true;
                this.Strength.text = LocalData.CurStrength.toString() + "/5";
            }
        }
        ADCtnGame() {
            this.CloseView();
        }
        adget() {
            this.endnum += 300;
            this.CloseView();
        }
        CloseView() {
            LocalData.CurCoinNum += this.endnum;
            Tools_UI.Tip("恭喜获得: " + this.endnum.toString() + "金币");
            UIControl.RemoveUI(View_Game);
            Laya.timer.once(500, this, () => {
                UIControl.ShowUI(View_Main);
                UIControl.RemoveUI(View_GameOver_Win);
            });
        }
        UpdateStrength() {
            if (LocalData.CurStrength >= 5) {
                this.Strength.text = LocalData.CurStrength.toString();
                this.ResetTime.visible = false;
                return;
            }
            else {
                if (Date.now() - this.currentTime >= 1000 * 60 * this.uptime) {
                    var tlnum = Math.floor((Date.now() - LocalData.lastTime) / 1000 / 60 / this.uptime);
                    LocalData.CurStrength += tlnum;
                    if (LocalData.CurStrength >= 5) {
                        this.Strength.text = LocalData.CurStrength.toString() + "/5";
                        this.ResetTime.visible = false;
                        LocalData.CurStrength = 5;
                        return;
                    }
                    LocalData.lastTime += tlnum * 1000 * 60 * this.uptime;
                }
                Laya.timer.once(1000, this, this.UpdateStrength);
                this.ResetTime.visible = true;
                this.Strength.text = LocalData.CurStrength.toString() + "/5";
                this.ResetTime.text = (this.uptime - 1 - Math.floor((Date.now() - LocalData.lastTime) / 1000 / 60)) + ":" + (59 - Math.floor((Date.now() - LocalData.lastTime) / 1000) % 60) + "后体力+1";
            }
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
            View_Main.DATA = null;
        }
    }
    View_GameOver_Win.NAME = "View_GameOver_Win";
    View_GameOver_Win.AUTO = true;
    View_GameOver_Win.DATA = null;
    View_GameOver_Win.self = null;

    class waterCtr extends Laya.Script {
        constructor() {
            super(...arguments);
            this.m_playerState = 0;
            this.curState = [];
            this.IdleState = [];
            this.curPos = [];
            this.currentIdle = null;
            this.NativeHeight = 0;
            this.Firststate = [];
            this.Allstate = [];
            this.Allstate2 = [];
            this.hasMove2 = false;
        }
        onAwake() {
            this.currentIdle = this.owner.getChildByName("idle");
            this.m_playerState = 0;
            EventControl$1.on(EventName.SetToLast, this, this.back);
            EventControl$1.on(EventName.jli, this, this.Record);
        }
        Record() {
            var ts = [];
            for (let index = 0; index < 4; index++) {
                ts[index] = this.curState[index];
            }
            this.Allstate.push(ts);
        }
        back() {
            console.log("长度", this.Allstate.length);
            if (this.Allstate.length > 1) {
                this.Allstate.pop();
                this.curState = [];
                let ts = [];
                for (let index = 0; index < 4; index++) {
                    ts[index] = this.Allstate[this.Allstate.length - 1][index];
                }
                this.curState = ts;
                this.owner.getChildAt(0).bottom = 197;
                this.owner.getChildAt(1).bottom = 145;
                this.owner.getChildAt(2).bottom = 93;
                this.owner.getChildAt(3).bottom = 41;
                this.owner.pos(this.curPos[0][0], this.curPos[0][1]);
                this.owner.mask.rotation = this.curPos[0][2];
                this.currentIdle.rotation = 0;
                let nullNum = 0;
                for (let i = 0; i < 4; i++) {
                    if (this.curState[i] > 0) {
                        this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/" + this.curState[i] + ".png";
                    }
                    else if (this.curState[i] == 0) {
                        nullNum += 1;
                    }
                    else {
                        this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/" + Math.abs(this.curState[i]) + ".png";
                        this.owner.getChildAt(i).getChildAt(0).visible = true;
                    }
                }
                switch (nullNum) {
                    case 1:
                        this.owner.getChildAt(0).skin = "WaterUI/ui_in-game/tt.png";
                        break;
                    case 2:
                        for (let i = 0; i < 2; i++) {
                            this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                        }
                        break;
                    case 3:
                        for (let i = 0; i < 3; i++) {
                            this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                        }
                        break;
                    case 4:
                        for (let i = 0; i < 4; i++) {
                            this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                        }
                        break;
                }
            }
        }
        resetGame() {
            this.m_playerState = 0;
            this.owner.getChildAt(0).bottom = 197;
            this.owner.getChildAt(1).bottom = 145;
            this.owner.getChildAt(2).bottom = 93;
            this.owner.getChildAt(3).bottom = 41;
            this.owner.pos(this.curPos[0][0], this.curPos[0][1]);
            this.owner.mask.rotation = this.curPos[0][2];
            this.currentIdle.rotation = 0;
            let nullNum = 0;
            this.curState = [];
            for (let i = 0; i < 4; i++) {
                this.curState.push(this.Firststate[i]);
                if (this.Firststate[i] > 0) {
                    this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/" + this.Firststate[i] + ".png";
                }
                else if (this.Firststate[i] == 0) {
                    nullNum += 1;
                }
                else {
                    this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/" + Math.abs(this.Firststate[i]) + ".png";
                    this.owner.getChildAt(i).getChildAt(0).visible = true;
                }
            }
            switch (nullNum) {
                case 1:
                    this.owner.getChildAt(0).skin = "WaterUI/ui_in-game/tt.png";
                    break;
                case 2:
                    for (let i = 0; i < 2; i++) {
                        this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                    }
                    break;
                case 3:
                    for (let i = 0; i < 3; i++) {
                        this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                    }
                    break;
                case 4:
                    for (let i = 0; i < 4; i++) {
                        this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                    }
                    break;
            }
        }
        EnterMove(data = 0, target = null, WaterLine = null, myType = 0) {
            View_Game.self.GameMask.mouseEnabled = true;
            let showSkin = WaterLine.getChildByName("showSkin");
            showSkin.skin = "WaterUI/ui_in-game/" + myType + ".png";
            console.log(showSkin, "=============");
            let showMask = WaterLine.mask;
            showMask.height = 400;
            showSkin.height = 0;
            this.m_playerState = 2;
            this.owner.zOrder = 2;
            let startskinNum = CountCtr.GetNoZero(this.curState);
            let step = 0;
            switch (startskinNum) {
                case 0:
                    step = 0;
                    break;
                case 1:
                    step = 1;
                    break;
                case 2:
                    step = 2;
                    break;
                case 3:
                    step = 3;
                    break;
            }
            let myNum = CountCtr.GetNoZero(target.getComponent(waterCtr).curState);
            console.log(myNum, "================");
            if (myNum == -100) {
                myNum = 3;
            }
            let myheight = 260;
            switch (myNum) {
                case 0:
                    myheight = 250;
                    break;
                case 1:
                    myheight = 280;
                    break;
                case 2:
                    myheight = 340;
                    break;
                case 3:
                    myheight = 400;
                    break;
            }
            let MyLength = 4 - CountCtr.GetNoZero(this.curState);
            if (MyLength != 4) {
                if (MyLength > data) {
                    data = data + CountCtr.GetNoZero(this.curState);
                }
                else {
                    data = 4;
                }
            }
            Laya.Tween.to(this.owner.getChildByName("1"), {
                bottom: 253
            }, 100, null, Laya.Handler.create(this, () => {
                WaterLine.visible = true;
            }));
            Laya.Tween.to(this.owner.getChildByName("2"), {
                bottom: 201
            }, 100);
            Laya.Tween.to(this.owner.getChildByName("3"), {
                bottom: 149
            }, 100);
            Laya.Tween.to(this.owner.getChildByName("4"), {
                bottom: 97
            }, 100);
            Laya.Tween.to(this.owner, {
                x: target.x - 30,
                y: target.y - 150,
            }, 100);
            Laya.Tween.to(this.currentIdle, {
                rotation: 30
            }, 100);
            Laya.Tween.to(this.owner.mask, {
                rotation: 30
            }, 100, null, Laya.Handler.create(this, () => {
                if (LocalData.CurSkinNum == 2) {
                    WaterLine.pos(target.x + 18, target.y - 267);
                }
                else if (LocalData.CurSkinNum == 3) {
                    WaterLine.pos(target.x + 15, target.y - 269);
                }
                else {
                    WaterLine.pos(target.x + 24, target.y - 261);
                }
                Laya.Tween.to(showSkin, {
                    height: myheight,
                }, 200, Laya.Ease.circOut, null, 0, false);
                Laya.Tween.to(this.owner.getChildByName("2"), {
                    bottom: 253
                }, 200, Laya.Ease.circOut, null, 0, false);
                Laya.Tween.to(this.owner.getChildByName("3"), {
                    bottom: 201
                }, 200, Laya.Ease.circOut, null, 0, false);
                Laya.Tween.to(this.owner.getChildByName("4"), {
                    bottom: 149
                }, 200, Laya.Ease.circOut, null, 0, false);
                Laya.Tween.to(this.currentIdle, {
                    rotation: 50
                }, 200, Laya.Ease.circOut, null, 0, false);
                Laya.Tween.to(this.owner.mask, {
                    rotation: 50
                }, 200, Laya.Ease.circOut, Laya.Handler.create(this, () => {
                    this.curState[0] = 0;
                    if (data >= 2) {
                        Laya.Tween.to(this.owner.getChildByName("3"), {
                            bottom: 253
                        }, 200, Laya.Ease.circOut);
                        Laya.Tween.to(this.owner.getChildByName("4"), {
                            bottom: 201
                        }, 200, Laya.Ease.circOut);
                        Laya.Tween.to(this.currentIdle, {
                            rotation: 65
                        }, 200, Laya.Ease.circOut);
                        Laya.Tween.to(this.owner.mask, {
                            rotation: 65
                        }, 200, Laya.Ease.circOut, Laya.Handler.create(this, () => {
                            this.curState[1] = 0;
                            if (data >= 3) {
                                Laya.Tween.to(this.owner.getChildByName("4"), {
                                    bottom: 253
                                }, 150);
                                Laya.Tween.to(this.currentIdle, {
                                    rotation: 80
                                }, 150);
                                Laya.Tween.to(this.owner.mask, {
                                    rotation: 80
                                }, 150, null, Laya.Handler.create(this, () => {
                                    this.curState[2] = 0;
                                    if (data >= 4) {
                                        Laya.Tween.to(this.currentIdle, {
                                            rotation: 90
                                        }, 200);
                                        Laya.Tween.to(this.owner.mask, {
                                            rotation: 90
                                        }, 200, null, Laya.Handler.create(this, () => {
                                            this.curState[3] = 0;
                                            WaterLine.visible = false;
                                            this.ExitMove();
                                        }));
                                    }
                                    else {
                                        WaterLine.visible = false;
                                        this.ExitMove();
                                    }
                                }));
                            }
                            else {
                                WaterLine.visible = false;
                                this.ExitMove();
                            }
                        }));
                    }
                    else {
                        WaterLine.visible = false;
                        this.ExitMove();
                    }
                }));
            }));
        }
        EnterMove2(data = 0, type = 0, startStepNum = 0) {
            this.m_playerState = 2;
            let index = CountCtr.GetNoZero(this.curState);
            if (index == -100) {
                index = 4;
            }
            for (let i = 0; i < data; i++) {
                this.owner.getChildAt(index - 1 - i).height = 0;
                this.owner.getChildAt(index - 1 - i).skin = "WaterUI/ui_in-game/" + type + ".png";
                this.curState[index - 1 - i] = type;
            }
            Laya.Tween.to(this.owner.getChildAt(index - 1), {
                height: 52
            }, 500, null, Laya.Handler.create(this, () => {
                data -= 1;
                if (data != 0) {
                    Laya.Tween.to(this.owner.getChildAt(index - 2), {
                        height: 52
                    }, 200, null, Laya.Handler.create(this, () => {
                        data -= 1;
                        if (data != 0) {
                            Laya.Tween.to(this.owner.getChildAt(index - 3), {
                                height: 52
                            }, 200, null, Laya.Handler.create(this, () => {
                                data -= 1;
                                if (data != 0) {
                                    Laya.Tween.to(this.owner.getChildAt(index - 4), {
                                        height: 52
                                    }, 200, null, Laya.Handler.create(this, () => {
                                        this.ExitMove2(4);
                                    }));
                                }
                                else {
                                    this.ExitMove2(3);
                                }
                            }));
                        }
                        else {
                            this.ExitMove2(2);
                        }
                    }));
                }
                else {
                    this.ExitMove2(1);
                }
            }));
        }
        EneterHold() {
            this.m_playerState = 1;
            this.owner.y -= 40;
        }
        EnterIdle() {
            this.m_playerState = 0;
            this.owner.y += 40;
        }
        ExitMove() {
            let Index = CountCtr.GetNoZero(this.curState);
            if (Index == -100) {
                Index = 4;
            }
            if (Index != 4) {
                let Num = CountCtr.GetContinueNum(this.curState);
                for (let i = 0; i < Num; i++) {
                    this.curState[Index + i] = Math.abs(this.curState[Index + i]);
                    this.owner.getChildAt(Index + i).getChildAt(0).visible = false;
                }
            }
            for (let i = 0; i < Index; i++) {
                this.owner.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
            }
            Laya.Tween.to(this.owner.getChildByName("1"), {
                bottom: 197
            }, 80);
            Laya.Tween.to(this.owner.getChildByName("2"), {
                bottom: 145
            }, 80);
            Laya.Tween.to(this.owner.getChildByName("3"), {
                bottom: 93
            }, 80);
            Laya.Tween.to(this.owner.getChildByName("4"), {
                bottom: 41
            }, 80);
            Laya.Tween.to(this.owner, {
                x: this.curPos[0][0],
                y: this.curPos[0][1],
            }, 80);
            Laya.Tween.to(this.currentIdle, {
                rotation: 0
            }, 100);
            Laya.Tween.to(this.owner.mask, {
                rotation: 0
            }, 100, null, Laya.Handler.create(this, () => {
                this.m_playerState = 0;
                this.owner.zOrder = 0;
                this.owner.parent.addChildAt(this.owner, Number(this.owner.name.split('_')[1]) - 1);
                EventControl$1.emit(EventName.jli, this);
            }));
            View_Game.self.GameMask.mouseEnabled = false;
        }
        ExitMove2(type = 1) {
            this.curState = this.curState;
            if (this.curState[0] != 0) {
                let myindex = this.curState[0];
                let iswin = true;
                for (let i = 1; i < 4; i++) {
                    if (this.curState[i] != myindex) {
                        iswin = false;
                    }
                }
                if (iswin) {
                    console.log(View_Game.self.mywindata.indexOf(this.curState[0]), "==========================");
                    let WinAni = View_Game.self.GetUnActiveAnimation();
                    WinAni.pos(this.owner.x + 15, this.owner.y + 17);
                    WinAni.visible = true;
                    WinAni.play();
                    Laya.timer.once(1000, this, () => {
                        WinAni.stop();
                        WinAni.visible = false;
                    });
                    if (View_Game.self.mywindata.indexOf(this.curState[0]) == -1) {
                        View_Game.self.HasWunNum += 1;
                        View_Game.self.mywindata.push(this.curState[0]);
                        if (View_Game.self.HasWunNum == View_Game.self.WinNum) {
                            Laya.timer.once(1200, this, () => {
                                UIControl.ShowUI(View_GameOver_Win);
                            });
                        }
                    }
                    else {
                        console.log("该颜色赢过了", this.curState[0]);
                    }
                }
            }
            switch (type) {
                case 1:
                    Laya.timer.once(1000, this, () => {
                        this.m_playerState = 0;
                    });
                    break;
                case 2:
                    Laya.timer.once(600, this, () => {
                        this.m_playerState = 0;
                    });
                    break;
                case 3:
                    Laya.timer.once(600, this, () => {
                        this.m_playerState = 0;
                    });
                    break;
                case 4:
                    Laya.timer.once(200, this, () => {
                        this.m_playerState = 0;
                    });
                    break;
            }
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
        }
    }
    var Pstate;
    (function (Pstate) {
        Pstate[Pstate["idle"] = 0] = "idle";
        Pstate[Pstate["Hold"] = 1] = "Hold";
        Pstate[Pstate["Move"] = 2] = "Move";
    })(Pstate || (Pstate = {}));

    class View_Setting extends ui.View_Game.View_SettingUI {
        onAwake() {
            View_Setting.self = this;
            EventControl$1.on(EventName.SettingChange, this, this.SettingChange);
            this.SettingChange();
            Tools_UI.AnimationUI_Show(this.centerBox, 5, 500);
        }
        SettingChange() {
            this.yy_box.getChildAt(1).visible = LocalData.Setting.musicSwitch;
            this.yx_box.getChildAt(1).visible = LocalData.Setting.soundSwitch;
            this.zd_box.getChildAt(1).visible = LocalData.Setting.vibrationSwitch;
            this.yy_box.getChildAt(2).visible = !LocalData.Setting.musicSwitch;
            this.yx_box.getChildAt(2).visible = !LocalData.Setting.soundSwitch;
            this.zd_box.getChildAt(2).visible = !LocalData.Setting.vibrationSwitch;
            if (LocalData.Setting.musicSwitch) {
                GameManager.playMusic(ResPath["bgm.mp3"]);
            }
            else {
                GameManager.StopSound(0);
            }
            if (LocalData.Setting.soundSwitch) {
            }
            else {
                GameManager.StopSound(1);
            }
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
            GameManager.isPlaying = true;
            EventControl$1.emit(EventName.Carreset);
        }
    }
    View_Setting.NAME = "View_Setting";
    View_Setting.AUTO = true;
    View_Setting.DATA = null;
    View_Setting.self = null;

    class View_Game extends ui.View_Game.View_GameUI {
        constructor() {
            super(...arguments);
            this.bottleNum = 2;
            this.WinNum = 1;
            this.curResetNum = 4;
            this.HasAddBottle = false;
            this.stateLevel1 = [0, 0, 0, 1, 0, 1, 1, 1];
            this.stateLevel2 = [1, 2, 1, 2, 0, 0, 0, 0, 2, 1, 2, 1];
            this.stateLevel3 = [1, 2, 3, 1, 1, 2, 3, 3, 2, 3, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel4 = [2, 2, 3, 4, 3, 4, 3, 4, 2, 3, 4, 2, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel5 = [5, -1, -3, -2, 5, -1, -2, -3, 6, -3, -6, -5, 1, -6, -5, -3, 1, -6, -2, -2, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel6 = [1, 1, 1, 2, 1, 3, 2, 4, 4, 2, 4, 3, 3, 4, 3, 5, 2, 5, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel7 = [1, 2, 1, 4, 1, 2, 5, 5, 1, 5, 3, 3, 5, 2, 3, 4, 3, 4, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel8 = [1, -3, -2, -3, 2, -3, -3, -4, 5, -2, -1, -2, 4, -1, -4, -5, 5, -1, -5, -4, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel9 = [5, 3, 2, 3, 2, 3, 3, 4, 6, 2, 1, 2, 4, 5, 4, 6, 6, 5, 6, 4, 5, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0];
            this.stateLevel10 = [1, 2, 1, 4, 5, 4, 3, 6, 2, 7, 7, 1, 2, 6, 6, 4, 5, 2, 3, 3, 7, 7, 5, 1, 3, 6, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0];
            this.HaveSelectNum = 0;
            this.currentSelect = null;
            this.currentIdle = null;
            this.curx = 0;
            this.cury = 0;
            this.mydata = [];
            this.BoxNumArray = [2, 2, 3, 5, 5, 7, 7, 7, 7, 8, 9];
            this.BoxWinArray = [1, 1, 2, 3, 3, 5, 5, 5, 5, 6, 7];
            this.mywindata = [-100, -99];
            this.HasWunNum = 0;
        }
        onAwake() {
            View_Game.self = this;
            this.curResetNum = 4;
            LocalData.Level = LocalData.Level;
            this.bottleNum = this.BoxNumArray[LocalData.Level];
            this.WinNum = this.BoxWinArray[LocalData.Level];
            console.log("我的瓶子个数", this.bottleNum);
            this.UpdateBottleNum();
            this.resetGame.on(Laya.Event.CLICK, this, this.ResetGame);
            this.Back.on(Laya.Event.CLICK, this, this.BackGame);
            this.AddBottle.on(Laya.Event.CLICK, this, this.AddmyBottle);
            this.Setting.on(Laya.Event.CLICK, this, () => {
                UIControl.ShowUI(View_Setting);
            });
        }
        AddmyBottle() {
            if (!this.HasAddBottle) {
                this.HasAddBottle = true;
                this.bottleNum += 1;
                let myBottle = this.PosList.getChildAt(this.bottleNum - 1);
                myBottle.name = "bottle_" + (this.bottleNum);
                myBottle.getChildByName("idle").on(Laya.Event.CLICK, this, this.ClickBottle);
                myBottle.addComponent(waterCtr);
                myBottle.getComponent(waterCtr).curState = [0, 0, 0, 0];
                let ts = [];
                for (let i = 0; i < 4; i++) {
                    ts[i] = myBottle.getComponent(waterCtr).curState[i];
                    this.mydata.push(0);
                    myBottle.getComponent(waterCtr).Firststate.push(0);
                    myBottle.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                }
                myBottle.getComponent(waterCtr).Allstate.push(ts);
                myBottle.getChildByName("idle").skin = "WaterUI/ui_in-game/img_pingzi_" + (LocalData.CurSkinNum + 1) + ".png";
                myBottle.mask.skin = "WaterUI/ui_in-game/Mask" + (LocalData.CurSkinNum + 1) + ".png";
                let curPosx = myBottle.x;
                let curPosy = myBottle.y;
                let curRotation = myBottle.rotation;
                let datas = [];
                datas.push(curPosx);
                datas.push(curPosy);
                datas.push(curRotation);
                myBottle.getComponent(waterCtr).curPos[0] = datas;
                myBottle.visible = true;
                console.log("加完瓶子当前关卡的瓶子下标", this.mydata);
                this.AddBottleMask.visible = true;
                this.AddBottleMask.mouseEnabled = true;
            }
        }
        UpdatteText() {
            this.ResetNum.text = this.curResetNum.toString();
        }
        BackGame() {
            console.log(this.curResetNum, "=============");
            if (this.curResetNum > 0) {
                this.curResetNum--;
                this.UpdatteText();
                EventControl$1.emit(EventName.SetToLast);
                if (this.curResetNum == 0) {
                    this.AddReset.visible = true;
                }
            }
            else {
                this.AddReset.visible = false;
                this.curResetNum = 3;
                this.UpdatteText();
                EventControl$1.emit(EventName.SetToLast);
            }
        }
        ResetGame() {
            this.curResetNum = 4;
            this.UpdatteText();
            this.mywindata = [];
            this.HasWunNum = 0;
            console.log(this.mydata);
            for (let i = 0; i < this.bottleNum; i++) {
                this.PosList.getChildAt(i).getComponent(waterCtr).resetGame();
            }
        }
        UpdateBottleNum() {
            for (let i = 0; i < this.bottleNum; i++) {
                var Bottle = this.PosList.getChildAt(i);
                Bottle.name = "bottle_" + (i + 1);
                Bottle.getChildByName("idle").on(Laya.Event.CLICK, this, this.ClickBottle);
            }
            switch (LocalData.Level) {
                case 1:
                    this.mydata = this.stateLevel1;
                    break;
                case 2:
                    this.mydata = this.stateLevel2;
                    break;
                case 3:
                    this.mydata = this.stateLevel3;
                    break;
                case 4:
                    this.mydata = this.stateLevel4;
                    break;
                case 5:
                    this.mydata = this.stateLevel5;
                    break;
                case 6:
                    this.mydata = this.stateLevel6;
                    break;
                case 7:
                    this.mydata = this.stateLevel7;
                    break;
                case 8:
                    this.mydata = this.stateLevel8;
                    break;
                case 9:
                    this.mydata = this.stateLevel9;
                    break;
                case 10:
                    this.mydata = this.stateLevel10;
                    break;
            }
            let index = 0;
            for (let i = 0; i < this.bottleNum; i++) {
                index += 4;
            }
            this.SetBottle(this.mydata, 0);
        }
        GetUnActiveLine() {
            for (let i = 0; i < this.LineBox.numChildren; i++) {
                if (this.LineBox.getChildAt(i).visible == false) {
                    return this.LineBox.getChildAt(i);
                }
            }
        }
        GetUnActiveAnimation() {
            for (let i = 0; i < this.AnimationGroup.numChildren; i++) {
                if (this.AnimationGroup.getChildAt(i).visible == false) {
                    return this.AnimationGroup.getChildAt(i);
                }
            }
        }
        ClickBottle(e) {
            let Name = e.target.parent.name.split("_");
            if (Name.length < 2) {
                return;
            }
            if (Name[0] == "bottle") {
                console.log("点击瓶子");
                let targetScript = e.target.parent.getComponent(waterCtr);
                let HasHold = false;
                switch (e.target.parent.getComponent(waterCtr).m_playerState) {
                    case 0:
                        let Myscript;
                        for (let i = 0; i < this.bottleNum; i++) {
                            Myscript = this.PosList.getChildAt(i).getComponent(waterCtr);
                            if (Myscript != null && Myscript != targetScript) {
                                console.log(Myscript.m_playerState);
                                if (Myscript.m_playerState == 1) {
                                    HasHold = true;
                                    if (CountCtr.GetZeroIndex(targetScript.curState) != -100) {
                                        let Num = CountCtr.GetContinueNum(Myscript.curState);
                                        let targetIndex = CountCtr.GetNoZero(targetScript.curState);
                                        let MyIndex = CountCtr.GetNoZero(Myscript.curState);
                                        let TopIndex = Myscript.curState[MyIndex];
                                        let targetTop = targetScript.curState[targetIndex];
                                        let startskinNum = CountCtr.GetNoZero(Myscript.curState);
                                        let step = 0;
                                        switch (startskinNum) {
                                            case 0:
                                                step = 0;
                                                break;
                                            case 1:
                                                step = 1;
                                                break;
                                            case 2:
                                                step = 2;
                                                break;
                                            case 3:
                                                step = 3;
                                                break;
                                        }
                                        if (targetIndex == -100) {
                                            Myscript.EnterMove(Num, e.target.parent, this.GetUnActiveLine(), TopIndex);
                                            targetScript.EnterMove2(Num, TopIndex, step);
                                            return;
                                        }
                                        if (targetTop == TopIndex) {
                                            switch (targetIndex) {
                                                case 0:
                                                    break;
                                                case 1:
                                                    if (Num > 1) {
                                                        Num = 1;
                                                    }
                                                    Myscript.EnterMove(Num, e.target.parent, this.GetUnActiveLine(), TopIndex);
                                                    targetScript.EnterMove2(Num, TopIndex, step);
                                                    break;
                                                case 2:
                                                    if (Num > 2) {
                                                        Num = 2;
                                                    }
                                                    Myscript.EnterMove(Num, e.target.parent, this.GetUnActiveLine(), TopIndex);
                                                    targetScript.EnterMove2(Num, TopIndex, step);
                                                    break;
                                                case 3:
                                                    if (Num > 3) {
                                                        Num = 3;
                                                    }
                                                    Myscript.EnterMove(Num, e.target.parent, this.GetUnActiveLine(), TopIndex);
                                                    targetScript.EnterMove2(Num, TopIndex, step);
                                                    break;
                                            }
                                        }
                                        else {
                                            Myscript.EnterIdle();
                                            targetScript.EneterHold();
                                        }
                                    }
                                    else {
                                        Myscript.EnterIdle();
                                        targetScript.EneterHold();
                                    }
                                }
                            }
                        }
                        if (!HasHold) {
                            if (CountCtr.GetNoZero(targetScript.curState) != -100) {
                                targetScript.EneterHold();
                            }
                        }
                        break;
                    case 1:
                        targetScript.EnterIdle();
                        break;
                    case 2:
                        break;
                }
            }
        }
        SetBottle(data = null, index = null, curIndex = 0) {
            if (curIndex < this.bottleNum) {
                let myBottle = this.PosList.getChildAt(curIndex);
                if (!myBottle.getComponent(waterCtr)) {
                    myBottle.addComponent(waterCtr);
                }
                let nullNum = 0;
                for (let i = 0; i < 4; i++) {
                    myBottle.getComponent(waterCtr).curState.push(this.mydata[i + index]);
                    myBottle.getComponent(waterCtr).Firststate.push(this.mydata[i + index]);
                    if (this.mydata[i + index] > 0) {
                        myBottle.getChildAt(i).skin = "WaterUI/ui_in-game/" + this.mydata[i + index] + ".png";
                    }
                    else if (this.mydata[i + index] == 0) {
                        nullNum += 1;
                    }
                    else {
                        myBottle.getChildAt(i).skin = "WaterUI/ui_in-game/" + Math.abs(this.mydata[i + index]) + ".png";
                        myBottle.getChildAt(i).getChildAt(0).visible = true;
                    }
                }
                myBottle.getComponent(waterCtr).Allstate[0] = myBottle.getComponent(waterCtr).Firststate;
                myBottle.visible = true;
                myBottle.getComponent(waterCtr).m_playerState = 0;
                index += 4;
                curIndex += 1;
                switch (nullNum) {
                    case 1:
                        myBottle.getChildAt(0).skin = "WaterUI/ui_in-game/tt.png";
                        break;
                    case 2:
                        for (let i = 0; i < 2; i++) {
                            myBottle.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                        }
                        break;
                    case 3:
                        for (let i = 0; i < 3; i++) {
                            myBottle.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                        }
                        break;
                    case 4:
                        for (let i = 0; i < 4; i++) {
                            myBottle.getChildAt(i).skin = "WaterUI/ui_in-game/tt.png";
                        }
                        break;
                }
                myBottle.getChildByName("idle").skin = "WaterUI/ui_in-game/img_pingzi_" + (LocalData.CurSkinNum + 1) + ".png";
                myBottle.mask.skin = "WaterUI/ui_in-game/Mask" + (LocalData.CurSkinNum + 1) + ".png";
                let curPosx = myBottle.x;
                let curPosy = myBottle.y;
                let curRotation = myBottle.rotation;
                let datas = [];
                datas.push(curPosx);
                datas.push(curPosy);
                datas.push(curRotation);
                myBottle.getComponent(waterCtr).curPos[0] = datas;
                this.SetBottle(data, index, curIndex);
            }
            else {
                for (let i = 0; i < this.bottleNum; i++) {
                    console.log(this.PosList.getChildAt(i).getComponent(waterCtr).curState);
                }
            }
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
        }
    }
    View_Game.NAME = "View_Game";
    View_Game.AUTO = true;
    View_Game.DATA = null;

    class View_Main extends ui.View_Game.View_MainUI {
        constructor() {
            super(...arguments);
            this.uptime = 60;
        }
        onAwake() {
            View_Main.self = this;
            this.currentTime = LocalData.lastTime;
            this.CoinNum.text = LocalData.CurCoinNum.toString();
            if (window["qg"]) {
                GameManager.playMusic(ResPath["bgm.mp3"]);
            }
            this.startGame.on(Laya.Event.MOUSE_DOWN, this, () => {
                if (LocalData.CurStrength > 0) {
                    if (LocalData.CurStrength == 5) {
                        LocalData.lastTime = Date.now();
                    }
                    LocalData.CurStrength--;
                    this.updateMyText();
                    Laya.timer.frameOnce(1, this, () => {
                        UIControl.ShowUI(View_Game);
                        UIControl.RemoveUI(View_Main);
                    });
                }
                else {
                    this.AddStengthBox.visible = true;
                }
            });
            this.AddStrength.on(Laya.Event.CLICK, this, () => {
                this.AddStengthBox.visible = true;
            });
            this.VideoAdd.on(Laya.Event.CLICK, this, () => {
                if (LocalData.CurStrength < 10) {
                    LocalData.CurStrength += 5;
                }
                else {
                    LocalData.CurStrength = 15;
                    Tools_UI.Tip("当前体力值已满");
                }
                this.updateMyText();
            });
            this.CloseStrengthBox.on(Laya.Event.CLICK, this, () => {
                this.AddStengthBox.visible = false;
            });
            this.UpdateStrength();
        }
        updateMyText() {
            if (LocalData.CurStrength >= 5) {
                this.Strength.text = LocalData.CurStrength.toString();
            }
            else {
                this.AddStrength.visible = true;
                this.Strength.text = LocalData.CurStrength.toString() + "/5";
            }
        }
        UpdateStrength() {
            if (LocalData.CurStrength >= 5) {
                this.Strength.text = LocalData.CurStrength.toString();
                this.ResetTime.visible = false;
                return;
            }
            else {
                if (Date.now() - this.currentTime >= 1000 * 60 * this.uptime) {
                    var tlnum = Math.floor((Date.now() - LocalData.lastTime) / 1000 / 60 / this.uptime);
                    LocalData.CurStrength += tlnum;
                    if (LocalData.CurStrength >= 5) {
                        this.Strength.text = LocalData.CurStrength.toString() + "/5";
                        this.ResetTime.visible = false;
                        LocalData.CurStrength = 5;
                        return;
                    }
                    LocalData.lastTime += tlnum * 1000 * 60 * this.uptime;
                }
                Laya.timer.once(1000, this, this.UpdateStrength);
                this.ResetTime.visible = true;
                this.Strength.text = LocalData.CurStrength.toString() + "/5";
                this.ResetTime.text = (this.uptime - 1 - Math.floor((Date.now() - LocalData.lastTime) / 1000 / 60)) + ":" + (59 - Math.floor((Date.now() - LocalData.lastTime) / 1000) % 60) + "后体力+1";
            }
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
            View_Main.DATA = null;
        }
    }
    View_Main.NAME = "View_Main";
    View_Main.AUTO = true;
    View_Main.DATA = null;
    View_Main.self = null;

    class _GameManager {
        constructor() {
            this.isPlaying = false;
            this.isWin = false;
            this.FpsScale = 1;
            this.FpsMax = 60;
        }
        ReLevelDate() {
        }
        StartGame() {
            UIControl.RemoveUI(View_Main);
        }
        onGameOver(_iswin = false) {
            GameManager.isWin = _iswin;
            GameManager.isPlaying = false;
            GameManager.StopSound(3);
            EventControl$1.emit(EventName.GameEnd);
            if (GameManager.isWin) {
                GameManager.playSound(ResPath["win.mp3"]);
            }
            else {
                GameManager.playSound(ResPath["Fail.mp3"]);
            }
        }
        GamePauseOrResume(_isPause) {
            if (_isPause) {
                Laya.timer.once(50, this, () => {
                    Laya.timer.scale = 0;
                    Laya.updateTimer.pause();
                    Laya.physicsTimer.pause();
                });
            }
            else {
                Laya.timer.scale = 1;
                Laya.updateTimer.resume();
                Laya.physicsTimer.resume();
            }
        }
        onGameOver2() {
        }
        showToast(str, callback) {
            if (Tools.getPlatform == "wx") {
                wx.showToast({
                    icon: "none",
                    title: str,
                    duration: 2000,
                    image: "",
                    mask: false,
                    success: () => { },
                    fail: () => { },
                    complete: () => { },
                });
            }
            else if (Laya.Browser.onQGMiniGame) {
                qg.showToast({
                    icon: "none",
                    title: str,
                    duration: 2000,
                    image: "",
                    mask: false,
                    success: () => { },
                    fail: () => { },
                    complete: () => { },
                });
            }
            else if (typeof alert && alert) {
                alert(str);
                if (typeof callback == "function") {
                    callback(true);
                }
            }
            else {
                if (typeof callback == "function") {
                    callback(true);
                }
            }
        }
        SettingChange(type) {
            switch (type) {
                case "yy_box":
                    LocalData.Setting.musicSwitch = !LocalData.Setting.musicSwitch;
                    break;
                case "yx_box":
                    LocalData.Setting.soundSwitch = !LocalData.Setting.soundSwitch;
                    break;
                case "zd_box":
                    LocalData.Setting.vibrationSwitch = !LocalData.Setting.vibrationSwitch;
                    break;
                default:
                    break;
            }
            EventControl$1.emit(EventName.SettingChange);
        }
        playMusic(url) {
            if (LocalData.Setting.musicSwitch) {
                Laya.SoundManager.playMusic(url, 0);
            }
        }
        playSound(url, num = 1) {
            if (LocalData.Setting.soundSwitch) {
                Laya.SoundManager.playSound(url, num);
            }
        }
        StopSound(type, url = "") {
            switch (type) {
                case 0:
                    Laya.SoundManager.stopMusic();
                    break;
                case 1:
                    Laya.SoundManager.stopAllSound();
                    break;
                case 2:
                    Laya.SoundManager.stopSound(url);
                    break;
                case 3:
                    Laya.SoundManager.stopAll();
                    break;
                default:
                    break;
            }
        }
        vibrateCtr(index) {
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
    }
    const GameManager = new _GameManager();

    class Tools_UI {
        static Tip(title) {
            let Label = new Laya.Label(title);
            Label.centerX = 0;
            Label.centerY = 0;
            Label.fontSize = 40;
            Label.font = "Microsoft YaHei";
            Label.color = "#ffffff";
            Label.align = "center";
            Label.valign = "middle";
            Label.bgColor = "#00000099";
            Label.padding = "20,50,20,50";
            Label.zOrder = 99;
            Laya.stage.addChild(Label);
            Laya.Tween.to(Label, { centerY: -200 }, 2500);
            Laya.Tween.to(Label, { alpha: 0 }, 1500, null, null, 1000);
            Laya.timer.once(2000, this, () => {
                Label.removeSelf();
                Label.destroy();
            });
        }
        static NodeToXY(Node) {
            let _Node = Node;
            let pivotX = _Node.pivotX;
            if (_Node.anchorX || _Node.anchorX == 0) {
                let pivotX = _Node.anchorX * _Node.width;
                _Node.x += pivotX * _Node.scaleX;
            }
            let pivotY = _Node.pivotY;
            if (_Node.anchorY || _Node.anchorY == 0) {
                pivotY = _Node.anchorY * _Node.height;
                _Node.y += pivotY * _Node.scaleY;
            }
            _Node.anchorX = NaN;
            _Node.anchorY = NaN;
            _Node.pivotX = pivotX;
            _Node.pivotY = pivotY;
            let _NodeX = _Node.x - (_Node.pivotX * _Node.scaleX) + (_Node.width * _Node.scaleX) / 2;
            let _NodeY = _Node.y - (_Node.pivotY * _Node.scaleY) + (_Node.height * _Node.scaleY) / 2;
            _Node.pivotX = _Node.width / 2;
            _Node.pivotY = _Node.height / 2;
            _Node.top = NaN;
            _Node.left = NaN;
            _Node.right = NaN;
            _Node.bottom = NaN;
            _Node.centerX = NaN;
            _Node.centerY = NaN;
            _Node.x = _NodeX;
            _Node.y = _NodeY;
        }
        static AnimationUI_1(Image, time = 3000) {
            if (!time)
                time = 3000;
            Image.scaleX = 0;
            Image.alpha = 1;
            Laya.Tween.to(Image, { scaleX: 1 }, time * 0.1, null, new Laya.Handler(this, () => {
                Laya.Tween.to(Image, { alpha: 0 }, time * 0.1);
            }));
            Laya.timer.loop(time, this, () => {
                Image.scaleX = 0;
                Image.alpha = 1;
                Laya.Tween.to(Image, { scaleX: 1 }, time * 0.1, null, new Laya.Handler(this, () => {
                    Laya.Tween.to(Image, { alpha: 0 }, time * 0.1);
                }));
            });
        }
        static AnimationUI_BtnScale(Btn, Type, Scale) {
            if (!Type)
                Type = 1;
            if (!Scale)
                Scale = 0.2;
            Btn.mouseEnabled = true;
            Tools_UI.NodeToXY(Btn);
            let scaleX = Btn.scaleX;
            let scaleY = Btn.scaleY;
            Btn.on(Laya.Event.MOUSE_DOWN, this, () => {
                GameManager.vibrateCtr(0);
                if (Type == 1) {
                    Laya.Tween.to(Btn, { scaleX: scaleX - Scale, scaleY: scaleY - Scale }, 100);
                }
                else if (Type == 2) {
                    Laya.Tween.to(Btn, { scaleX: scaleX + Scale, scaleY: scaleY + Scale }, 100);
                }
                Laya.Tween.to(Btn, { scaleX: scaleX, scaleY: scaleY }, 150, null, null, 100);
            });
            if (Type == 1) {
                Laya.Tween.to(Btn, { scaleX: scaleX - Scale, scaleY: scaleY - Scale }, 100);
            }
            else if (Type == 2) {
                Laya.Tween.to(Btn, { scaleX: scaleX + Scale, scaleY: scaleY + Scale }, 100);
            }
            Laya.Tween.to(Btn, { scaleX: scaleX, scaleY: scaleY }, 150, null, null, 100);
        }
        static AnimationUI_Show(Node, Type, Time, delay) {
            if (!Time)
                Time = 500;
            if (!Type)
                Type = 1;
            if (!delay)
                delay = 0;
            Tools_UI.NodeToXY(Node);
            switch (Type) {
                case 1:
                    Laya.Tween.from(Node, { y: 0 - Node.height }, Time, Laya.Ease.elasticOut, null, delay);
                    break;
                case 2:
                    Laya.Tween.from(Node, { x: Laya.stage.height + Node.width }, Time, Laya.Ease.elasticOut, null, delay);
                    break;
                case 3:
                    Laya.Tween.from(Node, { y: Laya.stage.height + Node.height }, Time, Laya.Ease.elasticOut, null, delay);
                    break;
                case 4:
                    Laya.Tween.from(Node, { x: 0 - Node.width }, Time, Laya.Ease.elasticOut, null, delay);
                    break;
                case 5:
                    Laya.Tween.from(Node, { scaleX: Node.scaleX * 0.1, scaleY: Node.scaleY * 0.1, }, Time, Laya.Ease.elasticOut, null, delay);
                    break;
                case 6:
                    Laya.Tween.from(Node, { scaleX: Node.scaleX * 2, scaleY: Node.scaleY * 2 }, Time, Laya.Ease.elasticOut, null, delay);
                    break;
            }
            Node.visible = false;
            Laya.timer.once(delay, this, () => {
                Node.visible = true;
            });
        }
        static AlphaChange(e, _time) {
            e.alpha = 0;
            Laya.Tween.to(e, { alpha: 1 }, 500, null, Laya.Handler.create(this, () => {
                Laya.timer.once(_time, this, () => {
                    Laya.Tween.to(e, { alpha: 0 }, 500, null);
                });
            }));
        }
    }

    var Tools_Plant = new class ToolsData {
        Random(min, max) {
            return Math.floor(Math.random() * ((max + 1) - min) + min);
        }
        Vector2ToAngle(X, Y) {
            if (Y > 0)
                return (360 - Math.atan(X / Y) * 180 / Math.PI) % 360;
            else if (Y < 0)
                return 360 - (Math.atan(X / Y) * 180 / Math.PI + 180);
            else
                null;
        }
    };

    class View_Draw extends ui.View_Commercialize.View_DrawUI {
        constructor() {
            super(...arguments);
            this.IsDraw = false;
            this.tsNum = [5, 2, 4, 6, 1, 3, 5];
        }
        onAwake() {
            this.AddEvent();
            this.AddAnim();
            if (LocalData.DrawNum <= 0) {
                this.video_icon.visible = true;
            }
            ;
            this.hintTxt.text = "已抽取 " + (LocalData.DrawNum % 5).toString() + " 次";
            if (LocalData.freeDraw == 0) {
                this.give_btn.visible = true;
                this.video_icon.visible = false;
            }
            else {
                this.give_btn.visible = false;
                this.video_icon.visible = true;
            }
        }
        AddEvent() {
            this.CloseDraw.on(Laya.Event.CLICK, this, this.ClickBack);
            this.give_btn.on(Laya.Event.CLICK, this, this.ClickGiveBtn);
            this.video_icon.on(Laya.Event.CLICK, this, this.ClickGiveBtn);
        }
        ClickGiveBtn() {
            GameManager.vibrateCtr(0);
            this.give_btn.visible = false;
            this.video_icon.visible = true;
            LocalData.freeDraw = 1;
            if (this.IsDraw == false) {
                if (this.video_icon.visible == true) {
                    this.DrawMove();
                }
                else {
                    this.DrawMove();
                }
            }
            else {
                Tools_UI.Tip("抽奖中，请耐心等待！");
            }
        }
        DrawMove() {
            this.IsDraw = true;
            let Random = Tools_Plant.Random(1, 3);
            if (Math.random() > 0.8) {
                Random = Tools_Plant.Random(4, 6);
            }
            console.log("得到的第一位ran", Random);
            Random = this.tsNum[Random];
            console.log("得到的第二位ran", Random);
            this.pointer.rotation = 0;
            Laya.Tween.to(this.pointer, { rotation: Random * 60 + 360 * 3 }, 2500, Laya.Ease.backInOut, Laya.Handler.create(this, () => {
                this.video_icon.visible = true;
                this.GiveDrawMoney(Random);
                if (LocalData.LiheProgress < 5) {
                    LocalData.LiheProgress += 1;
                }
                this.IsDraw = false;
            }));
            Laya.Tween.to(this.drawbg, { rotation: this.drawbg.rotation + 360 * 3 }, 3000, Laya.Ease.backInOut);
        }
        GiveDrawMoney(Random) {
            console.log("针头的", this.pointer.rotation);
            LocalData.DrawNum += 1;
            let CoinNum = 0;
            var showhint = "";
            switch (Random) {
                case 0:
                    break;
                case 1:
                    CoinNum = 500;
                    showhint = "恭喜获得" + CoinNum + "金币";
                    break;
                case 2:
                    CoinNum = 100;
                    showhint = "恭喜获得" + CoinNum + "金币";
                    break;
                case 3:
                    CoinNum = 800;
                    showhint = "恭喜获得" + CoinNum + "金币";
                    break;
                case 4:
                    CoinNum = 700;
                    showhint = "恭喜获得" + CoinNum + "金币";
                    break;
                case 5:
                    CoinNum = 100;
                    showhint = "恭喜获得" + CoinNum + "金币";
                    break;
                case 6:
                    CoinNum = 1000;
                    showhint = "恭喜获得" + CoinNum + "金币";
                    break;
            }
            if (Random != 0) {
                LocalData.CurCoinNum += CoinNum;
                Tools_UI.Tip(showhint);
            }
            ;
            if (LocalData.DrawNum % 5 == 0) {
                Laya.timer.once(1000, this, () => {
                    Tools_UI.Tip("恭喜获得 奖励车辆皮肤");
                    for (let i = 0; i < LocalData.skinNum.length; i++) {
                        if (LocalData.skinNum[i] == 0) {
                            LocalData.skinNum[i] = 1;
                            LocalData.skinNum = LocalData.skinNum;
                            return;
                        }
                    }
                });
            }
            this.hintTxt.text = "已抽取 " + (LocalData.DrawNum % 5).toString() + " 次";
        }
        CLickLibao() {
            if (LocalData.LiheProgress == 5) {
                var coinNum = Math.ceil(Math.random() * 1000 + 500);
                LocalData.CurCoinNum += coinNum;
                Tools_UI.Tip("恭喜获得" + coinNum + "金币");
                LocalData.LiheProgress = 0;
            }
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
        }
        ClickBack() {
            UIControl.ShowUI(View_Main);
            UIControl.RemoveUI(View_Draw);
        }
        AddAnim() {
            Tools_UI.AnimationUI_BtnScale(this.CloseDraw);
            Tools_UI.AnimationUI_Show(this.title, 5, 500);
            Tools_UI.AnimationUI_Show(this.drawBox, 5, 500, 50);
        }
    }
    View_Draw.NAME = "View_Draw";
    View_Draw.AUTO = true;
    View_Draw.DATA = null;

    class View_Privacy extends ui.View_Commercialize.View_PrivacyUI {
        onEnable() {
            if (View_Privacy.DATA.Type == "1") {
                this.menu_1.visible = true;
                this.menu_2.visible = false;
            }
            else {
                this.menu_1.visible = false;
                this.menu_2.visible = true;
            }
            this.yhxy.visible = false;
            this.yszc.visible = false;
            this.panelList1.vScrollBar.hide = true;
            this.panelList2.vScrollBar.hide = true;
        }
        onAwake() {
            this.btn_bakc_1.on(Laya.Event.CLICK, this, () => {
                this.yhxy.visible = false;
                this.yszc.visible = false;
            });
            this.btn_bakc_2.on(Laya.Event.CLICK, this, () => {
                this.yhxy.visible = false;
                this.yszc.visible = false;
            });
            this.btn_yes.on(Laya.Event.CLICK, this, () => {
                Laya.LocalStorage.setItem("IsPrivacy", "1");
                UIControl.HideUI(View_Privacy);
            });
            this.btn_no.on(Laya.Event.CLICK, this, () => {
                if (Laya.Browser.onQQMiniGame) {
                    window["qq"].exitMiniProgram(() => {
                        console.log("退出游戏");
                    });
                }
                else {
                    window["qg"].exitApplication(() => {
                        console.log("退出游戏");
                    });
                }
            });
            this.btn_ok.on(Laya.Event.CLICK, this, () => {
                UIControl.HideUI(View_Privacy);
            });
            this.btn_yhxy_1.on(Laya.Event.CLICK, this, this.ShowYHXY);
            this.btn_yhxy_2.on(Laya.Event.CLICK, this, this.ShowYHXY);
            this.btn_yszc_1.on(Laya.Event.CLICK, this, this.ShowYSZC);
            this.btn_yszc_2.on(Laya.Event.CLICK, this, this.ShowYSZC);
        }
        ShowYHXY() {
            this.yhxy.visible = true;
            if (this.text_label_1.text == "")
                this.text_label_1.text = `海南香蕉隐私政策
 
                  更新日期：2021年10月18日
                  生效日期：2021年10月18日
                   
                  概要
                  公司名：海南香蕉互动网络科技有限公司
                  公司地址：注册地址海南省老城高新技术产业示范区海南生态软件园A17幢一层4001
                  邮箱：303479861@qq.com
                  联系电话：18600342700
                  欢迎您选择由海南香蕉互动网络科技有限公司（以下简称“我们”或“海南香蕉”）提供的游戏！除《用户协议》外，我们还将通过《海南香蕉游戏隐私政策》向您进一步细化说明您在使用本游戏时我们收集、使用、存储和共享个人信息的情况，以及您所享有的相关权利等事宜，本政策是《用户协议》的组成部分。
                   
                  您可以通过阅读完整版《海南香蕉游戏隐私政策》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。
                   
                  本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律并排除其他一切冲突法的适用。如双方就本协议的内容或其执行发生任何争议（包括但不限于合同或者其他财产性权益纠纷），双方应友好协商解决；协商不成时，双方同意交由设广州市海南香蕉科技有限公司所在地人民法院管辖并处理。
                   
                  您可以通过阅读完整版《海南香蕉游戏隐私政策》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。请您务必仔细阅读并透彻理解本政策，特别是以黑色加粗、下划线方式提示您注意的条款，您应重点阅读并在确认充分理解及同意后再开始使用。如果您继续使用我们的服务，即表示您同意我们按照本政策收集、使用、储存和披露您的相关信息。
                   
                  一、我们如何收集和使用个人信息
                  二、我们如何使用COOKIES或同类技术
                  三、我们可能分享、转让或披露的个人信息
                  四、我们如何储存和保护个人信息
                  五、如何管理您的个人信息
                  六、第三方服务
                  七、年龄限制
                  八、通知和修订
                  九、如何联系我们
                   
                  一、我们如何收集和使用个人信息
                  
                  当我们提供多项需收集个人信息的业务功能时，我们不会违背您的自主意愿，强迫您接受海南香蕉游戏服务所提供的业务功能及相应的个人信息收集请求，亦不会通过自启动和关联启动方式收集或使用您的个人信息。在您使用海南香蕉游戏服务的过程中，海南香蕉游戏会按照如下方式收集您在使用服务时主动提供的或因为使用服务而产生的信息，用以向您提供、优化我们的服务以及保障您的账户安全：
                  1.1 当您注册或使用海南香蕉游戏服务时，我们会收集您的网络身份标识信息及IMEI、ICCID，用于标记您为海南香蕉游戏的用户。
                  如果您使用华为账号作为游戏账号关联登录海南香蕉游戏的，我们会收集您华为账号的唯一标识、头像、昵称，用于保存您的登录信息，以便您在不同设备登录。
                  如果您使用华为账号作为游戏账号关联登录海南香蕉游戏的，为了更好地向您提供游戏服务，改善游戏体验，我们会收集您华为账号涉及的唯一标识、昵称、头像以及您授权的其他信息，以及您在海南香蕉游戏中的相关操作信息、游戏信息等信息（具体包括但不限于您的登录状态、对局信息/状态、成就信息等）进行使用。我们可能会视游戏产品具体情况为您提供相关权限，以便您可以对是否展示前述相关信息进行相应设置。
                  1.2 为满足相关法律法规政策及相关主管部门的要求，海南香蕉游戏用户需进行实名认证以继续使用和享受海南香蕉游戏。我们会在获得您同意或您主动提供的情况下收集您的实名身份信息，您可以根据认证要求提供相应的身份信息（身份证、护照、户口本及其他身份证件信息）以完成实名认证以增强账号安全保护。该信息属于敏感信息，拒绝提供实名身份信息可能会导致您无法登陆海南香蕉游戏或在使用海南香蕉游戏过程中受到相应限制。
                  1.3 为保障您正常使用我们的服务，维护游戏基础功能的正常运行，优化游戏产品性能，提升您的游戏体验并保障您的账号安全，我们会收集您的设备ID、设备名称、设备类型和版本、系统版本、IP地址和端口号、Android ID、应用ID、网络类型信息用于提供上报服务。
                  1.4为保障您的游戏账号安全，营造公平、健康及安全的游戏环境，我们会收集您的应用列表（软件包名）、进程及游戏崩溃记录的信息，以用于打击破坏游戏公平环境或干扰、破坏游戏服务正常进行的行为（用于检测盗版、扫描外挂、防止作弊）。
                  1.5您可以选择开启手机的定位权限，用于提供您的位置信息，以便您接受海南香蕉基于位置提供的相关服务，我们会在您使用相关服务时弹窗提示您是否要开启相应权限。您有权在游戏中关闭位置信息，关闭位置信息后，游戏将不再搜集您的位置信息，但并不影响您对其他游戏功能（需要位置信息的游戏功能除外）的使用。
                  1.6 当您使用海南香蕉服务时，我们会收集您的游戏服务日志信息，包括登录日志、物品日志、游戏内行为信息、浏览、点击查看、搜索查询、交易、发言信息，以及IP地址、浏览器类型、运营商、使用语言、访问日期和时间，以便您能够在客户端查看您的游戏历史记录，同时用于游戏运营统计分析、客服投诉处理及其他游戏安全分析，并为提升您的游戏体验，我们可能把前述信息同步至该游戏后续版本或您正在使用的我们提供的其他产品中。请您注意，当网络发生变化时，我们需要您将变化信息通知给当前运行的程序，我们通过get_tasks来获取当前的任务信息，确保本程序的正常运行；我们通过read_logs来读取系统日志，便于在程序出现异常时通过读取系统日志定位和解决问题，确保本程序的正常运行。请您注意，单独的设备信息、服务日志信息是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将这类信息做匿名化、去标识化处理。
                       为向您提供更便捷的信息展示、搜索及推送服务，我们会根据服务日志，向您展示可能的商业广告（标注“广告”字样）。我们努力保障您的使用体验。如果您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订或关闭。
                  1.7 如您使用OPPO、VIVO、小米、华为等品牌手机，海南香蕉游戏接入的上述手机厂商SDK需要收集IMEI，并可能会收集您的手机型号、系统类型、系统版本、设备屏幕尺寸、短信参数用于实现海南香蕉产品和活动息的推送或验证，具体情况请参见SDK运营方的隐私政策或相关声明。
                  1.8 当您使用海南香蕉产品的消费功能时，我们会收集您的充值记录、消费记录信息，以便您查询您的交易记录，同时尽最大程度保护您的虚拟物品安全。充值记录、消费记录属于敏感信息，收集上述信息为实现海南香蕉产品的消费功能所必须，否则将无法完成交易。
                  1.9 为保障您的游戏账号安全，营造公平、健康及安全的游戏环境，我们会收集您的游戏识别信息、硬件及操作系统信息、进程及游戏崩溃记录信息，以用于打击破坏游戏公平环境或干扰、破坏游戏服务正常进行的行为（如用于检测盗版、扫描外挂、防止作弊等）。
                  1.10 当您在游戏中通过文字、图片、语音、视频及其他方式与其他玩家进行互动，我们可能会收集并保存您发送的上述信息内容用于过滤色情、暴力、政治、辱骂、恶意广告等不当内容，以此净化游戏环境，维护健康的上网环境。
                  1.11 在您开启摄像头和/或相册权限后，您能够上传、拍摄照片/图片/视频，实现同其他玩家视频或直播互动功能；
                  1.12在您开启麦克风权限后，您可以使用麦克风来进行语音输入，在使用过程中我们需要收集您的语音内容并进行必要的处理；如您不提供前述信息，我们将无法为您提供语音相关服务，但不影响您使用我们提供的其他服务。
                  1.13为了向您提供保存图片、分享图片，客服反馈中上传游戏截图、观看和收藏牌局回放等功能，我们将获取您的存储权限；如果您不提供前述信息，您可能无法使用上述服务，但不影响您使用我们提供的其他服务。
                  为了判断用户与设备的关联关系，并通过技术与风控规则提高登录与交易的安全性，我们需要获取您的电话权限以获取您设备的硬件信息；如果您不提供前述信息，您可能无法使用上述服务，但不影响您使用我们提供的其他服务。
                  为了向您提供排行榜中的地区排名功能、好友模块中附近的人功能，我们将获取您的位置权限；如果您不提供前述信息，您可能无法使用上述服务，但不影响您使用我们提供的其他服务。
                  1.14广告服务：为了向您展示合适的广告，我们将收集和处理您的以下信息，并仅在下述的目的范围内分享给第三方广告服务平台：
                  1）设备及使用信息：IMEI、ICCID、操作系统的设置信息、设备的硬件信息、应用的基本信息及使用信息、网络信息、运营商信息、渠道帐号信息。
                  2）广告互动信息：对广告的浏览、点击、关闭和播放信息。打开和关闭应用的时间、应用使用频率、应用错误日志。
                  3）位置信息，我们会收集、使用并处理您设备的模糊位置或准确位置，这些位置信息通过 GPS、WLAN 和服务提供商的网络 ID 获取。我们会询问您要为我们应用程序启用基于位置的服务。您可在设备的设置菜单中选择关闭设备上的相应权限，拒绝共享您的位置信息。
                  上述数据将会传输并保存至【中华人民共和国国境内】的服务器，保存期限为2年，超出这一保留时间后会删除，但法律法规另有要求除外。如因法律法规明确规定，或者得到您的明确授权，我们确需向境外机构传输境内收集的相关个人信息的，我们也会根据国内法律、行政法规和相关监管部门的规定，为您的个人信息提供保护。
                  1.15当您使用海南香蕉服务时，为了更好地向您提供游戏服务，改善游戏体验、保障您正常使用我们的服务，维护游戏基础功能的正常运行，优化游戏产品性能并保障您的账号安全，我们会收集和使用您的IMEI、ICCID和网络状态。
                  1.16您可通过我们为您提供的评论、问答、论坛及其他信息发布功能公开发表言论信息。
                  请注意，您公开发布的信息中可能会涉及您或他人的个人信息甚至个人敏感信息，如您在评价时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时公开分享相关个人信息。若您公开发布的信息中涉及儿童个人信息的，您需在发布前征得对应儿童监护人的同意。
                  1.17 若您提供的信息中含有其他用户的个人信息，在向本平台提供这些个人信息之前，您需确保您已经取得合法的授权。若其中涉及儿童个人信息的，您需在发布前取得对应儿童监护人的同意，前述情形下监护人有权联系我们，要求更正或删除涉及儿童个人信息的内容。
                  1.18 根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息无需征求您的授权同意：
                  1） 与国家安全、国防安全等国家利益直接相关的；与公共安全、公共卫生、公共知情等重大公共利益直接相关的；
                  2） 与犯罪侦查、起诉、审判和判决执行等直接相关的；
                  3） 出于维护您或其他个人的生命、财产、声誉等重大合法权益但又很难得到本人同意的；
                  4） 所收集的个人信息是您自行向社会公众公开的；
                  5） 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
                  6） 根据您要求签订和履行合同所必需的；
                  7） 用于维护所提供的产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障；
                  8） 为开展合法的新闻报道所必需的；
                  9） 出于公共利益开展统计或学术研究所必要，且其对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；
                  10） 法律法规规定的其他情形。
                  1.19请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。
                  1.20请您理解，为共同向您提供产品服务或改进产品服务的质量或出于对产品服务安全性考量的合理需要，我们可能按照相关法律法规及监管政策的要求或经过您的授权从关联公司、合作伙伴及其他受信任的第三方接收您的个人信息及其他信息，若我们从第三方处间接获取您的信息的，我们会在收集前明确以书面形式要求该第三方在已依法取得您同意后收集个人信息，并向您告知共享的信息内容，且涉及敏感信息的在提供给我们使用前需经过您的明确确认，要求第三方对个人信息来源的合法性和合规性作出承诺，如第三方有违反行为的，我们会明确要求对方承担相应法律责任。
                  1.21请您理解，在从第三方接收您的个人信息前，我们无权决定且无法知悉第三方获取您个人信息的范围，如第三方开展业务所进行的个人信息处理活动超出您向我们提供个人信息时的授权同意范围、或第三方违法违规收集您的个人信息（如渠道违反必要原则，收集您的通讯录信息），责任应由第三方承担，请您立即和我们取得联系，以便我们及时通知第三方采取相应措施以避免或降低相关损失。
                   
                  二、我们如何使用COOKIES或同类技术
                  我们或我们的第三方合作伙伴可能通过COOKIES或同类技术获取和使用您的信息，并将该等信息储存为日志信息。
                  通过使用COOKIES，我们向用户提供简单易行并富个性化的网络体验。一个COOKIES是少量的数据，它们从一个网络服务器送至您的浏览器并存在计算机硬盘上。我们使用COOKIES是为了让其用户可以受益。比如，为使得海南香蕉的登录过程更快捷，您可以选择把用户名存在一个COOKIES中。这样下次当您要登录海南香蕉的服务时能更加方便快捷。COOKIES能帮助我们确定您连接的页面和内容，您在海南香蕉特定服务上花费的时间和您所选择的海南香蕉服务。
                  COOKIES使得我们能更好、更快地为您服务，并且使您在海南香蕉服务上的经历更富个性化。然而，您应该能够控制COOKIES是否以及怎样被您的浏览器接受。请查阅您的浏览器附带的文件以获得更多这方面的信息。
                  我们和第三方合作伙伴可能通过COOKIES或同类技术收集和使用您的信息，并将该等信息储存。
                  我们使用自己的COOKIES或同类技术，可能用于以下用途：
                  （1）记住您的身份。如：COOKIES或同类技术有助于我们辨认您作为我们的注册用户的身份，或保存您向我们提供有关您的喜好或其他信息；
                  （2）分析您使用我们服务的情况。我们可利用COOKIES或同类技术来了解您使用海南香蕉服务进行什么活动、或哪些服务最受欢迎；
                  （3）广告优化。COOKIES或同类技术有助于我们根据您的信息，向您提供与您相关的广告而非进行普遍的广告投放。
                  我们为上述目的使用COOKIES或同类技术的同时，可能将通过COOKIES或同类技术收集的非个人身份信息汇总提供给广告商和其他伙伴，用于分析您和其他用户如何使用海南香蕉服务并用于广告服务。
                  海南香蕉服务上可能会有广告商和其他合作方放置的COOKIES或同类技术。这些COOKIES和或同类技术可能会收集与您相关的非个人身份信息，以用于分析用户如何使用该等服务、向您发送您可能感兴趣的广告，或用于评估广告服务的效果。这些第三方COOKIES或同类技术收集和使用该等信息不受本政策约束，而是受到其自身的信息保护声明约束，我们不对第三方的COOKIES或同类技术承担责任。
                  您可以通过浏览器或用户选择机制拒绝或管理COOKIES或同类技术。但请您注意，如果您停用COOKIES或同类技术，我们有可能无法为您提供最佳的服务体验，某些服务也可能无法正常使用。同时，您仍然将收到广告，只是这些广告与您的相关性会降低。
                   
                  三、我们可能分享、转让或披露的个人信息
                  （一）分享
                  除以下情形外，未经您同意，我们不会与海南香蕉之外的任何第三方分享您的个人信息：
                  1、向您提供我们的服务。我们可能向合作伙伴及其他第三方分享您的信息，以实现我们产品与/或服务的功能，让您正常使用您需要的服务：提供支付服务的支付机构、提供数据服务（包括网络广告监测、数据统计、数据分析）的合作伙伴、第三方物流公司和其他服务提供商，我们可能通过在游戏中内置合作伙伴提供的SDK的方式将您的个人信息进行分享；
                  （1）高德定位sdk：用于提供基于地理位置的服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、您的精良位置(GPS)或粗略位置、您的外部存储信息；
                  （2）优量汇广告sdk：用于展示优量汇平台提供广告信息；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的精良位置(GPS)或粗略位置；请求安装第三方应用权限；（请您注意，com.qq.e属于优量汇广告sdk引入的组件，是jcenter下载sdk的方式，用这种方式代替离线导入sdk， 不强制获取任何个人隐私信息）
                  （3）极光Push sdk：用于推送游戏内消息、通知；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、外部存储信息、系统设置信息、sd卡读写文件信息；
                  （4）今日头条数据统计sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的外部存储信息、手机厂商名、产品名、手机品牌、手机型号、设备宽、高、IMEI信息、手机硬件名、SDK版本、android版本；
                  （5）穿山甲广告sdk：用于展示穿山甲平台提供广告信息；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的外部存储信息、您的精良位置(GPS)或粗略位置、您手机当前或最近运行的任务信息；
                  （6）热云统计sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的精良位置(GPS)或粗略位置、手机厂商名、产品名、手机品牌、手机型号、设备宽、高、IMEI信息、手机硬件名、SDK版本、android版本；
                  （7）广点通数据统计sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、手机厂商名、产品名、手机品牌、手机型号、设备宽、高、IMEI信息、手机硬件名、SDK版本、android版本；
                  （8）华为广告sdk：用于展示华为平台所提供的广告信息；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的精良位置(GPS)或粗略位置；
                  （9）华为HMS ：用于用户体验华为平台提供的华为云服务的合集，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的外部存储信息、您的设备读取权限、安装其他应用权限、您手机当前的服务地信息；
                  （10）腾讯视频通信功能：用于游戏中录制语音，进行语音交流，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、麦克风信息；
                  （11）腾讯实时游戏音视频：用于游戏中录制语音，进行语音交流，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、麦克风信息；   
                  （12）QQ登录com.tencent.open：用于使用qq进行第三方账号登录，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、外部存储信息、系统设置信息、读取日志信息；
                  （13）第三方物流公司：您在海南香蕉科技服务使用过程中，可能获得合法实物奖励，出于向您按时发放奖品的需要，我们会向合法的物流服务提供商共享您所提供的电话、收件人姓名及地址信息；
                  （14）剪贴板：用于文字内容的复制粘贴，此功能由第三方提供，便于您录入、编辑文档内容，被读写的信息可能有您输入、编辑的文档信息；
                  （15）微信分享sdk：用于向您提供微信分享功能；所分享的信息可能有您的手机SD卡中的信息及外部存储卡中的信息；
                  （16）腾讯Bugly sdk：用于给游戏提供崩溃监控和上报服务；所分享的信息可能有您的网络状态、手机SD卡中的信息及外部存储卡中的信息、您手机的一些系统信息：IMEI、序列号、常用的系统版本号、手机型号、硬件识别码、序列号、是否在充电、是否在通话用于提供上报服务；
                  （17）移动终端补充设备标识体系统一调用sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的oaid信息。
                  （18）请您注意，com.keke.ddz并非sdk，来自游戏本身功能，用于获取设备id，维护游戏基础功能的正常运行。
                  2、与关联方的必要分享。为便于我们基于统一的账号体系向您提供一致化服务以及便于您进行统一管理、保障系统和账号安全等，您的个人信息可能会在我们和我们的关联方之间进行必要共享；
                  3、实现本政策第一条“我们如何收集和使用个人信息”部分所述目的；
                  4、履行我们在本政策或我们与您达成的其他协议中的义务和行使我们的权利；
                  5、向委托我们进行推广的合作伙伴等第三方共享，目的是为了使该等委托方了解推广的覆盖面和有效性。比如我们可以告知该委托方有多少人看了他们的推广信息或在看到这些信息后购买了委托方的商品，或者向他们提供不能识别个人身份的统计信息，帮助他们了解其受众或顾客；
                  6、在法律法规允许的范围内，为了遵守法律、维护我们及我们的关联方或合作伙伴、您或其他海南香蕉用户或社会公众利益、财产或安全免遭损害，比如为防止欺诈等违法活动和减少信用风险，我们可能与其他公司和组织交换信息。不过，这并不包括违反本政策中所作的承诺而为获利目的出售、出租、共享或以其它方式披露的信息；
                  7、应您合法需求或经您的授权同意；
                  8、应您的监护人合法要求而提供您的信息；
                  9、根据与您签署的单项服务协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；
                  10、基于学术研究而提供；
                  11、基于符合法律法规的社会公共利益而提供。
                  我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息。对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本政策以及其他任何相关的保密和安全措施来处理信息。
                  （二）转让
                  1、随着我们业务的持续发展，我们有可能进行合并、收购、资产转让或类似的交易，而您的信息有可能作为此类交易的一部分而被转移。我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则，我们将要求该公司、组织重新向您征求授权同意。
                  2、在获得您的明确同意后，我们会向其他方转让您的个人信息。
                  （三）披露
                  我们仅会在以下情况下，且采取符合业界标准的安全防护措施的前提下，才会披露您的个人信息：
                  1、根据您的需求，在您明确同意的披露方式下披露您所指定的信息；
                  2、根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您信息的情况下，我们可能会依据所要求的信息类型和披露方式披露您的信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求接收方必须出具与之相应的法律文件，如传票或调查函。我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。我们对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据。
                  （四）分享、转让、披露信息时事先征得授权同意的例外
                  以下情形中，分享、转让、披露您的信息无需事先征得您的授权同意：
                  1、与国家安全、国防安全有关的；
                  2、与公共安全、公共卫生、重大公共利益有关的；
                  3、与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；
                  4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
                  5、您自行向社会公众公开的信息；
                  6、从合法公开披露的信息中收集信息的，如合法的新闻报道、政府信息公开等渠道。
                  根据法律规定，共享、转让、披露经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。
                   
                  四、我们如何储存和保护个人信息
                  我们仅在本政策所述目的所必需期间和法律法规要求的最短时限内储存您的个人信息。如我们终止服务或运营，我们将及时停止继续收集您个人信息的活动，同时会遵守相关法律法规要求提前向您通知，并在终止服务或运营后对您的个人信息进行删除或匿名化处理，但法律法规或监管部门另有规定的除外。
                  我们在中华人民共和国境内运营中收集和产生的个人信息，储存在中国境内，以下情形除外：
                  1、法律法规有明确规定；
                  2、获得您的授权同意；
                  3、您使用的产品、服务涉及跨境，海南香蕉需要向境外提供您的个人信息的。
                  针对以上情形，我们会确保依据本政策及国家法律法规要求对您的个人信息提供足够的保护。
                  我们非常重视信息安全，成立了专门的安全团队，并采取一切合理可行的措施，保护您的个人信息：
                  （一）数据安全技术措施
                  我们会采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的个人信息遭到未经授权的访问使用、修改，避免数据的损坏或丢失。
                  我们的服务采取了多种加密技术，如在某些产品中，我们将利用加密技术（如MD5）来保护您的个人信息，采取加密技术对您的个人信息进行加密保存，并通过隔离技术进行隔离。
                  在个人信息使用时，如信息展示、信息关联计算，我们会采用多种数据脱敏技术增强信息在使用中的安全性。
                  我们还会采用严格的数据访问权限控制和多重身份认证技术保护个人信息，避免数据被违规使用。
                  （二）我们为保护个人信息采取的其他安全措施
                  我们通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范个人信息的存储和使用。
                  我们通过信息接触者保密协议、监控和审计机制来对数据进行全面安全控制。我们还会举办安全和隐私保护培训课程，加强员工的安全意识以及对于保护信息重要性的认识。
                  （三）我们仅允许有必要知晓这些信息的海南香蕉员工、合作伙伴访问您的个人信息，并为此设置了严格的访问权限控制和监控机制。我们同时要求可能接触到您的个人信息的所有人员履行相应的保密义务。如果未能履行这些义务，可能会被追究法律责任或被中止与海南香蕉的合作关系。
                  （四）我们会采取一切合理可行的措施，确保未收集无关的个人信息。
                  （五）互联网并非绝对安全的环境，而且电子邮件、即时通讯、社交软件或其他服务软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时请使用复杂密码，并注意保护您的信息安全。
                  （六）安全事件处置
                  在通过海南香蕉服务与第三方进行沟通或购买商品及服务时，您不可避免的要向交易对方或潜在的交易对方披露自己的信息，如联络方式或者邮政地址等。请您妥善保护自己的信息，仅在必要的情形下向他人提供。
                  为应对个人信息泄露、损毁和丢失等可能出现的风险，我们制定了多项制度，明确安全事件、安全漏洞的分类分级标准及相应的处理流程。我们也为安全事件建立了专门的应急响应团队，按照安全事件处置规范要求，针对不同安全事件启动安全预案，进行止损、分析、定位、制定补救措施、联合相关部门进行溯源和打击。
                  在不幸发生信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们同时将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报信息安全事件的处置情况。
                  请您理解，由于技术的限制以及风险防范的局限，即便我们已经尽量加强安全措施，也无法始终保证信息百分之百的安全。您需要了解，您接入海南香蕉服务所用的系统和通讯网络，有可能因我们可控范围外的情况而发生问题。
                  请您务必妥善保管好您的账号、密码及其他身份要素。您在使用海南香蕉服务时，我们会通过您的账号、密码及及其他身份要素来识别您的身份。一旦您泄露了前述信息，您可能会蒙受损失，并可能对您产生不利。如您发现账号、密码及/或其他身份要素可能或已经泄露时，请您立即和我们取得联系，以便我们及时采取相应措施以避免或降低相关损失。
                   
                  五、如何管理您的个人信息
                  （一）访问、更新和删除
                  我们鼓励您更新和修改您的个人信息以使其更准确有效。您能通过海南香蕉服务访问您的个人信息，并根据对应信息的管理方式自行完成或要求我们进行修改、补充和删除。如果您希望访问或编辑您的账户中的个人资料信息，您可以通过访问您的账户个人资料页执行此类操作。如您想删除您的个人信息时（包括邮箱、城市、地址、性别、生日、实名认证信息），您可以通过使用联系游戏内在线客服或致电客服电话进行更正。
                  在访问、更新、更正和删除前述信息时，我们可能会要求您进行身份验证，以保障信息安全。对于通过COOKIES或同类技术收集的您的信息，我们还在本政策第二条“我们如何使用COOKIES或同类技术”部分说明了向您提供的选择机制。如您想查询、修改或删除您的部分信息，请联系海南香蕉客服具体指引进行操作。
                  除法律法规另有规定，当您更正、删除您的个人信息或申请注销账号时，我们可能不会立即从备份系统中更正或删除相应的信息，但会在备份更新时更正或删除这些信息。
                  （二）公开与分享
                  我们的多项服务可让您不仅与您的社交网络、也与使用该服务的所有用户公开分享您的相关信息，如，您在海南香蕉服务中所上传或发布的信息、您对其他人上传或发布的信息作出的回应，通过电子邮件或在海南香蕉服务中不特定用户可见的公开区域内上传或公布您的信息，以及包括与这些信息有关的位置数据和日志信息。只要您不删除您所公开或共享的信息，有关信息可能一直留存在公众领域；即使您删除共享信息，有关信息仍可能由其他用户或不受我们控制的第三方独立地缓存、复制或储存，或由其他用户或该等第三方在公众领域保存。如您将信息通过上述渠道公开或共享，由此造成您的信息泄露，我们不承担责任。因此，我们提醒并请您慎重考虑是否通过上述渠道公开或共享您的信息。
                  （三）注销
                  如果您想注销您的账户，您可以通过客服--账号相关--注销账号功能执行此操作，客服在收到您的注销请求24小时内将进行审核操作，在注销账户之后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息（包括与您账号相关的、该单项服务项下的全部服务资料和数据），法律法规另有规定的除外。
                  （四）撤回您的授权
                  您可以进入游戏内客服-账号相关-撤回同意隐私协议，点击“确定撤回”按钮来撤回您的授权。
                  
                  您可以通过“我的→设置→通用设置→权限管理”中查看您的设备功能在App的授权列表（因设备不同，该页面在不同客户端所能展示的条目可能有所差别）。如您希望对设备权限做出变动，可前往手机设置中进行修改。
                  
                  当您撤回授权后，我们无法继续为您提供撤回授权所对应的服务，也不再处理您相应的信息。但您撤回授权的决定，不会影响此前基于您的授权而开展的信息处理。
                   
                  六、第三方服务
                  海南香蕉服务可能链接至第三方提供的社交媒体或其他服务（包括网站或其他服务形式）。包括：
                  （1）您可利用“分享”键将某些内容分享到第三方服务，或您可利用第三方服务登录海南香蕉服务。这些功能可能会收集您的信息（包括您的日志信息），并可能在您的电脑装置COOKIES，从而正常运行上述功能；
                  （2）我们通过广告或我们服务的其他方式向您提供链接，使您可以链接至第三方的服务或网站；
                  （3）其他接入第三方服务的情形。如，为实现本政策中声明的目的，我们可能会接入第三方SDK服务，并将我们依照本政策收集的您的某些个人信息共享给该等第三方，以便提供更好的客户服务和用户体验。
                  该等第三方社交媒体或其他服务由相关的第三方负责运营。您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何信息），须受第三方自己的服务条款及信息保护声明（而非本政策）约束，您需要仔细阅读其条款。本政策仅适用于我们所收集的个人信息，并不适用于任何第三方提供的服务或第三方的信息使用规则。如您发现这些第三方社交媒体或其他服务存在风险时，建议您终止相关操作以保护您的合法权益。
                   
                  七、年龄限制
                  我们建议：任何未成年人参加网上活动应事先取得父母或其他监护人（以下简称"监护人"）的同意。我们将根据国家相关法律法规的规定保护未成年人的相关信息。
                   
                  我们鼓励监护人指导未成年人使用海南香蕉服务。如果您是未满十四周岁的未成年人，您需要通知您的监护人共同阅读并接受我们的《海南香蕉儿童隐私保护指引》 ，并在您使用海南香蕉服务、提交个人信息之前，寻求其同意和指导。
                   
                  我们只会在获得（推定获得）法定监护人同意的前提下，收集、使用未成年人的个人信息，且根据相关法律法规和监管政策的规定，使用和处理获得的未成年人个人信息。如发现在未事先获得法定监护人同意的情况下，我们可能收集了未成年人的个人信息，我们会对该等数据和个人信息尽快进行删除等操作处理。
                   
                  若您是未成年人的监护人，当您对您所监护的未成年人的个人信息有相关疑问时，请及时与我们的客服联系。
                   
                  八、通知和修订
                  为了给您提供更好的服务，我们可能会根据产品或服务的更新情况及法律法规的相关要求适时修改本政策的条款，该等修改构成本政策的一部分。如该等更新造成您在本政策下权利的实质减少或重大变更，我们将在本政策生效前通过网站公告、推送通知、弹窗提示或其他方式来通知您，您如果不同意该等变更，可以选择停止使用海南香蕉服务；只有在您点击弹窗中的同意按钮后，我们才会按照变更后的隐私权政策收集、使用、共享、保存您的个人信息。 
                   
                  我们的任何修改都会将您的满意度置于首位。我们鼓励您在每次使用海南香蕉服务时都查阅我们的隐私政策。
                   
                  使用海南香蕉游戏服务可能需要下载并安装相关软件，您可以直接从海南香蕉的相关网站上获取该软件，也可以从得到海南香蕉授权的第三方获取。如果您从未经海南香蕉授权的第三方获取该软件或与该软件名称相同的软件，将视为您未获得海南香蕉授权，海南香蕉无法保证该软件能够正常使用、无法保证您及时获得有关海南香蕉政策的修订通知，并对因此给您造成的损失不予负责。
                   
                  我们可能在必需时（如当我们由于系统维护而暂停某一项服务时）发出与服务有关的公告。您可能无法取消这些与服务有关、性质不属于推广的公告。
                   
                  九、如何联系我们
                  我们设有个人信息保护专职部门并指定了专门的儿童个人信息保护负责人，将严格按照本政策保护儿童个人信息。如监护人和儿童有关于网络信息安全的投诉和举报，或对本政策、海南香蕉游戏的儿童个人信息保护规则、措施的相关事宜有任何问题、意见或建议，请随时与我们联系，可致电18600342700或写信至以下地址广州市天河区棠下穗南新村五巷6号之一601房广州市海南香蕉科技有限公司 儿童个人信息保护专员（收）；邮编：510630。
                   
                  一般情况下，我们将在收到您的问题、意见或建议，并验证您的用户身份后的十五天内予以回复。
                   
                 海南香蕉互动网络科技有限公司
                   
                   
                  海南香蕉儿童隐私保护指引
                   
                  生效日期：2021年5月11日
                   
                  欢迎您选择由海南香蕉互动网络科技有限公司（以下简称“我们”或“海南香蕉”）提供的游戏！除《海南香蕉隐私政策》、《海南香蕉用户协议》外，我们还将通过《海南香蕉儿童隐私保护指引》（“本政策”） 帮助您和孩子（本政策中的“孩子”，是指不满十四周岁的未成年人）进一步了解我们收集、使用、存储和共享您孩子个人信息的情况，以及您和您的孩子所享有的相关权利。
                   
                  本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律并排除其他一切冲突法的适用。如双方就本协议的内容或其执行发生任何争议（包括但不限于合同或者其他财产性权益纠纷），双方应友好协商解决；协商不成时，双方同意交由广州市海南香蕉科技有限公司所在地人民法院管辖并处理。
                   
                  儿童特别说明：本政策内的儿童指不满十四周岁的未成年人用户。如果您是儿童，请通知并确保您的监护人务必认真阅读并充分理解本儿童隐私政策，并在您使用海南香蕉服务、提交个人信息之前，寻求、获得您的监护人的同意和指导。您点击同意本儿童隐私政策，或者您使用/继续使用海南香蕉服务、提交个人信息，我们将善意的理解前述行为表示您已获得您的监护人的许可，您的监护人同意按照本儿童隐私政策（包括更新版本）同意/授权我们收集、存储、使用、转移和披露儿童的个人信息。
                   
                  监护人特别说明：如您的孩子不满十四周岁将适用本儿童隐私政策，请您作为儿童的法定监护人应认真阅读并理解我们的儿童隐私保护政策。我们将根据本儿童隐私政策采取特殊措施保护您孩子的个人信息。请您帮助我们，履行保护儿童个人信息和隐私安全的责任，要求他们在您的监护下共同阅读并接受本隐私政策，且应在您的同意和指导下使用海南香蕉服务、提交个人信息。如果您不同意本隐私政策的内容，将可能导致海南香蕉的产品和服务无法正常运行，或者无法达到海南香蕉拟达到的服务效果，且您应要求您的孩子立即停止访问/使用海南香蕉服务。您点击同意本隐私政策，或者您的孩子使用/继续使用海南香蕉服务、提交个人信息，我们都理解并确信该等行为表示您同意海南香蕉按照本隐私政策（包括更新版本）收集、存储、使用、转移和披露您孩子的个人信息。
                  【重要提示】：
                  本政策适用于不满十四周岁的未成年人的个人信息处理。有关您和已满十四周岁的用户的个人信息处理，请查看《海南香蕉隐私政策》了解相关信息。
                  我们会通过页面提示、交互流程、网站公告等方式向您说明儿童个人信息收集等情况，并征得您的同意。请您仔细阅读、充分理解《海南香蕉隐私政策》和本政策后，选择是否同意前述隐私政策，特别是以黑色加粗标识的条款。
                  1.我们收集的儿童个人信息
                  在您的孩子使用海南香蕉服务的过程中，海南香蕉仅会收集您同意我们收集的或您及您的孩子主动提供的有关您孩子的个人信息，以向您的孩子提供、优化我们的服务以及保障您孩子的账户安全。同时海南香蕉将为您提供拒绝选项，如您未同意我们海南香蕉收集信息的请求，视为您同意海南香蕉将无法继续为您以及您的孩子提供相应的服务。我们可能会收集的您孩子的个人信息的详情，请参见《海南香蕉隐私政策》。
                  同时，为验证您与您孩子的监护关系，我们可能还会收集您的联系方式（包括手机号码、电子邮箱）以及其他有助于我们判断监护关系的信息。
                  目前，除了向第三方调研机构收集游戏调研信息，以帮助我们改进游戏产品以及提供更优质的服务之外，我们不会主动从海南香蕉外的第三方获取您孩子的个人信息。如未来为业务发展需要从海南香蕉外的第三方间接获取您孩子的个人信息，我们会在获取前向您明示个人信息的来源、类型及使用范围，如海南香蕉开展业务需进行的个人信息处理活动超出您原本向海南香蕉外的第三方提供个人信息时的授权同意范围，我们将在处理您孩子的该等个人信息前，征得您的明示同意；此外，我们也将会严格遵守相关法律法规的规定，并要求该第三方保障其提供的信息的合法性。
                  2.我们如何使用儿童个人信息
                  我们严格遵守法律法规的规定以及与用户的约定，按照本政策及《海南香蕉用户协议》、《海南香蕉隐私政策》所述使用收集的信息，以向您的孩子提供更为优质的服务。
                  有关我们使用儿童个人信息的方式详情请参见《海南香蕉隐私政策》，若我们使用您孩子的个人信息，超出了与收集时所声称的目的及具有直接或合理关联的范围，我们将在使用您孩子的个人信息前，再次向您告知并征得您的同意。
                  3.儿童个人信息的存储
                  3.1 我们按照法律法规规定，将在中华人民共和国境内收集到的您孩子的个人信息存储于中华人民共和国境内，并依法对这些信息进行严格保密。如涉及跨境业务，我们需要向境外机构传输境内收集的相关个人信息的，我们也会根据国内法律、行政法规和相关监管部门的规定，为您孩子的个人信息提供保护。
                  3.2 一般情况下，我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下存储您孩子的个人信息。超出法律法规或监管规定的期限后，我们会按照法律法规的要求对您孩子的个人信息进行删除或者匿名化处理。
                  4.儿童个人信息的安全
                  4.1 为了保障您孩子的信息安全，我们会在现有技术水平下采取合理必要的措施来保护孩子的信息，采取物理防护、安全技术、管理制度等措施来降低丢失、误用、非授权访问、披露和更改的风险，包括但不限于数据加密传输、防火墙和加密存储、物理访问控制以及信息访问授权控制。为此我们设置了安全程序保护您孩子的信息不会被未经授权的访问所窃取，所有的个人信息被加密储存并放置于经防火墙严格保护的内部系统。
                  4.2 为了保障您孩子的信息安全，我们建立了专门的管理制度、流程和组织以保障信息的安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务，并进行审计。
                  4.3 若发生儿童个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并及时以公告、推送通知或邮件等形式告知您和孩子安全事件的基本情况、我们即将或已经采取的处置措施和补救措施，以及我们对您的应对建议。如果难以实现逐一告知，我们将通过公告等方式发布警示。
                  5.儿童个人信息的更正
                  如您和孩子发现儿童个人信息有错误的，可以联系我们处理。
                  6.儿童个人信息的删除
                  6.1 如您和孩子发现我们违反法律、行政法规的规定或者双方的约定处理儿童个人信息的，或是超出目的范围或者必要期限处理儿童个人信息的，可以通过联系我们对相关个人信息进行删除。
                  6.2 如您撤回同意的，可以联系我们，我们将按照国家有关法律规定进行处理。
                  6.3 如您和孩子主动注销海南香蕉账号并终止使用海南香蕉，我们将会停止使用儿童的个人信息，但法律法规或监管部门另有规定的除外。如我们的产品或者服务停止运营，我们将根据相关法律法规规定进行通知，同时也将及时停止使用儿童个人信息，并将对保存的儿童个人信息进行删除或匿名化处理。
                  7.儿童个人信息的转移和委托处理
                  我们不会向第三方转移和委托第三方处理儿童个人信息，除以下情况外，未经监护人的另外授权同意，我们不会向第三方转移、委托第三方处理或者与第三方分享儿童个人信息：
                  7.1为实现本政策第2条“我们如何使用儿童个人信息”中所述目的，或者为履行本政策或我们与儿童、监护人达成的其他协议中约定的我们的义务以及行使我们的权利；
                  7.2在遵循法律法规要求的前提下，为了符合法律规定、维护儿童、监护人、海南香蕉、海南香蕉的关联方、海南香蕉的合作伙伴或其他海南香蕉用户的合法权益或社会公众利益的需要（比如为防止违法活动），我们可能与其他组织交换信息。
                  对于上述确需第三方转移或委托第三方处理的，我们都会根据法律、行政法规的规定进行合规措施，包括但不限于对第三方进行安全评估。
                  8.儿童个人信息的披露
                  除非法律、行政法规规定应当披露或者根据与您的约定可以披露您孩子的个人信息的，我们不会披露孩子的个人信息。
                  9.变更
                  我们可能会适时对本政策进行修订。当本政策的条款发生变更时，我们会在版本更新时以适当的方式向您提示变更后的指引。请您仔细阅读变更后的隐私保护指引或指引内容，您的孩子继续使用海南香蕉表示您同意我们按照更新后的隐私保护指引收集、处理或使用您孩子的个人信息。
                  10.其他
                  10.1 《海南香蕉游戏隐私政策》是海南香蕉游戏统一适用的一般性隐私条款，其中所规定的内容包括但不限于用户权利及信息安全保障措施等均适用于海南香蕉游戏用户。本政策是专门针对儿童的隐私保护指引，包含对于儿童个人信息的特殊保护，属于《海南香蕉游戏隐私政策》的补充内容。如《海南香蕉游戏隐私政策》与本政策存在不一致或矛盾之处，请以本政策为准。
                  10.2 为方便您的查阅，可以在新用户注册界面、登录App后“更多-设置-政策规则-隐私政策”中查看完整版隐私政策内容。
                  11.联系我们
                  我们设有个人信息保护专职部门并指定了专门的儿童个人信息保护负责人，将严格按照本政策保护儿童个人信息。如监护人和儿童有关于网络信息安全的投诉和举报，或对本政策、海南香蕉游戏的儿童个人信息保护规则、措施的相关事宜有任何问题、意见或建议，请随时与我们联系，可致电18600342700或写信至以下地址广州市天河区棠下穗南新村五巷6号之一601房广州市海南香蕉科技有限公司 儿童个人信息保护专员（收）；邮编：510630。
                   
                  一般情况下，我们将在收到问题、意见或建议，并验证监护人和/或儿童身份后的十五天内予以回复。
                   
                 海南香蕉互动网络科技有限公司
        `;
        }
        ShowYSZC() {
            this.yszc.visible = true;
            if (this.text_label_2.text == "")
                this.text_label_2.text = `
                  海南香蕉隐私政策
 
                  更新日期：2021年10月18日
                  生效日期：2021年10月18日
                   
                  概要
                  公司名：海南香蕉互动网络科技有限公司
                  公司地址：注册地址海南省老城高新技术产业示范区海南生态软件园A17幢一层4001
                  邮箱：303479861@qq.com
                  联系电话：18600342700
                  欢迎您选择由海南香蕉互动网络科技有限公司（以下简称“我们”或“海南香蕉”）提供的游戏！除《用户协议》外，我们还将通过《海南香蕉游戏隐私政策》向您进一步细化说明您在使用本游戏时我们收集、使用、存储和共享个人信息的情况，以及您所享有的相关权利等事宜，本政策是《用户协议》的组成部分。
                   
                  您可以通过阅读完整版《海南香蕉游戏隐私政策》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。
                   
                  本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律并排除其他一切冲突法的适用。如双方就本协议的内容或其执行发生任何争议（包括但不限于合同或者其他财产性权益纠纷），双方应友好协商解决；协商不成时，双方同意交由设海南香蕉互动网络科技有限公司所在地人民法院管辖并处理。
                   
                  您可以通过阅读完整版《海南香蕉游戏隐私政策》，了解个人信息类型与用途的对应关系等更加详尽的个人信息处理规则。请您务必仔细阅读并透彻理解本政策，特别是以黑色加粗、下划线方式提示您注意的条款，您应重点阅读并在确认充分理解及同意后再开始使用。如果您继续使用我们的服务，即表示您同意我们按照本政策收集、使用、储存和披露您的相关信息。
                   
                  一、我们如何收集和使用个人信息
                  二、我们如何使用COOKIES或同类技术
                  三、我们可能分享、转让或披露的个人信息
                  四、我们如何储存和保护个人信息
                  五、如何管理您的个人信息
                  六、第三方服务
                  七、年龄限制
                  八、通知和修订
                  九、如何联系我们
                   
                  一、我们如何收集和使用个人信息
                  
                  当我们提供多项需收集个人信息的业务功能时，我们不会违背您的自主意愿，强迫您接受海南香蕉游戏服务所提供的业务功能及相应的个人信息收集请求，亦不会通过自启动和关联启动方式收集或使用您的个人信息。在您使用海南香蕉游戏服务的过程中，海南香蕉游戏会按照如下方式收集您在使用服务时主动提供的或因为使用服务而产生的信息，用以向您提供、优化我们的服务以及保障您的账户安全：
                  1.1 当您注册或使用海南香蕉游戏服务时，我们会收集您的网络身份标识信息及IMEI、ICCID，用于标记您为海南香蕉游戏的用户。
                  如果您使用华为账号作为游戏账号关联登录海南香蕉游戏的，我们会收集您华为账号的唯一标识、头像、昵称，用于保存您的登录信息，以便您在不同设备登录。
                  如果您使用华为账号作为游戏账号关联登录海南香蕉游戏的，为了更好地向您提供游戏服务，改善游戏体验，我们会收集您华为账号涉及的唯一标识、昵称、头像以及您授权的其他信息，以及您在海南香蕉游戏中的相关操作信息、游戏信息等信息（具体包括但不限于您的登录状态、对局信息/状态、成就信息等）进行使用。我们可能会视游戏产品具体情况为您提供相关权限，以便您可以对是否展示前述相关信息进行相应设置。
                  1.2 为满足相关法律法规政策及相关主管部门的要求，海南香蕉游戏用户需进行实名认证以继续使用和享受海南香蕉游戏。我们会在获得您同意或您主动提供的情况下收集您的实名身份信息，您可以根据认证要求提供相应的身份信息（身份证、护照、户口本及其他身份证件信息）以完成实名认证以增强账号安全保护。该信息属于敏感信息，拒绝提供实名身份信息可能会导致您无法登陆海南香蕉游戏或在使用海南香蕉游戏过程中受到相应限制。
                  1.3 为保障您正常使用我们的服务，维护游戏基础功能的正常运行，优化游戏产品性能，提升您的游戏体验并保障您的账号安全，我们会收集您的设备ID、设备名称、设备类型和版本、系统版本、IP地址和端口号、Android ID、应用ID、网络类型信息用于提供上报服务。
                  1.4为保障您的游戏账号安全，营造公平、健康及安全的游戏环境，我们会收集您的应用列表（软件包名）、进程及游戏崩溃记录的信息，以用于打击破坏游戏公平环境或干扰、破坏游戏服务正常进行的行为（用于检测盗版、扫描外挂、防止作弊）。
                  1.5您可以选择开启手机的定位权限，用于提供您的位置信息，以便您接受海南香蕉基于位置提供的相关服务，我们会在您使用相关服务时弹窗提示您是否要开启相应权限。您有权在游戏中关闭位置信息，关闭位置信息后，游戏将不再搜集您的位置信息，但并不影响您对其他游戏功能（需要位置信息的游戏功能除外）的使用。
                  1.6 当您使用海南香蕉服务时，我们会收集您的游戏服务日志信息，包括登录日志、物品日志、游戏内行为信息、浏览、点击查看、搜索查询、交易、发言信息，以及IP地址、浏览器类型、运营商、使用语言、访问日期和时间，以便您能够在客户端查看您的游戏历史记录，同时用于游戏运营统计分析、客服投诉处理及其他游戏安全分析，并为提升您的游戏体验，我们可能把前述信息同步至该游戏后续版本或您正在使用的我们提供的其他产品中。请您注意，当网络发生变化时，我们需要您将变化信息通知给当前运行的程序，我们通过get_tasks来获取当前的任务信息，确保本程序的正常运行；我们通过read_logs来读取系统日志，便于在程序出现异常时通过读取系统日志定位和解决问题，确保本程序的正常运行。请您注意，单独的设备信息、服务日志信息是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将这类信息做匿名化、去标识化处理。
                       为向您提供更便捷的信息展示、搜索及推送服务，我们会根据服务日志，向您展示可能的商业广告（标注“广告”字样）。我们努力保障您的使用体验。如果您不想接受我们给您发送的商业广告，您可通过短信提示回复退订或我们提供的其他方式进行退订或关闭。
                  1.7 如您使用OPPO、VIVO、小米、华为等品牌手机，海南香蕉游戏接入的上述手机厂商SDK需要收集IMEI，并可能会收集您的手机型号、系统类型、系统版本、设备屏幕尺寸、短信参数用于实现海南香蕉产品和活动息的推送或验证，具体情况请参见SDK运营方的隐私政策或相关声明。
                  1.8 当您使用海南香蕉产品的消费功能时，我们会收集您的充值记录、消费记录信息，以便您查询您的交易记录，同时尽最大程度保护您的虚拟物品安全。充值记录、消费记录属于敏感信息，收集上述信息为实现海南香蕉产品的消费功能所必须，否则将无法完成交易。
                  1.9 为保障您的游戏账号安全，营造公平、健康及安全的游戏环境，我们会收集您的游戏识别信息、硬件及操作系统信息、进程及游戏崩溃记录信息，以用于打击破坏游戏公平环境或干扰、破坏游戏服务正常进行的行为（如用于检测盗版、扫描外挂、防止作弊等）。
                  1.10 当您在游戏中通过文字、图片、语音、视频及其他方式与其他玩家进行互动，我们可能会收集并保存您发送的上述信息内容用于过滤色情、暴力、政治、辱骂、恶意广告等不当内容，以此净化游戏环境，维护健康的上网环境。
                  1.11 在您开启摄像头和/或相册权限后，您能够上传、拍摄照片/图片/视频，实现同其他玩家视频或直播互动功能；
                  1.12在您开启麦克风权限后，您可以使用麦克风来进行语音输入，在使用过程中我们需要收集您的语音内容并进行必要的处理；如您不提供前述信息，我们将无法为您提供语音相关服务，但不影响您使用我们提供的其他服务。
                  1.13为了向您提供保存图片、分享图片，客服反馈中上传游戏截图、观看和收藏牌局回放等功能，我们将获取您的存储权限；如果您不提供前述信息，您可能无法使用上述服务，但不影响您使用我们提供的其他服务。
                  为了判断用户与设备的关联关系，并通过技术与风控规则提高登录与交易的安全性，我们需要获取您的电话权限以获取您设备的硬件信息；如果您不提供前述信息，您可能无法使用上述服务，但不影响您使用我们提供的其他服务。
                  为了向您提供排行榜中的地区排名功能、好友模块中附近的人功能，我们将获取您的位置权限；如果您不提供前述信息，您可能无法使用上述服务，但不影响您使用我们提供的其他服务。
                  1.14广告服务：为了向您展示合适的广告，我们将收集和处理您的以下信息，并仅在下述的目的范围内分享给第三方广告服务平台：
                  1）设备及使用信息：IMEI、ICCID、操作系统的设置信息、设备的硬件信息、应用的基本信息及使用信息、网络信息、运营商信息、渠道帐号信息。
                  2）广告互动信息：对广告的浏览、点击、关闭和播放信息。打开和关闭应用的时间、应用使用频率、应用错误日志。
                  3）位置信息，我们会收集、使用并处理您设备的模糊位置或准确位置，这些位置信息通过 GPS、WLAN 和服务提供商的网络 ID 获取。我们会询问您要为我们应用程序启用基于位置的服务。您可在设备的设置菜单中选择关闭设备上的相应权限，拒绝共享您的位置信息。
                  上述数据将会传输并保存至【中华人民共和国国境内】的服务器，保存期限为2年，超出这一保留时间后会删除，但法律法规另有要求除外。如因法律法规明确规定，或者得到您的明确授权，我们确需向境外机构传输境内收集的相关个人信息的，我们也会根据国内法律、行政法规和相关监管部门的规定，为您的个人信息提供保护。
                  1.15当您使用海南香蕉服务时，为了更好地向您提供游戏服务，改善游戏体验、保障您正常使用我们的服务，维护游戏基础功能的正常运行，优化游戏产品性能并保障您的账号安全，我们会收集和使用您的IMEI、ICCID和网络状态。
                  1.16您可通过我们为您提供的评论、问答、论坛及其他信息发布功能公开发表言论信息。
                  请注意，您公开发布的信息中可能会涉及您或他人的个人信息甚至个人敏感信息，如您在评价时选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时公开分享相关个人信息。若您公开发布的信息中涉及儿童个人信息的，您需在发布前征得对应儿童监护人的同意。
                  1.17 若您提供的信息中含有其他用户的个人信息，在向本平台提供这些个人信息之前，您需确保您已经取得合法的授权。若其中涉及儿童个人信息的，您需在发布前取得对应儿童监护人的同意，前述情形下监护人有权联系我们，要求更正或删除涉及儿童个人信息的内容。
                  1.18 根据相关法律法规及国家标准，以下情形中，我们可能会收集、使用您的相关个人信息无需征求您的授权同意：
                  1） 与国家安全、国防安全等国家利益直接相关的；与公共安全、公共卫生、公共知情等重大公共利益直接相关的；
                  2） 与犯罪侦查、起诉、审判和判决执行等直接相关的；
                  3） 出于维护您或其他个人的生命、财产、声誉等重大合法权益但又很难得到本人同意的；
                  4） 所收集的个人信息是您自行向社会公众公开的；
                  5） 从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；
                  6） 根据您要求签订和履行合同所必需的；
                  7） 用于维护所提供的产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障；
                  8） 为开展合法的新闻报道所必需的；
                  9） 出于公共利益开展统计或学术研究所必要，且其对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；
                  10） 法律法规规定的其他情形。
                  1.19请您理解，我们向您提供的功能和服务是不断更新和发展的，如果某一功能或服务未在前述说明中且收集了您的信息，我们会通过页面提示、交互流程、网站公告等方式另行向您说明信息收集的内容、范围和目的，以征得您的同意。
                  1.20请您理解，为共同向您提供产品服务或改进产品服务的质量或出于对产品服务安全性考量的合理需要，我们可能按照相关法律法规及监管政策的要求或经过您的授权从关联公司、合作伙伴及其他受信任的第三方接收您的个人信息及其他信息，若我们从第三方处间接获取您的信息的，我们会在收集前明确以书面形式要求该第三方在已依法取得您同意后收集个人信息，并向您告知共享的信息内容，且涉及敏感信息的在提供给我们使用前需经过您的明确确认，要求第三方对个人信息来源的合法性和合规性作出承诺，如第三方有违反行为的，我们会明确要求对方承担相应法律责任。
                  1.21请您理解，在从第三方接收您的个人信息前，我们无权决定且无法知悉第三方获取您个人信息的范围，如第三方开展业务所进行的个人信息处理活动超出您向我们提供个人信息时的授权同意范围、或第三方违法违规收集您的个人信息（如渠道违反必要原则，收集您的通讯录信息），责任应由第三方承担，请您立即和我们取得联系，以便我们及时通知第三方采取相应措施以避免或降低相关损失。
                   
                  二、我们如何使用COOKIES或同类技术
                  我们或我们的第三方合作伙伴可能通过COOKIES或同类技术获取和使用您的信息，并将该等信息储存为日志信息。
                  通过使用COOKIES，我们向用户提供简单易行并富个性化的网络体验。一个COOKIES是少量的数据，它们从一个网络服务器送至您的浏览器并存在计算机硬盘上。我们使用COOKIES是为了让其用户可以受益。比如，为使得海南香蕉的登录过程更快捷，您可以选择把用户名存在一个COOKIES中。这样下次当您要登录海南香蕉的服务时能更加方便快捷。COOKIES能帮助我们确定您连接的页面和内容，您在海南香蕉特定服务上花费的时间和您所选择的海南香蕉服务。
                  COOKIES使得我们能更好、更快地为您服务，并且使您在海南香蕉服务上的经历更富个性化。然而，您应该能够控制COOKIES是否以及怎样被您的浏览器接受。请查阅您的浏览器附带的文件以获得更多这方面的信息。
                  我们和第三方合作伙伴可能通过COOKIES或同类技术收集和使用您的信息，并将该等信息储存。
                  我们使用自己的COOKIES或同类技术，可能用于以下用途：
                  （1）记住您的身份。如：COOKIES或同类技术有助于我们辨认您作为我们的注册用户的身份，或保存您向我们提供有关您的喜好或其他信息；
                  （2）分析您使用我们服务的情况。我们可利用COOKIES或同类技术来了解您使用海南香蕉服务进行什么活动、或哪些服务最受欢迎；
                  （3）广告优化。COOKIES或同类技术有助于我们根据您的信息，向您提供与您相关的广告而非进行普遍的广告投放。
                  我们为上述目的使用COOKIES或同类技术的同时，可能将通过COOKIES或同类技术收集的非个人身份信息汇总提供给广告商和其他伙伴，用于分析您和其他用户如何使用海南香蕉服务并用于广告服务。
                  海南香蕉服务上可能会有广告商和其他合作方放置的COOKIES或同类技术。这些COOKIES和或同类技术可能会收集与您相关的非个人身份信息，以用于分析用户如何使用该等服务、向您发送您可能感兴趣的广告，或用于评估广告服务的效果。这些第三方COOKIES或同类技术收集和使用该等信息不受本政策约束，而是受到其自身的信息保护声明约束，我们不对第三方的COOKIES或同类技术承担责任。
                  您可以通过浏览器或用户选择机制拒绝或管理COOKIES或同类技术。但请您注意，如果您停用COOKIES或同类技术，我们有可能无法为您提供最佳的服务体验，某些服务也可能无法正常使用。同时，您仍然将收到广告，只是这些广告与您的相关性会降低。
                   
                  三、我们可能分享、转让或披露的个人信息
                  （一）分享
                  除以下情形外，未经您同意，我们不会与海南香蕉之外的任何第三方分享您的个人信息：
                  1、向您提供我们的服务。我们可能向合作伙伴及其他第三方分享您的信息，以实现我们产品与/或服务的功能，让您正常使用您需要的服务：提供支付服务的支付机构、提供数据服务（包括网络广告监测、数据统计、数据分析）的合作伙伴、第三方物流公司和其他服务提供商，我们可能通过在游戏中内置合作伙伴提供的SDK的方式将您的个人信息进行分享；
                  （1）高德定位sdk：用于提供基于地理位置的服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、您的精良位置(GPS)或粗略位置、您的外部存储信息；
                  （2）优量汇广告sdk：用于展示优量汇平台提供广告信息；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的精良位置(GPS)或粗略位置；请求安装第三方应用权限；（请您注意，com.qq.e属于优量汇广告sdk引入的组件，是jcenter下载sdk的方式，用这种方式代替离线导入sdk， 不强制获取任何个人隐私信息）
                  （3）极光Push sdk：用于推送游戏内消息、通知；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、外部存储信息、系统设置信息、sd卡读写文件信息；
                  （4）今日头条数据统计sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的外部存储信息、手机厂商名、产品名、手机品牌、手机型号、设备宽、高、IMEI信息、手机硬件名、SDK版本、android版本；
                  （5）穿山甲广告sdk：用于展示穿山甲平台提供广告信息；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的外部存储信息、您的精良位置(GPS)或粗略位置、您手机当前或最近运行的任务信息；
                  （6）热云统计sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的精良位置(GPS)或粗略位置、手机厂商名、产品名、手机品牌、手机型号、设备宽、高、IMEI信息、手机硬件名、SDK版本、android版本；
                  （7）广点通数据统计sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、手机厂商名、产品名、手机品牌、手机型号、设备宽、高、IMEI信息、手机硬件名、SDK版本、android版本；
                  （8）华为广告sdk：用于展示华为平台所提供的广告信息；所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的精良位置(GPS)或粗略位置；
                  （9）华为HMS ：用于用户体验华为平台提供的华为云服务的合集，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、您的外部存储信息、您的设备读取权限、安装其他应用权限、您手机当前的服务地信息；
                  （10）腾讯视频通信功能：用于游戏中录制语音，进行语音交流，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、麦克风信息；
                  （11）腾讯实时游戏音视频：用于游戏中录制语音，进行语音交流，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、麦克风信息；   
                  （12）QQ登录com.tencent.open：用于使用qq进行第三方账号登录，所分享的信息可能有您的网络信息状态、当前WiFi接入的状态以及WLAN热点的信息、通话状态、外部存储信息、系统设置信息、读取日志信息；
                  （13）第三方物流公司：您在海南香蕉科技服务使用过程中，可能获得合法实物奖励，出于向您按时发放奖品的需要，我们会向合法的物流服务提供商共享您所提供的电话、收件人姓名及地址信息；
                  （14）剪贴板：用于文字内容的复制粘贴，此功能由第三方提供，便于您录入、编辑文档内容，被读写的信息可能有您输入、编辑的文档信息；
                  （15）微信分享sdk：用于向您提供微信分享功能；所分享的信息可能有您的手机SD卡中的信息及外部存储卡中的信息；
                  （16）腾讯Bugly sdk：用于给游戏提供崩溃监控和上报服务；所分享的信息可能有您的网络状态、手机SD卡中的信息及外部存储卡中的信息、您手机的一些系统信息：IMEI、序列号、常用的系统版本号、手机型号、硬件识别码、序列号、是否在充电、是否在通话用于提供上报服务；
                  （17）移动终端补充设备标识体系统一调用sdk：用于给游戏提供事件上报统计用以分析游戏运营数据服务；所分享的信息可能有您的oaid信息。
                  （18）请您注意，com.keke.ddz并非sdk，来自游戏本身功能，用于获取设备id，维护游戏基础功能的正常运行。
                  2、与关联方的必要分享。为便于我们基于统一的账号体系向您提供一致化服务以及便于您进行统一管理、保障系统和账号安全等，您的个人信息可能会在我们和我们的关联方之间进行必要共享；
                  3、实现本政策第一条“我们如何收集和使用个人信息”部分所述目的；
                  4、履行我们在本政策或我们与您达成的其他协议中的义务和行使我们的权利；
                  5、向委托我们进行推广的合作伙伴等第三方共享，目的是为了使该等委托方了解推广的覆盖面和有效性。比如我们可以告知该委托方有多少人看了他们的推广信息或在看到这些信息后购买了委托方的商品，或者向他们提供不能识别个人身份的统计信息，帮助他们了解其受众或顾客；
                  6、在法律法规允许的范围内，为了遵守法律、维护我们及我们的关联方或合作伙伴、您或其他海南香蕉用户或社会公众利益、财产或安全免遭损害，比如为防止欺诈等违法活动和减少信用风险，我们可能与其他公司和组织交换信息。不过，这并不包括违反本政策中所作的承诺而为获利目的出售、出租、共享或以其它方式披露的信息；
                  7、应您合法需求或经您的授权同意；
                  8、应您的监护人合法要求而提供您的信息；
                  9、根据与您签署的单项服务协议（包括在线签署的电子协议以及相应的平台规则）或其他的法律文件约定所提供；
                  10、基于学术研究而提供；
                  11、基于符合法律法规的社会公共利益而提供。
                  我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息。对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求他们按照我们的说明、本政策以及其他任何相关的保密和安全措施来处理信息。
                  （二）转让
                  1、随着我们业务的持续发展，我们有可能进行合并、收购、资产转让或类似的交易，而您的信息有可能作为此类交易的一部分而被转移。我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则，我们将要求该公司、组织重新向您征求授权同意。
                  2、在获得您的明确同意后，我们会向其他方转让您的个人信息。
                  （三）披露
                  我们仅会在以下情况下，且采取符合业界标准的安全防护措施的前提下，才会披露您的个人信息：
                  1、根据您的需求，在您明确同意的披露方式下披露您所指定的信息；
                  2、根据法律、法规的要求、强制性的行政执法或司法要求所必须提供您信息的情况下，我们可能会依据所要求的信息类型和披露方式披露您的信息。在符合法律法规的前提下，当我们收到上述披露信息的请求时，我们会要求接收方必须出具与之相应的法律文件，如传票或调查函。我们坚信，对于要求我们提供的信息，应该在法律允许的范围内尽可能保持透明。我们对所有的请求都进行了慎重的审查，以确保其具备合法依据，且仅限于执法部门因特定调查目的且有合法权利获取的数据。
                  （四）分享、转让、披露信息时事先征得授权同意的例外
                  以下情形中，分享、转让、披露您的信息无需事先征得您的授权同意：
                  1、与国家安全、国防安全有关的；
                  2、与公共安全、公共卫生、重大公共利益有关的；
                  3、与犯罪侦查、起诉、审判和判决执行等司法或行政执法有关的；
                  4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
                  5、您自行向社会公众公开的信息；
                  6、从合法公开披露的信息中收集信息的，如合法的新闻报道、政府信息公开等渠道。
                  根据法律规定，共享、转让、披露经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。
                   
                  四、我们如何储存和保护个人信息
                  我们仅在本政策所述目的所必需期间和法律法规要求的最短时限内储存您的个人信息。如我们终止服务或运营，我们将及时停止继续收集您个人信息的活动，同时会遵守相关法律法规要求提前向您通知，并在终止服务或运营后对您的个人信息进行删除或匿名化处理，但法律法规或监管部门另有规定的除外。
                  我们在中华人民共和国境内运营中收集和产生的个人信息，储存在中国境内，以下情形除外：
                  1、法律法规有明确规定；
                  2、获得您的授权同意；
                  3、您使用的产品、服务涉及跨境，海南香蕉需要向境外提供您的个人信息的。
                  针对以上情形，我们会确保依据本政策及国家法律法规要求对您的个人信息提供足够的保护。
                  我们非常重视信息安全，成立了专门的安全团队，并采取一切合理可行的措施，保护您的个人信息：
                  （一）数据安全技术措施
                  我们会采用符合业界标准的安全防护措施，包括建立合理的制度规范、安全技术来防止您的个人信息遭到未经授权的访问使用、修改，避免数据的损坏或丢失。
                  我们的服务采取了多种加密技术，如在某些产品中，我们将利用加密技术（如MD5）来保护您的个人信息，采取加密技术对您的个人信息进行加密保存，并通过隔离技术进行隔离。
                  在个人信息使用时，如信息展示、信息关联计算，我们会采用多种数据脱敏技术增强信息在使用中的安全性。
                  我们还会采用严格的数据访问权限控制和多重身份认证技术保护个人信息，避免数据被违规使用。
                  （二）我们为保护个人信息采取的其他安全措施
                  我们通过建立数据分类分级制度、数据安全管理规范、数据安全开发规范来管理规范个人信息的存储和使用。
                  我们通过信息接触者保密协议、监控和审计机制来对数据进行全面安全控制。我们还会举办安全和隐私保护培训课程，加强员工的安全意识以及对于保护信息重要性的认识。
                  （三）我们仅允许有必要知晓这些信息的海南香蕉员工、合作伙伴访问您的个人信息，并为此设置了严格的访问权限控制和监控机制。我们同时要求可能接触到您的个人信息的所有人员履行相应的保密义务。如果未能履行这些义务，可能会被追究法律责任或被中止与海南香蕉的合作关系。
                  （四）我们会采取一切合理可行的措施，确保未收集无关的个人信息。
                  （五）互联网并非绝对安全的环境，而且电子邮件、即时通讯、社交软件或其他服务软件等与其他用户的交流方式无法确定是否完全加密，我们建议您使用此类工具时请使用复杂密码，并注意保护您的信息安全。
                  （六）安全事件处置
                  在通过海南香蕉服务与第三方进行沟通或购买商品及服务时，您不可避免的要向交易对方或潜在的交易对方披露自己的信息，如联络方式或者邮政地址等。请您妥善保护自己的信息，仅在必要的情形下向他人提供。
                  为应对个人信息泄露、损毁和丢失等可能出现的风险，我们制定了多项制度，明确安全事件、安全漏洞的分类分级标准及相应的处理流程。我们也为安全事件建立了专门的应急响应团队，按照安全事件处置规范要求，针对不同安全事件启动安全预案，进行止损、分析、定位、制定补救措施、联合相关部门进行溯源和打击。
                  在不幸发生信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们同时将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知信息主体时，我们会采取合理、有效的方式发布公告。同时，我们还将按照监管部门要求，主动上报信息安全事件的处置情况。
                  请您理解，由于技术的限制以及风险防范的局限，即便我们已经尽量加强安全措施，也无法始终保证信息百分之百的安全。您需要了解，您接入海南香蕉服务所用的系统和通讯网络，有可能因我们可控范围外的情况而发生问题。
                  请您务必妥善保管好您的账号、密码及其他身份要素。您在使用海南香蕉服务时，我们会通过您的账号、密码及及其他身份要素来识别您的身份。一旦您泄露了前述信息，您可能会蒙受损失，并可能对您产生不利。如您发现账号、密码及/或其他身份要素可能或已经泄露时，请您立即和我们取得联系，以便我们及时采取相应措施以避免或降低相关损失。
                   
                  五、如何管理您的个人信息
                  （一）访问、更新和删除
                  我们鼓励您更新和修改您的个人信息以使其更准确有效。您能通过海南香蕉服务访问您的个人信息，并根据对应信息的管理方式自行完成或要求我们进行修改、补充和删除。如果您希望访问或编辑您的账户中的个人资料信息，您可以通过访问您的账户个人资料页执行此类操作。如您想删除您的个人信息时（包括邮箱、城市、地址、性别、生日、实名认证信息），您可以通过使用联系游戏内在线客服或致电客服电话进行更正。
                  在访问、更新、更正和删除前述信息时，我们可能会要求您进行身份验证，以保障信息安全。对于通过COOKIES或同类技术收集的您的信息，我们还在本政策第二条“我们如何使用COOKIES或同类技术”部分说明了向您提供的选择机制。如您想查询、修改或删除您的部分信息，请联系海南香蕉客服具体指引进行操作。
                  除法律法规另有规定，当您更正、删除您的个人信息或申请注销账号时，我们可能不会立即从备份系统中更正或删除相应的信息，但会在备份更新时更正或删除这些信息。
                  （二）公开与分享
                  我们的多项服务可让您不仅与您的社交网络、也与使用该服务的所有用户公开分享您的相关信息，如，您在海南香蕉服务中所上传或发布的信息、您对其他人上传或发布的信息作出的回应，通过电子邮件或在海南香蕉服务中不特定用户可见的公开区域内上传或公布您的信息，以及包括与这些信息有关的位置数据和日志信息。只要您不删除您所公开或共享的信息，有关信息可能一直留存在公众领域；即使您删除共享信息，有关信息仍可能由其他用户或不受我们控制的第三方独立地缓存、复制或储存，或由其他用户或该等第三方在公众领域保存。如您将信息通过上述渠道公开或共享，由此造成您的信息泄露，我们不承担责任。因此，我们提醒并请您慎重考虑是否通过上述渠道公开或共享您的信息。
                  （三）注销
                  如果您想注销您的账户，您可以通过客服--账号相关--注销账号功能执行此操作，客服在收到您的注销请求24小时内将进行审核操作，在注销账户之后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息（包括与您账号相关的、该单项服务项下的全部服务资料和数据），法律法规另有规定的除外。
                  （四）撤回您的授权
                  您可以进入游戏内客服-账号相关-撤回同意隐私协议，点击“确定撤回”按钮来撤回您的授权。
                  
                  您可以通过“我的→设置→通用设置→权限管理”中查看您的设备功能在App的授权列表（因设备不同，该页面在不同客户端所能展示的条目可能有所差别）。如您希望对设备权限做出变动，可前往手机设置中进行修改。
                  
                  当您撤回授权后，我们无法继续为您提供撤回授权所对应的服务，也不再处理您相应的信息。但您撤回授权的决定，不会影响此前基于您的授权而开展的信息处理。
                   
                  六、第三方服务
                  海南香蕉服务可能链接至第三方提供的社交媒体或其他服务（包括网站或其他服务形式）。包括：
                  （1）您可利用“分享”键将某些内容分享到第三方服务，或您可利用第三方服务登录海南香蕉服务。这些功能可能会收集您的信息（包括您的日志信息），并可能在您的电脑装置COOKIES，从而正常运行上述功能；
                  （2）我们通过广告或我们服务的其他方式向您提供链接，使您可以链接至第三方的服务或网站；
                  （3）其他接入第三方服务的情形。如，为实现本政策中声明的目的，我们可能会接入第三方SDK服务，并将我们依照本政策收集的您的某些个人信息共享给该等第三方，以便提供更好的客户服务和用户体验。
                  该等第三方社交媒体或其他服务由相关的第三方负责运营。您使用该等第三方的社交媒体服务或其他服务（包括您向该等第三方提供的任何信息），须受第三方自己的服务条款及信息保护声明（而非本政策）约束，您需要仔细阅读其条款。本政策仅适用于我们所收集的个人信息，并不适用于任何第三方提供的服务或第三方的信息使用规则。如您发现这些第三方社交媒体或其他服务存在风险时，建议您终止相关操作以保护您的合法权益。
                   
                  七、年龄限制
                  我们建议：任何未成年人参加网上活动应事先取得父母或其他监护人（以下简称"监护人"）的同意。我们将根据国家相关法律法规的规定保护未成年人的相关信息。
                   
                  我们鼓励监护人指导未成年人使用海南香蕉服务。如果您是未满十四周岁的未成年人，您需要通知您的监护人共同阅读并接受我们的《海南香蕉儿童隐私保护指引》 ，并在您使用海南香蕉服务、提交个人信息之前，寻求其同意和指导。
                   
                  我们只会在获得（推定获得）法定监护人同意的前提下，收集、使用未成年人的个人信息，且根据相关法律法规和监管政策的规定，使用和处理获得的未成年人个人信息。如发现在未事先获得法定监护人同意的情况下，我们可能收集了未成年人的个人信息，我们会对该等数据和个人信息尽快进行删除等操作处理。
                   
                  若您是未成年人的监护人，当您对您所监护的未成年人的个人信息有相关疑问时，请及时与我们的客服联系。
                   
                  八、通知和修订
                  为了给您提供更好的服务，我们可能会根据产品或服务的更新情况及法律法规的相关要求适时修改本政策的条款，该等修改构成本政策的一部分。如该等更新造成您在本政策下权利的实质减少或重大变更，我们将在本政策生效前通过网站公告、推送通知、弹窗提示或其他方式来通知您，您如果不同意该等变更，可以选择停止使用海南香蕉服务；只有在您点击弹窗中的同意按钮后，我们才会按照变更后的隐私权政策收集、使用、共享、保存您的个人信息。 
                   
                  我们的任何修改都会将您的满意度置于首位。我们鼓励您在每次使用海南香蕉服务时都查阅我们的隐私政策。
                   
                  使用海南香蕉游戏服务可能需要下载并安装相关软件，您可以直接从海南香蕉的相关网站上获取该软件，也可以从得到海南香蕉授权的第三方获取。如果您从未经海南香蕉授权的第三方获取该软件或与该软件名称相同的软件，将视为您未获得海南香蕉授权，海南香蕉无法保证该软件能够正常使用、无法保证您及时获得有关海南香蕉政策的修订通知，并对因此给您造成的损失不予负责。
                   
                  我们可能在必需时（如当我们由于系统维护而暂停某一项服务时）发出与服务有关的公告。您可能无法取消这些与服务有关、性质不属于推广的公告。
                   
                  九、如何联系我们
                  我们设有个人信息保护专职部门并指定了专门的儿童个人信息保护负责人，将严格按照本政策保护儿童个人信息。如监护人和儿童有关于网络信息安全的投诉和举报，或对本政策、海南香蕉游戏的儿童个人信息保护规则、措施的相关事宜有任何问题、意见或建议，请随时与我们联系，可致电18600342700或写信至以下地址广州市天河区棠下穗南新村五巷6号之一601房海南香蕉互动网络科技有限公司 儿童个人信息保护专员（收）；邮编：510630。
                   
                  一般情况下，我们将在收到您的问题、意见或建议，并验证您的用户身份后的十五天内予以回复。
                   
                 海南香蕉互动网络科技有限公司
                   
                   
                  海南香蕉儿童隐私保护指引
                   
                  生效日期：2021年5月11日
                   
                  欢迎您选择由海南香蕉互动网络科技有限公司（以下简称“我们”或“海南香蕉”）提供的游戏！除《海南香蕉隐私政策》、《海南香蕉用户协议》外，我们还将通过《海南香蕉儿童隐私保护指引》（“本政策”） 帮助您和孩子（本政策中的“孩子”，是指不满十四周岁的未成年人）进一步了解我们收集、使用、存储和共享您孩子个人信息的情况，以及您和您的孩子所享有的相关权利。
                   
                  本协议的订立、履行、解释及争议的解决均适用中华人民共和国法律并排除其他一切冲突法的适用。如双方就本协议的内容或其执行发生任何争议（包括但不限于合同或者其他财产性权益纠纷），双方应友好协商解决；协商不成时，双方同意交由海南香蕉互动网络科技有限公司所在地人民法院管辖并处理。
                   
                  儿童特别说明：本政策内的儿童指不满十四周岁的未成年人用户。如果您是儿童，请通知并确保您的监护人务必认真阅读并充分理解本儿童隐私政策，并在您使用海南香蕉服务、提交个人信息之前，寻求、获得您的监护人的同意和指导。您点击同意本儿童隐私政策，或者您使用/继续使用海南香蕉服务、提交个人信息，我们将善意的理解前述行为表示您已获得您的监护人的许可，您的监护人同意按照本儿童隐私政策（包括更新版本）同意/授权我们收集、存储、使用、转移和披露儿童的个人信息。
                   
                  监护人特别说明：如您的孩子不满十四周岁将适用本儿童隐私政策，请您作为儿童的法定监护人应认真阅读并理解我们的儿童隐私保护政策。我们将根据本儿童隐私政策采取特殊措施保护您孩子的个人信息。请您帮助我们，履行保护儿童个人信息和隐私安全的责任，要求他们在您的监护下共同阅读并接受本隐私政策，且应在您的同意和指导下使用海南香蕉服务、提交个人信息。如果您不同意本隐私政策的内容，将可能导致海南香蕉的产品和服务无法正常运行，或者无法达到海南香蕉拟达到的服务效果，且您应要求您的孩子立即停止访问/使用海南香蕉服务。您点击同意本隐私政策，或者您的孩子使用/继续使用海南香蕉服务、提交个人信息，我们都理解并确信该等行为表示您同意海南香蕉按照本隐私政策（包括更新版本）收集、存储、使用、转移和披露您孩子的个人信息。
                  【重要提示】：
                  本政策适用于不满十四周岁的未成年人的个人信息处理。有关您和已满十四周岁的用户的个人信息处理，请查看《海南香蕉隐私政策》了解相关信息。
                  我们会通过页面提示、交互流程、网站公告等方式向您说明儿童个人信息收集等情况，并征得您的同意。请您仔细阅读、充分理解《海南香蕉隐私政策》和本政策后，选择是否同意前述隐私政策，特别是以黑色加粗标识的条款。
                  1.我们收集的儿童个人信息
                  在您的孩子使用海南香蕉服务的过程中，海南香蕉仅会收集您同意我们收集的或您及您的孩子主动提供的有关您孩子的个人信息，以向您的孩子提供、优化我们的服务以及保障您孩子的账户安全。同时海南香蕉将为您提供拒绝选项，如您未同意我们海南香蕉收集信息的请求，视为您同意海南香蕉将无法继续为您以及您的孩子提供相应的服务。我们可能会收集的您孩子的个人信息的详情，请参见《海南香蕉隐私政策》。
                  同时，为验证您与您孩子的监护关系，我们可能还会收集您的联系方式（包括手机号码、电子邮箱）以及其他有助于我们判断监护关系的信息。
                  目前，除了向第三方调研机构收集游戏调研信息，以帮助我们改进游戏产品以及提供更优质的服务之外，我们不会主动从海南香蕉外的第三方获取您孩子的个人信息。如未来为业务发展需要从海南香蕉外的第三方间接获取您孩子的个人信息，我们会在获取前向您明示个人信息的来源、类型及使用范围，如海南香蕉开展业务需进行的个人信息处理活动超出您原本向海南香蕉外的第三方提供个人信息时的授权同意范围，我们将在处理您孩子的该等个人信息前，征得您的明示同意；此外，我们也将会严格遵守相关法律法规的规定，并要求该第三方保障其提供的信息的合法性。
                  2.我们如何使用儿童个人信息
                  我们严格遵守法律法规的规定以及与用户的约定，按照本政策及《海南香蕉用户协议》、《海南香蕉隐私政策》所述使用收集的信息，以向您的孩子提供更为优质的服务。
                  有关我们使用儿童个人信息的方式详情请参见《海南香蕉隐私政策》，若我们使用您孩子的个人信息，超出了与收集时所声称的目的及具有直接或合理关联的范围，我们将在使用您孩子的个人信息前，再次向您告知并征得您的同意。
                  3.儿童个人信息的存储
                  3.1 我们按照法律法规规定，将在中华人民共和国境内收集到的您孩子的个人信息存储于中华人民共和国境内，并依法对这些信息进行严格保密。如涉及跨境业务，我们需要向境外机构传输境内收集的相关个人信息的，我们也会根据国内法律、行政法规和相关监管部门的规定，为您孩子的个人信息提供保护。
                  3.2 一般情况下，我们只会在为实现服务目的所必需的时间内或法律法规规定的条件下存储您孩子的个人信息。超出法律法规或监管规定的期限后，我们会按照法律法规的要求对您孩子的个人信息进行删除或者匿名化处理。
                  4.儿童个人信息的安全
                  4.1 为了保障您孩子的信息安全，我们会在现有技术水平下采取合理必要的措施来保护孩子的信息，采取物理防护、安全技术、管理制度等措施来降低丢失、误用、非授权访问、披露和更改的风险，包括但不限于数据加密传输、防火墙和加密存储、物理访问控制以及信息访问授权控制。为此我们设置了安全程序保护您孩子的信息不会被未经授权的访问所窃取，所有的个人信息被加密储存并放置于经防火墙严格保护的内部系统。
                  4.2 为了保障您孩子的信息安全，我们建立了专门的管理制度、流程和组织以保障信息的安全。例如，我们严格限制访问信息的人员范围，要求他们遵守保密义务，并进行审计。
                  4.3 若发生儿童个人信息泄露等安全事件，我们会启动应急预案，阻止安全事件扩大，并及时以公告、推送通知或邮件等形式告知您和孩子安全事件的基本情况、我们即将或已经采取的处置措施和补救措施，以及我们对您的应对建议。如果难以实现逐一告知，我们将通过公告等方式发布警示。
                  5.儿童个人信息的更正
                  如您和孩子发现儿童个人信息有错误的，可以联系我们处理。
                  6.儿童个人信息的删除
                  6.1 如您和孩子发现我们违反法律、行政法规的规定或者双方的约定处理儿童个人信息的，或是超出目的范围或者必要期限处理儿童个人信息的，可以通过联系我们对相关个人信息进行删除。
                  6.2 如您撤回同意的，可以联系我们，我们将按照国家有关法律规定进行处理。
                  6.3 如您和孩子主动注销海南香蕉账号并终止使用海南香蕉，我们将会停止使用儿童的个人信息，但法律法规或监管部门另有规定的除外。如我们的产品或者服务停止运营，我们将根据相关法律法规规定进行通知，同时也将及时停止使用儿童个人信息，并将对保存的儿童个人信息进行删除或匿名化处理。
                  7.儿童个人信息的转移和委托处理
                  我们不会向第三方转移和委托第三方处理儿童个人信息，除以下情况外，未经监护人的另外授权同意，我们不会向第三方转移、委托第三方处理或者与第三方分享儿童个人信息：
                  7.1为实现本政策第2条“我们如何使用儿童个人信息”中所述目的，或者为履行本政策或我们与儿童、监护人达成的其他协议中约定的我们的义务以及行使我们的权利；
                  7.2在遵循法律法规要求的前提下，为了符合法律规定、维护儿童、监护人、海南香蕉、海南香蕉的关联方、海南香蕉的合作伙伴或其他海南香蕉用户的合法权益或社会公众利益的需要（比如为防止违法活动），我们可能与其他组织交换信息。
                  对于上述确需第三方转移或委托第三方处理的，我们都会根据法律、行政法规的规定进行合规措施，包括但不限于对第三方进行安全评估。
                  8.儿童个人信息的披露
                  除非法律、行政法规规定应当披露或者根据与您的约定可以披露您孩子的个人信息的，我们不会披露孩子的个人信息。
                  9.变更
                  我们可能会适时对本政策进行修订。当本政策的条款发生变更时，我们会在版本更新时以适当的方式向您提示变更后的指引。请您仔细阅读变更后的隐私保护指引或指引内容，您的孩子继续使用海南香蕉表示您同意我们按照更新后的隐私保护指引收集、处理或使用您孩子的个人信息。
                  10.其他
                  10.1 《海南香蕉游戏隐私政策》是海南香蕉游戏统一适用的一般性隐私条款，其中所规定的内容包括但不限于用户权利及信息安全保障措施等均适用于海南香蕉游戏用户。本政策是专门针对儿童的隐私保护指引，包含对于儿童个人信息的特殊保护，属于《海南香蕉游戏隐私政策》的补充内容。如《海南香蕉游戏隐私政策》与本政策存在不一致或矛盾之处，请以本政策为准。
                  10.2 为方便您的查阅，可以在新用户注册界面、登录App后“更多-设置-政策规则-隐私政策”中查看完整版隐私政策内容。
                  11.联系我们
                  我们设有个人信息保护专职部门并指定了专门的儿童个人信息保护负责人，将严格按照本政策保护儿童个人信息。如监护人和儿童有关于网络信息安全的投诉和举报，或对本政策、海南香蕉游戏的儿童个人信息保护规则、措施的相关事宜有任何问题、意见或建议，请随时与我们联系，可致电18600342700或写信至以下地址广州市天河区棠下穗南新村五巷6号之一601房海南香蕉互动网络科技有限公司 儿童个人信息保护专员（收）；邮编：510630。
                   
                  一般情况下，我们将在收到问题、意见或建议，并验证监护人和/或儿童身份后的十五天内予以回复。
                   
                 海南香蕉互动网络科技有限公司`;
        }
        static IsPrivacy() {
            if (Laya.LocalStorage.getItem("IsPrivacy") == "1") {
                return true;
            }
            return false;
        }
    }
    View_Privacy.NAME = "View_Privacy";
    View_Privacy.AUTO = true;
    View_Privacy.DATA = null;

    class View_Sign extends ui.View_Commercialize.View_SignUI {
        constructor() {
            super(...arguments);
            this.SignInCycle = 7;
            this.IsInit = false;
            this._SignInState = [];
            this.CurStateIndex = null;
        }
        onAwake() {
            for (let index = 1; index < 8; index++) {
                this["SignItemBox" + index.toString()] = this.SignBox.getChildAt(index - 1);
            }
            let config = [200, 300, 350, 500, 700, 800, 1888];
            Laya.timer.once(50, this, () => {
                Tools_UI.AnimationUI_Show(this.main, 6);
                this.upDateUI();
                this.AddBtnEvent();
                View_Sign.issign = (this.getState().State != 2);
                Laya.timer.once(50, this, () => {
                    for (let index = 0; index < 7; index++) {
                        this.SignBox.getChildAt(index).getChildAt(0).getChildAt(0).getChildAt(0).text = "x" + config[index];
                        this.SignBox.getChildAt(index).getChildAt(0).getChildAt(0).getChildAt(1).text = "第" + (index + 1) + "天";
                    }
                });
            });
        }
        AddBtnEvent() {
            Tools_UI.AnimationUI_BtnScale(this.sign_btn);
            Tools_UI.AnimationUI_BtnScale(this.sign2_btn);
            Tools_UI.AnimationUI_BtnScale(this.back);
            let config = [200, 300, 350, 500, 700, 800, 1888];
            this.sign_btn.on(Laya.Event.CLICK, this, () => {
                if (this.getState().State == 2) {
                    this.Sign();
                    let coin_num = config[this.getState().DayNum - 1];
                    LocalData.CurCoinNum += Number(coin_num);
                    Tools_UI.Tip("签到成功,金币+" + config[this.getState().DayNum - 1]);
                    this.upDateUI();
                }
                else {
                    Tools_UI.Tip("已签到");
                }
            });
            this.sign2_btn.on(Laya.Event.CLICK, this, () => {
                this.Sign();
                let coin_num = config[this.getState().DayNum - 1];
                LocalData.CurCoinNum += Number(coin_num) * 2;
                Tools_UI.Tip("签到成功,金币+" + Number(coin_num) * 2);
            });
            this.back.on(Laya.Event.CLICK, this, () => {
                UIControl.ShowUI(View_Main);
                UIControl.RemoveUI(View_Sign);
            });
        }
        upDateUI() {
            for (let index in this.SignInState) {
                let State = this.SignInState[index];
                let SignItemBox = this["SignItemBox" + (Number(index) + 1)];
                for (let i = 1; i <= 4; i++) {
                    let SingState = SignItemBox.getChildByName("SignState" + i);
                    if (State == i && SingState.visible == false) {
                        SingState.visible = true;
                    }
                    else if (State != i && SingState.visible == true) {
                        SingState.visible = false;
                    }
                }
            }
            if (this.getState().State == 3) {
            }
        }
        get SignInState() {
            this.initSignData();
            return this._SignInState;
        }
        initSignData() {
            if (this.IsInit == false) {
                let cur_days = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
                let state_update_time = LocalData.SignInData.state_update_time;
                let last_days = Math.floor(LocalData.SignInData.last_time / (1000 * 60 * 60 * 24));
                if (state_update_time == null) {
                    LocalData.SignInData.state_update_time = Date.now();
                    state_update_time = LocalData.SignInData.state_update_time;
                }
                let update_days = Math.floor(state_update_time / (1000 * 60 * 60 * 24));
                if (update_days < cur_days) {
                    LocalData.SignInData.state_update_time = Date.now();
                    LocalData.SignInData.historical_state.forEach((item, index) => {
                        if (item != 3) {
                            LocalData.SignInData.historical_state[index] = 4;
                        }
                    });
                    for (let i = 1; i < cur_days - last_days; i++) {
                        LocalData.SignInData.historical_state.push(4);
                    }
                }
                LocalData.SignInData = LocalData.SignInData;
                let historical_state_length = LocalData.SignInData.historical_state.length;
                if (historical_state_length % 7 > 0 || last_days == cur_days) {
                    let index = historical_state_length % 7;
                    index = index == 0 ? 7 : index;
                    index = historical_state_length - index;
                    this._SignInState = LocalData.SignInData.historical_state.slice(index);
                }
                this.CurStateIndex = this._SignInState.length - 1;
                if (last_days != cur_days) {
                    this.CurStateIndex = this._SignInState.length;
                    this._SignInState.push(2);
                }
                else if (View_Sign.DATA == "tclose") {
                    UIControl.ShowUI(View_Main);
                    UIControl.RemoveUI(View_Sign);
                }
                for (let i = 0; i < this.SignInCycle; i++) {
                    if (!this._SignInState[i]) {
                        this._SignInState.push(1);
                    }
                }
                this.IsInit = true;
                for (let index = 0; index < 7; index++) {
                    if (index < LocalData.SignInData.SignDays) {
                        this.SignBox.getChildAt(index).disabled = true;
                    }
                    else {
                        this.SignBox.getChildAt(index).disabled = false;
                    }
                }
            }
        }
        getStateData() {
            this.initSignData();
            return this._SignInState;
        }
        Sign() {
            this.initSignData();
            if (this._SignInState[this.CurStateIndex] == 2) {
                this._SignInState[this.CurStateIndex] = 3;
                LocalData.SignInData.last_time = Date.now();
                LocalData.SignInData.state_update_time = Date.now();
                LocalData.SignInData.historical_state.push(3);
                LocalData.SignInData.SignDays++;
                if (LocalData.SignInData.SignDays >= 7) {
                    LocalData.SignInData.SignDays = 0;
                }
                LocalData.SignInData = LocalData.SignInData;
                for (let index = 0; index < 7; index++) {
                    if (index < LocalData.SignInData.SignDays) {
                        this.SignBox.getChildAt(index).disabled = true;
                        this.SetSignBox.getChildAt(index).visible = true;
                    }
                    else {
                        this.SetSignBox.getChildAt(index).visible = false;
                        this.SignBox.getChildAt(index).disabled = false;
                    }
                }
                return true;
            }
            else {
                return false;
            }
        }
        getState() {
            this.initSignData();
            return {
                State: this._SignInState[this.CurStateIndex],
                DayNum: this.CurStateIndex + 1,
            };
        }
        RepairSign(index) {
            this.initSignData();
            if (this._SignInState[index] == 4) {
                this._SignInState[index] = 3;
                LocalData.SignInData.state_update_time = Date.now();
                let length = LocalData.SignInData.historical_state.length;
                if (this._SignInState[this.CurStateIndex] == 3) {
                    LocalData.SignInData.historical_state[length - 1 - (this.CurStateIndex - index)] = 3;
                }
                else {
                    LocalData.SignInData.historical_state[length - 1 - (this.CurStateIndex - 1 - index)] = 3;
                }
                LocalData.SignInData = LocalData.SignInData;
                return true;
            }
            else {
                return false;
            }
        }
    }
    View_Sign.NAME = "View_Sign";
    View_Sign.AUTO = true;
    View_Sign.DATA = null;
    View_Sign.issign = false;

    class View_Store extends ui.View_Commercialize.View_StoreUI {
        constructor() {
            super(...arguments);
            this.currentIndex = 0;
            this.skinSelectNum = [1, 0, 0, 0];
        }
        onAwake() {
            View_Store.self = this;
            this.coinNums.text = LocalData.CurCoinNum.toString();
            this.ListInit();
            this.tList.on(Laya.Event.CLICK, this, this.onTListClick);
            this.is_have.on(Laya.Event.CLICK, this, () => {
                if (LocalData.skinNum[this.currentIndex] == 1) {
                    LocalData.CurSkinNum = this.currentIndex;
                    console.log("当前使用皮肤下标", this.currentIndex);
                    console.log("配置表皮肤下标", LocalData.CurSkinNum);
                    UIControl.RemoveUI(View_Store);
                    UIControl.ShowUI(View_Main);
                    LocalData.Level = LocalData.Level;
                }
                else {
                    Tools_UI.Tip("请先解锁当前皮肤!");
                }
            });
            this.add_coin.on(Laya.Event.CLICK, this, () => {
                LocalData.CurCoinNum = LocalData.CurCoinNum + 500;
                this.coinNums.text = LocalData.CurCoinNum.toString();
                Tools_UI.Tip("金币+500!");
            });
        }
        ListInit() {
            var data = [];
            for (let index = 0; index < 4; index++) {
                var lockvisible = Boolean(LocalData.skinNum[index] == 0);
                var select_imgvisible = Boolean(this.skinSelectNum[index] == 1);
                var use_imgvisible = Boolean(LocalData.CurSkinNum == index);
                var ucoin_imgvisible = true;
                if (index == 0) {
                    ucoin_imgvisible = false;
                }
                data.push({
                    icon: {
                        skin: "ui_mall/img_pingzi_" + (index + 1) + ".png",
                    },
                    lock: {
                        visible: lockvisible,
                    },
                    coinNum: {
                        visible: ucoin_imgvisible,
                        text: (500 + index * 1000).toString(),
                    },
                    use: {
                        visible: use_imgvisible,
                    },
                    select_img: {
                        visible: select_imgvisible,
                    },
                    name: "box_" + index
                });
            }
            Laya.timer.once(10, this, () => {
                this.tList.array = data;
            });
        }
        onTListClick(e) {
            let ns = e.target.name.split("_");
            if (ns.length < 2) {
                return;
            }
            var curIndex = this.currentIndex = Number(ns[1]);
            for (let i = 0; i < 4; i++) {
                if (i == curIndex) {
                    this.skinSelectNum[i] = 1;
                }
                else {
                    this.skinSelectNum[i] = 0;
                }
            }
            {
                var coinNum = 500 + curIndex * 1000;
                if (LocalData.skinNum[curIndex] == 1) {
                    Tools_UI.Tip("已解锁!");
                }
                else if (LocalData.CurCoinNum >= coinNum) {
                    LocalData.CurCoinNum = LocalData.CurCoinNum - coinNum;
                    this.coinNums.text = LocalData.CurCoinNum.toString();
                    console.log("当前下标", curIndex);
                    LocalData.skinNum[curIndex] = 1;
                    LocalData.skinNum = LocalData.skinNum;
                    Tools_UI.Tip("已解锁!");
                }
                else {
                    Tools_UI.Tip("金币不足!");
                }
            }
            this.ListInit();
        }
        onDestroy() {
            Laya.timer.clearAll(this);
            EventControl$1.offAll(this);
        }
    }
    View_Store.NAME = "View_Store";
    View_Store.AUTO = true;
    View_Store.DATA = null;
    View_Store.self = null;

    class _AD_Manager {
        ADinit() {
        }
        AddDesktop() {
            if (window["qg"]) {
                qg["hasShortcutInstalled"]({
                    success: function (res) {
                        if (res == false) {
                            qg["installShortcut"]({
                                success: function () {
                                    console.log("创建桌面图标成功");
                                },
                                fail: function (err) {
                                    Tools_UI.Tip("创建桌面图标失败");
                                    console.log("创建左面图标========>失败", err);
                                },
                                complete: function () { }
                            });
                        }
                    },
                    fail: function (err) { },
                    complete: function () { }
                });
            }
            else {
                Tools_UI.Tip("手机端才可以添加");
            }
        }
        NativeBannerReset(isShowNibg = false) {
        }
        ThreeClick() {
        }
        MoreGame() {
            if (window["qg"]) {
            }
            else {
                Tools_UI.Tip("暂无更多游戏~");
            }
        }
        ChecKBtn(_target) {
            _target.visible = false;
        }
        ShowVideoAD(fc = null) {
            AD_Manager.AD_CloseFc = fc;
            AD_Manager.AD_CloseFc();
        }
        ShowPortalAd(fc = null) {
            AD_Manager.PortalAd_CloseFc = fc;
        }
        ClickBtnJumpAD() {
        }
    }
    const AD_Manager = new _AD_Manager();

    class _UI_InteractionManager {
        constructor() {
            this.curViewName = "";
            this.ViewType = 0;
        }
        UI_Click_Register() {
            Laya.stage.on(Laya.Event.CLICK, this, this.UIBtnClick);
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.AnimationUI_BtnScale);
        }
        UIBtnClick(e) {
            if (e.target.name.split("_")[0] != "View" && e.target.name != "") {
                GameManager.playSound(ResPath["click.mp3"]);
                switch (e.target.name) {
                    case "collect_btn":
                        AD_Manager.AddDesktop();
                        break;
                    case "sign_btn":
                        UIControl.ShowUI(View_Sign);
                        UIControl.RemoveUI(View_Main);
                        break;
                    case "draw_btn":
                        UIControl.ShowUI(View_Draw);
                        UIControl.RemoveUI(View_Main);
                        break;
                    case "more_btn":
                        AD_Manager.MoreGame();
                        break;
                    case "store_btn":
                        UIControl.ShowUI(View_Store);
                        UIControl.RemoveUI(View_Main);
                        break;
                    case "startGame":
                        break;
                    case "setting_btn":
                        UIControl.ShowUI(View_Setting, 0);
                        break;
                    case "yszc_btn":
                        UIControl.ShowUI(View_Privacy, 2);
                        break;
                    case "closetrial":
                        break;
                    case "trial_btn":
                        break;
                    case "shop1":
                        break;
                    case "shop2":
                        break;
                    case "Storeback":
                        UIControl.ShowUI(View_Main);
                        LocalData.Level = LocalData.Level;
                        break;
                    case "addlinelength":
                        break;
                    case "choose_1":
                    case "choose_2":
                    case "choose_3":
                        break;
                    case "start":
                        break;
                    case "toNexgame":
                        GameManager.onGameOver2();
                        break;
                    case "yy_box":
                    case "yx_box":
                    case "zd_box":
                        GameManager.SettingChange(e.target.name);
                        break;
                    case "CloseSetting":
                        UIControl.RemoveUI(View_Setting);
                        UIControl.ShowUI(View_Main);
                        break;
                    default:
                        break;
                }
            }
        }
        AnimationUI_BtnScale(e) {
            if (e.target.alpha == 1 && e.target.name.split("_")[0] != "View" && e.target.name != "" && e.target.name != "idle") {
                e.target.alpha = 0.999;
                Tools_UI.AnimationUI_BtnScale(e.target);
            }
        }
        ViewChange(_ViewType) {
            switch (_ViewType) {
                case 0:
                    UIControl.RemoveUI(View_Loading);
                    UIControl.ShowUI(View_Main);
                    break;
                case 1:
                    UIControl.RemoveUI(View_Main);
                    break;
                case 2:
                    GameManager.StartGame();
                    break;
                case 3:
                    Laya.timer.once(200, this, () => {
                        UIControl.RemoveUI(View_Game);
                    });
                    break;
                case 4:
                    break;
                default:
                    break;
            }
        }
    }
    const UI_InteractionManager = new _UI_InteractionManager();

    class View_Loading extends ui.View_Game.View_LoadingUI {
        constructor() {
            super(...arguments);
            this.loadNum = 0;
            this.loadOver = false;
            this.loadvalue = 0;
        }
        onEnable() {
            this.initProgress();
        }
        initProgress() {
            this.loadMask.x = -this.loadMask.width;
            this.loadNum = 1;
            this.loadvalue = 0;
            this.loadOver = false;
            Laya.timer.frameLoop(1, this, () => {
                if (this.loadNum > 2) {
                    this.loadhint.text = "加载3D资源包中" + Math.floor(this.loadvalue * 100) + "%... ";
                }
                else {
                    this.loadhint.text = "加载3D资源包" + this.loadNum + "中" + Math.floor(this.loadvalue * 100) + "%...";
                }
                if (this.loadvalue >= 1) {
                    this.loadvalue = 0;
                    this.loadNum++;
                }
                if (!this.loadOver) {
                    this.loadOver = true;
                    Laya.Tween.to(this.loadMask, { x: 0 }, 200, null, Laya.Handler.create(this, () => {
                        this.onGameStart();
                    }));
                }
                else {
                    this.loadvalue += 0.02;
                    this.loadMask.x = this.loadvalue * this.loadMask.width - this.loadMask.width;
                }
            });
        }
        onGameStart() {
            EventControl$1.offAll(this);
            Laya.timer.clearAll(this);
            switch (View_Loading.DATA) {
                case 0:
                    UI_InteractionManager.ViewChange(0);
                    break;
                case 1:
                    break;
            }
        }
    }
    View_Loading.NAME = "View_Loading";
    View_Loading.AUTO = true;
    View_Loading.DATA = null;

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

    class Engine {
        constructor() {
            this.index = 0;
            Laya.stage.on(Laya.Event.KEY_UP, this, this.onkeyup);
            this.ToStart();
        }
        ToStart() {
            _InitLocaData();
            UI_InteractionManager.UI_Click_Register();
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
    }

    class GameInfoUpdate extends Laya.Script {
        onAwake() {
            EventControl$1.on(EventName.GameInfoUpdate, this, this.InfoUpdate);
            this.InfoUpdate();
        }
        InfoUpdate() {
            switch (this.owner.name) {
                case "canNum":
                    break;
                default:
                    break;
            }
        }
        onDestroy() {
            EventControl$1.offAll(this);
            Laya.timer.clearAll(this);
        }
    }

    class GameConfig {
        constructor() { }
        static init() {
            var reg = Laya.ClassUtils.regClass;
            reg("Code/CommonCode/GameInfoUpdate.ts", GameInfoUpdate);
        }
    }
    GameConfig.width = 750;
    GameConfig.height = 1334;
    GameConfig.scaleMode = "fixedwidth";
    GameConfig.screenMode = "vertical";
    GameConfig.alignV = "middle";
    GameConfig.alignH = "center";
    GameConfig.startScene = "View_Commercialize/View_Sign.scene";
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
            {
                new Engine();
            }
        }
    }
    new Main();

}());
