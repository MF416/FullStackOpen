const mongoose = require("mongoose");
const supertest = require("supertest");
const helper = require("./test_helper");
const app = require("../app");
const bcrypt = require("bcrypt");
const Blog = require("../models/blog");
const User = require("../models/user");

// const api = supertest(app)
const api = supertest.agent(app);

beforeAll(async () => {
  const createUser = await api
    .post("/api/users")
    .send({ username: "tester", name: "tester", password: "tester" });
  // console.log("create user: ", createUser)
  const response = await api
    .post("/api/login")
    .send({ username: "tester", password: "tester" });
  // console.log("jwt access token: ", response.body.token)
  api.auth(response.body.token, { type: "bearer" });
});

describe("when there is initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});

    // Removed for part 4.23 to test user authentication
    /* 
         const blogObjects = helper.initialBlogs
           .map(blog => new Blog (blog)).map(blog => new Blog(blog))
           const promiseArray = blogObjects.map(blog => blog.save())
           await Promise.all(promiseArray)
        */

    const blogObjects = helper.initialBlogs;

    for (let blog of blogObjects) {
      await api
        .post("/api/blogs")
        .send(blog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
    }
  });

  test("blogs are returned as json", async () => {
    // console.log('entered test')
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("blog posts uid is id", async () => {
    const response = await api.get("/api/blogs");

    const ids = response.body.map((r) => r.id);
    expect(ids).toBeDefined();
  });

  describe("adding new blogs", () => {
    test("a new blog post can be added", async () => {
      const newBlog = {
        title: "this new blog slaps",
        author: "Tiger Woods",
        url: "www.tigerwoods.com",
        likes: 1000,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      blogAtEnd = await helper.blogsInDb();
      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length + 1);

      const content = blogAtEnd.map((r) => r.title);
      expect(content).toContain("this new blog slaps");
    });

    test("missing likes defaults to 0", async () => {
      const newBlog = {
        title: "testing for zeroes",
        author: "Euler",
        url: "www.euler.com",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      blogAtEnd = await helper.blogsInDb();

      const likes = blogAtEnd.map((r) => r.likes);
      likeArray = Object.values(likes);

      expect(likeArray[likeArray.length - 1]).toBe(0);
    });

    test("missing title throws 400", async () => {
      const newBlog = {
        author: "Euler",
        url: "www.euler.com",
      };

      await api.post("/api/blogs").send(newBlog).expect(400);

      blogAtEnd = await helper.blogsInDb();

      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
    });

    test("missing author throws 400", async () => {
      const newBlog = {
        title: "testing for zeroes",
        url: "www.euler.com",
      };

      await api.post("/api/blogs").send(newBlog).expect(400);

      blogAtEnd = await helper.blogsInDb();

      expect(blogAtEnd).toHaveLength(helper.initialBlogs.length);
    });
  });

  describe("deleting a blog", () => {
    test("a note can be deleted by id", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      const usersPresent = await helper.usersInDb();

      // console.log("user: /n", user)

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

      const contents = blogsAtEnd.map((r) => r.title);
      expect(contents).not.toContain(blogToDelete.title);
    });
  });

  describe("updating a blog", () => {
    test("a blog can be updated", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const newBlog = {
        title: blogToUpdate.title,
        author: blogToUpdate.author,
        url: blogToUpdate.url,
        likes: 1000,
      };

      await api.put(`/api/blogs/${blogToUpdate.id}`).send(newBlog).expect(200);

      const blogsAtEnd = await helper.blogsInDb();

      const likes = Object.values(blogsAtEnd.map((r) => r.likes));
      expect(likes[0]).toBe(1000);
    });
  });
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "johnsmith",
      name: "John smith",
      password: "password",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    expect(usernames).toContain(newUser.username);
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "John Doe",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain("expected `username` to be unique");

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if username is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ro",
      name: "John Doe",
      password: "password",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "shorter than the minimum allowed length (3)",
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });

  test("creation fails with proper statuscode and message if password is less than 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "rootable",
      name: "John Doe",
      password: "pa",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    expect(result.body.error).toContain(
      "password must be at least 3 characters long",
    );

    const usersAtEnd = await helper.usersInDb();
    expect(usersAtEnd).toEqual(usersAtStart);
  });
});

afterAll(async () => {
  await User.deleteMany({});
  await mongoose.connection.close();
});
