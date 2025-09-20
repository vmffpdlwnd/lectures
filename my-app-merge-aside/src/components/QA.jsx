// src/components/QA.jsx

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { db } from '../firebase';
// ✅ updateDoc을 추가로 임포트합니다.
import { collection, getDocs, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";

const QAContainer = styled.div`
  padding: 20px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
`;

const QuestionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
  padding: 20px;
  border: 1px dashed #ccc;
  border-radius: 8px;
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const QuestionItem = styled.div`
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;

const Title = styled.h4`
  margin: 0;
  cursor: pointer;
  color: #333;
`;

const Content = styled.p`
  margin: 8px 0 0;
  color: #666;
`;

const Answer = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-left: 3px solid #007bff;
`;

const PasswordModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

// ✅ 관리자 답글 폼을 위한 스타일
const AdminForm = styled.div`
  margin-top: 10px;
  padding: 10px;
  background: #f9f9f9;
  border-radius: 8px;
`;

export default function QA() {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({
    title: "",
    content: "",
    password: "",
    isPrivate: false,
    answer: null,
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordToDelete, setPasswordToDelete] = useState("");
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [privatePassword, setPrivatePassword] = useState({});
  // ✅ 관리자 상태와 답글 상태 추가
  const [isAdmin, setIsAdmin] = useState(false);
  const [answerContent, setAnswerContent] = useState('');
  
  // ✅ 임시 관리자 비밀번호. 실제 서비스에서는 절대 이렇게 사용하면 안 됩니다.
  const ADMIN_PASSWORD = "admin";

  const fetchQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "questions"));
      const qList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setQuestions(qList);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("handleSubmit 함수가 실행되었습니다."); 
    if (!newQuestion.title || !newQuestion.content || !newQuestion.password) {
      alert("제목, 내용, 비밀번호를 모두 입력해주세요.");
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "questions"), newQuestion);
      console.log("Document written with ID: ", docRef.id);
      setNewQuestion({ title: "", content: "", password: "", isPrivate: false, answer: null });
      fetchQuestions();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleDelete = async (questionId) => {
    try {
      // ✅ 관리자 모드일 경우 비밀번호 확인 없이 바로 삭제
      if (isAdmin) {
        await deleteDoc(doc(db, "questions", questionId));
        console.log("Document successfully deleted!");
        fetchQuestions();
        return;
      }
      
      const question = questions.find(q => q.id === questionId);
      if (question.password !== passwordToDelete) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      await deleteDoc(doc(db, "questions", questionId));
      console.log("Document successfully deleted!");
      fetchQuestions();
      setShowPasswordModal(false);
      setPasswordToDelete("");
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };

  const openDeleteModal = (question) => {
    setSelectedQuestion(question);
    // ✅ 관리자 모드일 경우 바로 삭제
    if (isAdmin) {
      handleDelete(question.id);
    } else {
      // ✅ 일반 사용자일 경우 비밀번호 모달 표시
      setShowPasswordModal(true);
    }
  };
  
  const handlePrivateContent = (qId) => {
    const enteredPassword = prompt("비밀번호를 입력하세요.");
    const question = questions.find(q => q.id === qId);
    if(question.password === enteredPassword || isAdmin) {
      setPrivatePassword({...privatePassword, [qId]: true});
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };
  
  // ✅ 답변 제출 핸들러 함수
  const handleAnswerSubmit = async (e) => {
      e.preventDefault();
      if (!selectedQuestion || !answerContent) {
          alert('답변 내용을 입력해주세요.');
          return;
      }
      try {
          const docRef = doc(db, 'questions', selectedQuestion.id);
          await updateDoc(docRef, {
              answer: answerContent
          });
          alert('답변이 성공적으로 등록되었습니다.');
          setAnswerContent('');
          setSelectedQuestion(null);
          fetchQuestions();
      } catch (e) {
          console.error("Error updating document: ", e);
          alert('답변 등록에 실패했습니다.');
      }
  };

  // ✅ 관리자 모드 전환 핸들러
  const handleAdminLogin = () => {
    const enteredPassword = prompt("관리자 비밀번호를 입력하세요.");
    if (enteredPassword === ADMIN_PASSWORD) {
      setIsAdmin(true);
      alert('관리자 모드로 전환되었습니다.');
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <QAContainer>
      <h2>🙋‍♀️ Q&A 게시판</h2>
      <p style={{color: "#666"}}>궁금한 점을 질문하고, 관리자의 답변을 받아보세요.</p>
      
      {/* ✅ 관리자 모드 버튼 추가 */}
      {!isAdmin && <button onClick={handleAdminLogin}>관리자 로그인</button>}
      {isAdmin && <p>관리자 모드입니다. 답변을 달 수 있습니다.</p>}

      <QuestionForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="제목"
          value={newQuestion.title}
          onChange={(e) => setNewQuestion({ ...newQuestion, title: e.target.value })}
          style={{ padding: "10px", border: "1px solid #ddd" }}
        />
        <textarea
          placeholder="내용"
          value={newQuestion.content}
          onChange={(e) => setNewQuestion({ ...newQuestion, content: e.target.value })}
          style={{ padding: "10px", border: "1px solid #ddd", minHeight: "80px" }}
        />
        <input
          type="password"
          placeholder="비밀번호 (삭제 시 필요)"
          value={newQuestion.password}
          onChange={(e) => setNewQuestion({ ...newQuestion, password: e.target.value })}
          style={{ padding: "10px", border: "1px solid #ddd" }}
        />
        <label>
          <input
            type="checkbox"
            checked={newQuestion.isPrivate}
            onChange={(e) => setNewQuestion({ ...newQuestion, isPrivate: e.target.checked })}
          />
          비밀글 (관리자만 확인 가능)
        </label>
        <button type="submit" style={{ padding: "10px", background: "#007bff", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          질문 올리기
        </button>
      </QuestionForm>

      <QuestionList>
        {questions.map((q) => (
          <QuestionItem key={q.id}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
              <Title onClick={() => q.isPrivate && handlePrivateContent(q.id)}>
                {q.isPrivate ? "🔒 비밀글" : "📢 공개글"} - {q.title}
              </Title>
              <div style={{display: 'flex', gap: '8px'}}>
                {/* ✅ 관리자 모드일 경우 답글 달기 버튼 표시 */}
                {isAdmin && !q.answer && (
                    <button onClick={() => setSelectedQuestion(q)} style={{background: "#28a745", border: "none", color: "#fff", padding: "4px 8px", borderRadius: "4px", cursor: "pointer"}}>답변 달기</button>
                )}
                {/* ✅ 일반 사용자는 모달, 관리자는 즉시 삭제 */}
                <button onClick={() => openDeleteModal(q)} style={{background: "none", border: "none", color: "red", cursor: "pointer"}}>삭제</button>
              </div>
            </div>
            {q.isPrivate ? (
              privatePassword[q.id] ? (
                <Content>{q.content}</Content>
              ) : (
                <Content style={{color: '#999'}}>비밀글입니다. 제목을 클릭해 비밀번호를 입력하세요.</Content>
              )
            ) : (
              <Content>{q.content}</Content>
            )}
            {q.answer && (
              <Answer>
                <p><strong>[관리자 답변]</strong> {q.answer}</p>
              </Answer>
            )}
            {/* ✅ 선택된 질문에 대한 답글 폼 */}
            {isAdmin && selectedQuestion?.id === q.id && (
                <AdminForm>
                    <form onSubmit={handleAnswerSubmit}>
                        <textarea
                            placeholder="답변 내용을 입력하세요..."
                            value={answerContent}
                            onChange={(e) => setAnswerContent(e.target.value)}
                            style={{ width: '100%', minHeight: '60px', padding: '8px' }}
                        />
                        <button type="submit">답변 등록</button>
                    </form>
                </AdminForm>
            )}
          </QuestionItem>
        ))}
      </QuestionList>

      {showPasswordModal && (
        <PasswordModal>
          <h3>비밀번호 확인</h3>
          <p>글을 삭제하려면 비밀번호를 입력하세요.</p>
          <input
            type="password"
            placeholder="비밀번호"
            value={passwordToDelete}
            onChange={(e) => setPasswordToDelete(e.target.value)}
            style={{ padding: "10px", border: "1px solid #ddd" }}
          />
          <div>
            <button onClick={() => handleDelete(selectedQuestion.id)} style={{ padding: "8px 12px", marginRight: "10px" }}>확인</button>
            <button onClick={() => setShowPasswordModal(false)} style={{ padding: "8px 12px" }}>취소</button>
          </div>
        </PasswordModal>
      )}
    </QAContainer>
  );
}