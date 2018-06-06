import React from "react";
import { Text } from "react-native";
import { createStackNavigator } from "react-navigation";
import FeedScreen from "../screens/FeedScreen";
import CommentsScreen from "../screens/CommentsScreen";
import BackButton from "../components/BackButton";

const HomeRoute = createStackNavigator({
  Home: {
    screen: FeedScreen,
    navigationOptions: {
      headerTitle: (
        <Text>
          오늘의 주제:{" "}
          <Text
            style={{
              fontFamily: "noto-sans-bold",
              fontSize: 15
            }}
          >
            음식
          </Text>
        </Text>
      )
    }
  },
  Comments: {
    screen: CommentsScreen,
    navigationOptions: {
      headerLeft: props => <BackButton {...props} />,
      headerTitle: (
        <Text>
          오늘의 주제:{" "}
          <Text
            style={{
              fontFamily: "noto-sans-bold",
              fontSize: 15
            }}
          >
            음식
          </Text>
        </Text>
      )
    }
  }
});

export default HomeRoute;
