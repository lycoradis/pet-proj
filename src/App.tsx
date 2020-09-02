import React, {useEffect, useState} from 'react';
import axios from 'axios';
import * as rax from "retry-axios";

import './styles.css';


import AddMessage from './components/AddMessage';
import DisplayMessages from './components/DisplayMessages';
import Loading from './components/Loading';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const [count, setCount] = useState(0); 
  const [errorText, setErrorText] = useState("Если загрузка длится слишком долго, то возможно возникли проблемы в работе сервера или ведутся технические работы");

  const baseUrl ="https://localhost:5001";
  rax.attach();

  const handleSubmit = async () => {
    const header = {
      ContentType: "application/json",
      Accept: "application/json"
    }
    await axios.post(`${baseUrl}/api/Messages`, {MessageText: text}, {headers: header})
    .then(res => {
      console.log(res.data);
      getItems();
    })
    .catch(err => {
    });
  };


  const  getItems = async () => {
    await axios({
      method:'get',
      url: `${baseUrl}/api/Messages`,
      raxConfig: {
        retry: 10,
        noResponseRetries: 10,
        retryDelay: 1000,
        onRetryAttempt: (err) => {
          setLoading(true);
          const cfg: any = rax.getConfig(err);
          setCount(cfg.currentRetryAttempt);
        }
      }
    })
    .then((res) => {setItems(res.data); setLoading(false);})
    .catch(err=> {
      console.log(err);
    })
  }


  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  useEffect(
    () => {
      getItems();
    }, 
    []
  );


  return (
    <div className="App">
      {isLoading ? 
      <Loading text={errorText} count={count}></Loading>
        :
        (<div className="App__Wrapper">
      <AddMessage handleChange={handleChange} handleSubmit={handleSubmit}/>
      <DisplayMessages items={items}/>
      </div>)
        }  </div>
  );
}

export default App;
