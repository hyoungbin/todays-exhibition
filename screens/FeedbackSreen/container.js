import React, { Component } from "react";
import PropTypes from "prop-types";
import FeedbackScreen from "./presenter";
import { Alert } from "react-native";

class Container extends Component {
  state = {
    feedback: "",
    isSubmitting: false
  };
  static propTypes = {};

  render() {
    return (
      <FeedbackScreen
        handleFeedback={this._handleFeedback}
        submit={this._submit}
      />
    );
  }

  _handleFeedback = text => {
    const { feedback } = this.state;
    this.setState({ feedback: text });
  };

  _submit = async () => {
    const { feedback } = this.state;
    const { navigation, submitFeedback } = this.props;
    if (feedback) {
      this.setState({
        isSubmitting: true
      });

      const uploadFeedback = await submitFeedback(feedback);

      if (uploadFeedback) {
        Alert.alert(
          "피드백이 제출되었습니다.더 노력하는 쓸 데 없는 사진전이 되겠습니다."
        );
        setTimeout(() => navigation.goBack(null), 300);
      }
    }
  };
}

export default Container;
