import { useState, useRef, useEffect } from "react";
import { Animated, Easing } from "react-native";

const useSpinWheel = (rewards) => {
  const [selectedReward, setSelectedReward] = useState(null);
  const [isWheelSpinning, setIsWheelSpinning] = useState(false);
  const [spinAngle, setSpinAngle] = useState(null);
  const spinValue = useRef(new Animated.Value(0)).current;

  const spin = spinValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const spinWheel = () => {
    if (isWheelSpinning) return;

    const spinDuration = 3000;
    setSpinAngle(Math.floor(Math.random() * 360) + 1080);

    Animated.timing(spinValue, {
      toValue: spinAngle,
      duration: spinDuration,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start(() => {
      const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
      setSelectedReward(randomReward);
      setIsWheelSpinning(false);
    });

    setIsWheelSpinning(true);
  };

  useEffect(() => {
    const keyframes = `
      @keyframes spin {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(${360 + spinAngle}deg);
        }
      }
    `;

    const onAnimationEnd = () => {
      setIsWheelSpinning(false);
    };

    const style = document.createElement("style");
    style.appendChild(document.createTextNode(keyframes));
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [spinAngle]);

  const wheelStyle = {
    animationName: isWheelSpinning ? "spin" : "",
    animationDuration: "5s",
    animationTimingFunction: "cubic-bezier(  0.95 , 0.55, 0.1,  0.045)",
    transform: `rotate(${spinAngle}deg)`,
    transformOrigin: "center",
  };

  return {
    selectedReward,
    isWheelSpinning,
    spin,
    spinWheel,
    wheelStyle,
    spinAngle,
  };
};

export default useSpinWheel;
