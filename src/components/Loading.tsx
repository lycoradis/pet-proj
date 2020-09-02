import React from 'react';

interface Props {
    text: string;
    count: number;
}


export default function Loading(props:Props) {
    const logo = require("../media/Loading.gif");
    return(
        <div className="Loading">
        <img src={logo} alt="#" className="Loading__gif"/>
        <h4 className="Loading__title">Идет загрузка...</h4>
    <p className="Loading__text">{props.text}<br/> {props.count < 10 ? (<span>Попыток подключения: {props.count}/10</span>) : (<span>Ошибка в подключении к серверу, попробуйте подключится позднее!</span>)}</p>
        </div>
    );
}