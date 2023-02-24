/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createTrip = /* GraphQL */ `
  mutation CreateTrip(
    $input: CreateTripInput!
    $condition: ModelTripConditionInput
  ) {
    createTrip(input: $input, condition: $condition) {
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
export const updateTrip = /* GraphQL */ `
  mutation UpdateTrip(
    $input: UpdateTripInput!
    $condition: ModelTripConditionInput
  ) {
    updateTrip(input: $input, condition: $condition) {
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
export const deleteTrip = /* GraphQL */ `
  mutation DeleteTrip(
    $input: DeleteTripInput!
    $condition: ModelTripConditionInput
  ) {
    deleteTrip(input: $input, condition: $condition) {
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
export const createActivity = /* GraphQL */ `
  mutation CreateActivity(
    $input: CreateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    createActivity(input: $input, condition: $condition) {
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
export const updateActivity = /* GraphQL */ `
  mutation UpdateActivity(
    $input: UpdateActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    updateActivity(input: $input, condition: $condition) {
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
export const deleteActivity = /* GraphQL */ `
  mutation DeleteActivity(
    $input: DeleteActivityInput!
    $condition: ModelActivityConditionInput
  ) {
    deleteActivity(input: $input, condition: $condition) {
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
