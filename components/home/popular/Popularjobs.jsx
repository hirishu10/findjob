import React, { useState } from "react";
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
import { rawDummyPopularData } from "../../../utils/rawData";

const Popularjobs = () => {
  const router = useRouter();
  const { data, isError, isLoading, reFetchData } = useFetchHook("search", {
    query: "React Developer",
    num_pages: 1,
  });

  const [selectedJob, setSelectedJob] = useState();

  const handleCardPress = (item) => {
    router.push({
      pathname: `/job-details/${item.job_id}`,
      params: {
        preFetch: "popular",
      },
    });
    setSelectedJob(item.job_id);
  };

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
            data={data?.length === 0 ? rawDummyPopularData : data}
            renderItem={({ item }) => (
              <PopularJobCard
                item={item}
                selectedJob={selectedJob}
                handleCardPress={() => handleCardPress(item)}
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
