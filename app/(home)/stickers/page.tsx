"use client"


import React, { useContext, useEffect, useState } from "react";

import { Select, Space,  Button , Steps, Spin, Typography, Input} from 'antd';

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
  // const { user, device } = useContext(Context);
  const [value, setValue] = useState(0); // цена товара - расчитаная
  const [width, setWidth] = useState(""); // ширина баннеар
  const [height, setHeight] = useState(""); // высота баннера
  const [description, setDescription] = useState(""); // Телефон
  const [vidSamo, setVidSamo] = useState("0");
  const [number, setNumber] = useState("1");
  const [plastick, setPlastick] = useState("0");
  const [porezka, setPorezka] = useState("0");
  const name = "Cамоклейка";
  const goodsId = "0";
  const [vidToValue, setVidToValue] = useState([]);
  const [porezkaCoast, setPorezkaCoast] = useState([]);

  const plastickArray = [0, 10000, 5200, 2600, 2200, 1800];
  const plastickArrayFormat = ['Без пластика', 'A0', 'A1', 'A2', 'A3', 'A4'];

  const vidToName = [
      "белая",
      "черная",
      "цветная",
      "дизайнерская",
      "фотолюминесцентная",
      "перфорированная",
      "прозрачная",
      "светоотражающая",
  ];
  const vidToHref = [
      "/samokleyki/belaya.jpg",
      "/samokleyki/chernaya.jpg",
      "/samokleyki/cvetnaya.jpg",
      "/samokleyki/dezainerskaya.jpg",
      "/samokleyki/fotoluminiscent.jpg",
      "/samokleyki/perforirovanaya.jpg",
      "/samokleyki/prozrachnaya.jpg",
      "/samokleyki/svetootrajaushaya.jpg",
  ];
  const porezkaName = ["Без порезки", "A6", "A5", "A4", "A3", "A2", "A1"]; // фортмат порезки
  console.log(porezkaCoast);

  function payForBasket2() {
    if(window && window.Telegram){
      let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 

      // const mainButton = window.Telegram.WebApp.MainButton;
      // mainButton.text = "Готово";
      // mainButton.enable();
      // mainButton.show();
      // and make it send the "foods" object (as JSON string) back to the backend
      // tg.sendData(JSON.stringify({"dfd": "dfd"}));

      tg.sendData(JSON.stringify({ name: "Cамоклейка", value, description }));

      // mainButton.onClick(function(){
      // })


    }

  }

  useEffect(() => {
    fetchPriceOfProduce({ jsonId: 3 })
        .then((data) => {
            setVidToValue(JSON.parse(data.value)[0]);
            setPorezkaCoast(JSON.parse(data.value)[1]);
        })
        .catch((error) => {
            if (error.response.data) {
                alert(
                    `${error.response.data.message}${error.response.status}`
                );
            } else {
                console.log("dev", error);
                alert("Ошибка 152 - Обратитесь к администратору!");
            }
        });
}, []);

