/* ************************************************************************

   Copyright: 2026

   License: MIT license

   Authors:

************************************************************************ */
qx.Class.define("qooxdo_proj.test.DemoTest", {
    extend: qx.dev.unit.TestCase,
    members: {
        testSimple() {
            this.assertEquals(4, 3 + 1, "This should never fail!");
            this.assertFalse(false, "Can false be true?!");
        },
        testAdvanced() {
            let a = 3;
            let b = a;
            this.assertIdentical(a, b, "A rose by any other name is still a rose");
            this.assertInRange(3, 1, 10, "You must be kidding, 3 can never be outside [1,10]!");
        }
    }
});
