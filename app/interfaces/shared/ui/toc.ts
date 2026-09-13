export interface TocLinkItem {
  id?: string
  text?: string
  title?: string
  depth?: number
  children?: TocLinkItem[]
}

export interface TocTree {
  links?: TocLinkItem[]
}

/** Minimal document shape for TOC (Nuxt Content body.toc, etc.) */
export interface TocDocument {
  body?: {
    toc?: TocTree
  } | unknown
}
