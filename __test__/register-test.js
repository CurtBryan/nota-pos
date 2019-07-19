// require("dotenv").config();
// const { CONNECTION_STRING_TEST} = process.env
// const register = require("../server/controller/authController");
// const registerON = register.register;
// const mongoose = require("mongoose");

// // connect mongoose outside of describe function
// mongoose.connect(CONNECTION_STRING_TEST);

// describe("integration tests 2", () => {
//     let db;
//     afterAll(() => {
//         db.close();
//     })

// it("should regitser", done => {
//     const req = {
//         body: { typedName: "Sonic" , typedEmail: "d@d.com", typedPassword: "1236"},
//         session: { }
//     };

//     const res = {
//         send: function(data){
//             expect(data).toEqual();
//             done();
//         },
//         status(num) {
//             expect(num).toBe(200);
//             return this;
//         }
//     }
//     registerON(req,res)
// });
// it("shouldn't regitser", done => {
//     const req = {
//         body: { typedName: "Sonic" , typedEmail: "d@d.com", typedPassword: "1236"},
//         session: {  }
//     };

//     const res = {
//         send: function(data){
//             expect(data).toEqual("there was an error on the server", console.log(err));
//             done();
//         },
//         status(num) {
//             expect(num).toBe(401);
//             return this;
//         }
//     }
//     registerON(req,res)
// });
// });