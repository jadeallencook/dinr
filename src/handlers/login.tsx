import * as firebase from 'firebase/app';

export default (email: string, password: string): Promise<string | null> =>
  new Promise((res, rej) =>
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => res())
      .catch((error: any) => rej(error.message))
  );
