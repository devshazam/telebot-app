"use client"
import React , {useEffect, useState} from 'react';
import {Flex, Col, Row } from 'antd';
import Script from 'next/script';
import Link from 'next/link';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
 
      let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
      // tg.expand();
      setUser([tg.initDataUnsafe?.user?.first_name, tg.initDataUnsafe?.user?.last_name, tg.initDataUnsafe?.user?.id])

  }, [])
    const boxStyle: any = {
      width: '100%',
      height: 220,
      borderRadius: 6,
      border: '1px solid #63b03e',
      fontSize: 24,
    };
    const statStyle = {display: "inline-block", fontSize: 18, padding: 4, marginTop: 10, ...(user && user[2] ? {backgroundColor: "green"} : {backgroundColor: "red"})}
  return (


        <>
 

      <Row  gutter={[16, 16]}>
      
          <Col span={12}>
            <Link href='/banner'>
              <Flex style={boxStyle} vertical align={'center'} justify='space-around'>
                <img src='/icons8-banner-100.png'></img>
                <p>Баннеры</p>

              </Flex>
            </Link>
          </Col>
          <Col span={12}>
          <Link href='/cards'>
            <Flex style={boxStyle} vertical align={'center'} justify='space-around'>
              <img src='/icons8-business-cards-100.png'></img>
              <p>Визитки</p>

            </Flex>
            </Link>
          </Col>
          <Col span={12}>
            <a href='/stickers'>
            <Flex style={boxStyle} vertical align={'center'} justify='space-around'>
              <img src='/icons8-stickers-100.png'></img>
              <p>Самоклейки</p>

            </Flex>
            </a>
          </Col>
          <Col span={12}>
            <a href='/badge'>
            <Flex style={boxStyle} vertical align={'center'} justify='space-around'>
              <img src='/icons8-badge-100.png'></img>
              <p>Значки</p>

            </Flex>
            </a>
          </Col>
          {/* <Col span={12}>
            <a href='/canvas'>
            <Flex style={boxStyle} vertical align={'center'} justify='space-around'>
              <img src='/icons8-canvas-100.png'></img>
              <p>Холсты</p>

            </Flex>
            </a>
          </Col>
          <Col span={12}>
            <a href='/photo'>
            <Flex style={boxStyle} vertical align={'center'} justify='space-around'>
              <img src='/icons8-photo-100.png'></img>
              <p>Фотографии</p>

            </Flex>
            </a>
          </Col> */}
      </Row>
      <p style={statStyle}>Статус: {user  && user[2]? "Оплата доступна" : "Оплата не доступна"}</p>



        </>
  );
}
