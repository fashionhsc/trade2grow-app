import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Dimensions, ImageBackground, ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Polygon } from "react-native-svg";
import { useDispatch, useSelector } from 'react-redux';
import bgImage from '../../../assets/images/bg_dark.png';
import Header from '../../../components/Header';
import StageCard from '../../../components/StageCard';
import { COLORS } from '../../../constants/theme';
import api from '../../../services/api';
import { setCurrentStage, setStages } from '../../../store/slices/stageSlice';

const { width, height } = Dimensions.get("window");

const Home = () => {
  const { user } = useSelector(state => state.auth);
  const { stages } = useSelector(state => state.stages);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const getAllStages = async () => {
    try {
      setLoading(true);
      const resp = await api.post(`/user/stage/get`, { category: user.category });

      if (resp.data?.data) {
        dispatch(setStages(resp.data.data));
      }
    } catch (error) {
      console.log('Error :', error);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentStage(user?.currentStage?.stageId));
      getAllStages();
    }, [])
  );


  return (
    <ImageBackground
      source={bgImage}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView className="px-3 py-5">
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <Header />


        {/* Pyramid Background */}
        <View style={{ position: "absolute", top: 100, left: 0, right: 0, bottom: 0 }}>
          <Svg width="100%" height="100%">
            <Polygon
              // top point → middle top
              // bottom right → (screenWidth, screenHeight)
              // bottom left → (0, screenHeight)
              points={`${width / 2},0 ${width},${height} 0,${height}`}
              fill="none"
              stroke={COLORS.card}
              strokeWidth="2"
            />
          </Svg>
        </View>

        <ScrollView
          contentContainerStyle={{
            padding: 12,
            paddingBottom: 20,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
        >
          {stages.map((stage, index) => (
            <StageCard key={stage._id} stage={stage} index={index} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  )
}

export default Home