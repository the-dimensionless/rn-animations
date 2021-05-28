import React, {useEffect, useState} from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

const HelperEventFunction = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const bgInterpolate = animation.interpolate({
    inputRange: [0, 3000],
    outputRange: ['rgb(255, 99, 71)', 'rgb(99, 71, 255)'],
  });

  const animatedStyles = {
    backgroundColor: bgInterpolate,
  };

  const onStartAnimation = () => {
    console.log('Start Animation');
    Animated.loop(
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ).start();
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEventThrottle={16} //onScrollFn is called every 16 mseconds
        // onScroll={e => {
        //   setAnimation(e.nativeEvent.contentOffset.y);
        // }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: animation,
                },
              },
            },
          ],
          {useNativeDriver: false},
        )}>
        <Animated.View style={[styles.content, animatedStyles]} />
      </ScrollView>
    </View>
  );
};

export default HelperEventFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
    // borderColor: 'red',
    // borderWidth: 5,
    //backgroundColor: 'tomato',
  },
  box: {
    flex: 1,
    backgroundColor: 'tomato',
  },
  content: {
    height: 3000,
    backgroundColor: 'tomato',
  },
});
