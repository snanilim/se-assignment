import HomeLayout from '../../Layout/HomeLayout.js'
import { Card, Avatar } from 'antd';
import { Input, InputNumber, Divider } from 'antd';
import { SetStateAction, useState } from 'react'

export default function Settings({ initialPosts, oneItem }) {
  const [fieldstate, setFieldState] = useState(initialPosts);

  return (
    <HomeLayout>
      <Card>
        <h1> Configure your Settings </h1>
        <div style={{ width:500, margin: "0 auto" }}>
          <Divider orientation="left">Point Ratio</Divider>
          <InputNumber style={{ width: '100%' }} size="large" placeholder="Point Ratio" />
          <Divider orientation="left">Point in tk ratio</Divider>
          <InputNumber style={{ width: '100%' }} size="large" placeholder="Point in tk ratio" />

          <Divider orientation="left">Silver</Divider>
          <InputNumber style={{ width: '100%' }} size="large" placeholder="Silver" />
          <Divider orientation="left">Gold</Divider>
          <InputNumber style={{ width: '100%' }} size="large" placeholder="Gold" />

          <Divider orientation="left">Platinum</Divider>
          <InputNumber style={{ width: '100%' }} size="large" placeholder="Platinum" />

        </div>
      </Card>
    </HomeLayout>
  )
}


export const getServerSideProps = async (context) => {
  const res = await fetch(`http://localhost:3000/api/settings/622eddc3461c99340fd0c670`)
  const oneItem = await res.json()
  console.log("oneItems", oneItem.body)
  return {
    props: {
      oneItem,
      initialPosts: oneItem
    },
  }
}