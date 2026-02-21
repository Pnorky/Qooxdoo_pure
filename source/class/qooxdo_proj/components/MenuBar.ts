/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.components.MenuBar",
  {
    extend: qx.ui.container.Composite,

    events: {
      /** Fired when logout is requested */
      logout: "qx.event.type.Event",
    },

    construct: function () {
      (this as any).base(arguments);

      var frame = new qx.ui.container.Composite(new qx.ui.layout.Grow());
      frame.setAllowStretchX(true);
      this.setLayout(new qx.ui.layout.Grow());
      this.setAllowStretchX(true);

      var menubar = new qx.ui.menubar.MenuBar();
      menubar.setAllowGrowX(true);
      
      frame.add(menubar);

      var windowsMenu = new qx.ui.menubar.Button("Students", null, (this as any)._getWindowsMenu());
      var windowMenu = new qx.ui.menubar.Button("Window", null, (this as any)._getWindowMenu());

      menubar.add(windowsMenu);
      menubar.add(windowMenu);

      (this as any)._logoutButton = new qx.ui.menubar.Button("Logout");
      (this as any)._logoutButton.addListener("execute", () => {
        (this as any)._handleLogout();
      }, this);
      
      menubar.addSpacer();
      menubar.add((this as any)._logoutButton);

      this.add(frame);
    },

    members:
    {
      _windowManager: null as any,
      _showPersonalInfoCheckbox: null as any,
      _showContactInfoCheckbox: null as any,
      _showAcademicInfoCheckbox: null as any,
      _showStudentTableCheckbox: null as any,
      _logoutButton: null as any,

      _handleLogout: function () {
        (this as any).fireEvent("logout");
      },

      setWindowManager: function (windowManager: any) {
        (this as any)._windowManager = windowManager;
      },

      _getWindowsMenu: function () {
        var menu = new qx.ui.menu.Menu();

        var personalInfoButton = new qx.ui.menu.Button("Personal Information");
        var contactInfoButton = new qx.ui.menu.Button("Contact Information");
        var academicInfoButton = new qx.ui.menu.Button("Academic Information");
        var studentTableButton = new qx.ui.menu.Button("Student Table");

        menu.add(personalInfoButton);
        menu.add(contactInfoButton);
        menu.add(academicInfoButton);
        menu.add(studentTableButton);

        personalInfoButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.openWindow("personalInfo");
          }
        }, this);

        contactInfoButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.openWindow("contactInfo");
          }
        }, this);

        academicInfoButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.openWindow("academicInfo");
          }
        }, this);

        studentTableButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.openWindow("studentTable");
          }
        }, this);

        return menu;
      },

      _getWindowMenu: function () {
        var menu = new qx.ui.menu.Menu();

        var cascadeWindowsButton = new qx.ui.menu.Button("Cascade Windows");
        var tileWindowsButton = new qx.ui.menu.Button("Tile Windows");
        var closeAllButton = new qx.ui.menu.Button("Close All Windows");

        menu.add(cascadeWindowsButton);
        menu.add(tileWindowsButton);
        menu.addSeparator();
        menu.add(closeAllButton);

        cascadeWindowsButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.cascadeWindows();
          }
        }, this);

        tileWindowsButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.tileWindows();
          }
        }, this);

        closeAllButton.addListener("execute", () => {
          if ((this as any)._windowManager) {
            (this as any)._windowManager.closeAllWindows();
          }
        }, this);

        return menu;
      },
    },

    destruct: function () {
      // Cleanup if needed
    }
  });
