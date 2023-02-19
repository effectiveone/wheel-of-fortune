const spinWheel = () => {
  const rotateBy = random(4, 8) * 360;

  setIsWheelSpinning(true);

  Animated.timing(rotation, {
    toValue: rotation._value + rotateBy,
    duration: 3000,
    useNativeDriver: true,
  }).start(() => {
    const selectedValue = getSelectedValue();

    setSelectedReward(selectedValue);
    setIsWheelSpinning(false);
  });
};
