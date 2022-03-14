import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import Link from 'next/link'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const HomeLayout = ({ header, children }) => {

    // onCollapse = collapsed => {
    //     console.log(collapsed);
    //     this.setState({ collapsed });
    //   };

    return (
        <Layout style={{ minHeight: '100vh', background: "#fff" }}>
            {/* <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}> */}
            <Sider style={{ background: "#fff" }}>
            <div style={{ textAlign: 'center', marginBottom: 20, marginTop: 10 }} className="logo">
                <img style={{ width: 50, textAlign: 'center' }} src="/a-letter-logo-png-6.png" />
            </div>
            <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                    <Link href={`/`}>
                        Home
                    </Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<DesktopOutlined />}>
                    <Link href={`/setting`}>
                        Settings
                    </Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                    <Link href={`/user`}>
                        User
                    </Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<DesktopOutlined />}>
                    <Link href={`/user`}>
                        History
                    </Link>
                </Menu.Item>
            </Menu>
            </Sider>
            <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>User</Breadcrumb.Item>
                <Breadcrumb.Item>Bill</Breadcrumb.Item>
                </Breadcrumb> */}
                <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                {children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Assignment</Footer>
            </Layout>
        </Layout>
    )
}

export default HomeLayout
