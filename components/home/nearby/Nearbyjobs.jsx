import React from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";

import styles from "./nearbyjobs.style";
import { useRouter } from "expo-router";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import { useFetchHook } from "../../../hook/useFetchHook";
import { rawDummyNearbyData } from "../../../utils/rawData";

const Nearbyjobs = () => {
  const router = useRouter();
  const { data, isError, isLoading, reFetchData } = useFetchHook("search", {
    query: "React Native Developer",
    num_pages: 1,
  });

  const prefetchData = data?.length === 0 ? rawDummyNearbyData : data;

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
          prefetchData?.map((job, index) => (
            <NearbyJobCard
              job={job}
              key={`nearby_job_${index}`}
              handleNavigate={() =>
                router.push({
                  pathname: `/job-details/${job.job_id}`,
                  params: {
                    preFetch: "nearby",
                  },
                })
              }
            />
          ))
        )}
      </View>
    </View>
  );
};

export default Nearbyjobs;
