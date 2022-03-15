import { Row, Col, Card, Button } from "antd"

const { Meta } = Card;

export default function Products({ allItems }){
    const orderSubmit = async (value) => {
        console.log("value", value)
    }
    return(
        <>
            <div className="site-card-wrapper db-item-card" style={{ marginTop: 5, padding: "0 20px" }}>
                <Row gutter={16}>
                    {
                        allItems.map(i => {
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