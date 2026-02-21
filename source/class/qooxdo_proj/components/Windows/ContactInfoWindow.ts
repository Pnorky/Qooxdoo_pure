/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.Windows.ContactInfoWindow",
{
  extend : qx.ui.window.Window,

  construct : function()
  {
    (this as any).base(arguments, "Contact Information");
    
    this.setLayout(new qx.ui.layout.VBox(10));
    this.setWidth(600);
    this.setHeight(500);
    this.setAllowClose(true);
    this.setAllowMaximize(false);
    this.setAllowMinimize(true);
    this.setResizable(true);
    this.setMovable(true);

    (this as any)._contactInfoTab = new qooxdo_proj.components.Tabs.ContactInfoTab();
    this.add((this as any)._contactInfoTab, { flex: 1 });
  },

  members :
  {
    _contactInfoTab : null as any,

    getContactInfoTab : function() { return (this as any)._contactInfoTab; },

    getData : function() {
      return (this as any)._contactInfoTab ? (this as any)._contactInfoTab.getData() : {};
    },

    validate : function() {
      return (this as any)._contactInfoTab ? (this as any)._contactInfoTab.validate() : { valid: false, message: "Form not initialized" };
    },

    clear : function() {
      if ((this as any)._contactInfoTab) {
        (this as any)._contactInfoTab.clear();
      }
    }
  }
});
