import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { getDatabase, ref, get, set, remove } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

// OAuth 요청과 함께 전송할 커스텀 OAuth 매개변수를 추가로 지정
// => 기존 구글 로그인 경우에도 선택창 확인하고 로그인할 수 있도록 설정
provider.setCustomParameters({
  prompt: "select_account",
});

// 팝업 창 및 로그인 페이지로 리디렉션 활용
export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      console.log("signInWithPopup reuslt >> ", result);
    })
    .catch((error) => {
      console.log("signInWithPopup error", error);
    });
}

// 구글 인증을 활용한 로그아웃 방법
export async function logout() {
  signOut(auth)
    .then(() => {
      console.log("로그아웃 성공");
    })
    .catch((error) => {
      console.log("logout error", error);
    });
}
