import React, { useState } from 'react'
import { GptMessage } from '../../components/chat-bubbles/GptMessage';
import { MyMessage } from '../../components/chat-bubbles/MyMessage';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { textToAudioUseCase } from '../../../core/use-cases/text-to-audio.use-case.ts';
import { GptMessageAudio } from '../../components/chat-bubbles/GptMessageAudio.tsx';

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: 'text'
}


interface AudioMessage {
  text: string;
  isGpt: boolean;
  type: 'audio';
  audio: string;
}

type Message = TextMessage | AudioMessage;

const disclaimer = `## Qué audio quieres generar hoy?
* Todo el audio es generado por AI`;

const voices = [
  { id: 'nova', text: 'nova' },
  { id: 'alloy', text: 'alloy' },
  { id: 'echo', text: 'echo' },
  { id: 'fable', text: 'fable' },
  { id: 'onyx', text: 'onyx' },
  { id: 'shimmer', text: 'shimmer' }
];

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false, type: 'text' }]);
    const { ok, message, audioUrl } = await textToAudioUseCase(text, selectedVoice);
    setIsLoading(false);
    if (!ok) return;

    setMessages((prev) => [...prev, { text: `${selectedVoice}: ${message}`, isGpt: true, type: "audio", audio: audioUrl! }]);
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12'>
          <GptMessage text={disclaimer}></GptMessage>˝
          {
            messages.map((message, index) => (
              message.isGpt ? (
                message.type === 'audio' ? (
                  <GptMessageAudio key={index} text={message.text} audio={message.audio}></GptMessageAudio>
                ) : (
                  <GptMessage key={index} text={message.text}></GptMessage>
                )
              ) : (
                <MyMessage key={index} text={message.text}></MyMessage>
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

      {/* Ingreso de texto */}
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        options={voices}
      ></TextMessageBoxSelect>
    </div >
  )
}