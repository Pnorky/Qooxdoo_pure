/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Windows.PersonalInfoWindow",
{
  extend : qx.ui.window.Window,

  construct : function()
  {
    (this as any).base(arguments, "Personal Information");
    
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setWidth(600);
    this.setHeight(500);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(true);
    this.setResizable(true);
    this.setMovable(true);

    (this as any)._personalInfoTab = new qooxdo_proj.components.Tabs.PersonalInfoTab();
    this.add((this as any)._personalInfoTab, { flex: 1 });
  },

  members :
  {
    _personalInfoTab : null as any,

    getPersonalInfoTab : function() { return (this as any)._personalInfoTab; },

    getData : function() {
      return (this as any)._personalInfoTab ? (this as any)._personalInfoTab.getData() : {};
    },

    validate : function() {
      return (this as any)._personalInfoTab ? (this as any)._personalInfoTab.validate() : { valid: false, message: "Form not initialized" };
    },

    clear : function() {
      if ((this as any)._personalInfoTab) {
        (this as any)._personalInfoTab.clear();
      }
    }
  }
});
