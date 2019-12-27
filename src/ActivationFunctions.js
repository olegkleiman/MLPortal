import * as tf from '@tensorflow/tfjs'

// Sigmoid:  1 / (1 + e^(-x))
export function sigmoid(x) { 
    // return 1 / ( 1 + Math.exp(-x))
    const one = tf.scalar(1);
    return one.div( one.add( tf.exp(x.mul(tf.scalar(-1))) ) );
}

// ReLU, rectified linear unit
export function relu(x) {
    return x > 0 ? x : 0.
}

export function tanh(x) {
    return (np.exp(x)-np.exp(-x))/(np.exp(x)+np.exp(-x)) 
    return (Math.exp(x) - Math.exp(-x))/(Math.exp(x) + Math.exp(-x))
}

// export function softmax(x) {
//     return np.exp(x)/np.sum(np.exp(x))
//     return Math.exp(x)/
// }

