import React, { useState } from 'react'
import { GptMessage } from '../components/chat-bubbles/GptMessage';
import { MyMessage } from '../components/chat-bubbles/MyMessage';
import { TextMessageBox } from '../components/chat-input-boxes/TextMessageBox';
import { TypingLoader } from '../components/loaders/TypingLoader';

interface Message {
  text: string;
  isGpt: boolean;
}

export const ChatTemplate = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    setIsLoading(false);
    
  }

  return (
    <div className='chat-container'>
      <div className='chat-messages'>
        <div className='grid grid-cols-12'>
          <GptMessage text="Escribe tu texto y te ayudo con las correcciones."></GptMessage>
          {
            messages.map((message, index) => (
              message.isGpt
                ? (
                  <GptMessage key={index} text="Soy OpenAI."></GptMessage>
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

      <TextMessageBox onSendMessage={handlePost} disableCorrections></TextMessageBox>
    </div >
  )
}
