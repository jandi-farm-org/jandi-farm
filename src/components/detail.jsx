const BigBox = ({ title, content }) => (
  <div className="w-full border-b-2 min-h-28 flex flex-col p-2">
    <span className="w-full font-bold">{title}</span>
    <div className="w-full h-full flex flex-col justify-center">
      <span>{content}</span>
    </div>
  </div>
);

const SmallBox = ({ title, content }) => (
  <div className="w-full border-b-2 min-h-14 flex justify-between p-2">
    <div className="h-full font-bold flex flex-col justify-center">
      <span>{title}</span>
    </div>
    <div className="h-full flex flex-col justify-center pr-2">
      <span>{content}</span>
    </div>
  </div>
);

// TODO
// 1. height overflow 해결
// 2. 데이터 프롭으로 받아오기
export default function Detail() {
  return (
    <div className="w-96 flex flex-col h-full border-2">
      <BigBox title="TODO" content="일정 1" />
      <BigBox title="Due" content="2024.07.31" />
      <BigBox title="Category" content="#유산소" />
      <SmallBox title="Project" content="운동" />
      <BigBox title="Details" content="3km 달리기" />
      <SmallBox title="Status" content="Done" />
    </div>
  );
}
