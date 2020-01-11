// @flow
import * as tf from '@tensorflow/tfjs'

// Sigmoid:  1 / (1 + e^(-x))
export const SIGMOID = {
    func: function (x: tf.tensor1d) {
        this.value = tf.sigmoid(x)
        return this.value
    },

    derivative: function () {
        // return tf.tensor1d([1]);
        return this.value.mul( tf.tensor1d([1]).sub(this.value) )
    }
}

export function sigmoid(x) { 
    // return 1 / ( 1 + Math.exp(-x))
    // const one = tf.scalar(1);
    // return one.div( one.add( tf.exp(x.mul(tf.scalar(-1))) ) );
    return tf.sigmoid(x)
}

// ReLU, rectified linear unit
export function relu(x) {
    //return x > 0 ? x : 0.
    return tf.relu(x)
}

export function tanh(x) {
    // return (np.exp(x)-np.exp(-x))/(np.exp(x)+np.exp(-x)) 
    //return (Math.exp(x) - Math.exp(-x))/(Math.exp(x) + Math.exp(-x))
    const minus_x = x.mul(tf.scalar(-1));
    const numerator = x.exp().sub( minus_x.exp() );
    const denomiator = x.exp().add( minus_x.exp() );
    // return tf.div( numerator, denomiator );
    return tf.tanh(x);
}

// export function softmax(x) {
//     return np.exp(x)/np.sum(np.exp(x))
//     return Math.exp(x)/
// }

