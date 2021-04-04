import initializeBasicAuth from 'nextjs-basic-auth';

const users = [
  {
    user: process.env.BASIC_AUTH_USER,
    password: process.env.BASIC_AUTH_PASSWORD,
  },
];

export default initializeBasicAuth({
  users,
});
