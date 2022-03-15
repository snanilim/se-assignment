import { Select } from 'antd';
import React, { useState, useEffect } from 'react';

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
    const onChange = (value) => {
        console.log("value", value)
        const arrValue = [value]
        props.action({ category: arrValue });
    }
    return (
        <>
            <Select style={{ width: 300 }} defaultValue="select">
                <Option value="select">Select A User</Option>
                {
                    userValue.map(i => {
                    return <Option value={`${i.username}`}>{i.username}</Option>
                    })
                }
            </Select>
        </> 
    )
}
