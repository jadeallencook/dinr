import * as firebase from 'firebase/app';
import 'firebase/auth';

export default (): Promise<String> =>
  new Promise((res, rej) =>
    firebase
      .auth()
      .signOut()
      .then(() => res())
      .catch(error => rej(error.message))
  );
