import React from 'react';
import { Upload, Button, Icon, message } from 'antd';
import axios from 'axios';
import {base_url} from '../../../../../services/api';

class Galeria extends React.Component {
  state = {
    fileList: [],
    uploading: false,
  };

  handleUpload = async () => {
    const { fileList } = this.state;
    const formData = new FormData();
    console.log('filelist', fileList);
    fileList.forEach(file => {
        console.log('ARQUIVO', file);
      formData.append('file', file);
    });

    this.setState({
      uploading: true,
    });

    // You can use any AJAX library you like

    const res = await axios.post(base_url+'uploads', formData, {
        validateStatus: function (status) {
            return status < 500;
        },
        processData: false,
        headers: { "Content-Type": "multipart/form-data" }
    });
    if(res.status === 200){
        this.setState({
          fileList: [],
          uploading: false,
        });
        message.success('upload successfully.');
    }else{
        this.setState({
          uploading: false,
        });
        message.error('upload failed.');
    }

  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file],
        }));
        return false;
      },
      fileList,
    };

    return (
      <div>
        <Upload {...props} name="file">
          <Button>
            <Icon type="upload" /> Select File
          </Button>
        </Upload>
        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    );
  }
}

export default Galeria;