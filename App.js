/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
const {width, height}=Dimensions.get('window');
const styles=StyleSheet.create({
    btn:{
        width:width/2,
        height:50,
        backgroundColor:'blue',
        borderRadius:6,
        alignItems:"center",
        justifyContent:'center',
    }
});
const options = {
    title: '选择图片',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '图片库',
    cameraType: 'back',
    mediaType: 'photo',
    videoQuality: 'high',
    durationLimit: 10,
    maxWidth: 600,
    maxHeight: 600,
    aspectX: 2,
    aspectY: 1,
    quality: 0.8,
    angle: 0,
    allowsEditing: false,
    noData: false,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
export default class App extends Component<{}> {
  render() {
    return (
      <TouchableOpacity
          style={styles.btn}
        onPress={this.addTodo.bind(this)}
      >
        <Text style={{color:"#fff", fontSize:16}}>相册</Text>
      </TouchableOpacity>
    );
  }
    addTodo(){
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }

            else {

                let source;

                if (Platform.OS === 'android') {
                    source = {uri: response.uri, isStatic: true}
                } else {
                    source = {uri: response.uri.replace('file://', ''), isStatic: true}
                }




                let file;
                if(Platform.OS === 'android'){
                    file = response.uri
                }else {
                    file = response.uri.replace('file://', '')
                }


                this.setState({
                    loading:true
                });
                this.props.onFileUpload(file,response.fileName||'未命名文件.jpg')
                    .then(result=>{
                        this.setState({
                            loading:false
                        })
                    })
            }
        });
    }
}
