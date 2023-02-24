/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateTrip = /* GraphQL */ `
  subscription OnCreateTrip {
    onCreateTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;
export const onUpdateTrip = /* GraphQL */ `
  subscription OnUpdateTrip {
    onUpdateTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;
export const onDeleteTrip = /* GraphQL */ `
  subscription OnDeleteTrip {
    onDeleteTrip {
      id
      name
      dateStart
      dateEnd
      isConfirmed
      isEditing
    }
  }
`;
export const onCreateActivity = /* GraphQL */ `
  subscription OnCreateActivity {
    onCreateActivity {
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
export const onUpdateActivity = /* GraphQL */ `
  subscription OnUpdateActivity {
    onUpdateActivity {
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
export const onDeleteActivity = /* GraphQL */ `
  subscription OnDeleteActivity {
    onDeleteActivity {
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
