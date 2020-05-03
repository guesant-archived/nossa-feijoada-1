import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import bodyparser from 'body-parser';
import errorhandler from 'errorhandler';
import routes from './routes';
import { ErrorHandlerArg } from './types/ErrorHandler';

const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();

app.use(cors());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

if (!isProduction) {
  app.use(errorhandler());
}

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);

if (isProduction) {
  const { MONGODB_URI } = process.env;
  if (!MONGODB_URI) {
    console.warn('[warn] Please set MONGODB_URI');
  }
  if (MONGODB_URI) {
    mongoose.connect(MONGODB_URI);
  }
} else {
  mongoose.connect('mongodb://localhost:27017/api');
  mongoose.set('debug', true);
}

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
  var err = new Error('Not Found');
  (err as ErrorHandlerArg).status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(
    (err: ErrorHandlerArg, _req: express.Request, res: express.Response) => {
      console.log(err.stack);
      res.status(err.status || 500);

      res.json({
        errors: {
          message: err.message,
          error: err,
        },
      });
    }
  );
}

// production error handler
// no stacktraces leaked to user
app.use(
  (err: ErrorHandlerArg, _req: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
        error: {},
      },
    });
  }
);

app.listen(PORT, () => {
  console.log(`[info] - API listening on port ${PORT}`);
});
