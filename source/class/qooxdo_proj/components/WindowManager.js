/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.WindowManager", {
    extend: qx.core.Object,
    members: {
        _windows: null,
        _root: null,
        init: function (root) {
            this._root = root;
            this._windows = {};
        },
        registerWindow: function (windowId, window, options) {
            const windows = this._windows;
            if (windows[windowId]) {
                const existingWin = windows[windowId];
                existingWin.open();
                if (existingWin.toFront) {
                    existingWin.toFront();
                }
                return existingWin;
            }
            const defaultOptions = {
                left: 50,
                top: 50,
                open: true
            };
            const finalOptions = qx.lang.Object.mergeWith(defaultOptions, options || {});
            this._root.add(window, {
                left: finalOptions.left,
                top: finalOptions.top
            });
            this._windows[windowId] = window;
            if (finalOptions.open !== false) {
                window.open();
            }
            window.addListener("close", () => { }, this);
            window.addListener("appear", () => { }, this);
            return window;
        },
        createWindow: function (windowId, title, icon, content, options) {
            const windows = this._windows;
            if (windows[windowId]) {
                const existingWin = windows[windowId];
                existingWin.open();
                if (existingWin.toFront) {
                    existingWin.toFront();
                }
                return existingWin;
            }
            const win = new qx.ui.window.Window(title, icon);
            win.setLayout(new qx.ui.layout.VBox(10));
            win.setShowStatusbar(true);
            win.setStatus("Ready");
            const defaultOptions = {
                left: 50,
                top: 50,
                width: 600,
                height: 500,
                allowClose: true,
                allowMaximize: true,
                allowMinimize: true,
                showClose: true,
                showMaximize: true,
                showMinimize: true,
                resizable: true,
                movable: true
            };
            const finalOptions = qx.lang.Object.mergeWith(defaultOptions, options || {});
            if (finalOptions.width)
                win.setWidth(finalOptions.width);
            if (finalOptions.height)
                win.setHeight(finalOptions.height);
            if (finalOptions.allowClose !== undefined)
                win.setAllowClose(finalOptions.allowClose);
            if (finalOptions.allowMaximize !== undefined)
                win.setAllowMaximize(finalOptions.allowMaximize);
            if (finalOptions.allowMinimize !== undefined)
                win.setAllowMinimize(finalOptions.allowMinimize);
            if (finalOptions.showClose !== undefined)
                win.setShowClose(finalOptions.showClose);
            if (finalOptions.showMaximize !== undefined)
                win.setShowMaximize(finalOptions.showMaximize);
            if (finalOptions.showMinimize !== undefined)
                win.setShowMinimize(finalOptions.showMinimize);
            if (finalOptions.resizable !== undefined) {
                win.setResizableTop(finalOptions.resizable);
                win.setResizableRight(finalOptions.resizable);
                win.setResizableBottom(finalOptions.resizable);
                win.setResizableLeft(finalOptions.resizable);
            }
            if (finalOptions.movable !== undefined)
                win.setMovable(finalOptions.movable);
            if (content) {
                win.add(content, { flex: 1 });
            }
            this._root.add(win, {
                left: finalOptions.left,
                top: finalOptions.top
            });
            this._windows[windowId] = win;
            win.open();
            win.addListener("close", () => { }, this);
            return win;
        },
        getWindow: function (windowId) {
            return this._windows[windowId] || null;
        },
        openWindow: function (windowId) {
            const win = this._windows[windowId];
            if (win) {
                win.open();
                if (win.toFront) {
                    win.toFront();
                }
            }
        },
        closeWindow: function (windowId) {
            const win = this._windows[windowId];
            if (win) {
                win.close();
            }
        },
        closeAllWindows: function () {
            const windows = this._windows;
            for (const windowId in windows) {
                if (windows[windowId]) {
                    windows[windowId].close();
                }
            }
        },
        cascadeWindows: function () {
            let left = 50;
            let top = 50;
            const offset = 30;
            const windows = this._windows;
            for (const windowId in windows) {
                const win = windows[windowId];
                if (win && win.isVisible()) {
                    win.moveTo(left, top);
                    if (win.toFront) {
                        win.toFront();
                    }
                    left += offset;
                    top += offset;
                }
            }
        },
        tileWindows: function () {
            const windows = this._windows;
            const visibleWindows = [];
            for (const windowId in windows) {
                const win = windows[windowId];
                if (win && win.isVisible()) {
                    visibleWindows.push(win);
                }
            }
            if (visibleWindows.length === 0)
                return;
            let rootWidth = 1200;
            let rootHeight = 800;
            try {
                const innerSize = this._root.getInnerSize();
                if (innerSize) {
                    rootWidth = innerSize.width || 1200;
                    rootHeight = innerSize.height || 800;
                }
                else {
                    const bounds = this._root.getBounds();
                    if (bounds) {
                        rootWidth = bounds.width || 1200;
                        rootHeight = bounds.height || 800;
                    }
                }
            }
            catch (e) {
                // Use defaults
            }
            const cols = Math.ceil(Math.sqrt(visibleWindows.length));
            const rows = Math.ceil(visibleWindows.length / cols);
            const windowWidth = Math.floor((rootWidth - 100) / cols);
            const windowHeight = Math.floor((rootHeight - 100) / rows);
            let index = 0;
            for (let row = 0; row < rows; row++) {
                for (let col = 0; col < cols && index < visibleWindows.length; col++) {
                    const win = visibleWindows[index];
                    win.moveTo(50 + col * windowWidth, 50 + row * windowHeight);
                    win.setWidth(Math.max(300, windowWidth - 20));
                    win.setHeight(Math.max(200, windowHeight - 20));
                    index++;
                }
            }
        },
        getAllWindows: function () {
            return this._windows;
        }
    }
});
