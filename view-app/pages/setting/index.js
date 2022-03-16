import HomeLayout from '../../Layout/HomeLayout.js'
import { Card, Avatar } from 'antd';
import { Input, InputNumber, Divider } from 'antd';
import { SetStateAction, useState } from 'react'
import { Button, Radio } from 'antd';
import { Typography, Space } from 'antd';

const { Text, Link } = Typography;
const { Title } = Typography;

export default function Settings({ initialPosts, oneItem }) {
  const [fieldstate, setFieldState] = useState(initialPosts);

  const onsubmit = async () => {
    console.log("fieldstate", fieldstate)

    let newObj = {}
    newObj.point_ratio = fieldstate.point_ratio
    newObj.point_in_tk_ratio = fieldstate.point_in_tk_ratio
    newObj.silver = fieldstate.silver
    newObj.gold = fieldstate.gold
    newObj.platinum = fieldstate.platinum

    const data = JSON.stringify(newObj)
    const url = `http://localhost:3000/api/settings/add`;
    const headers = {
      'Content-Type': 'application/json'
    };
    const response = await fetch(url, { method: 'POST', body:data, headers });
    const resData = await response.json();
    console.log("resData", resData)
    alert("Settings Update Successfully")
  }

  return (
    <HomeLayout>
      <Card style={{ padding: 50 }}>
        <Title style={{ textAlign: 'center', marginBottom: "40px"  }} level={2}>Configure your Settings</Title>
        <div style={{ width:500, margin: "0 auto" }}>
          <Divider orientation="left"><Text strong>Point Ratio</Text></Divider>
          <InputNumber 
          defaultValue={fieldstate.point_ratio} 
          style={{ width: '100%', marginBottom: "10px" }} 
          size="large" 
          placeholder="Point Ratio"
          onChange={e => setFieldState({...fieldstate, point_ratio: e})}
          />
          
          <Divider orientation="left"><Text strong>Point in tk ratio</Text></Divider>
          <InputNumber 
          defaultValue={fieldstate.point_in_tk_ratio} 
          style={{ width: '100%', marginBottom: "10px" }} 
          size="large" 
          placeholder="Point in tk ratio"
          onChange={e => setFieldState({...fieldstate, point_in_tk_ratio: e})}
          />

          <Divider orientation="left"><Text strong>Silver</Text></Divider>
          <InputNumber 
          defaultValue={fieldstate.silver} 
          style={{ width: '100%', marginBottom: "10px" }} 
          size="large" 
          placeholder="Silver"
          onChange={e => setFieldState({...fieldstate, silver: e})}
          />
          
          <Divider orientation="left"><Text strong>Gold</Text></Divider>
          <InputNumber 
          defaultValue={fieldstate.gold} 
          style={{ width: '100%', marginBottom: "10px" }} 
          size="large" 
          placeholder="Gold"
          onChange={e => setFieldState({...fieldstate, gold: e})}
          />

          <Divider orientation="left"><Text strong>Platinum</Text></Divider>
          <InputNumber 
          defaultValue={fieldstate.platinum} 
          style={{ width: '100%', marginBottom: "10px" }} 
          size="large" 
          placeholder="Platinum"
          onChange={e => setFieldState({...fieldstate, platinum: e})}
          />


          <Button onClick={onsubmit} style={{ marginTop: "20px", height: 50 }} value="large" type="primary" block>
            Submit
          </Button>

        </div>
      </Card>
    </HomeLayout>
  )
}


export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/settings/622eddc3461c99340fd0c670`)
  const oneItem = await res.json()
  console.log("oneItems", oneItem)
  return {
    props: {
      oneItem: oneItem.data,
      initialPosts: oneItem.data
    },
  }
}