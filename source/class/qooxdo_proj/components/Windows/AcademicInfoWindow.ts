/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Windows.AcademicInfoWindow",
{
  extend : qx.ui.window.Window,

  construct : function()
  {
    (this as any).base(arguments, "Academic Information");
    
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setWidth(600);
    this.setHeight(500);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(true);
    this.setResizable(true);
    this.setMovable(true);

    (this as any)._academicInfoTab = new qooxdo_proj.components.Tabs.AcademicInfoTab();
    this.add((this as any)._academicInfoTab, { flex: 1 });
  },

  members :
  {
    _academicInfoTab : null as any,

    getAcademicInfoTab : function() { return (this as any)._academicInfoTab; },

    getData : function() {
      return (this as any)._academicInfoTab ? (this as any)._academicInfoTab.getData() : {};
    },

    validate : function() {
      return (this as any)._academicInfoTab ? (this as any)._academicInfoTab.validate() : { valid: false, message: "Form not initialized" };
    },

    clear : function() {
      if ((this as any)._academicInfoTab) {
        (this as any)._academicInfoTab.clear();
      }
    }
  }
});
