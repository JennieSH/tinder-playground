import { createRef, RefObject, useMemo, useRef, useState } from "react";
import TinderCard from "react-tinder-card";

import mockData from "./constant/data";

type Direction = "left" | "right" | "up" | "down";

export interface API {
  swipe(dir?: Direction): Promise<void>;
  restoreCard(): Promise<void>;
}

const App = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(mockData.length - 1);
  const [_lastDirection, setLastDirection] = useState<string | undefined>(); // eslint-disable-line @typescript-eslint/no-unused-vars
  const currentIndexRef = useRef<number>(currentIndex);
  const childRefs = useMemo<RefObject<API>[]>(
    () =>
      Array(mockData.length)
        .fill(0)
        .map(() => createRef()),
    []
  );

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < mockData.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction: Direction, nameToDelete: string, index: number) => {
    console.log("swiped", direction, nameToDelete, index);
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current?.restoreCard();
  };

  const swipe = async (direction: Direction) => {
    if (canSwipe && currentIndex < mockData.length) {
      await childRefs[currentIndex].current?.swipe(direction);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current?.restoreCard();
  };

  const resetCards = async () => {
    updateCurrentIndex(mockData.length - 1);
    await Promise.all(childRefs.map(ref => ref.current?.restoreCard()));
  };

  return (
    <div className="h-screen max-w-screen bg-gray-100 overflow-hidden">
      <div className="relative flex items-center justify-center h-3/4">
        {mockData.map((person, index) => (
          <TinderCard
            ref={childRefs[index]}
            key={person.name}
            onSwipe={dir => swiped(dir, person.name, index)}
            onCardLeftScreen={() => outOfFrame(person.name, index)}
            preventSwipe={["up", "down"]}
            className="absolute w-full h-full p-4 pb-20 overflow-y-scroll scrolling bg-gradient-to-br from-[#38adae] to-[#cd295a] rounded-b-3xl shadow-md select-none xl:max-w-[40rem]"
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

        {currentIndex >= 0 && (
          <div className="absolute flex justify-evenly w-full bottom-4 font-extrabold xl:max-w-[40rem]">
            <button
              className="rounded-full w-16 h-16 text-[#975c67] bg-slate-50 drop-shadow-xl"
              onClick={() => swipe("left")}
            >
              NO
            </button>
            <button
              className="rounded-full w-16 h-16 text-[#50a3a2] bg-slate-50 drop-shadow-xl"
              onClick={() => swipe("right")}
            >
              YES
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 justify-center items-center p-8">
        <p className="text-[#686b6b]">剩餘 {currentIndex + 1} 人</p>
        <div className="flex gap-4">
          <button className="text-[#658e84] hover:text-[#7aac9f]" onClick={goBack}>
            Undo
          </button>
          <button className="text-[#a872ae] hover:text-[#865275]" onClick={resetCards}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
