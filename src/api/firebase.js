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
// 실시간 데이터 활용하기
const database = getDatabase();

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

async function adminUser(user) {
  // *. 일반 회원 vs 어드민 권한
  // *. {...user, isAdmin : true/false}, 회원인 경우에는 admin 여부만 판단하게 된다.
  // *. 실시간 데이터 베이스의 id 정보 배열에 담겨 있는지 확인
  return get(ref(database, "admins")) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}
