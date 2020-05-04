import { RequestHandler } from 'express';
import { Source, User } from '../../models';

const ControllerSearch: RequestHandler = async (req, res, next) => {
  const search: any = {};
  const { author, name, text, id } = req.query;

  if (typeof author === 'string' && author.trim()) {
    await User.findOne({ username: author })
      .then((user) => {
        if (user) {
          search['author'] = user._id;
        }
      })
      .catch(() => {});
  }
  if (id && typeof id === 'string') {
    search['_id'] = id;
  }
  search['$text'] = {
    $search: `${name || ''} ${text || ''}`,
  };

  return Source.paginate(search, {
    page: +req.params.page || 1,
    limit: +req.params.limit || 30,
  })
    .then(async (docs) => {
      const authorsId = docs.docs
        .map((doc) => doc.author)
        .filter((id, idx, arr) => arr.indexOf(id) === idx);

      const usernames: any = {};
      await Promise.all(
        authorsId.map(async (id) => {
          return User.findById(id, 'username')
            .then((doc) => {
              if (doc) {
                usernames[id.toHexString()] = doc.username;
                return;
              }
              usernames[id.toHexString()] = 'ué?';
            })
            .catch();
        }),
      );
      return res.json({ ...docs, usernames });
    })
    .catch(next);
};

export default ControllerSearch;
