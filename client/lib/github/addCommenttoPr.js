const addCommentProvider = async (url, token, message) => {
 const res = await fetch(url, {
  method: "POST",
  headers: {
   "Authorization": `Bearer ${token}`,
   "Accept": "application/vnd.github+json"
  },
  body: {
   "body" : message
  }
 })
 .then(res => res.json())
 .catch(err => console.error(err.message));
 return res;
}

export default addCommentProvider;