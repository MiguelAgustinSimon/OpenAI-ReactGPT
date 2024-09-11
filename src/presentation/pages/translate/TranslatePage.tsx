import React, { useState } from 'react'
import { GptMessage } from '../../components/chat-bubbles/GptMessage';
import { MyMessage } from '../../components/chat-bubbles/MyMessage';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { TextMessageBoxSelect } from '../../components/chat-input-boxes/TextMessageBoxSelect';
import { translateUseCase } from '../../../core/use-cases/translate.use-case.ts';

interface Message {
  text: string;
  isGpt: boolean;
}

const languages = [
  { id: "alemán", text: "Alemán" },
  { id: "árabe", text: "Árabe" },
  { id: "bengalí", text: "Bengalí" },
  { id: "francés", text: "Francés" },
  { id: "hindi", text: "Hindi" },
  { id: "inglés", text: "Inglés" },
  { id: "japonés", text: "Japonés" },
  { id: "mandarín", text: "Mandarín" },
  { id: "portugués", text: "Portugués" },
  { id: "ruso", text: "Ruso" },
];

export const TranslatePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedOption: string) => {
    setIsLoading(true);
    //const newMessage=`Traduce: "${text}" al idioma ${selectedOption}`;

    setMessages((prev) => [...prev, { text: text, isGpt: false }]);
    const { ok, message } = await translateUseCase(text,selectedOption);
    setIsLoading(false);
    if (!ok) return;
    setMessages((prev) => [...prev, { text: `${message}`, isGpt: true }]);

  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12'>
          <GptMessage text="Qué quieres que traduzca hoy?"></GptMessage>˝
          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text={message.text}></GptMessage>
                )
                : (
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
        options={languages}
      ></TextMessageBoxSelect>
    </div >
  )
}
