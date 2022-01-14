import React, { useReducer } from 'react';
import { Upload, Icon, Modal } from 'antd';
import 'antd/es/icon/style/css';
import 'antd/es/upload/style/css';
import 'antd/es/modal/style/css';
import { GaleriaContainer } from './styles';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

function Galeria (props) {
    const [fileList, setFileList] = props.filestate;
    const [removedList, setRemovedList] = props.removeState;
    const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),
    {
        previewVisible: false,
        previewImage: '',
    }
    );

  const handleCancel = () => setState({ previewVisible: false });

  const handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  const handleChange = ({ fileList }) => {
      setFileList(fileList);
  };

  const { previewVisible, previewImage } = state;

  // const propsUploads = {
  //   onRemove: file => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //   },
  //   beforeUpload: file => {
  //     setFileList([...fileList, file]);
  //     return false;
  //   },
  // };

  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  return (
    <GaleriaContainer>
    <Upload
        // {...propsUploads}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        name="file"
        beforeUpload={() => (false)}
        onRemove={(removido) => {
          if(!removido.originFileObj){
            setRemovedList([...removedList, removido.name]);
          }
        }}
    >
        {fileList.length >= 20 ? null : uploadButton}
    </Upload>
    <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
    </Modal>
    </GaleriaContainer>
  );
}

export default Galeria;