require("dotenv").config();
const { CONNECT_STRING } = process.env
const register = require("../server/controller/authController");
const registerON = register.register;
const mongoose = require("mongoose");

// connect mongoose outside of describe function
mongoose.connect(CONNECT_STRING);

describe("integration tests", () => {
    let db;
    afterAll(() => {
        db.close();
    })
});

it("should regitser", done => {
    const req = {
        body: { typedName: "Sonic" , typedEmail: "d@d.com", typedPassword: "1236"},
        session: { user: {}}
    };

    const res = {
        send: function(data){
            expect(data).toEqual();
            done();
        },
        status(num) {
            expect(num).toBe(200);
            return this;
        }
    };
    registerON(req,res)
})