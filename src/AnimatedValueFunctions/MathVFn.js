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

// Add, Multiply, Divide, Modulo, Formulas
const RANDOM_VALUE = 3; // can also be animated value

const MathValueFunction = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [newAnimation, setNewAnimation] = useState(
    Animated.modulo(animation, RANDOM_VALUE),
  );

  const interpolated = newAnimation.interpolate({
    inputRange: [0, 3],
    outputRange: ['0deg', '120deg'],
  });

  const animatedStyles = {
    transform: [
      {
        rotate: interpolated,
      },
    ],
  };

  const onStartAnimation = () => {
    Animated.timing(animation, {
      toValue: 12,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onStartAnimation()}>
        <Animated.View style={[styles.box, animatedStyles]} />
      </TouchableWithoutFeedback>
    </View>
  );
};

export default MathValueFunction;

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
