import React from "react";

const HomePage = ({ setFile, setAudioStream }) => {
  return (
    <main className="flex-1 flex flex-col justify-center text-center gap-3 sm:gap-4 md:gap-5 p-4 pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Free<span className="text-blue-400 bold ">Scribe</span>
      </h1>

      <h3 className="font-medium md:text-lg">
        Record <span className="text-blue-400">&rarr;</span> Transcribe{" "}
        <span className="text-blue-400">&rarr;</span> Translate
      </h3>
      <button className="flex items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 specialBtn px-4 py-2 rounded-xl">
        <p className="text-blue-400">Record</p>
        <i className="fa-solid fa-microphone"></i>
      </button>

      <p className="text-base">
        Or{" "}
        <label className="text-blue-400 hover:text-blue-600 duration-200 cursor-pointer">
          upload{" "}
          <input
            onClick={(e) => setFile((f) => (f = e.target.files[0]))}
            type="file"
            accept=".mp3, .wave"
            className="hidden"
          />
        </label>{" "}
        a mp3 file
      </p>
      <p className="italic text-slate-400">Free now free forever</p>
    </main>
  );
};

export default HomePage;
