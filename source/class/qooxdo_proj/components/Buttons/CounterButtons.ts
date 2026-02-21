/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Buttons.CounterButtons", {
  extend: qx.ui.container.Composite,

  events: {
    pressMe: "qx.event.type.Data",
    resetCounter: "qx.event.type.Event",
  },

  construct: function () {
    (this as any).base(arguments);
    this.setLayout(new qx.ui.layout.HBox(10));

    (this as any)._clickCount = 0;
    (this as any)._createButtons();
  },

  members: {
    _pressMeButton: null as any,
    _resetCounterButton: null as any,
    _clickCount: 0,

    _createButtons: function () {
      (this as any)._pressMeButton = new qx.ui.form.Button("Press Me");
      (this as any)._resetCounterButton = new qx.ui.form.Button("Reset");

      (this as any)._pressMeButton.addListener("execute", () => {
        (this as any)._clickCount++;
        (this as any).fireDataEvent("pressMe", {
          count: (this as any)._clickCount,
          message: `Button clicked ${(this as any)._clickCount} time${(this as any)._clickCount !== 1 ? "s" : ""}`,
        });
      });

      (this as any)._resetCounterButton.addListener("execute", () => {
        (this as any)._clickCount = 0;
        (this as any).fireEvent("resetCounter");
      });

      this.add((this as any)._pressMeButton);
      this.add((this as any)._resetCounterButton);
    },

    getCount: function () {
      return (this as any)._clickCount;
    },

    resetCount: function () {
      (this as any)._clickCount = 0;
    },

    getPressMeButton: function () {
      return (this as any)._pressMeButton;
    },

    getResetCounterButton: function () {
      return (this as any)._resetCounterButton;
    },
  },
});
