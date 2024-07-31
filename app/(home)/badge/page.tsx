"use client"


import React, { useContext, useEffect, useState } from "react";

import { Select, Space,  Button , Steps, Spin, Input, Typography} from 'antd';

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
  const formatToImage = ['1.jpg', '2.jpg'];
  const formatToSize = ['37 mm', '56 mm'];
  const formatToPrice = [[45, 50, 55, 60, 65, 70, 80], [55, 60, 65, 70, 75, 80, 90]];
  const salesArray = [500, 300, 100, 50, 10, 5, 0];
  const name = "Значки";
  const goodsId = "19";

  const [mainObject, setMainObject] = useState<any>({
    format: "0",
    number: "1",
});
const [value, setValue] = useState(0); // цена товара - расчитаная
const [description, setDescription] = useState("");

  function payForBasket2() {
    if(window && window.Telegram){
      let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 

      // const mainButton = window.Telegram.WebApp.MainButton;
      // mainButton.text = "Готово";
      // mainButton.enable();
      // mainButton.show();
      // and make it send the "foods" object (as JSON string) back to the backend
      // tg.sendData(JSON.stringify({"dfd": "dfd"}));

      tg.sendData(JSON.stringify({ name: "Значки", value, description }));

      // mainButton.onClick(function(){
      // })
    }
  }

  useEffect(() => {
    if (!mainObject.number) return;
    if (!Number.isInteger(+mainObject.number)) {
        alert("Введите только целое число!");
        return;
    }

    setValue(formatToPrice[mainObject.format][salesArray.findIndex((elem) => +mainObject.number >= elem)] * mainObject.number);

    setDescription(
        `Наименование: ${name}; Цена: ${value} рублей; Формат: ${formatToSize[mainObject.format]}; Кол-во: ${mainObject.number}`
    );
}, [JSON.stringify(mainObject)]); // <- add the count variable here
  return (

        <>
        <h1 style={{fontSize: 50, margin: '4px'}}>Значки</h1>
                        <img src="/icons8-robot-100.png" alt='map' style={{display: "inline-block"}}/>
                        {
                          !value ?
                        <Spin size="large" />
                          :
                        <h1 style={{fontSize: 60, display: "inline-block"}}>{value}</h1>
                        }
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <div>
                            <Typography.Title level={5}>Шаг люверсов**:</Typography.Title>
                            <Select
                                placeholder="Шаг люверсов**:"
                                // style={{ width: 120 }}
                                onChange={(e) =>
                                  setMainObject({
                                      ...mainObject,
                                      format: e,
                                  })
                              }
                              value={mainObject.format}
                                  // value={luversStep}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: '37 mm.' },
                                      { value: '1', label: '56 mm.' },
                                      // { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                  />
                        </div>
                        <div>
                            <Typography.Title level={5}>Кол-во баннеров:</Typography.Title>
                              <Input 
                                placeholder="Шт."
                                value={mainObject.number}
                                onChange={(e) =>
                                    setMainObject({
                                        ...mainObject,
                                        number: e.target.value,
                                    })
                                }
                                style={{ width: '100%' }}
                              />

                        </div>



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
