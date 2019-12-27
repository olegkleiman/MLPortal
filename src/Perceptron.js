import * as tf from '@tensorflow/tfjs'
import * as ActivationFunctions from './ActivationFunctions';

class Perceptron {
    constructor(activationFunction = ActivationFunctions.relu, 
                inputs_len,
                learning_rate = 0.01) {

        tf.setBackend('webgl');
        console.log('Backend: ' + tf.getBackend());

        this.weights = tf.variable( tf.randomNormal([inputs_len+1]) );
        this.activationFunction = activationFunction;
        this.learning_rate = tf.tensor1d([learning_rate]);
        this.loss = tf.variable( tf.tensor1d([.0]) )
        this.epochs = 50
    }   

    train_step() {

    }

    predict(input) {
        const sum = input.dot(this.weights);
        return this.activationFunction(sum);
    }
    
    _train(data, labels, callback) {
        const zip = data.map( (item, index) => {
            return [data[index], labels[index]]
        })
        for(let i = 0; i <= this.epochs; i++) {
            zip.map( item => {
                let [sample, label] = item;
                const prediction = this.predict(tf.tensor(sample))
                const error = tf.tensor1d([label]).sub(prediction);
                this.loss.assign( this.loss.add(error.mul(error)) );
                const _sample= tf.tensor(sample);
                const delta = this.weights.add(error.mul(this.learning_rate).mul(_sample));
                
                this.weights.assign(delta)
            })
        }

        if( callback )
            callback(this.weights.data())

    }

    train(x_data, y_data, callback) {
        const zip = x_data.map( (data, index) => {
            return [data, y_data[index]]
        }) 

        for(let step = 0; step <= 15; step++) {
            zip.map( data => {
                const [_x_data, _y_data] = data;
                const prediction = this.predict(tf.tensor(_x_data))
                const error = tf.sub(tf.tensor(_y_data), prediction);
                this.loss += error.pow(2)
                console.log(this.loss);

                //self.weights[1:] += np.multiply(self.learning_rate * self.__error, sample)
                const tx_data = tf.tensor(_x_data);
                const delta = this.weights.add(tx_data.mul(error).mul(this.learning_rate))
                this.weights.assign(delta)
            })
        }

        // self.loss = round(self.loss / step, 4)

        if( callback )
            callback(this.weights.data())
        
        this.loss = Math.round(this.loss / zip.length, 4)
        
    }

}    

export default Perceptron;