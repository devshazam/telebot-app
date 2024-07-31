"use client"


import React, { useContext, useEffect, useState } from "react";

import { Select, Space,  Button , Steps, Spin} from 'antd';

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
// import Container from "react-bootstrap/Container";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// import SendToBasket from "../../components/basket/SendToBasket";


import { fetchPriceOfProduce, payForGoods } from "@/http/jsonAPI";

declare global {
  interface Window {
    Telegram:any;
  }
}

export default function Home() {
  const [flag, setFlag] = useState<any>(0);
  const [user, setUser] = useState<any>(null);
  const [vizit, setVizit] = useState([]);
  const [value, setValue] = useState(0);
  const [side, setSide] = useState("0");
  const [vid, setVid] = useState("0");
  const [lam, setLam] = useState("0");
  const [num, setNum] = useState("0");
  const [description, setDescription] = useState(""); // Телефон
  const name = "Визитки";
  const goodsId = "0";
  const vizSize = ["односторонние", "двусторонние"];
  const vizVid = ["матовая", "глянцевая", "дизайнерская"];
  const vizLam = ["без ламинации", "глянцевая", "матовая"];
  const vizNum = ["96", "200", "500", "1000"];
  // console.log(vizit);

  function payForBasket2() {
    if(window && window.Telegram){
      let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 

      // const mainButton = window.Telegram.WebApp.MainButton;
      // mainButton.text = "Готово";
      // mainButton.enable();
      // mainButton.show();
      // and make it send the "foods" object (as JSON string) back to the backend
      // tg.sendData(JSON.stringify({"dfd": "dfd"}));

      tg.sendData(JSON.stringify({ name: "Визитки", value, description }));

      // mainButton.onClick(function(){
      // })


    }

  }

  useEffect(() => {
      fetchPriceOfProduce({ jsonId: 2 })
          .then((data) => {
              setVizit(JSON.parse(data.value));
          })
          .catch((error) => {
              if (error.response?.data) {
                  alert(
                      `${error.response.data.message}${error.response.status}`
                  );
              } else {
                  console.log("dev", error);
                  alert("Ошибка 153 - Обратитесь к администратору!");
              }
          });
  }, []);

  useEffect(() => {
      if (vizit.length == 0) return;
      setValue(vizit[+side][+vid][+lam][+num]);
      setDescription(
          `Наименование: ${name}; Цена: ${value} рублей; Кол-во сторон печати: ${
              vizSize[+side]
          }; Бумага: ${vizVid[+vid]}; Ламинация: ${vizLam[+lam]}; Кол-во: ${
              vizNum[+num]
          };`
      );
  }, [value, side, num, lam, vid, vizit]); // <- add the count variable here


  function payForBasket(value:any) {
    if(!user){
      alert("Вы не авторизированы!");
      return;
    };
    payForGoods({ value, userId: user[2], description })
        .then((data:any) => {
            console.log(data.id);
            window.location.href = data.confirmation.confirmation_url;
        })
        .catch((error:any) => {
            if (error.response.data) {
                alert(
                    `${error.response.data.message}${error.response.status}`
                );
            } else {
                console.log("dev", error);
                alert("Ошибка 130 - Обратитесь к администратору!");
            }
        });
  }


  return (

        <>
        <h1 style={{fontSize: 50, margin: '4px'}}>Визитки</h1>
                        <img src="/icons8-robot-100.png" alt='map' style={{display: "inline-block"}}/>
                        {
                          !value ?
                        <Spin size="large" />
                          :
                        <h1 style={{fontSize: 60, display: "inline-block"}}>{value}</h1>
                        }
                      <Space direction="vertical" style={{ width: '100%' }}>


                            <Select
                                // style={{ width: 120 }}
                                onChange={(e:any) =>
                                  setSide(e)
                              }
                              style={{ width: '100%' }}
                              value={side}
                                options={[
                                  { value: '0', label: 'Односторонние' },
                                  { value: '1', label: 'Двусторонние' },
                                  // { value: 'disabled', label: 'Disabled', disabled: true },
                                ]}
                              />
                            <Select
                                    // style={{ width: 120 }}
                                    onChange={(e:any) => setVid(e)}
                                    value={vid}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: 'Матовая' },
                                      { value: '1', label: 'Глянцевая' },
                                      { value: '2', label: 'Дизайнерская' },
                                      // { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                  />
                            <Select
                                    // style={{ width: 120 }}
                                    onChange={(e:any) => setLam(e)}
                                    value={lam}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: 'Без ламинации' },
                                      { value: '1', label: 'Глянцевая' },
                                      { value: '2', label: 'Матовая' },
                                      // { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                  />
                            <Select
                                    // style={{ width: 120 }}
                                    onChange={(e:any) => setNum(e)}
                                    value={num}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: '96' },
                                      { value: '1', label: '200' },
                                      { value: '2', label: '500' },
                                      { value: '3', label: '1000' },
                                      // { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                  />
                                  <Button type="primary" block  onClick={payForBasket2}>
                                      Заказать
                                    </Button>
      <p>* Все цены действуют только в Телеграм!</p>
      </Space>


      {/* <Steps
    current={1}
    items={[
      {
        title: 'Finished',
        description,
      },
      {
        title: 'In Progress',
        description,
        subTitle: 'Left 00:00:08',
      },
      {
        title: 'Waiting',
        description,
      },
    ]}
  /> */}
        </>
  );
}
