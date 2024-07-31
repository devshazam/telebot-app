"use client"
import React, { useContext, useEffect, useState } from "react";
// import Container from '@mui/material/Container';
// import { ThemeProvider, createTheme } from '@mui/material/styles';

// import Contacts from "./ui/Contacts"
import { Breadcrumb, Layout, Menu, theme,   Row, Col, List, Spin, Avatar, Image, Flex } from 'antd';
const { Header, Content, Footer } = Layout;
// import { YMInitializer } from 'react-yandex-metrika';


export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  const [user, setUser] = useState<any>(null);
  const [flag, setFlag] = useState<any>(true);
  const [flags, setFlags] = useState<any>(0);
  useEffect(() => {
    if(window && window.Telegram){
      let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 
      // tg.expand();
      setUser([tg.initDataUnsafe?.user?.first_name, tg.initDataUnsafe?.user?.last_name, tg.initDataUnsafe?.user?.id])
      setFlag(false)
    }else{
      setFlags(flags + 1)
    }
    
  }, [flags])


  if(flag){
    return (
      <Flex  justify={'center'} align={'center'} style={{width: '100%', height:'100vh'}}>
        <Spin size="large" />

      </Flex>
    )
  }


  return (
<>
         <Layout>
          <div className="lg:w-4/5 lg:m-auto">
      {/* <Header style={{ display: 'flex', alignItems: 'center', height: 'auto' }}>
      </Header> */}
      <Content>


        {/* <Image src="/logo.png"  style={{ margin: '16px 0', width: '200px' }}/> */}
        <div
          style={{
            background: colorBgContainer,
            minHeight: '100vh',
            padding: 24,
            borderRadius: borderRadiusLG,
            // marginTop: 50
          }}
        >
            
            {children}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>

      </Footer>
      </div>
    </Layout>
      {/* <Contacts /> */}
          </>


  );
}
