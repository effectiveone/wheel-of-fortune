import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import Svg, { Circle, Text as SvgText, Path } from "react-native-svg";
import rewards from "../utils/helpers/rewards";
import useSpinWheel from "../utils/hook/useSpinWheel";

const WheelOfFortune = () => {
  const {
    selectedReward,
    isWheelSpinning,
    spin,
    spinWheel,
    wheelStyle,
    spinAngle,
  } = useSpinWheel(rewards);

  const renderWheelSection = (section, index) => {
    const sweepAngle = 360 / rewards.length;
    const rotateAngle = index * sweepAngle;
    const path = `M250,250 L250,50 A200,200 0 0,1 ${
      250 + 200 * Math.sin((sweepAngle * Math.PI) / 180)
    },${250 - 200 * Math.cos((sweepAngle * Math.PI) / 180)} L250,250 Z`;

    const labelRadius = 150;
    const labelX =
      250 +
      labelRadius * Math.sin(((rotateAngle + sweepAngle / 2) * Math.PI) / 180);
    const labelY =
      250 -
      labelRadius * Math.cos(((rotateAngle + sweepAngle / 2) * Math.PI) / 180);

    const arrowSize = 20;
    const arrowAngle = rotateAngle + sweepAngle / 2;
    const arrowRadians = arrowAngle * (Math.PI / 180);
    const arrowX = 250 + 180 * Math.sin(arrowRadians);
    const arrowY = 250 - 180 * Math.cos(arrowRadians);

    const arrowPath = `M${arrowX - arrowSize},${arrowY} L${arrowX},${
      arrowY - arrowSize
    } L${arrowX + arrowSize},${arrowY} Z`;

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
      isWheelSpinning(false);
    };

    return (
      <React.Fragment key={section.label}>
        <style>{keyframes}</style>
        <g style={wheelStyle} onAnimationEnd={onAnimationEnd}>
          <Path
            d={path}
            fill={section.color}
            transform={`rotate(${rotateAngle}, 250, 250)`}
          />
          {selectedReward?.label === section.label && !isWheelSpinning && (
            <Path key={`${section.label}-arrow`} d={arrowPath} fill="white" />
          )}
          <SvgText x={labelX} y={labelY} textAnchor="middle" fontSize="16">
            {section.label}
          </SvgText>
        </g>
      </React.Fragment>
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
          x="290"
          y="257"
          textAnchor="end"
          fontSize="16"
          fontWeight="bold"
          style={styles.centeredText}
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
  centeredText: {
    display: "flex",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
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
