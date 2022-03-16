import { Row, Col, Card, Button } from "antd"
import { v4 as uuidv4 } from 'uuid';
const { Meta } = Card;

export default function Products(props){
    const orderSubmit = async (value) => {
        console.log("value", value)
        console.log("userId", props.userId)

        if(props.userId == 'select'){
            alert("Please Select A User First")
        }else{
            alert("You want to Buy?")
            console.log("yes")
            let newObj = {}
            newObj.user_id = props.userId
            newObj.trace_trans_id = uuidv4();
            newObj.product_id = value.id
            newObj.price = value.price

            const data = JSON.stringify(newObj)
            const url = `http://localhost:3000/api/order/add`;
            const headers = {
              'Content-Type': 'application/json'
            };
            const response = await fetch(url, { method: 'POST', body:data, headers });
            const resData = await response.json();
            console.log("resData", resData)

            props.action(props.userId);
        }

    }
    return(
        <>
            <div className="site-card-wrapper db-item-card" style={{ marginTop: 5, padding: "0 20px" }}>
                
                <Row gutter={16}>
                    {
                        props.allItems.map(i => {
                        return <Col style={{ marginTop: 40, padding: "0 30px" }} span={8}>
                            
                                <Card 
                                style={{ overflow: "hidden" }}
                                cover={
                                    <img
                                        style={{ width: 'auto', height: '180px', margin: "0 auto", textAlign: "center" }}
                                      alt="example"
                                      src={`${i.img_url}`} 
                                    />
                                  } 
                                >

                                    <Meta
                                    title={`${i.name}`}
                                    description={`৳ ${i.price}`} 
                                    />

                                    <Button onClick={() => orderSubmit(i)} style={{ marginTop: '30px', background: '#27c8a2', border: "1px solid #27c8a2" }} block size="large" type="primary">Buy</Button>
                                </Card>
                            {/* </Link> */}
                            
                            </Col>
                        })
                    }
                </Row>
            </div>
        </>
    )
}