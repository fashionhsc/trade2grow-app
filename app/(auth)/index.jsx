import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { useSelector } from "react-redux";

import Login from './Login';


const { width, height } = Dimensions.get("window");

const Index = () => {
  const [showForm, setShowForm] = useState(false);
  const { isAuthenticate, user } = useSelector(state => state.auth);

  // Falling coins config
  const coins = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * (width - 40),
    startY: Math.random() * height - height, // random start position anywhere from -height to screen bottom
    delay: Math.random() * 2000,
    speed: 2000 + Math.random() * 2000, // random falling speed
  }));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowForm(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);


  if (isAuthenticate && user.role == 'user') return <Redirect href={'/(tabs)/home'} />
  if (isAuthenticate && user.role == 'admin') return <Redirect href={'/(admin)/dashboard'} />

  return (

    <View style={{ justifyContent: showForm ? 'space-between' : 'center' }} className="flex-1 items-center bg-[#8D60EE]">

      {/* Falling coins in background */}
      {coins.map((coin) => (
        <FallingCoin
          key={coin.id}
          x={coin.x}
          startY={coin.startY}
          delay={coin.delay}
          speed={coin.speed}
        />
      ))}

      <Image style={{ marginTop: showForm ? '100' : '0' }} source={require("../../assets/images/splash-icon.png")} />
      {
        showForm && <Login />
      }
    </View>
  );
};

function FallingCoin({ x, startY, delay, speed }) {
  const translateY = useSharedValue(startY);

  useEffect(() => {
    translateY.value = withRepeat(
      withTiming(height, { duration: speed, delay }),
      -1, // infinite repeat
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    left: x,
    position: "absolute",
  }));

  return (
    <Animated.Image
      source={require("../../assets/images/coin_icon.png")}
      style={[styles.coin, animatedStyle]}
    />
  );
}

export default Index;


const styles = StyleSheet.create({
  coin: {
    width: 40,
    height: 40,
  },
});
