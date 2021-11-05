import axios from 'axios'
import sha1 from 'simple-sha1'
import { CloudinaryUploadResponse } from '../types/cloudinary'

function sha1Promisified(value: string): Promise<string> {
  return new Promise((resolve) => {
    sha1(value, resolve)
  })
}

export async function uploadFileToCloudinary(file: File): Promise<string> {
  const timestamp = new Date().getTime()
  const signature = await sha1Promisified(
    `timestamp=${timestamp}&upload_preset=${process.env.CLOUDINARY_PRESET_NAME}${process.env.CLOUDINARY_API_SECRET}`,
  )
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', process.env.CLOUDINARY_PRESET_NAME)
  data.append('api_key', process.env.CLOUDINARY_API_KEY)
  data.append('timestamp', timestamp.toString())
  data.append('signature', signature)

  const { data: response } = await axios.post<CloudinaryUploadResponse>(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/upload`,
    data,
  )
  return response.secure_url
}

export async function fetchFileFromCloudinary(url: string): Promise<any> {
  const loadedFileBlob = await fetch(url).then((res) => res.blob())

  return loadedFileBlob
}
