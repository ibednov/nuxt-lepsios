export type MediaCardAspect = '16/10' | '16/9' | '4/3' | '1/1'

export const mediaCardAspectClasses: Record<MediaCardAspect, string> = {
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-video',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-square',
}
