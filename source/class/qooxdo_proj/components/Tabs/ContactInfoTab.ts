/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Tabs.ContactInfoTab",
{
  extend : qx.ui.tabview.Page,

  construct : function()
  {
    (this as any).base(arguments, "Contact Info");
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setPadding(20);
    (this as any)._createForm();
  },

  members :
  {
    _emailField : null as any,
    _personalPhoneField : null as any,
    _emergencyContactField : null as any,
    _emergencyContactPhoneField : null as any,
    _relationshipField : null as any,

    _createForm : function()
    {
      const grid = new qx.ui.container.Composite();
      grid.setLayout(new qx.ui.layout.Grid(15, 5));

      (this as any)._emailField = new qx.ui.form.TextField();
      const emailLabel = new qx.ui.basic.Label("Email:");
      emailLabel.setWidth(180);
      grid.add(emailLabel, { row: 0, column: 0 });
      grid.add((this as any)._emailField, { row: 0, column: 1 });

      (this as any)._personalPhoneField = new qx.ui.form.TextField();
      const personalPhoneLabel = new qx.ui.basic.Label("Personal Phone:");
      personalPhoneLabel.setWidth(180);
      grid.add(personalPhoneLabel, { row: 1, column: 0 });
      grid.add((this as any)._personalPhoneField, { row: 1, column: 1 });
      (this as any)._personalPhoneField.setWidth(300);

      (this as any)._emergencyContactField = new qx.ui.form.TextField();
      const emergencyContactLabel = new qx.ui.basic.Label("Emergency Contact:");
      emergencyContactLabel.setWidth(180);
      grid.add(emergencyContactLabel, { row: 2, column: 0 });
      grid.add((this as any)._emergencyContactField, { row: 2, column: 1 });
      (this as any)._emergencyContactField.setWidth(300);

      (this as any)._emergencyContactPhoneField = new qx.ui.form.TextField();
      const emergencyContactPhoneLabel = new qx.ui.basic.Label("Emergency Contact Phone:");
      emergencyContactPhoneLabel.setWidth(200);
      grid.add(emergencyContactPhoneLabel, { row: 3, column: 0 });
      grid.add((this as any)._emergencyContactPhoneField, { row: 3, column: 1 });
      (this as any)._emergencyContactPhoneField.setWidth(300);

      (this as any)._relationshipField = new qx.ui.form.TextField();
      const relationshipLabel = new qx.ui.basic.Label("Relationship:");
      relationshipLabel.setWidth(180);
      grid.add(relationshipLabel, { row: 4, column: 0 });
      grid.add((this as any)._relationshipField, { row: 4, column: 1 });
      (this as any)._relationshipField.setWidth(300);
      this.add(grid, { flex: 1 });
    },

    getData : function(): any
    {
      return {
        email: (this as any)._emailField.getValue() || "",
        personalPhone: (this as any)._personalPhoneField.getValue() || "",
        emergencyContact: (this as any)._emergencyContactField.getValue() || "",
        emergencyContactPhone: (this as any)._emergencyContactPhoneField.getValue() || "",
        relationship: (this as any)._relationshipField.getValue() || ""
      };
    },

    validate : function(): any
    {
      if (!(this as any)._emailField.getValue()) {
        return { valid: false, message: "Email is required" };
      }
      return { valid: true };
    },

    clear : function(): void
    {
      (this as any)._emailField.setValue("");
      (this as any)._personalPhoneField.setValue("");
      (this as any)._emergencyContactField.setValue("");
      (this as any)._emergencyContactPhoneField.setValue("");
      (this as any)._relationshipField.setValue("");
    }
  }
});
