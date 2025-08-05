const Child = (props) => {
  const changeHandler = (e) => {
    console.log("사용자 입력값:", e.target.value);
    props.onData(e.target.value); // ✅ 이렇게
  };

  return <input type="text" onChange={changeHandler} />;
};

export default Child;
