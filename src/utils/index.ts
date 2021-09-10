import { UrlItem, MatchType } from "../types";
export const isFunction = (fn: any) => typeof fn === "function";
export const getMatchTargetUrl = (url: string, urls: UrlItem[]) => {
  return urls.find(({ origin }) => origin === url)?.target || url;
};

export const isIllegalUrl = (url: string) => {
  return url && typeof url === 'string'
}

export const isMatchUrl = (matchUrl: string, requestUrl: string, matchType: MatchType = MatchType.normal) => {
  return matchType === MatchType.normal ?
            requestUrl.indexOf(matchUrl) > -1 : requestUrl.match(new RegExp(matchUrl, 'i')) 
}