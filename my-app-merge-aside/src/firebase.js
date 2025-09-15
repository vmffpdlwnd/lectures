// src/firebase.js

// Firebase 앱 및 Firestore SDK를 가져옵니다.
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// 여러분의 Firebase 프로젝트 설정 정보입니다.
// 이 부분만 여러분의 정보로 교체해 주세요.
const firebaseConfig = {
  apiKey: "AIzaSyBrRxaKFrT96sbO8NVt_Jp5RbaoYz2RK9Y",
  authDomain: "lectures-84eaa.firebaseapp.com",
  projectId: "lectures-84eaa",
  storageBucket: "lectures-84eaa.firebasestorage.app",
  messagingSenderId: "1037373196085",
  appId: "1:1037373196085:web:8b53a6ce80287d4eadee7c",
};

// Firebase 앱을 초기화합니다.
const app = initializeApp(firebaseConfig);

// Firestore 데이터베이스 객체를 만들고 내보냅니다.
export const db = getFirestore(app);