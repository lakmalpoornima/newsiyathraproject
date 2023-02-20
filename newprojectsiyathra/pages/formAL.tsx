import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Upload,
    UploadFile,
    UploadProps
} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {RcFile} from "antd/es/upload";
import {Option} from "rc-select";


const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });

export default function TestingAL(){

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([
    ]);
    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
        setFileList(newFileList);

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    const handleCancel = () => setPreviewOpen(false);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
        setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
    };


    return(
        <>
            <Row>
                <Col flex={8}></Col>
                <Col flex={8} ><Form style={{textAlign:'center',display:'block',backgroundColor:'steelblue',}}>
                    <div style={{paddingLeft:40,paddingRight:40}}>
                        <Upload
                            listType="picture-circle"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}

                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>

                        <Form.Item rules={[{ required: true, message: 'Please enter your Full Name.'}]}>
                            <Input placeholder={"Full Name"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter your Address.'}]}>
                            <Input placeholder={"Address"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter your School.'}]}>
                            <Input placeholder={"School"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter your Grade.',type:'number'}]}>
                            <Input placeholder={"Grade"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter your Phone Number.'}]}>
                            <Input placeholder={"Phone Number"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter your Email.',type:'email'}]}>
                            <Input placeholder={"Email"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                            <Input placeholder={"Guardian Name"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please enter your Guardian Phone Number.'}]}>
                            <Input placeholder={"Phone Number"} />
                        </Form.Item>
                        <Form.Item style={{textAlign:'left'}}
                                   rules={[{ required: true, message: 'Please select the Date you entered.',type:'date'}]}>
                            <DatePicker placeholder={"select entered Date"} />
                        </Form.Item>
                        <Form.Item rules={[{ required: true, message: 'Please select the Schema.'}]}>
                            <Select placeholder={"Select schema"}>
                                <Option value="science">science</Option>
                                <Option value="Art">Art</Option>
                                <Option value="Commerce">Commerce</Option>
                                <Option value="Technology">Technology</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="select-multiple"
                            rules={[{ required: true, message: 'Please select the Subjects.', type: 'array' }]}
                        >
                            <Select mode="multiple" placeholder="Please select Subjects">
                                <Option value="economics">Economics</Option>
                                <Option value="sinhala">Sinhala</Option>
                                <Option value="media">Media</Option>
                                <Option value="politics">Politics</Option>
                                <Option value="bc">BC</Option>
                                <Option value="geagraphy">Geography</Option>
                                <Option value="ict">ICT</Option>
                                <Option value="history">History</Option>
                                <Option value="drama">Drama</Option>
                                <Option value="homescience">Home Science</Option>
                                <Option value="accounting">Accounting</Option>
                                <Option value="businessstudy">Business Study</Option>
                                <Option value="chemistry">Chemistry</Option>
                                <Option value="combinemaths">Combine-Maths</Option>
                                <Option value="phisics">Physics</Option>
                                <Option value="bio">Bio</Option>
                                <Option value="sft">SFT</Option>
                                <Option value="et">ET</Option>
                                <Option value="bst">BST</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <Form.Item wrapperCol={{ offset: 20 }} style={{padding:20}}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                </Col>
                <Col flex={8}></Col>
            </Row>
        </>
    )
}