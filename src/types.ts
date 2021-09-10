export interface UrlItem {
  origin: string
  target: string
}

export enum MatchType {
  normal = 'normal',
  regex = 'regex'
}