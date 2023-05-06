import React from "react";
import { useState } from "react";

const Abc: React.FC = () => {
  const [mess, setMess] = useState(false);
  const [flag, setFlag] = useState(false);
  const [and, setAnd] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  var message;
  var rmessage;
  var audio;

  const buttonHandler = () => {
    setFlag(true);
  };

  const nextEventHandler = () => {
    setMess(true);
    setFlag(false);
  };

  const andEventHandler = () => {
    setAnd(true);
    setMess(false);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  message = (
    <div className="flex justify-center">
      <img
        src={"first.jpg"}
        alt="DD loves you"
        className=" flex justify-left w-16 md:w-32 lg:w-48 transition duration-300 ease-in-out hover:scale-110 rounded-lg"
      />
      <div className="flex justify-center px-10">
        <p className="text-xl whitespace-pre-line">
          Me know you look good in any and every way shape or form. But me dont
          like it when you get mad or me disturb your mental peace.
        </p>
        <div className="relative">
          <button
            onClick={nextEventHandler}
            className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 rounded px-10 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );

  rmessage = (
    <div className="flex justify-center">
      <img
        src={"second.jpg"}
        alt="DD loves you"
        className=" flex justify-left w-16 md:w-32 lg:w-48 transition duration-300 ease-in-out hover:scale-110 rounded-lg"
      />
      <div className="flex justify-center px-10">
        <p className="text-xl whitespace-pre-line">
          So stay happy bembi, and dont worry to much cause you are the most
          precious thing in me life
        </p>
        <div className="relative">
          <button
            onClick={andEventHandler}
            className="absolute bottom-0 right-0 bg-blue-500 hover:bg-blue-700 rounded px-10 py-2"
          >
            And
          </button>
        </div>
      </div>
    </div>
  );

  audio = (
    <div className="flex justify-center">
      <img
        src={"third.jpg"}
        alt="DD loves you"
        className=" flex justify-left w-16 md:w-32 lg:w-48 transition duration-300 ease-in-out hover:scale-110 rounded-lg"
      />
      <div className="flex justify-center px-10">
        <p className="text-xl whitespace-pre-line">DunDunie Loves You A Lot</p>
      </div>
      <div className="relative">
          <audio src="meitennu.mp3" controls={true} autoPlay={isPlaying}className="absolute bottom-0 right-0  rounded-lg"/>
          {isPlaying ? (
            <button onClick={handlePause}></button>
          ) : (
            <button onClick={handlePlay}></button>
          )}
        </div>
    </div>
  );

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      {!flag && !mess && !and && (
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={buttonHandler}
        >
          Click Here For Surprise(s?)
        </button>
      )}
      {flag && <div> {message}</div>}
      {mess && <div> {rmessage}</div>}
      {and && <div> {audio}</div>}
    </div>
  );
};

export default Abc;
