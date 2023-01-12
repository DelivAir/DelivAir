import React, { useEffect, useState, useRef } from "react";
import {
  FadeOut,
  FlipOutXUp,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { FontAwesome5, AntDesign } from "@expo/vector-icons";
import { Text, Container, Box, Input } from "native-base";
import * as A from "native-base";
import { StatusBar } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Footer from "../../../components/Footer";
import * as S from "./styles";

import airplane from "../../assets/images/airplane.png";

import Button from "./components/Button";
import CardSelect from "./components/CardSelect";
import StatusContent from "./components/StatusContent";
import Cloud from "./components/Cloud";
import FlyContent from "./components/FlyContent";
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";
const date = new Date();
export default function Main({ navigation }: any) {
  const [modalVisible, setModalVisible] = useState(false);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate()
  );

  const backgroundColor = useSharedValue("white");
  const airplaneRotateZ = useSharedValue(0);
  const airplaneShadowY = useSharedValue(0);
  const airplaneShadowX = useSharedValue(0);
  const airplaneScale = useSharedValue(1);
  const airplaneTranlateY = useSharedValue(0);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [showCardSelect, setShowCardSelect] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [showFlyInfo, setShowFlyInfo] = useState(false);
  const [posts, setPosts] = useState([]);
  const handleConfirm = () => {
    if (showCardSelect) {
      setShowCardSelect(false);
      setConfirm(true);
      setShowStatus(true);
      
    } else {
      if (from.length == 0 && to.length == 0) {
        console.log("null");
        alert("u didin t pick any destination u will be redirected to ...");

        navigation.navigate("allposts");
      } else  if(from.length>0 && to.length==0  ){
alert("please specify ur destination")
    }else  if(to.length>0 && from.length==0  ){
alert("please specify where are u going")
    }else {
        setShowCardSelect(true);
      }
    }
  };

  
  useEffect(() => {
    axios
      .get("http://192.168.11.59:5001/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
    if (confirm) {
      backgroundColor.value = withTiming("#F1F1F1", { duration: 300 });
      setTimeout(() => {
        airplaneRotateZ.value = withSequence(
          withTiming(-10, { duration: 2000 }),
          withTiming(-10, { duration: 1000 }),
          withTiming(0, { duration: 1000 })
        );

        airplaneShadowY.value = withTiming(200, { duration: 4000 });
      }, 3000);
      setTimeout(() => {
        setShowStatus(false);
        backgroundColor.value = withTiming("white", { duration: 400 });
        setTimeout(() => setShowFlyInfo(true), 300);
      }, 7000);
    }
  }, [confirm]);

  const backgroundAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: backgroundColor.value,
  }));

  const airplaneAnimatedStyle = useAnimatedStyle(() => {
    airplaneShadowX.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [0, -450]
    );
    airplaneScale.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [1, 0.8]
    );
    airplaneTranlateY.value = interpolate(
      airplaneShadowY.value,
      [0, 200],
      [0, 60]
    );

    return {
      transform: [
        { rotateZ: airplaneRotateZ.value + "deg" },
        { scale: airplaneScale.value },
        { translateY: airplaneTranlateY.value },
      ],
      shadowOffset: {
        height: airplaneShadowY.value,
        width: airplaneShadowX.value,
      },
    };
  });

  return (
    <>
      <S.Background style={backgroundAnimatedStyle} />
      <S.Container>
        <StatusBar barStyle="dark-content" />
        {!confirm && (
          <S.FlyInfo exiting={FlipOutXUp.duration(600)}>
            <S.Content>
              <S.LargeText>DelivAir</S.LargeText>
             
              <S.TextRowContent>
                <S.TextContent>
                  <S.SmallText>From</S.SmallText>
                  <S.HourContent>{from}</S.HourContent>
                </S.TextContent>
                <A.Center style={{ position: "absolute", left: 150 }}>
                  <Entypo name="chevron-right" size={30} color="white" />
                </A.Center>
                <S.TextContent alingment="right">
                  <S.SmallText>To</S.SmallText>
                  <S.HourContent>{to}</S.HourContent>
                </S.TextContent>
              </S.TextRowContent>
            </S.Content>
          </S.FlyInfo>
        )}
        <S.Airplane
          source={airplane}
          style={airplaneAnimatedStyle}
          resizeMode="contain"
        />
        <Cloud confirmed={confirm} bottom={200} delay={1000} />
        <Cloud confirmed={confirm} bottom={-100} delay={2000} />
        <Cloud confirmed={confirm} size="lg" bottom={-600} zIndex={9999} />
        <Cloud
          confirmed={confirm}
          noShadow
          size="lg"
          bottom={-500}
          delay={2000}
          zIndex={888}
        />

        {!confirm && (
          <S.InfoContent exiting={FadeOut.duration(600)}>
            <A.Center style={{ margin: 50 }}>
              <Text fontSize={18} style={{ paddingBottom: 100 }}>
                Please enter destination or
                <TouchableOpacity
                  onPress={() => navigation.navigate("allposts")}
                >
                  <Text>skip to ...page</Text>
                </TouchableOpacity>
              </Text>
              <A.HStack>
                <Text color={"black"} top={3}>
                  <FontAwesome5 size={20} name="plane-departure" />
                </Text>

                <Input
                  maxLength={8}
                  onChangeText={(text) => setFrom(text)}
                  size="l"
                  mx="3"
                  placeholder="From"
                  w="100%"
                  borderColor="black"
                  backgroundColor="white"
                  borderWidth="1"
                  borderRadius="7"
                />
              </A.HStack>
              <A.Divider my="6" />
              <A.HStack>
                <Text color={"black"} top={3}>
                  <FontAwesome5 size={20} name="plane-arrival" />
                </Text>

                <Input
                  maxLength={8}
                  onChangeText={(text) => setTo(text)}
                  size="l"
                  mx="3"
                  placeholder="To"
                  w="100%"
                  borderColor="black"
                  backgroundColor="white"
                  borderWidth="1"
                  borderRadius="7"
                />
              </A.HStack>
            </A.Center>
          </S.InfoContent>
        )}
        {!confirm && (
          <Button showFlyInfo={showFlyInfo} onPress={handleConfirm} />
        )}
        {showCardSelect && <CardSelect />}
        {showStatus && <StatusContent />}
        {showFlyInfo && (
          <>
            <FlyContent
              posts={posts}
              from={from}
              to={to}
              navigation={navigation}
              setPosts={setPosts}
            />
            <Box style={{ zIndex: 10000, right: 210, bottom: 40 }}>
              <Footer navigation={navigation} />
            </Box>
          </>
        )}
      </S.Container>
    </>
  );
}
