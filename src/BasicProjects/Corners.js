import React, {useMemo, useRef, useState} from 'react';
import SafeArea, {type SafeAreaInsets} from 'react-native-safe-area';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const {height: windowHeight, width: windowWidth} = Dimensions.get('window');
console.log(
  `Dimensions by Screen -> height: ${windowHeight}, width: ${windowWidth}`,
); // 896 x 414

SafeArea.getSafeAreaInsetsForRootView().then(result => {
  console.log('Safe area insets', result);
  // { safeAreaInsets: { top: 44, left: 0, bottom: 34, right: 0 } }
});

const Corners = () => {
  const [animation, setAnimation] = useState(new Animated.ValueXY(0));
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);

  const animatedStyles = {
    transform: [...animation.getTranslateTransform()],
  };

  const onStartAnimation = () => {
    console.log('About to start animation', width, height);
    console.log('Goto Y :', windowHeight - height);
    Animated.sequence([
      Animated.spring(animation.y, {
        toValue: 670,
        useNativeDriver: true,
      }).start(),
    ]);
  };

  const savedDimensions = e => {
    setWidth(e.nativeEvent.layout.width);
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={() => onStartAnimation()}
        onLayout={savedDimensions}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Corners;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 2,
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
    position: 'absolute',
    top: 657,
    left: 0,
  },
  text: {
    fontSize: 24,
    alignSelf: 'center',
  },
});
