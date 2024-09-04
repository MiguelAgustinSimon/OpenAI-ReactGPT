import React, { useState } from 'react'
import { GptMessage } from '../../components/chat-bubbles/GptMessage';
import { MyMessage } from '../../components/chat-bubbles/MyMessage';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { TextMessageBox } from '../../components/chat-input-boxes/TextMessageBox';
import { orthographyUseCase } from '../../../core/use-cases/orthography.use-case';
import { GptOrthographyMessage } from '../../components/chat-bubbles/GptOrthographyMessage';


interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  }
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, errors, userScore, message } = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [...prev, { text: `${message}`, isGpt: true }]);
    } else {
      setMessages((prev) => [...prev, {
        text: text, isGpt: true,
        info: {
          userScore,
          errors,
          message: message as string
        }
      }]);
    }

    setIsLoading(false);

    //isGPT true

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
                  <GptOrthographyMessage
                    key={index}
                    errors={message.info!.errors}
                    message={message.info!.message}
                    userScore={message.info!.userScore}
                  ></GptOrthographyMessage>
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

      {/* Write a message  */}
      <TextMessageBox onSendMessage={handlePost} disableCorrections></TextMessageBox>
    </div >
  )
}
