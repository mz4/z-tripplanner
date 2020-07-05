/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getTrip = /* GraphQL */ `
  query GetTrip($id: ID!) {
    getTrip(id: $id) {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
      createdAt
      activities {
        items {
          id
          userId
          activityUsername
          content
          dateActivity
          createdAt
          updatedAt
        }
        nextToken
      }
      updatedAt
    }
  }
`;
export const listTrips = /* GraphQL */ `
  query ListTrips(
    $filter: ModelTripFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrips(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        dateStart
        dateEnd
        isConfirmed
        isEditing
        createdAt
        activities {
          nextToken
        }
        updatedAt
      }
      nextToken
    }
  }
`;
export const getActivity = /* GraphQL */ `
  query GetActivity($id: ID!) {
    getActivity(id: $id) {
      id
      userId
      activityUsername
      trip {
        id
        name
        dateStart
        dateEnd
        isConfirmed
        isEditing
        createdAt
        activities {
          nextToken
        }
        updatedAt
      }
      content
      dateActivity
      createdAt
      updatedAt
    }
  }
`;
export const listActivitys = /* GraphQL */ `
  query ListActivitys(
    $filter: ModelActivityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listActivitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        userId
        activityUsername
        trip {
          id
          name
          dateStart
          dateEnd
          isConfirmed
          isEditing
          createdAt
          updatedAt
        }
        content
        dateActivity
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
