import React, {useMemo, useRef, useState} from 'react';
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const AnimateHidden = () => {
  const [animation, setAnimation] = useState(new Animated.Value(1));
  const [visible, setVisible] = useState(true);
  const timesFnCreated = useRef(0);

  const bgInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0],
  });

  const animatedStyles = {
    opacity: animation,
    transform: [{translateY: bgInterpolate}],
  };

  const onStartAnimation = () => {
    console.log(
      'Start Interpolation Animation Fn created',
      timesFnCreated.current++,
    );
    Animated.timing(animation, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start(({finished}) => {
      console.log('is this animation finished ?', finished);
      if (finished) {
        setVisible(false);
      } else {
        setTimeout(() => {
          Animated.spring(animation, {
            toValue: 1,
            useNativeDriver: true,
          }).start();
        }, 0);
      }
      // we need to unmount it!
    });
  };

  return (
    <View style={styles.container}>
      {visible && (
        <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

export default AnimateHidden;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'tomato',
  },
  text: {
    fontSize: 24,
    alignSelf: 'center',
  },
});
