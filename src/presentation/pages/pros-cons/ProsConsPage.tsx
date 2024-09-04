// import React, { useState } from 'react'
// import { GptMessage } from '../../components/chat-bubbles/GptMessage';
// import { MyMessage } from '../../components/chat-bubbles/MyMessage';
// import { TextMessageBox } from '../../components/chat-input-boxes/TextMessageBox';
// import { TypingLoader } from '../../components/loaders/TypingLoader';
// import { prosConsUseCase } from '../../../core/use-cases/pros-cons.use-case';

// interface Message {
//   text: string;
//   isGpt: boolean;
// }

// export const ProsConsPage = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [messages, setMessages] = useState<Message[]>([]);

//   const handlePost = async (text: string) => {
//     setIsLoading(true);
//     setMessages((prev) => [...prev, { text: text, isGpt: false }]);
//     const { ok, content } = await prosConsUseCase(text);
//     setIsLoading(false);

//     if (!ok) return;
//     setMessages((prev) => [...prev, { text: content ?? '', isGpt: true }]);

//   }

//   return (
//     <div className='chat-container'>
//       <div className='chat-messages'>
//         <div className='grid grid-cols-12'>
//           <GptMessage text="Escribe tu texto a comparar y te daré mis puntos de vista."></GptMessage>
//           {
//             messages.map((message, index) => (
//               message.isGpt ? (
//                 <GptMessage key={index} text={message.text}></GptMessage>
//               ) : (
//                 <MyMessage key={index} text={message.text}></MyMessage>
//               )
//             ))
//           }

//           {
//             isLoading && (
//               <div className='col-start-1 col-end-12 fade-in'>
//                 {/* Bubles when trying to respond*/}
//                 <TypingLoader className='fade-in'></TypingLoader>
//               </div>
//             )
//           }

//         </div>
//       </div>

//       <TextMessageBox onSendMessage={handlePost} disableCorrections></TextMessageBox>
//     </div >
//   )
// }


import { useState } from 'react';
import { prosConsUseCase } from '../../../core/use-cases/pros-cons.use-case';
import { GptMessage } from '../../components/chat-bubbles/GptMessage';
import { MyMessage } from '../../components/chat-bubbles/MyMessage';
import { TextMessageBox } from '../../components/chat-input-boxes/TextMessageBox';
import { TypingLoader } from '../../components/loaders/TypingLoader';
import { ProsConsResponse } from '../../../interfaces/prosCons.interface';

interface Message {
  text: string;
  isGpt: boolean;
  info?: ProsConsResponse
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([])
  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, content } = await prosConsUseCase(text);
    setIsLoading(false);

    if (!ok || typeof content === 'string') return;

    console.log(content);

    setMessages((prev) => [...prev, { text: '', isGpt: true, info: content }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text="Puedes escribir lo que sea que quieres que compare y te de mis puntos de vista." />
          {messages.map((message, index) => (
            message.isGpt ? (
              <GptMessage key={index} text={message.text} info={message.info} />
            ) : (
              <MyMessage key={index} text={message.text} />
            )
          ))}
          {isLoading && (
            <div className="col-start-1 col-end-12 fade-in">
              <TypingLoader />
            </div>
          )}
        </div>
      </div>
      <TextMessageBox
        onSendMessage={handlePost}
        placeholder='Escribe aquí lo que deseas'
        disableCorrections
      />

    </div>
  );
};