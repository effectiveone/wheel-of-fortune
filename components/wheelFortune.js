import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Svg, { Circle, Text as SvgText, Path } from "react-native-svg";

const WheelOfFortune = () => {
  const rewards = [
    { label: "$100", value: 100, color: "#E53935" },
    { label: "$200", value: 200, color: "#9C27B0" },
    { label: "$300", value: 300, color: "#673AB7" },
    { label: "$400", value: 400, color: "#3F51B5" },
    { label: "$500", value: 500, color: "#2196F3" },
    { label: "$600", value: 600, color: "#00BCD4" },
    { label: "$700", value: 700, color: "#009688" },
    { label: "$800", value: 800, color: "#4CAF50" },
    { label: "$900", value: 900, color: "#8BC34A" },
    { label: "$1000", value: 1000, color: "#FFC107" },
    { label: "$1100", value: 1100, color: "#FF9800" },
    { label: "$1200", value: 1200, color: "#FF5722" },
  ];
  const [selectedReward, setSelectedReward] = useState(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);

  const spinValue = useRef(new Animated.Value(0)).current;

  const spinWheel = () => {
    if (isWheelSpinning) return;

    const spinDuration = 3000;
    const spinAngle = Math.floor(Math.random() * 360) + 1080; // Obrót o losowy kąt między 1080 a 1440 stopni

    Animated.timing(spinValue, {
      toValue: spinAngle,
      duration: spinDuration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      // Po zakończeniu animacji wybieramy losową nagrodę
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setSelectedReward(randomReward);
      setIsWheelSpinning(false);
    });

    setIsWheelSpinning(true);
  };

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const renderWheelSection = (section, index) => {
    const sweepAngle = 360 / rewards.length;
    const rotateAngle = index * sweepAngle;
    const path = `M250,250 L250,50 A200,200 0 0,1 ${
      250 + 200 * Math.sin((sweepAngle * Math.PI) / 180)
    },${250 - 200 * Math.cos((sweepAngle * Math.PI) / 180)} L250,250 Z`;

    return (
      <Path
        key={section.label}
        d={path}
        fill={section.color}
        transform={`rotate(${rotateAngle}, 250, 250)`}
      />
    );
  };

  return (
    <View style={styles.container}>
      <Svg width="100%" height="100%" viewBox="0 0 500 500">
        {rewards.map(renderWheelSection)}
        <Circle
          cx="250"
          cy="250"
          r="50"
          fill="#FFF"
          stroke="#000"
          strokeWidth="2"
        />
        <SvgText
          x="245"
          y="257"
          textAnchor="end"
          fontSize="16"
          fontWeight="bold"
        >
          {isWheelSpinning
            ? "?"
            : selectedReward
            ? selectedReward.label
            : "Kręć kołem!"}
        </SvgText>
      </Svg>
      <TouchableOpacity
        style={styles.button}
        onPress={spinWheel}
        disabled={isWheelSpinning}
      >
        <Text style={styles.buttonText}>
          {isWheelSpinning ? "Kręcę..." : "Kręć kołem!"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#2196F3",
    borderRadius: 5,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WheelOfFortune;
