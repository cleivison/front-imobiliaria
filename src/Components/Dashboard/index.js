import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import 'antd/es/layout/style/css';
import 'antd/es/icon/style/css';
import 'antd/es/menu/style/css';
import './dashboard.css';

import logo2 from '../../Icon/logo2.png';

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function Dashboard(props){
  const [collapsed, setCollapsed] = useState(false);
  const [openSub, setOpenSub] = useState([]);
  const history = useHistory();
  const { pathname } = history.location;
  const currentSubMenu = pathname.replace('/dashboard','').replace('/','').replace('/cadastrar','');
  const toggle = () => {
    setCollapsed(
      !collapsed
    );
    setOpenSub([]);
  }; 
    return (
      <Layout id="components-layout-demo-custom-trigger" style={{minHeight: '100vh'}}>
        <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0}>
          <div className="logo" onClick={() => {history.push('/')}}>
            <img src={logo2} width="130" height="28" alt="Logo"/>
          </div>
          <Menu theme="dark" mode="inline" openKeys={collapsed?openSub:[...openSub, currentSubMenu]} selectedKeys={[pathname]} 
          onSelect={(item) => {
            if(item.key === '/login'){
              localStorage.clear();
            }
            history.replace(item.key);
          }}
          onOpenChange={(item) => {
            setOpenSub(item);
          }}
          >
            <Menu.Item key="/dashboard">
              <Icon type="area-chart" />
              <span>Home</span>
            </Menu.Item>
            <SubMenu
              key="imoveis"
              title={
                <span>
                  <Icon type="home" theme="filled" />
                  <span>Imóveis</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/imoveis">
                <Icon type="unordered-list" />
                <span>Listar</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/imoveis/cadastrar">
                <Icon type="file-add" theme="filled" />
                <span>Cadastrar</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="tipoimovel"
              title={
                <span>
                  <Icon type="tags" theme="filled" />
                  <span>Tipos de imóvel</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/tipoimovel">
                <Icon type="unordered-list" />
                <span>Listar</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/tipoimovel/cadastrar">
                <Icon type="file-add" theme="filled" />
                <span>Cadastrar</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="proprietarios"
              title={
                <span>
                  <Icon type="team" />
                  <span>Proprietários</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/proprietarios">
                <Icon type="unordered-list" />
                <span>Listar</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/proprietarios/cadastrar">
                <Icon type="file-add" theme="filled" />
                <span>Cadastrar</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="inquilinos"
              title={
                <span>
                  <Icon type="team" />
                  <span>Inquilinos</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/inquilinos">
                <Icon type="unordered-list" />
                <span>Listar</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/inquilinos/cadastrar">
                <Icon type="file-add" theme="filled" />
                <span>Cadastrar</span>
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="contratoimovel"
              title={
                <span>
                  <Icon type="team" />
                  <span>Contrato Imovel</span>
                </span>
              }
            >
              <Menu.Item key="/dashboard/contratoimovel">
                <Icon type="unordered-list" />
                <span>Listar</span>
              </Menu.Item>
              <Menu.Item key="/dashboard/contratoimovel/cadastrar">
                <Icon type="file-add" theme="filled" />
                <span>Cadastrar</span>
              </Menu.Item>
            </SubMenu>
            <Menu.Item key="/login">
              <Icon type="poweroff" />
              <span>Logout</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
export default Dashboard;
