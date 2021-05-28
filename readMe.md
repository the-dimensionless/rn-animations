
## RN Animations

1. Opacity
2. Translation
3. Scaling
4. Changing layout (width, height)
5. Using absolute positioning  changing layout
6. Interpolation


### Interpolation

Interpolation is a method of constructing data points from within a range of a discrete set of known data points. What that means is given a value and at least 2 other numbers we can figure out where in the range we are.

This is great for deriving animations from a single animated value. When interpolating it allows us to connect animations. When the animations are connected with interpolate it requires you to control a singular value and drive a range of animations. Meaning less work for us, and better animations.

An example of this would be a Modal. With a singular Animated.Value and interpolation you could connect the opacity, and position of the modal. This would allow you to have the exact same animation forwards, and operate in reverse. Interpolations can be extremely powerful to use.

1. Color Changes
2. Rotation
3. Height & Width Interpolation by % 

### Animated Values Functions

Animated values are the instances that wrap around the values to animate. They provide the hooks for Animated.Views and Animated methods to operate and notify each other that animations are happening.

Animated.Value

This is the basic value unit of Animated. It holds a singular value and is what is passed into Animated.View, any Animated animation method, and is used for interpolate.

Animated.ValueXY

This is a combination of 2 Animated.Values, an x and a y. The only difference is that Animated.ValueXY provides helper methods for things like translate transforms and or absolute position animations. Those methods are getTranslateTransform and getLayout.

getTranslateTransform will return an array that a can be passed directly to a transform. However if you are using other transforms you'll need to combine the arrays.
-----------------------------------------------------
const animatedStyle = {
  transform: this._animation.getTranslateTransform()
}

is same as

const animatedStyle = {
  transform: [{
    translateX: this._animation.x
  }, {
    translateY: this._animation.y
  }]
}
-----------------------------------------------------
const animatedStyle = this._animation.getLayout()

is same as

const animatedStyle = {
  top: this._animation.y,
  left: this._animation.x
}
-----------------------------------------------------
Both Animated.Value and Animated.ValueXY have a setValue function. This will immediately adjust the animated value. There will be no animation, any Animated.View that has received the particular Animated.Value will adjust appropriately.

This is a typical way to reset an animation, or to set starting values when dealing with dynamic values.

The only difference is that Animated.ValueXY can receive a single value setValue(0) which will set both the x and the y values to 0. The other method is to pass an object specifying the x and y values to set like setValue({ x: 5, y: 0 }). Finally you can also reference the .x and .y and call setValue on them directly like this._animation.x.setValue(5).

### Listeners

Sometimes you may need raw access to an animated value. Due to the nature of Animated being async you must supply a listener. You define this with addListener and provide a callback. It is necessary that this is async because if the animation is being driven/calculated by the native world the exactly value will not be synchronously available.

this._animation.addListener

The listener gets called with an object, and with a value key. In the case of Animated.Value the value key will refer to single number. In the case of Animated.ValueXY this will be an object with x, and y keys with their respective values.

### Offset

Using setOffset is underutilized but beneficial when dealing with gestures and animations. It allows you to set an initial offset value to be added into the animated value.

So if we had this._animation = Animated.Value(0) and then called this._animation.setOffset(15). The Animated.Value is still set to 0 but then will have 15 added to it. So the actual value when accessed would be 15 and not 0.

Offset is necessary for gestures as you typically want to use translateX and translateY to move an item in conjunction with the dx/dy. The delta X and delta Y, which are the deltas of the touch from the original position. Using setOffset allows you to use Animated.event in conjunction with a PanResponder and addListener to set the offset to the previous animated position. Then you can simply feed the dx/dy into the Animated.ValueXY. We will explain this more in depth when we are dealing with gestures, and show a few examples.

Just know that the syntax for setting offset matches setValue. So for Animated.Value it's simply this._animation.setValue(15), and for Animated.ValueXY you'd pass in this._animation.setOffset({x: 5, y: 15 }).

#### Additionally there are flattenOffset and extractOffset. These operate in a reverse manner.

flattenOffset will take the offset and merge into the value of the Animated.Value and set the offset to 0.

this._animation = Animated.Value(15);
this._animation.setOffset(5);
this._animation.flattenOffset();

//value = 20;
//offset = 0;
//overall value = 20;

extractOffset will take the value of the Animated.Value merge it into the offset, and set the value to 0.

this._animation = Animated.Value(15);
this._animation.setOffset(5);
this._animation.extractOffset();

//value = 0;
//offset = 20;
//overall value = 20

Both of these calls would be consider noops. Because the value of an Animated.Value is just offset + value, when these commands are executed there would not be a visible animation effect as the derived values will be the same.

#### extractOffset will be heavily used for dragging operations.

### Remove Listeners

