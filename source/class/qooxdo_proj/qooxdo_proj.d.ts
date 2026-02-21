/**
 * Type declarations for qooxdo_proj application namespace.
 * Classes are defined at runtime via qx.Class.define(); these declare the global namespace for type checking.
 */
declare namespace qooxdo_proj {
  const Application: any;
  namespace pages {
    const Login: any;
  }
  namespace components {
    const MenuBar: any;
    const WindowManager: any;
    namespace Buttons {
      const FormActionButtons: any;
      const CounterButtons: any;
    }
    namespace Windows {
      const PersonalInfoWindow: any;
      const ContactInfoWindow: any;
      const AcademicInfoWindow: any;
      const StudentInfoTableWindow: any;
      const RegistrationWindow: any;
    }
    namespace Tabs {
      const PersonalInfoTab: any;
      const ContactInfoTab: any;
      const AcademicInfoTab: any;
      const StudentInfoTable: any;
    }
  }
  namespace utils {
    const GraphQLClient: any;
  }
  namespace test {
    const DemoTest: any;
  }
}
