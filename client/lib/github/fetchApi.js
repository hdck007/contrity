// const token = "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";

const fetchApi = async (url) => {
 const res = await fetch(url, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${process.env.NEXT_PUBLIC_GITHUB_PAT}`,
    "Accept": "application/vnd.github+json"
  }
}).then(res  => res.json());
return res;
}

export default fetchApi