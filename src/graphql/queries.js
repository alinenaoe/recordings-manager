/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getRecording = /* GraphQL */ `
  query GetRecording($id: ID!) {
    getRecording(id: $id) {
      id
      title
      description
      filePath
      like
      interviewee
      createdAt
      updatedAt
    }
  }
`;
export const listRecordings = /* GraphQL */ `
  query ListRecordings(
    $filter: ModelRecordingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRecordings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        description
        filePath
        like
        interviewee
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
