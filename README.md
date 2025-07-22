# Neural Network Extension for Scratch / TurboWarp

This extension adds a simple fully trainable neural network to Scratch or TurboWarp projects.  
It allows users to create, predict, and train a 1-hidden-layer neural network directly inside their projects.

---

## Features

- Create and reset neural network models with customizable input and hidden layer sizes.
- Predict outputs from inputs (supports both comma-separated strings and Scratch lists).
- Train the model with supervised learning using single examples or batches.
- Access and modify all weights and biases for full control.
- Save and load model data as JSON strings for persistence.
- Adjustable learning rate.
- Retrieve outputs as single values or lists.
- Clear internal states and get last training error.

---

## Available Blocks

- `make model with [INPUTS] inputs, [HIDDEN] hidden nodes`  
- `reset model weights`  
- `predict [INPUTS]` (comma-separated string)  
- `predict with list [INPUTLIST]`  
- `train model with input [INPUTS] desired output [OUTPUT]`  
- `train batch inputs [INPUTS] outputs [OUTPUTS]`  
- `get/set weight input-hidden [I] [H]`  
- `get/set weight hidden-output [H] [O]`  
- `get/set bias hidden [H]`  
- `get/set bias output [O]`  
- `set learning rate to [RATE]`  
- `get last output [INDEX]`  
- `get last output list`  
- `save model`  
- `load model from [DATA]`  
- `clear last input/output`  
- `get last training error`  

---

## How to Use

1. Create a model with your desired number of inputs and hidden nodes.  
2. Use the `predict` blocks to get outputs for given inputs.  
3. Train the model by rewarding it with desired outputs after feeding inputs.  
4. Optionally, save and load model states to persist learning.  
5. Modify weights and biases directly for advanced usage or experimentation.

---

## Installation

1. Open [TurboWarp](https://turbowarp.org/) or Scratch with extension support.  
2. Import this extension by URL or add it manually in your project.  

---

## License

MIT License. Feel free to use, modify, and share.

---

## Contact

Created by [CoderDude123213]

---

Enjoy building intelligent projects with neural networks in Scratch! 🚀
