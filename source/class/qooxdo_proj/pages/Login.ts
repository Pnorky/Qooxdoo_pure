/* ************************************************************************

   Copyright: 2026 

   License: MIT license

   Authors: 

************************************************************************ */

qx.Class.define("qooxdo_proj.pages.Login", {
  extend: qx.ui.container.Composite,

  events: {
    /** Fired when login is successful. Data: {username: string} */
    loginSuccess: "qx.event.type.Data",
  },

  construct: function () {
    (this as any).base(arguments);

    // Use Canvas layout for precise centering
    this.setLayout(new qx.ui.layout.Canvas());
    this.setPadding(0);

    // Center container
    const centerContainer = new qx.ui.container.Composite();
    centerContainer.setLayout(new qx.ui.layout.VBox(15));
    centerContainer.setPadding(30);
    centerContainer.setDecorator("main");
    centerContainer.setWidth(500);
    centerContainer.setMinWidth(500);
    centerContainer.setMaxWidth(500);

    // Title
    const title = new qx.ui.basic.Label(
      "Student Registration System",
    );
    title.setFont("bold");
    centerContainer.add(title);

    // Subtitle
    const subtitle = new qx.ui.basic.Label(
      "Please login to continue",
    );
    centerContainer.add(subtitle);

    // Username field - label and input on same line
    const usernameContainer = new qx.ui.container.Composite();
    usernameContainer.setLayout(new qx.ui.layout.HBox(10));
    const usernameLabel = new qx.ui.basic.Label("Username:");
    usernameLabel.setWidth(100); // Fixed width for alignment
    (this as any)._usernameField = new qx.ui.form.TextField();
    (this as any)._usernameField.setPlaceholder("Enter username");
    usernameContainer.add(usernameLabel);
    usernameContainer.add((this as any)._usernameField, { flex: 1 });
    centerContainer.add(usernameContainer);

    // Password field - label and input on same line
    const passwordContainer = new qx.ui.container.Composite();
    passwordContainer.setLayout(new qx.ui.layout.HBox(10));
    const passwordLabel = new qx.ui.basic.Label("Password:");
    passwordLabel.setWidth(100); // Fixed width for alignment
    (this as any)._passwordField = new qx.ui.form.PasswordField();
    (this as any)._passwordField.setPlaceholder("Enter password");
    passwordContainer.add(passwordLabel);
    passwordContainer.add((this as any)._passwordField, { flex: 1 });
    centerContainer.add(passwordContainer);

    // Error message label
    (this as any)._errorLabel = new qx.ui.basic.Label("");
    (this as any)._errorLabel.setRich(true); // Enable rich text for color styling
    (this as any)._errorLabel.setVisibility("hidden");
    centerContainer.add((this as any)._errorLabel);

    // Login button
    (this as any)._loginButton = new qx.ui.form.Button("Login");

    // Add Enter key listener to password field
    (this as any)._passwordField.addListener(
      "keypress",
      (e: any) => {
        if (e.getKeyIdentifier() === "Enter") {
          (this as any)._handleLogin();
        }
      },
      this,
    );

    // Login button handler
    (this as any)._loginButton.addListener(
      "execute",
      () => {
        (this as any)._handleLogin();
      },
      this,
    );

    // Sign up button
    (this as any)._signUpButton = new qx.ui.form.Button("Sign up");

    // Sign up button handler - opens registration window
    (this as any)._signUpButton.addListener(
      "execute",
      () => {
        (this as any)._openRegistrationWindow();
      },
      this,
    );

    // Container for buttons with spacing
    const buttonContainer = new qx.ui.container.Composite();
    buttonContainer.setLayout(new qx.ui.layout.VBox(10));
    buttonContainer.add((this as any)._loginButton);
    buttonContainer.add((this as any)._signUpButton);
    centerContainer.add(buttonContainer);

    // Center the container using Canvas layout with integer positions
    const self = this;
    const updatePosition = () => {
      const containerWidth = 320;
      let containerHeight = 350; // Default height

      // Try to get actual height
      try {
        const bounds = centerContainer.getBounds();
        if (bounds && bounds.height) {
          containerHeight = bounds.height;
        }
      } catch (e) {
        // Use default
      }

      // Get dimensions from the login page itself (which should fill the root)
      let rootWidth = window.innerWidth;
      let rootHeight = window.innerHeight;

      try {
        const selfBounds = (self as any).getBounds();
        if (selfBounds) {
          rootWidth = selfBounds.width || rootWidth;
          rootHeight = selfBounds.height || rootHeight;
        }
      } catch (e) {
        // Use window dimensions as fallback
      }

      // If still no dimensions, try root
      if (rootWidth === window.innerWidth) {
        try {
          const root = (self as any).getRoot();
          if (root) {
            const rootBounds = root.getBounds();
            if (rootBounds) {
              rootWidth = rootBounds.width || rootWidth;
              rootHeight = rootBounds.height || rootHeight;
            }
          }
        } catch (e) {
          // Keep window dimensions
        }
      }

      // Calculate center position and round to integers (required by Canvas layout)
      const left = Math.round((rootWidth - containerWidth) / 2);
      const top = Math.round((rootHeight - containerHeight) / 2);

      // Update layout properties with integer values
      centerContainer.setLayoutProperties({
        left: Math.max(0, left),
        top: Math.max(0, top),
      });
    };

    // Add container to layout
    this.add(centerContainer);

    // Update position on resize and appear
    this.addListener("resize", updatePosition, this);
    this.addListener("appear", updatePosition, this);

    // Initial positioning with delays to ensure layout is ready
    qx.event.Timer.once(updatePosition, this, 0);
    qx.event.Timer.once(updatePosition, this, 100);
    qx.event.Timer.once(updatePosition, this, 300);
  },
  members: {
    _usernameField: null as any,
    _passwordField: null as any,
    _loginButton: null as any,
    _signUpButton: null as any,
    _errorLabel: null as any,
    _registrationWindow: null as any,

    /**
     * Handle login attempt
     */
    _handleLogin: function () {
      const username = (this as any)._usernameField.getValue() || "";
      const password = (this as any)._passwordField.getValue() || "";

      // Clear previous error
      (this as any)._errorLabel.setVisibility("hidden");
      (this as any)._errorLabel.setValue("");

      // Validate inputs
      if (!username.trim()) {
        (this as any)._showError("Please enter a username");
        return;
      }

      if (!password.trim()) {
        (this as any)._showError("Please enter a password");
        return;
      }

      // Disable login button during validation
      (this as any)._loginButton.setEnabled(false);

      // Send login request using GraphQL
      qooxdo_proj.utils.GraphQLClient.login(username, password)
      .then((result: any) => {
        if (result && result.success) {
          // Login successful
          (this as any).fireDataEvent("loginSuccess", { username: result.username });
        } else {
          // Login failed
          (this as any)._showError(result.error || "Invalid username or password");
          (this as any)._loginButton.setEnabled(true);
        }
      })
      .catch((error: any) => {
        console.error("Login error:", error);
        const friendlyMessage = (this as any)._getUserFriendlyError(error.message);
        (this as any)._showError(friendlyMessage);
        (this as any)._loginButton.setEnabled(true);
      });
    },

    /**
     * Open registration window
     */
    _openRegistrationWindow: function () {
      // If window already exists and is open, just bring it to front
      if ((this as any)._registrationWindow && (this as any)._registrationWindow.isVisible()) {
        (this as any)._registrationWindow.toFront();
        return;
      }

      // Create new registration window
      (this as any)._registrationWindow = new qooxdo_proj.components.Windows.RegistrationWindow();
      
      // Get root from application instance
      const app = qx.core.Init.getApplication();
      if (app && (app as any).getRoot) {
        const root = (app as any).getRoot();
        root.add((this as any)._registrationWindow);
      } else {
        // Fallback: find root by traversing up the widget tree
        let widget: any = this;
        while (widget) {
          const parent = widget.getLayoutParent ? widget.getLayoutParent() : null;
          if (!parent) {
            break;
          }
          widget = parent;
        }
        if (widget && widget.add) {
          widget.add((this as any)._registrationWindow);
        }
      }
      
      // Center the window
      (this as any)._registrationWindow.center();
      
      // Open the window
      (this as any)._registrationWindow.open();
      
      // Listen for successful registration
      (this as any)._registrationWindow.addListener("registrationSuccess", (e: any) => {
        const data = e.getData();
        (this as any).clear();
        (this as any)._showError(`<span style="color: green;">Registration successful! Please login with your new account.</span>`);
      }, this);
      
      // Clear form when window closes
      (this as any)._registrationWindow.addListener("close", () => {
        if ((this as any)._registrationWindow) {
          (this as any)._registrationWindow.clear();
        }
      }, this);
    },

    _getUserFriendlyError: function (error: string | number): string {
      if (typeof error === 'number') {
        const statusMessages: Record<number, string> = {
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
      
      if (errorStr.includes("Failed to fetch") || 
          errorStr.includes("NetworkError") ||
          errorStr.includes("Network request failed")) {
        return "Unable to connect to the server. Please check your internet connection and try again.";
      }

      if (errorStr.includes("Server error: 401") || errorStr.includes("401")) {
        return "Invalid username or password. Please try again.";
      }
      if (errorStr.includes("Server error: 400") || errorStr.includes("400")) {
        return "Invalid request. Please check your input and try again.";
      }
      if (errorStr.includes("Server error: 500") || errorStr.includes("500")) {
        return "Server error. Please try again later.";
      }
      if (errorStr.includes("Server error:")) {
        return "An error occurred. Please try again.";
      }

      if (!errorStr.includes("error:") && 
          !errorStr.includes("status") && 
          !errorStr.includes("fetch") &&
          !errorStr.includes("Network")) {
        return errorStr;
      }

      return "An unexpected error occurred. Please try again.";
    },

    _showError: function (message: string) {
      if (message.includes('<span')) {
        (this as any)._errorLabel.setValue(message);
      } else {
        (this as any)._errorLabel.setValue(`<span style="color: red;">` + message + '</span>');
      }
      (this as any)._errorLabel.setVisibility("visible");
    },

    clear: function () {
      (this as any)._usernameField.setValue("");
      (this as any)._passwordField.setValue("");
      (this as any)._errorLabel.setValue("");
      (this as any)._errorLabel.setVisibility("hidden");
      (this as any)._loginButton.setEnabled(true);
    },
  },
});
