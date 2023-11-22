import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("password", 10),
    isAdmin: true,
  },
  {
    name: "abdoo wizli",
    email: "wizli@email.com",
    password: bcrypt.hashSync("password", 10),
  },
  {
    name: "abdessalam ouazri",
    email: "abd@email.com",
    password: bcrypt.hashSync("password", 10),
  },
];
export default users;
