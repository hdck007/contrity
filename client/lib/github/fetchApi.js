// const token = "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";

const fetchApi = async (url, token) => {
 const res = await fetch(url, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json"
  }
}).then(response  => response.json());
return res;
}

export default fetchApi