"use client"


import React, { useContext, useEffect, useState } from "react";

import { Select, Space,  Button , Steps, Spin, Input, Typography, Slider, Flex, Col, InputNumber, Row, } from 'antd';

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
// import Container from "react-bootstrap/Container";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// import SendToBasket from "../../components/basket/SendToBasket";

import Marquee from 'react-fast-marquee';
import { fetchPriceOfProduce, payForGoods } from "@/http/jsonAPI";
import type { SliderSingleProps } from 'antd';

declare global {
  interface Window {
    Telegram:any;
  }
}

const widthMarks: SliderSingleProps['marks'] = {
  0: '0мм',
  1000: '2',
  2000: '37°C',
  3000: '37°C',
  3200: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};



export default function Home() {

  const[r, setR] = useState(false)


  if(r){

    throw new Error('dfd')
  }
  
  const [value, setValue] = useState(0); // цена товара - расчитаная
  const [description, setDescription] = useState(""); // Телефон

  const [width, setWidth] = useState(1000); // ширина баннеар
  const [height, setHeight] = useState(1000); // высота баннера
  const [number, setNumber] = useState(1); // кол-во баннеров
  const [luversStep, setLuversStep] = useState("0"); // Телефон
  const [glue, setGlue] = useState("0");
  const [density, setDensity] = useState("0"); // плотность баннера
  const [perfo, setPerfo] = useState(0); // перфорация

  const [coastOfBanner, setCoastOfBanner] = useState(null);
  const [coastOfluvers, setCoastOfluvers] = useState(0);
  const [coastOfGlue, setCoastOfGlue] = useState(0);

  const glueArray = ["без проклейки", "с проклейкой"];
  const luversStepArray = [0, 200, 300, 400, 500]; //
  const densityArray = ["400-440", "500"];


  function payForBasket2() {
    

    if(window && window.Telegram){
      let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 

      tg.sendData(JSON.stringify({ name: "Баннер", value, description }));

      // mainButton.onClick(function(){
      // })
    }
  }

  useEffect(() => {
    fetchPriceOfProduce({ jsonId: 34 })
        .then((data) => {
            setCoastOfBanner(JSON.parse(data.value)[0]);
            setCoastOfluvers(JSON.parse(data.value)[1]);
            setCoastOfGlue(JSON.parse(data.value)[2]);
        })
        .catch((error) => {
            console.log("jack", error);
        });
  }, []);

console.log(density, typeof density)



useEffect(() => {
  if(!coastOfBanner || !coastOfluvers || !coastOfGlue){return;}

    let midNum = (width * height * number) / 1000000;
    let midNum2 = 0;
    if (midNum < 1) {
        midNum2 = midNum * coastOfBanner[0][+density];
    } else if (midNum >= 1 && midNum < 5) {
        midNum2 = midNum * coastOfBanner[1][+density];
    } else if (midNum >= 5 && midNum < 10) {
        midNum2 = midNum * coastOfBanner[2][+density];
    } else if (midNum >= 10 && midNum < 50) {
        midNum2 = midNum * coastOfBanner[3][+density];
    } else if (midNum >= 50 && midNum < 100) {
        midNum2 = midNum * coastOfBanner[4][+density];
    } else if (midNum >= 100 && midNum < 500) {
        midNum2 = midNum * coastOfBanner[5][+density];
    } else if (midNum >= 500) {
        midNum2 = midNum * coastOfBanner[6][+density];
    }

    let midluversStep = 0; // стоимость
    if (luversStep !== "0") {
        midluversStep =
            Math.round(
                ((width + height) * number * 2) /
                    luversStepArray[+luversStep]
            ) * coastOfluvers; /// цена люверса
    }
    let midglue = 0; // проклейка
    if (glue === "1") {
        midglue = Math.ceil(
            (((width + height) * number * 2) / 1000) * coastOfGlue // цена проклейки за 1 мерт
        );
    }

  
    if (
        Math.round((midNum2 + midluversStep + midglue + (perfo && perfo * 15)) * 100) / 100 <=
        200
    ) {
        setValue(200);
    } else {
        setValue(
            Math.round((midNum2 + midluversStep + midglue + (perfo && perfo * 15)) * 100) / 100
        );
    }

    setDescription(
        `Товар: Баннер; Цена: ${value} рублей; Ширина: ${width} мм; Высота: ${height} мм; Плотность: ${
            densityArray[+density]
        } грамм; Шаг люверсов: ${
            luversStepArray[+luversStep]
        } мм; Проклейка: ${glueArray[+glue]}; Перфорация: ${perfo} шт; Кол-во: ${number} шт;`
    );
}, [width, density, height, luversStep, number, glue, value, perfo, coastOfBanner, coastOfluvers, coastOfGlue]); // <- add the count variable here


  return (

        <>
 <h1 onClick={()=>setR(true)}>dkfdjfhfjhhj</h1>
        <Marquee pauseOnHover gradient={false}>
        <h1 style={{fontSize: 25, margin: '4px', textTransform: 'uppercase'}}>расчет <span style={{color:"#37a700"}}>цены</span> баннера</h1>
      </Marquee>
                      <Space direction="vertical" style={{ width: '100%' }}>
                      <Flex  justify={'center'} align={'center'} style={{marginTop:'30px', marginBottom:'30px'}} vertical>
                          {
                            !value
                              ?
                            <Spin size="large" />
                              :
                              <>
                            <h1 style={{fontSize: 60}}>{value}</h1>
                            <p style={{fontSize: 18}}>рублей</p></>
                          }


                      </Flex>

                      <div>
                        <Typography.Title level={5}>Ширина (мм):</Typography.Title>
                        <Row>
                          <Col span={17}>
                            <Slider
                              min={200}
                              max={3200}
                              onChange={(e:any) => {setWidth(e)}}
                              defaultValue={width}
                            />
                          </Col>
                          <Col span={4}>
                            <InputNumber
                              min={200}
                              max={3200}
                              style={{ margin: '0 16px' }}
                              value={width}
                              onChange={(e:any) => {setWidth(e)}}
                            />
                          </Col>
                        </Row>
                      </div>

                      <div>
                        <Typography.Title level={5}>Высота (мм):</Typography.Title>
                        <Row>
                          <Col span={17}>
                            <Slider
                              min={200}
                              max={10000}
                              onChange={(e:any) => {setHeight(e)}}
                              defaultValue={height}
                            />
                          </Col>
                          <Col span={4}>
                            <InputNumber
                              min={200}
                              max={10000}
                              style={{ margin: '0 16px' }}
                              value={height}
                              onChange={(e:any) => {setHeight(e)}}
                            />
                          </Col>
                        </Row>
                      </div>


                      <div>
                        <Typography.Title level={5}>Кол-во баннеров:</Typography.Title>
                        <Row>
                          <Col span={17}>
                            <Slider
                              min={1}
                              max={10}
                              onChange={(e:any) => {setNumber(e)}}
                              defaultValue={number}
                            />
                          </Col>
                          <Col span={4}>
                            <InputNumber
                              min={1}
                              max={10}
                              style={{ margin: '0 16px' }}
                              value={number}
                              onChange={(e:any) => {setNumber(e)}}
                            />
                          </Col>
                        </Row>
                      </div>







                        <div>
                        <Typography.Title level={5}>Плотность (грамм):</Typography.Title>
                            <Select
                          placeholder="Плотность:"
                          value={density}
                          // style={{ width: 120 }}
                          onChange={(e:any) =>
                            setDensity(e)
                              }
                              style={{ width: '100%' }}
                                options={[
                                  { value: '0', label: 'Стандартная (400-440 гр./мерт)' },
                                  { value: '1', label: 'Уплотненная (500 гр./мерт)' },
                                  // { value: 'disabled', label: 'Disabled', disabled: true },
                                ]}
                                />
                          </div>
                        <div>
                            <Typography.Title level={5}>Шаг люверсов*:</Typography.Title>
                            <Select
                                placeholder="Шаг люверсов**:"
                                // style={{ width: 120 }}
                                value={luversStep}  
                                onChange={(e:any) =>
                                      setLuversStep(e)
                                  }
                                  // value={luversStep}
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: 'Без люверсов' },
                                      { value: '1', label: '200 миллиметров' },
                                      { value: '2', label: '300 миллиметров' },
                                      { value: '3', label: '400 миллиметров' },
                                      { value: '4', label: '500 миллиметров' },
                                      // { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                  />
                        </div>
                        <div>
                            <Typography.Title level={5}>Проклейка**:</Typography.Title>
                            <Select
                                    placeholder="Проклейка:"
                                    // style={{ width: 120 }}
                                    value={glue}
                                    onChange={(e:any) =>
                                      setGlue(e)
                                  }
                                    style={{ width: '100%' }}
                                    options={[
                                      { value: '0', label: 'Без проклейки' },
                                      { value: '1', label: 'Проклейка по периметру' },
                                      // { value: 'disabled', label: 'Disabled', disabled: true },
                                    ]}
                                  />

                        </div>


                        <div>
                        <Typography.Title level={5}>Перфорация***:</Typography.Title>
                        <Row>
                          <Col span={17}>
                            <Slider
                              min={0}
                              max={100}
                              onChange={(e:any) => {setPerfo(e)}}
                              defaultValue={perfo}
                            />
                          </Col>
                          <Col span={4}>
                            <InputNumber
                              min={0}
                              max={100}
                              style={{ margin: '0 16px' }}
                              value={perfo}
                              onChange={(e:any) => {setPerfo(e)}}
                            />
                          </Col>
                        </Row>
                      </div>



                                  <Button type="primary" block  onClick={payForBasket2}>
                                      Заказать
                                    </Button>
      <p style={{fontSize:'12px'}}>* Расстояние между люверсами (люверс - это металл. кольцо для монтажа баннера).<br/>
      ** Проклейка нужна для усиления баннера против ветра.<br/>
      *** Перфорация это отверстия в баннере для уменьшения сопративления ветру.</p>
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
