import React, {useState} from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const Color = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  // interpolate takes a configuration object
  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,99,71)', 'rgb(99,71,255)'],
  });

  const boxAnimationStyle = {
    backgroundColor: boxInterpolation,
  };

  const colorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(99,71,255)', 'rgb(255,99,71)'],
  });

  const textAnimatedStyle = {
    color: colorInterpolation,
  };

  const onStartAnimation = () => {
    console.log('Start Animation');
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, boxAnimationStyle]}>
          <Animated.Text style={[styles.text, textAnimatedStyle]}>
            Hello
          </Animated.Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default Color;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'red',
    borderWidth: 5,
  },
  box: {
    width: 350,
    height: 350,
    backgroundColor: 'tomato',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
    fontSize: 51,
  },
});
