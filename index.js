const PORT = 3300 || process.env.PORT;

const server = require("./server.js");

server.listen(PORT, () => {
  console.log(`Server up on Port: ${PORT}`);
});
