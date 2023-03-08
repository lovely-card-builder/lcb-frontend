export interface Postcard {
  wishFrom: string,
  wishTo: string,
  wishText: string,
  images: PostcardImage[]
}

export interface PostcardImage {
  fileName: string,
  title: string
}
