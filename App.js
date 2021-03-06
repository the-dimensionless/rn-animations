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
import ParallelAnimation from './src/CombiningAnimations/Parallel';
import SequenceAnimation from './src/CombiningAnimations/Sequence';
import StaggerAnimation from './src/CombiningAnimations/Stagger';
import DelayAnimation from './src/CombiningAnimations/Delay';
import NumbersAndInterpolates from './src/Interpolation/NumbersAndInterpolates';
import ParentPanResponder from './src/GesturesAndAnimations/ParentPanResponder';
import Cliff99 from './src/AnimatedTechniques/.99cliff';
import AnimateHidden from './src/AnimatedTechniques/Hidden';
import Corners from './src/BasicProjects/Corners';

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
      {/* <ParallelAnimation /> */}
      {/* <SequenceAnimation /> */}
      {/* <StaggerAnimation /> */}
      {/* <DelayAnimation /> */}
      {/* <NumbersAndInterpolates /> */}
      {/* <ParentPanResponder /> */}
      {/* <Cliff99 /> */}
      {/* <AnimateHidden /> */}
      <Corners />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  parent: {
    flex: 1,
    borderColor: 'green',
    borderWidth: 1,
  },
});

export default App;
