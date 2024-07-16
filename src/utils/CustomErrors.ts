export type TErrorsCode = 'unauthorized' | 'handled' | 'api_error' | 'unhandled' | 'no_words' | 'recall' | 'not-allowed';

export default class CustomError extends Error {
  code: TErrorsCode;
  constructor(message: string, code: TErrorsCode) {
    super();
    this.message = message;
    this.code = code;
  }

  static unathorized() {
    throw new CustomError('You are not authorized', 'unauthorized');
  }
  static apiError() {
    throw new CustomError('Amazon_influencer_helper Api error', 'api_error');
  }
  static handled(message: string) {
    throw new CustomError(message, 'handled');
  }
  static unhandled() {
    throw new CustomError('Something went wrong', 'unhandled');
  }
  static noWords() {
    throw new CustomError('This feature needs at least 1 word(s) but you only have 0. Please upgrade your plan to keep generating', 'no_words');
  }
  static handledCode(code: TErrorsCode, message: string) {
    throw new CustomError(message, code);
  }
  static recall() {
    throw new CustomError('', 'recall');
  }
}
