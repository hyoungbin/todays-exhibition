import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { Content, Card, CardItem, Left, Body, Right } from "native-base";
import PropTypes from "prop-types";
import Ionicons from "react-native-vector-icons/Ionicons";

const Description = props => (
  <Card style={{ paddingLeft: 6, paddingVertical: 3 }}>
    <CardItem>
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.author}>{props.username}</Text>
        </View>

        <View style={styles.options}>
          <TouchableOpacity>
            <View>
              <Ionicons name={"md-more"} size={15} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../../assets/images/arrow.png")}
              resizeMode={"contain"}
              style={{ width: 20 }}
            />
          </TouchableOpacity>
        </View>
      </View>
    </CardItem>
  </Card>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  description: {
    flex: 4
  },
  options: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-end"
  },

  title: {
    fontWeight: "900",
    fontSize: 14
  },
  author: {
    marginTop: 15,
    fontSize: 12
  }
});

export default Description;
