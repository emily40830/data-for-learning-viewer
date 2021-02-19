import contentMaxRank from '../../../data/content_max_rank.json';

export default async (req, res) => {
  //console.log(contentMaxRank);
  console.log(contentMaxRank);
  res.status(200).json(contentMaxRank);
  //fs.readline
};
