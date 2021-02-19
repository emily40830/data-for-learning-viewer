import contentProgressByDate from '../../data/content_progress_by_date.json';

export default async (req, res) => {
  console.log(contentProgressByDate);
  res.status(200).json(contentProgressByDate);
  //fs.readline
};