useEffect(() => {
    if (!width || !height) {
        return;
    }
    if (!width || !height || !vidSamo || !number || !porezka) {
        alert("Не все поля заполнены!");
        return;
    }
    if (width.split("").length > 200 || height.split("").length > 200) {
        alert("Не более 20 симолов!");
        return;
    }
    if (
        !Number.isInteger(+width) ||
        !Number.isInteger(+height) ||
        !Number.isInteger(+number)
    ) {
        alert("Введите только целое число!");
        return;
    }

    let m1 = (Number(width) * Number(height) * Number(number)) / 1000000; // кол-во кв. метров всего
    let m2 = 0;
    if (m1 < 1) {
        m2 = m1 * vidToValue[+vidSamo][0];
    } else if (m1 >= 1 && m1 < 5) {
        m2 = m1 * vidToValue[+vidSamo][1];
    } else if (m1 >= 5 && m1 < 10) {
        m2 = m1 * vidToValue[+vidSamo][2];
    } else if (m1 >= 10) {
        m2 = m1 * vidToValue[+vidSamo][3];
    }

    if (
        Math.round(
            (m2 +
                +number * porezkaCoast[+porezka] +
                +number * plastickArray[+plastick]) *
                100
        ) /
            100 <=
        200
    ) {
        setValue(200);
    } else {
        setValue(
            Math.round(
                (m2 +
                    +number * porezkaCoast[+porezka] +
                    +number * plastickArray[+plastick]) *
                    100
            ) / 100
        );
    }

    setDescription(
        `Наименование: ${name}; Вид самоклейки: ${
            vidToName[+vidSamo]
        }; Цена: ${value} рублей; Ширина: ${width} мм; Высота: ${height} мм; Кол-во: ${number}; Порезка: ${
            porezkaName[+porezka]
        }; Пластик ПВХ: ${plastickArrayFormat[+plastick]}`
    );
}, [
    width,
    height,
    vidSamo,
    number,
    porezka,
    value,
    vidToValue,
    porezkaCoast,
    plastick,
]);

  return (

        <>
        <h1 style={{fontSize: 50, margin: '4px'}}>Самоклейки</h1>
                        <img src="/icons8-robot-100.png" alt='map' style={{display: "inline-block"}}/>
                        {
                          !value ?
                        <Spin size="large" />
                          :
                        <h1 style={{fontSize: 60, display: "inline-block"}}>{value}</h1>
                        }
                      <Space direction="vertical" style={{ width: '100%' }}>


                      <div>
                          <Typography.Title level={5}>Ширина (мм):</Typography.Title>
                          <Input 
                          placeholder="Ширина (мм):"
                          value={width}
                          onChange={(e:any) =>
                              setWidth(e.target.value)
                          }
                          style={{ width: '100%' }}
                          />
                      </div>
                      <div>
                          <Typography.Title level={5}>Высота (мм):</Typography.Title>
                        <Input 
                          placeholder="Высота (мм):"
                          value={height}
                          onChange={(e:any) =>
                            setHeight(e.target.value)
                          }
                          style={{ width: '100%' }}
                          />
                        </div>
                        <div>
                        <Typography.Title level={5}>Вид самоклейки:</Typography.Title>
                            <Select
                          placeholder="Вид самоклейки:"
                           onChange={(e:any) =>
                                    setVidSamo(e)
                                }
                                value={vidSamo}
                              style={{ width: '100%' }}
                                options={[
                                  { value: '0', label: 'Белая' },
                                  { value: '1', label: 'Черная' },
                                  { value: '2', label: 'Цветная' },
                                  { value: '3', label: 'Дизайнерская' },
                                  { value: '4', label: 'Фотолюминесцентная' },
                                  { value: '5', label: 'Перфорированная' },
                                  { value: '6', label: 'Прозрачная' },
                                  { value: '7', label: 'Светоотражающая' },
                                ]}
                                />
                          </div>
                        <div>
                            <Typography.Title level={5}>Пластик ПВХ (подложка):</Typography.Title>
                            <Select
                                placeholder="Пластик ПВХ (подложка):"
                                // style={{ width: 120 }}
                                onChange={(e) =>
                                  setPlastick(e)
                              }
                              value={plastick}
                                  // value={luversStep}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: 'Без пластика ПВХ' },
                                      { value: '1', label: 'А0' },
                                      { value: '2', label: 'А1' },
                                      { value: '3', label: 'А2' },
                                      { value: '4', label: 'А3' },
                                      { value: '5', label: 'А4' },
                                    ]}
                                  />
                        </div>
           

                        <div>
                            <Typography.Title level={5}>Кол-во самоклеек:</Typography.Title>
                              <Input 
                                placeholder="Кол-во самоклеек:"
                                value={number}
                                        onChange={(e) =>
                                            setNumber(e.target.value)
                                        }
                                style={{ width: '100%' }}
                              />

                        </div>

                        <div>
                            <Typography.Title level={5}>Формат порезки:</Typography.Title>
                            <Select
                                placeholder="Формат порезки:"
                                // style={{ width: 120 }}
                                onChange={(e) =>
                                  setPlastick(e)
                              }
                              value={plastick}
                                  // value={luversStep}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: 'Без пластика ПВХ' },
                                      { value: '1', label: 'А0' },
                                      { value: '2', label: 'А1' },
                                      { value: '3', label: 'А2' },
                                      { value: '4', label: 'А3' },
                                      { value: '5', label: 'А4' },
                                    ]}
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
