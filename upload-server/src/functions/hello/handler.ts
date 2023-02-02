import { APIGatewayEvent } from "aws-lambda";
import { S3 } from "aws-sdk";

const s3 = new S3();

const hello = async (event: APIGatewayEvent) => {
  try {
    await s3
      .upload({
        Body: Buffer.from(event.body, 'base64'),
        Bucket: "jwf-portal-documents",
        ContentType: "application/pdf",
        Key: "test/pdf-upload-serverless-test.pdf",
      })
      .promise();
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "We're not good",
      }),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "DELETE,GET,OPTIONS,PATCH,POST",
        "Access-Control-Allow-Headers":
          "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
      },
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "We're good",
    }),
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "DELETE,GET,OPTIONS,PATCH,POST",
      "Access-Control-Allow-Headers":
        "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
    },
  };
};

export const main = hello;
