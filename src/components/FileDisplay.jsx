import React from "react";

const FileDisplay = ({
  file,
  audioStream,
  handleAudioReset,
  handleFormSubmission,
}) => {
  return (
    <main className="flex-1 flex flex-col justify-center text-center gap-3 sm:gap-4  p-4 pb-20 w-72 sm:w-96  max-w-full mx-auto">
      <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl">
        Your <span className="text-blue-400 bold ">File</span>
      </h1>

      <div className="flex flex-col text-left  my-4">
        <h3 className="font-semibold">Name</h3>
        <p>{file ? file?.name : "Custom audio"}</p>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={handleAudioReset}
          className="text-slate-400 hover:text-blue-600
          duration-200"
        >
          Reset
        </button>
        <button
          onClick={handleFormSubmission}
          className="specialBtn px-3 p-2 rounded-lg text-blue-400 flex justify-center items-center gap-2 font-medium"
        >
          <p> Transcribe</p>
          <i className="fa-solid fa-pen-nib"></i>
        </button>
      </div>
    </main>
  );
};

export default FileDisplay;
