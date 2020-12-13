const { hashPassword, comparePassword } = require("../helpers/bcrypt");

test("Hashing Password", (done) => {
  expect(hashPassword("password")).not.toBe("password");
  done();
});

test("Compare Password", (done) => {
  expect(comparePassword("password", hashPassword("password"))).toBe(true);
  done();
});
