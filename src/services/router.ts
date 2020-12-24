import { IDictionary } from '@common-types'

export class RouterService {
  /** @summary Функция, генерирующая роут на основании переданных параметров.
   * Маршрут определяется по схеме /url/:id
   * При передаче словаря в качестве аргумента, подставляет переданные значения в схему, делая
   * /url/1 и подставляет в начало префикс url, заданный в переменных окружения: /{tsars}/url/1
   */
  private static __createRoute (routeScheme: string, params?: IDictionary<string>) {
    if (!params) {
      return routeScheme
    }

    /** @summary Регулярка для поиска матчей в url таких, как :id, :category, :product и т.д. */
    const paramsRegExp = /:\w+/g

    let modifiedRoute = routeScheme
    let routeParam = paramsRegExp.exec(routeScheme)

    while (routeParam !== null) {
      const [routeParamMatch] = routeParam
      const appliedParam = params[routeParamMatch.replace(':', '')]

      modifiedRoute = modifiedRoute.replace(routeParamMatch, appliedParam)
      routeParam = paramsRegExp.exec(routeScheme)
    }

    return modifiedRoute
  }

  public static getIndexPage () {
    return RouterService.__createRoute('/')
  }
}
