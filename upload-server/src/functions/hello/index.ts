import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        authorizer: 'arn:aws:cognito-idp:eu-west-2:767947489604:userpool/eu-west-2_LFN2oQQ5f',
        cors: true,
        method: 'post',
        path: 'hello',
      },
    },
  ],
  role: 'arn:aws:iam::767947489604:role/lambda-accessing-s3-jwf-portal-documents',
};
