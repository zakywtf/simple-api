const request = require('supertest');
const app = require('../index');
const mongoose = require('mongoose');
const User = require('../schemas/users');

beforeAll(async () => {
	await mongoose.connect('mongodb://127.0.0.1:27017/simple_api');
});

afterAll(async () => {
  	// await User.deleteMany();
	await mongoose.connection.close();
});

let token

describe('Auth', () => {
	it('should register new user', async () => {
		const obj = {name: 'Testing', email: 'test@mail.com', password: '123456'}
		const res = await request(app).post('/api/v1/auth/register').send(obj)

		expect(res.statusCode).toBe(200);
	});

	it('should login a user', async () => {
		const res = await request(app).post('/api/v1/auth/login').send({
			email: 'test@mail.com',
			password: '123456',
		});
		token = res.body.data.token
		expect(res.statusCode).toBe(200)
		expect(res.body.data).toHaveProperty('token')
		expect(res.body.data.token).toEqual(expect.any(String))
	});
});

describe('Books', () => {
	let authorId
	let bookId = '68185c5d7df72353da959f23'
  
	it('should create a author', async () => {
		const obj = { name: "John Doe", bio: "Indonesian Writer", website: "https://jhondoe.id" }
	  	const res = await request(app).post('/api/v1/authors').set('Authorization', `Bearer ${token}`).send(obj)

		expect(res.statusCode).toBe(200)
		authorId = res.body.data._id
	});

	it('should create a book', async () => {
		const obj = { title: "Test Books", genre: "Horor", author: authorId, published: "2022-08-11T07:22:37.677Z"}
		const res = await request(app).post('/api/v1/books').set('Authorization', `Bearer ${token}`).send(obj)

		expect(res.statusCode).toBe(200)
		// bookId = res.body.data._id
	});

	it('should borrow a book', async () => {
		const res = await request(app).post('/api/v1/books/borrow/'+bookId).set('Authorization', `Bearer ${token}`).send()

		expect(res.statusCode).toBe(200)
	});
  
	it('should get books in pagination', async () => {
	  	const res = await request(app).get('/api/v1/books/pagination/1/5').set('Authorization', `Bearer ${token}`)

	  	expect(res.statusCode).toBe(200)
	});
  
	it('should update a book', async () => {
		const res = await request(app).put(`/api/v1/books/update/${bookId}`).set('Authorization', `Bearer ${token}`).send({ title: 'Updated Book' })
		
		expect(res.body.data.title).toBe('Updated Book')
	});
  
	it('should delete a book', async () => {
		const res = await request(app).delete(`/api/v1/books/delete/${bookId}`).set('Authorization', `Bearer ${token}`)

		expect(res.statusCode).toBe(200)
	});
  });
