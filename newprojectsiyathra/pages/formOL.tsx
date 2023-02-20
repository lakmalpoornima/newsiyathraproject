import {Button, Checkbox, Col, DatePicker, Form, Input, Modal, Row, Upload, UploadFile, UploadProps} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {useState} from "react";
import {RcFile} from "antd/es/upload";
//import Webcam from "react-webcam";

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });
const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

export default function TestingOL(){

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

    // const videoConstraints = {
    //     width: 1280,
    //     height: 720,
    //     facingMode: "user"
    // };
    //
    //
    //
    //
    // function getScreenshot() {
    //     width:1920;
    //     height:1080
    // }

    return(
        <>
            <Row>
                <Col flex={8}></Col>
                <Col flex={8} >
                    <Form
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{textAlign:'center',display:'block',backgroundColor:'steelblue',}}>
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

                            <Form.Item
                                name="stname"
                                rules={[{ required: true, message: 'Please input your username!' }]}>
                                <Input placeholder={"Full Name"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"Address"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"School"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"Grade"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"Phone Number"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"Guardian"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"Phone Number"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"yarn add react-webcam"} />
                            </Form.Item>
                            <Form.Item rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <Input placeholder={"Full Name"} />
                            </Form.Item>
                            <Form.Item style={{textAlign:'left'}}
                                       rules={[{ required: true, message: 'Please enter the  Guardian Name.'}]}>
                                <DatePicker placeholder={"select entered Date"} />
                            </Form.Item>
                        </div>
                        <h4 style={{paddingLeft:40,textAlign:'left'}}>Select Subjects</h4>
                        <div style={{paddingLeft:70,textAlign:'left'}} >

                            <Row>
                                <Col span={12}
                                >
                                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                        Maths
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="A" style={{ lineHeight: '32px'}}>
                                        Science
                                    </Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12} >
                                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                        English
                                    </Checkbox>
                                </Col>
                                <Col span={12}>
                                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                        Tamil
                                    </Checkbox>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={12}>
                                    <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                        ICT
                                    </Checkbox>
                                </Col><Col span={12}>
                                <Checkbox value="A" style={{ lineHeight: '32px' ,width:'50%'}}>
                                    History
                                </Checkbox>
                            </Col>
                            </Row>
                            <Row><Col span={12}>
                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                    Sinhala
                                </Checkbox>
                            </Col><Col span={12}>
                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                    Dance
                                </Checkbox>
                            </Col></Row>
                            <Row><Col span={12}>
                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                    Art
                                </Checkbox></Col><Col span={12}>
                                <Checkbox value="A" style={{ lineHeight: '32px' }}>
                                    Music
                                </Checkbox>
                            </Col>
                            </Row>
                        </div>
                        {/*<Webcam audio={false}*/}
                        {/*        height={720}*/}
                        {/*        screenshotFormat="image/jpeg"*/}
                        {/*        width={1280}*/}
                        {/*        videoConstraints={videoConstraints}/>*/}
                        {/*<button*/}
                        {/*    onClick={() => {*/}
                        {/*        const imageSrc = getScreenshot()*/}
                        {/*    }}>*/}
                        {/*    Capture photo*/}
                        {/*</button>*/}
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