import contentMaxRank from '../../../data/content_max_rank.json';

export default async (req, res) => {
  //console.log(id);

  return res.json([...contentMaxRank]);
  //fs.readline
};
