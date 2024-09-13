import React, { useState } from 'react'
import { GptMessage } from '../../components/chat-bubbles/GptMessage';
import { MyMessage } from '../../components/chat-bubbles/MyMessage';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { TextMessageBoxFile } from '../../components/chat-input-boxes/TextMessageBoxFile';
import { audioToTextUseCase } from '../../../core/use-cases/audio-to-text.use-case';
import { RecordFile } from '../../components/chat-input-boxes/RecordFile';


interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  //los parametros deben coincidir con onSendMessage: (message: string, file: File) de TextMessageBoxFile
  const handlePost = async (text: string, audioFile: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    
    const resp = await audioToTextUseCase(audioFile, text);
    if (!resp) return;

    const gptMessage = `
## Transcripción:
__Duración:__ ${Math.round(resp.duration)} segundos
## El texto es:
${resp.text}
`

    setMessages((prev) => [...prev, { text: gptMessage, isGpt: true }]);

    for (const segment of resp.segments) {
      const segmentMessage = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos:__
${segment.text}
`

      setMessages((prev) => [
        ...prev,
        { text: segmentMessage, isGpt: true }
      ]);
    }

    setIsLoading(false);

  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12'>
          <GptMessage text="Qué audio quieres generar hoy?"></GptMessage>
          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text={message.text}></GptMessage>
                )
                : (
                  <MyMessage key={index} text={(message.text === '') ? 'Transcribe el audio' : message.text} />
                )
            ))
          }

          {
            isLoading && (
              <div className='col-start-1 col-end-12 fade-in'>
                {/* Bubles when trying to respond*/}
                <TypingLoader className='fade-in'></TypingLoader>
              </div>
            )
          }

        </div>
      </div>

      {/* <TextMessageBoxFile onSendMessage={handlePost} placeholder='Escribe aquí lo que deseas' disableCorrections accept='audio/*'></TextMessageBoxFile> */}
      <RecordFile onSendMessage={handlePost}></RecordFile>
    </div >
  )
}