import { Select } from 'antd';
import React, { useState, useEffect } from 'react';
import { Row, Col, Divider } from 'antd';

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
            <Row gutter={16}>
                <Col className="gutter-row" span={12}>
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
                    <div>Point: {props.commissionValue.point}</div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>Taka: {props.commissionValue.point_in_tk} </div>
                </Col>
                <Col className="gutter-row" span={4}>
                    <div>Type: {props.commissionValue.user_type}</div>
                </Col>
            </Row>

        </> 
    )
}
