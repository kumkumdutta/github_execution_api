const express = require('express');
const bodyParser = require('body-parser');
const { NodeVM } = require('vm2'); 
const app = express();
const port = process.env.PORT || 3001; 

app.use(bodyParser.json());


app.post('/execute', (req, res) => {
  const code = req.body.code;
  try {
    const result = executeCode(code);
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Code execution API is running on port ${port}`);
});


function executeCode(code) {
  const vm = new NodeVM({
    console: 'inherit', 
    sandbox: {}, 
  });
  return vm.run(code);
}
