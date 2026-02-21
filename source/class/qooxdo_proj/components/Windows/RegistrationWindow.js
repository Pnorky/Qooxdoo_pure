/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.components.Windows.RegistrationWindow", {
    extend: qx.ui.window.Window,
    events: {
        registrationSuccess: "qx.event.type.Data",
    },
    construct: function () {
        this.base(arguments, "Sign Up");
        this.setLayout(new qx.ui.layout.VBox(15));
        this.setWidth(450);
        this.setHeight(250);
        this.setAllowClose(true);
        this.setAllowMaximize(false);
        this.setAllowMinimize(true);
        this.setResizable(false);
        this.setMovable(true);
        this.center();
        const title = new qx.ui.basic.Label("Create New Account");
        title.setFont("bold");
        this.add(title);
        const usernameContainer = new qx.ui.container.Composite();
        usernameContainer.setLayout(new qx.ui.layout.HBox(10));
        const usernameLabel = new qx.ui.basic.Label("Username:");
        usernameLabel.setWidth(100);
        this._usernameField = new qx.ui.form.TextField();
        this._usernameField.setPlaceholder("Enter username");
        usernameContainer.add(usernameLabel);
        usernameContainer.add(this._usernameField, { flex: 1 });
        this.add(usernameContainer);
        const passwordContainer = new qx.ui.container.Composite();
        passwordContainer.setLayout(new qx.ui.layout.HBox(10));
        const passwordLabel = new qx.ui.basic.Label("Password:");
        passwordLabel.setWidth(100);
        this._passwordField = new qx.ui.form.PasswordField();
        this._passwordField.setPlaceholder("Enter password");
        passwordContainer.add(passwordLabel);
        passwordContainer.add(this._passwordField, { flex: 1 });
        this.add(passwordContainer);
        this._errorLabel = new qx.ui.basic.Label("");
        this._errorLabel.setRich(true);
        this._errorLabel.setVisibility("hidden");
        this.add(this._errorLabel);
        const buttonContainer = new qx.ui.container.Composite();
        buttonContainer.setLayout(new qx.ui.layout.HBox(10));
        this._registerButton = new qx.ui.form.Button("Register");
        this._cancelButton = new qx.ui.form.Button("Cancel");
        this._passwordField.addListener("keypress", (e) => {
            if (e.getKeyIdentifier() === "Enter") {
                this._handleRegister();
            }
        }, this);
        this._registerButton.addListener("execute", () => {
            this._handleRegister();
        }, this);
        this._cancelButton.addListener("execute", () => {
            this.close();
        }, this);
        buttonContainer.add(this._registerButton, { flex: 1 });
        buttonContainer.add(this._cancelButton, { flex: 1 });
        this.add(buttonContainer);
    },
    members: {
        _usernameField: null,
        _passwordField: null,
        _registerButton: null,
        _cancelButton: null,
        _errorLabel: null,
        _isSubmitting: false,
        _handleRegister: function () {
            if (this._isSubmitting)
                return;
            const username = this._usernameField.getValue() || "";
            const password = this._passwordField.getValue() || "";
            this._errorLabel.setVisibility("hidden");
            this._errorLabel.setValue("");
            if (!username.trim()) {
                this._showError("Please enter a username");
                return;
            }
            if (!password.trim()) {
                this._showError("Please enter a password");
                return;
            }
            this._isSubmitting = true;
            this._registerButton.setEnabled(false);
            qooxdo_proj.utils.GraphQLClient.register(username, password)
                .then((result) => {
                if (result && result.success) {
                    this._showError('<span style="color: green;">Registration successful! You can now login.</span>');
                    this._registerButton.setEnabled(true);
                    this._isSubmitting = false;
                    qx.event.Timer.once(() => {
                        const regUsername = result.username || username;
                        this.fireDataEvent("registrationSuccess", { username: regUsername });
                        this.close();
                    }, this, 1500);
                }
                else {
                    const errorMsg = result.error || result.message || "Registration failed. Please try again.";
                    this._showError(errorMsg);
                    this._registerButton.setEnabled(true);
                    this._isSubmitting = false;
                }
            })
                .catch((error) => {
                console.error("Registration error:", error);
                const friendlyMessage = error.message || this._getUserFriendlyError(error);
                this._showError(friendlyMessage);
                this._registerButton.setEnabled(true);
                this._isSubmitting = false;
            });
        },
        _getUserFriendlyError: function (error) {
            if (typeof error === 'number') {
                const statusMessages = {
                    400: "Invalid request. Please check your input and try again.",
                    401: "Invalid username or password. Please try again.",
                    403: "Access denied. Please contact support if you believe this is an error.",
                    404: "Service not found. Please try again later.",
                    409: "This username is already taken. Please choose a different one.",
                    422: "Invalid information provided. Please check your input.",
                    500: "Server error. Please try again later.",
                    503: "Service temporarily unavailable. Please try again later."
                };
                return statusMessages[error] || "An error occurred. Please try again.";
            }
            const errorStr = String(error);
            if (errorStr.includes("Failed to fetch") || errorStr.includes("NetworkError") || errorStr.includes("Network request failed")) {
                return "Unable to connect to the server. Please check your internet connection and try again.";
            }
            if (errorStr.includes("Server error: 401") || errorStr.includes("401"))
                return "Invalid username or password. Please try again.";
            if (errorStr.includes("Server error: 400") || errorStr.includes("400"))
                return "Invalid request. Please check your input and try again.";
            if (errorStr.includes("Server error: 500") || errorStr.includes("500"))
                return "Server error. Please try again later.";
            if (errorStr.includes("Server error:"))
                return "An error occurred. Please try again.";
            if (!errorStr.includes("error:") && !errorStr.includes("status") && !errorStr.includes("fetch") && !errorStr.includes("Network"))
                return errorStr;
            return "An unexpected error occurred. Please try again.";
        },
        _showError: function (message) {
            if (message.includes('<span')) {
                this._errorLabel.setValue(message);
            }
            else {
                this._errorLabel.setValue('<span style="color: red;">' + message + '</span>');
            }
            this._errorLabel.setVisibility("visible");
        },
        clear: function () {
            this._usernameField.setValue("");
            this._passwordField.setValue("");
            this._errorLabel.setValue("");
            this._errorLabel.setVisibility("hidden");
            this._isSubmitting = false;
            this._registerButton.setEnabled(true);
        },
    },
});
