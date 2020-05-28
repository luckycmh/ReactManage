import React from 'react';
import { Card, Modal, Button } from 'antd';

class Modals extends React.Component {
    state = {
        modal1Visible: false,
        modal2Visible: false,
    };

    setModal1Visible(type) {
        this.setState({
            [type]: true
        });
    }
    setModalHidden(type) {
        this.setState({
            [type]: false
        });
    }
    render() {
        return (
            <React.Fragment>
                <Card title="基础弹窗" className="card-wrap">
                    <Button type="primary" onClick={() => this.setModal1Visible('modal1Visible')}>
                        Display a modal dialog at 20px to Top
                    </Button>
                    <Button type="primary" onClick={() => this.setModal1Visible('modal2Visible')}>
                        Vertically centered modal dialog
                    </Button>
                </Card>

                <Modal
                    title="20px to Top"
                    style={{ top: 20 }}
                    visible={this.state.modal1Visible}
                    onOk={() => this.setModalHidden('modal1Visible')}
                    onCancel={() => this.setModalHidden('modal1Visible')}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
                <Modal
                    title="Vertically centered modal dialog"
                    centered
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModalHidden('modal2Visible')}
                    onCancel={() => this.setModalHidden('modal2Visible')}
                >
                    <p>some contents...</p>
                    <p>some contents...</p>
                    <p>some contents...</p>
                </Modal>
            </React.Fragment>
        );
    }
}

export default Modals;
