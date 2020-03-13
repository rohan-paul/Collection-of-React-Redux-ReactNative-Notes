```js
const axios = require("axios")

async function fetchRepoInfos() {
  // load repository details for this array of repo URLs
  const repos = [
    {
      url: "https://api.github.com/repos/fs-opensource/futureflix-starter-kit",
    },
    {
      url: "https://api.github.com/repos/fs-opensource/android-tutorials-glide",
    },
  ]

  // the below promises variable will hold the response from a map function.
  // The .map() will run an axios.get request for each of the url in the given array
  // and return an object for each of the axios.get request

  const promises = repos.map(async repo => {
    // request details from GitHub’s API with Axios
    const response = await axios({
      method: "GET",
      url: repo.url,
      headers: {
        Accept: "application/json",
      },
    })

    return {
      name: response.data.full_name,
      description: response.data.description,
    }
  })

  // wait until all promises resolve
  const results = await Promise.all(promises)

  // use the results
  // return results;
  console.log(results)
}

// console.log(fetchRepoInfos());
fetchRepoInfos()
```
