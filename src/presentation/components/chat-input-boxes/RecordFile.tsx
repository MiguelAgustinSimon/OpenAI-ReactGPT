import * as React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

interface Props {
    onSendMessage: (message: string, file: File) => void;
}


export const RecordFile = ({ onSendMessage }: Props) => {
    const addAudioElement = (blob: Blob) => {
        const file = new File([blob], 'recording.webm', { type: 'audio/webm' });
        onSendMessage('Manten todos los signos de puntuacion', file); // Pasar el archivo a la función onSendMessage
    };


    return (
        <form className="border rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <p >
            Graba tu audio aquí y se convertirá a texto
          </p>
      
          <div style={{ minWidth: '50px', display: 'flex', justifyContent: 'flex-end' }}>
            <AudioRecorder
              onRecordingComplete={addAudioElement}
              audioTrackConstraints={{
                noiseSuppression: true,
                echoCancellation: true,
              }}
              onNotAllowedOrFound={(err) => console.table(err)}
              downloadOnSavePress={false}
              downloadFileExtension="webm"
              mediaRecorderOptions={{
                audioBitsPerSecond: 128000,
              }}
              showVisualizer={true}
            />
          </div>
        </div>
      </form>
    );
}
