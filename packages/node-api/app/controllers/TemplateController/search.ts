import mongoose from 'mongoose';
import { RequestHandler } from 'express';
import { Template, User } from '../../models';

const ControllerSearch: RequestHandler = async (req, res, next) => {
  const search: any = { $or: [] };
  const { author, text, id } = req.query;

  const timeSort = { DESC: -1, ASC: 1 };

  const sortTime =
    (timeSort as any)[String(req.query.order)] || timeSort['DESC'];

  if (typeof author === 'string' && author.trim()) {
    await User.findOne({ username: author })
      .then((user) => {
        if (user) {
          search['$or'].push({ author: user._id });
        }
      })
      .catch(() => {});
  }
  if (id && typeof id === 'string' && mongoose.isValidObjectId(id)) {
    search['$or'].push({ _id: id });
  }
  const textSearch = `${text || ''}`.trim();
  if (textSearch) {
    search['$or'].push({ $text: { $search: textSearch } });
  }

  return Template.paginate(search['$or'].length ? search : {}, {
    populate: { path: 'author', select: 'username' },
    page: +req.params.page || 1,
    limit: +req.params.limit || 30,
    sort: { createdAt: sortTime },
  })
    .then(async (docs) => {
      return res.json(docs);
    })
    .catch(next);
};

export default ControllerSearch;
