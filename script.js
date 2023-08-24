import express from "express";
import fs from "fs/promises";
import cors from "cors";

const app = express();
const port = 3333;

app.use(express.json());
app.use(cors());

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

app.get("/", (request, response) => {
  response.send("Hello World! lol something");
});

app.get("/test", (request, response) => {
  response.send("This is a test route");
});

app.get("/users", async (request, response) => {
  // response.send("Here there will be users")
  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);
  //   console.log(users);
  response.json(users);
});

app.post("/users", async (request, response) => {
  const newUser = request.body;
  newUser.id = new Date().getTime();
  console.log(newUser);

  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);

  users.push(newUser);
  console.log(newUser);
  fs.writeFile("data.json", JSON.stringify(users));
  response.json(users);
});

app.put("/users/:id", async (request, response) => {
  const id = Number(request.params.id);
  console.log(id);

  const data = await fs.readFile("data.json");
  const users = JSON.parse(data);

  //   Number(id)

  let userToUpdate = users.find((user) => user.id === id);
  const body = request.body;
  console.log(body);
  userToUpdate.image = body.image;
  userToUpdate.mail = body.mail;
  userToUpdate.name = body.name;
  userToUpdate.title = body.title;

  fs.writeFile("data.json", JSON.stringify(users));
  response.json(users);
});
