import contentMaxRank from '../../../data/content_max_rank.json';

export default async (req, res) => {
  const id = req.query.videoId;
  console.log(id);
  const content = contentMaxRank.filter(
    (contents) => contents.program_content_id === id,
  );
  return res.json([...content]);
  //fs.readline
};
