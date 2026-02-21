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
    (this as any).base(arguments);
    this.setLayout(new qx.ui.layout.HBox(10));

    (this as any)._createButtons();
  },

  members: {
    _submitButton: null as any,
    _cancelButton: null as any,

    _createButtons: function () {
      (this as any)._submitButton = new qx.ui.form.Button("Submit");
      (this as any)._cancelButton = new qx.ui.form.Button("Cancel");

      (this as any)._submitButton.addListener("execute", () => {
        (this as any).fireEvent("submit");
      });

      (this as any)._cancelButton.addListener("execute", () => {
        (this as any).fireEvent("cancel");
      });

      this.add((this as any)._submitButton);
      this.add((this as any)._cancelButton);
    },

    setSubmitEnabled: function (enabled: boolean) {
      (this as any)._submitButton.setEnabled(enabled);
    },

    setCancelEnabled: function (enabled: boolean) {
      (this as any)._cancelButton.setEnabled(enabled);
    },

    getSubmitButton: function () {
      return (this as any)._submitButton;
    },

    getCancelButton: function () {
      return (this as any)._cancelButton;
    },
  },
});
