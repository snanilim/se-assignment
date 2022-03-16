import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;

const { Option } = Select;

export default function UserSeclect(props) {

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
        // const arrValue = [value]
        props.action(value);
    }
    return (
        <>
            <h2 style={{ left: 40, position: "relative" }}>Select a user</h2>
            <Row gutter={16}>
                <Col className="gutter-row" span={11} offset={1}>
                    <div>
                        <Select style={{ width: 300 }} defaultValue="select" onChange={onChange}>
                            <Option value="select">Select A User</Option>
                            {
                                userValue.map(i => {
                                return <Option value={`${i.id}`}>{i.username}</Option>
                                })
                            }
                        </Select>
                    </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div><h3> Point: <Text type="success">{props.commissionValue.point}</Text></h3></div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div><h3>Taka: <Text type="warning">{props.commissionValue.point_in_tk}</Text> </h3></div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div><h3>Type: <Text type="danger">{props.commissionValue.user_type}</Text></h3></div>
                </Col>
            </Row>

        </> 
    )
}
