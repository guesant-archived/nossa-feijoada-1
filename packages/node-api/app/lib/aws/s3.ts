import AWS_S3 from 'aws-sdk/clients/s3';
import env from '../../env';

const {
  AWS_ACCESSKEY_ID,
  AWS_SECRET_ACCESSKEY,
  AWS_REGION /*AWS_BUCKET*/,
} = env;

export default new AWS_S3({
  region: AWS_REGION,
  accessKeyId: AWS_ACCESSKEY_ID,
  secretAccessKey: AWS_SECRET_ACCESSKEY,
  // params: { Bucket: AWS_BUCKET },
});
