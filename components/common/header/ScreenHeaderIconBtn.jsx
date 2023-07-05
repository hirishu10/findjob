import React from "react";
import { TouchableHighlight } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import styles from "./screenheader.style";
import { COLORS } from "../../../constants";

const ScreenHeaderIconBtn = ({
  icon,
  size,
  color,
  handlePress,
  extraStyle,
}) => {
  return (
    <TouchableHighlight
      style={[styles.btnContainer, extraStyle]}
      onPress={handlePress}
      underlayColor={COLORS.gray}
    >
      <Ionicons name={icon} size={size} color={color} />
    </TouchableHighlight>
  );
};

export default ScreenHeaderIconBtn;
