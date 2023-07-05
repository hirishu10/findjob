import { Stack, useRouter, useSearchParams } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  ToastAndroid,
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
import { useRawDataHook } from "../../hook/useRawDataHook";

const tabData = ["About", "Qualificaitons", "Responsibilities"];

const JobDetails = () => {
  const params = useSearchParams();
  const router = useRouter();

  const { data, isError, isLoading, reFetchData } = useFetchHook(
    "job-details",
    {
      job_id: params?.id,
    }
  );

  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState(tabData[0]);
  const preFetchData =
    data?.length === 0 ? useRawDataHook(params?.preFetch, params?.id) : data;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    reFetchData();
    setRefreshing(false);
  }, []);

  const displayTabContent = () => {
    switch (activeTab) {
      case "About":
        return (
          <JobAbout
            info={preFetchData[0]?.job_description ?? "No data provided"}
          />
        );
      case "Qualificaitons":
        return (
          <Specifics
            title="Qualificaitons"
            points={preFetchData[0]?.job_highlights?.Qualifications ?? ["N/A"]}
          />
        );
      case "Responsibilities":
        return (
          <Specifics
            title="Responsibilities"
            points={
              preFetchData[0]?.job_highlights?.Responsibilities ?? ["N/A"]
            }
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
            <ScreenHeaderBtn
              iconUrl={icons.share}
              dimension={"60%"}
              handlePress={() =>
                ToastAndroid.show(
                  `This job has been successfully shared!\n It's just a demo`,
                  ToastAndroid.SHORT
                )
              }
            />
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
                companyLogo={preFetchData[0]?.employer_logo}
                jobTitle={preFetchData[0]?.job_title}
                companyName={preFetchData[0]?.employer_name}
                location={preFetchData[0]?.job_country}
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
