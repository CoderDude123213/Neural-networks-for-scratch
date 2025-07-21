(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must be run unsandboxed');
    }

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

    const model = new SimpleNN();

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
                                defaultValue: '0.5, 0.8'
                            }
                        }
                    },
                    {
                        opcode: 'resetModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset model'
                    },
                    {
                        opcode: 'modelInfo',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'model: inputs [IN], hidden [H]',
                        arguments: {
                            IN: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 2
                            },
                            H: {
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
                return `Error: Need ${model.inputSize} inputs`;
            }

            const result = model.forward(inputArray);
            return result[0].toFixed(4);
        }

        resetModel() {
            model.reset();
        }

        modelInfo(args) {
            return `Inputs: ${model.inputSize}, Hidden: ${model.hiddenSize}`;
        }
    }

    Scratch.extensions.register(new NeuralNetworkExtension());
})(Scratch);
