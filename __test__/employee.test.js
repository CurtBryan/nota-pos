require("dotenv").config();
const { CONNECTION_STRING } = process.env
const employee = require("../server/controller/employeeController");
const employeeON = employee.getCurrentEmployee;
const mongoose = require("mongoose");

// connect mongoose outside of describe function
mongoose.connect(CONNECTION_STRING);

describe("employee tests", () => {
    let db;
    afterAll(() => {
        connection.close();
        db.close();
    });


    it("should get current employee", async () => {
        const req = {
            body: { restaurant: `curt's curts`, pin: 12345 },
            session: {   employee: {} }
        };

        const res = {
            send: function(data){
                expect(data).toEqual("Destiny");
                done();
            },
            status(num) {
                expect(num).toEqual(200);
                return this;
            }
        }
        employeeON(req,res)
    }, 10000);

    it("should not get employee", async () => {
        const req = {
          body: { restaurant: `curt's curts`,  pin: 17845 },
          session: {   employee: {} }
        };
        const res = {
          send: function(data) {
            expect(data).toEqual("Incorrect Pin");
            done();
          },
          status(num) {
            expect(num).toEqual(500);
            return this;
          }
        };
        employeeON(req, res);
      }, 10000)
});


