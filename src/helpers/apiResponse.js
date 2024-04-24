class ApiResponse {
    static send(res, data = null, errors = null, meta = null) {
      const response = {
        data: data,
        errors: errors,
        meta: meta
      };
  
      // Очистка от null значений для чистоты вывода
      Object.keys(response).forEach(key => response[key] === null && delete response[key]);
  
      res.json(response);
    }
}

export default ApiResponse;