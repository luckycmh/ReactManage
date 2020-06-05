import React,{memo} from 'react'
import {Form, Select, Input, Button} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
import PropTypes from 'prop-types'

const Item = Form.Item;

const FilterForm = memo(({formData,startSearch}) => {
    const {itemArr, initialValues} = formData;
    const initForm = () => {
        const initData = [];
        itemArr.map(item => {
            switch (item.type) {
                case 'SELECT':
                    initData.push(
                        <Item
                            name={item.name}
                            key={item.name}
                        >
                            <Select>
                                {
                                    item.data.map(
                                        subItem =>
                                            <Select.Option
                                                value={subItem.value}
                                                key={subItem.text}
                                            >
                                                {subItem.text}
                                            </Select.Option>
                                    )
                                }
                            </Select>
                        </Item>
                    )
                    break;
                case 'INPUT':
                    initData.push(
                        <Item
                            name={item.name}
                            key={item.name}
                        >
                            <Input
                                prefix={<SearchOutlined/>}
                                placeholder="请输入查询"
                                allowClear
                                autoComplete="off"
                            />
                        </Item>
                    )
                    break;
                default:
                    break;
            }
        });
        return initData;
    };
    const handleFinish = (values) => {
        startSearch(values);
    };
    return (
        <React.Fragment>
            <Form
                name="filter-form"
                layout="inline"
                onFinish={handleFinish}
                initialValues={initialValues}
            >
                {
                    initForm()
                }
                <Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        搜索
                    </Button>
                </Item>
            </Form>
        </React.Fragment>
    )
})
FilterForm.propTypes = {
    formData: PropTypes.object,
    startSearch: PropTypes.func
};

export default FilterForm
