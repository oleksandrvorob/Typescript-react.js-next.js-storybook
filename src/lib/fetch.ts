import 'isomorphic-unfetch'

interface PostResponse {
  [key: string]: any
}

export const post = async (
  url: string,
  data: BodyInit,
  options: Partial<RequestInit> = {},
): Promise<PostResponse> => {
  let res: Response
  // let payload: PostResponse = {}

  try {
    res = await fetch(url, {
      method: 'POST',
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      // headers: {
      //   'Content-Type': 'application/json',
      //   // 'Content-Type': 'multipart/form-data',
      // },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: data,
      ...options,
    })
  } catch (error) {
    throw new Error(error.message)
  }

  if (res.ok) {
    return res.json()
  }

  throw new Error(res.statusText)
}

export async function get(path, params) {
  var url = new URL(`/api/${path}`)
  url.search = new URLSearchParams(params).toString()
  return await fetch(url.toString())
}
