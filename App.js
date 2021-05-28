/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

import Opacity from './src/animating-properties/index';
import TranslatePosition from './src/animating-properties/translatePosition';
import ScalePosition from './src/animating-properties/scalePosition';
import WidthHeightLayoutChanges from './src/animating-properties/widthHeightChanges';
import Color from './src/animating-properties/color';
import Rotation from './src/animating-properties/rotation';

import EasingComponent from './src/AnimatedValueFunctions/Easing';
import SpringValueFunction from './src/AnimatedValueFunctions/SpringVFn';
import LoopValueFunction from './src/AnimatedValueFunctions/LoopVFn';
import HelperEventFunction from './src/AnimatedValueFunctions/HelperEventFn';
import DecayFunction from './src/AnimatedValueFunctions/DecayVFn';
import MathFunctions from './src/AnimatedValueFunctions/MathVFn';
import CombiningAnimations from 'src/CombiningAnimations/index';

const App: () => Node = () => {
  return (
    <SafeAreaView style={styles.parent}>
      {/* <Opacity /> */}
      {/* <TranslatePosition /> */}
      {/* <ScalePosition /> */}
      {/* <WidthHeightLayoutChanges /> */}
      {/* <Color /> */}
      {/* <Rotation /> */}
      {/* <EasingComponent /> */}
      {/* <SpringValueFunction /> */}
      {/* <LoopValueFunction /> */}
      {/* <HelperEventFunction /> */}
      {/* <DecayFunction /> */}
      {/* <MathFunctions /> */}
      <CombiningAnimations />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
});

export default App;
