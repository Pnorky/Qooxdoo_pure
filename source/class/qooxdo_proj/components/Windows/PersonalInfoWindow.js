/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.Windows.PersonalInfoWindow", {
    extend: qx.ui.window.Window,
    construct: function () {
        this.base(arguments, "Personal Information");
        this.setLayout(new qx.ui.layout.VBox(10));
        this.setWidth(600);
        this.setHeight(500);
        this.setAllowClose(true);
        this.setAllowMaximize(false);
        this.setAllowMinimize(true);
        this.setResizable(true);
        this.setMovable(true);
        this._personalInfoTab = new qooxdo_proj.components.Tabs.PersonalInfoTab();
        this.add(this._personalInfoTab, { flex: 1 });
    },
    members: {
        _personalInfoTab: null,
        getPersonalInfoTab: function () { return this._personalInfoTab; },
        getData: function () {
            return this._personalInfoTab ? this._personalInfoTab.getData() : {};
        },
        validate: function () {
            return this._personalInfoTab ? this._personalInfoTab.validate() : { valid: false, message: "Form not initialized" };
        },
        clear: function () {
            if (this._personalInfoTab) {
                this._personalInfoTab.clear();
            }
        }
    }
});
