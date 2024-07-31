"use client"


import React, { useContext, useEffect, useState } from "react";

import { Select, Space,  Button , Steps, Spin, Flex, Form, InputNumber} from 'antd';

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
// import Container from "react-bootstrap/Container";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// import SendToBasket from "../../components/basket/SendToBasket";
import Marquee from "react-fast-marquee";

import { fetchPriceOfProduce, payForGoods } from "@/http/jsonAPI";

declare global {
  interface Window {
    Telegram:any;
  }
}

const formatToImage = ['1.jpg', '2.jpg'];
const formatToSize = ['37 mm', '56 mm'];
const formatToPrice = [[45, 50, 55, 60, 65, 70, 80], [55, 60, 65, 70, 75, 80, 90]];
const salesArray = [500, 300, 100, 50, 10, 5, 0];
const name = "Значки";
const goodsId = "19";

export default function Badge() {

    const [mainObject, setMainObject] = useState<any>({
        format: "0",
        number: 1,
    });
    const [value, setValue] = useState(0); // цена товара - расчитаная
    const [description, setDescription] = useState("");


    useEffect(() => {
        if (!mainObject.number) return;
        if (!Number.isInteger(+mainObject.number)) {
            alert("Введите только целое число!");
            return;
        }

        setValue(formatToPrice[+mainObject.format][salesArray.findIndex((elem) => +mainObject.number >= elem)] * mainObject.number);

        setDescription(
            `Наименование: ${name}; Цена: ${value} рублей; Формат: ${formatToSize[mainObject.format]}; Кол-во: ${mainObject.number}`
        );
    }, [JSON.stringify(mainObject)]); // <- add the count variable here


  const onFinish = (values: any) => {
    // console.log({ name: "Баннер", value, description })
      if (window && window.Telegram) {
          let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
          tg.sendData(JSON.stringify({ name: "Значки", value, description }));
      }
  };

  return (

        <>

                      <Marquee pauseOnHover gradient={false}>
                <h1
                    style={{
                        fontSize: 25,
                        margin: "4px",
                        textTransform: "uppercase",
                    }}
                >
                    расчет <span style={{ color: "#37a700" }}>цены</span>{" "}
                    Значков
                </h1>
            </Marquee>

            <Flex
                justify={"center"}
                align={"center"}
                style={{ marginTop: "30px", marginBottom: "30px", height: 120 }}
                vertical
            >
                {!value ? (
                    <Spin size="large" />
                ) : (
                    <>
                        <h1 style={{ fontSize: 60 }}>{value}</h1>
                        <p style={{ fontSize: 18 }}>рублей</p>
                    </>
                )}
            </Flex>



            <Form
                name="trigger"
                style={{ width: "100%" }}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
                scrollToFirstError
            >





                <Form.Item
                    hasFeedback
                    label="Формат:"
                    name="format"
                    initialValue={mainObject.format}
                    validateFirst
                >
                        <Select
                            // style={{ width: 120 }}
                            placeholder="Стороны печати:"
                          style={{ width: '100%' }}
                          onChange={(e) =>
                            setMainObject({
                                ...mainObject,
                                format: e,
                            })
                        }
                        value={mainObject.format}
                            options={[
                              { value: '0', label: '37 mm.' },
                              { value: '1', label: '56 mm.' },
                              // { value: 'disabled', label: 'Disabled', disabled: true },
                            ]}
                          />
                </Form.Item>

                <Form.Item
                    hasFeedback
                    label="Кол-во:"
                    name="number"
                    initialValue={mainObject.number}
                    validateFirst
                    rules={[
                        {
                            required: true,
                            message: "Это обязательное поле!",
                        },
                        {
                            type: "integer",
                            message: "Это поле должно быть целым числом",
                        },
                    ]}
                >
                    <InputNumber
                        style={{ width: "100%" }}
                        placeholder="Шт."
                        value={mainObject.number}
                        onChange={(e) =>
                            setMainObject({
                                ...mainObject,
                                number: e,
                            })
                        }
                    />
                </Form.Item>



                  <Button
                    type="primary"
                    block
                    // onClick={payForBasket2}
                    htmlType="submit"
                >
                    Заказать
                </Button>
            </Form>



      <p>* Все цены действуют только в Телеграм!</p>

        </>
  );
}
