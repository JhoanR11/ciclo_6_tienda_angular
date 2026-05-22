export interface ApiResponse<T> {
  data: T;
  links?: object;
  meta?: object;
}