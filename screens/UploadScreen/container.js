import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator
} from "react-native";
import PropTypes from "prop-types";
import UploadScreen from "./presenter";
import { Buffer } from "buffer";

class Container extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      headerRight: (
        <View>
          <TouchableOpacity onPressOut={() => params.submitArt()}>
            <View>
              <Image
                source={require("../../assets/navigationbar/ok.png")}
                style={{ paddingHorizontal: 25, width: 20, height: 20 }}
                resizeMode={"contain"}
              />
            </View>
          </TouchableOpacity>
        </View>
      )
    };
  };

  state = {
    caption: "",
    isSubmitting: false,
    captionLengthAvailable: 20
  };

  componentDidMount() {
    const { navigation } = this.props;
    const { isSubmitting } = this.state;
    navigation.setParams({
      submitArt: this._submitArt,
      isSubmitting: isSubmitting
    });
  }

  render() {
    const {
      navigation: {
        state: {
          params: { uri }
        }
      }
    } = this.props;

    return (
      <UploadScreen
        imageURL={uri}
        handleText={this._handleText}
        {...this.state}
      />
    );
  }

  _handleText = text => {
    const { caption, captionLengthAvailable } = this.state;
    this.setState({
      captionLengthAvailable: 20 - text.length,
      caption: text
    });
  };

  _submitArt = async () => {
    const { caption } = this.state;
    const {
      submit,
      navigation,
      navigation: {
        state: {
          params: { base64 }
        }
      }
    } = this.props;

    if (caption) {
      // caption 없으면 무제로???
      this.setState({
        isSubmitting: true
      });

      // const response = await fetch(url);
      // const blob = await response.blob();

      const buffer = new Buffer(base64, "base64");

      const uploadResult = await submit(buffer, caption);

      console.log("uploadResult", uploadResult);

      if (uploadResult) {
        navigation.popToTop();
      }
    }
  };
}

export default Container;
