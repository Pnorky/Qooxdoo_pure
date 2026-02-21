/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Tabs.PersonalInfoTab", {
  extend: qx.ui.tabview.Page,

  construct: function () {
    (this as any).base(arguments, "Personal Info");
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setPadding(20);

    (this as any)._createForm();
  },

  members: {
    _studentIdField: null as any,
    _firstNameField: null as any,
    _lastNameField: null as any,
    _dobField: null as any,
    _genderField: null as any,
    _addressField: null as any,

    _createForm: function () {
      const grid = new qx.ui.container.Composite();
      grid.setLayout(new qx.ui.layout.Grid(5, 5));

      (this as any)._studentIdField = new qx.ui.form.TextField();
      grid.add(new qx.ui.basic.Label("Student ID:"), { row: 0, column: 0 });
      grid.add((this as any)._studentIdField, { row: 0, column: 1 });

      (this as any)._firstNameField = new qx.ui.form.TextField();
      grid.add(new qx.ui.basic.Label("First Name:"), { row: 1, column: 0 });
      grid.add((this as any)._firstNameField, { row: 1, column: 1 });

      (this as any)._lastNameField = new qx.ui.form.TextField();
      grid.add(new qx.ui.basic.Label("Last Name:"), { row: 2, column: 0 });
      grid.add((this as any)._lastNameField, { row: 2, column: 1 });

      (this as any)._dobField = new qx.ui.form.DateField();
      (this as any)._dobField.setMaxWidth(180);
      grid.add(new qx.ui.basic.Label("Date of Birth:"), { row: 3, column: 0 });
      grid.add((this as any)._dobField, { row: 3, column: 1 });

      (this as any)._genderField = new qx.ui.form.SelectBox();
      (this as any)._genderField.add(new qx.ui.form.ListItem("Male"));
      (this as any)._genderField.add(new qx.ui.form.ListItem("Female"));
      (this as any)._genderField.setWidth(180);

      const genderLabelContainer = new qx.ui.container.Composite();
      const labelLayout = new qx.ui.layout.HBox();
      labelLayout.setAlignY("middle");
      genderLabelContainer.setLayout(labelLayout);
      genderLabelContainer.setHeight(41);
      const genderLabel = new qx.ui.basic.Label("Gender:");
      genderLabelContainer.add(genderLabel, { flex: 0 });

      const genderFieldContainer = new qx.ui.container.Composite();
      genderFieldContainer.setLayout(new qx.ui.layout.HBox());
      genderFieldContainer.setHeight(41);
      genderFieldContainer.add((this as any)._genderField, { flex: 0 });

      grid.add(genderLabelContainer, { row: 4, column: 0 });
      grid.add(genderFieldContainer, { row: 4, column: 1 });

      const addressLabelContainer = new qx.ui.container.Composite();
      addressLabelContainer.setLayout(new qx.ui.layout.HBox());
      const addressLabel = new qx.ui.basic.Label("Address:");
      addressLabelContainer.add(addressLabel, { flex: 0 });

      const addressFieldContainer = new qx.ui.container.Composite();
      addressFieldContainer.setLayout(new qx.ui.layout.HBox());

      (this as any)._addressField = new qx.ui.form.TextArea();
      (this as any)._addressField.setHeight(100);
      (this as any)._addressField.setMinWidth(400);
      (this as any)._addressField.setWidth(400);
      addressFieldContainer.add((this as any)._addressField);

      grid.add(addressLabelContainer, { row: 5, column: 0 });
      grid.add(addressFieldContainer, { row: 5, column: 1 });

      this.add(grid, { flex: 1 });
    },

    getData: function (): any {
      const sel = (this as any)._genderField.getSelection();
      return {
        studentId: (this as any)._studentIdField.getValue() || "",
        firstName: (this as any)._firstNameField.getValue() || "",
        lastName: (this as any)._lastNameField.getValue() || "",
        dateOfBirth: (this as any)._dobField.getValue(),
        gender: sel && sel.length > 0 ? sel[0].getLabel() : "",
        address: (this as any)._addressField.getValue() || "",
      };
    },

    validate: function (): any {
      if (
        !(this as any)._studentIdField.getValue() ||
        !(this as any)._firstNameField.getValue() ||
        !(this as any)._lastNameField.getValue()
      ) {
        return { valid: false, message: "Please fill required Personal Info fields (Student ID, First Name, Last Name)" };
      }
      return { valid: true };
    },

    clear: function () {
      (this as any)._studentIdField.setValue("");
      (this as any)._firstNameField.setValue("");
      (this as any)._lastNameField.setValue("");
      (this as any)._dobField.setValue(null);
      (this as any)._genderField.resetSelection();
      (this as any)._addressField.setValue("");
    },
  },
});
