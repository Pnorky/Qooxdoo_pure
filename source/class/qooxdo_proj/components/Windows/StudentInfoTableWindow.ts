/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Windows.StudentInfoTableWindow",
{
  extend : qx.ui.window.Window,

  construct : function()
  {
    (this as any).base(arguments, "Student Information Table");
    
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setWidth(800);
    this.setHeight(500);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(true);
    this.setResizable(true);
    this.setMovable(true);

    (this as any)._studentInfoTable = new qooxdo_proj.components.Tabs.StudentInfoTable();
    this.add((this as any)._studentInfoTable, { flex: 1 });
  },

  members :
  {
    _studentInfoTable : null as any,

    getStudentInfoTable : function() { return (this as any)._studentInfoTable; },

    addStudent : function(studentData: any) {
      if ((this as any)._studentInfoTable) {
        (this as any)._studentInfoTable.addStudent(studentData);
      }
    },

    clear : function() {
      if ((this as any)._studentInfoTable) {
        (this as any)._studentInfoTable.clear();
      }
    },

    loadStudents : function() {
      if ((this as any)._studentInfoTable) {
        (this as any)._studentInfoTable.loadStudents();
      }
    }
  }
});
