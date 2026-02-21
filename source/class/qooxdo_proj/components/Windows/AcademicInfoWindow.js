/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.Windows.AcademicInfoWindow", {
    extend: qx.ui.window.Window,
    construct: function () {
        this.base(arguments, "Academic Information");
        this.setLayout(new qx.ui.layout.VBox(10));
        this.setWidth(600);
        this.setHeight(500);
        this.setAllowClose(true);
        this.setAllowMaximize(false);
        this.setAllowMinimize(true);
        this.setResizable(true);
        this.setMovable(true);
        this._academicInfoTab = new qooxdo_proj.components.Tabs.AcademicInfoTab();
        this.add(this._academicInfoTab, { flex: 1 });
    },
    members: {
        _academicInfoTab: null,
        getAcademicInfoTab: function () { return this._academicInfoTab; },
        getData: function () {
            return this._academicInfoTab ? this._academicInfoTab.getData() : {};
        },
        validate: function () {
            return this._academicInfoTab ? this._academicInfoTab.validate() : { valid: false, message: "Form not initialized" };
        },
        clear: function () {
            if (this._academicInfoTab) {
                this._academicInfoTab.clear();
            }
        }
    }
});
