export const createValidation = {
  name: {
    notEmpty: true,
    errorMessage: 'login must not be empty'
  },
  isbn: {
    notEmpty: true,
    errorMessage: 'isbn must not be empty'
  },
  author: {
    notEmpty: true,
    errorMessage: 'author must not be empty'
  }
}

export const putValidation = {
  name: {
    optional: true,
    notEmpty: true,
    isString: true
  },
  isbn: {
    optional: true,
    notEmpty: true
  },
  author: {
    optional: true,
    notEmpty: true,
    isString: true
  }
}
