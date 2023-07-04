import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import styles from "./popularjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import PopularJobCard from "../../common/cards/popular/PopularJobCard";
import { useFetchHook } from "../../../hook/useFetchHook";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isError, isLoading, reFetchData } = useFetchHook("search", {
    query: "React Developer",
    num_pages: 1,
  });

  // console.log("data populajobs", data);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Popular Jobs</Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator color={COLORS.tertiary} size={"large"} />
        ) : isError ? (
          <Text style={{ color: "tomato", fontSize: 30 }}>
            Something went wrong
          </Text>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                // selectedJob={item?.item?.job_id}
              />
            )}
            keyExtractor={({ item }) => item?.job_id}
            horizontal={true}
            contentContainerStyle={{
              columnGap: SIZES.medium,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Popularjobs;
