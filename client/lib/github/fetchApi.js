const token = "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";

const fetchApi = async (url) => {
 const res = await fetch(url, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`,
    "Accept": "application/vnd.github+json"
  }
}).then(res  => res.json());
return res;
}

export default fetchApi