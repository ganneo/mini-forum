export default class EasyHttp {
  constructor(url) {
    this.url = url;
  }

  async getAll() {
    const response = await fetch(this.url);
    const itemArray = await response.json();
    return itemArray;
  }

  async post(data) {
    await fetch(this.url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async deleteById(id) {
    await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });
  }

  async getById(id) {
    const postResponse = await fetch(`${this.url}/${id}`);
    const postItem = await postResponse.json();
    return postItem;
  }

  async update(newPost, id) {
    await fetch(`${this.url}/${id}`, {
      method: "PUT",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
