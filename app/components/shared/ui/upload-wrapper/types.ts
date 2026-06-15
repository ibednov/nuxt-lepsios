export interface SharedUiUploadWrapperPayloadFile {
  source: 'file'
  file: File
}

export interface SharedUiUploadWrapperPayloadUrl {
  source: 'url'
  url: string
}

export type SharedUiUploadWrapperPayload = SharedUiUploadWrapperPayloadFile | SharedUiUploadWrapperPayloadUrl
