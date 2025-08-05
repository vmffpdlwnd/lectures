import Child from "./Child";
import { useState } from "react";
import Button from "./Button";
import "./styles.scss";
export default function App1() {
  const [data, setData] = useState("초기값");

  // 자식이 데이터를 보냈을 때 실행될 콜백
  const 콜백 = (자식에서받아온데이터) => {
    console.log("콜백함수 실행", 자식에서받아온데이터);
    setData(자식에서받아온데이터); // 부모 상태도 갱신해봅시다
  };

  return (
    <>
      <h1>부모상태: {data}</h1>
      <Child onData={콜백} />
      <Button />
    </>
  );
}
