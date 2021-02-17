// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import topUsersData from '../../data/top_user.json';

export default async (req, res) => {
  res.status(200).json(topUsersData);
  //fs.readline
};

// /api/hello
