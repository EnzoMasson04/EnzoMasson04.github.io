import {
  Vector2
} from "./chunk-NSAPKY2D.js";

// node_modules/@babylonjs/core/Events/pointerEvents.js
var PointerEventTypes = class {
};
PointerEventTypes.POINTERDOWN = 1;
PointerEventTypes.POINTERUP = 2;
PointerEventTypes.POINTERMOVE = 4;
PointerEventTypes.POINTERWHEEL = 8;
PointerEventTypes.POINTERPICK = 16;
PointerEventTypes.POINTERTAP = 32;
PointerEventTypes.POINTERDOUBLETAP = 64;
var PointerInfoBase = class {
  /**
   * Instantiates the base class of pointers info.
   * @param type Defines the type of event (PointerEventTypes)
   * @param event Defines the related dom event
   */
  constructor(type, event) {
    this.type = type;
    this.event = event;
  }
};
var PointerInfoPre = class extends PointerInfoBase {
  /**
   * Instantiates a PointerInfoPre to store pointer related info to the onPrePointerObservable event.
   * @param type Defines the type of event (PointerEventTypes)
   * @param event Defines the related dom event
   * @param localX Defines the local x coordinates of the pointer when the event occured
   * @param localY Defines the local y coordinates of the pointer when the event occured
   */
  constructor(type, event, localX, localY) {
    super(type, event);
    this.ray = null;
    this.originalPickingInfo = null;
    this.skipOnPointerObservable = false;
    this.localPosition = new Vector2(localX, localY);
  }
};
var PointerInfo = class extends PointerInfoBase {
  /**
   * Defines the picking info associated with this PointerInfo object (if applicable)
   */
  get pickInfo() {
    if (!this._pickInfo) {
      this._generatePickInfo();
    }
    return this._pickInfo;
  }
  /**
   * Instantiates a PointerInfo to store pointer related info to the onPointerObservable event.
   * @param type Defines the type of event (PointerEventTypes)
   * @param event Defines the related dom event
   * @param pickInfo Defines the picking info associated to the info (if any)
   * @param inputManager Defines the InputManager to use if there is no pickInfo
   */
  constructor(type, event, pickInfo, inputManager = null) {
    super(type, event);
    this._pickInfo = pickInfo;
    this._inputManager = inputManager;
  }
  /**
   * Generates the picking info if needed
   */
  /** @internal */
  _generatePickInfo() {
    if (this._inputManager) {
      this._pickInfo = this._inputManager._pickMove(this.event);
      this._inputManager._setRayOnPointerInfo(this._pickInfo, this.event);
      this._inputManager = null;
    }
  }
};

// node_modules/@babylonjs/core/Events/keyboardEvents.js
var KeyboardEventTypes = class {
};
KeyboardEventTypes.KEYDOWN = 1;
KeyboardEventTypes.KEYUP = 2;
var KeyboardInfo = class {
  /**
   * Instantiates a new keyboard info.
   * This class is used to store keyboard related info for the onKeyboardObservable event.
   * @param type Defines the type of event (KeyboardEventTypes)
   * @param event Defines the related dom event
   */
  constructor(type, event) {
    this.type = type;
    this.event = event;
  }
};
var KeyboardInfoPre = class extends KeyboardInfo {
  /**
   * Defines whether the engine should skip the next onKeyboardObservable associated to this pre.
   * @deprecated use skipOnKeyboardObservable property instead
   */
  get skipOnPointerObservable() {
    return this.skipOnKeyboardObservable;
  }
  set skipOnPointerObservable(value) {
    this.skipOnKeyboardObservable = value;
  }
  /**
   * Instantiates a new keyboard pre info.
   * This class is used to store keyboard related info for the onPreKeyboardObservable event.
   * @param type Defines the type of event (KeyboardEventTypes)
   * @param event Defines the related dom event
   */
  constructor(type, event) {
    super(type, event);
    this.type = type;
    this.event = event;
    this.skipOnKeyboardObservable = false;
  }
};

export {
  PointerEventTypes,
  PointerInfoPre,
  PointerInfo,
  KeyboardEventTypes,
  KeyboardInfo,
  KeyboardInfoPre
};
//# sourceMappingURL=chunk-DAQCNZDC.js.map
