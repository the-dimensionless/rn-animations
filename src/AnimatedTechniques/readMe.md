### start Callback

When calling start to start an animation it takes a callback. That callback will receive an object with either { finished: true } or { finished: false } depending on whether or not the animation was completed, or interrupted. This is essential for developing solid animations.

Position with Layout, Offset Animation Start

Most animations should use transforms so that animations stay performant. That means we can use our normal layout properties and position our items where we want them to end up. This means that we can use interpolate or set our default animated values to an offset to start. Then just animate to 0 and the element will animate to the correct location.

This is how many animations are done, and especially when applying to animation styles like shared elements.

