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
    <section className='relative'>
      <div className='absolute left-0 bottom-0 w-[600px] border border-black'>
        {messages.map((mess) => (
          <div key={mess.id} className='overflow-hidden text-right'>
            {mess.event === 'connection' ? (
              <p>Пользователь {mess.username} подключился</p>
            ) : (
              <p className='ml-auto mb-2 w-fit rounded-[24px] bg-blue-600 p-2'>{mess.message}</p>
            )}
          </div>
        ))}
        <form onSubmit={sendMessage} className='h-18 flex border-t bg-blue-500 p-4'>
          <input
            type='text'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className='mr-3 w-full px-3'
            placeholder='Type...'
          />
          <button type='button' className='rounded bg-red-600 px-5 py-2 text-white'>
            Отправить
          </button>
        </form>
      </div>
    </section>
  );
};

export default Chat;
