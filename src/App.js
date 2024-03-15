import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function App() {
	// State to manage incoming messages from server
	const [messages, setMessages] = useState([]);
	// State to manage message input
    const [input, setInput] = useState('');

	useEffect(() => {
		// Add event listener for 'message' only once when component mounts
		socket.on('message', (message) => {
			setMessages(prevMessages => [...prevMessages, message]);
		});

		// Clean up event listener when component unmounts
		return () => {
			socket.off('message');
		};
	}, []);

	// Send message to the server
    const sendMessage = () => {
        if (input.trim() !== '') {
            socket.emit('message', input);
            setInput('');
        }
    };

	return (
		<div className='chat__app'>
			<h1>Chat App</h1>
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button onClick={sendMessage}>Send</button>
			<div className='message__box'>
				<strong>Broadcasted Messages:</strong>
				{messages.map((message, index) => (
					<div key={index}>{message}</div>
				))}
			</div>
		</div>
	);
}

export default App;