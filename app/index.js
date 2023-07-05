import { Stack, useRouter } from "expo-router";
import { View, SafeAreaView, ScrollView, ToastAndroid } from "react-native";

import {
  Nearbyjobs,
  Popularjobs,
  ScreenHeaderBtn,
  Welcome,
} from "../components";
import { COLORS, FONT, SIZES, icons, images } from "../constants";
import { useState } from "react";

import ScreenHeaderIconBtn from "../components/common/header/ScreenHeaderIconBtn";

const Home = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.lightWhite,
      }}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: COLORS.lightWhite },
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.menu}
              dimension="60%"
              handlePress={() => {
                ToastAndroid.show(
                  "App Drawer\n It's just a demo",
                  ToastAndroid.SHORT
                );
              }}
              extraStyle={{
                marginRight: 10,
              }}
            />
          ),
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              <ScreenHeaderIconBtn
                icon={darkMode ? "moon" : "sunny"}
                color={"black"}
                size={24}
                handlePress={() => {
                  setDarkMode(!darkMode);
                  ToastAndroid.show(
                    `${
                      !darkMode
                        ? "DarkMode enabled\n It's just a demo"
                        : "LightMode enabled\n It's just a demo"
                    }`,
                    ToastAndroid.SHORT
                  );
                }}
                extraStyle={{
                  marginRight: 20,
                }}
              />
              <ScreenHeaderBtn iconUrl={images.profile} dimension="100%" />
            </View>
          ),
          headerTitle: "findjob",
          headerTitleStyle: {
            fontFamily: FONT.medium,
          },
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: SIZES.medium }}>
          <Welcome
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleClick={() => {
              if (searchTerm) {
                router.push(`/search/${searchTerm}`);
              }
            }}
          />
          {/*  */}
          <Popularjobs />
          {/*  */}
          <Nearbyjobs />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
