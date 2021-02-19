import contentMaxRank from '../../../data/content_max_rank.json';

export default async (req, res) => {
  //console.log(contentMaxRank);

  return res.status(200).json(contentMaxRank);
  //fs.readline
};
