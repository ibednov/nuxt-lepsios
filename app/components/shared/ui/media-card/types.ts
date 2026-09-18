export type MediaCardAspect = '16/10' | '16/9' | '4/3' | '4/5' | '1/1' | 'none'

export type MediaCardLayout = 'cover' | 'tile'

export const mediaCardAspectClasses: Record<MediaCardAspect, string> = {
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '4/5': 'aspect-[4/5]',
  '1/1': 'aspect-square',
  'none': '',
}
