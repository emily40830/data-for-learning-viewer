import contentProgressByDate from '../../data/content_progress_by_date.json';

export default async (req, res) => {
  return res.json([...contentProgressByDate]);
  //fs.readline
};
