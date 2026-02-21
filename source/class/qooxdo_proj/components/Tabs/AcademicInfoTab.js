/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.Tabs.AcademicInfoTab", {
    extend: qx.ui.tabview.Page,
    construct: function () {
        this.base(arguments, "Academic Info");
        this.setLayout(new qx.ui.layout.VBox(10));
        this.setPadding(20);
        this._createForm();
    },
    members: {
        _programField: null,
        _yearLevelField: null,
        _gradeSchoolField: null,
        _highSchoolField: null,
        _collegeField: null,
        _createForm: function () {
            const academicInfoGrid = new qx.ui.container.Composite();
            academicInfoGrid.setLayout(new qx.ui.layout.Grid(5, 5));
            this._programField = new qx.ui.form.SelectBox();
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Computer Science"));
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Information Technology"));
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Information Systems"));
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Business Administration"));
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Accounting"));
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Marketing"));
            this._programField.add(new qx.ui.form.ListItem("Bachelor of Science in Management"));
            const programLabelContainer = new qx.ui.container.Composite();
            const programLabelLayout = new qx.ui.layout.HBox();
            programLabelLayout.setAlignY("middle");
            programLabelContainer.setLayout(programLabelLayout);
            programLabelContainer.setHeight(41);
            const programLabel = new qx.ui.basic.Label("Program:");
            programLabelContainer.add(programLabel, { flex: 0 });
            this._programField.setWidth(400);
            this._programField.setMinWidth(400);
            const programFieldContainer = new qx.ui.container.Composite();
            programFieldContainer.setLayout(new qx.ui.layout.HBox());
            programFieldContainer.setHeight(41);
            programFieldContainer.add(this._programField, { flex: 0 });
            academicInfoGrid.add(programLabelContainer, { row: 0, column: 0 });
            academicInfoGrid.add(programFieldContainer, { row: 0, column: 1 });
            this._programField.setWidth(350);
            this._yearLevelField = new qx.ui.form.SelectBox();
            this._yearLevelField.add(new qx.ui.form.ListItem("1", 1));
            this._yearLevelField.add(new qx.ui.form.ListItem("2", 2));
            this._yearLevelField.add(new qx.ui.form.ListItem("3", 3));
            this._yearLevelField.add(new qx.ui.form.ListItem("4", 4));
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
            yearLevelFieldContainer.add(this._yearLevelField, { flex: 0 });
            academicInfoGrid.add(yearLevelLabelContainer, { row: 1, column: 0 });
            academicInfoGrid.add(yearLevelFieldContainer, { row: 1, column: 1 });
            this._yearLevelField.setWidth(100);
            this._yearLevelField.setMinWidth(100);
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
            this._gradeSchoolField = new qx.ui.form.TextField();
            this._gradeSchoolField.setWidth(400);
            previousSchoolTable.add(this._gradeSchoolField, { row: 1, column: 1 });
            const highSchoolLabel = new qx.ui.basic.Label("High School:");
            highSchoolLabel.setPadding(5);
            previousSchoolTable.add(highSchoolLabel, { row: 2, column: 0 });
            this._highSchoolField = new qx.ui.form.TextField();
            this._highSchoolField.setWidth(400);
            previousSchoolTable.add(this._highSchoolField, { row: 2, column: 1 });
            const collegeLabel = new qx.ui.basic.Label("College:");
            collegeLabel.setPadding(5);
            previousSchoolTable.add(collegeLabel, { row: 3, column: 0 });
            this._collegeField = new qx.ui.form.TextField();
            this._collegeField.setWidth(400);
            previousSchoolTable.add(this._collegeField, { row: 3, column: 1 });
            this.add(previousSchoolTable);
        },
        getData: function () {
            let programValue = "";
            const programSelection = this._programField.getSelection();
            if (programSelection && programSelection.length > 0) {
                programValue = programSelection[0].getLabel();
            }
            let yearLevelValue = null;
            const yearLevelSelection = this._yearLevelField.getSelection();
            if (yearLevelSelection && yearLevelSelection.length > 0) {
                yearLevelValue = yearLevelSelection[0].getModel();
            }
            return {
                program: programValue,
                yearLevel: yearLevelValue,
                previousSchools: {
                    gradeSchool: this._gradeSchoolField.getValue() || "",
                    highSchool: this._highSchoolField.getValue() || "",
                    college: this._collegeField.getValue() || ""
                }
            };
        },
        validate: function () {
            const programSelection = this._programField.getSelection();
            const yearLevelSelection = this._yearLevelField.getSelection();
            if (!programSelection || programSelection.length === 0 ||
                !yearLevelSelection || yearLevelSelection.length === 0) {
                return { valid: false, message: "Program and Year Level are required" };
            }
            return { valid: true };
        },
        clear: function () {
            this._programField.resetSelection();
            this._yearLevelField.resetSelection();
            this._gradeSchoolField.setValue("");
            this._highSchoolField.setValue("");
            this._collegeField.setValue("");
        }
    }
});
