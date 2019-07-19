//integration testing

/* put in your package json so it can read the mongo functions correctly
 "jest": {
    "unmockedModulePathPatterns": [
      "node_modules"
    ]
  }
*/

// it will fail to close, but the test wil run if you follow this
require("dotenv").config();
const { CONNECTION_STRING } = process.env;
const login = require("../server/controller/authController");
const loginFeat = login.login;
const register = login.register;
const mongoose = require("mongoose");

// connect mongoose outside of describe function
mongoose.connect(CONNECTION_STRING);

describe("integration tests", () => {
  let db;
  afterAll(() => {
    connection.close();
    db.close();
  });
  it("should login", done => {
    const req = {
      body: { typedEmail: "c@c.com", typedPassword: "curt" },
      session: { user: {} }
    };
    const res = {
      send: function(data) {
        expect(data).toEqual("curt's curts");
        done();
      },
      status(num) {
        expect(num).toBe(200);
        return this;
      }
    };
    loginFeat(req, res);
  });
  it("shouldn't login", done => {
    const req = {
      body: { typedEmail: "c@c.com", typedPassword: "cu" },
      session: { user: {} }
    };
    const res = {
      send: function(data) {
        expect(data).toEqual("incorrect info mang");
        done();
      },
      status(num) {
        expect(num).toBe(401);
        return this;
      }
    };
    loginFeat(req, res);
  });

  it("should register", done => {
    const req = {
      body: { typedName: "Italy", typedEmail: "italy.com", typedPassword: "italy" },
      session: { user: {} }
    };
    const res = {
      send: function(data) {
        expect(data).toEqual("there was an error on the server")
        done();
      },
      status(num) {
        expect(num).toBe(400);
        return this;
      }
    };
    register(req, res);
  });
  it("shouldn't register", done => {
    const req = {
      body: { typedName: "Italy", typedEmail: "italy.com", typedPassword: "italy" },
      session: { user: {} }
    };
    const res = {
      send: function(data) {
        expect(data).toEqual("incorrect info mang");
        done();
      },
      status(num) {
        expect(num).toBe(401);
        return this;
      }
    };
    loginFeat(req, res);
  });


});

