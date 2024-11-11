import React, { useState } from "react";
import socket from './socket';

const Verify = () => {
    const [formData, setFormData] = useState({ login: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const adminVerify = (e) => {
        e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы
        if (!formData.login || !formData.password) {
            return;
        }

        const newMessage = { login: formData.login, password: formData.password };
        console.log(newMessage);
        socket.emit('sendVerify', newMessage);
        
        setFormData({ login: '', password: '' }); // Очистка полей формы
    };

    return (
        <div className="verify-container">
            <form onSubmit={adminVerify}>
                <input
                    type="text"
                    name="login"
                    onChange={handleInputChange}
                    placeholder="Enter login"
                    value={formData.login}
                />
                <input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder="Enter password"
                    value={formData.password}
                />
                <button type="submit">Вход</button>
            </form>
        </div>
    );
};

export default Verify;
/*import React, {useState} from "react";
import socket from './socket';


const Verify = () => {
    const [inputLog, setInputLog] = useState('');
    const [inputPas, setInputPas] = useState('');

    const adminVerify = () => {
        const newMessage = { login: inputLog, password: inputPas };
        console.log(newMessage);
        socket.emit('sendVerify', newMessage);
        setInputLog('');
        setInputPas('');
    };

    return (
        <div className="verify-container">
            <input
                type="text"
                onChange={(e) => setInputLog(e.target.value)}
                placeholder="Enter login"
                value={inputLog}
            />
            <input
                type="password"
                onChange={(e) => setInputPas(e.target.value)}
                placeholder="Enter password"
                value={inputPas}
            />
            <button onClick={adminVerify}>Вход</button>
        </div>
    );
};

export default Verify;*/
