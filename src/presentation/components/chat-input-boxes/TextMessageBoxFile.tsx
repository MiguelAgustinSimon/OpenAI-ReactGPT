// Esto agrega un boton para grabar audio
import { FormEvent, useRef, useState } from 'react';

interface Props {
  onSendMessage: (message: string, file: File) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  accept?: string; // image/*
}

export const TextMessageBoxFile = ({ onSendMessage, placeholder, disableCorrections = false, accept }: Props) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  
  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedFile) return;

    onSendMessage(message, selectedFile);
    setMessage('');
    setSelectedFile(null);
  };

  const startRecording = async () => {
    setIsRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      setAudioChunks((prevChunks) => [...prevChunks, event.data]);
    };

    recorder.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
      const audioFile = new File([audioBlob], 'recording.webm', { type: 'audio/webm' });
      setSelectedFile(audioFile);
      setAudioChunks([]);
    };

    recorder.start();
    setMediaRecorder(recorder);
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder?.stop();
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="mr-3">
        <button
          type="button"
          className="flex items-center justify-center text-gray-400 hover:text-gray-600"
          onClick={() => inputFileRef.current?.click()}
        >
          <i className="fa-solid fa-paperclip text-xl"></i>
        </button>

        <input
          type="file"
          ref={inputFileRef}
          accept={accept}
          onChange={(e) => setSelectedFile(e.target.files?.item(0) || null)}
          hidden
        />
      </div>

      <div className="mr-3">
        <button
          type="button"
          className={`flex items-center justify-center text-gray-400 hover:text-gray-600 ${isRecording ? 'text-red-600' : ''}`}
          onClick={isRecording ? stopRecording : startRecording}
        >
          {isRecording ? (
            <i className="fa-solid fa-stop text-xl"></i>
          ) : (
            <i className="fa-solid fa-microphone text-xl"></i>
          )}
        </button>
      </div>

      <div className="flex-grow">
        <div className="relative w-full">
          <input
            type="text"
            autoFocus
            name="message"
            className="flex w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? 'on' : 'off'}
            autoCorrect={disableCorrections ? 'on' : 'off'}
            spellCheck={disableCorrections ? 'true' : 'false'}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary" disabled={!selectedFile}>
          {!selectedFile ? (
            <span className="mr-2">Enviar</span>
          ) : (
            <span className="mr-2">{selectedFile.name.substring(0, 10) + '...'}</span>
          )}
          <i className="fa-regular fa-paper-plane"></i>
        </button>
      </div>
    </form>
  );
};