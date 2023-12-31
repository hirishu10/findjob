import React from "react";
import { TouchableHighlight, Image } from "react-native";

import styles from "./screenheader.style";
import { COLORS } from "../../../constants";

const ScreenHeaderBtn = ({ iconUrl, dimension, handlePress, extraStyle }) => {
  return (
    <TouchableHighlight
      style={[styles.btnContainer, extraStyle]}
      onPress={handlePress}
      underlayColor={COLORS.gray}
    >
      <Image
        source={iconUrl}
        resizeMode="cover"
        style={styles.btnImg(dimension)}
      />
    </TouchableHighlight>
  );
};

export default ScreenHeaderBtn;
