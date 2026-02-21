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
        this.base(arguments);
        this.setLayout(new qx.ui.layout.HBox(10));
        this._clickCount = 0;
        this._createButtons();
    },
    members: {
        _pressMeButton: null,
        _resetCounterButton: null,
        _clickCount: 0,
        _createButtons: function () {
            this._pressMeButton = new qx.ui.form.Button("Press Me");
            this._resetCounterButton = new qx.ui.form.Button("Reset");
            this._pressMeButton.addListener("execute", () => {
                this._clickCount++;
                this.fireDataEvent("pressMe", {
                    count: this._clickCount,
                    message: `Button clicked ${this._clickCount} time${this._clickCount !== 1 ? "s" : ""}`,
                });
            });
            this._resetCounterButton.addListener("execute", () => {
                this._clickCount = 0;
                this.fireEvent("resetCounter");
            });
            this.add(this._pressMeButton);
            this.add(this._resetCounterButton);
        },
        getCount: function () {
            return this._clickCount;
        },
        resetCount: function () {
            this._clickCount = 0;
        },
        getPressMeButton: function () {
            return this._pressMeButton;
        },
        getResetCounterButton: function () {
            return this._resetCounterButton;
        },
    },
});
