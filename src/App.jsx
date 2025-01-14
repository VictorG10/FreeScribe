import React, { useEffect, useRef, useState } from "react";
import HomePage from "./components/HomePage";
import Header from "./components/Header";
import FileDisplay from "./components/FileDisplay";
import Information from "./components/Information";
import Transcribing from "./components/Transcribing";
import { MessageTypes } from "./utils/preset";

const App = () => {
  const [file, setFile] = useState(null);
  const [audioStream, setAudioStream] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [finished, setFinished] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const isAudioAvailable = file || audioStream;

  const handleAudioReset = () => {
    setFile(null);
    setAudioStream(null);
  };

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        { type: "module" }
      );
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case "DOWNLOADING":
          setDownloading(true);
          console.log("Downloading");
          break;

        case "LOADING":
          setLoading(true);
          console.log("Loading");
          break;

        case "RESULT":
          setOutput(e.data.results);
          break;

        case "INFERENCE_DONE":
          setFinished(true);
          console.log("Finished");
          break;
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () =>
      worker.current.removeEventListener("message", onMessageReceived);
  }, []);

  const readAudioFrom = async (file) => {
    if (!file || file.size === 0) {
      throw new Error(
        "Invalid file: File is either empty or not uploaded properly."
      );
    }

    try {
      const sampling_rate = 16000;
      const audioCTX = new AudioContext({ sampleRate: sampling_rate });
      const response = await file.arrayBuffer();
      const decoded = await audioCTX.decodeAudioData(response);
      const audio = decoded.getChannelData(0);

      return audio;
    } catch (error) {
      console.error("Error decoding audio data: ", error);
      throw new Error("Unable to decode the audio file.");
    }
  };

  const handleFormSubmission = async () => {
    if (!file && !audioStream) {
      return;
    }

    let audio = await readAudioFrom(file ? file : audioStream);
    const model_name = `openai/whisper-tiny.en`;

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name,
    });
  };

  return (
    <div className="flex flex-col  max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        {output ? (
          <Information />
        ) : loading ? (
          <Transcribing />
        ) : isAudioAvailable ? (
          <FileDisplay
            file={file}
            audioStream={audioStream}
            handleAudioReset={handleAudioReset}
            handleFormSubmission={handleFormSubmission}
          />
        ) : (
          <HomePage setFile={setFile} setAudioStream={setAudioStream} />
        )}
      </section>

      <footer className=""></footer>
    </div>
  );
};

export default App;
