type EnvKeys =
  'API_URL'

export class EnvService {
  private static __getEnvVariable (key: EnvKeys): string | null {
    return process.env[`REACT_APP_${key}`] || null
  }

  public static getApiUrl () {
    return EnvService.__getEnvVariable('API_URL')
  }
}
