import React, { useRef, useState } from 'react';

interface IMessage {
  username: string;
  message: string;
  id: string;
  event: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [value, setValue] = useState('');
  const socket = useRef<WebSocket>();
  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState('');

  const connect = () => {
    socket.current = new WebSocket('ws://localhost:5000');

    socket.current.onopen = () => {
      setConnected(true);
      const message = {
        event: 'connection',
        username,
        id: Date.now()
      };
      socket.current?.send(JSON.stringify(message));
    };
    socket.current.onmessage = (event: MessageEvent<any>) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [...prev, message]);
    };
    socket.current.onclose = () => {
      console.log('Socket закрыт');
    };
    socket.current.onerror = () => {
      console.log('Socket произошла ошибка');
    };
  };

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const message = {
      username,
      message: value,
      id: Date.now(),
      event: 'message'
    };
    socket.current?.send(JSON.stringify(message));
    setValue('');
  };

  if (!connected) {
    return (
      <div className='text-center'>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Введите ваше имя'
        />
        <button onClick={connect}>Войти</button>
      </div>
    );
  }

  return (
    <div className='flex w-screen bg-gray-900 lg:h-screen'>
      <div className='flex w-full shadow-md'>
        <div className='flex flex-grow flex-col bg-purple-50 lg:max-w-full'>
          <div id='msg' className='mb-2 h-full overflow-y-auto  p-6'>
            <ul className='ml-auto w-full max-w-[85%] [&_li]:mb-3 [&_li]:ml-auto'>
              {messages.map((mess) => (
                <li key={mess.id} className='w-screen break-words pr-6 lg:w-fit lg:pr-0'>
                  {mess.event === 'connection' ? (
                    <p className='mr-2 rounded-tr-xl rounded-tl-3xl rounded-bl-3xl bg-blue-400 py-3 px-4 text-white'>
                      Пользователь {mess.username} подключился
                    </p>
                  ) : (
                    <p className='mr-2 rounded-tr-xl rounded-tl-3xl rounded-bl-3xl bg-blue-400 py-3 px-4 text-white'>
                      {mess.message}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <form onSubmit={sendMessage}>
            <div className='flex w-full bg-purple-50 p-4 lg:p-8'>
              <div className='relative flex w-full lg:w-5/6'>
                <input
                  type='text'
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='Type...'
                  className='w-full flex-1 appearance-none rounded-r-lg border border-gray-300 bg-white py-2 px-1 text-base text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none lg:px-4'
                  name='message'
                />
              </div>
              <div className='hidden w-1/6 lg:block'>
                <button
                  type='submit'
                  className='ml-8 flex-shrink-0 rounded-lg bg-green-400 py-2 px-4 text-base font-semibold text-gray-700 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2'
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;

const a = () => (
  <div>
    {/*<div className='relative w-[600px] border border-black'>*/}
    {/*  {messages.map((mess) => (*/}
    {/*    <div key={mess.id} className='overflow-hidden text-right'>*/}
    {/*      {mess.event === 'connection' ? (*/}
    {/*        <p>Пользователь {mess.username} подключился</p>*/}
    {/*      ) : (*/}
    {/*        <p className='ml-auto mb-2 w-fit rounded-[24px] bg-blue-600 p-2'>{mess.message}</p>*/}
    {/*      )}*/}
    {/*    </div>*/}
    {/*  ))}*/}
    {/*  <form onSubmit={sendMessage} className='absolute bottom-0 left-0 h-18 flex border-t bg-blue-500 p-4'>*/}
    {/*    <input*/}
    {/*      type='text'*/}
    {/*      value={value}*/}
    {/*      onChange={(e) => setValue(e.target.value)}*/}
    {/*      className='mr-3 w-full px-3'*/}
    {/*      placeholder='Type...'*/}
    {/*    />*/}
    {/*    <button type='button' className='rounded bg-red-600 px-5 py-2 text-white'>*/}
    {/*      Отправить*/}
    {/*    </button>*/}
    {/*  </form>*/}
    {/*</div>*/}
  </div>
);
