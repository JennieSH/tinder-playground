import { useState } from "react";
import TinderCard from "react-tinder-card";

const mockData = [
  {
    name: "John",
    age: 20,
    url: "https://picsum.photos/id/237/200/300",
    tags: ["cooking", "reading", "coding"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies"
  },
  {
    name: "Jane",
    age: 24,
    url: "https://picsum.photos/id/238/200/300",
    tags: ["hiking", "coding"],
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies ultrices, nunc nisl ultricies nunc, vitae ultricies"
  },
  {
    name: "Bob",
    age: 22,
    tags: ["cooking", "swimming", "fishing", "basketball"],
    url: "https://picsum.photos/id/238/200/300",
    description: `明月幾時有？把酒問青天。不知天上宮闕，今夕是何年？
    我欲乘風歸去，又恐瓊樓玉宇，高處不勝寒。 起舞弄清影，何似在人間？
    
    轉朱閣，低綺戶，照無眠。
    
    不應有恨，何事長向別時圓？
    
    人有悲歡離合，月有陰晴圓缺，此事古難全。但願人長久，千里共嬋娟。
    明月幾時有？把酒問青天。不知天上宮闕，今夕是何年？
    我欲乘風歸去，又恐瓊樓玉宇，高處不勝寒。 起舞弄清影，何似在人間？
    
    轉朱閣，低綺戶，照無眠。
    
    不應有恨，何事長向別時圓？
    
    人有悲歡離合，月有陰晴圓缺，此事古難全。但願人長久，千里共嬋娟。
    明月幾時有？把酒問青天。不知天上宮闕，今夕是何年？
    我欲乘風歸去，又恐瓊樓玉宇，高處不勝寒。 起舞弄清影，何似在人間？
    
    轉朱閣，低綺戶，照無眠。
    
    不應有恨，何事長向別時圓？
    
    人有悲歡離合，月有陰晴圓缺，此事古難全。但願人長久，千里共嬋娟。end`
  }
];

const Demo = () => {
  const [people, setPeople] = useState(mockData);

  const swiped = (direction: string, nameToDelete: string) => {
    console.log(`Removing ${nameToDelete}`);
    // Filter out the person that was swiped
    setPeople(people.filter(person => person.name !== nameToDelete));
  };

  const outOfFrame = (name: string) => {
    console.log(`${name} left the screen`);
  };

  const handleNo = () => {
    setPeople(people => people.slice(0, people.length - 1));
  };

  const handleYes = () => {
    setPeople(people => people.slice(0, people.length - 1));
  };

  return (
    <div className="h-screen bg-gray-100">
      <div className="relative flex items-center justify-center h-5/6">
        {people.map(person => (
          <TinderCard
            key={person.name}
            onSwipe={dir => swiped(dir, person.name)}
            onCardLeftScreen={() => outOfFrame(person.name)}
            preventSwipe={["up", "down"]}
            className="absolute w-full h-full p-4 overflow-scroll bg-gradient-to-br from-[#38adae] to-[#cd295a] rounded-b-3xl shadow-md xl:max-w-[40rem]"
          >
            <div className="flex items-center gap-4 mb-4">
              <img className="rounded-full h-16 w-16" src={person.url} alt="avatar" />
              <div>
                <h1 className="font-bold text-xl text-[#bbe0d7]">{person.name}</h1>
                <h2 className="font-bold text-sm text-[#95D0C2]">{person.age}</h2>
              </div>

              <div className="ml-auto flex flex-1 flex-wrap justify-end text-sm">
                {person.tags.map(tag => (
                  <span key={tag} className="text-white">
                    <span className="text-yellow-400 mx-1">#</span>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="whitespace-break-spaces break-words text-white">
              {person.description}
            </div>
          </TinderCard>
        ))}

        {people.length !== 0 && (
          <div className="absolute flex justify-evenly w-full bottom-4 font-extrabold">
            <button
              className="rounded-full w-16 h-16 text-[#975c67] bg-slate-50 drop-shadow-xl"
              onClick={handleNo}
            >
              NO
            </button>
            <button
              className="rounded-full w-16 h-16 text-[#50a3a2] bg-slate-50 drop-shadow-xl"
              onClick={handleYes}
            >
              YES
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 justify-center items-center h-1/6">
        <p className="text-[#686b6b]">剩餘 {people.length} 人</p>
        <button className="text-[#658e84] hover:text-[#7aac9f]" onClick={() => setPeople(mockData)}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Demo;
