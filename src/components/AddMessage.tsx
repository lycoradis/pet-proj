import React from 'react';

interface Props {
    handleSubmit: () => void;
    handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function AddMessage(props: Props) {

    return (
        <div className="form">
            <div className="form__input">
                <input className="form__input__field input__field" placeholder="Ваше сообщение..." onChange={props.handleChange}></input>
            </div>
            <div className="form__button">
                <button onClick={() => props.handleSubmit()} type="submit" className="btn btn_submit">Отправить</button>
            </div>
        </div>
    );
} 