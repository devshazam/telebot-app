"use client";

import React, { useContext, useEffect, useState } from "react";

import {
    Select,
    Space,
    Button,
    Steps,
    Spin,
    Flex,
    Form,
    InputNumber,
} from "antd";

// import Col from "react-bootstrap/Col";
// import Form from "react-bootstrap/Form";
// import InputGroup from "react-bootstrap/InputGroup";
// import Row from "react-bootstrap/Row";
// import Image from "react-bootstrap/Image";
// import Container from "react-bootstrap/Container";
// import FloatingLabel from "react-bootstrap/FloatingLabel";

// import SendToBasket from "../../components/basket/SendToBasket";
import Marquee from "react-fast-marquee";

import { fetchPriceOfProduce } from "@/http/jsonAPI";

declare global {
    interface Window {
        Telegram: any;
    }
}

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
    "/file/samokleyki/belaya.jpg",
    "/file/samokleyki/chernaya.jpg",
    "/file/samokleyki/cvetnaya.jpg",
    "/file/samokleyki/dezainerskaya.jpg",
    "/file/samokleyki/fotoluminiscent.jpg",
    "/file/samokleyki/perforirovanaya.jpg",
    "/file/samokleyki/prozrachnaya.jpg",
    "/file/samokleyki/svetootrajaushaya.jpg",
];
const porezkaName = ["Без порезки", "A6", "A5", "A4", "A3", "A2", "A1"]; // фортмат порезки

export default function Stickers() {
    const [value, setValue] = useState(0); // цена товара - расчитаная
    const [width, setWidth] = useState(100); // ширина баннеар
    const [height, setHeight] = useState(100); // высота баннера
    const [description, setDescription] = useState(""); // Телефон
    const [number, setNumber] = useState(1);
    const [vidSamo, setVidSamo] = useState("0");
    const [plastick, setPlastick] = useState("0");
    const [porezka, setPorezka] = useState("0");
    const name = "Cамоклейка";
    const [vidToValue, setVidToValue] = useState(null);
    const [porezkaCoast, setPorezkaCoast] = useState(null);

    const plastickArray = [0, 10000, 5200, 2600, 2200, 1800];
    const plastickArrayFormat = ["Без пластика", "A0", "A1", "A2", "A3", "A4"];

    console.log("vidToValue", vidToValue);
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
        if (!width || !height || !vidToValue || !porezkaCoast) {
            return;
        }
        if (!width || !height || !vidSamo || !number || !porezka) {
            alert("Не все поля заполнены!");
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

        if ( Math.round( (m2 + +number * porezkaCoast[+porezka] + +number * plastickArray[+plastick]) * 100 ) / 100 <= 200 )
            {
                setValue(200);
            } else {
            setValue( Math.round( (m2 + +number * porezkaCoast[+porezka] + +number * plastickArray[+plastick]) * 100 ) / 100 );
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

    const onFinish = (values: any) => {
        // console.log({ name: "Баннер", value, description })
        if (window && window.Telegram) {
            let tg = window.Telegram.WebApp; //получаем объект webapp телеграма
            tg.sendData(JSON.stringify({ name: "Самоклейки", value, description }));
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
                    самоклеек
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
                name="stickers"
                style={{ width: "100%" }}
                layout="vertical"
                autoComplete="off"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item
                    hasFeedback
                    label="Ширина (мм):"
                    name="width"
                    initialValue={width}
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
                        placeholder="Введите ширину в мм"
                        style={{ width: "100%" }}
                        value={width}
                        onChange={(e: any) => {
                            setWidth(e);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    hasFeedback
                    label="Высота (мм):"
                    name="height"
                    initialValue={height}
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
                        placeholder="Введите ширину в мм"
                        style={{ width: "100%" }}
                        value={height}
                        onChange={(e: any) => {
                            setHeight(e);
                        }}
                    />
                </Form.Item>


                <Form.Item
                    hasFeedback
                    label="Вид самоклейки:"
                    name="vidSamo"
                    initialValue={vidSamo}
                    validateFirst
                >
                        <Select
                            // style={{ width: 120 }}
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
                </Form.Item>



                <Form.Item
                    hasFeedback
                    label="Пластик ПВХ (подложка):"
                    name="plastick"
                    initialValue={plastick}
                    validateFirst
                >
                        <Select
                            // style={{ width: 120 }}
                            placeholder="Пластик ПВХ (подложка):"
                            onChange={(e:any) =>
                                setPlastick(e)
                            }
                            value={plastick}
                          style={{ width: '100%' }}
                            options={[
                              { value: '0', label: 'Без пластика ПВХ' },
                              { value: '1', label: 'A0' },
                              { value: '2', label: 'A1' },
                              { value: '3', label: 'A2' },
                              { value: '4', label: 'A3' },
                              { value: '5', label: 'A4' },
                            ]}
                          />
                </Form.Item>
                

                <Form.Item
                    hasFeedback
                    label="Формат порезки:"
                    name="porezka"
                    initialValue={porezka}
                    validateFirst
                >
                        <Select
                            // style={{ width: 120 }}
                            placeholder="Формат порезки:"
                            onChange={(e:any) =>
                                setPorezka(e)
                            }
                            value={porezka}
                          style={{ width: '100%' }}
                            options={[
                              { value: '0', label: 'Без порезки' },
                              { value: '1', label: 'A6' },
                              { value: '2', label: 'A5' },
                              { value: '3', label: 'A4' },
                              { value: '4', label: 'A3' },
                              { value: '5', label: 'A2' },
                              { value: '6', label: 'A1' },
                            ]}
                          />
                </Form.Item>




                <Form.Item
                    hasFeedback
                    label="Кол-во:"
                    name="number"
                    initialValue={number}
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
                        value={number}
                        onChange={(e:any) => setNumber(e) }
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
