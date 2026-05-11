"use strict";
(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __decorateClass = (decorators, target, key, kind) => {
    var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
    for (var i = decorators.length - 1, decorator; i >= 0; i--)
      if (decorator = decorators[i])
        result = (kind ? decorator(target, key, result) : decorator(result)) || result;
    if (kind && result)
      __defProp(target, key, result);
    return result;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // src/config/cfg/cfg_activity_icon.ts
  var cfg_activity_icon = class {
  };

  // src/config/cfg/cfg_gm.ts
  var cfg_gm = class {
  };

  // src/config/cfg/cfg_item.ts
  var cfg_item = class {
  };

  // src/config/cfg/cfg_link_up_level.ts
  var cfg_link_up_level = class {
  };

  // src/config/cfg/cfg_link_up_misc.ts
  var cfg_link_up_misc = class {
  };

  // src/config/cfg/cfg_misc.ts
  var cfg_misc = class {
  };

  // src/config/cfg/cfg_music.ts
  var cfg_music = class {
  };

  // src/config/cfg/cfg_puzzle_level.ts
  var cfg_puzzle_level = class {
  };

  // src/config/cfg/cfg_puzzle_misc.ts
  var cfg_puzzle_misc = class {
  };

  // src/config/cfg/cfg_relation_hero.ts
  var cfg_relation_hero = class {
  };

  // src/config/cfg/cfg_relation_level.ts
  var cfg_relation_level = class {
  };

  // src/config/cfg/cfg_relation_slot.ts
  var cfg_relation_slot = class {
  };

  // src/config/cfg/cfg_role.ts
  var cfg_role = class {
  };

  // src/config/cfg/cfg_sound.ts
  var cfg_sound = class {
  };

  // src/config/ConfigManager.ts
  var ConfigTable = class {
    constructor() {
      this._data = /* @__PURE__ */ new Map();
      this._fieldIndices = /* @__PURE__ */ new Map();
    }
    /** 添加配置项（内部使用） */
    _addItem(id, item) {
      this._data.set(id, item);
    }
    get(id) {
      return this._data.get(String(id));
    }
    get_all() {
      return Array.from(this._data.values());
    }
    has(id) {
      return this._data.has(String(id));
    }
    get_min(field) {
      let min = Number.MAX_VALUE;
      let found = false;
      for (const item of this._data.values()) {
        const value = item[field];
        if (typeof value === "number" && value < min) {
          min = value;
          found = true;
        }
      }
      return found ? min : void 0;
    }
    get_max(field) {
      let max = Number.MIN_VALUE;
      let found = false;
      for (const item of this._data.values()) {
        const value = item[field];
        if (typeof value === "number" && value > max) {
          max = value;
          found = true;
        }
      }
      return found ? max : void 0;
    }
    get_by_field(field, value) {
      if (!this._fieldIndices.has(field)) {
        this._build_field_index(field);
      }
      const fieldIndex = this._fieldIndices.get(field);
      if (!fieldIndex)
        return void 0;
      const items = fieldIndex.get(value);
      return items && items.length > 0 ? items[0] : void 0;
    }
    get_all_by_field(field, value) {
      if (!this._fieldIndices.has(field)) {
        this._build_field_index(field);
      }
      const fieldIndex = this._fieldIndices.get(field);
      if (!fieldIndex)
        return [];
      return fieldIndex.get(value) || [];
    }
    _build_field_index(fieldName) {
      if (this._fieldIndices.has(fieldName))
        return;
      const fieldIndex = /* @__PURE__ */ new Map();
      this._fieldIndices.set(fieldName, fieldIndex);
      for (const item of this._data.values()) {
        const value = item[fieldName];
        if (fieldIndex.has(value)) {
          fieldIndex.get(value).push(item);
        } else {
          fieldIndex.set(value, [item]);
        }
      }
    }
  };
  var cfg_activity_iconTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_gmTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_itemTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_link_up_levelTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_link_up_miscTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_miscTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_musicTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_puzzle_levelTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_puzzle_miscTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_relation_heroTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_relation_levelTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_relation_slotTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_roleTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var cfg_soundTable = class extends ConfigTable {
    constructor() {
      super();
    }
  };
  var ConfigManager = class _ConfigManager {
    constructor() {
      // 数据表实例
      this.cfg_activity_iconCache = new cfg_activity_iconTable();
      this.cfg_gmCache = new cfg_gmTable();
      this.cfg_itemCache = new cfg_itemTable();
      this.cfg_link_up_levelCache = new cfg_link_up_levelTable();
      this.cfg_link_up_miscCache = new cfg_link_up_miscTable();
      this.cfg_miscCache = new cfg_miscTable();
      this.cfg_musicCache = new cfg_musicTable();
      this.cfg_puzzle_levelCache = new cfg_puzzle_levelTable();
      this.cfg_puzzle_miscCache = new cfg_puzzle_miscTable();
      this.cfg_relation_heroCache = new cfg_relation_heroTable();
      this.cfg_relation_levelCache = new cfg_relation_levelTable();
      this.cfg_relation_slotCache = new cfg_relation_slotTable();
      this.cfg_roleCache = new cfg_roleTable();
      this.cfg_soundCache = new cfg_soundTable();
    }
    static get instance() {
      if (!this._instance) {
        this._instance = new _ConfigManager();
      }
      return this._instance;
    }
    /**
     * 初始化配置管理器
     * 会自动加载所有配置资源并初始化
     */
    init(complete) {
      const configUrls = [
        "resources/config/data/cfg_activity_icon.json",
        "resources/config/data/cfg_gm.json",
        "resources/config/data/cfg_item.json",
        "resources/config/data/cfg_link_up_level.json",
        "resources/config/data/cfg_link_up_misc.json",
        "resources/config/data/cfg_misc.json",
        "resources/config/data/cfg_music.json",
        "resources/config/data/cfg_puzzle_level.json",
        "resources/config/data/cfg_puzzle_misc.json",
        "resources/config/data/cfg_relation_hero.json",
        "resources/config/data/cfg_relation_level.json",
        "resources/config/data/cfg_relation_slot.json",
        "resources/config/data/cfg_role.json",
        "resources/config/data/cfg_sound.json"
      ];
      Laya.loader.load(configUrls, Laya.Handler.create(this, () => {
        this.loadAllConfigs();
        complete == null ? void 0 : complete.run();
      }), Laya.Handler.create(this, (res) => {
      }));
    }
    loadAllConfigs() {
      this.loadCfg_activity_iconData();
      this.loadCfg_gmData();
      this.loadCfg_itemData();
      this.loadCfg_link_up_levelData();
      this.loadCfg_link_up_miscData();
      this.loadCfg_miscData();
      this.loadCfg_musicData();
      this.loadCfg_puzzle_levelData();
      this.loadCfg_puzzle_miscData();
      this.loadCfg_relation_heroData();
      this.loadCfg_relation_levelData();
      this.loadCfg_relation_slotData();
      this.loadCfg_roleData();
      this.loadCfg_soundData();
    }
    loadCfg_activity_iconData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_activity_icon.json");
      if (!res) {
        console.error(`cfg_activity_icon.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_activity_icon();
        Object.assign(item, data[key]);
        this.cfg_activity_iconCache._addItem(key, item);
      }
    }
    loadCfg_gmData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_gm.json");
      if (!res) {
        console.error(`cfg_gm.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_gm();
        Object.assign(item, data[key]);
        this.cfg_gmCache._addItem(key, item);
      }
    }
    loadCfg_itemData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_item.json");
      if (!res) {
        console.error(`cfg_item.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_item();
        Object.assign(item, data[key]);
        this.cfg_itemCache._addItem(key, item);
      }
    }
    loadCfg_link_up_levelData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_link_up_level.json");
      if (!res) {
        console.error(`cfg_link_up_level.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_link_up_level();
        Object.assign(item, data[key]);
        this.cfg_link_up_levelCache._addItem(key, item);
      }
    }
    loadCfg_link_up_miscData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_link_up_misc.json");
      if (!res) {
        console.error(`cfg_link_up_misc.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_link_up_misc();
        Object.assign(item, data[key]);
        this.cfg_link_up_miscCache._addItem(key, item);
      }
    }
    loadCfg_miscData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_misc.json");
      if (!res) {
        console.error(`cfg_misc.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_misc();
        Object.assign(item, data[key]);
        this.cfg_miscCache._addItem(key, item);
      }
    }
    loadCfg_musicData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_music.json");
      if (!res) {
        console.error(`cfg_music.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_music();
        Object.assign(item, data[key]);
        this.cfg_musicCache._addItem(key, item);
      }
    }
    loadCfg_puzzle_levelData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_puzzle_level.json");
      if (!res) {
        console.error(`cfg_puzzle_level.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_puzzle_level();
        Object.assign(item, data[key]);
        this.cfg_puzzle_levelCache._addItem(key, item);
      }
    }
    loadCfg_puzzle_miscData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_puzzle_misc.json");
      if (!res) {
        console.error(`cfg_puzzle_misc.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_puzzle_misc();
        Object.assign(item, data[key]);
        this.cfg_puzzle_miscCache._addItem(key, item);
      }
    }
    loadCfg_relation_heroData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_relation_hero.json");
      if (!res) {
        console.error(`cfg_relation_hero.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_relation_hero();
        Object.assign(item, data[key]);
        this.cfg_relation_heroCache._addItem(key, item);
      }
    }
    loadCfg_relation_levelData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_relation_level.json");
      if (!res) {
        console.error(`cfg_relation_level.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_relation_level();
        Object.assign(item, data[key]);
        this.cfg_relation_levelCache._addItem(key, item);
      }
    }
    loadCfg_relation_slotData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_relation_slot.json");
      if (!res) {
        console.error(`cfg_relation_slot.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_relation_slot();
        Object.assign(item, data[key]);
        this.cfg_relation_slotCache._addItem(key, item);
      }
    }
    loadCfg_roleData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_role.json");
      if (!res) {
        console.error(`cfg_role.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_role();
        Object.assign(item, data[key]);
        this.cfg_roleCache._addItem(key, item);
      }
    }
    loadCfg_soundData() {
      const res = Laya.loader.getRes("resources/config/data/cfg_sound.json");
      if (!res) {
        console.error(`cfg_sound.json资源未加载`);
        return;
      }
      const data = res.data || res;
      for (const key in data) {
        const item = new cfg_sound();
        Object.assign(item, data[key]);
        this.cfg_soundCache._addItem(key, item);
      }
    }
  };

  // src/modules/base/manager/DispatchManager.ts
  var _DispatchManager = class _DispatchManager {
    static hasListener(type) {
      var listener = _DispatchManager._events && _DispatchManager._events[type];
      return !!listener;
    }
    static dispatchEvent(type, data = null) {
      if (!_DispatchManager._events || !_DispatchManager._events[type])
        return false;
      var listeners = _DispatchManager._events[type];
      if (listeners.run) {
        if (listeners.once)
          delete _DispatchManager._events[type];
        data != null ? listeners.runWith(data) : listeners.run();
      } else {
        for (var i = 0, n = listeners.length; i < n; i++) {
          var listener = listeners[i];
          if (listener) {
            data != null ? listener.runWith(data) : listener.run();
          }
          if (!listener || listener.once) {
            listeners.splice(i, 1);
            i--;
            n--;
          }
        }
        if (listeners.length === 0 && _DispatchManager._events)
          delete _DispatchManager._events[type];
      }
      return true;
    }
    /**要记得释放 */
    static addEventListener(type, caller, listener, args = null) {
      return _DispatchManager._createListener(type, caller, listener, args, false);
    }
    /**要记得释放 */
    static addEventListenerOnce(type, caller, listener, args = null) {
      return _DispatchManager._createListener(type, caller, listener, args, true);
    }
    static _createListener(type, caller, listener, args, once, offBefore = true) {
      offBefore && _DispatchManager.removeEventListener(type, caller, listener, once);
      var handler = EventHandler.create2(type, caller || _DispatchManager, listener, args, once);
      _DispatchManager._events || (_DispatchManager._events = {});
      var events = _DispatchManager._events;
      if (!events[type])
        events[type] = handler;
      else {
        if (!events[type].run)
          events[type].push(handler);
        else
          events[type] = [events[type], handler];
      }
      _DispatchManager.checkListener();
      return handler;
    }
    static removeEventListener(type, caller, listener, onceOnly = false) {
      if (!_DispatchManager._events || !_DispatchManager._events[type])
        return;
      var listeners = _DispatchManager._events[type];
      if (listeners != null) {
        if (listeners.run) {
          if ((!caller || listeners.caller === caller) && (listener == null || listeners.method === listener) && (!onceOnly || listeners.once)) {
            delete _DispatchManager._events[type];
            listeners.recover();
          }
        } else {
          var count = 0;
          for (var i = 0, n = listeners.length; i < n; i++) {
            var item = listeners[i];
            if (!item) {
              count++;
              continue;
            }
            if (item && (!caller || item.caller === caller) && (listener == null || item.method === listener) && (!onceOnly || item.once)) {
              count++;
              listeners[i] = null;
              item.recover();
            }
          }
          if (count === n)
            delete _DispatchManager._events[type];
        }
      }
    }
    static removeEventListenerAll(type = null) {
      var events = _DispatchManager._events;
      if (!events)
        return;
      if (type) {
        _DispatchManager._recoverHandlers(events[type]);
        delete events[type];
      } else {
        for (var name in events) {
          _DispatchManager._recoverHandlers(events[name]);
        }
        _DispatchManager._events = null;
      }
    }
    /**
     * 慎用 遍历所有event 消耗性能
     */
    static removeEventListenerAllCaller(caller) {
      if (caller && _DispatchManager._events) {
        for (var name in _DispatchManager._events) {
          _DispatchManager.removeEventListener(name, caller, null);
        }
      }
    }
    static _recoverHandlers(arr) {
      if (!arr)
        return;
      if (arr.run) {
        arr.recover();
      } else {
        for (var i = arr.length - 1; i > -1; i--) {
          if (arr[i]) {
            arr[i].recover();
            arr[i] = null;
          }
        }
      }
    }
    static _getEvCounts(ev_counts) {
      ev_counts.clear();
      if (_DispatchManager._events) {
        for (var type in _DispatchManager._events) {
          var count = 0;
          var listeners = _DispatchManager._events[type];
          if (listeners.run) {
            count++;
          } else {
            for (var i = 0; i < listeners.length; ++i) {
              if (listeners[i]) {
                count++;
              }
            }
          }
          ev_counts.set(type, count);
        }
      }
    }
    static checkListener() {
      if (!window["CHECK_LISTENER"]) {
        return;
      }
      var ev_counts = _DispatchManager._ev_counts;
      _DispatchManager._getEvCounts(ev_counts);
      var total_count = 0;
      for (var entry of ev_counts) {
        var type = entry[0];
        var count = entry[1];
        total_count += count;
        if (count > 500) {
          console.warn("DispatchManager.checkListener listener is too large", type, count);
        }
      }
      if (total_count > 2800) {
        console.warn("DispatchManager.checkListener total listener is too large", total_count);
      }
    }
    static profile(tcount) {
      var ev_counts = _DispatchManager._ev_counts;
      _DispatchManager._getEvCounts(ev_counts);
      var tmps = [];
      var total_count = 0;
      for (var entry of ev_counts) {
        let type = entry[0];
        let count = entry[1];
        total_count += count;
        tmps.push({ type, count });
      }
      tmps.sort((v1, v2) => v2.count - v1.count);
      for (var tmp of tmps) {
        let type = tmp.type;
        let count = tmp.count;
        if (count >= tcount || !tcount) {
          console.log("DispatcherManager.profile", type, count);
        }
      }
      console.log("DispatcherManager.profile total_count", total_count);
    }
  };
  _DispatchManager._ev_counts = /* @__PURE__ */ new Map();
  var DispatchManager = _DispatchManager;
  var _EventHandler = class _EventHandler extends Laya.Handler {
    constructor(caller, method, args, once) {
      super(caller, method, args, once);
    }
    /**
     * 清理对象引用。
     * override
     */
    clear() {
      super.clear();
      this.type = null;
      return this;
    }
    recover() {
      if (this._id > 0) {
        this._id = 0;
        _EventHandler._event_pool.push(this.clear());
      }
    }
    static create2(type, caller, method, args = null, once = true) {
      let handler = _EventHandler._event_pool.length ? _EventHandler._event_pool.pop() : new _EventHandler(caller, method, args, once);
      handler.setTo(caller, method, args, once);
      handler.type = type;
      return handler;
    }
  };
  _EventHandler._event_pool = [];
  var EventHandler = _EventHandler;

  // src/modules/network/Connection.ts
  var _Connection = class _Connection {
    constructor() {
      this.socket = null;
      this.currentURL = "";
    }
    static get instance() {
      if (_Connection._instance == null) {
        _Connection._instance = new _Connection();
      }
      return _Connection._instance;
    }
    connect(url) {
      if (url.length <= 6 || url.substring(0, 5) != "ws://" && url.substring(0, 6) != "wss://") {
        return;
      }
      if (!this.socket) {
        this.socket = new Laya.Socket();
        this.socket.disableInput = true;
        this.socket.on(Laya.Event.OPEN, this, this.onSocketOpen);
        this.socket.on(Laya.Event.CLOSE, this, this.onSocketClose);
        this.socket.on(Laya.Event.MESSAGE, this, this.onMessageReveived);
        this.socket.on(Laya.Event.ERROR, this, this.onConnectError);
      }
      if (!this.byte) {
        this.byte = new Laya.Byte();
        this.byte.endian = Laya.Byte.LITTLE_ENDIAN;
      }
      if (!this.socket.connected) {
        this.currentURL = url;
        this.socket.connectByUrl(url);
      }
    }
    /**
         * 注册消息处理函数
         */
    addSocketListener(type, caller, listener) {
      DispatchManager.addEventListener(type.toString(), caller, listener);
    }
    /**
     * 删除消息处理监听
     */
    removeSocketListener(type, caller, listener) {
      DispatchManager.removeEventListener(type.toString(), caller, listener);
    }
    /**
     * 发送消息
     */
    sendMessage(message) {
      if (this.socket && this.socket.connected && message != null) {
      }
    }
    //Event.OPEN：连接成功建立后触发。
    onSocketOpen(e = null) {
      console.log("WebSocket 已连接");
      this.byte.writeByte(99);
      this.byte.writeInt16(2025);
      this.byte.writeFloat32(0.12345672398805618);
      this.byte.writeUTFString("二进制数据示例");
      this.socket.send(this.byte.buffer);
      this.byte.clear();
      DispatchManager.dispatchEvent("SOCKET_OPENED" /* SOCKET_OPENED */);
    }
    //Event.CLOSE：连接关闭时触发。
    onSocketClose(e = null) {
      console.log("WebSocket 连接已关闭");
      DispatchManager.dispatchEvent("SOCKET_CLOSED" /* SOCKET_CLOSED */);
    }
    //Event.MESSAGE：收到服务器发送的数据时触发。
    onMessageReveived(message = null) {
      console.log("接收到消息：", message);
      if (message instanceof ArrayBuffer) {
        let byte = new Laya.Byte();
        byte.endian = Laya.Byte.LITTLE_ENDIAN;
        byte.writeArrayBuffer(message);
        byte.pos = 0;
        let a = byte.getByte();
        let b = byte.getInt16();
        let c = byte.getFloat32();
        let d = byte.getUTFString();
        console.log("解析结果：", a, b, c, d);
      }
      this.socket.input.clear();
    }
    //Event.ERROR：连接出错时触发。
    onConnectError(e = null) {
      console.error("WebSocket 连接出错：", e);
    }
    close() {
      if (this.socket && this.socket.connected) {
        this.socket.close();
        this.socket = null;
      }
    }
  };
  _Connection._instance = null;
  var Connection = _Connection;

  // src/util/UIUtil.ts
  var _UIUtil = class {
    createButton(parent, btnName = null) {
      let btn = new Laya.Button();
      if (btnName) {
        btn.name = btnName;
      }
      parent.addChild(btn);
      return btn;
    }
    createImage(parent, skinName, imgName = null, pos = Laya.Vector2.ZERO) {
      let img = new Laya.Image();
      img.skin = skinName;
      if (imgName) {
        img.name = imgName;
      }
      parent.addChild(img);
      img.x = pos.x;
      img.y = pos.y;
      return img;
    }
    createLabel(parent, labelName = null, pos = Laya.Vector2.ZERO) {
      let lbl = new Laya.Label();
      if (labelName) {
        lbl.name = labelName;
      }
      parent == null ? void 0 : parent.addChild(lbl);
      lbl.x = pos.x;
      lbl.y = pos.y;
      return lbl;
    }
    createCanvas(parent, { name, posX, posY, width, height, isMouseThrough } = {}) {
      let canvas = new Laya.Sprite();
      if (name) {
        canvas.name = name;
      }
      canvas.x = posX || 0;
      canvas.y = posY || 0;
      canvas.width = width || 0;
      canvas.height = height || 0;
      canvas.mouseThrough = isMouseThrough || false;
      parent.addChild(canvas);
      return canvas;
    }
    createNode(parent, name, { isFull = true, isCenter = false, isMouseThrough = true, width = 0, height = 0 } = {}) {
      let node = new Laya.UIComponent();
      if (name)
        node.name = name;
      if (isFull) {
        node.left = 0;
        node.right = 0;
        node.top = 0;
        node.bottom = 0;
      } else if (isCenter) {
        node.width = width;
        node.height = height;
        node.centerX = node.centerY = 0;
      }
      node.mouseThrough = isMouseThrough;
      parent.addChild(node);
      return node;
    }
    //递归向上查找父节点，找到UClass，然后获取到win
    getRootDialog(selfNode, parentNode, isRecursion) {
      if (!selfNode)
        return null;
      let currentNode = parentNode || selfNode;
      if (currentNode.name) {
        let dialog = UIManager.instance.getDialog(currentNode.name);
        if (dialog) {
          return dialog;
        }
      }
      if (isRecursion !== false && currentNode.parent) {
        return this.getRootDialog(selfNode, currentNode.parent, true);
      }
      return null;
    }
    setViewCBottom(box, view) {
      let offsetY = (box.height - Laya.stage.height) / 2;
      view.x = (box.width - view.width) / 2;
      view.y = box.height - offsetY - view.height;
    }
    setViewCTop(box, view) {
      let offsetY = (box.height - Laya.stage.height) / 2;
      view.x = (box.width - view.width) / 2;
      view.y = offsetY;
    }
    /**
    * 控件布局居中
    * @param objs 控件列表
    * @param param1 
    * @return 总长度
    */
    layoutUI(objs, {
      space = 0,
      //间隔
      offsetPos = 0,
      //位置偏移
      parentSize = null,
      //父控件的尺寸，宽或高
      isVertical = false,
      //是否垂直布局
      isCenter = false,
      //是否居中
      isReverse = false,
      //是否倒序排列
      checkVisible = true
      //是否检测visible属性；visible为false，不参与布局调整
    } = {}) {
      if (!objs || objs.length <= 0) {
        return 0;
      }
      if (parentSize === null && (isCenter || isReverse)) {
        let parent = objs[0] && objs[0].parent;
        parentSize = parent ? isVertical ? parent.height : parent.width : 0;
      }
      let totalSize = 0;
      for (let i = 0; i < objs.length; ++i) {
        let obj = objs[i];
        if (obj && (checkVisible == false || obj.visible == true)) {
          let scale = isVertical ? obj.scaleY : obj.scaleX;
          let size = isVertical ? obj.height : obj.width;
          totalSize += Math.abs(size * scale) + space;
        }
      }
      totalSize = Math.max(0, totalSize - space);
      let symbol = isReverse ? -1 : 1;
      let centerOffPos = isCenter ? (parentSize - totalSize) / 2 : 0;
      let startPos = offsetPos + (isReverse ? parentSize - centerOffPos : centerOffPos);
      for (let i = 0; i < objs.length; ++i) {
        let obj = objs[i];
        if (obj && (checkVisible == false || obj.visible == true)) {
          let scale = isVertical ? obj.scaleY : obj.scaleX;
          let absScale = Math.abs(scale);
          let size = isVertical ? obj.height : obj.width;
          let pivot = isVertical ? obj.pivotY : obj.pivotX;
          pivot = scale < 0 ? size - pivot : pivot;
          let pos = startPos + pivot * absScale + (size - pivot) * Math.min(0, symbol * absScale);
          startPos = startPos + (size * absScale + space) * symbol;
          isVertical ? obj.y = pos : obj.x = pos;
        }
      }
      return totalSize;
    }
    followLabel(label, follower, space = 0) {
      follower.x = label.x + label.text.length * label.fontSize + space;
    }
  };
  var UIUtil = new _UIUtil();

  // src/modules/base/GlobalConfig.ts
  var GlobalConfig = class {
    static init() {
    }
    static get sdkName() {
      return this._sdkName || "";
    }
    static get offsetX() {
      return (Laya.stage.designWidth - Laya.stage.width) / 2;
    }
    static get offsetY() {
      return (Laya.stage.designHeight - Laya.stage.height) / 2;
    }
  };
  GlobalConfig._sdkName = "";
  /** 当前版本 */
  GlobalConfig.VERSION = 1;
  /** 是否是调试模式 */
  GlobalConfig.IS_DEBUG = false;

  // src/common/Queue.ts
  var Queue = class {
    constructor() {
      this.count = 0;
      this.lowestCount = 0;
      this.items = /* @__PURE__ */ new Map();
    }
    push(value) {
      this.count += 1;
      this.items.set(this.count, value);
    }
    pop() {
      if (this.isEmpty()) {
        return void 0;
      }
      let value = this.items.get(this.lowestCount);
      this.items.delete(this.lowestCount);
      this.lowestCount += 1;
      return value;
    }
    isEmpty() {
      if (this.items.size == 0) {
        return true;
      }
      return false;
    }
    clear() {
      this.items = /* @__PURE__ */ new Map();
      this.count = 0;
      this.lowestCount = 0;
    }
    len() {
      return this.items.size;
    }
  };

  // src/modules/base/manager/LoaderManager.ts
  var LoaderManager = class _LoaderManager {
    constructor() {
      //加载资源名字路径映射
      this.nameToPath = {};
      //预加载资源列表，这里的资源不能被释放，需要提供完整的路径
      this.preloadListLock = [];
      //预加载资源列表，这里的资源只是为了功能显示更流畅，会被gc释放，需要提供完整的路径
      this.preloadList = [];
      this._isInit = false;
      this.limitSec = 1 / 30 * 1e3 * 1;
    }
    static get instance() {
      if (!this._instance) {
        this._instance = new _LoaderManager();
        this._instance.onInst();
      }
      return this._instance;
    }
    onInst() {
      this.m_queue = new Queue();
      this.urlToReference = /* @__PURE__ */ new Map();
      this.needClearResList = /* @__PURE__ */ new Map();
    }
    init(complete, forceInit = false) {
      if (this._isInit && !forceInit)
        return;
      let preloadUrls = this.preloadListLock.concat(this.preloadList);
      Laya.loader.load(preloadUrls, Laya.Handler.create(this, () => {
        let nameToPathRes = Laya.loader.getRes("resources/config/nameToPath.json");
        if (nameToPathRes) {
          let imgRes = nameToPathRes.data["image"];
          for (let imageName in imgRes) {
            this.nameToPath[imageName] = imgRes[imageName];
          }
          let prefabRes = nameToPathRes.data["prefab"];
          for (let prefabName in prefabRes) {
            this.nameToPath[prefabName] = prefabRes[prefabName];
          }
        }
        for (let i = 0; i < this.preloadListLock.length; i++) {
          let url = this.preloadListLock[i];
          let res = Laya.loader.getRes(url);
          if (!res) {
            console.log("load preloadListLock fail !!");
            return;
          }
          res.lock = true;
        }
        complete == null ? void 0 : complete.runWith(null);
      }), Laya.Handler.create(this, (progress) => {
        if (!Laya.LayaEnv.isPlaying) {
          return;
        }
      }, null, false));
    }
    update() {
      this.dealLoadLoop();
      this.dealClearResLoop();
    }
    dealLoadLoop() {
      if (this.m_queue.isEmpty()) {
        return;
      }
      let len = this.m_queue.len();
      while (len > 0) {
        const handler = this.m_queue.pop();
        if (!handler) {
          break;
        }
        let _res = handler.args && handler.args[0];
        handler.runWith(_res);
        if (Laya.stage.getTimeFromFrameStart() > this.limitSec) {
          break;
        }
      }
    }
    dealClearResLoop() {
      if (Laya.loader.loading) {
        return;
      }
      let size = this.needClearResList.size;
      if (size <= 0) {
        return;
      }
      for (let url of this.needClearResList.keys()) {
      }
      this.needClearResList.clear();
    }
    load(url, complete, progress, type, priority, cache, group, ignoreCache, useWorkerLoader) {
      if (url instanceof Array) {
        for (let i = 0; i < url.length; i++) {
          url[i] = this.getResPath(url[i]);
        }
      } else {
        url = this.getResPath(url);
      }
      let self = this;
      let newHandler;
      if (complete) {
        let nowCaller = complete.caller;
        newHandler = Laya.Handler.create(this, function(res) {
          let hd = Laya.Handler.create(self, function(res2) {
            if (complete.caller == null || complete.caller != nowCaller) {
              return;
            }
            complete.runWith(res2);
          });
          let handlerArg = [res];
          hd.args = handlerArg;
          self.m_queue.push(hd);
        });
      }
      Laya.loader.load(url, newHandler, progress, type, priority, cache, group, ignoreCache, useWorkerLoader);
    }
    //预制件加载
    loadPrefab(url, complete, isCreate, createFunc, progress, type, priority, cache, group, ignoreCache, useWorkerLoader) {
      let self = this;
      let newHandler;
      url = this.getResPath(url);
      let nowCaller = complete.caller;
      newHandler = Laya.Handler.create(this, function(res) {
        let hd = Laya.Handler.create(self, function(res2) {
          if (complete.caller == null || complete.caller != nowCaller) {
            return;
          }
          let _res = res2;
          if (isCreate && _res != null) {
            if (createFunc) {
              _res = createFunc.runWith(res2);
            } else {
              _res = res2.create();
            }
            self.addPrefabReference(url);
          }
          complete.runWith(_res);
        });
        let handlerArg = [res];
        hd.args = handlerArg;
        self.m_queue.push(hd);
      });
      return Laya.loader.load(url, newHandler, progress, type, priority, cache, group, ignoreCache, useWorkerLoader);
    }
    //增加预制件引用计数,根据计数释放预制件资源，进而释放prefab引用的资源，而不用gc释放
    addPrefabReference(url) {
      url = this.getResPath(url);
      let referenece = this.urlToReference.get(url);
      if (referenece == void 0) {
        referenece = 0;
      }
      referenece = referenece + 1;
      this.urlToReference.set(url, referenece);
      this.needClearResList.delete(url);
    }
    //销毁预制件
    destroyPrefab(url, node) {
      url = this.getResPath(url);
      if (node) {
        node.destroy(true);
      }
      this.removePrefabReference(url);
    }
    //减少预制件引用计数
    removePrefabReference(url) {
      url = this.getResPath(url);
      let referenece = this.urlToReference.get(url);
      if (referenece == void 0) {
        console.error("RemovePrefabReference error ,url:", url);
        return;
      }
      referenece = referenece - 1;
      this.urlToReference.set(url, referenece);
      if (referenece <= 0) {
        this.needClearResList.set(url, true);
        this.urlToReference.delete(url);
      }
    }
    getResPath(name) {
      if (!this.nameToPath[name]) {
        return name;
      }
      return this.nameToPath[name];
    }
    destroyRes(name, checkObj) {
      let url = this.getResPath(name);
      if (!url) {
        console.log("DestoryRes name is unlegal,name:", name);
        return;
      }
      Laya.loader.clearRes(url, checkObj);
    }
    //这里拿的是laya管理的缓存资源，不一定存在，可能会被gc或者其他地方删除
    getRes(url, type) {
      url = this.getResPath(url);
      return Laya.loader.getRes(url, type);
    }
    gc() {
      Laya.Resource.destroyUnusedResources();
    }
  };

  // src/modules/base/manager/SoundManager.ts
  var SoundManager = class _SoundManager {
    constructor() {
      this.soundPath = "resources/sound/";
      this.isOpenMusic = true;
      this.musicVolume = 1;
      this.isOpenSound = true;
      this.isInit = false;
    }
    static get instance() {
      if (!this._instance) {
        this._instance = new _SoundManager();
      }
      return this._instance;
    }
    init() {
      Laya.SoundManager.useAudioMusic = false;
      this.isInit = true;
    }
    //播放音效  loops循环次数,0表示无限循环
    PlaySound(soundId) {
      let cfg = ConfigManager.instance.cfg_soundCache.get(soundId);
      if (!cfg) {
        return;
      }
      let name = cfg.name;
      let url = this.soundPath + name + ".mp3";
      let volume = Laya.SoundManager.soundVolume;
      if (Laya.loader.getRes(url)) {
        this._PlaySound(url, volume, 1, true);
      } else {
        LoaderManager.instance.load(url, Laya.Handler.create(this, this._PlaySound, [url, volume, 1]));
      }
    }
    _PlaySound(url, volume, loops, res) {
      if (!res) {
        return;
      }
      if (this.isOpenSound) {
        this.SetSoundVolume(volume, url);
      }
      Laya.SoundManager.playSound(url, loops);
    }
    SetSoundVolume(volume, url) {
      Laya.SoundManager.soundVolume = volume;
    }
    IsOpenSound(isOpenSound) {
      this.isOpenSound = isOpenSound;
      if (isOpenSound) {
        this.SetSoundVolume(1);
      } else {
        this.SetSoundVolume(0);
      }
    }
    //播放背景音乐
    PlayMusic(soundId) {
      if (!this.isInit) {
        return;
      }
      if (this.musicId == soundId) {
        return;
      }
      let cfg = ConfigManager.instance.cfg_musicCache.get(soundId);
      if (!cfg) {
        return;
      }
      let name = cfg.name;
      if (this.musicId != null && this.musicId == soundId) {
        return;
      }
      if (this.musicRes != null && this.musicRes == name) {
        return;
      }
      this.musicId = soundId;
      let url = this.soundPath + name + ".mp3";
      let volume = Laya.SoundManager.musicVolume;
      this.musicRes = name;
      if (Laya.loader.getRes(url)) {
        this._PlayMusic(soundId, url, volume, true);
      } else {
        LoaderManager.instance.load(url, Laya.Handler.create(this, this._PlayMusic, [soundId, url, volume]));
      }
    }
    _PlayMusic(musicId, url, volume, res) {
      if (this.musicId != musicId) {
        return;
      }
      if (!res) {
        return;
      }
      if (this.music) {
        this.music.stop && this.music.stop();
        this.music = null;
      }
      this.musicVolume = volume;
      this.music = Laya.SoundManager.playMusic(url, 0);
    }
    SetMusicVolume(volume) {
      if (volume == null) {
        volume = this.musicVolume;
      }
      Laya.SoundManager.musicVolume = volume;
    }
    StopMusic() {
      if (this.music != null) {
        this.music.stop && this.music.stop();
      }
      this.music = null;
      this.musicId = null;
    }
    //暂停
    PauseMusic() {
      if (this.music == null) {
        return;
      }
      this.music.pause && this.music.pause();
    }
    //继续
    ResumeMusic() {
      if (this.music == null) {
        return;
      }
      this.music.resume && this.music.resume();
    }
    IsOpenMusic(isOpenMusic) {
      this.isOpenMusic = isOpenMusic;
      if (isOpenMusic) {
        this.SetMusicVolume();
      } else {
        this.SetMusicVolume(0);
      }
    }
  };

  // src/modules/base/UrlConfig.ts
  var _UrlConfig = class _UrlConfig {
    static init() {
    }
  };
  _UrlConfig.BASE_RES_URL = "resources/";
  _UrlConfig.BASE_SOUND_URL = _UrlConfig.BASE_RES_URL + "sound/";
  _UrlConfig.BASE_SPINE_URL = _UrlConfig.BASE_RES_URL + "spine/";
  _UrlConfig.BASE_SPRITE_URL = _UrlConfig.BASE_RES_URL + "sprite/";
  _UrlConfig.BASE_URL = _UrlConfig.BASE_SPRITE_URL + "base/";
  _UrlConfig.COMMON_URL = _UrlConfig.BASE_SPRITE_URL + "common/";
  _UrlConfig.DIALOG_BG_URL = _UrlConfig.BASE_SPRITE_URL + "dialogBg/";
  _UrlConfig.COMMON_DIALOG_MASK_BG = _UrlConfig.BASE_URL + "black.png";
  var UrlConfig = _UrlConfig;

  // src/modules/base/manager/UIManager.ts
  var UIManager = class _UIManager {
    constructor() {
      this.canvasHeight = 0;
      this.canvasWidth = 0;
      this.maxHeight = 1600;
      this.wxPosY = null;
      this.wxHegiht = null;
      this.dialogList = {};
      this.layers = [];
      this.dialogNameGroup = {};
      let stageHeight = Laya.stage.designHeight;
      let stageWidth = Laya.stage.designWidth;
      this.uiRoot = UIUtil.createCanvas(Laya.stage, { name: "UIRoot", width: stageWidth, height: stageHeight, isMouseThrough: true });
      for (let i = 0; i < 14 /* End */; i++) {
        let node = UIUtil.createCanvas(this.uiRoot, { name: UILayer[i], width: stageWidth, height: stageHeight, isMouseThrough: true });
        this.layers.push(node);
      }
      this.addBlackSideSprite();
      this.addGameMasterBtn();
      this.setScaleMode();
      Laya.stage.on(Laya.Event.RESIZE, this, this.setScaleMode);
    }
    static get instance() {
      if (!_UIManager._instance) {
        _UIManager._instance = new _UIManager();
      }
      return _UIManager._instance;
    }
    init() {
    }
    createDialog(cls, clsBase, module, layer, args) {
      let name = cls.name;
      if (this.dialogList[name]) {
        return;
      }
      let dialog = new cls();
      if (!dialog.isCanOpen(args))
        return;
      this.dialogList[name] = dialog;
      if (!this.dialogNameGroup[layer]) {
        this.dialogNameGroup[layer] = [];
      }
      this.dialogNameGroup[layer].push(name);
      dialog.createRoot(this.layers[layer], cls, clsBase, module, layer, args);
      this.checkDialogBgMusic();
      return dialog;
    }
    destroyDialog(name) {
      let dialog = this.dialogList[name];
      if (!dialog)
        return;
      dialog.destroyRoot();
      delete this.dialogList[name];
      let list = this.dialogNameGroup[dialog.layer];
      if (list && list.length > 0) {
        let index = list.indexOf(name);
        if (index != -1) {
          list.splice(index, 1);
        }
      }
    }
    getDialog(name) {
      return this.dialogList[name];
    }
    getLayer(layer) {
      return this.layers[layer];
    }
    checkDialogBgMusic() {
      let keys = Object.keys(UILayer).reverse();
      for (let i = 0; i < keys.length; i++) {
        let layer = keys[i];
        let list = this.dialogNameGroup[layer];
        if (list && list.length > 0) {
          for (let j = list.length; j >= 0; j--) {
            let name = list[j];
            if (ConfigManager.instance.cfg_musicCache.get_by_field("ui_name", name)) {
              SoundManager.instance.PlayMusic(ConfigManager.instance.cfg_musicCache.get_by_field("ui_name", name).id);
              return;
            }
          }
        }
      }
    }
    setScaleMode() {
      let physicsW = Laya.Browser.width;
      let physicsH = Laya.Browser.height;
      if (this.canvasHeight == physicsH && this.canvasWidth == physicsW) {
        return;
      }
      this.canvasHeight = physicsH;
      this.canvasWidth = physicsW;
      let phycicsScale = physicsW / physicsH;
      if (physicsW / physicsH < Laya.stage.designWidth / Laya.stage.designHeight) {
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_WIDTH;
      } else {
        Laya.stage.scaleMode = Laya.Stage.SCALE_FIXED_HEIGHT;
      }
      let adaptionBlack = true;
      if (Laya.stage.scaleMode == Laya.Stage.SCALE_FIXED_WIDTH) {
        let stageH = physicsH / (physicsW / Laya.stage.designWidth);
        let height = stageH > this.maxHeight ? this.maxHeight : stageH;
        let posY = 0;
        if (stageH > this.maxHeight) {
          posY = (stageH - this.maxHeight) / 2;
        }
        if (Laya.LayaEnv.isPreview && this.canvasHeight == 1600 && this.canvasWidth == 720) {
          this.wxHegiht = 1560;
          this.wxPosY = 90;
          height = 1510;
          posY = 90;
        } else {
          this.wxPosY = null;
          this.wxHegiht = null;
        }
        this.uiRoot.height = height;
        for (let layer in this.layers) {
          this.layers[layer].height = height;
        }
        for (let layer in this.layers) {
          this.layers[layer].pos(0, posY);
        }
        if (this.wxHegiht && this.wxHegiht >= this.maxHeight || height > this.maxHeight && posY > 0) {
          adaptionBlack = true;
        } else {
          adaptionBlack = false;
        }
        if (adaptionBlack) {
          this.adaptionBlackSide(null, posY);
        } else {
          this.adaptionBlackSide(null, null);
        }
      } else {
        for (let layer in this.layers) {
          this.layers[layer].height = Laya.stage.designHeight;
        }
        let posX = (phycicsScale * Laya.stage.designHeight - Laya.stage.designWidth) / 2;
        for (let layer in this.layers) {
          this.layers[layer].pos(posX, 0);
        }
        this.adaptionBlackSide(posX);
      }
      for (let dialog in this.dialogList) {
        this.dialogList[dialog].freshLayout();
      }
    }
    //增加黑边Node
    addBlackSideSprite() {
      let node = new Laya.Sprite();
      node.name = "BlackSideNode";
      this.blackSideNode = node;
      Laya.stage.addChild(node);
    }
    addGameMasterBtn() {
      if (!GlobalConfig.IS_DEBUG) {
        return;
      }
      let btn = new Laya.Button();
      btn.name = "GameMasterBtn";
      btn.stateNum = 1;
      btn.size(40, 40);
      btn.left = 10;
      btn.top = 200;
      btn.skin = UrlConfig.BASE_URL + "gm.png";
      btn.on(Laya.Event.CLICK, () => {
        DispatchManager.dispatchEvent("OPEN_GAME_MASTER_DIALOG" /* OPEN_GAME_MASTER_DIALOG */);
      });
      this.getLayer(7 /* GameHelp */).addChild(btn);
    }
    //补黑边 posX左右补边，posY上下补边
    adaptionBlackSide(posX, posY) {
      this.blackSideNode.destroyChildren();
      if (posX == null && posY == null) {
        return;
      }
      if (Laya.stage.scaleMode == Laya.Stage.SCALE_FIXED_HEIGHT) {
        let spH = Laya.stage.designHeight;
        let leftSp = new Laya.Sprite();
        leftSp.graphics.drawRect(0, 0, posX, spH, "#000000");
        leftSp.name = "leftSpr";
        this.blackSideNode.addChild(leftSp);
        let rightSp = new Laya.Sprite();
        rightSp.pos(Laya.stage.designWidth + posX, 0);
        rightSp.name = "rightSpr";
        rightSp.graphics.drawRect(0, 0, posX, spH, "#000000");
        this.blackSideNode.addChild(rightSp);
      } else {
        let spW = Laya.stage.designWidth;
        let topSp = new Laya.Sprite();
        topSp.graphics.drawRect(0, 0, spW, posY, "#000000");
        topSp.name = "topSpr";
        this.blackSideNode.addChild(topSp);
        let bottomSp = new Laya.Sprite();
        bottomSp.pos(0, this.maxHeight + posY);
        bottomSp.graphics.drawRect(0, 0, spW, posY, "#000000");
        bottomSp.name = "bottomSpr";
        this.blackSideNode.addChild(bottomSp);
      }
    }
  };
  var UILayer = /* @__PURE__ */ ((UILayer2) => {
    UILayer2[UILayer2["Fight"] = 0] = "Fight";
    UILayer2[UILayer2["Login"] = 1] = "Login";
    UILayer2[UILayer2["Main"] = 2] = "Main";
    UILayer2[UILayer2["UI"] = 3] = "UI";
    UILayer2[UILayer2["PopUp"] = 4] = "PopUp";
    UILayer2[UILayer2["Tips"] = 5] = "Tips";
    UILayer2[UILayer2["Message"] = 6] = "Message";
    UILayer2[UILayer2["GameHelp"] = 7] = "GameHelp";
    UILayer2[UILayer2["Guide"] = 8] = "Guide";
    UILayer2[UILayer2["Notice"] = 9] = "Notice";
    UILayer2[UILayer2["Loading"] = 10] = "Loading";
    UILayer2[UILayer2["Reconnet"] = 11] = "Reconnet";
    UILayer2[UILayer2["Waitting"] = 12] = "Waitting";
    UILayer2[UILayer2["UI3D"] = 13] = "UI3D";
    UILayer2[UILayer2["End"] = 14] = "End";
    return UILayer2;
  })(UILayer || {});

  // src/modules/base/BaseController.ts
  var _BaseController = class _BaseController {
    constructor() {
      this.initModuleListeners();
      this.initNetListeners();
    }
    static init() {
      _BaseController._connect = Connection.instance;
    }
    initModuleListeners() {
    }
    initNetListeners() {
    }
    reset() {
    }
    addSocketListener(type, handler) {
      _BaseController._connect.addSocketListener(type, this, handler);
    }
    removeSocketListener(type, handler) {
      _BaseController._connect.removeSocketListener(type, this, handler);
    }
    addEventListener(type, caller, listener, args = null) {
      DispatchManager.addEventListener(type, caller, listener, args);
    }
    addEventListenerOnce(type, caller, listener, args = null) {
      DispatchManager.addEventListenerOnce(type, caller, listener, args);
    }
    removeEventListener(type, caller, listener, onceOnly = false) {
      DispatchManager.removeEventListener(type, caller, listener, onceOnly);
    }
    removeEventListenerAll(type = null) {
      DispatchManager.removeEventListenerAll(type);
    }
    dispatchEvent(type, data = null) {
      DispatchManager.dispatchEvent(type, data);
    }
    registerDialog(cls, clsBase, module, openEvent, closeEvent = null, layer = 3 /* UI */) {
      cls["openEvent"] = openEvent;
      cls["closeEvent"] = closeEvent;
      this.addEventListener(openEvent, this, this.baseOpenDialog, [cls, clsBase, module, layer]);
      if (closeEvent) {
        this.addEventListener(closeEvent, this, _BaseController.baseCloseDialog, [cls]);
      }
    }
    baseOpenDialog(cls, clsBase, module, layer, args) {
      UIManager.instance.createDialog(cls, clsBase, module, layer, args);
    }
    static baseCloseDialog(cls) {
      UIManager.instance.destroyDialog(cls.name);
    }
  };
  _BaseController._connect = null;
  var BaseController = _BaseController;

  // src/modules/base/BaseScript.ts
  var BaseScript = class extends Laya.Script {
    constructor() {
      super(...arguments);
      this.eventHandlerList = [];
    }
    get ownerSpr() {
      return this.owner;
    }
    onAdded() {
      this.initData();
      this.initUI();
      this.addClick();
      this.addEvent();
      super.onAdded();
    }
    initData() {
    }
    initUI() {
    }
    addClick() {
    }
    addEvent() {
    }
    /**
        * 根据子节点的名字，获取子节点对象。
        * @param	name 子节点的名字。
        * @return	节点对象。
        */
    getChildByName(name) {
      if (!this.owner)
        return null;
      return this.owner.getChildByName(name);
    }
    /**
     * 场景时钟
     * @override
     */
    get timer() {
      return this.owner && this.owner.timer || Laya.timer;
    }
    /**
     * <p>延迟运行指定的函数。</p>
     * <p>在控件被显示在屏幕之前调用，一般用于延迟计算数据。</p>
     * @param method 要执行的函数的名称。例如，functionName。
     * @param args 传递给 <code>method</code> 函数的可选参数列表。
     *
     */
    callLater(method, args = null) {
      this.timer.callLater(this, method, args);
    }
    onDestroy() {
      this.removeEventListenerAllCaller();
      super.onDestroy();
    }
    /**添加监听事件 */
    addEventListener(type, caller, listener, args = null) {
      let handler = DispatchManager.addEventListener(type, caller, listener, args);
      handler && this.eventHandlerList.push(handler);
    }
    removeEventListenerAllCaller() {
      for (let i = 0; i < this.eventHandlerList.length; i++) {
        let handler = this.eventHandlerList[i];
        DispatchManager.removeEventListener(handler.type, handler.caller, handler.method);
      }
      this.eventHandlerList.length = 0;
    }
    /**派发事件 */
    dispatchEvent(type, data = null) {
      DispatchManager.dispatchEvent(type, data);
    }
    // /**添加特效*/
    // public ShowEffect(name: string, parent: Laya.Sprite, isLoop: boolean = false, posX: number = 0, posY: number = 0, action: string = AnimationManager.DEFALT_ACTION): CCAnimation {
    //     let eff = EffectUtil.ShowEffect(name, parent, isLoop, posX, posY, action);
    //     eff.visible = true;
    //     return eff;
    // }
    // public HideEffect(name: string, parent: Laya.Sprite): void {
    //     if (!parent) return;
    //     var eff: CCAnimation = parent.getChildByName(name) as CCAnimation;
    //     if (eff) {
    //         eff.visible = false;
    //     }
    // }
    // /**添加特效到父对象的中部位置**/
    // public ShowEffectCenter(name: string, parent: Sprite, isLoop: boolean = false, posX: number = 0, posY: number = 0, action: string = AnimationManager.DEFALT_ACTION): CCAnimation {
    //     var x: number = posX + parent.width / 2;
    //     var y: number = posY + parent.height / 2;
    //     return this.ShowEffect(name, parent, isLoop, x, y, action);
    // }
    // /**添加特效到父对象的中下部**/
    // public ShowEffectCB(name: string, parent: any, isLoop: boolean = false, posX: number = 0, posY: number = 0, action: string = AnimationManager.DEFALT_ACTION): CCAnimation {
    //     var x: number = posX + parent.width / 2;
    //     var y: number = posY + parent.height;
    //     return this.ShowEffect(name, parent, isLoop, x, y, action);
    // }
    // /**添加特效到父对象的中上部**/
    // public ShowEffectCT(name: string, parent: any, isLoop: boolean = false, posX: number = 0, posY: number = 0, action: string = AnimationManager.DEFALT_ACTION): CCAnimation {
    //     var x: number = posX + parent.width / 2;
    //     var y: number = posY;
    //     return this.ShowEffect(name, parent, isLoop, x, y, action);
    // }
    getParameterValue(parameter, valueName, defVal = null) {
      if (parameter != null && parameter[valueName] != void 0 && parameter[valueName] != null) {
        return parameter[valueName];
      }
      return defVal;
    }
  };

  // src/modules/common/controller/CommonController.ts
  var CommonController = class _CommonController extends BaseController {
    constructor() {
      super();
      _CommonController.instance = this;
    }
    initModuleListeners() {
    }
    initNetListeners() {
    }
    reset() {
      super.reset();
    }
    //-------------协议接收 start -------------
    //-------------协议接收 end ---------------
  };

  // src/sdk/vo/MiniSdkVo.ts
  var SdkSubmitVo = class {
    constructor() {
      this.dataType = 1;
      this.roleid = "";
      this.serverId = "";
      this.serverName = "";
      this.roleName = "";
      this.roleLevel = "";
      this.rolePower = "";
      this.roleCreateTime = "";
      this.roleLevelUpTime = "";
      this.vipLevel = "";
      this.coinNum = "";
      this.familyName = "";
      this.roleOnlineMinute = "";
      this.roleGuajiPass = "";
    }
  };
  var SdkPayVo = class {
    constructor() {
      this.cp_order_id = "";
      this.cp_notify_url = "";
      // 游戏自己的充值回调地址
      this.fs_notify_url = "";
      // 融合的充值回调地址
      this.fsBillNo = "";
      this.callType = "";
      this.payMoney = 0;
      this.accountName = "";
      this.serverId = "";
      this.serverName = "";
      this.roleId = "";
      this.roleName = "";
      this.roleLevel = "";
      this.vipLevel = "";
      this.rolePower = "";
      this.goodsId = "";
      this.goodsName = "";
      this.goodsDesc = "";
      this.exchangeGol = "";
      this.familyName = "";
      this.familyId = "";
      this.role_create_time = "";
      this.coinNum = "";
      this.total_pay_money = "";
      this.roleGuajiPass = "";
      this.userId = "";
    }
  };

  // src/sdk/SdkBaseAdapter.ts
  var SdkBaseAdapter = class {
    initSetting() {
    }
    getSdkInstance() {
    }
    init(param) {
    }
    login(param, succCallback, failCallback) {
    }
    pay(payInfo, jsPayArgs = null, callback) {
      return null;
    }
    reboot() {
    }
    isLogout() {
      return false;
    }
    supportAd() {
      return false;
    }
    logOut(param, succCallback) {
    }
    exit(param = null, succCallback = null) {
    }
    /**提交角色数据 */
    submitRoleInfo(submitData) {
      return null;
    }
    /**埋点数据上报 */
    reportStepPoint(state) {
    }
    /**
    * 判断sdk是否支持功能
     */
    checkSdkSupportFunc(funcName) {
      return false;
    }
    /**
     * 调用sdk功能
     */
    callSdkFunc(funcName, params = null, callback = null) {
    }
    /**
         * 屏蔽词检测
         */
    // CheckMessage(info: ChatSdkVo) {
    //     // Laya.stage.event("UPDATE_SDK_MESSAGE_CHECK", info);
    // }
    getSdkPayVo(payInfo = null) {
      let vo = new SdkPayVo();
      vo.cp_order_id = payInfo["cp_order_id"];
      vo.cp_notify_url = payInfo["cp_notify_url"];
      vo.fs_notify_url = payInfo["fs_notify_url"];
      vo.fsBillNo = payInfo["fs_bill_no"];
      vo.callType = payInfo["call_type"];
      vo.payMoney = payInfo["pay_money"];
      vo.ext = payInfo["ext"] = "";
      vo.accountName = payInfo["account_name"];
      vo.serverId = payInfo["server_id"];
      vo.serverName = payInfo["server_name"];
      vo.roleId = payInfo["role_id"];
      vo.roleName = payInfo["role_name"];
      vo.roleLevel = payInfo["role_level"];
      vo.rolePower = payInfo["power"] || "0";
      vo.vipLevel = payInfo["vip_level"];
      vo.goodsId = payInfo["goods_id"];
      vo.goodsName = payInfo["goods_name"];
      vo.goodsDesc = payInfo["goods_desc"];
      vo.exchangeGol = payInfo["exchange_gol"];
      vo.familyName = payInfo["family_name"];
      vo.familyId = payInfo["family_id"];
      vo.role_create_time = payInfo["role_create_time"];
      vo.coinNum = payInfo["userRoleBalance"];
      return vo;
    }
    getSdkSubmitVo(submitData) {
      let vo = new SdkSubmitVo();
      vo.dataType = submitData["type"];
      vo.roleid = submitData["role_id"];
      vo.serverId = submitData["server_id"];
      vo.serverName = submitData["server_name"];
      vo.roleName = submitData["role_name"];
      vo.roleCreateTime = submitData["role_create_time"];
      vo.roleLevelUpTime = submitData["level_up_time"];
      vo.roleLevel = submitData["role_level"];
      vo.vipLevel = submitData["vip_level"];
      vo.coinNum = submitData["userRoleBalance"];
      vo.rolePower = submitData["power"];
      vo.familyName = submitData["family_name"];
      vo.roleOnlineMinute = submitData["roleOnlineMinute"];
      vo.roleGuajiPass = submitData["roleGuajiPass"];
      return vo;
    }
    checkMiniGamePay() {
    }
    //主动调用分享
    callShare(data = null) {
    }
    //是否代码混淆
    isCodeObfuscation() {
      return false;
    }
  };

  // src/sdk/miniSdk/qqMiniSdk/QQMiniSdkBaseAdapter.ts
  var QQMiniSdkBaseAdapter = class extends SdkBaseAdapter {
    get qq() {
      return Laya.Browser.window.qq;
    }
  };

  // src/sdk/miniSdk/qqMiniSdk/QQMiniSdkAdapter.ts
  var QQMiniSdkAdapter = class extends QQMiniSdkBaseAdapter {
  };

  // src/sdk/miniSdk/ttMiniSdk/TTMiniSdkBaseAdapter.ts
  var TTMiniSdkBaseAdapter = class extends SdkBaseAdapter {
    constructor() {
      super(...arguments);
      //#endregion
      //#region 添加桌面
      /**是否已添加桌面快捷方式 */
      this.isAddShortcut = false;
      //#endregion
      //#region 广告
      this.videoAd_Obj = null;
    }
    get tt() {
      return Laya.Browser.window.tt;
    }
    init(param) {
      this.initSetting();
    }
    initSetting() {
      this.createContactBtn();
      this.checkShortcut();
    }
    showModal(content, { title = "提示", confirmText = "确定", showCancel = true, cancelText = "取消", confirmHandler = null, cancelHandler = null } = {}) {
      if (this.tt.showModal) {
        this.tt.showModal({
          title,
          content,
          success(res) {
            if (res.confirm) {
              confirmHandler && confirmHandler.run();
            } else if (res.cancel) {
              cancelHandler && cancelHandler.run();
            }
          },
          fail(res) {
          },
          //失败回调
          complete(res) {
          }
          //完成回调
        });
      }
    }
    //#region 侧边栏
    get onshow_info() {
      return Laya.Browser.window.layadefine.getVal("onshow_info");
    }
    /**跳转侧边栏 */
    navigateToScene() {
      this.tt.navigateToScene({
        scene: "sidebar",
        success: (res) => {
          console.log("navigate to scene success");
        },
        fail: (res) => {
          console.log("navigate to scene fail: ", res);
        }
      });
    }
    /**创建客服按钮 */
    createContactBtn(clickHandler) {
      if (this.contactBtn) {
        return;
      }
      let self = this;
      self.tt.getSystemInfo({
        success: (res) => {
          let contactBtn = self.tt.createContactButton({
            type: "image",
            image: "resources/image/noAtlas/common/icon_contact.png",
            style: {
              left: 0,
              top: res.screenHeight - res.screenHeight / 1.15,
              width: 62,
              height: 72
            },
            success(res2) {
            },
            fail(res2) {
            },
            complete(res2) {
            }
          });
          contactBtn.onTap(() => {
            self.showContactBtn();
            clickHandler && clickHandler.run();
          });
          contactBtn.hide();
          self.contactBtn = contactBtn;
        },
        fail: (res) => {
        }
      });
    }
    /**点击客服按钮 */
    onClickContact() {
    }
    /**显示客服按钮 */
    showContactBtn() {
      if (this.contactBtn != null) {
        this.contactBtn.show();
      }
    }
    /**隐藏客服按钮 */
    hiddenContactBtn() {
      if (this.contactBtn != null) {
        this.contactBtn.hide();
      }
    }
    /** 检查小游戏快捷方式是否已添加到手机桌面上*/
    checkShortcut() {
      if (this.tt.checkShortcut) {
        let self = this;
        this.tt.checkShortcut({
          success(res) {
            self.isAddShortcut = res.status.exist;
            if (res.status.needUpdate) {
            }
          },
          fail(res) {
          },
          complete(res) {
          }
        });
      }
    }
    /** 添加桌面快捷方式 */
    addShortcut() {
      if (this.tt.addShortcut) {
        let self = this;
        this.tt.addShortcut({
          success(res) {
            self.isAddShortcut = true;
          },
          fail(res) {
          },
          //添加桌面快捷方式失败
          complete(res) {
          }
          //添加桌面快捷方式完成
        });
      }
    }
    //#endregion
    //#region  订阅
    /** 订阅消息 */
    requestSubscribeMessage(ids) {
      if (this.tt.requestSubscribeMessage) {
        let self = this;
        this.tt.requestSubscribeMessage({
          success(res) {
          },
          // 订阅消息成功
          fail(res) {
          },
          // 订阅消息失败
          complete(res) {
            self.showModal(JSON.stringify(res), { title: "订阅完成" });
          }
        });
      }
    }
    createRewardedVideoAd(vo) {
      if (!vo)
        return;
      const _createRewardedVideoAd = () => {
        if (this.tt.createRewardedVideoAd) {
          this.videoAd_Obj = this.tt.createRewardedVideoAd({
            adUnitId: vo.adUnitId,
            multiton: vo.multiton,
            multitonRewardMsg: vo.multitonRewardMsg,
            multitonRewardTimes: vo.multitonRewardTimes,
            progressTip: vo.progressTip
          });
          this.videoAd_Obj.onLoad((res) => {
            vo.onLoadHandler && vo.onLoadHandler.runWith(res);
          });
          this.videoAd_Obj.onError((res) => {
            vo.onErrorHandler && vo.onErrorHandler.runWith(res);
          });
          this.videoAd_Obj.onClose((res) => {
            vo.onCloseHandler && vo.onCloseHandler.runWith(res);
          });
          this.videoAd_Obj.load().then(() => {
            this.videoAd_Obj.show();
          });
        }
      };
      if (this.videoAd_Obj) {
        this.videoAd_Obj.destroy().then(() => {
          this.videoAd_Obj = null;
          _createRewardedVideoAd();
        });
      } else {
        _createRewardedVideoAd();
      }
    }
    createInterstitialAd() {
    }
    //     const interstitiaAd = tt.createInterstitialAd();
    //     canReTry = true;
    //     interstitiaAd.onLoad(onLoadHandle); //创建会自动load
    //     function onLoadHandle() {
    //     interstitiaAd.show().then(() => {
    //         console.log("插屏广告展示成功");
    //     });
    // }
    // interstitiaAd.onError(onErrorHandle); // 自动load 的失败会走到这里
    // function onErrorHandle(err) {
    //     // 这里要等待一定时间后，或者等待下次需要展示的时候，参考频控，尝试一次，或者几次，不能一直尝试。
    //     if (canReTry) {
    //         canReTry = false;
    //         interstitiaAd.load(); //如果需要，这里等待一定时间后，或者等待下次需要展示的时候，再次 load->onLoad-> show。
    //     } else {
    //         tt.showToast({
    //             title: "暂无广告",
    //             icon: "none",
    //         });
    //     }
    // }
    //#endregion
  };

  // src/sdk/miniSdk/ttMiniSdk/TTMiniSdkAdapter.ts
  var TTMiniSdkAdapter = class extends TTMiniSdkBaseAdapter {
    getSdkInstance() {
      return this.tt;
    }
    initSetting() {
      super.initSetting();
    }
    checkSdkSupportFunc(funcName) {
      switch (funcName) {
        case "addShortcut" /* addShortcut */:
          return !this.isAddShortcut;
        default:
          return false;
      }
    }
    callSdkFunc(funcName, params, callback) {
      switch (funcName) {
        case "addShortcut" /* addShortcut */:
          this.addShortcut();
          break;
        case "ttGameNavigateToSceneStatus" /* ttGameNavigateToSceneStatus */:
          break;
        case "ttGameNavigateToScene" /* ttGameNavigateToScene */:
          this.navigateToScene();
          break;
        case "ttGameSubscribeMessage" /* ttGameSubscribeMessage */:
          this.requestSubscribeMessage(params);
          break;
        default:
          break;
      }
    }
  };

  // src/sdk/miniSdk/wxMiniSdk/WXMiniSdkBaseAdapter.ts
  var WXMiniSdkBaseAdapter = class extends SdkBaseAdapter {
    constructor() {
      super(...arguments);
      /** 激励视频广告对象 */
      this.videoAdObj = null;
      /** 激励视频广告ID */
      this.videoAdObj_ADID = "";
      /** 激励视频广告加载状态 */
      this.videoAdLoadState = false;
      /** 激励视频广告关闭回调 */
      this.videoAdOnClose = null;
    }
    get wx() {
      return Laya.Browser.window.wx;
    }
    init(param) {
      this.initSetting();
    }
    initSetting() {
      this.setOnShowCallBack();
      this.checkVersionUpdate();
      this.checkShareMenu();
    }
    createVideo() {
    }
    setOnShowCallBack(callback = null) {
      let self = this;
      if (self.wx.onShow) {
        self.wx.onShow((res) => {
          this.setKeepScreenOn();
          callback && callback.run();
        });
      }
    }
    /**
     * 设置屏幕常亮
     */
    setKeepScreenOn(show = true) {
      if (this.wx.setKeepScreenOn) {
        this.wx.setKeepScreenOn({
          keepScreenOn: show,
          success: function(res) {
            console.log("设置屏幕常亮成功", res);
          },
          fail: function(res) {
            console.log("设置屏幕常亮失败", res);
          },
          complete: function(res) {
            console.log("设置屏幕常亮完成", res);
          }
        });
      }
    }
    /**
       * 设置系统剪贴板的内容
       * 需要开权限,比较麻烦,最好不要用
       */
    setClipboardData(val) {
      let self = this;
      if (self.wx.setClipboardData) {
        self.wx.setClipboardData({
          data: val,
          success(res) {
            self.wx.getClipboardData({
              success(res2) {
                console.log("设置剪切板内容成功", res2);
              }
            });
          },
          fail: function(res) {
            console.log("设置剪切板内容失败", res);
            self.wx.showToast({
              title: "复制失败"
            });
          }
        });
      }
    }
    checkVersionUpdate() {
      let self = this;
      if (self.wx.getUpdateManager) {
        const updateManager = self.wx.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {
        });
        updateManager.onUpdateReady(function() {
          self.wx.showModal({
            title: "更新提示",
            content: "新版本已经准备好，是否重启应用？",
            success: function(res) {
              if (res.confirm) {
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function() {
          Laya.timer.once(3e4, self, self.checkVersionUpdate);
        });
      }
    }
    /**创建激励视频广告 */
    createVideoAd(callback = null) {
      let self = this;
      if (Laya.Browser.onMiniGame && self.videoAdObj_ADID) {
        if (self.videoAdObj != null) {
          self.videoAdObj.destroy();
          self.videoAdObj = null;
        }
        if (self.wx.createRewardedVideoAd) {
          self.videoAdObj = self.wx.createRewardedVideoAd({
            adUnitId: self.videoAdObj_ADID
          });
          self.videoAdLoadState = false;
          self.videoAdObj.onLoad(() => {
            console.log("加载激励视频广告========>成功");
            self.videoAdLoadState = true;
            callback && callback.runWith(true);
          });
          self.videoAdObj.onError((err) => {
            console.log("加载激励视频广告========>失败", err);
            callback && callback.runWith(true);
          });
          self.videoAdObj.onClose((res) => {
            if (res.isEnded == true) {
              console.log("关闭激励视频广告========>看完了");
              self.videoAdLoadState = false;
              if (self.videoAdOnClose != null) {
                self.videoAdOnClose.runWith(1);
              }
            } else if (res.isEnded == false) {
              console.log("关闭激励视频广告========>未看完");
              self.videoAdLoadState = false;
              if (self.videoAdOnClose != null) {
                self.videoAdOnClose.runWith(0);
              }
            }
            self.videoAdLoadState = false;
            self.videoAdObj.load();
          });
          self.videoAdObj.load();
          console.log("创建激励视频广告========>");
        }
      } else {
        console.log("创建激励视频广告========>无广告ID");
        self.videoAdOnClose && self.videoAdOnClose.runWith(-1);
      }
    }
    /**
    * 显示激励视频广告
    * @param onClose 返回参数含义  -1:暂无广告（或处于加载状态，加载结果未知），0：没有看完广告，1：看完了广告
    */
    showVideoAd(onClose = null) {
      let self = this;
      if (Laya.Browser.onMiniGame && self.videoAdObj_ADID) {
        self.videoAdOnClose = onClose;
        if (self.videoAdObj == null) {
          console.log("显示激励视频========>未创建");
          self.createVideoAd(Laya.Handler.create(this, (res) => {
            if (res == true) {
              self.videoAdObj.show();
              console.log("显示激励视频广告========>");
            } else {
              if (self.videoAdOnClose != null) {
                self.videoAdOnClose.runWith(-1);
              }
              console.log("显示激励视频========>暂无广告");
            }
          }));
        } else if (self.videoAdLoadState == true) {
          self.videoAdObj.show();
          console.log("显示激励视频广告========>");
        }
      } else {
        if (onClose != null) {
          onClose.runWith(-1);
          console.log("显示激励视频========>无广告ID");
        }
      }
    }
    checkShareMenu() {
      this.showShareMenu();
    }
    showShareMenu() {
      if (this.wx.showShareMenu) {
        this.wx.showShareMenu({
          withShareTicket: true,
          menus: ["shareAppMessage", "shareTimeline"]
        });
      }
    }
    /**
         * 重启当前小程序
         * @param path 打开的页面路径，path 中 ? 后面的部分会成为 query
         */
    restartMiniProgram(path = "") {
      if (this.wx.restartMiniProgram) {
        this.wx.restartMiniProgram({
          path,
          success: function(res) {
            console.log("restartMiniProgram sucess:", res);
          },
          fail: function(res) {
            console.log("restartMiniProgram fail:", res);
          },
          complete: function(res) {
            console.log("restartMiniProgram complete:", res);
          }
        });
      }
    }
    /**
     * 打开另一个小程序
     * @param vo 
     */
    navigateToMiniProgram(vo) {
      if (this.wx.navigateToMiniProgram) {
        this.wx.navigateToMiniProgram({
          appId: vo.appId,
          path: vo.path,
          extraData: vo.extraData,
          envVersion: vo.envVersion,
          success: function(res) {
            console.log("navigateToMiniProgram sucess:", res);
          },
          fail: function(res) {
            console.log("navigateToMiniProgram fail:", res);
          },
          complete: function(res) {
            console.log("navigateToMiniProgram complete:", res);
          }
        });
      }
    }
    /**
     * 返回到上一个小程序。只有在当前小程序是被其他小程序打开时可以调用成功
     * @param extraData 回传数据
     */
    navigateBackMiniProgram(extraData = {}) {
      if (this.wx.navigateBackMiniProgram) {
        this.wx.navigateBackMiniProgram({
          extraData,
          success: function(res) {
            console.log("navigateBackMiniProgram sucess:", res);
          },
          fail: function(res) {
            console.log("navigateBackMiniProgram fail:", res);
          },
          complete: function(res) {
            console.log("navigateBackMiniProgram complete:", res);
          }
        });
      }
    }
    /**
     * 退出当前小程序
     */
    exitMiniProgram() {
      if (this.wx.exitMiniProgram) {
        this.wx.exitMiniProgram({
          success: function(res) {
            console.log("exitMiniProgram sucess:", res);
          },
          fail: function(res) {
            console.log("exitMiniProgram fail:", res);
          },
          complete: function(res) {
            console.log("exitMiniProgram complete:", res);
          }
        });
      }
    }
  };

  // src/sdk/miniSdk/wxMiniSdk/WXMiniSdkAdapter.ts
  var WXMiniSdkAdapter = class extends WXMiniSdkBaseAdapter {
    getSdkInstance() {
      return this.wx;
    }
    checkSdkSupportFunc(funcName) {
      if (funcName == "showVideoAd" /* showVideoAd */) {
        return true;
      } else if (funcName == "setClipboardData" /* setClipboardData */) {
        return true;
      }
      return false;
    }
    callSdkFunc(funcName, params, callback) {
      if (funcName == "showVideoAd" /* showVideoAd */) {
        return this.showVideoAd(callback);
      } else if (funcName == "setClipboardData" /* setClipboardData */) {
        return this.setClipboardData(params);
      }
    }
  };

  // src/sdk/SdkAdapterManager.ts
  var _SdkAdapterManager = class _SdkAdapterManager {
    static get instance() {
      if (this._instance == null) {
        this._instance = new _SdkAdapterManager();
      }
      return this._instance;
    }
    constructor() {
      this.init(null);
    }
    getAdapter() {
      return this.adapter;
    }
    init(data) {
      this.regSdkClass();
      this.adapter = this.createSdkAdapter();
      this.adapter.init(data);
    }
    regSdkClass() {
      if (Laya.Browser.onWXMiniGame) {
        Laya.ClassUtils.regClass("wx_minigame" /* wx_minigame */, WXMiniSdkAdapter);
      }
      if (Laya.Browser.onQQMiniGame) {
        Laya.ClassUtils.regClass("qq_minigame" /* qq_minigame */, QQMiniSdkAdapter);
      }
      if (Laya.Browser.onTTMiniGame) {
        Laya.ClassUtils.regClass("tt_minigame" /* tt_minigame */, TTMiniSdkAdapter);
      }
    }
    createSdkAdapter() {
      let adapter;
      if (!adapter) {
        let cls = Laya.ClassUtils.getClass(GlobalConfig.sdkName);
        if (cls) {
          adapter = new cls();
        }
      }
      if (!adapter) {
        if (Laya.Browser.onWXMiniGame) {
          adapter = new WXMiniSdkAdapter();
        } else if (Laya.Browser.onQQMiniGame) {
          adapter = new QQMiniSdkAdapter();
        } else if (Laya.Browser.onTTMiniGame) {
          adapter = new TTMiniSdkAdapter();
        }
      }
      if (!adapter) {
        adapter = new SdkBaseAdapter();
        console.warn("------------SdkAdapterManager createSdkAdapter 没有找到sdk适配器");
      }
      return adapter;
    }
  };
  _SdkAdapterManager._instance = null;
  var SdkAdapterManager = _SdkAdapterManager;

  // src/sdk/SdkManager.ts
  var _SdkManager = class _SdkManager {
    constructor() {
      this._isInitSucc = false;
      this.init();
    }
    static get instance() {
      if (this._instance == null)
        this._instance = new _SdkManager();
      return this._instance;
    }
    init() {
      if (this._isInitSucc) {
        return;
      }
      this.sdkAdapter = SdkAdapterManager.instance.getAdapter();
      this._isInitSucc = true;
    }
    /**
         * 判断sdk是否支持功能
         * @param icon_id 
         */
    checkSdkSupportFunc(funcName) {
      let isSupport = false;
      if (this.sdkAdapter) {
        isSupport = this.sdkAdapter.checkSdkSupportFunc(funcName);
      }
      return isSupport;
    }
    /**
    * 调用sdk功能
    */
    callSdkFunc(funcName, param = null) {
      let ret = null;
      if (this.sdkAdapter) {
        ret = this.sdkAdapter.callSdkFunc(funcName, param);
      }
      return ret;
    }
  };
  _SdkManager._instance = null;
  var SdkManager = _SdkManager;

  // src/util/StringUtil.ts
  var _StringUtil = class _StringUtil {
    /**
     * 文本格式化(带一个参数)
     * @param value 文本类容
     * @param param  需要格式化的类容
     * **/
    static Format(value, param, index = 0) {
      return value.replace(_StringUtil.GerRegExp(index), param);
    }
    /**
     * 文本格式化 (带两个参数)
     * **/
    static Format2(value, param1, param2) {
      return value.replace(_StringUtil.GerRegExp(0), param1).replace(_StringUtil.GerRegExp(1), param2);
    }
    /**
     * 文本格式化(带三个参数)
     * **/
    static Format3(value, param1, param2, param3) {
      return value.replace(_StringUtil.GerRegExp(0), param1).replace(_StringUtil.GerRegExp(1), param2).replace(_StringUtil.GerRegExp(2), param3);
    }
    /**
     * 文本格式化(带Array数组)
     * **/
    static FormatArr(value, paramArr = null) {
      let index = 0;
      if (paramArr != null) {
        for (let len = paramArr.length; index < len; index++) {
          let param = paramArr[index];
          value = value.replace(_StringUtil.GerRegExp(index), param);
        }
      }
      return value;
    }
    /**返根据替换的位置返回正则表达式**/
    static GerRegExp(index) {
      return new RegExp("\\{" + index + "\\}", "g");
    }
    /**
     * 判断字符串是否为空
     * @param str 
     */
    static isEmpty(str) {
      return !(str && str != "");
    }
    static replaceAll(value, p, repl) {
      if (_StringUtil.isEmpty(value) == false) {
        return value.split(p).join(repl);
      }
      return value;
    }
    /** 阿拉伯数字转汉字 目前最大倆位数 */
    static numberToCN(value, chineseType = 1) {
      let CN_NUMBER = _StringUtil.CN_NUMBER;
      if (chineseType != 1) {
        CN_NUMBER = _StringUtil.CN_NUMBER2;
      }
      if (value <= 10) {
        return CN_NUMBER[value];
      }
      var cnNumbar = "";
      let decade = Math.floor(value / 10);
      let unitsDigit = Math.floor(value % 10);
      if (decade > 1) {
        cnNumbar += CN_NUMBER[decade];
      }
      cnNumbar += CN_NUMBER[10];
      if (unitsDigit > 0) {
        cnNumbar += CN_NUMBER[unitsDigit];
      }
      return cnNumbar;
    }
    /**阿拉伯数字转汉字 */
    static numberToCN2(num) {
      let arr1 = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
      let arr2 = ["", "十", "百", "千", "万", "十", "百", "千", "亿", "十", "百", "千", "万", "十", "百", "千", "亿"];
      if (!num || isNaN(num))
        return "零";
      let english = num.toString().split("");
      let result = "";
      for (let i = 0; i < english.length; i++) {
        let des_i = english.length - 1 - i;
        result = arr2[i] + result;
        let arr1_index = Number(english[des_i]);
        result = arr1[arr1_index] + result;
      }
      result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
      result = result.replace(/零+/g, "零");
      result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
      result = result.replace(/亿万/g, "亿");
      result = result.replace(/零+$/, "");
      result = result.replace(/^一十/g, "十");
      return result;
    }
    /**
     * 数字转字符串
     * @param num 数字
     * @param fractionDigits 保留小数点几位（如果小数是0则不显示小数点）
     * @param unit 数字超过 x 位缩写, 如 4 表示超过 9999 就缩写，
     * @param isCarryBit 是否四舍五入
     */
    static numberToString(num, fractionDigits = 1, unit = 4, isCarryBit = false) {
      let result;
      let numStr;
      let unitStr = "";
      let myriabit = Math.pow(10, unit) - 1;
      if (num > 99999999) {
        fractionDigits = fractionDigits <= 0 ? 2 : fractionDigits;
        numStr = fractionDigits == 0 ? Math.floor(num / 1e8).toString() : _StringUtil.fixedNum(num / 1e8, fractionDigits);
        unitStr = "亿";
      } else if (num > myriabit) {
        if (isCarryBit) {
          numStr = fractionDigits == 0 ? Math.floor(num / 1e4).toString() : Number((num / 1e4).toFixed(fractionDigits)).toString();
        } else {
          numStr = fractionDigits == 0 ? Math.floor(num / 1e4).toString() : _StringUtil.fixedNum(num / 1e4, fractionDigits);
        }
        unitStr = "万";
      } else {
        numStr = fractionDigits == 0 ? Math.floor(num).toString() : _StringUtil.fixedNum(num, fractionDigits);
      }
      let arr = numStr.split(".");
      let temp = parseInt(arr[1]) || 0;
      if (temp > 0) {
        let arr1List = arr[1].split("");
        let lastnum = 0;
        for (let i = arr1List.length - 1; i > -1; i--) {
          if (parseInt(arr1List[i]) > 0) {
            lastnum = i;
            break;
          }
        }
        result = arr[0] + "." + arr[1].substring(0, lastnum + 1) + unitStr;
      } else {
        result = arr[0] + unitStr;
      }
      return result;
    }
    /**战斗力格式专用 xx.x万 如果超过1亿,就不显示小数点*/
    static powerFormat(num, toFixed = 1) {
      let ret = "";
      if (num >= 1e8) {
        toFixed = 0;
      }
      if (num > 99999) {
        ret = _StringUtil.fixedNum(num / 1e4, toFixed) + "万";
      } else {
        ret = num + "";
      }
      return ret;
    }
    /**战斗力格式专用 */
    static powerFormat2(val) {
      return _StringUtil.numberToString(val, 1, 6);
    }
    /**
     * 保留几位小数，(不做四舍五入)
     * @param num
     * @param fixedNum 保留小数位数
     * @param isAddZero 是否补0
     */
    static fixedNum(num, fixedNum = 0, { isAddZero = false } = {}) {
      fixedNum = Math.max(0, Math.floor(fixedNum));
      let res = "" + num;
      let pIdx = res.indexOf(".");
      if (pIdx < 0) {
        if (fixedNum == 0)
          return res;
        if (isAddZero) {
          res = res + ".";
          for (let i = 0; i < fixedNum; i++) {
            res = res + "0";
          }
        }
      } else {
        let numLen = res.length;
        let totalLen = pIdx + fixedNum + 1;
        if (totalLen <= numLen) {
          if (isAddZero) {
            return res.substring(0, totalLen);
          }
          let preStr = res.substring(0, pIdx);
          let afterStr = "";
          for (let i = totalLen - 1; i >= pIdx + 1; i--) {
            if (res[i] == "0" && afterStr.length == 0) {
              continue;
            }
            afterStr = res[i] + afterStr;
          }
          if (afterStr.length == 0)
            return preStr;
          return preStr + "." + afterStr;
        }
        if (isAddZero) {
          for (let i = numLen; i < totalLen; i++) {
            res = res + "0";
          }
        }
      }
      return res;
    }
    /**
     * 去除空格和换行符
     * @param str
     * @return 
     */
    static trim(str, vList = null) {
      if (!vList) {
        vList = [" ", "\r", "\n", "	", String.fromCharCode(65279)];
      }
      let rst;
      let i;
      let len;
      rst = str;
      len = vList.length;
      for (i = 0; i < len; i++) {
        rst = rst.replace(new RegExp(vList[i], "g"), "");
      }
      return rst;
    }
    static getNationTxt(nation) {
      switch (nation) {
        case 1:
          return "魏国";
        case 2:
          return "蜀国";
        case 3:
          return "吴国";
        case 4:
          return "群雄";
        default:
          return "全部";
      }
    }
    /**获取字符串长度,中文2 英文1 */
    static getStrLen(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "aa").length;
    }
    /**删除中文 */
    static removeChinese(str) {
      return str.replace(/[\u0391-\uFFE5]/g, "");
    }
    /**删除非中文 */
    static removeNotChinese(str) {
      return str.replace(/[^\u0391-\uFFE5]/g, "");
    }
    /**取得字符串中的数字和小数点 */
    static removeNotNumber(str) {
      return str.replace(/[^\d\.]/g, "");
    }
    static getJobTxt(job) {
      switch (job) {
        case 1:
          return "防御";
        case 2:
          return "突击";
        case 3:
          return "攻击";
        case 4:
          return "谋略";
        case 5:
          return "辅助";
        case 6:
          return "治疗";
        default:
          return "全部";
      }
    }
    static getHeroPosTxt(type) {
      let txt = "";
      if (type == 1) {
        txt = "全体武将";
      } else if (type == 2) {
        txt = "前排武将";
      } else if (type == 3) {
        txt = "后排武将";
      }
      return txt;
    }
    /**
     * 移除字符串中充值相关的词
     */
    static removeRechargeWord(str) {
      let removeWords = ["首充", "充值"];
      let newStr = str;
      removeWords.forEach((word) => {
        newStr = newStr.replace(word, "");
      });
      return newStr;
    }
    /**br转换行符 */
    static br2LF(str) {
      return str.replace(/\<(br)[\\\/]{0,1}\>/g, "\n");
    }
    /**
     * string数组拼接为“文本1、...文本2和文本3”格式
     */
    static joinCN(strList = []) {
      let desc = "";
      for (let i = 0; i < strList.length; i++) {
        const str = strList[i];
        if (i != 0) {
          if (i != strList.length - 1) {
            desc += "、";
          } else {
            desc += "和";
          }
        }
        desc += str;
      }
      return desc;
    }
    static padStart(str, targetLength, padString = " ") {
      str = String(str);
      if (str.length >= targetLength) {
        return str;
      } else {
        let padding = "";
        while (padding.length < targetLength - str.length) {
          padding += padString;
        }
        padding = padding.slice(0, targetLength - str.length);
        return padding + str;
      }
    }
  };
  //正则:替换配置表中的字符串中的变量，例如：{max_progress}个英雄{event_condition}级
  //max_progress，event_condition 对应的是这个配置表的字段名
  _StringUtil.CFG_FIELD_REGEX = /\{([^}]+)\}/g;
  _StringUtil.NUM_ARG_REGEX = /\{[0-9]+\}/;
  _StringUtil.CN_NUMBER = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  _StringUtil.CN_NUMBER2 = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖", "拾"];
  var StringUtil = _StringUtil;

  // src/modules/base/Toast.ts
  var _Toast = class _Toast {
    constructor() {
      //有缩放的飘字
      this._normalNodeList = new Array();
      this._scaleNodeList = new Array();
      this._cacheList = new Array();
      this._scaleWaitList = new Array();
      this.isScaleLoop = false;
      this.isMoveUpLoop = false;
      this.m_PreTime = 0;
    }
    /**
     * 通用提示飘字
     * @param text 提示内容
     * @param color 字体颜色
     * @param showType 飘字模式  1 = 没有缩放 ； 2 = 有缩放
     * @param bgSkin 背景图片
     */
    static show(text, {
      color = "#e9e9e9",
      showType = _Toast.NORMAL_TYPE,
      bgSkin = UrlConfig.BASE_URL + "tipsBg.png",
      image = null,
      pos = null,
      height = 40
    } = {}) {
      _Toast.initLayer();
      _Toast.instance._show(text, { color, showType, bgSkin, image, pos, height });
    }
    _show(text, {
      color = "#e9e9e9",
      showType = 1,
      bgSkin = UrlConfig.BASE_URL + "tipsBg.png",
      image = null,
      pos = null,
      height = 40
    } = {}) {
      let toasItem = this._cacheList.shift() || ToastItem.newInstance();
      toasItem.initItem(text, color, bgSkin, showType, image, pos, height);
      if (showType == _Toast.SCALE_TYPE) {
        this._scaleWaitList.push(toasItem);
        if (this.isScaleLoop == false) {
          this.isScaleLoop = true;
          Laya.timer.loop(300, this, this.scaleLoop);
        }
      } else {
        this.addToLayer(toasItem);
      }
    }
    static initLayer() {
      if (_Toast._toast_layer == null) {
        _Toast._toast_layer = new Laya.Sprite();
        _Toast._toast_layer.name = "Toast";
        _Toast._toast_layer.mouseThrough = true;
        UIManager.instance.getLayer(5 /* Tips */).addChild(_Toast._toast_layer);
      }
      if (_Toast.instance == null) {
        _Toast.instance = new _Toast();
      }
    }
    scaleLoop() {
      if (this._scaleWaitList.length == 0)
        return;
      let item = this._scaleWaitList.shift();
      if (item) {
        this.addToLayer(item);
      }
      if (this._scaleWaitList.length == 0) {
        Laya.timer.clear(this, this.scaleLoop);
        this.isScaleLoop = false;
      }
    }
    get scaleH() {
      return Laya.stage.height;
    }
    get scaleW() {
      return Laya.stage.width;
    }
    addToLayer(toasItem) {
      toasItem.x = this.scaleW / 2;
      toasItem.y = toasItem.endPosY = this.scaleH / 2 - 100;
      toasItem.visible = true;
      _Toast._toast_layer.addChild(toasItem);
      let list = toasItem.showType == _Toast.NORMAL_TYPE ? this._normalNodeList : this._scaleNodeList;
      list.unshift(toasItem);
      this.doAction(toasItem);
    }
    doAction(node) {
      if (node.showType == _Toast.SCALE_TYPE) {
        let delayTime = 0;
        Laya.Tween.from(node, { scaleX: 1.5, scaleY: 1.5 }, 200, Laya.Ease.sineIn);
        Laya.Tween.to(node, { y: node.y - 100 }, 700, null, null, delayTime = delayTime + 500);
        Laya.Tween.to(node, { alpha: 0.01 }, 100, null, null, delayTime = delayTime + 700);
        Laya.timer.once(delayTime + 100, this, this.recycleItem, [node], false);
      } else {
        let item;
        let startY = this.scaleH / 2 - 100;
        for (let i = this._normalNodeList.length - 1; i >= 0; --i) {
          item = this._normalNodeList[i];
          if (item) {
            item.endPosY = startY - (i + 1) * item.height;
            item.speed = (item.y - item.endPosY) / 300;
          }
        }
        this.m_PreTime = Date.now();
        if (this.isMoveUpLoop == false) {
          this.isMoveUpLoop = true;
          Laya.timer.frameLoop(1, this, this.moveUpdate);
        }
      }
    }
    moveUpdate() {
      let delta = Date.now() - this.m_PreTime;
      this.m_PreTime = Date.now();
      for (let i = this._normalNodeList.length - 1; i >= 0; --i) {
        let item = this._normalNodeList[i];
        let y = item.y - delta * item.speed;
        item.y = Math.max(item.endPosY, y);
        if (!item.Update(delta) || item.y < 0) {
          this.recycleItem(item);
        }
      }
      if (this._normalNodeList.length <= 0) {
        Laya.timer.clear(this, this.moveUpdate);
        this.isMoveUpLoop = false;
        for (let i = _Toast._toast_layer.numChildren - 1; i > -1; i--) {
          let comp = _Toast._toast_layer.getChildAt(i);
          comp.removeSelf();
        }
      }
    }
    recycleItem(item) {
      let list = item.showType == _Toast.NORMAL_TYPE ? this._normalNodeList : this._scaleNodeList;
      let idx = -1;
      idx = list.indexOf(item);
      if (idx != -1) {
        list.splice(idx, 1);
      }
      if (item) {
        item.visible = false;
        this._cacheList.push(item);
      }
    }
  };
  _Toast._toast_layer = null;
  _Toast.instance = null;
  _Toast.NORMAL_TYPE = 1;
  //正常的飘字
  _Toast.SCALE_TYPE = 2;
  var Toast = _Toast;
  var ToastItem = class _ToastItem extends Laya.Image {
    constructor() {
      super();
      //移动到目标位置
      this.speed = 1;
      //移动速度
      this.step = 0;
      this.time = 0;
      this.initUI();
    }
    initUI() {
      this.width = 400;
      this.height = 40;
      this.anchorX = this.anchorY = 0.5;
      this.txtHtml = new Laya.Label();
      this.txtHtml.fontSize = 22;
      this.txtHtml.bold = false;
      this.txtHtml.wordWrap = false;
      this.txtHtml.html = true;
      this.addChild(this.txtHtml);
      this.mouseEnabled = this.txtHtml.mouseEnabled = false;
    }
    reset() {
      this.alpha = 1;
      this.step = 0;
      this.time = 0;
      this.width = 400;
      this.txtHtml.text = "";
      if (this.ImgIcon) {
        this.ImgIcon.off(Laya.Event.LOADED, this, this.onImageSkinLoaded);
        this.ImgIcon.destroy();
        this.ImgIcon = null;
      }
    }
    static newInstance() {
      let item = new _ToastItem();
      return item;
    }
    initItem(text, color, bgSkin, showType, image = null, pos = null, height = 40) {
      this.reset();
      this.showType = showType;
      this.sizeGrid = "10,10,10,10";
      this.skin = null;
      this.skin = bgSkin;
      this.height = height;
      if (this.txtHtml.color != color) {
        this.txtHtml.color = color;
        this.txtHtml.text = "";
      }
      this.txtHtml.text = text;
      this.width = this.txtHtml.width + 160;
      this.txtHtml.x = (this.width - this.txtHtml.width) / 2;
      this.txtHtml.y = (this.height - this.txtHtml.height) / 2;
      if (image != null) {
        image.on(Laya.Event.LOADED, this, this.onImageSkinLoaded, [image, pos]);
        this.onImageSkinLoaded(image, pos);
        this.addChildAt(image, 0);
        this.ImgIcon = image;
      }
    }
    onImageSkinLoaded(image, pos) {
      if (!image || image.destroyed)
        return;
      this.txtHtml.x = (this.width - this.txtHtml.width) / 2;
      image.anchorY = 0.5;
      if (pos != null) {
        image.x = pos.x;
        image.y = pos.y;
      } else {
        image.x = this.txtHtml.x - image.displayWidth / 2;
        image.y = this.height / 2;
      }
      this.txtHtml.x += image.displayWidth / 2;
    }
    Update(delta) {
      this.time += delta;
      let endTime;
      if (this.step == 0) {
        endTime = 1800;
      } else if (this.step == 1) {
        endTime = 600;
        this.alpha = 1 - Math.min(this.time / endTime, 1);
      } else {
        return false;
      }
      if (this.time >= endTime) {
        ++this.step;
        this.time = 0;
      }
      return true;
    }
  };

  // src/util/TipsUtil.ts
  var _TipsUtil = class _TipsUtil {
    /**
    * 飘字提醒
    * @param text 飘字内容
    * @param color 飘字颜色
    * @param bgSkin 背景
    */
    static showTips(text, color = "#ffffff", showType = Toast.NORMAL_TYPE, bgSkin = UrlConfig.BASE_URL + "tipsBg.png", height = 40) {
      Toast.show(text, { color, showType, bgSkin, height });
    }
    /**延迟打开界面 */
    static onceOpenUI(eventName, data = null, delay = 0) {
      if (delay == 0) {
        if (data == null) {
          DispatchManager.dispatchEvent(eventName);
        } else {
          DispatchManager.dispatchEvent(eventName, data);
        }
        return;
      }
      Laya.timer.once(delay, this, function() {
        if (data == null) {
          DispatchManager.dispatchEvent(eventName);
        } else {
          DispatchManager.dispatchEvent(eventName, data);
        }
      }, null, false);
    }
    static hasPopUpWindow(eventName) {
      for (const item of _TipsUtil.popUpWindowList) {
        if (item.eventName == eventName) {
          return true;
        }
      }
      return false;
    }
    /**
     * 设置弹窗窗口（UI设置为PopUp层）
     * @param eventName 弹窗事件名
     * @param data 弹窗数据
     * @param zOrder 弹窗zOrder
     * @param multiple 是否允许多个弹窗存在
     */
    static setPopUpWindows(eventName, data = null, zOrder = 0, multiple = false) {
      for (const item of _TipsUtil.popUpWindowList) {
        if (item.eventName == eventName) {
          if (!multiple && eventName != "OPEN_COMMON_REWARD_DIALOG" /* OPEN_COMMON_REWARD_DIALOG */) {
            item.data = data;
            return;
          }
        }
      }
      let vo = new PopUpWindowVO();
      vo.eventName = eventName;
      vo.data = data;
      vo.zOrder = zOrder;
      _TipsUtil.popUpWindowList.push(vo);
      this.showPopUpWindows();
    }
    /**新窗口数据通过 setPopUpWindows 方法设置 */
    static showPopUpWindows() {
      let list = _TipsUtil.popUpWindowList;
      list.sort((a, b) => a.zOrder - b.zOrder);
      for (const vo of list) {
        if (vo.isShow == true) {
          return;
        }
      }
      if (list.length > 0) {
        let vo = list[0];
        vo.isShow = true;
        DispatchManager.dispatchEvent(vo.eventName, vo.data);
      }
    }
    static oncePopUpWindows(eventName, data = null, delay = 0) {
      Laya.timer.once(delay, this, function() {
        _TipsUtil.setPopUpWindows(eventName, data);
      }, null, false);
    }
    static removePopUpWindowVO(eventName) {
      let list = _TipsUtil.popUpWindowList;
      for (let index = list.length - 1; index >= 0; index--) {
        let vo = list[index];
        if (vo.eventName == eventName) {
          list.splice(index, 1);
        }
      }
    }
    /**清理当前显示窗口的数据,并弹下一个窗口 */
    static clearPopUpWindows(name = null) {
      let list = _TipsUtil.popUpWindowList;
      for (let index = list.length - 1; index >= 0; index--) {
        let vo = list[index];
        if (vo.isShow == true && name == null) {
          list.splice(index, 1);
        } else if (vo.eventName == name) {
          list.splice(index, 1);
          name = null;
        }
      }
      if (list.length > 0) {
        _TipsUtil.showPopUpWindows();
      }
    }
  };
  _TipsUtil.popUpWindowList = [];
  var TipsUtil = _TipsUtil;
  var PopUpWindowVO = class {
    constructor() {
      /**事件名字 */
      this.eventName = "";
      this.zOrder = 0;
      /**true 在显示中 */
      this.isShow = false;
      /**显示优先级 */
      this.index = 1;
      /**是否唯一 */
      this.multiple = false;
    }
  };

  // src/util/GameUtil.ts
  var GameUtil = class {
    /**
        * 判断系统是否开启
        * @param sysId 系统id
        * @param childId 系统子id
        * @param isShowTip 是否飘提示
        */
    static isSysOpen(sysId, childId = 0, isShowTip = true, isCheckHour = true, isCheckByLevel = false, roleLevel = 1) {
      let desc = this.getSysOpenDesc(sysId, { childId, isSystemName: true, isSimple: false, isCheckHour, isCheckByLevel, checkLevel: roleLevel });
      if (desc.length > 0) {
        if (isShowTip == true) {
          TipsUtil.showTips(desc);
        }
        return false;
      }
      return true;
    }
    static getSysOpenDesc(sysId, {
      childId = 0,
      isSystemName = true,
      isSimple = false,
      isCheckHour = true,
      isCheckByLevel = false,
      checkLevel = 1
    } = {}) {
      return "";
    }
    static openHelpDialog(help_id, {
      title_name = "规则说明"
    } = {}) {
      console.log("openHelpDialog", help_id, title_name);
    }
    static GetArr(value, asNumber = false) {
      if (value == null) {
        return [];
      }
      var itemVo = [];
      var tmp = "";
      value = StringUtil.replaceAll(value, "]", "");
      value = StringUtil.replaceAll(value, "[", "");
      value = StringUtil.replaceAll(value, "}", "");
      value = StringUtil.replaceAll(value, "{", "");
      value = StringUtil.replaceAll(value, "|", ",");
      var arr = value.split(",");
      if (asNumber) {
        for (let i in arr) {
          arr[i] = Number(arr[i]);
        }
      }
      return arr;
    }
    /**
     * 复制文本到剪贴板
     * @param text 要复制的文本
     * @returns 
     */
    static copyText(text) {
      if (SdkManager.instance.checkSdkSupportFunc("setClipboardData" /* setClipboardData */)) {
        SdkManager.instance.callSdkFunc("setClipboardData" /* setClipboardData */, text);
      } else {
        let textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        let result;
        try {
          result = document.execCommand("copy");
        } catch (err) {
          console.log("复制失败");
        }
        document.body.removeChild(textarea);
        return result;
      }
    }
  };

  // src/modules/base/BaseDialog.ts
  var BaseDialog = class {
    constructor() {
      this._isOpened = false;
      this.isDestroy = false;
      this.eventListenerList = [];
      this.eventFuncList = {};
      this.childViewList = {};
      this.waitOpenCall = [];
      this._panelBgURL = UrlConfig.COMMON_DIALOG_MASK_BG;
      /**
       * 预加载资源
       * @param complete 完成回调
       */
      // 存储需要加载的预制体信息
      this.prefabList = [];
      this._childViewResList = [];
      this._waitCreatedChildCall = {};
      this._prefabNameList = {};
      this.isUseTimerScale = true;
      this.timerIndex = 0;
      this.timerIndexToFunc = {};
      this.timerFuncToIndex = {};
      this.tweenIndex = 0;
    }
    set panelBgURL(url) {
      this._panelBgURL = url;
    }
    get panelBgURL() {
      return this._panelBgURL;
    }
    get offsetY() {
      return GlobalConfig.offsetY;
    }
    get height() {
      var _a;
      return (_a = this.view) == null ? void 0 : _a.height;
    }
    get width() {
      var _a;
      return (_a = this.view) == null ? void 0 : _a.width;
    }
    // protected useCommonBottomView: boolean = false;
    // protected commonBottomView: CommonBottomView;
    // protected useCommonTopView: boolean = false;
    // protected commonTopView: CommonTopView;
    isCanOpen(args) {
      return true;
    }
    get isOpened() {
      return this._isOpened;
    }
    createRoot(parent, cls, clsBase, module, layer, args) {
      if (Laya.ClassUtils.getClass(clsBase.name) == null) {
        Laya.ClassUtils.regClass(clsBase.name, clsBase);
      }
      this.dialogName = cls.name;
      this.module = module;
      this.cls = cls;
      this.clsBase = clsBase;
      this.layer = layer;
      this.viewNode = UIUtil.createNode(parent, this.dialogName, { isFull: false, isCenter: true, width: Laya.stage.designWidth, height: Laya.stage.designHeight });
      this.bottomNode = UIUtil.createNode(this.viewNode, "bottomNode", { isFull: false, isCenter: true, width: Laya.stage.designWidth, height: Laya.stage.designHeight });
      this.centerNode = UIUtil.createNode(this.viewNode, "centerNode", { isFull: false, isCenter: true, width: Laya.stage.designWidth, height: Laya.stage.designHeight });
      this.topNode = UIUtil.createNode(this.viewNode, "topNode", { isFull: false, isCenter: true, width: Laya.stage.designWidth, height: Laya.stage.designHeight });
      this.startLoad(module, args);
    }
    startLoad(url, args) {
      this._url = url;
      let self = this;
      self.preLoadRes(() => {
        LoaderManager.instance.loadPrefab(url, Laya.Handler.create(this, (res) => {
          self.onLoaded(res, args);
        }), true, Laya.Handler.create(this, this.createView));
      });
    }
    createView(res) {
      if (res.data._$runtime != null) {
        let name = this.clsBase.name;
        if (Laya.ClassUtils.getClass(name) == null) {
          console.warn("no register clsBase", name);
        }
        res.data._$runtime = name;
      }
      return res.create();
    }
    onLoaded(res, args) {
      if (this.isDestroy) {
        if (res) {
          LoaderManager.instance.destroyPrefab(this._url, res);
        }
        return;
      }
      if (!res) {
        this.destroyDialog();
        return;
      }
      this.view = res;
      this.loadBg();
      this.view.x = (this.centerNode.width - this.view.width) / 2;
      this.view.y = (this.centerNode.height - this.view.height) / 2;
      this.centerNode.addChild(this.view);
      this._isOpened = true;
      this.initUI();
      this.addEvent();
      this.addClick();
      this.initHelpBtn();
      this.initCloseBtn();
      this.initCommonBottomView();
      this.initCommonTopView();
      this.onOpen(args);
      for (let i = 0; i < this.waitOpenCall.length; i++) {
        const call = this.waitOpenCall[i];
        this.callFunc(call.funcName, ...call.args);
      }
      this.waitOpenCall = [];
    }
    get visible() {
      return this.viewNode && this.viewNode.visible;
    }
    set visible(value) {
      this.viewNode && (this.viewNode.visible = value);
    }
    initUI() {
    }
    addClick() {
    }
    addEvent() {
    }
    onOpen(args) {
    }
    onClose() {
    }
    preLoadRes(complete = null) {
      let resList = [];
      if (this.resName) {
        if (this.resName instanceof Array) {
          for (let i = 0; i < this.resName.length; i++) {
            const res = this.resName[i];
            if (!LoaderManager.instance.getRes(res) && resList.indexOf(res) == -1) {
              resList.push(res);
            }
          }
        } else {
          if (!LoaderManager.instance.getRes(this.resName) && resList.indexOf(this.resName) == -1) {
            resList.push(this.resName);
          }
        }
      }
      const handleAfterLoad = () => {
        if (this.prefabList.length > 0) {
          let loadedCount = 0;
          const totalPrefabs = this.prefabList.length;
          this.prefabList.forEach((prefab) => {
            this.createChildView(prefab.name, prefab.url, (view) => {
              prefab.callback(view);
              loadedCount++;
              if (loadedCount === totalPrefabs) {
                complete && complete();
              }
            });
          });
        } else {
          complete && complete();
        }
      };
      if (resList.length > 0) {
        LoaderManager.instance.load(resList, Laya.Handler.create(this, handleAfterLoad));
      } else {
        handleAfterLoad();
      }
    }
    loadBg() {
      if (!this._imgBg) {
        this._imgBg = this.view.getChildByName("imgBg") || new Laya.Image();
        this._imgBg.name = "imgBg";
        this._imgBg.cacheAs = "bitmap";
        if (this._imgBg.skin) {
          this.panelBgURL = this._imgBg.skin;
        }
        this.bottomNode.addChild(this._imgBg);
      }
      if (this.panelBgURL && this.panelBgURL != "") {
        const resLoaded = () => {
          this._imgBg.once(Laya.Event.LOADED, this, this.onLoadedBg, [this._imgBg]);
          this._imgBg.skin = this.panelBgURL;
        };
        if (!LoaderManager.instance.getRes(this.panelBgURL)) {
          LoaderManager.instance.load(this.panelBgURL, Laya.Handler.create(this, resLoaded));
        } else {
          resLoaded();
        }
      }
    }
    onLoadedBg(img) {
      let imgWidth = img.source ? img.source.sourceWidth : Laya.stage.designWidth;
      let imgHeight = img.source ? img.source.sourceHeight : Laya.stage.designHeight;
      let scaleX = Laya.stage.width / imgWidth;
      let scaleY = Laya.stage.height / imgHeight;
      let scale = Math.max(scaleX, scaleY);
      img.anchorX = img.anchorY = 0.5;
      img.centerX = img.centerY = 0;
      img.scale(scale, scale);
      if (img.skin == UrlConfig.COMMON_DIALOG_MASK_BG) {
        img.alpha = 0.7;
        img.sizeGrid = "1,1,1,1";
        this.view.mouseThrough = true;
        this.addEventFunc(img, this.destroyDialog.bind(this), Laya.Event.CLICK);
      }
    }
    callFunc(funcName, ...args) {
      if (!this.isOpened) {
        this.waitOpenCall.push({ funcName, args });
        return;
      }
      let func = this[funcName];
      if (!func) {
        console.log("call func error on method", this.dialogName, funcName);
        return null;
      }
      return func.apply(this, args);
    }
    isCreateChildView(name) {
      return this.childViewList[name] != null;
    }
    callChildFunc(name, funcName, ...args) {
      let view = this.childViewList[name];
      if (!view) {
        console.log("no child view:", name);
        return;
      }
      if (!view._isCreateComplete) {
        this._waitCreatedChildCall[name].push({ funcName, args });
        return;
      }
      if (!view[funcName]) {
        console.log(name, "nofunc", funcName);
      }
      return view[funcName] && view[funcName](...args);
    }
    createChildView(name, url, complete, ...args) {
      if (this.isCreateChildView(name)) {
        return;
      }
      let self = this;
      this._waitCreatedChildCall[name] = [];
      self.childViewList[name] = {};
      this.loadPrefab(url, (viewNode) => {
        if (!viewNode) {
          console.log("CreateChildViewError: viewNode is null:", name);
          self.childViewList[name] = null;
          this._waitCreatedChildCall[name] = [];
          return;
        }
        viewNode.name = name;
        self.childViewList[name] = viewNode;
        LoaderManager.instance.load(this._childViewResList, Laya.Handler.create(this, () => {
          complete(viewNode);
          let view = viewNode;
          view["initUI"] && view["initUI"]();
          view["addEvent"] && view["addEvent"]();
          view["addClick"] && view["addClick"]();
          view["onOpen"] && view["onOpen"](self, ...args);
          view["_isCreateComplete"] = true;
          let waitCallData = this._waitCreatedChildCall[name];
          for (let i = 0; i < waitCallData.length; i++) {
            let call = waitCallData[i];
            this.callChildFunc(name, call.funcName, ...call.args);
          }
          this._waitCreatedChildCall[name] = [];
        }));
      }, (res) => {
        this._childViewResList = [];
        return res.create();
      });
    }
    destroyChildView(name) {
      let view = this.childViewList[name];
      if (view && !view.destroyed) {
        view.removeSelf();
        view.destroy();
        delete this.childViewList[name];
      }
    }
    /**
     * 加载prefab
     * @param name 
     * @param complete 
     * @param createFunc 
     * @returns 
     */
    loadPrefab(name, complete, createFunc) {
      let createObjHandle;
      if (createFunc) {
        createObjHandle = Laya.Handler.create(this, createFunc);
      }
      return LoaderManager.instance.loadPrefab(name, Laya.Handler.create(this, (res) => {
        if (this.isDestroy) {
          if (res) {
            LoaderManager.instance.destroyPrefab(name, res);
          }
          return;
        }
        if (complete) {
          complete.call(this, res);
        }
        if (!res) {
          return;
        }
        this._prefabNameList[res.$_GID] = name;
      }), true, createObjHandle);
    }
    /**
         * 销毁prefab
    
         * @param node 
         * @returns 
         */
    destroyPrefab(node) {
      let name = this._prefabNameList[node.$_GID];
      if (!name) {
        console.error("destroyPrefab err: name is null");
        return;
      }
      LoaderManager.instance.destroyPrefab(name, node);
      delete this._prefabNameList[node.$_GID];
    }
    /**
     * 销毁所有的prefab
     */
    destroyAllPrefab() {
      for (let key in this._prefabNameList) {
        let name = this._prefabNameList[key];
        if (!name)
          continue;
        LoaderManager.instance.destroyPrefab(name);
      }
      this._prefabNameList = null;
    }
    /**
     * 添加事件监听
     * @param type 
     * @param caller 
     * @param listener 
     * @param args 
     */
    addEventListener(type, caller, listener, args = null) {
      let handler = DispatchManager.addEventListener(type.toString(), caller, listener, args);
      handler && this.eventListenerList.push(handler);
    }
    /**
     * 移除事件监听
     * @param type 
     * @param caller 
     * @param listener 
     * @param args 
     */
    removeEventListener(type, caller, listener, args = null) {
      for (let i = 0; i < this.eventListenerList.length; i++) {
        let handler = this.eventListenerList[i];
        if (handler.type === type && caller === handler.caller && handler.method === listener) {
          this.eventListenerList.splice(i, 1);
          break;
        }
      }
      DispatchManager.removeEventListener(type, caller, listener);
    }
    /**
     * 移除所有事件监听
     */
    removeAllEventListener() {
      for (let i = 0; i < this.eventListenerList.length; i++) {
        let handler = this.eventListenerList[i];
        DispatchManager.removeEventListener(handler.type, handler.caller, handler.method);
      }
      this.eventListenerList.length = 0;
    }
    /**
     * 派发事件
     * @param type 
     * @param data 
     */
    dispatchEvent(type, data = null) {
      DispatchManager.dispatchEvent(type, data);
    }
    addEventFunc(caller, func, eventType = Laya.Event.CLICK, clickId = 1, ...args) {
      var msg = this.eventFuncList[caller.$_GID];
      if (!msg) {
        msg = {};
        this.eventFuncList[caller.$_GID] = msg;
      }
      var oldFunc = msg[eventType];
      if (oldFunc) {
        caller.off(eventType, caller, oldFunc);
      }
      caller._clickId = clickId;
      let _func = function(...args2) {
        if (eventType == Laya.Event.CLICK) {
          if (caller._clickId > 0) {
            SoundManager.instance.PlaySound(caller._clickId);
          }
        }
        func.call(caller, ...args2);
      };
      msg[eventType] = _func;
      caller.on(eventType, caller, _func, args);
    }
    removeEventFunc(caller, eventType) {
      var msg = this.eventFuncList[caller.$_GID];
      if (!msg) {
        return;
      }
      if (eventType) {
        var oldFunc = msg[eventType];
        if (oldFunc) {
          caller.off(eventType, caller, oldFunc);
        }
      } else {
        caller.offAll();
      }
    }
    //delay 时间(单位为毫秒)  func 回调方法  args回调参数
    addOnceTimer(delay, func, args, isUseTimerScale = this.isUseTimerScale) {
      if (isUseTimerScale) {
        delay = delay / 1;
      }
      let _timerIndex = this.timerIndex + 1;
      this.timerIndex = _timerIndex;
      let onceCall = () => {
        if (func) {
          func.call(this, args);
        }
        if (this.timerIndexToFunc[_timerIndex]) {
          this.timerIndexToFunc[_timerIndex] = null;
        }
        let _func2 = func;
        if (this.timerFuncToIndex[_func2.$_TID]) {
          this.timerFuncToIndex[_func2.$_TID] = null;
        }
      };
      Laya.systemTimer.once(delay, this, onceCall, args);
      this.timerIndexToFunc[_timerIndex] = { func: onceCall };
      let _func = func;
      this.timerFuncToIndex[_func.$_TID] = _timerIndex;
      return _timerIndex;
    }
    addLoopTimer(delay, func, args) {
      this.timerIndex++;
      Laya.systemTimer.loop(delay, this, func, args);
      this.timerIndexToFunc[this.timerIndex] = { func };
      let _func = func;
      this.timerFuncToIndex[_func.$_TID] = this.timerIndex;
      return this.timerIndex;
    }
    addFrameLoopTimer(frame, func, args) {
      this.timerIndex++;
      Laya.systemTimer.frameLoop(frame, this, func, args);
      this.timerIndexToFunc[this.timerIndex] = { func };
      let _func = func;
      this.timerFuncToIndex[_func.$_TID] = this.timerIndex;
      return this.timerIndex;
    }
    addFrameOnceTimer(frame, func, args) {
      this.timerIndex++;
      Laya.systemTimer.frameOnce(frame, this, func, args);
      this.timerIndexToFunc[this.timerIndex] = { func };
      let _func = func;
      this.timerFuncToIndex[_func.$_TID] = this.timerIndex;
      return this.timerIndex;
    }
    removeTimer(indexOrFunc) {
      let index;
      if (indexOrFunc instanceof Function) {
        let _indexOrFunc = indexOrFunc;
        index = this.timerFuncToIndex[_indexOrFunc.$_TID];
      } else {
        index = indexOrFunc;
      }
      let caller = this.timerIndexToFunc[index];
      if (caller) {
        let tid = caller.func.$_TID;
        Laya.systemTimer.clear(this, caller.func);
        if (tid) {
          this.timerFuncToIndex[tid] = null;
        }
        this.timerIndexToFunc[index] = null;
      }
    }
    checkTimer(index) {
      return this.timerIndexToFunc[index];
    }
    removeAllTimer(func) {
      Laya.systemTimer.clear(this, func);
    }
    initHelpBtn() {
      let btnHelp = this.view.getChildByName("btnHelp") || this.view["btnHelp"];
      if (btnHelp) {
        let help_id = Number(btnHelp.label) || 0;
        btnHelp.label = "";
        if (help_id > 0)
          this.addEventFunc(btnHelp, this.onClickHelp.bind(this), Laya.Event.CLICK, 1, [help_id]);
      }
    }
    onClickHelp(help_id) {
      if (help_id <= 0) {
        console.error("help_id is null");
        return;
      }
      GameUtil.openHelpDialog(help_id);
    }
    initCloseBtn() {
      let btnClose = this.view.getChildByName("btnClose") || this.view["btnClose"];
      if (btnClose) {
        this.addEventFunc(btnClose, this.destroyDialog.bind(this), Laya.Event.CLICK, 2);
      }
      let btnBottomClose = this.view.getChildByName("btnBottomClose") || this.view["btnBottomClose"];
      if (btnBottomClose) {
        btnBottomClose.y -= this.offsetY;
        this.addEventFunc(btnBottomClose, this.destroyDialog.bind(this), Laya.Event.CLICK, 2);
      }
    }
    initCommonBottomView() {
    }
    initCommonTopView() {
    }
    freshLayout() {
      this.viewNode.freshLayout();
      this.topNode.freshLayout();
      this.centerNode.freshLayout();
      this.bottomNode.freshLayout();
    }
    destroyRoot() {
      this.onClose();
      this.isDestroy = true;
      this.clearPopUpWindows();
      this.removeAllEventListener();
      this.destroyAllPrefab();
      this.eventFuncList = null;
      this.destroyViewNode();
      Laya.systemTimer.clearAll(this);
    }
    clearPopUpWindows() {
      if (this.layer == 4 /* PopUp */ && this.cls && this.cls["openEvent"]) {
        TipsUtil.clearPopUpWindows(this.cls["openEvent"]);
      }
    }
    destroyViewNode() {
      if (this.view) {
      }
      this.viewNode.removeSelf();
      this.viewNode.destroy(true);
    }
    destroyDialog() {
      UIManager.instance.destroyDialog(this.dialogName);
    }
  };

  // src/modules/game/dialog/GameDialog.ts
  var GameDialog = class extends BaseDialog {
  };

  // src/modules/game/dialog/GameDialog.generated.ts
  var GameDialogBase = class extends Laya.Box {
  };

  // src/modules/game/controller/GameController.ts
  var GameController = class _GameController extends BaseController {
    constructor() {
      super();
      _GameController.instance = this;
    }
    initModuleListeners() {
      this.registerDialog(GameDialog, GameDialogBase, "resources/prefab/ui/game/GameDialog.lh", "OPEN_GAME_DIALOG" /* OPEN_GAME_DIALOG */, "CLOSE_GAME_DIALOG" /* CLOSE_GAME_DIALOG */, 0 /* Fight */);
    }
    initNetListeners() {
    }
    reset() {
      super.reset();
    }
    //-------------协议接收 start -------------
    //-------------协议接收 end ---------------
  };

  // src/component/list/UIListItemData.ts
  var UIListItemData = class _UIListItemData {
    constructor() {
      this.index = -1;
      this.name = "";
    }
    static create() {
      return Laya.Pool.getItemByClass("UIListItemData", _UIListItemData);
    }
    clone(data) {
      this.index = data.index;
      this.data = data.data;
      this.parameter = data.parameter;
      this.name = data.name;
    }
    /**
    * 重置
    */
    reset() {
      this.index = -1;
      this.data = null;
      this.parameter = null;
      this.name = "";
      return this;
    }
    /**
     * 回收到对象池，方便复用
     */
    recover() {
      Laya.Pool.recover("UIListItemData", this.reset());
    }
  };

  // src/component/list/UIListBase.ts
  var UIListBase = class {
    constructor() {
      this._isSelectOne = true;
      this._select_index = -1;
      this.parameter = null;
    }
    initInfo(caller, list, onSelectFunc = null, isSelectOne = true, selectEnable = true) {
      this._caller = caller;
      this._list = list;
      this._onSelectFunc = onSelectFunc;
      this._isSelectOne = isSelectOne;
      this._list.selectEnable = selectEnable;
      this._list.selectHandler = new Laya.Handler(this, this.onListSelect);
      this._list.mouseHandler = new Laya.Handler(this, this.onListMouse);
      this._list.renderHandler = new Laya.Handler(this, this.onListRender);
    }
    onListSelect(index) {
      if (this._select_index == index) {
        return;
      }
      this._select_index = index;
      if (this._onSelectFunc != null) {
        this._onSelectFunc.call(this._caller, index);
      }
    }
    onListRender(item, index) {
      if (index > this._list.array.length || index < 0)
        return;
      if (item.Clean != null) {
        item.Clean();
      }
      let itemData = UIListItemData.create();
      itemData.index = index;
      itemData.data = this._list.array[index];
      itemData.parameter = this.parameter;
      item.isSelect = this._select_index == index;
      item.UpdateItem(itemData, this._select_index == index);
      itemData.recover();
    }
    onListMouse(e, index) {
    }
    setSpace(x, y) {
      this._list.spaceX = x;
      this._list.spaceY = y;
    }
    setRepeat(repeatX, repeatY) {
      this._list.repeatX = repeatX;
      this._list.repeatY = repeatY;
    }
    setScrollType(scrollType) {
      this._list.scrollType = scrollType;
    }
    set array(value) {
      this._list.array = value;
      if (this._isSelectOne) {
        this.selectdIndex = 0;
        this.scrollTo(0);
      } else {
        this.selectdIndex = -1;
        this.scrollTo(0);
      }
    }
    set selectdIndex(val) {
      this._list.selectedIndex = val;
    }
    scrollTo(val) {
      this._list.scrollTo(val);
    }
    /**
    * 添加附加参数,必须写在 arry 赋值之前 
    * @param name   参数名,在 itemView
    * @param value 参数值
    * 
    */
    addOtherParamete(name, value) {
      if (this.parameter == null) {
        this.parameter = new Object();
      }
      this.parameter[name] = value;
    }
  };

  // src/component/list/UIList.ts
  var UIList = class _UIList extends UIListBase {
    static setUIList(caller, list, onSelect = null, isSelectOne = true, selectEnable = true) {
      var uiList = new _UIList();
      uiList.initInfo(caller, list, onSelect, isSelectOne, selectEnable);
      return uiList;
    }
  };

  // src/modules/gameMaster/dialog/GameMasterDialog.ts
  var { regClass } = Laya;
  var GameMasterDialog = class extends BaseDialog {
    constructor() {
      super();
      this.cfgs = [];
      this.panelBgURL = UrlConfig.COMMON_DIALOG_MASK_BG;
    }
    initUI() {
      this.cfgs = ConfigManager.instance.cfg_gmCache.get_all();
      this.uiList = UIList.setUIList(this, this.view.gmList, null, false, false);
      this.uiList.array = this.cfgs;
    }
  };
  GameMasterDialog = __decorateClass([
    regClass("qxB9QeKHSzSE44pdoN1n7g")
  ], GameMasterDialog);

  // src/modules/gameMaster/dialog/GameMasterDialog.generated.ts
  var GameMasterDialogBase = class extends Laya.Box {
  };

  // src/modules/gameMaster/controller/GameMasterController.ts
  var GameMasterController = class _GameMasterController extends BaseController {
    constructor() {
      super();
      _GameMasterController.instance = this;
    }
    initModuleListeners() {
      this.registerDialog(GameMasterDialog, GameMasterDialogBase, "resources/prefab/ui/gamemaster/GameMasterDialog.lh", "OPEN_GAME_MASTER_DIALOG" /* OPEN_GAME_MASTER_DIALOG */, "CLOSE_GAME_MASTER_DIALOG" /* CLOSE_GAME_MASTER_DIALOG */, 7 /* GameHelp */);
    }
    initNetListeners() {
    }
    reset() {
      super.reset();
    }
    //-------------协议接收 start -------------
    //-------------协议接收 end ---------------
  };

  // src/modules/main/dialog/MainDialog.ts
  var { regClass: regClass2 } = Laya;
  var MainDialog = class extends BaseDialog {
    constructor() {
      super();
      this.panelBgURL = UrlConfig.DIALOG_BG_URL + "bg22.jpg";
    }
    initUI() {
    }
    addClick() {
      this.addEventFunc(this.view.btnStart, this.onClickStart.bind(this));
      this.addEventFunc(this.view.btnSetting, this.onClickSetting.bind(this));
    }
    onClickStart() {
      this.dispatchEvent("OPEN_GAME_DIALOG" /* OPEN_GAME_DIALOG */);
      this.destroyDialog();
    }
    onClickSetting() {
      this.dispatchEvent("OPEN_SETTING_DIALOG" /* OPEN_SETTING_DIALOG */);
    }
  };
  MainDialog = __decorateClass([
    regClass2("YNDmmii3Soa_XK8wJ4466w")
  ], MainDialog);

  // src/modules/main/dialog/MainDialog.generated.ts
  var MainDialogBase = class extends Laya.Box {
  };

  // src/modules/main/controller/MainController.ts
  var MainController = class _MainController extends BaseController {
    constructor() {
      super();
      _MainController.instance = this;
    }
    initModuleListeners() {
      this.registerDialog(MainDialog, MainDialogBase, "resources/prefab/ui/main/MainDialog.lh", "OPEN_MAIN_DIALOG" /* OPEN_MAIN_DIALOG */, "CLOSE_MAIN_DIALOG" /* CLOSE_MAIN_DIALOG */, 2 /* Main */);
    }
    initNetListeners() {
    }
    reset() {
      super.reset();
    }
    //-------------协议接收 start -------------
    //-------------协议接收 end ---------------
  };

  // src/modules/setting/dialog/SettingDialog.ts
  var SettingDialog = class extends BaseDialog {
    constructor() {
      super();
    }
    initUI() {
    }
    addClick() {
    }
    addEvent() {
    }
    onOpen(param) {
    }
  };

  // src/modules/setting/dialog/SettingDialog.generated.ts
  var SettingDialogBase = class extends Laya.Box {
  };

  // src/modules/setting/controller/SettingController.ts
  var SettingController = class _SettingController extends BaseController {
    constructor() {
      super();
      _SettingController.instance = this;
    }
    initModuleListeners() {
      this.registerDialog(SettingDialog, SettingDialogBase, "resources/prefab/ui/setting/SettingDialog.lh", "OPEN_SETTING_DIALOG" /* OPEN_SETTING_DIALOG */, "CLOSE_SETTING_DIALOG" /* CLOSE_SETTING_DIALOG */, 3 /* UI */);
    }
    initNetListeners() {
    }
    reset() {
      super.reset();
    }
    //-------------协议接收 start -------------
    //-------------协议接收 end ---------------
  };

  // src/modules/base/ModuleController.ts
  var _ModuleController = class _ModuleController {
    static register(clas) {
      _ModuleController.instanceCache.push(new clas());
    }
    static reset() {
      for (let i = 0; i < _ModuleController.instanceCache.length; i++) {
        _ModuleController.instanceCache[i].reset();
      }
    }
    static init() {
      _ModuleController.register(GameController);
      _ModuleController.register(MainController);
      _ModuleController.register(GameMasterController);
      _ModuleController.register(SettingController);
      _ModuleController.register(CommonController);
    }
  };
  _ModuleController.instanceCache = [];
  var ModuleController = _ModuleController;

  // src/modules/base/manager/SceneManager.ts
  var Handler = Laya.Handler;
  var SceneManager = class _SceneManager {
    constructor() {
      /** 场景配置映射表 */
      this._sceneConfigs = /* @__PURE__ */ new Map();
      /** 已加载的场景实例映射表 */
      this._sceneInstances = /* @__PURE__ */ new Map();
      /** 当前场景名称 */
      this._currentSceneName = "";
      /** 场景切换中标志 */
      this._isTransitioning = false;
      /** 默认场景切换动画持续时间 */
      this._defaultDuration = 300;
      this._initTransitionMask();
    }
    static get instance() {
      if (!_SceneManager._instance) {
        _SceneManager._instance = new _SceneManager();
      }
      return _SceneManager._instance;
    }
    init() {
      const sceneConfigs = [
        {
          name: "Main" /* Main */,
          url: "resources/scene/Main.ls",
          cache: true,
          // 缓存，方便快速切换回来
          preloadAssets: []
        },
        {
          name: "Game" /* Game */,
          url: "resources/scene/Game.ls",
          cache: true,
          // 缓存，方便快速切换回来
          preloadAssets: []
        }
      ];
      _SceneManager.instance.registerScenes(sceneConfigs);
    }
    /**
     * 初始化场景切换遮罩
     */
    _initTransitionMask() {
      this._transitionMask = new Laya.Sprite();
      this._transitionMask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
      this._transitionMask.size(Laya.stage.width, Laya.stage.height);
      this._transitionMask.mouseEnabled = true;
      this._transitionMask.alpha = 0;
      this._transitionMask.visible = false;
      this._transitionMask.name = "SceneTransitionMask";
      UIManager.instance.getLayer(13 /* UI3D */).addChild(this._transitionMask);
      Laya.stage.on(Laya.Event.RESIZE, this, this._onStageResize);
    }
    /**
     * 舞台尺寸变化处理
     */
    _onStageResize() {
      if (this._transitionMask) {
        this._transitionMask.graphics.clear();
        this._transitionMask.graphics.drawRect(0, 0, Laya.stage.width, Laya.stage.height, "#000000");
        this._transitionMask.size(Laya.stage.width, Laya.stage.height);
      }
    }
    /**
     * 注册场景配置
     * @param config 场景配置
     */
    registerScene(config) {
      this._sceneConfigs.set(config.name, config);
    }
    /**
     * 批量注册场景配置
     * @param configs 场景配置数组
     */
    registerScenes(configs) {
      for (const config of configs) {
        this.registerScene(config);
      }
    }
    /**
     * 打开场景
     * @param name 场景名称
     * @param options 打开选项
     */
    open(_0) {
      return __async(this, arguments, function* (name, options = {}) {
        if (this._isTransitioning) {
          console.warn("[SceneManager] 场景切换中，请等待切换完成");
          return null;
        }
        const config = this._sceneConfigs.get(name);
        if (!config) {
          console.error(`[SceneManager] 未找到场景配置: ${name}`);
          return null;
        }
        if (name === this._currentSceneName && this._sceneInstances.has(name)) {
          const sceneInfo = this._sceneInstances.get(name);
          if (sceneInfo && sceneInfo.instance) {
            options.onComplete && options.onComplete(sceneInfo.instance);
            return sceneInfo.instance;
          }
        }
        this._isTransitioning = true;
        try {
          yield this._playTransitionOut(options.transition, options.duration);
          if (config.preloadAssets && config.preloadAssets.length > 0) {
            yield this._preloadAssets(config.preloadAssets, options.onProgress);
          }
          const scene = yield this._loadScene(config);
          if (!scene) {
            this._isTransitioning = false;
            return null;
          }
          if (options.closeOther !== false) {
            this.closeAll(name);
          }
          const prevSceneName = this._currentSceneName;
          this._currentSceneName = name;
          scene.open(options.closeOther, options.params);
          this._onSceneEnter(name, prevSceneName, options.params);
          yield this._playTransitionIn(options.transition, options.duration);
          options.onComplete && options.onComplete(scene);
          this._isTransitioning = false;
          return scene;
        } catch (error) {
          console.error(`[SceneManager] 打开场景失败: ${name}`, error);
          this._isTransitioning = false;
          return null;
        }
      });
    }
    /**
     * 加载场景
     * @param config 场景配置
     */
    _loadScene(config) {
      return __async(this, null, function* () {
        if (this._sceneInstances.has(config.name)) {
          const sceneInfo = this._sceneInstances.get(config.name);
          if (sceneInfo && sceneInfo.instance && !sceneInfo.instance.destroyed) {
            return sceneInfo.instance;
          }
        }
        return new Promise((resolve) => {
          Laya.Scene.load(config.url, Handler.create(this, (scene) => {
            if (scene) {
              if (config.cache !== true) {
                scene.autoDestroyAtClosed = true;
              }
              this._sceneInstances.set(config.name, {
                config,
                instance: scene,
                isLoading: false
              });
            }
            resolve(scene);
          }));
        });
      });
    }
    /**
     * 预加载资源
     * @param assets 资源路径数组
     * @param onProgress 进度回调
     */
    _preloadAssets(assets, onProgress) {
      return __async(this, null, function* () {
        return new Promise((resolve) => {
          let loadedCount = 0;
          const totalCount = assets.length;
          if (totalCount === 0) {
            resolve();
            return;
          }
          for (const asset of assets) {
            Laya.loader.load(asset, Handler.create(this, () => {
              loadedCount++;
              const progress = loadedCount / totalCount;
              onProgress && onProgress(progress);
              if (loadedCount >= totalCount) {
                resolve();
              }
            }));
          }
        });
      });
    }
    /**
     * 播放场景切换淡出动画
     * @param transition 动画类型
     * @param duration 持续时间
     */
    _playTransitionOut() {
      return __async(this, arguments, function* (transition = 0 /* None */, duration = this._defaultDuration) {
        if (transition === 0 /* None */) {
          return;
        }
        return new Promise((resolve) => {
          this._transitionMask.visible = true;
          this._transitionMask.alpha = 0;
          Laya.Tween.to(this._transitionMask, { alpha: 1 }, duration, null, Handler.create(this, () => {
            resolve();
          }));
        });
      });
    }
    /**
     * 播放场景切换淡入动画
     * @param transition 动画类型
     * @param duration 持续时间
     */
    _playTransitionIn() {
      return __async(this, arguments, function* (transition = 0 /* None */, duration = this._defaultDuration) {
        if (transition === 0 /* None */) {
          return;
        }
        return new Promise((resolve) => {
          Laya.Tween.to(this._transitionMask, { alpha: 0 }, duration, null, Handler.create(this, () => {
            this._transitionMask.visible = false;
            resolve();
          }));
        });
      });
    }
    /**
     * 关闭指定场景
     * @param name 场景名称
     */
    close(name) {
      const sceneInfo = this._sceneInstances.get(name);
      if (sceneInfo && sceneInfo.instance) {
        sceneInfo.instance.close();
        if (!sceneInfo.config.cache) {
          this._sceneInstances.delete(name);
        }
        if (this._currentSceneName === name) {
          this._currentSceneName = "";
        }
      }
    }
    /**
     * 关闭所有场景
     * @param except 排除的场景名称（可选）
     */
    closeAll(except) {
      for (const [name, sceneInfo] of this._sceneInstances) {
        if (except && name === except) {
          continue;
        }
        if (sceneInfo.instance) {
          sceneInfo.instance.close();
        }
      }
      for (const [name, sceneInfo] of this._sceneInstances) {
        if (!sceneInfo.config.cache) {
          this._sceneInstances.delete(name);
        }
      }
      if (except) {
        this._currentSceneName = except;
      } else {
        this._currentSceneName = "";
      }
    }
    /**
     * 销毁指定场景
     * @param name 场景名称
     */
    destroy(name) {
      const sceneInfo = this._sceneInstances.get(name);
      if (sceneInfo && sceneInfo.instance) {
        sceneInfo.instance.destroy(true);
        this._sceneInstances.delete(name);
        if (this._currentSceneName === name) {
          this._currentSceneName = "";
        }
      }
    }
    /**
     * 销毁所有场景
     */
    destroyAll() {
      for (const [name, sceneInfo] of this._sceneInstances) {
        if (sceneInfo.instance) {
          sceneInfo.instance.destroy(true);
        }
      }
      this._sceneInstances.clear();
      this._currentSceneName = "";
    }
    /**
     * 获取当前场景
     */
    get currentScene() {
      if (this._currentSceneName && this._sceneInstances.has(this._currentSceneName)) {
        return this._sceneInstances.get(this._currentSceneName).instance;
      }
      return null;
    }
    /**
     * 获取当前场景名称
     */
    get currentSceneName() {
      return this._currentSceneName;
    }
    /**
     * 获取指定场景实例
     * @param name 场景名称
     */
    getScene(name) {
      const sceneInfo = this._sceneInstances.get(name);
      return sceneInfo ? sceneInfo.instance : null;
    }
    /**
     * 检查场景是否已加载
     * @param name 场景名称
     */
    isSceneLoaded(name) {
      const sceneInfo = this._sceneInstances.get(name);
      return sceneInfo && sceneInfo.instance && !sceneInfo.instance.destroyed;
    }
    /**
     * 检查是否正在切换场景
     */
    get isTransitioning() {
      return this._isTransitioning;
    }
    /**
     * 场景进入回调
     * @param name 当前场景名称
     * @param prevName 上一个场景名称
     * @param params 场景参数
     */
    _onSceneEnter(name, prevName, params) {
      console.log(`[SceneManager] 场景进入: ${name}, 上一个场景: ${prevName || "无"}`);
    }
    /**
     * 预加载场景（不打开，仅加载到内存）
     * @param name 场景名称
     */
    preload(name) {
      return __async(this, null, function* () {
        const config = this._sceneConfigs.get(name);
        if (!config) {
          console.error(`[SceneManager] 未找到场景配置: ${name}`);
          return false;
        }
        if (this._sceneInstances.has(name)) {
          return true;
        }
        try {
          const scene = yield this._loadScene(config);
          return scene !== null;
        } catch (error) {
          console.error(`[SceneManager] 预加载场景失败: ${name}`, error);
          return false;
        }
      });
    }
    /**
     * 获取所有已注册的场景名称
     */
    getRegisteredSceneNames() {
      return Array.from(this._sceneConfigs.keys());
    }
    /**
     * 获取所有已加载的场景名称
     */
    getLoadedSceneNames() {
      const names = [];
      for (const [name, sceneInfo] of this._sceneInstances) {
        if (sceneInfo.instance && !sceneInfo.instance.destroyed) {
          names.push(name);
        }
      }
      return names;
    }
  };

  // src/GameStart.ts
  var { regClass: regClass3, property } = Laya;
  var GameStart = class extends BaseScript {
    initData() {
      this.init();
    }
    init() {
      UrlConfig.init();
      LoaderManager.instance.init(Laya.Handler.create(this, () => {
        this.dispatchEvent("OPEN_MAIN_DIALOG" /* OPEN_MAIN_DIALOG */);
      }));
      Connection.instance.connect("ws://localhost:8080");
      UIManager.instance.init();
      SceneManager.instance.init();
      BaseController.init();
      ModuleController.init();
      ConfigManager.instance.init(Laya.Handler.create(this, () => {
      }));
      SdkManager.instance.init();
      SoundManager.instance.init();
      GlobalConfig.init();
      if (GlobalConfig.IS_DEBUG) {
      }
    }
    onUpdate() {
      LoaderManager.instance.update();
    }
  };
  GameStart = __decorateClass([
    regClass3("OOSTm5N3RKeU1OM9BrRl0Q")
  ], GameStart);

  // src/component/progressbar/ProgressBarVo.ts
  var ProgressBarVo = class {
    set value(value) {
      this._value = value;
    }
    get value() {
      return this._value > 1 ? 1 : this._value;
    }
  };

  // src/component/progressbar/UIProgressBar.generated.ts
  var UIProgressBarBase = class extends Laya.Box {
  };

  // src/component/progressbar/UIProgressBar.ts
  var { regClass: regClass4 } = Laya;
  var UIProgressBar = class extends UIProgressBarBase {
    constructor() {
      super(...arguments);
      this._isShowEffect = false;
      this._showValue = 0;
      this._maxValue = 0;
      this._txtFormat = "{0}/{1}";
      this._isVertical = false;
      this._barVos = [];
    }
    onAwake() {
      let vo = this._getBarVo(null);
      if (vo) {
        this._barVos.push(vo);
      }
      let num = 1;
      vo = this._getBarVo(num++);
      while (vo) {
        this._barVos.push(vo);
        vo = this._getBarVo(num++);
      }
      this.SetValue(0, 0);
    }
    _getBarVo(num) {
      let barName = num == null ? "imgBar" : "imgBar" + num;
      let bar = this.getChildByName(barName);
      if (bar) {
        let vo = new ProgressBarVo();
        vo.bar = bar;
        vo.barMask = bar.mask;
        if (!vo.barMask) {
          vo.barMask = bar.getChildByName("barmask");
          if (vo.barMask) {
            bar.mask = vo.barMask;
            vo.barMask.visible = false;
          }
        }
        vo.width = bar.width;
        vo.height = bar.height;
        return vo;
      }
      return null;
    }
    set txtFormat(nowtxtFormat) {
      this._txtFormat = nowtxtFormat;
    }
    get maxWidth() {
      let barVo = this.getBarVo(0);
      return barVo ? barVo.width : 0;
    }
    /** ！！！并不是修改当前bar的长度，而是改变这个bar的原始长度，也就是更改基数，慎用！！ */
    set barWidth(width) {
      let barVo = this.getBarVo(0);
      if (barVo) {
        barVo.width = width;
      }
      this.changeValue();
    }
    set barHeight(height) {
      let barVo = this.getBarVo(0);
      if (barVo) {
        barVo.height = height;
      }
      this.changeValue();
    }
    set visible(value) {
      this.imgBg.visible = value;
      for (let vo of this._barVos) {
        if (vo.bar && !vo.bar.destroyed) {
          vo.bar.visible = value;
        }
      }
      if (this.checkIsTextNotDestroyed()) {
        this.txtValue.visible = value;
      }
      this.boxEffect.visible = value;
    }
    set textVisible(value) {
      if (this.checkIsTextNotDestroyed()) {
        this.txtValue.visible = value;
      }
    }
    set valueTextColor(color) {
      if (this.checkIsTextNotDestroyed()) {
        this.txtValue.color = color;
      }
    }
    get sizeGrid() {
      return this.getBar(0).sizeGrid;
    }
    get bar() {
      return this.getBar(0);
    }
    set sizeGrid(value) {
      this.getBar(0).sizeGrid = value;
      this.imgBg.sizeGrid = value;
    }
    getBarVo(index) {
      return this._barVos[index];
    }
    getBar(index) {
      let vo = this._barVos[index];
      return vo && vo.bar || null;
    }
    SetValue(curalue, maxValue = 0) {
      let barVo = this.getBarVo(0);
      this._maxValue = maxValue > 0 ? maxValue : this._maxValue;
      this._showValue = Math.min(curalue, this._maxValue);
      if (this._maxValue <= 0) {
        barVo.value = 0;
      } else {
        if (curalue > 0) {
          barVo.value = 1 * curalue / this._maxValue;
        } else {
          barVo.value = 0;
        }
      }
      this.SetValueTxt(StringUtil.Format2(this._txtFormat, Math.floor(curalue).toString(), this._maxValue.toString()));
      this.changeValue();
    }
    SetValues(...values) {
      if (values.length > 0) {
        let maxValue = this._maxValue;
        for (let i = 0; i < this._barVos.length; ++i) {
          let vo = this._barVos[i];
          let curVal = values[i];
          if (vo && (!!curVal || curVal === 0)) {
            vo.value = maxValue <= 0 || curVal <= 0 ? 0 : 1 * curVal / maxValue;
            ;
          }
        }
        let firstVal = values[0];
        this.SetValueTxt(StringUtil.Format2(this._txtFormat, Math.floor(firstVal).toString(), maxValue.toString()));
        this.changeValue();
      }
    }
    set showValue(val) {
      this._showValue = val;
      this.value = val;
    }
    get showValue() {
      return this._showValue;
    }
    set value(val) {
      this.SetValue(val, this._maxValue);
    }
    /**百分比 */
    get value() {
      let barVo = this.getBarVo(0);
      let value = barVo && barVo.value || 1;
      return value > 1 ? 1 : value;
    }
    /**
     * 设置百分比val
     */
    set percentValue(val) {
      let barVo = this.getBarVo(0);
      if (barVo) {
        barVo.value = val > 1 ? 1 : val;
      }
      this.changeValue();
    }
    set maxValue(val) {
      this._maxValue = val;
    }
    get maxValue() {
      return this._maxValue;
    }
    SetValueTxt(desc) {
      if (this.checkIsTextNotDestroyed()) {
        this.txtValue.text = desc;
      }
    }
    GetValueTxt() {
      if (this.checkIsTextNotDestroyed()) {
        if (this.txtValue)
          return this.txtValue.text;
      }
      return "";
    }
    /**进度条值设为0和隐藏文本*/
    ClearVlaue() {
      for (let vo of this._barVos) {
        if (vo) {
          vo.value = 0;
        }
      }
      this.changeValue();
      if (this.checkIsTextNotDestroyed()) {
        this.txtValue.text = "";
      }
    }
    /**外部添加进度条特效*/
    SetEffect(eff) {
      this.boxEffect.addChild(eff);
    }
    checkIsTextNotDestroyed() {
      return this.txtValue && !this.txtValue.destroyed;
    }
    /**
     * 更改进度值的显示。
     */
    changeValue() {
      let bar = this.getBar(0);
      if (!bar || bar.destroyed) {
        return;
      }
      if (this._isVertical) {
        for (let vo of this._barVos) {
          if (vo.bar && !vo.bar.destroyed) {
            if (vo.barMask) {
              vo.barMask.height = vo.value == 0 ? 1 : vo.height * vo.value;
            } else {
              vo.bar.height = vo.value == 0 ? 1 : vo.height * vo.value;
            }
          }
        }
      } else {
        for (let vo of this._barVos) {
          if (vo.bar && !vo.bar.destroyed) {
            if (vo.barMask) {
              vo.barMask.width = vo.value == 0 ? 1 : vo.width * vo.value;
            } else {
              vo.bar.width = vo.value == 0 ? 1 : vo.width * vo.value;
            }
          }
        }
      }
    }
  };
  UIProgressBar = __decorateClass([
    regClass4("o8XXMJKUTeKsn_l0bXOg5Q")
  ], UIProgressBar);

  // src/modules/common/view/CommonPopUpView.generated.ts
  var CommonPopUpViewBase = class extends Laya.Box {
  };

  // src/modules/common/view/CommonPopUpView.ts
  var { regClass: regClass5 } = Laya;
  var CommonPopUpView = class extends CommonPopUpViewBase {
    onAwake() {
      this._dialog = UIUtil.getRootDialog(this);
      this._dialog.addEventFunc(this.btnClose, this._dialog.destroyDialog.bind(this._dialog), Laya.Event.CLICK, 2);
    }
  };
  CommonPopUpView = __decorateClass([
    regClass5("LWYS6ZPbSeKf72-ud7cZvg")
  ], CommonPopUpView);

  // src/modules/gameMaster/view/GameMasterItem.generated.ts
  var GameMasterItemBase = class extends Laya.Box {
  };

  // src/modules/gameMaster/view/GameMasterItem.ts
  var { regClass: regClass6 } = Laya;
  var GameMasterItem = class extends GameMasterItemBase {
    onAwake() {
      this._dialog = UIUtil.getRootDialog(this);
      this._dialog.addEventFunc(this.btnGo, this.onBtnGoClick.bind(this));
    }
    UpdateItem(itemData, select) {
      this.cfg = itemData.data;
      this.lbName.text = this.cfg.name;
    }
    Clean() {
    }
    set isSelect(value) {
    }
    onBtnGoClick() {
      this._dialog.dispatchEvent(this.cfg.event);
      this._dialog.destroyDialog();
    }
  };
  GameMasterItem = __decorateClass([
    regClass6("RLO_Sx_qQqexnCbugglHDQ")
  ], GameMasterItem);
})();
