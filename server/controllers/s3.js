import dotenv from "dotenv";
import aws from "aws-sdk";
import { randomBytes } from "crypto";
import { promisify } from "util";

dotenv.config();

// Region the bucket exists in
const region = "us-east-2";
const bucketName = "oncall-direct-upload-s3-bucket";
// Access/secret access key for the bucket
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

// Create new s3 bucket using above details
// Create a secure url that client can use to post an image to s3 bucket
const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

export const getS3Url = async (req, res) => {
  const url = await generateUploadURL();
  res.send({ url });
};

// 1. Connect to AWS & S3 bucket
// 2. Handles generation of signed S3 url (bucket only accessible to users with the right credentials)
const generateUploadURL = async () => {
  // 1. create 16 random bytes
  // 2. convert it to a hexadecimal string (32 hex char string)
  // -- we will use this as the image name (unique str that is difficult to guess)
  const generateRandomBytes = promisify(randomBytes);
  const rawBytes = await generateRandomBytes(16);
  const imageName = rawBytes.toString("hex");

  // Signed url will be valid for 60 seconds
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};

// Additional notes on settings:
// S3 - Object storage where we can store our images in the cloud
// 1. CORS - needs to have permission to
// make a request to a url that's different to the one it was served from (s3 url)
// -- In production - only allow requests from our domain name
// -- In development - allow get requests from any website (to s3 bucket url)

// 2. PUT access to be able to add an image
// -- 1) Make a new IAM user, who will have access (keys) to s3 bucket
// -- 2) Create a policy - specifies what type of things a user can do (put new object)
// -- and we will create a user with this policy
// -- Our server will use the user credentials to connect to s3 bucket securly
