import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
} from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { COLORS, SIZES } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useFetchHook } from "../../../hook/useFetchHook";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isError, isLoading, reFetchData } = useFetchHook("search", {
    query: "React Developer",
    num_pages: 1,
  });

  // console.log('data nearbyjobs', data)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nearby Jobs</Text>
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
          data?.map((job, index) => (
            <NearbyJobCard
              job={job}
              key={`nearby_job_${index}`}
              handleNavigate={() => router.push(`/job-details/${job?.job_id}`)}
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
