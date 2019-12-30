

export const registerUser = ({string<username>, }) => {

};

export const UPDATE_PERSON_MUTATION = gql`
  mutation updatePerson($email: String, $oldPassword: String, $name: String, $newPassword: String) {
    updatePerson(email: $email, oldPassword: $oldPassword, name: $name, newPassword: $newPassword) {
      name
      email
    }
  }
`;

export const CREATE_GROUP_MUTATION = gql`
  mutation createGroup($name: String!, $description: String) {
    createGroup(name: $name, description: $description) {
      name
      description
      id
    }
  }
`;

export const UPDATE_GROUP_MUTATION = gql`
  mutation updateGroup($groupId: ID!, $name: String, $description: String) {
    updateGroup(groupId: $groupId, name: $name, description: $description) {
      name
      description
      id
    }
  }
`;

export const JOIN_GROUP_MUTATION = gql`
  mutation joinGroup($groupId: ID!) {
    joinGroup(groupId: $groupId) {
      id
      name
      memberCount
    }
  }
`;

export const LEAVE_GROUP_MUTATION = gql`
  mutation leaveGroup($groupId: ID!) {
    leaveGroup(groupId: $groupId) {
      id
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_THREAD_MUTATION = gql`
  mutation createThread($groupId: ID!, $title: String!, $content: String!) {
    createThread(groupId: $groupId, title: $title, content: $content) {
      ...ThreadListDetails
    }
  }
  ${threadListDetailsFragment}
`;

export const TOGGLE_THREAD_PINNING_MUTATION = gql`
  mutation toggleThreadPinning($threadId: ID!) {
    toggleThreadPinning(threadId: $threadId) {
      ...ThreadListDetails
    }
  }
  ${threadListDetailsFragment}
`;

export const CREATE_POST_MUTATION = gql`
  mutation createPost($threadId: ID!, $content: String!) {
    createPost(threadId: $threadId, content: $content) {
      ...PostListDetails
    }
  }
  ${postListDetailsFragment}
`;

export const CONFIRM_EMAIL_MUTATION = gql`
  mutation confirmEmail($confirmationCode: String!) {
    confirmEmail(confirmationCode: $confirmationCode) {
      emailConfirmed
    }
  }
`;

export const ADD_PUSH_TOKEN = gql`
  mutation addPushToken($token: String!) {
    addPushToken(token: $token) {
      id
    }
  }
`;

export const DELETE_PUSH_TOKEN = gql`
  mutation deletePushToken($token: String!) {
    deletePushToken(token: $token) {
      id
    }
  }
`;
