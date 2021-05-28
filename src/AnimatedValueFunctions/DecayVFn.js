import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

// throw, flick, gesture animation
// has velocity & deceleration
const DecayFunction = () => {
  const [animation, setAnimation] = useState(new Animated.ValueXY(0));
  const panResponderRef = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
          [
            null,
            {
              dx: animation.x,
              dy: animation.y,
            },
          ],
          {useNativeDriver: false},
        ),
        onPanResponderRelease: (e, {vx, vy}) => {
          Animated.decay(animation, {
            velocity: {x: vx, y: vy},
            deceleration: 0.997,
            useNativeDriver: false,
          }).start();
        },
      }),
    [animation],
  );

  const animatedStyles = {
    transform: animation.getTranslateTransform(),
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.box, animatedStyles]}
        {...panResponderRef.panHandlers}
      />
    </View>
  );
};

export default DecayFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 5,
    //backgroundColor: 'tomato',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'tomato',
  },
  content: {
    height: 3000,
    backgroundColor: 'tomato',
  },
});
