import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  CameraRoll,
  StatusBar,
  TouchableOpacity
} from "react-native";
import { Camera, Permissions } from "expo";
import FitImage from "react-native-fit-image";

class CameraScreen extends Component {
  state = {
    hasCameraPermissions: null,
    type: Camera.Constants.Type.back,
    flash: Camera.Constants.FlashMode.off,
    pictureTaken: false,
    pictureUri: null,
    pictureBase64: null
  };

  componentDidMount = async () => {
    const camera = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermissions: camera.status === "granted"
    });
  };

  render() {
    const {
      hasCameraPermissions,
      type,
      flash,
      pictureTaken,
      pictureUri
    } = this.state;
    const { navigation } = this.props;

    if (hasCameraPermissions === null) {
      return <View />;
    } else if (hasCameraPermissions === false) {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>카메라 접근 권한이 없습니다.</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <StatusBar hidden={true} />
          {pictureTaken ? (
            <View style={{ flex: 2 }}>
              <FitImage source={{ uri: pictureUri }} style={{ flex: 1 }} />
            </View>
          ) : (
            <Camera
              type={type}
              flashMode={flash}
              ref={camera => {
                this.camera = camera;
              }}
              style={styles.camera}
            />
          )}

          <View style={styles.btnContainer}>
            {pictureTaken ? (
              <View style={styles.photoActions}>
                <TouchableOpacity onPressOut={this._rejectPhoto}>
                  <View>
                    <Image
                      source={require("../../assets/camera/cancel.png")}
                      style={{ width: 40, height: 40 }}
                    />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPressOut={this._approvePhoto}>
                  <Image
                    source={require("../../assets/camera/upload.png")}
                    style={{ width: 40, height: 40 }}
                  />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.photoActions}>
                <TouchableOpacity onPressOut={this._changeType}>
                  <View style={styles.action}>
                    <Image
                      source={require("../../assets/camera/camchange.png")}
                      style={{ width: 40, height: 40 }}
                      resizeMode={"contain"}
                    />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPressOut={this._takePhoto}>
                  <View style={styles.btn} />
                </TouchableOpacity>

                <TouchableOpacity onPressOut={this._changeFlash}>
                  <View style={styles.action}>
                    {flash === Camera.Constants.FlashMode.off && (
                      <Image
                        source={require("../../assets/camera/flash_off.png")}
                        style={{ width: 40, height: 40 }}
                        resizeMode={"contain"}
                      />
                    )}
                    {flash === Camera.Constants.FlashMode.on && (
                      <Image
                        source={require("../../assets/camera/flash_on.png")}
                        style={{ width: 40, height: 40 }}
                        resizeMode={"contain"}
                      />
                    )}
                    {flash === Camera.Constants.FlashMode.auto && (
                      <Image
                        source={require("../../assets/camera/flash_auto.png")}
                        style={{ width: 40, height: 40 }}
                        resizeMode={"contain"}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      );
    }
  }

  _changeType = () => {
    this.setState(prevState => {
      if (prevState.type === Camera.Constants.Type.back) {
        return { type: Camera.Constants.Type.front };
      } else {
        return { type: Camera.Constants.Type.back };
      }
    });
  };

  _changeFlash = () => {
    this.setState(prevState => {
      if (prevState.flash === Camera.Constants.FlashMode.off) {
        return { flash: Camera.Constants.FlashMode.on };
      } else if (prevState.flash === Camera.Constants.FlashMode.on) {
        return { flash: Camera.Constants.FlashMode.auto };
      } else if (prevState.flash === Camera.Constants.FlashMode.auto) {
        return { flash: Camera.Constants.FlashMode.off };
      }
    });
  };

  _takePhoto = async () => {
    const { pictureTaken } = this.state;
    if (!pictureTaken) {
      if (this.camera) {
        const takenPhoto = await this.camera.takePictureAsync({
          quality: 0.7,
          exif: true,
          base64: true
        });
        this.setState({
          pictureUri: takenPhoto.uri,
          pictureBase64: takenPhoto.base64,
          pictureTaken: true
        });
      }
    }
  };

  _rejectPhoto = () => {
    this.setState({
      pictureUri: null,
      pictureBase64: null,
      pictureTaken: false
    });
  };

  _approvePhoto = async () => {
    const { pictureUri, pictureBase64 } = this.state;
    const {
      navigation: { navigate }
    } = this.props;
    // 내 폰에 저장
    navigate("UploadPhoto", { uri: pictureUri, base64: pictureBase64 });
    this.setState({
      pictureUri: null,
      pictureBase64: null,
      pictureTaken: false
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  camera: {
    flex: 2,
    alignItems: "flex-start",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderColor: "#bbb",
    borderWidth: 15,
    borderRadius: 50
  },
  action: {
    backgroundColor: "transparent",

    margin: 30
  },
  photoActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    alignItems: "center",
    width: 300
  }
});

export default CameraScreen;
