import React, {useState} from 'react';
import {Card,Row,Col,Modal} from 'antd';
const { Meta } = Card;
export default function(){
    const [curImg,setImg] = useState('');
    const [showImg,setShowImg] = useState(false);
    const openPic = (imgName) => {
        setImg(`/gallery/${imgName}`);
        setShowImg(true);
    }
    const imgs = [
        ['1.png','2.png','3.png','4.png','5.png'],
        ['6.png','7.png','8.png','9.png','10.png'],
        ['11.png','12.png','13.png','14.png','15.png'],
        ['16.png','17.png','18.png','19.png','20.png'],
        ['21.png','22.png','23.png','24.png','25.png'],
    ];
    const imgLists = imgs.map(list => list.map(
        item =>
            <Card
                style={{marginBottom:'10px'}}
                key={item}
                cover={<img alt="example" src={`/gallery/${item}`} />}
                onClick={() => {openPic(item)}}
            >
                <Meta title="Europe Street beat" description="www.instagram.com" />
            </Card>
    ))
    return (
        <React.Fragment>
            <Row gutter={10}>
                {imgLists.map((item,index) =>
                     index === imgLists.length - 1 ?
                        <Col key={index} span={4}>
                            {item}
                        </Col> :
                        <Col key={index} span={5}>
                            {item}
                        </Col>
                )}

            </Row>
            <Modal
                width={400}
                height={500}
                visible={showImg}
                title="打开画廊"
                footer={null}
                onCancel={() => {setShowImg(false)}}
            >
                <img src={curImg} alt="" width="100%"/>
            </Modal>
        </React.Fragment>
    )
}
