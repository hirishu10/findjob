import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useFetchHook } from "../../hook/useFetchHook";
import { COLORS, SIZES, icons } from "../../constants";
import {
  Company,
  JobAbout,
  JobFooter,
  JobTabs,
  ScreenHeaderBtn,
  Specifics,
} from "../../components";

const tabData = ["About", "Qualificaitons", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isError, isLoading, reFetchData } = useFetchHook(
    "job-details",
    {
      job_id: params?.id,
      //   job_id: "6t49jPd6o1IAAAAAAAAAAA==",
    }
  );

  //   const { data, isError, isLoading, reFetchData } = useFetchHook(
  //     "job-details",
  //     { job_id: params?.id }
  //   );

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabData[0]);

  //   console.log("data per data", data);
  //   console.log("data per data test", data?.data[0]?.employer_logo);
  const onRefresh = () => {
    // reFetchData();
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout info={data[0]?.job_description ?? "No data provided"} />
        );
      case "Qualificaitons":
        return (
          <Specifics
            title="Qualificaitons"
            points={data[0]?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={data[0]?.job_highlights?.Responsibilities ?? ["N/A"]}
          />
        );
      default:
        break;
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightWhite }}>
      <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          },
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.left}
              dimension={"60%"}
              handlePress={() => router.back()}
            />
          ),
          headerRight: () => (
            <ScreenHeaderBtn iconUrl={icons.share} dimension={"60%"} />
          ),
          headerTitle: "",
        }}
      />
      <React.Fragment>
        <ScrollView
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {isLoading ? (
            <ActivityIndicator color={COLORS.primary} size={"large"} />
          ) : isError ? (
            <View>
              <Text>Something went wrong</Text>
            </View>
          ) : data?.data?.length === 0 ? (
            <View>
              <Text>No Data to show!</Text>
            </View>
          ) : (
            <View style={{ padding: SIZES.medium, paddingBottom: 100 }}>
              <Company
                companyLogo={data[0]?.employer_logo}
                jobTitle={data[0]?.job_title}
                companyName={data[0]?.employer_name}
                location={data[0]?.job_country}
              />

              <JobTabs
                tabs={tabData}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />

              {displayTabContent()}
            </View>
          )}
        </ScrollView>

        <JobFooter
          url={
            data[0]?.job_google_link ??
            "https://careers.google.com.jobs/results"
          }
        />
      </React.Fragment>
    </SafeAreaView>
  );
};

export default JobDetails;
