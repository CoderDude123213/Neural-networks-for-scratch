(function (Scratch) {
    'use strict';

    class NeuralNetExtension {
        getInfo() {
            return {
                id: 'neuralnet',
                name: 'Neural Network',
                color1: '#5BA58C',
                color2: '#47806F',
                blocks: [
                    // Model creation/reset
                    {
                        opcode: 'makeModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'make model with [INPUTS] inputs, [HIDDEN] hidden nodes',
                        arguments: {
                            INPUTS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                            HIDDEN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
                        },
                    },
                    {
                        opcode: 'resetModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset model weights',
                    },

                    // Prediction
                    {
                        opcode: 'predict',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'predict [INPUTS]',
                        arguments: {
                            INPUTS: { type: Scratch.ArgumentType.STRING, defaultValue: '0.5, 0.8' },
                        },
                    },
                    {
                        opcode: 'predictList',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'predict with list [INPUTLIST]',
                        arguments: {
                            INPUTLIST: { type: Scratch.ArgumentType.LIST, defaultValue: [] },
                        },
                    },

                    // Training
                    {
                        opcode: 'reward',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'train model with input [INPUTS] desired output [OUTPUT]',
                        arguments: {
                            INPUTS: { type: Scratch.ArgumentType.STRING, defaultValue: '0.5, 0.8' },
                            OUTPUT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        },
                    },
                    {
                        opcode: 'trainBatch',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'train batch inputs [INPUTS] outputs [OUTPUTS]',
                        arguments: {
                            INPUTS: { type: Scratch.ArgumentType.LIST, defaultValue: [] },
                            OUTPUTS: { type: Scratch.ArgumentType.LIST, defaultValue: [] },
                        },
                    },

                    // Get info
                    {
                        opcode: 'getNumInputs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number of inputs',
                    },
                    {
                        opcode: 'getNumHidden',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number of hidden nodes',
                    },
                    {
                        opcode: 'getNumOutputs',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number of outputs',
                    },

                    // Access weights and biases
                    {
                        opcode: 'getWeightInputHidden',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'weight input-hidden [I] [H]',
                        arguments: {
                            I: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'setWeightInputHidden',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set weight input-hidden [I] [H] to [VAL]',
                        arguments: {
                            I: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'getWeightHiddenOutput',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'weight hidden-output [H] [O]',
                        arguments: {
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            O: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'setWeightHiddenOutput',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set weight hidden-output [H] [O] to [VAL]',
                        arguments: {
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            O: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'getBiasHidden',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'bias hidden [H]',
                        arguments: {
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'setBiasHidden',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set bias hidden [H] to [VAL]',
                        arguments: {
                            H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'getBiasOutput',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'bias output [O]',
                        arguments: {
                            O: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'setBiasOutput',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set bias output [O] to [VAL]',
                        arguments: {
                            O: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                            VAL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },

                    // Learning rate
                    {
                        opcode: 'setLearningRate',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set learning rate to [RATE]',
                        arguments: {
                            RATE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0.5 },
                        },
                    },

                    // Outputs
                    {
                        opcode: 'getOutput',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last output [INDEX]',
                        arguments: {
                            INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        },
                    },
                    {
                        opcode: 'getOutputsList',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last output list',
                    },

                    // Persistence
                    {
                        opcode: 'saveModel',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'save model',
                    },
                    {
                        opcode: 'loadModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'load model from [DATA]',
                        arguments: {
                            DATA: { type: Scratch.ArgumentType.STRING, defaultValue: '{}' },
                        },
                    },

                    // Reset last
                    {
                        opcode: 'clearLast',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear last input/output',
                    },

                    // Error
                    {
                        opcode: 'getLastError',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last training error',
                    },
                ],
            };
        }

        constructor() {
            this.learningRate = 0.5;
            this.lastError = 0;
            this.makeModel({ INPUTS: 2, HIDDEN: 4 });
        }

        makeModel(args) {
            this.inputSize = Math.max(1, Math.floor(args.INPUTS));
            this.hiddenSize = Math.max(1, Math.floor(args.HIDDEN));
            this.outputSize = 1;
            this.resetModel();
        }

        resetModel() {
            this.w1 = this.randomMatrix(this.inputSize, this.hiddenSize);
            this.b1 = this.zeros(this.hiddenSize);
            this.w2 = this.randomMatrix(this.hiddenSize, this.outputSize);
            this.b2 = this.zeros(this.outputSize);
            this.lastInput = null;
            this.lastOutput = null;
            this.lastHidden = null;
            this.lastError = 0;
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

        dsigmoid(y) {
            return y * (1 - y);
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

        forward(input) {
            this.lastInput = input;
            this.z1 = this.addVec(this.dot(input, this.w1), this.b1);
            this.a1 = this.z1.map(this.sigmoid);
            this.z2 = this.addVec(this.dot(this.a1, this.w2), this.b2);
            this.a2 = this.z2.map(this.sigmoid);

            this.lastHidden = this.a1;
            this.lastOutput = this.a2;
            return this.a2;
        }

        predict(args) {
            const inputStr = args.INPUTS;
            const inputs = inputStr.split(',').map(x => parseFloat(x.trim()));

            if (inputs.length !== this.inputSize || inputs.some(isNaN)) {
                return `Error: Expected ${this.inputSize} inputs`;
            }

            const output = this.forward(inputs);
            return output[0].toFixed(4);
        }

        predictList(args) {
            const list = args.INPUTLIST;
            if (!list || list.length !== this.inputSize) {
                return `Error: Expected list length ${this.inputSize}`;
            }
            const inputs = list.map(x => parseFloat(x));
            if (inputs.some(isNaN)) return 'Error: List has invalid numbers';
            const output = this.forward(inputs);
            return output[0].toFixed(4);
        }

        reward(args) {
            const inputStr = args.INPUTS;
            const target = args.OUTPUT;
            const inputs = inputStr.split(',').map(x => parseFloat(x.trim()));

            if (inputs.length !== this.inputSize || inputs.some(isNaN)) return;

            if (!this.lastOutput) this.forward(inputs);

            const output = this.lastOutput[0];
            const error = target - output;
            this.lastError = Math.abs(error);

            const lr = this.learningRate;
            const dOutput = error * this.dsigmoid(output);

            for (let j = 0; j < this.hiddenSize; j++) {
                this.w2[j][0] += lr * dOutput * this.lastHidden[j];
            }
            this.b2[0] += lr * dOutput;

            const dHidden = [];
            for (let j = 0; j < this.hiddenSize; j++) {
                dHidden[j] = dOutput * this.w2[j][0] * this.dsigmoid(this.lastHidden[j]);
            }

            for (let i = 0; i < this.inputSize; i++) {
                for (let j = 0; j < this.hiddenSize; j++) {
                    this.w1[i][j] += lr * dHidden[j] * inputs[i];
                }
            }
            for (let j = 0; j < this.hiddenSize; j++) {
                this.b1[j] += lr * dHidden[j];
            }
        }

        trainBatch(args) {
            const inputsList = args.INPUTS;
            const outputsList = args.OUTPUTS;

            if (!inputsList.length || !outputsList.length) return;

            // inputsList expected to be a list of comma-separated strings, outputsList numbers

            for (let i = 0; i < inputsList.length; i++) {
                const inputStr = inputsList[i];
                const target = parseFloat(outputsList[i]);
                if (typeof inputStr !== 'string' || isNaN(target)) continue;

                const inputs = inputStr.split(',').map(x => parseFloat(x.trim()));
                if (inputs.length !== this.inputSize || inputs.some(isNaN)) continue;

                this.forward(inputs);

                const output = this.lastOutput[0];
                const error = target - output;
                this.lastError = Math.abs(error);

                const lr = this.learningRate;
                const dOutput = error * this.dsigmoid(output);

                for (let j = 0; j < this.hiddenSize; j++) {
                    this.w2[j][0] += lr * dOutput * this.lastHidden[j];
                }
                this.b2[0] += lr * dOutput;

                const dHidden = [];
                for (let j = 0; j < this.hiddenSize; j++) {
                    dHidden[j] = dOutput * this.w2[j][0] * this.dsigmoid(this.lastHidden[j]);
                }

                for (let i2 = 0; i2 < this.inputSize; i2++) {
                    for (let j = 0; j < this.hiddenSize; j++) {
                        this.w1[i2][j] += lr * dHidden[j] * inputs[i2];
                    }
                }
                for (let j = 0; j < this.hiddenSize; j++) {
                    this.b1[j] += lr * dHidden[j];
                }
            }
        }

        getNumInputs() {
            return this.inputSize;
        }

        getNumHidden() {
            return this.hiddenSize;
        }

        getNumOutputs() {
            return this.outputSize;
        }

        getWeightInputHidden(args) {
            const i = Math.floor(args.I);
            const h = Math.floor(args.H);
            if (i >= 0 && i < this.inputSize && h >= 0 && h < this.hiddenSize) {
                return this.w1[i][h].toFixed(4);
            }
            return 'NaN';
        }

        setWeightInputHidden(args) {
            const i = Math.floor(args.I);
            const h = Math.floor(args.H);
            const val = parseFloat(args.VAL);
            if (i >= 0 && i < this.inputSize && h >= 0 && h < this.hiddenSize && !isNaN(val)) {
                this.w1[i][h] = val;
            }
        }

        getWeightHiddenOutput(args) {
            const h = Math.floor(args.H);
            const o = Math.floor(args.O);
            if (h >= 0 && h < this.hiddenSize && o >= 0 && o < this.outputSize) {
                return this.w2[h][o].toFixed(4);
            }
            return 'NaN';
        }

        setWeightHiddenOutput(args) {
            const h = Math.floor(args.H);
            const o = Math.floor(args.O);
            const val = parseFloat(args.VAL);
            if (h >= 0 && h < this.hiddenSize && o >= 0 && o < this.outputSize && !isNaN(val)) {
                this.w2[h][o] = val;
            }
        }

        getBiasHidden(args) {
            const h = Math.floor(args.H);
            if (h >= 0 && h < this.hiddenSize) {
                return this.b1[h].toFixed(4);
            }
            return 'NaN';
        }

        setBiasHidden(args) {
            const h = Math.floor(args.H);
            const val = parseFloat(args.VAL);
            if (h >= 0 && h < this.hiddenSize && !isNaN(val)) {
                this.b1[h] = val;
            }
        }

        getBiasOutput(args) {
            const o = Math.floor(args.O);
            if (o >= 0 && o < this.outputSize) {
                return this.b2[o].toFixed(4);
            }
            return 'NaN';
        }

        setBiasOutput(args) {
            const o = Math.floor(args.O);
            const val = parseFloat(args.VAL);
            if (o >= 0 && o < this.outputSize && !isNaN(val)) {
                this.b2[o] = val;
            }
        }

        setLearningRate(args) {
            const rate = parseFloat(args.RATE);
            if (!isNaN(rate) && rate > 0) {
                this.learningRate = rate;
            }
        }

        getOutput(args) {
            const i = Math.floor(args.INDEX);
            if (this.lastOutput && i >= 0 && i < this.outputSize) {
                return this.lastOutput[i].toFixed(4);
            }
            return 'NaN';
        }

        getOutputsList() {
            if (!this.lastOutput) return '[]';
            return JSON.stringify(this.lastOutput.map(v => parseFloat(v.toFixed(4))));
        }

        saveModel() {
            // Save weights and biases as JSON string
            return JSON.stringify({
                w1: this.w1,
                b1: this.b1,
                w2: this.w2,
                b2: this.b2,
                inputSize: this.inputSize,
                hiddenSize: this.hiddenSize,
                outputSize: this.outputSize,
                learningRate: this.learningRate,
            });
        }

        loadModel(args) {
            try {
                const obj = JSON.parse(args.DATA);
                if (!obj) return;
                this.inputSize = obj.inputSize || this.inputSize;
                this.hiddenSize = obj.hiddenSize || this.hiddenSize;
                this.outputSize = obj.outputSize || this.outputSize;
                this.learningRate = obj.learningRate || this.learningRate;
                this.w1 = obj.w1 || this.randomMatrix(this.inputSize, this.hiddenSize);
                this.b1 = obj.b1 || this.zeros(this.hiddenSize);
                this.w2 = obj.w2 || this.randomMatrix(this.hiddenSize, this.outputSize);
                this.b2 = obj.b2 || this.zeros(this.outputSize);
                this.lastInput = null;
                this.lastOutput = null;
                this.lastHidden = null;
                this.lastError = 0;
            } catch (e) {
                // ignore parse errors
            }
        }

        clearLast() {
            this.lastInput = null;
            this.lastOutput = null;
            this.lastHidden = null;
            this.lastError = 0;
        }

        getLastError() {
            return this.lastError.toFixed(4);
        }
    }

    Scratch.extensions.register(new NeuralNetExtension());
})(Scratch);
