// TurboWarp Third-Party Extension: Simple Neural Network
(function(Scratch) {
    'use strict';

    class SimpleNN {
        constructor(inputSize = 2, hiddenSize = 4, outputSize = 1) {
            this.inputSize = inputSize;
            this.hiddenSize = hiddenSize;
            this.outputSize = outputSize;
            this.w1 = this.randomMatrix(inputSize, hiddenSize);
            this.b1 = this.zeros(hiddenSize);
            this.w2 = this.randomMatrix(hiddenSize, outputSize);
            this.b2 = this.zeros(outputSize);
        }

        randomMatrix(rows, cols) {
            return Array.from({ length: rows }, () =>
                Array.from({ length: cols }, () => Math.random() * 2 - 1)
            );
        }

        zeros(n) {
            return Array(n).fill(0);
        }

        sigmoid(x) {
            return 1 / (1 + Math.exp(-x));
        }

        forward(input) {
            this.z1 = this.addVec(this.dot(input, this.w1), this.b1);
            this.a1 = this.z1.map(this.sigmoid);
            this.z2 = this.addVec(this.dot(this.a1, this.w2), this.b2);
            this.a2 = this.z2.map(this.sigmoid);
            return this.a2;
        }

        dot(vec, matrix) {
            const result = [];
            for (let j = 0; j < matrix[0].length; j++) {
                let sum = 0;
                for (let i = 0; i < vec.length; i++) {
                    sum += vec[i] * matrix[i][j];
                }
                result.push(sum);
            }
            return result;
        }

        addVec(a, b) {
            return a.map((v, i) => v + b[i]);
        }
    }

    const nn = new SimpleNN();

    class NeuralNetExtension {
        getInfo() {
            return {
                id: 'neuralnet',
                name: 'Neural Net',
                color1: '#5BA58C',
                color2: '#47806F',
                blocks: [
                    {
                        opcode: 'predict',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'predict [INPUTS]',
                        arguments: {
                            INPUTS: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0.5,0.8'
                            }
                        }
                    }
                ]
            };
        }

        predict(args) {
            const inputArray = args.INPUTS.split(',').map(Number);
            if (inputArray.length !== nn.inputSize) {
                return 'Error: Needs ' + nn.inputSize + ' inputs';
            }

            const result = nn.forward(inputArray);
            return result[0].toFixed(4);
        }
    }

    Scratch.extensions.register(new NeuralNetExtension());
})(Scratch);
