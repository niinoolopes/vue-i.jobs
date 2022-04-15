import './firebase'
import { getAuth, signInWithPopup, GoogleAuthProvider, deleteUser } from "firebase/auth";

export const authUser = async () => {
  const auth = getAuth();

  const provider = new GoogleAuthProvider();

  const result = await signInWithPopup(auth, provider)

  // const credential = GoogleAuthProvider.credentialFromResult(result);

  // const token = credential.accessToken;

  const user = result.user;

  // console.log('authUser user', user)

  return {
    // auth,
    // token,
    // user,
    uid: user.uid,
    name: user.displayName,
    email: user.email,
  }
}

export const removeAuthUser = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  !!user && await deleteUser(user)
}