(function(Scratch) {
    'use strict';

    class SimpleNN {
        constructor(inputSize = 2, hiddenSize = 4, outputSize = 1) {
            this.inputSize = inputSize;
            this.hiddenSize = hiddenSize;
            this.outputSize = outputSize;
            this.reset();
        }

        reset() {
            this.w1 = this.randomMatrix(this.inputSize, this.hiddenSize);
            this.b1 = this.zeros(this.hiddenSize);
            this.w2 = this.randomMatrix(this.hiddenSize, this.outputSize);
            this.b2 = this.zeros(this.outputSize);
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
            const z1 = this.addVec(this.dot(input, this.w1), this.b1);
            const a1 = z1.map(this.sigmoid);
            const z2 = this.addVec(this.dot(a1, this.w2), this.b2);
            const a2 = z2.map(this.sigmoid);
            return a2;
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

    let model = new SimpleNN();

    class NeuralNetworkExtension {
        getInfo() {
            return {
                id: 'neuralnet',
                name: 'Neural Network',
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
                    },
                    {
                        opcode: 'resetModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset model'
                    },
                    {
                        opcode: 'getWeight',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get weight at layer [LAYER] node [INDEX]',
                        arguments: {
                            LAYER: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            },
                            INDEX: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'numInputs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number of inputs'
                    },
                    {
                        opcode: 'setModelSize',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set inputs to [INPUTS] and hidden to [HIDDEN]',
                        arguments: {
                            INPUTS: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            },
                            HIDDEN: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 4
                            }
                        }
                    }
                ]
            };
        }

        predict(args) {
            const inputArray = args.INPUTS.split(',').map(Number);
            if (inputArray.length !== model.inputSize) {
                return 'Error: Expected ' + model.inputSize + ' inputs';
            }
            const result = model.forward(inputArray);
            return result[0].toFixed(4);
        }

        resetModel() {
            model.reset();
        }

        getWeight(args) {
            const layer = Number(args.LAYER);
            const index = Number(args.INDEX);
            if (layer === 1 && index < model.w1.length) {
                return model.w1[index][0].toFixed(3);
            }
            if (layer === 2 && index < model.w2.length) {
                return model.w2[index][0].toFixed(3);
            }
            return 'NaN';
        }

        numInputs() {
            return model.inputSize;
        }

        setModelSize(args) {
            const inputs = Math.max(1, parseInt(args.INPUTS));
            const hidden = Math.max(1, parseInt(args.HIDDEN));
            model = new SimpleNN(inputs, hidden, 1);
        }
    }

    Scratch.extensions.register(new NeuralNetworkExtension());
})(Scratch);
