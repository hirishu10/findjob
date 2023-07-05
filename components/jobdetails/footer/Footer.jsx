import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ToastAndroid,
} from "react-native";

import styles from "./footer.style";
import { icons } from "../../../constants";

const Footer = ({ url }) => {
  const [subscribe, setSubscribe] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.likeBtn,
          {
            borderColor: subscribe ? "white" : "#F37453",
            backgroundColor: subscribe ? "#F37453" : "white",
          },
        ]}
        onPress={() => {
          setSubscribe(!subscribe);
          ToastAndroid.show(
            `Thank you for ${
              !subscribe ? "subscribe" : "unsubscribe"
            }!\n It's just a demo`,
            ToastAndroid.SHORT
          );
        }}
      >
        <Image
          source={icons.heartOutline}
          resizeMode="contain"
          style={[
            styles.likeBtnImage,
            { tintColor: subscribe ? "white" : "#F37453" },
          ]}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.applyBtn}
        onPress={() => Linking.openURL(url)}
      >
        <Text style={styles.applyBtnText}>Apply for Job</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
