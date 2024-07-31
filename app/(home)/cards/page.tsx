"use client"


import React, { useContext, useEffect, useState } from "react";

import { Select, Space,  Button , Steps, Spin, Flex, Form} from 'antd';

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

export default function Home() {

  const [vizit, setVizit] = useState([]);
  const [value, setValue] = useState(0);
  const [side, setSide] = useState("0");
  const [vid, setVid] = useState("0");
  const [lam, setLam] = useState("0");
  const [num, setNum] = useState("0");
  const [description, setDescription] = useState(""); // Телефон
  const name = "Визитки";
  const vizSize = ["односторонние", "двусторонние"];
  const vizVid = ["матовая", "глянцевая", "дизайнерская"];
  const vizLam = ["без ламинации", "глянцевая", "матовая"];
  const vizNum = ["96", "200", "500", "1000"];
  // console.log(vizit);


  const onFinish = (values: any) => {
    // console.log({ name: "Баннер", value, description })
      if (window && window.Telegram) {
          let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
          tg.sendData(JSON.stringify({ name: "Визитки", value, description }));
      }
  };

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
      setValue(+vizit[+side][+vid][+lam][+num]);
      setDescription(
          `Наименование: ${name}; Цена: ${value} рублей; Кол-во сторон печати: ${
              vizSize[+side]
          }; Бумага: ${vizVid[+vid]}; Ламинация: ${vizLam[+lam]}; Кол-во: ${
              vizNum[+num]
          };`
      );
  }, [value, side, num, lam, vid, vizit]); // <- add the count variable here





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
                    визитки
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
                    label="Стороны печати:"
                    name="side"
                    initialValue={side}
                    validateFirst
                >
                        <Select
                            // style={{ width: 120 }}
                            placeholder="Стороны печати:"
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
                </Form.Item>
                <Form.Item
                    hasFeedback
                    label="Бумага:"
                    name="vid"
                    initialValue={vid}
                    validateFirst
                >
                    <Select
                            // style={{ width: 120 }}
                            placeholder="Бумага:"
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
                </Form.Item>



                <Form.Item
                    hasFeedback
                    label="Ламинация:"
                    name="lam"
                    initialValue={lam}
                    validateFirst
                >
                      <Select
                              placeholder="Ламинация:"
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
                </Form.Item>



                <Form.Item
                    hasFeedback
                    label="Кол-во:"
                    name="num"
                    initialValue={num}
                    validateFirst
                >
                    <Select
                        placeholder="Кол-во:"
                        // style={{ width: 120 }}
                        onChange={(e:any) => setNum(e)}
                                    value={num}
                        style={{ width: "100%" }}
                        options={[
                          { value: '0', label: '96' },
                          { value: '1', label: '200' },
                          { value: '2', label: '500' },
                          { value: '3', label: '1000' },
                          // { value: 'disabled', label: 'Disabled', disabled: true },
                        ]}
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
