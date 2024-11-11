import React, { useEffect, useState,useCallback } from "react";
import socket from './socket';
import { useNavigate } from "react-router-dom";
import MyTimer from "./Times/Timer";
import './Style/Table.css';

const ParticipantsTable = ({isAdmin}) => {
    const [usersTorg, setUsersTorg] = useState([]);
    const [id, setId] = useState('id');
    const navigate = useNavigate();
    const [money, setMoney] = useState([0]);
    const [isDisabled, setIsDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState([false, false, false, false]);
    const [start, setStart] = useState(false);
    

    useEffect(() => {
        // Обработчики событий
        const handleSocketMessages = {
            'yourTorg': (msg) => setUsersTorg(msg),
            'yourId': (msg) =>  setId(msg),
            'sendPlus': (msg) => setMoney(msg),
            'sendTime': (mass) =>  setTimeLeft(mass),
            'start': (msg) => setStart(msg)
        };
        Object.keys(handleSocketMessages).forEach((event) =>
            socket.on(event, handleSocketMessages[event])
        );
        return () => {
            Object.keys(handleSocketMessages).forEach((event) =>
                socket.off(event, handleSocketMessages[event])
            );
        };
    }, []);

    window.onerror = function (message, source, lineno, colno, error) {
        console.error('Error occurred:', message, source, lineno, colno, error);
        return true; 
    };
    
    window.addEventListener('unhandledrejection', (event) => {
        console.error('Unhandled Promise rejection:', event.promise, event.reason);
    });

    const plusH = () => {
        socket.emit('plus');
    };

    const inTorg = () => {
        socket.emit('goTorg');
        setIsDisabled(true);
    };

    const goHome = () => {
        socket.emit('goHome');
        navigate('/', { replace: false });
    };
    
    const step = (stepId) => {
        let k = usersTorg.indexOf(stepId);
        if (timeLeft[k]) { return; }
        return 'disabled';
    };

    const updateTime = () => {
        let k = timeLeft.indexOf(true);
        setTimeLeft(prevItems => {
            const newItems = [...prevItems];
            if (k === timeLeft.length - 1) {
                newItems[k] = false;
                newItems[0] = true;
            } else {
                newItems[k] = false;
                newItems[k + 1] = true;
            }
            socket.emit('massTime', newItems);
            return newItems;
        });
    };

    const Return = useCallback(() => {
        socket.emit('returnVerify');
    }, []);

    const startTorg = () => {
        setIsDisabled(true);
        let s = [true, false, false, false];
        setTimeLeft(s);
        socket.emit('massTime', s);
        socket.emit('startTorg');
    };

    const stopTorg = () => {
        setIsDisabled(false);
        let k = [false, false, false, false];
        setTimeLeft(k);
        socket.emit('massTime', k);
        socket.emit('stopTorg');
    };

    const buttonsAdmin = [
        <button className="primary" disabled={isDisabled} onClick={startTorg}>Начать торги</button>,
        <button className="secondary" disabled={!isDisabled} onClick={updateTime}>Обновить</button>,
        <button className="danger" disabled={!isDisabled} onClick={stopTorg}>Завершить торги</button>,
        <button className="return" onClick={Return}>Вернуться</button>
    ];

    const buttonsUser = [
        <button className="primary" disabled={step(id)} onClick={plusH}>Повысить ставку</button>,
        <button className="secondary" disabled={step(id)} onClick={updateTime}>Пас</button>,
        <button className="return" onClick={goHome}>Вернуться</button>,
        <button className="primary" disabled={isDisabled} onClick={inTorg}>Вступить</button>,
    ];

    function getParticipantsData() {
        return {
            requirements: [
                {
                    parameter: 'Срок изготовления',
                    participants: ['100', '100', '100', '100']
                },
                {
                    parameter: 'Гарантийные обязательства',
                    participants: [12, 12, 12, 12]
                },
                {
                    parameter: 'Условия оплаты',
                    participants: ['24', '24', '24', '24']
                },
                {
                    parameter: 'Ставка',
                    participants: [...money]
                },
                {
                    parameter: 'Действия',
                    participants: isAdmin ? [...buttonsAdmin] : [...buttonsUser]
                }
            ]
        };
    }

    const data = getParticipantsData();
    
    return (
        <> 
            <h1>Тестовые торги</h1>
            {start && <MyTimer expiryTimestamp={new Date().setSeconds(new Date().getSeconds() + 900)} func={stopTorg} />}
            <table>
                <thead>
                    <tr>
                        <th>Параметры требования</th>
                        {[1, 2, 3, 4].map((e, i) => (
                            <th key={100 + i} style={{ backgroundColor: id === usersTorg[i] ? 'yellow' : 'transparent' }}>
                                {usersTorg[i] ? 'Компания ' + e : 'Отсутствует'}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.requirements.map((req, index) => (
                        <tr key={index}>
                            <td>{req.parameter}</td>
                            {req.participants.map((participant, i) => (
                                <td key={i}>{participant}</td>
                            ))}
                        </tr>
                    ))}
                    <tr>
                        <td>Ход</td>
                        {timeLeft.map((e, i) => (
                            <td key={i}>
                                {e && <MyTimer expiryTimestamp={new Date().setSeconds(new Date().getSeconds() + 30)} func={updateTime} />}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        </>
    );
};

export default ParticipantsTable;
