import { axiosConfig } from '../../axiosConfig';
import {
  NovelsApi,
  UsersApi,
  AuthApi,
  SentencesApi,
  EvaluationsApi,
} from '../../api';

class ApiService {
  private static instance: ApiService;

  public readonly novels: NovelsApi;
  public readonly users: UsersApi;
  public readonly auth: AuthApi;
  public readonly sentences: SentencesApi;
  public readonly evaluations: EvaluationsApi;

  private constructor() {
    this.novels = new NovelsApi(axiosConfig);
    this.users = new UsersApi(axiosConfig);
    this.auth = new AuthApi(axiosConfig);
    this.sentences = new SentencesApi(axiosConfig);
    this.evaluations = new EvaluationsApi(axiosConfig);
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
}

export const apiService = ApiService.getInstance();

export { apiService as default };
