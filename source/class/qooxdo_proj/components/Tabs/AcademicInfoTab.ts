/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Tabs.AcademicInfoTab",
{
  extend : qx.ui.tabview.Page,

  construct : function()
  {
    (this as any).base(arguments, "Academic Info");
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setPadding(20);
    (this as any)._createForm();
  },

  members :
  {
    _programField : null as any,
    _yearLevelField : null as any,
    _gradeSchoolField : null as any,
    _highSchoolField : null as any,
    _collegeField : null as any,

    _createForm : function()
    {
      const academicInfoGrid = new qx.ui.container.Composite();
      academicInfoGrid.setLayout(new qx.ui.layout.Grid(5, 5));

      (this as any)._programField = new qx.ui.form.SelectBox();
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Computer Science"));
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Information Technology"));
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Information Systems"));
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Business Administration"));
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Accounting"));
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Marketing"));
      (this as any)._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Management"));

      const programLabelContainer = new qx.ui.container.Composite();
      const programLabelLayout = new qx.ui.layout.HBox();
      programLabelLayout.setAlignY("middle");
      programLabelContainer.setLayout(programLabelLayout);
      programLabelContainer.setHeight(41);
      const programLabel = new qx.ui.basic.Label("Program:");
      programLabelContainer.add(programLabel, { flex: 0 });
      (this as any)._programField.setWidth(400);
      (this as any)._programField.setMinWidth(400);

      const programFieldContainer = new qx.ui.container.Composite();
      programFieldContainer.setLayout(new qx.ui.layout.HBox());
      programFieldContainer.setHeight(41);
      programFieldContainer.add((this as any)._programField, { flex: 0 });

      academicInfoGrid.add(programLabelContainer, { row: 0, column: 0 });
      academicInfoGrid.add(programFieldContainer, { row: 0, column: 1 });
      (this as any)._programField.setWidth(350);

      (this as any)._yearLevelField = new qx.ui.form.SelectBox();
      // pass null for the icon parameter and use the third argument for the value/model
      (this as any)._yearLevelField.add(new qx.ui.form.ListItem("1", null, 1 as any));
      (this as any)._yearLevelField.add(new qx.ui.form.ListItem("2", null, 2 as any));
      (this as any)._yearLevelField.add(new qx.ui.form.ListItem("3", null, 3 as any));
      (this as any)._yearLevelField.add(new qx.ui.form.ListItem("4", null, 4 as any));

      const yearLevelLabelContainer = new qx.ui.container.Composite();
      const yearLevelLabelLayout = new qx.ui.layout.HBox();
      yearLevelLabelLayout.setAlignY("middle");
      yearLevelLabelContainer.setLayout(yearLevelLabelLayout);
      yearLevelLabelContainer.setHeight(41);
      const yearLevelLabel = new qx.ui.basic.Label("Year Level:");
      yearLevelLabelContainer.add(yearLevelLabel, { flex: 0 });

      const yearLevelFieldContainer = new qx.ui.container.Composite();
      yearLevelFieldContainer.setLayout(new qx.ui.layout.HBox());
      yearLevelFieldContainer.setHeight(41);
      yearLevelFieldContainer.add((this as any)._yearLevelField, { flex: 0 });

      academicInfoGrid.add(yearLevelLabelContainer, { row: 1, column: 0 });
      academicInfoGrid.add(yearLevelFieldContainer, { row: 1, column: 1 });
      (this as any)._yearLevelField.setWidth(100);
      (this as any)._yearLevelField.setMinWidth(100);

      this.add(academicInfoGrid);

      const previousSchoolLabel = new qx.ui.basic.Label("Previous School Attended:");
      previousSchoolLabel.setFont("bold");
      this.add(previousSchoolLabel);

      const previousSchoolTable = new qx.ui.container.Composite();
      previousSchoolTable.setLayout(new qx.ui.layout.Grid(2, 2));
      previousSchoolTable.setDecorator("main");
      previousSchoolTable.setPadding(5);

      const headerType = new qx.ui.basic.Label("School Type");
      headerType.setFont("bold");
      headerType.setPadding(5);
      previousSchoolTable.add(headerType, { row: 0, column: 0 });

      const headerName = new qx.ui.basic.Label("School Name");
      headerName.setFont("bold");
      headerName.setPadding(5);
      previousSchoolTable.add(headerName, { row: 0, column: 1 });

      const gradeSchoolLabel = new qx.ui.basic.Label("Grade School:");
      gradeSchoolLabel.setPadding(5);
      previousSchoolTable.add(gradeSchoolLabel, { row: 1, column: 0 });
      (this as any)._gradeSchoolField = new qx.ui.form.TextField();
      (this as any)._gradeSchoolField.setWidth(400);
      previousSchoolTable.add((this as any)._gradeSchoolField, { row: 1, column: 1 });

      const highSchoolLabel = new qx.ui.basic.Label("High School:");
      highSchoolLabel.setPadding(5);
      previousSchoolTable.add(highSchoolLabel, { row: 2, column: 0 });
      (this as any)._highSchoolField = new qx.ui.form.TextField();
      (this as any)._highSchoolField.setWidth(400);
      previousSchoolTable.add((this as any)._highSchoolField, { row: 2, column: 1 });

      const collegeLabel = new qx.ui.basic.Label("College:");
      collegeLabel.setPadding(5);
      previousSchoolTable.add(collegeLabel, { row: 3, column: 0 });
      (this as any)._collegeField = new qx.ui.form.TextField();
      (this as any)._collegeField.setWidth(400);
      previousSchoolTable.add((this as any)._collegeField, { row: 3, column: 1 });

      this.add(previousSchoolTable);
    },

    getData : function(): any
    {
      let programValue = "";
      const programSelection = (this as any)._programField.getSelection();
      if (programSelection && programSelection.length > 0) {
        programValue = programSelection[0].getLabel();
      }
      let yearLevelValue: any = null;
      const yearLevelSelection = (this as any)._yearLevelField.getSelection();
      if (yearLevelSelection && yearLevelSelection.length > 0) {
        yearLevelValue = yearLevelSelection[0].getModel();
      }
      return {
        program: programValue,
        yearLevel: yearLevelValue,
        previousSchools: {
          gradeSchool: (this as any)._gradeSchoolField.getValue() || "",
          highSchool: (this as any)._highSchoolField.getValue() || "",
          college: (this as any)._collegeField.getValue() || ""
        }
      };
    },

    validate : function(): any
    {
      const programSelection = (this as any)._programField.getSelection();
      const yearLevelSelection = (this as any)._yearLevelField.getSelection();
      if (!programSelection || programSelection.length === 0 ||
          !yearLevelSelection || yearLevelSelection.length === 0) {
        return { valid: false, message: "Program and Year Level are required" };
      }
      return { valid: true };
    },

    clear : function(): void
    {
      (this as any)._programField.resetSelection();
      (this as any)._yearLevelField.resetSelection();
      (this as any)._gradeSchoolField.setValue("");
      (this as any)._highSchoolField.setValue("");
      (this as any)._collegeField.setValue("");
    }
  }
});
