import * as firebase from 'firebase/app';

export default ({ name, street, zipcode, uid }: any): Promise<string> =>
  new Promise((res, rej) => {
    firebase
      .database()
      .ref(`profiles/${uid}/personal`)
      .set({ name, street, zipcode })
      .then(() => res('Successfully updated your profile'))
      .catch((error: any) => rej(error.message));
  });
