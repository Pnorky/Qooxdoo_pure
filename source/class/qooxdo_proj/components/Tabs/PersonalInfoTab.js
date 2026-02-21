/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.Tabs.PersonalInfoTab", {
    extend: qx.ui.tabview.Page,
    construct: function () {
        this.base(arguments, "Personal Info");
        this.setLayout(new qx.ui.layout.VBox(10));
        this.setPadding(20);
        this._createForm();
    },
    members: {
        _studentIdField: null,
        _firstNameField: null,
        _lastNameField: null,
        _dobField: null,
        _genderField: null,
        _addressField: null,
        _createForm: function () {
            const grid = new qx.ui.container.Composite();
            grid.setLayout(new qx.ui.layout.Grid(5, 5));
            this._studentIdField = new qx.ui.form.TextField();
            grid.add(new qx.ui.basic.Label("Student ID:"), { row: 0, column: 0 });
            grid.add(this._studentIdField, { row: 0, column: 1 });
            this._firstNameField = new qx.ui.form.TextField();
            grid.add(new qx.ui.basic.Label("First Name:"), { row: 1, column: 0 });
            grid.add(this._firstNameField, { row: 1, column: 1 });
            this._lastNameField = new qx.ui.form.TextField();
            grid.add(new qx.ui.basic.Label("Last Name:"), { row: 2, column: 0 });
            grid.add(this._lastNameField, { row: 2, column: 1 });
            this._dobField = new qx.ui.form.DateField();
            this._dobField.setMaxWidth(180);
            grid.add(new qx.ui.basic.Label("Date of Birth:"), { row: 3, column: 0 });
            grid.add(this._dobField, { row: 3, column: 1 });
            this._genderField = new qx.ui.form.SelectBox();
            this._genderField.add(new qx.ui.form.ListItem("Male"));
            this._genderField.add(new qx.ui.form.ListItem("Female"));
            this._genderField.setWidth(180);
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
            genderFieldContainer.add(this._genderField, { flex: 0 });
            grid.add(genderLabelContainer, { row: 4, column: 0 });
            grid.add(genderFieldContainer, { row: 4, column: 1 });
            const addressLabelContainer = new qx.ui.container.Composite();
            addressLabelContainer.setLayout(new qx.ui.layout.HBox());
            const addressLabel = new qx.ui.basic.Label("Address:");
            addressLabelContainer.add(addressLabel, { flex: 0 });
            const addressFieldContainer = new qx.ui.container.Composite();
            addressFieldContainer.setLayout(new qx.ui.layout.HBox());
            this._addressField = new qx.ui.form.TextArea();
            this._addressField.setHeight(100);
            this._addressField.setMinWidth(400);
            this._addressField.setWidth(400);
            addressFieldContainer.add(this._addressField);
            grid.add(addressLabelContainer, { row: 5, column: 0 });
            grid.add(addressFieldContainer, { row: 5, column: 1 });
            this.add(grid, { flex: 1 });
        },
        getData: function () {
            const sel = this._genderField.getSelection();
            return {
                studentId: this._studentIdField.getValue() || "",
                firstName: this._firstNameField.getValue() || "",
                lastName: this._lastNameField.getValue() || "",
                dateOfBirth: this._dobField.getValue(),
                gender: sel && sel.length > 0 ? sel[0].getLabel() : "",
                address: this._addressField.getValue() || "",
            };
        },
        validate: function () {
            if (!this._studentIdField.getValue() ||
                !this._firstNameField.getValue() ||
                !this._lastNameField.getValue()) {
                return { valid: false, message: "Please fill required Personal Info fields (Student ID, First Name, Last Name)" };
            }
            return { valid: true };
        },
        clear: function () {
            this._studentIdField.setValue("");
            this._firstNameField.setValue("");
            this._lastNameField.setValue("");
            this._dobField.setValue(null);
            this._genderField.resetSelection();
            this._addressField.setValue("");
        },
    },
});
