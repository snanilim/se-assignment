import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Row, Col, Divider, Card } from 'antd';
import HomeLayout from '../Layout/HomeLayout.js'
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;
const { Title } = Typography;

const { Option } = Select;
const initialPosts = {point: "", point_in_tk:"", user_type: ""}
export default function CheckHistory(props) {
    const [commissionValue, setCommissionValue] = useState({point: "", point_in_tk:"", user_type: ""})
    const [transValue, setTransValue] = useState([initialPosts])
    const [userValue, setUserValue] = useState([{id: "0", name: "all"}])
    
    useEffect( ()  => {
        async function fetchMyAPI() {
            console.log("call letter")
            const res = await fetch(`http://localhost:3000/api/user/all-user`)
            const allUser = await res.json()
            console.log("allUser", allUser)

            setUserValue(
                allUser.data
            )
        }
        fetchMyAPI()
    }, []);

    const onChange = async (value) => {
        if (value == "select"){
            setCommissionValue(
                commissionValue = {point: "", point_in_tk:"", user_type: ""}
            )
          }else{
            const res = await fetch(`http://localhost:3000/api/commission/${value}`)
            const allUser = await res.json()
            console.log("allUser", allUser)
            setCommissionValue(commissionValue = allUser.data)

            const res2 = await fetch(`http://localhost:3000/api/trans/${value}`)
            const allTrans = await res2.json()
            console.log("allTrans", allTrans.data)
            setTransValue(transValue=allTrans.data)
          }
    }

    return (
        <HomeLayout>
        <Card style={{ minHeight: '100vh' }}>
            <Title style={{ textAlign: 'center', marginBottom: "40px", marginTop: "40px"  }} level={2}>Check User Commission</Title>
            <Row gutter={16}>
                <Col className="gutter-row" span={24}>
                    <div style={{ width: 500, margin: "0 auto" }}>
                        <Select style={{ width: 500, margin: "0 auto" }} defaultValue="select" onChange={onChange}>
                            <Option value="select">Select A User</Option>
                            {
                                userValue.map(i => {
                                return <Option value={`${i.id}`}>{i.username}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Col>
            </Row>

            <Row style={{ marginTop: "50px" }} gutter={16}>
                <Col className="gutter-row" span={6} offset={6}>
                <Title style={{ marginBottom: "20px", marginTop: "20px"  }} level={4}>User Commission</Title>
                    <Card>
                        <div>Total Order: {transValue.length}</div>
                        <div>Total Point: {commissionValue.point}</div>
                        <div>Total Taka: {commissionValue.point_in_tk} </div>
                        <div>User Type: {commissionValue.user_type}</div>
                    </Card>
                </Col>
                <Col className="gutter-row" span={6}>
                <Title style={{ marginBottom: "20px", marginTop: "20px"  }} level={4}>Product History </Title>
                    {
                        transValue.map(i => {
                            return <Card style={{ marginBottom: "20px" }}>
                                <div>Date: {i.createdAt}</div>
                                <div>Point ratio: {i.point_ratio}</div>
                                <div>Point in tk ratio: {i.point_in_tk_ratio} </div>
                                <div>Amount: {i.amount} </div>
                                <Divider />
                                <div>Total Point: {(i.amount / 100) * i.point_ratio} </div>
                                <div>Total Taka: {((i.amount / 100) * i.point_ratio) * i.point_in_tk_ratio} </div>
                            </Card>
                        })
                    }
                </Col>
            </Row>

        </Card>
        </HomeLayout>
    )
}
