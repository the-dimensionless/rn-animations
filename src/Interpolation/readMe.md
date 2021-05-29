### Numbers And Interpolates on Interpolates Explanation

Flip Values

Building off of our interpolations on interpolations we can also flip numbers. inputRange is only able to accept values that move in an increasing fashion. However you may be constructing reversed animations that would require you to do an inputRange of [1, 0].

To accommodate this we can interpolate to an outputRange that flips in reverse for us so that our animation is moving forward from 0 => 1 the interpolate will flip it to be animating from 1 => 0, which then we can interpolate on our second animation in the correct direction [0, 1] but it will actually be animating in reverse.

const animatedInterpolate = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });
 
    const reversedDirection = animatedInterpolate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .5]
    });

Interpolate Numbers

Just interpolating numbers to different numbers is going to be your primary use case of using interpolate. This may be mapping values up, down, or any direction depending on what your animation requires.

Scaling values up would look something like this. We have an inputRange that will take an animation that is animating from 0 to 1.

These are examples where the inputRange is producing a linear outputRange, but the inputRange is the only thing that needs to be moving in an increasing fashion. The outputRange could be anything. The only requirement is that the inputRange and outputRange have the same number of items in their respective arrays.

As you can see our animated value only ever increased, but our outputRange intermediate values were interpolated correctly based upon the steps in between each range and it's targeted output range.

Understanding all the intermediate values can be necessary however, for many animations it's not critical. Interpolate will figure out the steps correctly based upon your duration, or spring.

Now realize that interpolate is returning a new Animated.Value so what that means is you can interpolate on an interpolate.


### IMP
If you do not want to expose the original animated value, or your interpolation only operates across a specific range. You can interpolate an interpolate before passing it to something that will interpolate it.

Quick example, if we had an animation that went from 0 to 300, but something required a range from 0 to 1. We can map our desired inputRange to an outputRange that will feed into our second animation inputRange and derive our desired outputRange.

<code class="js language-js">    const animatedInterpolate = this.state.animation.interpolate({
      inputRange: [0, 300],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
 
    const interpolatedInterpolate = animatedInterpolate.interpolate({
      inputRange: [0, 1],
      outputRange: [1, .5]
    });
</code>

### Extrapolate

The extrapolate key of an interpolate call defines how the interpolation should operate. Additionally you can define extrapolateLeft and extrapolateRight if you need either side of the interpolation to operate differently.

When I say either side I mean depending on the direction the animated value is going will pick the correct extrapolate left/right.

Lets assume our this.state.animation is starting at 0. If we trigger an animation to 2. The extrapolateRight will apply once we exceed 1. If we then animate back to 0, once the animated value hits 0 and or goes beyond 0 then our extrapolateLeft will be applied.

There are 3 values that are accepted for extrapolation. The default is extend.

### Extend

Extend tells extrapolate to figure out the rate of change happening once the inputRange is exceeded and continue to interpolate. Because it's the default you don't have to add it in as an extrapolate.

If we were to trigger an animation to 2 the interpolation will continue extending past 100. Our value will continue on to be 200.

<code class="js language-js">this.state.animation.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
});
</code>

### Clamp

Taking advantage of extrapolate is going to happen more with transforms than it is with height. Often you might be scaling an animation but only from 0 to 1 . However with the extend extrapolate it could easily scale to twice the size and we do not want that.


### Identity

Once our animated value passes our inputRange the identity extrapolate will tell the interpolation to completely ignore the inputRange and just use the value of the animated value.


