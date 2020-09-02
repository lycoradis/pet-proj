import React from 'react';

interface Message {
    messageID: number;
    messageText: string;
}

interface Props{
    items: Array<Message>;
}


export default function DisplayMessages(props:Props) {


    return (
        <div className="messages__container">
            <h3 className="messages__title">Сообщения: </h3>
            {props.items.map(
                (item, index) => {
                    return (
                    <div className="message" key={index}>
                        <h4 className="message__title">Message #{index}</h4>
                        <p className="message__text">{item.messageText}</p>
                    </div>)
                }
            )}
        </div>
    )
}