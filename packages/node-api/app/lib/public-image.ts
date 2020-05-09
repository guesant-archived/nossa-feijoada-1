import fileUpload from 'express-fileupload';
import sharp from 'sharp';
import env from '../env';
import s3 from './aws/s3';

const { AWS_S3_PUBLIC_BUCKET = 'baianosim' } = env;

export const uploadImageOptions: fileUpload.Options = {
  abortOnLimit: true,
  safeFileNames: true,
  limits: { fileSize: 6 * 1024 * 1024 },
  limitHandler: (_, res) => {
    res.json({
      errors: [
        {
          msg: 'Tamanho máximo de upload atingido. Máximo: 6 megabytes.',
        },
      ],
    });
  },
};

export const uploadPublicImage = async (
  imageToUpload: fileUpload.UploadedFile,
  dest: string,
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const image = sharp(imageToUpload.data);
      const optimizedImage = await image.png({ quality: 10 }).toBuffer();

      s3.putObject(
        {
          Bucket: AWS_S3_PUBLIC_BUCKET,
          Body: optimizedImage,
          ACL: 'public-read',
          Key: dest,
        },
        (err, data) => {
          if (err) {
            throw err;
          }
          return resolve(data);
        },
      );
    } catch (_) {
      reject(
        JSON.stringify({
          errors: [{ msg: 'Houve um erro ao enviar a imagem.' }],
        }),
      );
    }
  });
};

export const deletePublicImage = async (path: string) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject(
      { Bucket: AWS_S3_PUBLIC_BUCKET, Key: path },
      (err, data) => {
        if (err) {
          return reject(err);
        }
        return resolve(data);
      },
    );
  });
};