If you attach a listener it is absolutely crucial that you call removeAllListeners or removeListener in componentWillUnmount otherwise memory leaks will happen. This will cause your application to eat up more memory, and keep instances around that aren't necessary.

## Easing Value Function

Easing specifies the rate of change of a parameter over time. Different objects in real life do not travel at a constant speed. In the programming world that just means that over a set period of time the value given to a function will return a different value based upon the formula it's plugged into.

This is why easing is used with Animated.timing. We have a start value, a toValue and a duration of time.

### Back, Bounce, Elastic, Bezier

## Spring Value Function

Animated.spring defines a way to transition an Animated.Value based on tension and friction of a spring. The tension defines how much energy the spring has, and the friction defines how quickly that energy will dissipate. Based upon the spring formula the Animated.Value will bounce around like a spring until it stops.

Because this is a spring it means that the Animated.Value will overshoot the toValue that you have specified until settling to the toValue. This is unlike Animated.timing which will not exceed the toValue you specified unless you provided an easing that caused the value to overshoot.

Loose bouncy spring

<code class="js language-js">
Animated.spring(this._animation, {
  toValue: 100,
  friction: 2,
  tension: 140,
}).start()
</code>

High Friction not bouncy spring

<code class="js language-js">
Animated.spring(this._animation, {
  toValue: 100,
  friction: 15,
  tension: 140,
}).start()
</code>

We can apply the same amount of tension energy but a higher friction will cause the spring to stop faster.

### Loop Value Function

This is used when an animation needs to keep repeating. One thing to note here is that the loop will reset the Animated.Value back to it's original value before starting the animation over.

So unless your animation ends back where it started you will see a jump. 

Additionally in the configuration of loop you can specify the number of iterations that the animation should loop.

https://facebook.github.io/react-native/docs/easing.html 

### Event Value Function

The Animated.event is a utility method to automatically set a value on an Animated.Value given an array/keys to traverse. Typically this would be used with the onScroll or onPanResponderMove. It receives an array of instructions. Animated.event returns a function, when the function is called the arguments it is called with are applied to the instructions in the array you provided. Once those instructions are traversed when ever the function is called it just does a setValue with the provided value on to the Animated.Value.

The typical callback signature of React is event first, then additional properties like gestureState for PanResponders. On the event nativeEvent contains all the content you need.

Because a function would be called with (event, gestureState) => {}, the instructions to get data from event would need to be placed into the first array spot in Animated.event.

In the case of an onScroll from a ScrollView you need to provide a few levels of instructions.

Animated.event([
{
  nativeEvent: {
    contentOffset: {
      y: this._animation
    }
  }
}
])

If you don't need to reference anything off an event simply pass in null so that the argument call signature matches the array of instructions.

In the case of a PanResponder you would skip the event piece with null and only provide instructions to automatically set animated values from gestureState

Animated.event([
  null,
  {
    dx: this._animation.x,
    dy: this._animation.y
  }
])


### Decay Value Function

The Animated.decay call is primarily used for dragging and gesture animations. All it requires is you to provide a velocity in an x and y direction as well as a friction to slow it down. This means you can create realistic throwing animations, etc.

The primary use case is for gesture animations after a user has released their finger.

### Math

The only issue is that this is cumbersome, inflexible, async, and isn't declarative. To help with this Animated had basic math options added. Including add, divide, multiply and moduolo. These can all be used in conjunction with each other as many times as you'd like.

They also can operate on any Animated.Value or simple numbers can used in place of an Animated.Value.

ADD:
const position = new Animated.Value(100);
const offset = new Animated.Value(50);
const positionWithOffset = Animated.add(position, offset);
// value = 150;

const position = new Animated.Value(100);
const offset = new Animated.Value(50);
const otherNumber = new Animated.Value(400);
const positionWithOffset = Animated.add(position, offset);
const positionOffsetWithRandomNumber = Animated.add(positionWithOffset, otherNumber);
// value = 550;

### Formulas

User rastapasta has already built some great examples of how these math functions can be used to create different, and useful math logic. He compiled them in the library react-native-animated-math.

https://github.com/rastapasta/react-native-animated-math/blob/master/index.js

### Combining Animations

The real power here is being able to combine various timing, spring, and other methods to generate the animation you want. This helps cover bases when interpolate isn't enough, or different animated values need different animations.

### Some Useful links suggested by the author Jason Brown 
Udemy Course (master-react-native-animations)

1. https://tobiasahlin.com/blog/meaningful-motion-w-action-driven-animation/
2. https://www.smashingmagazine.com/2017/01/how-functional-animation-helps-improve-user-experience/
3. https://www.smashingmagazine.com/2016/08/experience-design-essentials-animated-microinteractions-in-mobile-apps/
4. https://www.smashingmagazine.com/2016/09/how-to-design-error-states-for-mobile-apps/
5. https://screenlane.com/?ref=uimovement
6. https://tympanus.net/codrops/
