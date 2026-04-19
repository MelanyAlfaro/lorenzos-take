import "./SpeakingSection.css";
import { SpeakingSectionOptions } from "./SpeakingSectionOptions";
import { useState, useRef } from "react";

export function SpeakingSection({ quest }) {
  const [sentenceToSpeak, setSentenceToSpeak] = useState("");
  const [showOptions, setShowOptions] = useState(true);

  // Recording Related states
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [eror, setError] = useState(null);

  // Refs for MediaRecorder and audio chunks because they are mutable and we don't want to trigger re-renders when they change
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  function handleSpeaking(sentence) {
    console.log(sentence);
    setShowOptions(false);
    setSentenceToSpeak(sentence);
  }

  // Has to be async because we need to get user permission to access the microphone
  async function startRecording() {
    setError(null);
    setAudioURL(null);
    try {
      // Asks the user for permission to access the microphone and gets the audio stream if they allow it
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Get the appropriate MIME type (container format and codec) for recording based on browser support
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
          ? "audio/ogg;codecs=opus"
          : "audio/webm"; // fallback

      // Connect microphone stream to MediaRecorder to start recording, it's the placed where the audio data will be captured and processed, using that mimeType
      const mediaRecorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      // Runs every time a new chunk of audio data is available,  We push it into the audioChunksRef array for later use (like when stopping the recording and creating a complete audio file).
      mediaRecorder.ondataavailable = (audioEvent) => {
        const audioChunk = audioEvent.data;

        if (audioChunk.size > 0) {
          audioChunksRef.current.push(audioChunk);
        }
      };

      // Runs when the recording is stopped, we create a Blob from the collected audio chunks, generate a URL for that Blob, and update the state with that URL so it can be used to play back or download the recorded audio.
      mediaRecorder.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: mimeType });
        const url = URL.createObjectURL(blob);
        setAudioURL(url);

        // Create a File object from the Blob it takes the Blob, gives it a name and type, and then appends it to a FormData object to send it to the server for processing (like speech-to-text conversion).
        const file = new File([blob], "audio.webm", { type: blob.type });

        // We create a FormData object to send the audio file to the server, we append the File object to it with the key "file" so that the server can access it when processing the request.
        const formData = new FormData();
        formData.append("file", file);

        // We send the audio file to the server using the Fetch API, we make a POST request to the "/api/speech-to-text" endpoint with the FormData containing the audio file. We then wait for the response, parse it as JSON, and log the transcribed text to the console.
        try {
          const response = await fetch("/api/speech-to-text", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();

          console.log("You said:", data.text);
        } catch (error) {
          console.error("Error:", error);
        }
        // Stop all tracks of the stream to release the microphone and free up system resources
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      if (err.name === "NotAllowedError") {
        setError(
          "Microphone access was denied. Please allow it and try again.",
        );
      } else if (err.name === "NotFoundError") {
        setError("No microphone found on this device.");
      } else {
        setError("Could not start recording: " + err.message);
      }
    }
  }

  function stopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    } else {
      console.warn("No active recording to stop.");
    }
  }

  function handleReset() {
    setAudioURL(null);
    setError(null);
  }

  return (
    <div className="speaking-activity">
      {showOptions && (
        <SpeakingSectionOptions quest={quest} onOptionClick={handleSpeaking} />
      )}

      {!showOptions && (
        <div className="speaking-record-containter">
          <div className="speaking-record-instruction">
            Now, say the sentence out loud and record yourself!
          </div>
          <div className="speaking-sentence-to-speak">{sentenceToSpeak}</div>

          {!audioURL && (
            <button
              className={`speaking-record-button ${isRecording ? "recording" : ""}`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
          )}
          {audioURL && (
            <div className="speaking-playback">
              <audio controls src={audioURL} />
              <button className="speaking-record-button" onClick={handleReset}>
                Record Again
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
