/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.Buttons.FormActionButtons", {
    extend: qx.ui.container.Composite,
    events: {
        submit: "qx.event.type.Event",
        cancel: "qx.event.type.Event",
    },
    construct: function () {
        this.base(arguments);
        this.setLayout(new qx.ui.layout.HBox(10));
        this._createButtons();
    },
    members: {
        _submitButton: null,
        _cancelButton: null,
        _createButtons: function () {
            this._submitButton = new qx.ui.form.Button("Submit");
            this._cancelButton = new qx.ui.form.Button("Cancel");
            this._submitButton.addListener("execute", () => {
                this.fireEvent("submit");
            });
            this._cancelButton.addListener("execute", () => {
                this.fireEvent("cancel");
            });
            this.add(this._submitButton);
            this.add(this._cancelButton);
        },
        setSubmitEnabled: function (enabled) {
            this._submitButton.setEnabled(enabled);
        },
        setCancelEnabled: function (enabled) {
            this._cancelButton.setEnabled(enabled);
        },
        getSubmitButton: function () {
            return this._submitButton;
        },
        getCancelButton: function () {
            return this._cancelButton;
        },
    },
});
